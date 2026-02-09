"use client";

import { useEffect, useState, useCallback } from "react";
import { DASHBOARD } from "@/lib/constants";
import { getSamples, createSample, deleteSample } from "@/lib/api";
import type { Sample } from "@/lib/types";

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

function DocIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="3" y="1" width="10" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 5h4M6 8h4M6 11h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

interface SamplesPanelProps {
  agentId: string;
}

export default function SamplesPanel({ agentId }: SamplesPanelProps) {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingName, setDeletingName] = useState<string | null>(null);

  const fetchSamples = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSamples(agentId);
      setSamples(data ?? []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  useEffect(() => {
    fetchSamples();
  }, [fetchSamples]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setSaving(true);
    try {
      const sample = await createSample(agentId, {
        name: name.trim(),
        description: description.trim(),
        content: content.trim(),
      });
      setSamples((prev) => [...prev, sample]);
      setName("");
      setDescription("");
      setContent("");
      setShowForm(false);
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(sampleName: string) {
    setDeletingName(sampleName);
    try {
      await deleteSample(agentId, sampleName);
      setSamples((prev) => prev.filter((s) => s.name !== sampleName));
    } catch {
      // ignore
    } finally {
      setDeletingName(null);
    }
  }

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 w-32 rounded bg-[var(--color-surface-subtle)] animate-pulse" />
          <div className="h-8 w-28 rounded-[6px] bg-[var(--color-surface-subtle)] animate-pulse" />
        </div>
        <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] divide-y divide-[var(--color-border-light)]">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="px-4 py-3 flex items-center gap-3">
              <div className="w-5 h-5 rounded bg-[var(--color-surface-subtle)] animate-pulse shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-4 w-48 rounded bg-[var(--color-surface-subtle)] animate-pulse" />
                <div className="h-3 w-72 rounded bg-[var(--color-surface-subtle)] animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-bold text-text-primary">
          {DASHBOARD.samples.heading}
        </h3>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border border-[var(--color-border-strong)] text-[13px] font-medium text-text-primary hover:bg-[var(--color-surface-subtle)] transition-colors cursor-pointer"
          >
            <PlusIcon />
            {DASHBOARD.samples.addCta}
          </button>
        )}
      </div>

      {/* Add form */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-[8px] bg-white border border-[var(--color-border-light)] p-4 mb-4 space-y-3"
        >
          <input
            type="text"
            placeholder={DASHBOARD.samples.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            className="w-full h-9 px-3 rounded-[6px] border border-[var(--color-border-light)] text-[14px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none transition-colors"
          />
          <textarea
            placeholder={DASHBOARD.samples.descriptionPlaceholder}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 rounded-[6px] border border-[var(--color-border-light)] text-[14px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none resize-none transition-colors"
          />
          <textarea
            placeholder={DASHBOARD.samples.contentPlaceholder}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 rounded-[6px] border border-[var(--color-border-light)] text-[14px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none resize-none transition-colors"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-1.5 rounded-[6px] bg-text-primary text-white text-[13px] font-semibold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="px-4 py-1.5 rounded-[6px] text-[13px] font-medium text-[var(--color-text-subtle)] hover:bg-[var(--color-surface-subtle)] transition-colors cursor-pointer"
              onClick={() => {
                setShowForm(false);
                setName("");
                setDescription("");
                setContent("");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* List */}
      {samples.length === 0 && !showForm ? (
        <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] p-8 text-center">
          <div className="w-10 h-10 rounded-full bg-[var(--color-surface-subtle)] flex items-center justify-center mx-auto mb-3">
            <span className="text-[var(--color-text-muted)]"><DocIcon /></span>
          </div>
          <p className="text-[14px] text-[var(--color-text-muted)]">
            {DASHBOARD.samples.emptyState}
          </p>
        </div>
      ) : (
        <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] overflow-hidden divide-y divide-[var(--color-border-light)]">
          {(Array.isArray(samples) ? samples : []).map((sample) => (
            <div
              key={sample.name}
              className="px-4 py-3 flex items-start justify-between gap-3 hover:bg-[var(--color-surface-subtle)] transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-text-primary">
                  {sample.name}
                </p>
                {sample.description && (
                  <p className="mt-0.5 text-[12px] text-[var(--color-text-muted)]">
                    {sample.description}
                  </p>
                )}
                <p className="mt-1 text-[13px] text-[var(--color-text-subtle)] line-clamp-2">
                  {sample.content}
                </p>
              </div>
              <button
                onClick={() => handleDelete(sample.name)}
                disabled={deletingName === sample.name}
                className="shrink-0 p-1 rounded hover:bg-danger/5 text-[var(--color-text-muted)] hover:text-danger transition-colors cursor-pointer"
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
