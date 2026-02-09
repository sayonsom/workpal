"use client";

import { useState, useEffect, useCallback } from "react";
import { HERO, FINAL_CTA } from "@/lib/constants";
import { signup, checkHandle, ApiException } from "@/lib/api";
import SignupModal from "./SignupModal";
import Toast from "../ui/Toast";

/* ── Inline SVG icons ── */

function ShieldCheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M8 1L2 4v4c0 3.5 2.5 6.5 6 7.5 3.5-1 6-4 6-7.5V4L8 1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5.5 8l2 2 3-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M8 1v3M8 12v3M1 8h3M12 8h3M3.5 3.5l2 2M10.5 10.5l2 2M12.5 3.5l-2 2M5.5 10.5l-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PencilIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M11.5 1.5l3 3L5 14H2v-3l9.5-9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function emailToUsername(email: string): string {
  const at = email.indexOf("@");
  if (at <= 0) return "";
  return email.substring(0, at).toLowerCase().replace(/[^a-z0-9._-]/g, "");
}

export default function BottomCTA() {
  const [email, setEmail] = useState("");
  const [workpalPrefix, setWorkpalPrefix] = useState("");
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Signup modal state
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupAgentEmail, setSignupAgentEmail] = useState("");

  // Error toast
  const [toastError, setToastError] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Handle availability
  const [handleAvailable, setHandleAvailable] = useState<boolean | null>(null);
  const [checkingHandle, setCheckingHandle] = useState(false);

  const [betaRemaining, setBetaRemaining] = useState<number | null>(null);
  const [betaPercentage, setBetaPercentage] = useState<number | null>(null);

  const derivedPrefix = emailToUsername(email);
  const activePrefix = isCustomizing ? workpalPrefix : derivedPrefix;
  const workpalAddress = activePrefix ? `${activePrefix}@workpal.email` : "";

  useEffect(() => {
    async function fetchBetaCount() {
      try {
        const res = await fetch("/api/beta-count");
        if (res.ok) {
          const data = await res.json();
          setBetaRemaining(data.remaining);
          setBetaPercentage(data.percentage);
        }
      } catch {
        setBetaRemaining(459);
        setBetaPercentage(69);
      }
    }
    fetchBetaCount();
  }, []);

  // Debounced handle availability check
  useEffect(() => {
    if (!activePrefix || activePrefix.length < 2) {
      setHandleAvailable(null);
      setCheckingHandle(false);
      return;
    }
    // Clear old result but don't block button yet (debounce hasn't fired)
    setHandleAvailable(null);
    const timer = setTimeout(async () => {
      setCheckingHandle(true); // block button only when API fires
      try {
        const result = await checkHandle(activePrefix);
        setHandleAvailable(result.available);
      } catch {
        setHandleAvailable(null);
      } finally {
        setCheckingHandle(false);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [activePrefix]);

  const handleCustomizeClick = useCallback(() => {
    setIsCustomizing(true);
    setWorkpalPrefix(derivedPrefix);
  }, [derivedPrefix]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email) { setError("Enter your email address."); return; }
    if (!activePrefix) { setError("Your Workpal email address is empty."); return; }
    if (handleAvailable === false) { setError("That handle is taken. Try another."); return; }

    setLoading(true);
    setShowToast(false);
    try {
      const result = await signup({ email, password: "", workpal_handle: activePrefix });
      // Update beta counter (non-critical)
      try {
        await fetch("/api/beta-count", { method: "POST" });
      } catch { /* non-critical */ }
      // Open verification modal
      setSignupAgentEmail(result.agent_email);
      setShowSignupModal(true);
    } catch (err) {
      if (err instanceof ApiException && err.status === 409) {
        setToastError("An account with this email already exists. Please log in.");
        setShowToast(true);
      } else {
        setToastError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        setShowToast(true);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16 md:py-24 bg-[#1D1C1D]">
      <div className="mx-auto max-w-[600px] px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-[32px] md:text-[40px] font-bold text-white leading-[1.15] tracking-tight">
            {FINAL_CTA.heading}
          </h2>
          <p className="mt-3 text-[16px] text-white/60 leading-[1.5]">
            {FINAL_CTA.subtext}
          </p>
        </div>

        {/* Form card — same structure as Hero but on dark bg */}
        <div className="rounded-[12px] border border-white/10 bg-white/[0.05] backdrop-blur p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Your email */}
            <div className="mb-5">
              <label htmlFor="bottom-email" className="flex items-center gap-1.5 text-[13px] font-bold text-white/90 mb-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-cta text-white text-[11px] font-bold">1</span>
                {HERO.steps.yourEmail.label}
              </label>
              <input
                id="bottom-email"
                type="email"
                required
                placeholder={HERO.steps.yourEmail.placeholder}
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (!isCustomizing) setWorkpalPrefix(""); }}
                className="w-full h-12 px-4 rounded-[8px] border border-white/20 bg-white/10 text-[16px] text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D1C1D] transition-colors duration-[120ms]"
              />
              <p className="mt-1.5 text-[12px] text-white/40 flex items-center gap-1">
                <LockIcon className="shrink-0 opacity-60" />
                {HERO.steps.yourEmail.helpText}
              </p>
            </div>

            {/* Step 2: Your Workpal email */}
            <div className="mb-5">
              <label htmlFor="bottom-workpal" className="flex items-center gap-1.5 text-[13px] font-bold text-white/90 mb-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-cta text-white text-[11px] font-bold">2</span>
                {HERO.steps.workpalEmail.label}
              </label>

              {isCustomizing ? (
                <div className="flex">
                  <input
                    id="bottom-workpal"
                    type="text"
                    value={workpalPrefix}
                    onChange={(e) => setWorkpalPrefix(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ""))}
                    className="flex-1 h-12 px-4 rounded-l-[8px] border border-r-0 border-white/20 bg-white/10 text-[16px] text-white focus:border-white/50 focus:outline-none transition-colors duration-[120ms]"
                    autoFocus
                  />
                  <span className="inline-flex items-center h-12 px-4 rounded-r-[8px] border border-l-0 border-white/20 bg-white/[0.05] text-[15px] text-white/50 font-medium whitespace-nowrap">
                    {HERO.steps.workpalEmail.suffix}
                  </span>
                </div>
              ) : (
                <div className="flex items-center h-12 px-4 rounded-[8px] border border-white/10 bg-white/[0.05]">
                  <SparkleIcon className="text-cta mr-2 shrink-0" />
                  <span className="flex-1 text-[16px] font-medium text-white truncate">
                    {workpalAddress || (
                      <span className="text-white/30 font-normal">Enter your email above to generate...</span>
                    )}
                  </span>
                  {derivedPrefix && (
                    <button
                      type="button"
                      onClick={handleCustomizeClick}
                      className="shrink-0 ml-2 inline-flex items-center gap-1 text-[12px] font-bold text-white/50 hover:text-white transition-colors duration-[120ms]"
                    >
                      <PencilIcon />
                      {HERO.steps.workpalEmail.editLabel}
                    </button>
                  )}
                </div>
              )}
              <div className="mt-1.5 flex items-center gap-1">
                <ShieldCheckIcon className="shrink-0 text-cta opacity-70" />
                <p className="text-[12px] text-white/40">
                  {HERO.steps.workpalEmail.helpText}
                </p>
                {activePrefix && activePrefix.length >= 2 && !checkingHandle && (
                  <span className="ml-auto text-[12px] font-bold">
                    {handleAvailable === true ? (
                      <span className="text-success">{HERO.handleAvailable}</span>
                    ) : handleAvailable === false ? (
                      <span className="text-[#ECB22E]">{HERO.handleTaken}</span>
                    ) : null}
                  </span>
                )}
              </div>
            </div>

            {/* Closed-loop banner */}
            {workpalAddress && (
              <div className="mb-5 rounded-[8px] bg-cta/10 border border-cta/20 px-4 py-3 flex items-start gap-3">
                <ShieldCheckIcon className="shrink-0 text-cta mt-0.5" />
                <div className="text-[13px] text-white/80 leading-[1.5]">
                  <span className="font-bold text-cta">{workpalAddress}</span>{" "}
                  {HERO.closedLoopNote}{" "}
                  <span className="font-bold text-white">{email || HERO.closedLoopNoteYou}</span>.
                  <br />
                  <span className="text-white/40 text-[12px]">It can never email your clients, team, or anyone else.</span>
                </div>
              </div>
            )}

            {error && <p className="mb-4 text-[13px] text-[#ECB22E] font-bold">{error}</p>}

            {/* CTA — shows "Checking..." with spinner when handle check is in progress */}
            <button
              type="submit"
              disabled={loading || checkingHandle}
              className="w-full h-12 rounded-[8px] bg-cta hover:bg-[#006B4F] text-white text-[16px] font-bold flex items-center justify-center gap-2 transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)] disabled:opacity-60"
            >
              {loading ? "Creating your Workpal..." : checkingHandle ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  {HERO.ctaLabel}
                  <ArrowRightIcon />
                </>
              )}
            </button>
          </form>

          {/* Beta counter */}
          <div className="mt-4">
            <div className="rounded-[6px] bg-[#ECB22E]/10 border border-[#ECB22E]/20 px-3 py-2">
              <div className="flex items-center gap-2 mb-1.5">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M8 1.5L1 14h14L8 1.5z" stroke="#ECB22E" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M8 6v3.5M8 11.5v.5" stroke="#ECB22E" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-[12px] font-bold text-[#ECB22E]/80">
                  {HERO.urgency}
                  {betaRemaining !== null && (
                    <> &mdash; <span className="text-[#ECB22E]">{betaRemaining.toLocaleString()} spots remaining</span></>
                  )}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-[#ECB22E]/15 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#ECB22E]/60 transition-all duration-700 ease-out"
                  style={{ width: `${betaPercentage ?? 69}%` }}
                />
              </div>
            </div>
          </div>

          <p className="mt-3 text-center text-[12px] text-white/40">
            {HERO.microcopy}
          </p>
        </div>
      </div>

      {/* Signup verification modal */}
      <SignupModal
        open={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        email={email}
        agentEmail={signupAgentEmail}
      />

      {/* Error toast */}
      <Toast
        message={toastError}
        variant="error"
        visible={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}
