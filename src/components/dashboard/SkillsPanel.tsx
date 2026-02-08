"use client";

import { useEffect, useState, useCallback } from "react";
import Button from "../ui/Button";
import { DASHBOARD } from "@/lib/constants";
import { getSkills, createSkill, deleteSkill } from "@/lib/api";
import type { Skill } from "@/lib/types";

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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

interface SkillsPanelProps {
  agentId: string;
}

export default function SkillsPanel({ agentId }: SkillsPanelProps) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSkills(agentId);
      setSkills(data ?? []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    setSaving(true);
    try {
      const skill = await createSkill(agentId, {
        name: name.trim(),
        description: description.trim(),
      });
      setSkills((prev) => [...prev, skill]);
      setName("");
      setDescription("");
      setShowForm(false);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(skillId: string) {
    setDeletingId(skillId);
    try {
      await deleteSkill(agentId, skillId);
      setSkills((prev) => prev.filter((s) => s.id !== skillId));
    } catch {
      // ignore
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-5 h-5 border-2 border-cta border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-bold text-text-primary">
          {DASHBOARD.skills.heading}
        </h3>
        {!showForm && (
          <Button
            variant="secondary"
            className="!text-[13px] !h-8"
            onClick={() => setShowForm(true)}
          >
            <PlusIcon />
            <span className="ml-1">{DASHBOARD.skills.addCta}</span>
          </Button>
        )}
      </div>

      {/* Add form */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-[8px] bg-white border border-cta/30 p-4 mb-4 space-y-3"
        >
          <input
            type="text"
            placeholder={DASHBOARD.skills.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            className="w-full h-9 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[14px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none"
          />
          <textarea
            placeholder={DASHBOARD.skills.descriptionPlaceholder}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-[6px] border border-[var(--color-border-strong)] text-[14px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none resize-none"
          />
          <div className="flex gap-2">
            <Button
              type="submit"
              variant="primary"
              className="!text-[13px] !h-8"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="!text-[13px] !h-8"
              onClick={() => {
                setShowForm(false);
                setName("");
                setDescription("");
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* List */}
      {skills.length === 0 && !showForm ? (
        <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] p-8 text-center">
          <p className="text-[14px] text-[var(--color-text-muted)]">
            {DASHBOARD.skills.emptyState}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {(Array.isArray(skills) ? skills : []).map((skill) => (
            <div
              key={skill.id}
              className="rounded-[8px] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-4 flex items-start justify-between gap-3"
            >
              <div>
                <p className="text-[14px] font-bold text-text-primary">
                  {skill.name}
                </p>
                <p className="mt-0.5 text-[13px] text-[var(--color-text-subtle)]">
                  {skill.description}
                </p>
              </div>
              <button
                onClick={() => handleDelete(skill.id)}
                disabled={deletingId === skill.id}
                className="shrink-0 text-[var(--color-text-muted)] hover:text-danger transition-colors cursor-pointer"
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
