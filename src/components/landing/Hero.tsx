"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { HERO } from "@/lib/constants";
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

function CheckCircleIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className={className}>
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 9.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Flow step icons ── */
function FlowInboxIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="3" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M1.5 5l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function FlowForwardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 8H5a3.5 3.5 0 00-3.5 3.5V12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function FlowSparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1v3M8 12v3M1 8h3M12 8h3M3.5 3.5l2 2M10.5 10.5l2 2M12.5 3.5l-2 2M5.5 10.5l-2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function FlowReplyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M7 3L2 8l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 8h7a3.5 3.5 0 013.5 3.5V12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function FlowSendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 8l12-5-5 12-2-5-5-2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M7 9l7-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

const FLOW_ICONS: Record<string, React.FC> = {
  inbox: FlowInboxIcon,
  forward: FlowForwardIcon,
  sparkle: FlowSparkleIcon,
  reply: FlowReplyIcon,
  send: FlowSendIcon,
};

function FlowDownArrow() {
  return (
    <div className="flex justify-center h-4">
      <svg width="8" height="16" viewBox="0 0 8 16" fill="none" aria-hidden="true">
        <path d="M4 0v14M4 14L1 11M4 14l3-3" stroke="rgba(29,28,29,0.25)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ── Closed-loop flow diagram ── */
function FlowDiagram() {
  const { flow } = HERO;

  return (
    <div className="mt-8">
      <p className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
        {flow.title}
      </p>
      <div className="rounded-[10px] border border-[var(--color-border-light)] bg-surface-subtle p-4">
        {flow.steps.map((step, i) => {
          const Icon = FLOW_ICONS[step.icon] || FlowInboxIcon;
          const isWorkpal = step.icon === "sparkle" || step.icon === "reply";
          const isSend = step.icon === "send";

          return (
            <div key={i}>
              {i > 0 && <FlowDownArrow />}
              <div className={`flex items-center gap-3 rounded-[8px] px-3 py-2.5 ${
                isWorkpal
                  ? "bg-[#f0fdf4] border border-cta/15"
                  : isSend
                    ? "bg-white border border-[var(--color-border-light)]"
                    : "bg-white border border-[var(--color-border-light)]"
              }`}>
                <span className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full ${
                  isWorkpal ? "bg-cta/10 text-cta" : "bg-[var(--color-border-light)] text-[var(--color-text-muted)]"
                }`}>
                  <Icon />
                </span>
                <div className="min-w-0">
                  <p className={`text-[13px] font-bold leading-tight ${
                    isWorkpal ? "text-cta" : "text-text-primary"
                  }`}>
                    {step.label}
                  </p>
                  <p className="text-[11px] text-[var(--color-text-muted)] truncate">
                    {step.actor}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Closed-loop note */}
        <div className="mt-3 flex items-center gap-2 px-1">
          <ShieldCheckIcon className="shrink-0 text-cta w-3.5 h-3.5" />
          <p className="text-[13px] font-semibold text-text-primary leading-[1.4]">
            {flow.closedNote}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Extract username prefix from email */
function emailToUsername(email: string): string {
  const at = email.indexOf("@");
  if (at <= 0) return "";
  return email.substring(0, at).toLowerCase().replace(/[^a-z0-9._-]/g, "");
}

/* ── Hero Section ── */
function HeroContent() {
  // Referral code from URL (?ref=XXXX)
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref") || "";

  // Form state
  const [email, setEmail] = useState("");
  const [workpalPrefix, setWorkpalPrefix] = useState("");
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Signup modal state
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupAgentEmail, setSignupAgentEmail] = useState("");
  const [signupReferralCode, setSignupReferralCode] = useState("");
  const [signupIsPremium, setSignupIsPremium] = useState(false);
  const [signupPremiumUntil, setSignupPremiumUntil] = useState(0);

  // Error toast
  const [toastError, setToastError] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Handle availability
  const [handleAvailable, setHandleAvailable] = useState<boolean | null>(null);
  const [checkingHandle, setCheckingHandle] = useState(false);

  // Beta counter
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
  // Button is only blocked during the actual API call, not during debounce wait
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
      const result = await signup({
        email,
        password: "",
        workpal_handle: activePrefix,
        referral_code: refCode || undefined,
      });
      // Update beta counter (non-critical)
      try {
        const counterRes = await fetch("/api/beta-count", { method: "POST" });
        if (counterRes.ok) {
          const data = await counterRes.json();
          setBetaRemaining(data.remaining);
        }
      } catch { /* non-critical */ }
      // Open signup success modal
      setSignupAgentEmail(result.agent_email);
      setSignupReferralCode(result.referral_code || "");
      setSignupIsPremium(result.is_premium ?? false);
      setSignupPremiumUntil(result.premium_until ?? 0);
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
    <section id="hero-signup" className="animate-fade-in py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* LEFT COLUMN — Messaging */}
        <div className="order-1 lg:order-1">
          <Badge variant="subtle">{HERO.badge}</Badge>

          <h1 className="mt-4 text-[34px] md:text-[44px] font-bold text-text-primary leading-[1.15] tracking-tight">
            {HERO.headline}
          </h1>

          <p className="mt-3 text-[18px] md:text-[20px] text-[var(--color-text-subtle)] leading-[1.4] max-w-[480px]">
            {HERO.headlineSub}
          </p>

          <p className="mt-4 text-[15px] text-[var(--color-text-muted)] leading-[1.55] max-w-[480px]">
            {HERO.subtext}
          </p>

          {/* Value bullets */}
          <ul className="mt-5 space-y-3">
            {HERO.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircleIcon className="shrink-0 mt-0.5 text-cta" />
                <span className="text-[15px] text-text-primary leading-[1.4]">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>

          {/* Flow diagram */}
          <FlowDiagram />
        </div>

        {/* RIGHT COLUMN — Signup form card */}
        <div className="order-2 lg:order-2">
          <div className="rounded-[12px] border border-[var(--color-border-light)] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Your email */}
              <div className="mb-5">
                <label
                  htmlFor="hero-email"
                  className="flex items-center gap-1.5 text-[13px] font-bold text-text-primary mb-2"
                >
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-cta text-white text-[11px] font-bold">1</span>
                  {HERO.steps.yourEmail.label}
                </label>
                <input
                  id="hero-email"
                  type="email"
                  required
                  placeholder={HERO.steps.yourEmail.placeholder}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (!isCustomizing) setWorkpalPrefix("");
                  }}
                  className="w-full h-12 px-4 rounded-[8px] border border-[var(--color-border-strong)] text-[16px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 transition-colors duration-[120ms]"
                />
                <p className="mt-1.5 text-[12px] text-[var(--color-text-muted)] flex items-center gap-1">
                  <LockIcon className="shrink-0 opacity-60" />
                  {HERO.steps.yourEmail.helpText}
                </p>
              </div>

              {/* Step 2: Your Workpal email */}
              <div className="mb-5">
                <label
                  htmlFor="hero-workpal"
                  className="flex items-center gap-1.5 text-[13px] font-bold text-text-primary mb-2"
                >
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-cta text-white text-[11px] font-bold">2</span>
                  {HERO.steps.workpalEmail.label}
                </label>

                {isCustomizing ? (
                  <div className="flex">
                    <input
                      id="hero-workpal"
                      type="text"
                      value={workpalPrefix}
                      onChange={(e) =>
                        setWorkpalPrefix(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ""))
                      }
                      className="flex-1 h-12 px-4 rounded-l-[8px] border border-r-0 border-[var(--color-border-strong)] text-[16px] text-text-primary focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 transition-colors duration-[120ms]"
                      autoFocus
                    />
                    <span className="inline-flex items-center h-12 px-4 rounded-r-[8px] border border-l-0 border-[var(--color-border-strong)] bg-surface-subtle text-[15px] text-[var(--color-text-muted)] font-medium whitespace-nowrap">
                      {HERO.steps.workpalEmail.suffix}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center h-12 px-4 rounded-[8px] border border-[var(--color-border-light)] bg-surface-subtle">
                    <SparkleIcon className="text-cta mr-2 shrink-0" />
                    <span className="flex-1 text-[16px] font-medium text-text-primary truncate">
                      {workpalAddress || (
                        <span className="text-[var(--color-text-muted)] font-normal">
                          Enter your email above...
                        </span>
                      )}
                    </span>
                    {derivedPrefix && (
                      <button
                        type="button"
                        onClick={handleCustomizeClick}
                        className="shrink-0 ml-2 inline-flex items-center gap-1 text-[12px] font-bold text-link hover:text-text-primary transition-colors duration-[120ms]"
                      >
                        <PencilIcon />
                        {HERO.steps.workpalEmail.editLabel}
                      </button>
                    )}
                  </div>
                )}
                <div className="mt-1.5 flex items-center gap-1">
                  <ShieldCheckIcon className="shrink-0 text-cta opacity-70" />
                  <p className="text-[12px] text-[var(--color-text-muted)]">
                    {HERO.steps.workpalEmail.helpText}
                  </p>
                  {activePrefix && activePrefix.length >= 2 && !checkingHandle && (
                    <span className="ml-auto text-[12px] font-bold">
                      {handleAvailable === true ? (
                        <span className="text-success">{HERO.handleAvailable}</span>
                      ) : handleAvailable === false ? (
                        <span className="text-danger">{HERO.handleTaken}</span>
                      ) : null}
                    </span>
                  )}
                </div>
              </div>

              {/* Closed-loop guarantee */}
              {workpalAddress && (
                <div className="mb-5 rounded-[8px] bg-[#f0fdf4] border border-cta/20 px-4 py-3 flex items-start gap-3">
                  <ShieldCheckIcon className="shrink-0 text-cta mt-0.5" />
                  <div className="text-[13px] text-text-primary leading-[1.5]">
                    <span className="font-bold text-cta">{workpalAddress}</span>{" "}
                    {HERO.closedLoopNote}{" "}
                    <span className="font-bold">{email || HERO.closedLoopNoteYou}</span>.
                    <br />
                    <span className="text-[var(--color-text-muted)] text-[12px]">
                      It can never email your clients, team, or anyone else.
                    </span>
                  </div>
                </div>
              )}

              {error && (
                <p className="mb-4 text-[13px] text-danger font-bold">{error}</p>
              )}

              {/* CTA — shows "Checking..." with spinner when handle check is in progress */}
              <Button
                type="submit"
                variant="primary"
                className="w-full h-12 text-[16px]"
                disabled={loading || checkingHandle}
              >
                {loading ? "Creating your Workpal..." : checkingHandle ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Checking...
                  </>
                ) : (
                  <>
                    {HERO.ctaLabel}
                    <ArrowRightIcon className="ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Beta counter */}
            <div className="mt-4">
              <div className="rounded-[6px] bg-[#FFF8E1] border border-[#ECB22E]/30 px-3 py-2">
                <div className="flex items-center gap-2 mb-1.5">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
                    <path d="M8 1.5L1 14h14L8 1.5z" stroke="#ECB22E" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M8 6v3.5M8 11.5v.5" stroke="#ECB22E" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="text-[12px] font-bold text-[#92700C]">
                    {HERO.urgency}
                    {betaRemaining !== null && (
                      <> &mdash; <span className="text-[#B8860B]">{betaRemaining.toLocaleString()} spots remaining</span></>
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

            <p className="mt-3 text-center text-[12px] text-[var(--color-text-muted)]">
              {HERO.microcopy}
            </p>

            <p className="mt-3 text-center text-[14px] text-[var(--color-text-subtle)]">
              Have an account?{" "}
              <a href="/login" className="font-semibold text-cta hover:text-cta-hover transition-colors">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Signup verification modal */}
      <SignupModal
        open={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        email={email}
        agentEmail={signupAgentEmail}
        referralCode={signupReferralCode}
        isPremium={signupIsPremium}
        premiumUntil={signupPremiumUntil}
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

export default function Hero() {
  return (
    <Suspense>
      <HeroContent />
    </Suspense>
  );
}
