"use client";

import { useEffect, useState, useCallback } from "react";
import Button from "../ui/Button";
import { DASHBOARD } from "@/lib/constants";
import {
  getSkillsCatalog,
  getActiveSkills,
  activateSkill,
  deactivateSkill,
  createSubSkill,
  deleteSubSkill,
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

function Spinner() {
  return <div className="w-4 h-4 border-2 border-cta border-t-transparent rounded-full animate-spin" />;
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

  // ── Loading state ──

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-5 h-5 border-2 border-cta border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* ═══════ SECTION 1: Active Skills ═══════ */}
      <div className="mb-8">
        <h3 className="text-[16px] font-bold text-text-primary mb-4">
          {DASHBOARD.skills.activeHeading}
          {activeSkillDetails.length > 0 && (
            <span className="ml-2 text-[13px] font-normal text-[var(--color-text-muted)]">
              ({activeSkillDetails.length})
            </span>
          )}
        </h3>

        {activeSkillDetails.length === 0 ? (
          <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] p-8 text-center">
            <p className="text-[14px] text-[var(--color-text-muted)]">
              {DASHBOARD.skills.emptyState}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeSkillDetails.map((skill) => {
              const isExpanded = expandedSkillId === skill.skill_id;
              const relatedSubs = subSkills.filter(
                (s) => s.parent_skill_id === skill.skill_id
              );
              const isShowingForm = showSubSkillForm === skill.skill_id;

              return (
                <div
                  key={skill.skill_id}
                  className="rounded-[8px] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] border-l-[3px] border-l-cta overflow-hidden"
                >
                  {/* Skill header */}
                  <div className="p-4 flex items-start justify-between gap-3">
                    <button
                      onClick={() =>
                        setExpandedSkillId(isExpanded ? null : skill.skill_id)
                      }
                      className="flex items-start gap-3 flex-1 text-left cursor-pointer"
                    >
                      <span className="text-[24px] leading-none mt-0.5 shrink-0">
                        {skill.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold text-text-primary">
                          {skill.name}
                        </p>
                        <p className="mt-0.5 text-[13px] text-[var(--color-text-subtle)]">
                          {skill.description}
                        </p>
                        {relatedSubs.length > 0 && (
                          <div className="mt-2 flex items-center gap-1 text-[12px] text-[var(--color-text-muted)]">
                            <ChevronIcon open={isExpanded} />
                            <span>
                              {relatedSubs.length} customization
                              {relatedSubs.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                    <Button
                      variant="ghost"
                      className="!text-[12px] !h-7 !text-danger shrink-0"
                      onClick={() => handleDeactivate(skill.skill_id)}
                      disabled={togglingSkillId === skill.skill_id}
                    >
                      {togglingSkillId === skill.skill_id ? (
                        <Spinner />
                      ) : (
                        DASHBOARD.skills.deactivateCta
                      )}
                    </Button>
                  </div>

                  {/* Expanded: Sub-skills + form */}
                  {isExpanded && (
                    <div className="border-t border-[var(--color-border-light)] bg-[var(--color-surface-subtle)] p-4">
                      {/* Sub-skills list */}
                      {relatedSubs.length > 0 ? (
                        <div className="space-y-2 mb-3">
                          {relatedSubs.map((sub) => (
                            <div
                              key={sub.name}
                              className="flex items-start justify-between gap-2 rounded-[6px] bg-white border border-[var(--color-border-light)] p-3"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <p className="text-[13px] font-bold text-text-primary">
                                    {sub.name}
                                  </p>
                                  {sub.source === "youtube" && (
                                    <span title="Created from YouTube video" className="text-[12px]">
                                      🎥
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
                                className="shrink-0 text-[var(--color-text-muted)] hover:text-danger transition-colors cursor-pointer mt-0.5"
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
                        <div className="rounded-[6px] bg-white border border-cta/30 p-3 space-y-2">
                          <input
                            type="text"
                            placeholder={DASHBOARD.skills.subSkillNamePlaceholder}
                            value={subSkillName}
                            onChange={(e) => setSubSkillName(e.target.value)}
                            autoFocus
                            className="w-full h-8 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[13px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none"
                          />
                          <textarea
                            placeholder={DASHBOARD.skills.subSkillContentPlaceholder}
                            value={subSkillContent}
                            onChange={(e) => setSubSkillContent(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 rounded-[6px] border border-[var(--color-border-strong)] text-[13px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none resize-none"
                          />
                          <div className="flex gap-2">
                            <Button
                              variant="primary"
                              className="!text-[12px] !h-7"
                              disabled={savingSubSkill}
                              onClick={() => handleAddSubSkill(skill.skill_id)}
                            >
                              {savingSubSkill ? "Saving..." : "Save"}
                            </Button>
                            <Button
                              variant="ghost"
                              className="!text-[12px] !h-7"
                              onClick={() => {
                                setShowSubSkillForm(null);
                                setSubSkillName("");
                                setSubSkillContent("");
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setShowSubSkillForm(skill.skill_id);
                            setExpandedSkillId(skill.skill_id);
                          }}
                          className="inline-flex items-center gap-1.5 text-[13px] text-cta hover:text-cta-hover transition-colors cursor-pointer font-medium"
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
      </div>

      {/* ═══════ DIVIDER ═══════ */}
      <div className="border-t border-[var(--color-border-light)] mb-8" />

      {/* ═══════ SECTION 2: Skills Catalog ═══════ */}
      <div>
        <h3 className="text-[16px] font-bold text-text-primary mb-4">
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
            className="w-full h-9 pl-9 pr-8 rounded-[6px] border border-[var(--color-border-strong)] text-[14px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none"
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
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 -mx-1 px-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${
              selectedCategory === null
                ? "bg-cta text-white"
                : "bg-[var(--color-surface-subtle)] text-[var(--color-text-subtle)] hover:text-text-primary"
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
              className={`shrink-0 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-cta text-white"
                  : "bg-[var(--color-surface-subtle)] text-[var(--color-text-subtle)] hover:text-text-primary"
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
          <div className="grid grid-cols-2 gap-3">
            {filteredCatalog.map((skill) => {
              const isActive = activeSkillIds.has(skill.skill_id);
              const isToggling = togglingSkillId === skill.skill_id;

              return (
                <div
                  key={skill.skill_id}
                  className="rounded-[8px] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-4 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[24px] leading-none">{skill.icon}</span>
                    <p className="mt-2 text-[14px] font-bold text-text-primary">
                      {skill.name}
                    </p>
                    <p className="mt-1 text-[13px] text-[var(--color-text-subtle)] line-clamp-2">
                      {skill.description}
                    </p>
                  </div>
                  <div className="mt-3">
                    {isActive ? (
                      <span className="inline-flex items-center gap-1 text-[13px] text-cta font-medium">
                        <CheckIcon />
                        Active
                      </span>
                    ) : (
                      <Button
                        variant="primary"
                        className="!text-[13px] !h-8 w-full"
                        onClick={() => handleActivate(skill)}
                        disabled={isToggling}
                      >
                        {isToggling ? (
                          <Spinner />
                        ) : (
                          DASHBOARD.skills.activateCta
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
