"use client";

import { useEffect, useState, useCallback } from "react";
import Button from "../ui/Button";
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
      <div className="flex justify-center py-12">
        <div className="w-5 h-5 border-2 border-cta border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-bold text-text-primary">
          {DASHBOARD.samples.heading}
        </h3>
        {!showForm && (
          <Button
            variant="secondary"
            className="!text-[13px] !h-8"
            onClick={() => setShowForm(true)}
          >
            <PlusIcon />
            <span className="ml-1">{DASHBOARD.samples.addCta}</span>
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
            placeholder={DASHBOARD.samples.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            className="w-full h-9 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[14px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none"
          />
          <textarea
            placeholder={DASHBOARD.samples.descriptionPlaceholder}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 rounded-[6px] border border-[var(--color-border-strong)] text-[14px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none resize-none"
          />
          <textarea
            placeholder={DASHBOARD.samples.contentPlaceholder}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
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
                setContent("");
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* List */}
      {samples.length === 0 && !showForm ? (
        <div className="rounded-[8px] bg-white border border-[var(--color-border-light)] p-8 text-center">
          <p className="text-[14px] text-[var(--color-text-muted)]">
            {DASHBOARD.samples.emptyState}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {(Array.isArray(samples) ? samples : []).map((sample) => (
            <div
              key={sample.name}
              className="rounded-[8px] bg-white border border-[var(--color-border-light)] shadow-[var(--shadow-sm)] p-4 flex items-start justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-bold text-text-primary">
                  {sample.name}
                </p>
                {sample.description && (
                  <p className="mt-0.5 text-[12px] text-[var(--color-text-muted)]">
                    {sample.description}
                  </p>
                )}
                <p className="mt-1 text-[13px] text-[var(--color-text-subtle)] line-clamp-3">
                  {sample.content}
                </p>
              </div>
              <button
                onClick={() => handleDelete(sample.name)}
                disabled={deletingName === sample.name}
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
