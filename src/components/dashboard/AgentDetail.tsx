"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { DASHBOARD } from "@/lib/constants";
import { patchAgent, deleteAgent } from "@/lib/api";
import type { Agent } from "@/lib/types";
import TaskHistory from "./TaskHistory";
import SkillsPanel from "./SkillsPanel";
import SamplesPanel from "./SamplesPanel";
import PersonalizePanel from "./PersonalizePanel";
import SharePanel from "./SharePanel";

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4h12M5 4V2.5A.5.5 0 015.5 2h5a.5.5 0 01.5.5V4M13 4v9.5a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 013 13.5V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Tab = "tasks" | "skills" | "samples" | "personalize" | "share";

interface AgentDetailProps {
  agent: Agent;
  onAgentUpdated: (agent: Agent) => void;
  onAgentDeleted: () => void;
}

export default function AgentDetail({
  agent,
  onAgentUpdated,
  onAgentDeleted,
}: AgentDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>("tasks");
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(agent.display_name || "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleSaveName() {
    if (!nameValue.trim()) return;
    setSaving(true);
    try {
      const updated = await patchAgent(agent.agent_id, { display_name: nameValue.trim() });
      onAgentUpdated(updated);
      setEditingName(false);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteAgent(agent.agent_id);
      onAgentDeleted();
    } catch {
      setDeleting(false);
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(agent.agent_email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "tasks", label: DASHBOARD.agentDetail.tabs.tasks },
    { key: "skills", label: DASHBOARD.agentDetail.tabs.skills },
    { key: "samples", label: DASHBOARD.agentDetail.tabs.samples },
    { key: "personalize", label: DASHBOARD.agentDetail.tabs.personalize },
    { key: "share", label: DASHBOARD.agentDetail.tabs.share },
  ];

  return (
    <div>
      {/* Agent header */}
      <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-6 mb-6">
        {/* Agent email — hero placement */}
        <div className="flex items-center gap-3 mb-4">
          <p className="text-[20px] font-bold text-cta">{agent.agent_email}</p>
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-cta text-white text-[13px] font-bold hover:bg-cta-hover transition-colors duration-[180ms] cursor-pointer"
          >
            <CopyIcon />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Name */}
        <div className="flex items-center gap-2">
          {editingName ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                autoFocus
                className="h-8 px-2 rounded-[6px] border border-[var(--color-border-strong)] text-[14px] text-text-primary focus:border-info focus:outline-none"
              />
              <Button
                variant="primary"
                className="!h-8 !text-[13px]"
                onClick={handleSaveName}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button
                variant="ghost"
                className="!h-8 !text-[13px]"
                onClick={() => {
                  setEditingName(false);
                  setNameValue(agent.display_name || "");
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <p className="text-[16px] font-bold text-text-primary">
                {agent.display_name || "My Workpal"}
              </p>
              <button
                onClick={() => setEditingName(true)}
                className="text-[var(--color-text-muted)] hover:text-text-primary transition-colors cursor-pointer"
                title={DASHBOARD.agentDetail.editName}
              >
                <EditIcon />
              </button>
            </>
          )}
        </div>

        {/* Delete */}
        <div className="mt-4 pt-4 border-t border-[var(--color-border-light)]">
          {showDeleteConfirm ? (
            <div className="flex items-center gap-3">
              <p className="text-[13px] text-danger flex-1">
                {DASHBOARD.agentDetail.deleteConfirm}
              </p>
              <Button
                variant="ghost"
                className="!text-danger !text-[13px]"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
              <Button
                variant="ghost"
                className="!text-[13px]"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="inline-flex items-center gap-1.5 text-[13px] text-[var(--color-text-muted)] hover:text-danger transition-colors cursor-pointer"
            >
              <TrashIcon />
              {DASHBOARD.agentDetail.deleteAgent}
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-[var(--color-border-light)] mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-[14px] font-bold border-b-2 transition-colors duration-[180ms] cursor-pointer ${
              activeTab === tab.key
                ? "border-cta text-cta"
                : "border-transparent text-[var(--color-text-subtle)] hover:text-text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "tasks" && <TaskHistory agentId={agent.agent_id} />}
      {activeTab === "skills" && <SkillsPanel agentId={agent.agent_id} />}
      {activeTab === "samples" && <SamplesPanel agentId={agent.agent_id} />}
      {activeTab === "personalize" && <PersonalizePanel agentId={agent.agent_id} />}
      {activeTab === "share" && <SharePanel agentId={agent.agent_id} />}
    </div>
  );
}
