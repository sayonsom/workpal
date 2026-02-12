"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { personalizeAgent } from "@/lib/api";

interface PersonalizePanelProps {
  agentId: string;
}

export default function PersonalizePanel({ agentId }: PersonalizePanelProps) {
  const [profileText, setProfileText] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    display_name: string;
    domain_tags: string[];
    profile_summary: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);

    const hasProfile = profileText.trim().length > 0;
    const hasLinkedin = linkedinUrl.trim().length > 0;

    if (!hasProfile && !hasLinkedin) {
      setError("Please provide your profile text or LinkedIn URL (or both).");
      return;
    }

    if (hasProfile && profileText.trim().length < 50) {
      setError("Profile text must be at least 50 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await personalizeAgent(agentId, {
        ...(hasProfile ? { profile_text: profileText.trim() } : {}),
        ...(hasLinkedin ? { linkedin_url: linkedinUrl.trim() } : {}),
      });
      setResult({
        display_name: res.display_name,
        domain_tags: res.domain_tags,
        profile_summary: res.profile_summary,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h3 className="text-[16px] font-bold text-text-primary mb-1">
        Personalize your agent
      </h3>
      <p className="text-[13px] text-[var(--color-text-subtle)] mb-6">
        Help your Workpal understand your work style by sharing your background.
        Provide a short profile or your LinkedIn URL (or both).
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        {/* LinkedIn info box */}
        <div className="rounded-[8px] bg-[#F0F9FF] border border-[#2980B9]/20 px-4 py-3 flex items-start gap-2.5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#2980B9]">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 7v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="5" r="0.75" fill="currentColor" />
          </svg>
          <p className="text-[13px] text-[#1a5276] leading-[1.5]">
            Adding your LinkedIn helps your Workpal understand your expertise and write in your professional voice. It takes about 10 seconds.
          </p>
        </div>

        {/* Profile text */}
        <div>
          <label
            htmlFor="profile-text"
            className="block text-[13px] font-bold text-text-primary mb-1.5"
          >
            Profile text
          </label>
          <textarea
            id="profile-text"
            placeholder="Describe your role, industry, and the kind of work you do (min 50 characters)..."
            value={profileText}
            onChange={(e) => setProfileText(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 rounded-[6px] border border-[var(--color-border-strong)] text-[14px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none resize-none"
          />
          <p className="mt-1 text-[11px] text-[var(--color-text-muted)]">
            {profileText.length}/50 characters minimum
          </p>
        </div>

        {/* LinkedIn URL */}
        <div>
          <label
            htmlFor="linkedin-url"
            className="block text-[13px] font-bold text-text-primary mb-1.5"
          >
            LinkedIn URL <span className="font-normal text-[var(--color-text-muted)]">(optional)</span>
          </label>
          <input
            id="linkedin-url"
            type="url"
            placeholder="https://linkedin.com/in/your-profile"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            className="w-full h-10 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[14px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none"
          />
        </div>

        {error && (
          <p className="text-[13px] text-danger font-bold">{error}</p>
        )}

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {linkedinUrl.trim() ? "Enriching from LinkedIn..." : "Personalizing..."}
            </span>
          ) : "Personalize Agent"}
        </Button>
      </form>

      {/* Result */}
      {result && (
        <div className="mt-6 rounded-[8px] bg-[#dcfce7] border border-cta/20 p-5">
          <p className="text-[14px] font-bold text-cta mb-3">
            Agent personalized successfully!
          </p>
          <div className="space-y-2 text-[13px] text-text-primary">
            <p>
              <span className="font-bold">Display name:</span>{" "}
              {result.display_name}
            </p>
            {result.domain_tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold">Domain tags:</span>
                {result.domain_tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded-full bg-white text-[11px] text-[var(--color-text-muted)] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p>
              <span className="font-bold">Profile summary:</span>{" "}
              {result.profile_summary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
