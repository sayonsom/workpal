"use client";

import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { registerPhone, getPhoneStatus } from "@/lib/api";
import type { Agent, PhoneStatusResponse } from "@/lib/types";

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M17 13.5v2a2 2 0 01-2.18 2 13.16 13.16 0 01-5.74-2.04 12.96 12.96 0 01-4-4A13.16 13.16 0 013.04 5.68 2 2 0 015.04 3.5H7a2 2 0 012 1.72c.13.96.37 1.9.7 2.81a2 2 0 01-.45 2.11l-.85.85a16 16 0 004 4l.85-.85a2 2 0 012.11-.45c.9.33 1.85.57 2.81.7A2 2 0 0117 13.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface VoicePanelProps {
  agent: Agent;
  onAgentUpdated: (agent: Agent) => void;
}

function formatPhone(phone: string): string {
  // Format +15551234567 as +1 (555) 123-4567
  if (phone.startsWith("+1") && phone.length === 12) {
    return `+1 (${phone.slice(2, 5)}) ${phone.slice(5, 8)}-${phone.slice(8)}`;
  }
  return phone;
}

function stripPhone(input: string): string {
  return input.replace(/[\s\-()]/g, "");
}

function validatePhone(phone: string): boolean {
  const stripped = stripPhone(phone);
  if (!stripped.startsWith("+")) return false;
  const digits = stripped.slice(1);
  return /^\d{8,15}$/.test(digits);
}

export default function VoicePanel({ agent, onAgentUpdated }: VoicePanelProps) {
  const [phoneInput, setPhoneInput] = useState(agent.phone_number || "");
  const [loading, setLoading] = useState(false);
  const [fetchingStatus, setFetchingStatus] = useState(false);
  const [phoneStatus, setPhoneStatus] = useState<PhoneStatusResponse | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const hasPhone = !!agent.phone_number;
  const isActive = hasPhone && agent.voice_enabled;
  const isPending = hasPhone && !agent.voice_enabled;

  useEffect(() => {
    if (hasPhone) {
      setFetchingStatus(true);
      getPhoneStatus(agent.agent_id)
        .then((status) => setPhoneStatus(status))
        .catch(() => { /* ignore */ })
        .finally(() => setFetchingStatus(false));
    }
  }, [agent.agent_id, hasPhone]);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const stripped = stripPhone(phoneInput);
    if (!validatePhone(phoneInput)) {
      setError("Enter a valid phone number in international format (e.g., +15551234567)");
      return;
    }

    setLoading(true);
    try {
      const status = await registerPhone(agent.agent_id, { phone_number: stripped });
      setPhoneStatus(status);
      setSuccess("Phone registered successfully!");
      setShowUpdateForm(false);
      onAgentUpdated({
        ...agent,
        phone_number: status.phone_number,
        voice_enabled: status.voice_enabled,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register phone.");
    } finally {
      setLoading(false);
    }
  }

  // State 1: No phone registered
  if (!hasPhone || showUpdateForm) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-1">
          <PhoneIcon />
          <h3 className="text-[16px] font-bold text-text-primary">Voice Calling</h3>
        </div>
        <p className="text-[13px] text-[var(--color-text-subtle)] mb-6">
          Talk to your Workpal agent by phone. Register your phone number to get started.
        </p>

        <form onSubmit={handleRegister} className="max-w-md">
          <label
            htmlFor="voice-phone"
            className="block text-[13px] font-bold text-text-primary mb-1"
          >
            Phone Number
          </label>
          <input
            id="voice-phone"
            type="tel"
            placeholder="+15551234567"
            value={phoneInput}
            onChange={(e) => {
              setPhoneInput(e.target.value);
              setError("");
            }}
            className="w-full h-11 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 transition-colors duration-[120ms]"
          />
          <p className="mt-1 text-[12px] text-[var(--color-text-muted)]">
            Format: +1XXXXXXXXXX (US) or +XXXXXXXXXXX (international)
          </p>

          {error && (
            <p className="mt-2 text-[13px] text-danger font-bold">{error}</p>
          )}
          {success && (
            <div className="mt-2 rounded-[6px] bg-[#dcfce7] border border-cta/20 px-3 py-2">
              <p className="text-[13px] text-cta font-bold">{success}</p>
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Registering..." : showUpdateForm ? "Update Phone" : "Register Phone"}
            </Button>
            {showUpdateForm && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setShowUpdateForm(false);
                  setPhoneInput(agent.phone_number || "");
                  setError("");
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>
    );
  }

  // State 3: Phone registered, provisioning failed
  if (isPending) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-1">
          <PhoneIcon />
          <h3 className="text-[16px] font-bold text-text-primary">Voice Calling</h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FFF8E1] text-[#92700C] border border-[#ECB22E]/30">
            Setup Incomplete
          </span>
        </div>
        <p className="text-[14px] text-[var(--color-text-subtle)] mt-2">
          Your phone: <span className="font-bold text-text-primary">{formatPhone(agent.phone_number)}</span>
        </p>
        <p className="text-[13px] text-[var(--color-text-muted)] mt-1 mb-4">
          Voice agent setup is pending. Try updating your phone number to re-provision.
        </p>
        <Button variant="secondary" onClick={() => setShowUpdateForm(true)}>
          Update Phone
        </Button>
      </div>
    );
  }

  // State 2: Phone registered, voice enabled
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <PhoneIcon />
        <h3 className="text-[16px] font-bold text-text-primary">Voice Calling</h3>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#dcfce7] text-cta border border-cta/20">
          Active
        </span>
      </div>

      <p className="text-[14px] text-[var(--color-text-subtle)] mt-3">
        Your phone: <span className="font-bold text-text-primary">{formatPhone(agent.phone_number)}</span>
      </p>

      {fetchingStatus ? (
        <div className="flex justify-center py-6">
          <div className="w-5 h-5 border-2 border-cta border-t-transparent rounded-full animate-spin" />
        </div>
      ) : phoneStatus?.twilio_number ? (
        <div className="mt-4 rounded-[8px] bg-[#f0fdf4] border border-cta/20 p-4">
          <p className="text-[14px] font-bold text-text-primary mb-2">To talk to your agent:</p>
          <ol className="list-decimal list-inside space-y-1 text-[14px] text-[var(--color-text-subtle)]">
            <li>Call <span className="font-bold text-text-primary">{formatPhone(phoneStatus.twilio_number)}</span></li>
            <li>Your agent will answer and discuss your recent emails and tasks</li>
          </ol>
        </div>
      ) : null}

      <div className="mt-4 flex gap-2">
        <Button
          variant="secondary"
          onClick={() => {
            setShowUpdateForm(true);
            setPhoneInput(agent.phone_number);
          }}
        >
          Update Phone
        </Button>
      </div>
    </div>
  );
}
