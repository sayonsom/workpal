"use client";

import { useEffect, useState, useCallback } from "react";
import { DASHBOARD } from "@/lib/constants";
import {
  getSkillsCatalog,
  getActiveSkills,
  activateSkill,
  deactivateSkill,
  createSubSkill,
  deleteSubSkill,
  createSkillFromYouTube,
  fetchYouTubeTranscript,
  extractYouTubeVideoId,
} from "@/lib/api";
import type { CatalogSkill, SubSkill } from "@/lib/types";

/* ── Icons ── */

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-[180ms] ${open ? "rotate-90" : ""}`}
    >
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5l3.5 3.5L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spinner({ className = "" }: { className?: string }) {
  return <div className={`w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin ${className}`} />;
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1" y="3" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 6v4l3.5-2-3.5-2z" fill="currentColor" />
    </svg>
  );
}

/* ── Props ── */

interface SkillsPanelProps {
  agentId: string;
}

export default function SkillsPanel({ agentId }: SkillsPanelProps) {
  // ── Data state ──
  const [catalog, setCatalog] = useState<CatalogSkill[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeSkillIds, setActiveSkillIds] = useState<Set<string>>(new Set());
  const [activeSkillDetails, setActiveSkillDetails] = useState<CatalogSkill[]>([]);
  const [subSkills, setSubSkills] = useState<SubSkill[]>([]);

  // ── UI state ──
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>(null);
  const [showSubSkillForm, setShowSubSkillForm] = useState<string | null>(null);
  const [togglingSkillId, setTogglingSkillId] = useState<string | null>(null);
  const [deletingSubSkill, setDeletingSubSkill] = useState<string | null>(null);
  const [subSkillName, setSubSkillName] = useState("");
  const [subSkillContent, setSubSkillContent] = useState("");
  const [savingSubSkill, setSavingSubSkill] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeLoading, setYoutubeLoading] = useState(false);
  const [youtubeResult, setYoutubeResult] = useState<string | null>(null);
  const [youtubeError, setYoutubeError] = useState<string | null>(null);
  const [showTranscriptPaste, setShowTranscriptPaste] = useState(false);
  const [manualTranscript, setManualTranscript] = useState("");

  // ── Fetch data on mount ──
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [catalogRes, activeRes] = await Promise.all([
        getSkillsCatalog(),
        getActiveSkills(agentId),
      ]);
      setCatalog(catalogRes.skills);
      setCategories(catalogRes.categories);
      setActiveSkillDetails(activeRes.active_skills);
      setActiveSkillIds(new Set(activeRes.active_skills.map((s) => s.skill_id)));
      setSubSkills(activeRes.sub_skills ?? []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ── Handlers ──

  async function handleActivate(skill: CatalogSkill) {
    setTogglingSkillId(skill.skill_id);
    try {
      await activateSkill(agentId, { skill_id: skill.skill_id });
      setActiveSkillIds((prev) => new Set([...prev, skill.skill_id]));
      setActiveSkillDetails((prev) => [...prev, skill]);
    } catch {
      // ignore
    } finally {
      setTogglingSkillId(null);
    }
  }

  async function handleDeactivate(skillId: string) {
    setTogglingSkillId(skillId);
    try {
      await deactivateSkill(agentId, { skill_id: skillId });
      setActiveSkillIds((prev) => {
        const next = new Set(prev);
        next.delete(skillId);
        return next;
      });
      setActiveSkillDetails((prev) => prev.filter((s) => s.skill_id !== skillId));
      setSubSkills((prev) => prev.filter((s) => s.parent_skill_id !== skillId));
      if (expandedSkillId === skillId) setExpandedSkillId(null);
      if (showSubSkillForm === skillId) setShowSubSkillForm(null);
    } catch {
      // ignore
    } finally {
      setTogglingSkillId(null);
    }
  }

  async function handleAddSubSkill(skillId: string) {
    if (!subSkillName.trim() || !subSkillContent.trim()) return;
    setSavingSubSkill(true);
    try {
      const res = await createSubSkill(agentId, skillId, {
        name: subSkillName.trim(),
        content: subSkillContent.trim(),
      });
      setSubSkills((prev) => [...prev, res.sub_skill]);
      setSubSkillName("");
      setSubSkillContent("");
      setShowSubSkillForm(null);
    } catch {
      // ignore
    } finally {
      setSavingSubSkill(false);
    }
  }

  async function handleDeleteSubSkill(skillId: string, name: string) {
    setDeletingSubSkill(name);
    try {
      await deleteSubSkill(agentId, skillId, name);
      setSubSkills((prev) =>
        prev.filter((s) => !(s.parent_skill_id === skillId && s.name === name))
      );
    } catch {
      // ignore
    } finally {
      setDeletingSubSkill(null);
    }
  }

  async function handleYouTubeSkill() {
    if (!youtubeUrl.trim()) return;
    setYoutubeLoading(true);
    setYoutubeResult(null);
    setYoutubeError(null);
    try {
      let transcript: string | null = manualTranscript.trim() || null;
      if (!transcript) {
        const videoId = extractYouTubeVideoId(youtubeUrl.trim());
        if (videoId) {
          transcript = await fetchYouTubeTranscript(videoId);
        }
      }
      const res = await createSkillFromYouTube(
        agentId,
        youtubeUrl.trim(),
        transcript || undefined
      );
      setYoutubeResult(
        `"${res.sub_skill.name}" added under ${res.skill_name}. ${res.classification.summary}`
      );
      setYoutubeUrl("");
      setManualTranscript("");
      setShowTranscriptPaste(false);
      await fetchData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to process video";
      setYoutubeError(msg);
      if (!manualTranscript.trim()) {
        setShowTranscriptPaste(true);
      }
    } finally {
      setYoutubeLoading(false);
    }
  }

  // ── Filtering ──

  const filteredCatalog = catalog.filter((skill) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      skill.name.toLowerCase().includes(q) ||
      skill.description.toLowerCase().includes(q) ||
      skill.keywords.some((k) => k.toLowerCase().includes(q));
    const matchesCategory =
      !selectedCategory || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ── Loading skeleton ──

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Active skills skeleton */}
        <div>
          <div className="h-5 w-32 rounded bg-[var(--color-surface-subtle)] animate-pulse mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="rounded-[8px] bg-white border border-[var(--color-border-light)] px-4 py-3 flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-[var(--color-surface-subtle)] animate-pulse" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-40 rounded bg-[var(--color-surface-subtle)] animate-pulse" />
                  <div className="h-3 w-64 rounded bg-[var(--color-surface-subtle)] animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Catalog skeleton */}
        <div>
          <div className="h-5 w-28 rounded bg-[var(--color-surface-subtle)] animate-pulse mb-4" />
          <div className="flex gap-2 mb-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-7 w-16 rounded-full bg-[var(--color-surface-subtle)] animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-[8px] bg-white border border-[var(--color-border-light)] p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-[var(--color-surface-subtle)] animate-pulse" />
                  <div className="h-4 w-28 rounded bg-[var(--color-surface-subtle)] animate-pulse" />
                </div>
                <div className="h-3 w-full rounded bg-[var(--color-surface-subtle)] animate-pulse" />
                <div className="h-3 w-3/4 rounded bg-[var(--color-surface-subtle)] animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ═══════ SECTION 1: Active Skills ═══════ */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-bold text-text-primary">
            {DASHBOARD.skills.activeHeading}
            {activeSkillDetails.length > 0 && (
              <span className="ml-2 text-[12px] font-normal text-[var(--color-text-muted)]">
                ({activeSkillDetails.length})
              </span>
            )}
          </h3>
        </div>

        {activeSkillDetails.length === 0 ? (
          <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] p-8 text-center">
            <p className="text-[14px] text-[var(--color-text-muted)]">
              {DASHBOARD.skills.emptyState}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {activeSkillDetails.map((skill) => {
              const isExpanded = expandedSkillId === skill.skill_id;
              const relatedSubs = subSkills.filter(
                (s) => s.parent_skill_id === skill.skill_id
              );
              const isShowingForm = showSubSkillForm === skill.skill_id;

              return (
                <div
                  key={skill.skill_id}
                  className="rounded-[8px] bg-white border border-[var(--color-border-light)] overflow-hidden transition-shadow duration-[180ms] hover:shadow-[var(--shadow-sm)]"
                >
                  {/* Skill header */}
                  <div className="px-4 py-3 flex items-center justify-between gap-3">
                    <button
                      onClick={() =>
                        setExpandedSkillId(isExpanded ? null : skill.skill_id)
                      }
                      className="flex items-center gap-3 flex-1 text-left cursor-pointer min-w-0"
                    >
                      <span className="text-[20px] leading-none shrink-0">
                        {skill.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-semibold text-text-primary truncate">
                          {skill.name}
                        </p>
                        <p className="text-[12px] text-[var(--color-text-muted)] truncate">
                          {skill.description}
                        </p>
                      </div>
                      {relatedSubs.length > 0 && (
                        <span className="flex items-center gap-1 text-[12px] text-[var(--color-text-muted)] shrink-0">
                          <ChevronIcon open={isExpanded} />
                          {relatedSubs.length}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => handleDeactivate(skill.skill_id)}
                      disabled={togglingSkillId === skill.skill_id}
                      className="shrink-0 text-[12px] font-medium text-[var(--color-text-muted)] hover:text-danger transition-colors cursor-pointer px-2 py-1 rounded-[4px] hover:bg-danger/5"
                    >
                      {togglingSkillId === skill.skill_id ? (
                        <Spinner />
                      ) : (
                        DASHBOARD.skills.deactivateCta
                      )}
                    </button>
                  </div>

                  {/* Expanded: Sub-skills + form */}
                  {isExpanded && (
                    <div className="border-t border-[var(--color-border-light)] bg-[var(--color-surface-subtle)] px-4 py-3">
                      {/* Sub-skills list */}
                      {relatedSubs.length > 0 ? (
                        <div className="space-y-1.5 mb-3">
                          {relatedSubs.map((sub) => (
                            <div
                              key={sub.name}
                              className="flex items-start justify-between gap-2 rounded-[6px] bg-white border border-[var(--color-border-light)] px-3 py-2.5"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <p className="text-[13px] font-semibold text-text-primary">
                                    {sub.name}
                                  </p>
                                  {sub.source === "youtube" && (
                                    <span title="Created from YouTube video" className="text-[11px] text-[var(--color-text-muted)]">
                                      YT
                                    </span>
                                  )}
                                </div>
                                <p className="mt-0.5 text-[12px] text-[var(--color-text-muted)] line-clamp-2">
                                  {sub.content}
                                </p>
                              </div>
                              <button
                                onClick={() =>
                                  handleDeleteSubSkill(skill.skill_id, sub.name)
                                }
                                disabled={deletingSubSkill === sub.name}
                                className="shrink-0 text-[var(--color-text-muted)] hover:text-danger transition-colors cursor-pointer mt-0.5 p-0.5 rounded hover:bg-danger/5"
                              >
                                <TrashIcon />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[12px] text-[var(--color-text-muted)] mb-3">
                          {DASHBOARD.skills.emptySubSkills}
                        </p>
                      )}

                      {/* Add sub-skill form */}
                      {isShowingForm ? (
                        <div className="rounded-[6px] bg-white border border-[var(--color-border-light)] p-3 space-y-2">
                          <input
                            type="text"
                            placeholder={DASHBOARD.skills.subSkillNamePlaceholder}
                            value={subSkillName}
                            onChange={(e) => setSubSkillName(e.target.value)}
                            autoFocus
                            className="w-full h-8 px-3 rounded-[6px] border border-[var(--color-border-light)] text-[13px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none transition-colors"
                          />
                          <textarea
                            placeholder={DASHBOARD.skills.subSkillContentPlaceholder}
                            value={subSkillContent}
                            onChange={(e) => setSubSkillContent(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 rounded-[6px] border border-[var(--color-border-light)] text-[13px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none resize-none transition-colors"
                          />
                          <div className="flex gap-2">
                            <button
                              className="px-3 py-1.5 rounded-[6px] bg-text-primary text-white text-[12px] font-semibold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                              disabled={savingSubSkill}
                              onClick={() => handleAddSubSkill(skill.skill_id)}
                            >
                              {savingSubSkill ? "Saving..." : "Save"}
                            </button>
                            <button
                              className="px-3 py-1.5 rounded-[6px] text-[12px] font-medium text-[var(--color-text-subtle)] hover:bg-[var(--color-border-light)] transition-colors cursor-pointer"
                              onClick={() => {
                                setShowSubSkillForm(null);
                                setSubSkillName("");
                                setSubSkillContent("");
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setShowSubSkillForm(skill.skill_id);
                            setExpandedSkillId(skill.skill_id);
                          }}
                          className="inline-flex items-center gap-1.5 text-[13px] text-[var(--color-text-subtle)] hover:text-text-primary transition-colors cursor-pointer font-medium"
                        >
                          <PlusIcon />
                          {DASHBOARD.skills.addSubSkill}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ═══════ SECTION: Learn from YouTube ═══════ */}
      <section className="rounded-[8px] bg-white border border-[var(--color-border-light)] p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[var(--color-text-subtle)]"><YouTubeIcon /></span>
          <h3 className="text-[15px] font-bold text-text-primary">
            Learn from YouTube
          </h3>
        </div>
        <p className="text-[13px] text-[var(--color-text-muted)] mb-4">
          Paste a tutorial video URL. Your Workpal will extract the knowledge and add it as a skill.
        </p>
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://youtube.com/watch?v=..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !youtubeLoading) handleYouTubeSkill();
            }}
            className="flex-1 h-9 px-3 rounded-[6px] border border-[var(--color-border-light)] text-[14px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none transition-colors"
          />
          <button
            onClick={handleYouTubeSkill}
            disabled={youtubeLoading || !youtubeUrl.trim()}
            className="shrink-0 px-4 h-9 rounded-[6px] bg-text-primary text-white text-[13px] font-semibold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-40 disabled:cursor-default"
          >
            {youtubeLoading ? (
              <span className="flex items-center gap-2"><Spinner className="border-white border-t-transparent" /> Processing...</span>
            ) : (
              "Add Skill"
            )}
          </button>
        </div>
        {youtubeResult && (
          <p className="mt-3 text-[13px] text-success bg-success/5 border border-success/15 rounded-[6px] p-3">
            {youtubeResult}
          </p>
        )}
        {youtubeError && (
          <p className="mt-3 text-[13px] text-danger bg-danger/5 border border-danger/15 rounded-[6px] p-3">
            {youtubeError}
          </p>
        )}
        {/* Transcript paste area */}
        {showTranscriptPaste && (
          <div className="mt-3 space-y-2">
            <p className="text-[12px] text-[var(--color-text-muted)]">
              Paste the video transcript below. On YouTube, click &quot;...more&quot; under the video, then &quot;Show transcript&quot;, select all text, and paste here.
            </p>
            <textarea
              value={manualTranscript}
              onChange={(e) => setManualTranscript(e.target.value)}
              placeholder="Paste transcript text here..."
              rows={4}
              className="w-full px-3 py-2 rounded-[6px] border border-[var(--color-border-light)] text-[13px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none resize-y transition-colors"
            />
            {manualTranscript.trim() && (
              <button
                onClick={handleYouTubeSkill}
                disabled={youtubeLoading || !youtubeUrl.trim()}
                className="px-4 h-8 rounded-[6px] bg-text-primary text-white text-[13px] font-semibold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-40"
              >
                {youtubeLoading ? (
                  <span className="flex items-center gap-2"><Spinner className="border-white border-t-transparent" /> Processing...</span>
                ) : (
                  "Add Skill with Transcript"
                )}
              </button>
            )}
          </div>
        )}
        {!showTranscriptPaste && youtubeUrl.trim() && (
          <button
            onClick={() => setShowTranscriptPaste(true)}
            className="mt-2 text-[12px] text-[var(--color-text-muted)] hover:text-text-primary underline cursor-pointer transition-colors"
          >
            Have the transcript? Paste it manually
          </button>
        )}
      </section>

      {/* ═══════ SECTION 2: Skills Catalog ═══════ */}
      <section>
        <h3 className="text-[15px] font-bold text-text-primary mb-4">
          {DASHBOARD.skills.catalogHeading}
        </h3>

        {/* Search bar */}
        <div className="relative mb-4">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder={DASHBOARD.skills.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-8 rounded-full border border-[var(--color-border-light)] bg-[var(--color-surface-subtle)] text-[14px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-border-strong)] focus:bg-white focus:outline-none transition-all duration-[180ms]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-text-primary cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1 -mx-1 px-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`shrink-0 px-3 py-1 rounded-full text-[12px] font-medium transition-all duration-[180ms] cursor-pointer border ${
              selectedCategory === null
                ? "border-text-primary bg-text-primary text-white"
                : "border-[var(--color-border-light)] bg-white text-[var(--color-text-subtle)] hover:border-[var(--color-border-strong)] hover:text-text-primary"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat ? null : cat)
              }
              className={`shrink-0 px-3 py-1 rounded-full text-[12px] font-medium transition-all duration-[180ms] cursor-pointer border ${
                selectedCategory === cat
                  ? "border-text-primary bg-text-primary text-white"
                  : "border-[var(--color-border-light)] bg-white text-[var(--color-text-subtle)] hover:border-[var(--color-border-strong)] hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Catalog grid */}
        {filteredCatalog.length === 0 ? (
          <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] p-8 text-center">
            <p className="text-[14px] text-[var(--color-text-muted)]">
              No skills match your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredCatalog.map((skill) => {
              const isActive = activeSkillIds.has(skill.skill_id);
              const isToggling = togglingSkillId === skill.skill_id;

              return (
                <div
                  key={skill.skill_id}
                  className={`rounded-[8px] bg-white border p-4 flex flex-col justify-between transition-all duration-[180ms] ${
                    isActive
                      ? "border-cta/30 shadow-[inset_0_0_0_1px_rgba(0,122,90,0.08)]"
                      : "border-[var(--color-border-light)] hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-sm)]"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[20px] leading-none">{skill.icon}</span>
                      {isActive && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-cta font-medium bg-cta/8 px-2 py-0.5 rounded-full">
                          <CheckIcon />
                          Active
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-[14px] font-semibold text-text-primary">
                      {skill.name}
                    </p>
                    <p className="mt-0.5 text-[12px] text-[var(--color-text-muted)] line-clamp-2 leading-[1.5]">
                      {skill.description}
                    </p>
                  </div>
                  {!isActive && (
                    <div className="mt-3">
                      <button
                        onClick={() => handleActivate(skill)}
                        disabled={isToggling}
                        className="w-full h-8 rounded-[6px] border border-[var(--color-border-strong)] text-[13px] font-medium text-text-primary hover:bg-[var(--color-surface-subtle)] hover:border-text-primary transition-all duration-[180ms] cursor-pointer disabled:opacity-50 disabled:cursor-default"
                      >
                        {isToggling ? (
                          <Spinner />
                        ) : (
                          DASHBOARD.skills.activateCta
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
