"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { shareAgent } from "@/lib/api";

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

interface SharePanelProps {
  agentId: string;
}

export default function SharePanel({ agentId }: SharePanelProps) {
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function addEmail() {
    const trimmed = emailInput.trim().toLowerCase();
    if (!trimmed) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (emails.includes(trimmed)) {
      setError("This email has already been added.");
      return;
    }
    setEmails((prev) => [...prev, trimmed]);
    setEmailInput("");
    setError("");
  }

  function removeEmail(email: string) {
    setEmails((prev) => prev.filter((e) => e !== email));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      addEmail();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (emails.length === 0) {
      setError("Add at least one email address.");
      return;
    }

    setLoading(true);
    try {
      await shareAgent(agentId, { emails });
      setSuccess(
        `Successfully authorized ${emails.length} sender${emails.length > 1 ? "s" : ""}.`
      );
      setEmails([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3 className="text-[16px] font-bold text-text-primary mb-1">
        Authorized senders
      </h3>
      <p className="text-[13px] text-[var(--color-text-subtle)] mb-6">
        Add email addresses that are allowed to send tasks to your Workpal agent.
        Only authorized senders can interact with your agent.
      </p>

      <form onSubmit={handleSubmit} className="max-w-lg">
        {/* Email input */}
        <div className="flex gap-2 mb-3">
          <input
            type="email"
            placeholder="colleague@company.com"
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.target.value);
              setError("");
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 h-10 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[14px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none"
          />
          <Button
            type="button"
            variant="secondary"
            className="!h-10"
            onClick={addEmail}
          >
            <PlusIcon />
            <span className="ml-1">Add</span>
          </Button>
        </div>

        {/* Email list */}
        {emails.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {emails.map((email) => (
              <span
                key={email}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-subtle text-[13px] text-text-primary font-medium"
              >
                {email}
                <button
                  type="button"
                  onClick={() => removeEmail(email)}
                  className="text-[var(--color-text-muted)] hover:text-danger transition-colors cursor-pointer"
                >
                  <XIcon />
                </button>
              </span>
            ))}
          </div>
        )}

        {error && (
          <p className="mb-3 text-[13px] text-danger font-bold">{error}</p>
        )}

        {success && (
          <div className="mb-3 rounded-[6px] bg-[#dcfce7] border border-cta/20 px-3 py-2">
            <p className="text-[13px] text-cta font-bold">{success}</p>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={loading || emails.length === 0}
        >
          {loading ? "Sharing..." : "Authorize Senders"}
        </Button>
      </form>
    </div>
  );
}
