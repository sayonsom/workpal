"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { DASHBOARD } from "@/lib/constants";
import type { Agent } from "@/lib/types";

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

interface AgentListProps {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
  selectedAgentId?: string;
}

export default function AgentList({
  agents,
  onSelectAgent,
  selectedAgentId,
}: AgentListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function copyEmail(e: React.MouseEvent, email: string, agentId: string) {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopiedId(agentId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback — ignore
    }
  }

  if (agents.length === 0) {
    return (
      <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] p-12 text-center">
        <p className="text-[15px] text-[var(--color-text-muted)]">
          {DASHBOARD.agentList.emptyState}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {agents.map((agent) => (
        <button
          key={agent.id}
          onClick={() => onSelectAgent(agent)}
          className={`w-full text-left rounded-[8px] border bg-white p-4 transition-all duration-[180ms] cursor-pointer ${
            selectedAgentId === agent.id
              ? "border-cta shadow-[var(--shadow-md)]"
              : "border-[var(--color-border-light)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-bold text-text-primary truncate">
                {agent.name || "My Workpal"}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <p className="text-[14px] text-cta font-bold truncate">
                  {agent.agent_email}
                </p>
                <Button
                  variant="ghost"
                  className="!h-6 !px-2 !text-[11px] !min-h-0 shrink-0"
                  onClick={(e) => copyEmail(e, agent.agent_email, agent.id)}
                >
                  <CopyIcon />
                  <span className="ml-1">
                    {copiedId === agent.id
                      ? DASHBOARD.agentList.copiedTooltip
                      : DASHBOARD.agentList.copyTooltip}
                  </span>
                </Button>
              </div>
              <p className="mt-1 text-[12px] text-[var(--color-text-muted)]">
                Created{" "}
                {new Date(agent.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <span
              className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                agent.status === "active"
                  ? "bg-[#dcfce7] text-cta"
                  : "bg-surface-subtle text-[var(--color-text-muted)]"
              }`}
            >
              {agent.status}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
