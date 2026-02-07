"use client";

import { useEffect, useState, useCallback } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import DashboardShell from "@/components/dashboard/DashboardShell";
import AgentList from "@/components/dashboard/AgentList";
import AgentDetail from "@/components/dashboard/AgentDetail";
import UsagePanel from "@/components/dashboard/UsagePanel";
import { getAgents, getUsage } from "@/lib/api";
import type { Agent, UsageStats } from "@/lib/types";
import { DASHBOARD } from "@/lib/constants";

function DashboardContent() {
  const [activeNav, setActiveNav] = useState<"agents" | "usage">("agents");
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const [loadingAgents, setLoadingAgents] = useState(true);
  const [loadingUsage, setLoadingUsage] = useState(true);

  const fetchAgents = useCallback(async () => {
    setLoadingAgents(true);
    try {
      const data = await getAgents();
      setAgents(data);
      // Auto-select first agent if none selected
      if (data.length > 0 && !selectedAgent) {
        setSelectedAgent(data[0]);
      }
    } catch {
      // ignore — AuthGuard handles token issues
    } finally {
      setLoadingAgents(false);
    }
  }, [selectedAgent]);

  const fetchUsage = useCallback(async () => {
    setLoadingUsage(true);
    try {
      const data = await getUsage();
      setUsage(data);
    } catch {
      // ignore
    } finally {
      setLoadingUsage(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
    fetchUsage();
  }, [fetchAgents, fetchUsage]);

  function handleAgentUpdated(updated: Agent) {
    setAgents((prev) =>
      prev.map((a) => (a.agent_id === updated.agent_id ? updated : a))
    );
    setSelectedAgent(updated);
  }

  function handleAgentDeleted() {
    setAgents((prev) =>
      prev.filter((a) => a.agent_id !== selectedAgent?.agent_id)
    );
    setSelectedAgent(null);
  }

  return (
    <DashboardShell activeNav={activeNav} onNavChange={setActiveNav}>
      {activeNav === "agents" && (
        <div>
          <h2 className="text-[24px] font-bold text-text-primary mb-6">
            {DASHBOARD.agentList.heading}
          </h2>

          {loadingAgents ? (
            <div className="flex justify-center py-12">
              <div className="w-5 h-5 border-2 border-cta border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
              {/* Agent list sidebar */}
              <div>
                <AgentList
                  agents={agents}
                  onSelectAgent={setSelectedAgent}
                  selectedAgentId={selectedAgent?.agent_id}
                />
              </div>

              {/* Agent detail */}
              <div>
                {selectedAgent ? (
                  <AgentDetail
                    key={selectedAgent.agent_id}
                    agent={selectedAgent}
                    onAgentUpdated={handleAgentUpdated}
                    onAgentDeleted={handleAgentDeleted}
                  />
                ) : (
                  <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] p-12 text-center">
                    <p className="text-[14px] text-[var(--color-text-muted)]">
                      Select an agent to view details.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {activeNav === "usage" && (
        <UsagePanel usage={usage} loading={loadingUsage} />
      )}
    </DashboardShell>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
