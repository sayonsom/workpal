import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { SendIcon } from "../ui/Icons";
import { HERO } from "@/lib/constants";

/* ── Tiny inline icons for the workflow ── */

function InboxIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 4l6 4 6-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ForwardIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7H5a4 4 0 00-4 4v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1v3M8 12v3M1 8h3M12 8h3M3.5 3.5l2 2M10.5 10.5l2 2M12.5 3.5l-2 2M5.5 10.5l-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DownArrow() {
  return (
    <div className="flex justify-center py-1">
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true">
        <path d="M8 4v16M8 20l-4-4M8 20l4-4" stroke="rgba(29,28,29,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ── Step number pill ── */
function StepPill({ step }: { step: number }) {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-border-light)] text-[11px] font-bold text-[var(--color-text-muted)]">
      {step}
    </span>
  );
}

/* ── Workflow Diagram ── */
function WorkflowDiagram() {
  const { step1, step2, step3 } = HERO.workflow;

  return (
    <div className="space-y-0">
      {/* ── STEP 1: Boss email arrives ── */}
      <div className="rounded-[8px] border border-[var(--color-border-light)] bg-white shadow-[var(--shadow-sm)] overflow-hidden">
        <div className="px-3 py-2 bg-surface-subtle border-b border-[var(--color-border-light)] flex items-center gap-2">
          <StepPill step={1} />
          <span className="text-[11px] text-[var(--color-text-muted)] font-medium">{step1.label}</span>
        </div>
        <div className="px-3 py-2.5">
          <div className="flex items-center gap-1.5 text-[12px]">
            <InboxIcon />
            <span className="font-bold text-text-primary">{step1.from}</span>
            <span className="text-[var(--color-text-muted)]">&rarr;</span>
            <span className="text-[var(--color-text-subtle)]">{step1.to}</span>
          </div>
          <div className="mt-1 text-[13px] font-bold text-text-primary">{step1.subject}</div>
          <p className="mt-0.5 text-[12px] text-[var(--color-text-subtle)] leading-[1.4]">{step1.body}</p>
        </div>
      </div>

      <DownArrow />

      {/* ── STEP 2: Forward to Workpal ── */}
      <div className="rounded-[8px] border-2 border-info bg-[#f0f9ff] shadow-[var(--shadow-sm)] overflow-hidden">
        <div className="px-3 py-2 bg-[#e0f2fe] border-b border-info/20 flex items-center gap-2">
          <StepPill step={2} />
          <span className="text-[11px] text-info font-medium">{step2.label}</span>
        </div>
        <div className="px-3 py-2.5">
          <div className="flex items-center gap-1.5 text-[12px]">
            <ForwardIcon />
            <span className="font-bold text-text-primary">{step2.from}</span>
            <span className="text-info font-bold">&rarr;</span>
            <span className="font-bold text-info">{step2.to}</span>
          </div>
          <div className="mt-1 text-[13px] font-bold text-info">{step2.annotation} {HERO.workflow.step1.subject}</div>
        </div>
      </div>

      <DownArrow />

      {/* ── STEP 3: Workpal delivers ── */}
      <div className="rounded-[8px] border-2 border-cta bg-[#f0fdf4] shadow-[var(--shadow-sm)] overflow-hidden">
        <div className="px-3 py-2 bg-[#dcfce7] border-b border-cta/20 flex items-center gap-2">
          <StepPill step={3} />
          <span className="text-[11px] text-cta font-medium">{step3.label}</span>
        </div>
        <div className="px-3 py-2.5">
          <div className="flex items-center gap-1.5 text-[12px]">
            <SparkleIcon />
            <span className="font-bold text-cta">{step3.from}</span>
            <span className="text-[var(--color-text-muted)]">&rarr;</span>
            <span className="text-[var(--color-text-subtle)]">{step3.to}</span>
          </div>
          <div className="mt-1 text-[13px] font-bold text-text-primary">{step3.subject}</div>
          <p className="mt-0.5 text-[12px] text-[var(--color-text-subtle)] leading-[1.4]">{step3.body}</p>
          <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-cta text-white text-[11px] font-bold">
            {step3.action}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Hero Section ── */
export default function Hero() {
  return (
    <section className="animate-fade-in py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div>
          <Badge variant="subtle">{HERO.badge}</Badge>

          <h1 className="mt-4 text-[40px] md:text-[48px] font-bold text-text-primary leading-[1.2]">
            {HERO.headlineLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-4 text-[15px] text-[var(--color-text-subtle)] leading-[1.4] max-w-[480px]">
            {HERO.subtext}
          </p>

          {/* Input group */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-[480px]">
            <input
              type="email"
              placeholder={HERO.inputPlaceholder}
              aria-label={HERO.inputPlaceholder}
              className="flex-1 h-9 px-3 rounded-[6px] border border-[var(--color-border-strong)] text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)]"
            />
            <Button variant="primary">
              {HERO.ctaLabel}
              <SendIcon className="ml-2" size={14} />
            </Button>
          </div>

          <p className="mt-3 text-[12px] text-[var(--color-text-muted)] leading-[1.4] max-w-[480px]">
            {HERO.microcopy}
          </p>
        </div>

        {/* Right column — Workflow Diagram */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[420px]">
            <WorkflowDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
