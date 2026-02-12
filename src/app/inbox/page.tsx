"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/auth/AuthGuard";
import InboxShell from "@/components/inbox/InboxShell";
import Sidebar from "@/components/inbox/Sidebar";
import TaskList from "@/components/inbox/TaskList";
import TaskDetail from "@/components/inbox/TaskDetail";
import FirstTimeGuide from "@/components/inbox/FirstTimeGuide";
import SkillsPanel from "@/components/dashboard/SkillsPanel";
import SamplesPanel from "@/components/dashboard/SamplesPanel";
import { getAgents, getAgentTasks, getReferralInfo } from "@/lib/api";
import { clearTokens } from "@/lib/auth";
import { INBOX } from "@/lib/constants";
import type { Agent, Task } from "@/lib/types";

type Tab = "work" | "skills" | "samples";

function InboxContent() {
  const router = useRouter();

  // ── Data state ──
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(false);

  // ── Premium / Referral state ──
  const [isPremium, setIsPremium] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  // ── UI state ──
  const [activeTab, setActiveTab] = useState<Tab>("work");
  const [activeSidebarItem, setActiveSidebarItem] = useState<"inbox" | "sent" | "trash">("inbox");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // ── Onboarding guide state ──
  const [onboardingDismissed, setOnboardingDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("workpal_onboarding_complete") === "true";
  });

  function handleDismissOnboarding() {
    setOnboardingDismissed(true);
    localStorage.setItem("workpal_onboarding_complete", "true");
  }

  // ── Loading state ──
  const [loadingAgents, setLoadingAgents] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // ── Fetch agents on mount ──
  const fetchAgents = useCallback(async () => {
    setLoadingAgents(true);
    try {
      const data = await getAgents();
      setAgents(data);
      if (data.length > 0) {
        setSelectedAgent(data[0]);
      }
    } catch {
      // AuthGuard handles token issues
    } finally {
      setLoadingAgents(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
    // Fetch referral/premium info (non-blocking)
    getReferralInfo()
      .then((info) => {
        setIsPremium(info.is_premium);
        setReferralCode(info.referral_code);
      })
      .catch(() => { /* non-critical */ });
  }, [fetchAgents]);

  // ── Fetch tasks when agent changes ──
  const fetchTasks = useCallback(async () => {
    if (!selectedAgent) return;
    setLoadingTasks(true);
    try {
      const res = await getAgentTasks(selectedAgent.agent_id);
      setTasks(res.tasks);
      setNextCursor(res.next_cursor);
      setHasMore(res.has_more);
    } catch {
      // ignore
    } finally {
      setLoadingTasks(false);
    }
  }, [selectedAgent]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // ── Load more tasks ──
  async function handleLoadMore() {
    if (!selectedAgent || !nextCursor) return;
    setLoadingMore(true);
    try {
      const res = await getAgentTasks(selectedAgent.agent_id, 20, nextCursor);
      setTasks((prev) => [...prev, ...res.tasks]);
      setNextCursor(res.next_cursor);
      setHasMore(res.has_more);
    } catch {
      // ignore
    } finally {
      setLoadingMore(false);
    }
  }

  // ── Search filter ──
  const filteredTasks = tasks.filter((task) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      task.subject.toLowerCase().includes(q) ||
      (task.output_summary?.toLowerCase().includes(q) ?? false) ||
      (task.input_summary?.toLowerCase().includes(q) ?? false)
    );
  });

  // ── Handlers ──
  function handleLogout() {
    clearTokens();
    router.push("/");
  }

  function handleSelectTask(task: Task) {
    setSelectedTask(task);
  }

  function handleBackToList() {
    setSelectedTask(null);
  }

  // ── Tab config ──
  const tabs: { key: Tab; label: string }[] = [
    { key: "work", label: INBOX.tabs.work },
    { key: "skills", label: INBOX.tabs.skills },
    { key: "samples", label: INBOX.tabs.samples },
  ];

  // ── Loading skeleton ──
  if (loadingAgents) {
    return (
      <InboxShell
        sidebar={
          <div className="flex flex-col h-full px-3 py-4">
            <div className="h-[42px] rounded-2xl bg-white animate-pulse mb-4" />
            <div className="space-y-1">
              <div className="h-9 rounded-full bg-[#EBEBEB] animate-pulse" />
              <div className="h-9 rounded-full bg-[#EBEBEB] animate-pulse w-3/4" />
              <div className="h-9 rounded-full bg-[#EBEBEB] animate-pulse w-3/4" />
            </div>
          </div>
        }
      >
        {/* Tab skeleton */}
        <div className="flex gap-0 border-b border-[var(--color-border-light)] mb-5">
          <div className="h-4 w-12 rounded bg-[#EBEBEB] animate-pulse mx-4 my-2.5" />
          <div className="h-4 w-10 rounded bg-[#EBEBEB] animate-pulse mx-4 my-2.5" />
          <div className="h-4 w-14 rounded bg-[#EBEBEB] animate-pulse mx-4 my-2.5" />
        </div>
        {/* Task row skeletons */}
        <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] overflow-hidden divide-y divide-[var(--color-border-light)]">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <div className="w-2 h-2 rounded-full bg-[#EBEBEB] animate-pulse" />
              <div className="h-4 w-[180px] rounded bg-[#EBEBEB] animate-pulse" />
              <div className="h-3 flex-1 rounded bg-[#EBEBEB] animate-pulse" />
              <div className="h-3 w-[50px] rounded bg-[#EBEBEB] animate-pulse" />
            </div>
          ))}
        </div>
      </InboxShell>
    );
  }

  const agentEmail = selectedAgent?.agent_email ?? "";
  const agentId = selectedAgent?.agent_id ?? "";

  return (
    <InboxShell
      sidebar={
        <Sidebar
          activeItem={activeSidebarItem}
          onItemChange={setActiveSidebarItem}
          inboxCount={tasks.length}
          agentEmail={agentEmail}
          onLogout={handleLogout}
          isPremium={isPremium}
          referralCode={referralCode}
        />
      }
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      isPremium={isPremium}
    >
      {/* Tab bar — clean, subtle underline style */}
      <div className="flex gap-0 border-b border-[var(--color-border-light)] mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setSelectedTask(null);
            }}
            className={`relative px-4 py-2 text-[13px] font-semibold transition-colors duration-[180ms] cursor-pointer ${
              activeTab === tab.key
                ? "text-text-primary"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-subtle)]"
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-text-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "work" && (
        selectedTask ? (
          <TaskDetail task={selectedTask} onBack={handleBackToList} />
        ) : !loadingTasks && tasks.length === 0 && !onboardingDismissed ? (
          <FirstTimeGuide
            agentEmail={agentEmail}
            onSwitchTab={(tab) => {
              setActiveTab(tab === "skills" ? "skills" : "samples");
            }}
            onDismiss={handleDismissOnboarding}
          />
        ) : (
          <TaskList
            tasks={filteredTasks}
            loading={loadingTasks}
            hasMore={hasMore}
            loadingMore={loadingMore}
            onLoadMore={handleLoadMore}
            onSelectTask={handleSelectTask}
            agentEmail={agentEmail}
          />
        )
      )}

      {activeTab === "skills" && agentId && (
        <SkillsPanel agentId={agentId} />
      )}

      {activeTab === "samples" && agentId && (
        <SamplesPanel agentId={agentId} />
      )}
    </InboxShell>
  );
}

export default function InboxPage() {
  return (
    <AuthGuard>
      <InboxContent />
    </AuthGuard>
  );
}
