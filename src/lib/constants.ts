export const SITE = {
  name: "Workpal",
  nameLower: "workpal",
  tagline: "Your personal AI. Ready in your inbox.",
  agentEmail: "your-agent@workpal.email",
  sampleAgentEmail: "agent@workpal.email",
  copyright: "2025 Workpal Inc.",
  footerTagline: "Built for people who\u2019d rather sleep than copy-paste.",
} as const;

export const NAV = {
  links: [
    { label: "How it Works", href: "/#how-it-works" },
    { label: "Why Not ChatGPT?", href: "/#comparison" },
    { label: "FAQ", href: "/#faq" },
    { label: "For Business", href: "/business" },
  ],
  cta: "Get Your Workpal",
} as const;

export const HERO = {
  badge: "No prompts. No dashboards. Just email.",
  headline: "Forward an email. Get the work done.",
  subtext:
    "Workpal reads your LinkedIn to understand your role, experience, and expertise \u2014 then produces work that sounds like you, not a chatbot. Just forward a task and get it back done.",
  formHeadline: "Paste your LinkedIn \u2014 get your Workpal in 60 seconds",
  linkedInPlaceholder: "https://linkedin.com/in/yourname",
  emailPlaceholder: "you@company.com",
  ctaLabel: "Create my Workpal",
  ctaSecondary: { label: "Watch 2-min demo", href: "#demo" },
  microcopy: "Free to start. No credit card required.",
  urgency: "Early access \u2014 limited to first 1,000 users",
  encryptionNote:
    "All exchanges TLS encrypted. We never read your emails or AI outputs.",
  workflow: {
    step1: {
      label: "The ask lands",
      time: "2:59 AM \u00b7 Your laptop is closed",
      from: "boss@client.com",
      to: "you@consultant.com",
      subject: "Meridian deal \u2014 need a summary before tomorrow",
      body: "Can you put together a summary of where we landed on the Meridian deal? Pricing, timeline, and the changes we made after their last round of feedback. Need it before tomorrow\u2019s call.",
    },
    step2: {
      label: "One tap. Forwarded to your Workpal.",
      time: "7:01 AM \u00b7 You wake up",
      from: "you@consultant.com",
      to: "you@workpal.email",
      subject: "Fwd: Meridian deal \u2014 need a summary before tomorrow",
      annotation: "Fwd:",
    },
    step3: {
      label: "Finished work. Your voice. Grounded in your experience.",
      time: "7:14 AM \u00b7 Your Workpal replies",
      from: "you@workpal.email",
      to: "you@consultant.com",
      subject: "Re: Meridian deal \u2014 need a summary before tomorrow",
      body: "Here\u2019s the Meridian deal summary \u2014 final pricing structure, timeline of key changes, and a breakdown of their feedback and how we addressed it.",
      action: "Review & send to your client \u2192",
    },
  },
} as const;

export const SCENARIO = {
  sectionId: "scenario",
  title: "You sleep. Your Workpal delivers.",
} as const;

export const VIDEO_DEMO = {
  badge: "See it in action",
  heading: "Watch how Workpal works.",
  subtext:
    "90 seconds. One late-night email. Zero hours of writing.",
  ctaLabel: "Watch the demo",
  placeholder: "Video embed \u2014 90-second product walkthrough",
} as const;

export const HOW_IT_WORKS = {
  heading: "Three steps. Then it works like you.",
  subtext: "Your LinkedIn becomes your AI\u2019s foundation. No dashboard. No learning curve.",
  steps: [
    {
      step: 1,
      title: "Share your LinkedIn",
      description:
        "Paste your LinkedIn URL and email. Workpal imports your role, industry, skills, and experience \u2014 so it writes like a 10-year veteran of your field, not a generic chatbot.",
      videoMp4: "/assets/videos/mockup-1-linkedin.mp4",
      videoWebm: "/assets/videos/mockup-1-linkedin.webm",
      videoAlt: "LinkedIn profile import and Workpal calibration",
    },
    {
      step: 2,
      title: "Delegate, don\u2019t chat",
      description:
        "Forward any email \u2014 with attachments, context, whatever. Each task gets a fresh, dedicated instance of your Workpal. No prior conversation leaking in. No stale context.",
      videoMp4: "/assets/videos/mockup-2-forward.mp4",
      videoWebm: "/assets/videos/mockup-2-forward.webm",
      videoAlt: "Email being forwarded to Workpal address",
    },
    {
      step: 3,
      title: "Review and ship",
      description:
        "Briefs, analyses, comparisons, drafts \u2014 structured like your past work and written in your voice. You decide what goes out.",
      videoMp4: "/assets/videos/mockup-3-reply.mp4",
      videoWebm: "/assets/videos/mockup-3-reply.webm",
      videoAlt: "Workpal reply with polished deliverable in your inbox",
    },
  ],
  cta: "Create my Workpal \u2014 it\u2019s free to start",
} as const;

export const OUTPUT_SHOWCASE = {
  sectionId: "output",
  title: "See what your Workpal produces.",
  subtitle: "Not generic AI output. Work grounded in your professional background.",
  linkedInCallout: "Calibrated from your LinkedIn: role, industry, expertise, seniority",
  examples: [
    {
      inputLabel: "You forward this:",
      inputSubject: "Fwd: Need market sizing for Southeast Asia EV charging",
      inputBody:
        "Client wants a rough market sizing by Friday. Attached are 3 reports and the RFP.",
      outputLabel: "Your Workpal replies with:",
      outputSubject: "Re: Need market sizing for Southeast Asia EV charging",
      outputPreview:
        "Market sizing attached. Bottom-up approach using ASEAN registration data cross-referenced with charging infrastructure density. TAM: $4.2B by 2028 across 6 markets. Key assumptions documented on slide 2. Three scenarios modeled: conservative, base, aggressive. Flagged a data gap in Vietnam \u2014 suggested proxy methodology on slide 7.",
      outputNote:
        "Structured like your past deliverables. Depth and framing reflect your seniority and domain expertise.",
    },
  ],
} as const;

export const SOCIAL_PROOF = {
  userCount: "Trusted by 500+ professionals",
  testimonials: [
    {
      quote:
        "I forwarded a 40-page RFP at midnight and had a draft response by morning. My client thought I pulled an all-nighter.",
      name: "Priya M.",
      role: "Management Consultant",
    },
    {
      quote:
        "My sales team went from 0% AI adoption to 100% in one day. No training needed.",
      name: "James T.",
      role: "VP Sales",
    },
    {
      quote:
        "I stopped copying emails into ChatGPT. This is just\u2026 how it should work.",
      name: "Sarah K.",
      role: "Operations Manager",
    },
  ],
} as const;

export const COMPARISON = {
  heading: "Why not just use ChatGPT?",
  subtext: "Same task. Two very different experiences.",
  task: "Boss sends: \u201CSummarize these 3 vendor proposals and recommend one.\u201D",
  leftPanel: {
    label: "ChatGPT / Claude",
    tagline: "Generic output. No context about you.",
    steps: [
      "Open ChatGPT in new tab",
      "Copy-paste email text",
      "Download and re-upload 3 PDF attachments",
      "Write a detailed prompt explaining what you need",
      "Wait for response, re-prompt twice",
      "Copy output back into email, reformat",
      "Send to boss \u2014 still sounds like a chatbot",
    ],
    time: "~25 minutes",
  },
  rightPanel: {
    label: "Workpal",
    tagline: "Your voice. Your expertise. Grounded in your LinkedIn.",
    steps: [
      "Forward the email",
      "Get a structured analysis written in your style",
      "Review and send to boss \u2014 sounds like you wrote it",
    ],
    time: "~2 minutes",
  },
  footer: "ChatGPT doesn\u2019t know you. Workpal was built from your professional profile.",
  cta: "Try it on a real email \u2192",
} as const;

export const USE_CASES = {
  sectionId: "use-cases",
  heading: "What Workpal actually produces.",
  subtext: "Outputs shaped by your professional background \u2014 not generic prompts.",
  cases: [
    {
      persona: "Management Consultant",
      trigger:
        "Client forwards: \u201CAnalyze these 10 competitor decks and brief me by morning.\u201D",
      output:
        "Competitive landscape matrix with positioning gaps, pricing comparison table, and 3 strategic recommendations \u2014 delivered as a formatted email with attached summary deck.",
      whyPersonalized:
        "Knows you\u2019re a strategy consultant. Uses MECE frameworks, not bullet-point summaries.",
      timeSaved: "4 hours \u2192 2 minutes",
    },
    {
      persona: "Sales Rep",
      trigger:
        "Prospect replies: \u201CSounds interesting, but how does this compare to [competitor]?\u201D",
      output:
        "Personalized competitive comparison email addressing the prospect\u2019s specific use case, with objection handling and a soft close for a demo call.",
      whyPersonalized:
        "Mirrors your closing style and deal language. Doesn\u2019t sound like marketing copy.",
      timeSaved: "30 minutes \u2192 1 forward",
    },
    {
      persona: "Lawyer",
      trigger:
        "Partner forwards: \u201CReview this contract redline and flag any issues.\u201D",
      output:
        "Clause-by-clause risk assessment highlighting 7 flagged provisions with recommended negotiation positions and precedent references.",
      whyPersonalized:
        "Understands your practice area and jurisdiction. Flags what matters to you, not generic legal risks.",
      timeSaved: "2 hours \u2192 1 forward",
    },
    {
      persona: "HR Manager",
      trigger:
        "Hiring manager sends: \u201CWrite a job description for this new role based on the attached org chart.\u201D",
      output:
        "Complete JD with role summary, qualifications, responsibilities, and compensation band suggestion \u2014 formatted and ready to post.",
      whyPersonalized:
        "Reflects your company\u2019s tone and hiring standards. Not a template from the internet.",
      timeSaved: "45 minutes \u2192 1 forward",
    },
  ],
} as const;

export const LIVE_DEMO = {
  sectionId: "try-it",
  headline: "Try it right now \u2014 no signup needed",
  subheadline:
    "Paste any email text below and see what Workpal would send back.",
  placeholder:
    "Paste an email you\u2019d normally forward to a colleague or assistant...",
  submitLabel: "See what Workpal produces",
  resultCta: "Like what you see? Get your own Workpal in 60 seconds.",
  rateLimit: "One free try per visitor.",
} as const;

export const FOR_TEAMS = {
  sectionId: "teams",
  title: "The only AI tool with a 100% adoption rate.",
  subtitle: "Your team already uses email. That\u2019s the only skill required.",
  sellingPoints: [
    {
      title: "No adoption friction",
      description:
        "If they can forward an email, they can use an AI agent. No prompts to learn, no interfaces to master.",
    },
    {
      title: "Every Workpal is specialized",
      description:
        "Sales gets a sales Workpal. Legal gets a legal Workpal. Each one calibrated from their LinkedIn \u2014 their role, their industry, their seniority, their expertise.",
    },
    {
      title: "Non-technical people thrive",
      description:
        "The people who struggle most with ChatGPT are often the ones who\u2019d benefit most. Workpal removes the skill gap entirely.",
    },
    {
      title: "Governed by default",
      description:
        "Every ChatGPT tab is ungoverned data flow. Workpal gives you a full audit trail \u2014 who forwarded what, what was produced, what got sent.",
    },
    {
      title: "Knowledge stays when people leave",
      description:
        "When a team member moves on, their Workpal \u2014 trained on their role, frameworks, and deliverables \u2014 transfers to the new hire. Less ramp-up time, less institutional knowledge lost.",
    },
  ],
  enterpriseFeatures: [
    "Zero ambient inbox access \u2014 agents only see what\u2019s forwarded",
    "Private cloud deployment (AWS, Azure, GCP)",
    "Full audit trail \u2014 every input, every output, every decision",
    "SSO and role-based admin controls",
    "Workpal transfer on employee offboarding \u2014 retain institutional knowledge",
  ],
  cta: { label: "Explore Workpal for Business \u2192", href: "/business" },
  complianceBadges: ["SOC 2 Type II", "GDPR Compliant"],
} as const;

export const SECURITY = {
  badge: "Security & Privacy",
  heading: "Your Workpal sees only what you show it.",
  subtext:
    "No inbox access. No calendar snooping. No ambient data collection.",
  principles: [
    {
      title: "TLS encryption on every exchange",
      description:
        "All emails between you and your Workpal are encrypted in transit. We never store or read your content.",
    },
    {
      title: "Zero ambient access",
      description:
        "Your Workpal has no access to your inbox, calendar, or files. It only processes what you explicitly forward \u2014 one task at a time.",
    },
    {
      title: "Task-scoped memory only",
      description:
        "Your Workpal knows your role and style permanently. But task data is scoped to that task only \u2014 it never leaks into other tasks.",
    },
    {
      title: "You own everything",
      description:
        "Full export or deletion at any time. We never use your data to train models or share with third parties.",
    },
  ],
  certifications: [
    {
      title: "SOC 2 Type II",
      description:
        "Audited controls for security, availability, and confidentiality.",
    },
    {
      title: "GDPR Compliant",
      description:
        "Full EU data protection compliance. DPA available on request.",
    },
    {
      title: "Vertical ready",
      description:
        "HIPAA-ready for healthcare. FedRAMP pathway for government.",
    },
  ],
  contact: "security@workpal.email",
} as const;

export const FAQ = {
  sectionId: "faq",
  title: "Questions you\u2019re already thinking.",
  items: [
    {
      question: "How is this different from just emailing ChatGPT?",
      answer:
        "ChatGPT doesn\u2019t know who you are. It gives the same generic output to an intern and a managing director. Workpal reads your LinkedIn \u2014 your education, career trajectory, domain expertise, seniority \u2014 and builds a permanent professional identity. A McKinsey consultant gets McKinsey-grade frameworks. A litigator gets litigation-grade precision. Every task carries that identity. But unlike ChatGPT, each task is completely isolated. No conversation history bleeding between tasks.",
    },
    {
      question: "Can it really match my writing style?",
      answer:
        "It gets better over time. During onboarding, you provide your LinkedIn, writing samples, and past deliverables. Your Workpal learns your tone, vocabulary, structure preferences, and depth of analysis. The more you use it, the more it calibrates. You can also give it direct feedback \u2014 \u2018too formal,\u2019 \u2018add more data,\u2019 \u2018this isn\u2019t how I\u2019d frame it\u2019 \u2014 and it adapts.",
    },
    {
      question: "What types of tasks can it handle?",
      answer:
        "Anything you\u2019d delegate to a sharp junior version of yourself: competitive analyses, market research summaries, email drafts, proposal outlines, slide content, data synthesis, meeting prep, client briefs, internal reports. It\u2019s strongest on knowledge work that has a clear input and expected output format.",
    },
    {
      question: "What do you mean by \u2018no memory bleed\u2019?",
      answer:
        "In ChatGPT or Claude, your previous conversations subtly influence new ones \u2014 context accumulates, old instructions linger, outputs drift. With Workpal, every forwarded email spawns a fresh instance. It knows your style and role (permanent identity), but the task data is completely scoped. Task A never touches Task B.",
    },
    {
      question: "Can I forward emails with attachments?",
      answer:
        "Yes. PDFs, slides, spreadsheets, docs \u2014 your Workpal processes them as part of the task context. If someone sends you 10 competitor decks and says \u2018analyze these,\u2019 you forward the whole thread with attachments. Your Workpal reads everything.",
    },
    {
      question: "What if the output isn\u2019t good enough to send?",
      answer:
        "You always review before anything goes out. Your Workpal replies only to you \u2014 never to your client or boss directly. Think of it as a very capable first draft from someone who knows your standards. You edit, refine, and send when you\u2019re satisfied. Over time, the edits get smaller.",
    },
    {
      question: "Does Workpal have access to my inbox?",
      answer:
        "No. Zero ambient access. Your Workpal cannot read your inbox, calendar, contacts, or files. It only sees what you explicitly forward to it. One task at a time. This is a deliberate architectural choice \u2014 we believe AI agents should operate on a need-to-know basis.",
    },
    {
      question:
        "Will my colleagues see what I forward or what my Workpal produces?",
      answer:
        "No. Your Workpal is yours. It replies only to your email address. No one \u2014 not your boss, not your IT admin, not Workpal staff \u2014 can see your tasks or outputs unless you explicitly share them. On enterprise plans, admins see metadata (usage stats, volume) but never content.",
    },
    {
      question: "What happens to my data after a task is done?",
      answer:
        "Task-specific data (the email you forwarded, attachments, the Workpal\u2019s output) is processed and delivered back to you. We don\u2019t retain task content beyond delivery. Your permanent profile (role, style, preferences) persists so your Workpal stays calibrated, but you can delete it at any time.",
    },
    {
      question: "Why do you need my LinkedIn to get started?",
      answer:
        "Your LinkedIn is how Workpal becomes uniquely yours. It reads your education, career history, industry, skills, and seniority \u2014 then calibrates everything: tone, depth of analysis, frameworks it uses, the level of detail it defaults to. A partner at a law firm gets very different output from the same task than a first-year associate. That\u2019s the point. It\u2019s not required \u2014 you can skip it and manually describe your role \u2014 but it\u2019s the fastest way to get output that sounds like you, not a chatbot.",
    },
    {
      question: "What if my company has compliance requirements?",
      answer:
        "We built for this. SOC 2 Type II certified, GDPR compliant, HIPAA-ready for healthcare, FedRAMP pathway for government. Enterprise deployments run on private cloud infrastructure. We can sign BAAs, DPAs, and custom security agreements. Email security@workpal.email.",
    },
    {
      question: "How is this priced?",
      answer:
        "Free for your first 10 tasks \u2014 no credit card, no strings. After that, individual plans start at a monthly subscription. Teams and enterprise get volume pricing with admin controls and dedicated infrastructure. We\u2019ll publish pricing publicly soon \u2014 or reach out and we\u2019ll quote you directly.",
    },
    {
      question: "What stops this from becoming another abandoned AI tool?",
      answer:
        "Most AI tools fail because they require people to change how they work \u2014 learn a new interface, write prompts, switch tabs. Workpal lives in your inbox. The workflow is: forward, get work back. That\u2019s it. The adoption barrier is essentially zero, which is why retention is fundamentally different from dashboard-based AI tools.",
    },
    {
      question: "Can I use this for sensitive client work?",
      answer:
        "Yes. All exchanges are TLS encrypted. We never read, store, or train on your content. Enterprise customers get dedicated infrastructure on AWS/Azure/GCP, fully isolated. We\u2019re SOC 2 Type II certified and GDPR compliant. If your industry has specific compliance requirements, reach out \u2014 we likely already support it or have a pathway.",
    },
    {
      question: "What happens to a Workpal when someone leaves the company?",
      answer:
        "Admins can transfer a departing employee\u2019s Workpal to their replacement. The Workpal retains the role-specific knowledge, frameworks, and delivery style it was trained on \u2014 so the new hire doesn\u2019t start from scratch. It\u2019s like handing over a briefing document that actually understands the job. Task-specific data is purged, but the role identity carries over.",
    },
  ],
} as const;

export const FINAL_CTA = {
  heading: "Your next all-nighter is optional.",
  subtext:
    "Drop your email. Forward your first task. See what comes back.",
  linkedInPlaceholder: "Paste your LinkedIn URL",
  emailPlaceholder: "Your email address",
  ctaLabel: "Create My Workpal",
  microcopy: "Free to start. First 10 tasks on us. No credit card required.",
  encryptionNote:
    "All exchanges TLS encrypted. We never read your emails or AI outputs.",
} as const;

export const FOOTER = {
  links: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
    { label: "Contact", href: "mailto:hello@workpal.email" },
  ],
} as const;

/* ═══════════════════════════════════════════════
   /business page constants
   ═══════════════════════════════════════════════ */

export const BUSINESS_HERO = {
  badge: "Workpal for Business",
  headlineLines: [
    "Give every team member",
    "a governed AI operator.",
  ],
  subtext:
    "Your team gets AI that works from their inbox. You get visibility, audit trails, and full control. No new tools to deploy.",
  cta: "Request a Demo",
  ctaSecondary: "Talk to Sales",
  placeholderLabel: "Image: Enterprise admin dashboard mockup",
} as const;

export const BUSINESS_PROBLEM = {
  badge: "The Shadow AI Problem",
  heading: "Your team is already using AI. You have no visibility.",
  subtext:
    "Every ChatGPT tab, every Gemini prompt, every Claude conversation \u2014 that\u2019s your company data flowing into consumer LLMs with zero oversight.",
  points: [
    {
      title: "No audit trail",
      description:
        "You can\u2019t see what data employees are pasting into AI tools or what outputs they\u2019re acting on.",
    },
    {
      title: "Compliance risk",
      description:
        "Regulated industries need to know where data goes. Consumer AI tools offer no guarantees.",
    },
    {
      title: "Zero governance",
      description:
        "No access controls, no usage policies, no way to enforce data handling standards.",
    },
    {
      title: "Data leakage",
      description:
        "Sensitive contracts, financials, and client data end up in training sets you don\u2019t control.",
    },
    {
      title: "Knowledge walks out the door",
      description:
        "When people leave, their expertise leaves with them. No ChatGPT conversation captures institutional knowledge in a way that transfers to their replacement.",
    },
  ],
} as const;

export const BUSINESS_HOW_TEAMS_WORK = {
  heading: "How Workpal works for teams.",
  subtext: "Deploy in minutes. No infrastructure changes. No training sessions.",
  steps: [
    {
      number: "1",
      title: "IT provisions agents",
      description:
        "Admin creates Workpal agents for team members through the dashboard. Set policies and data rules upfront.",
      placeholderLabel: "Image: Admin provisioning dashboard",
    },
    {
      number: "2",
      title: "Team gets @workpal.email",
      description:
        "Each team member receives their own agent email address. It shows up as a contact \u2014 nothing to install.",
      placeholderLabel: "Image: Agent email in contact list",
    },
    {
      number: "3",
      title: "Members forward tasks",
      description:
        "Team members forward emails, docs, and requests to their agent. Same workflow they already use.",
      placeholderLabel: "Image: Email forward action",
    },
    {
      number: "4",
      title: "IT gets full visibility",
      description:
        "Every interaction is logged. Admins see usage patterns, flag risks, and export audit trails.",
      placeholderLabel: "Image: Audit trail dashboard",
    },
    {
      number: "5",
      title: "Someone leaves? Transfer the Workpal.",
      description:
        "When a team member departs, admins reassign their Workpal to the new hire. The role-specific knowledge, frameworks, and delivery style carry over \u2014 dramatically reducing ramp-up time.",
      placeholderLabel: "Image: Workpal transfer / reassignment flow",
    },
  ],
} as const;

export const BUSINESS_SECURITY = {
  badge: "Enterprise Security",
  heading: "Security that satisfies your CISO.",
  subtext:
    "Built for regulated industries. Every layer designed for zero-trust, full auditability, and data sovereignty.",
  categories: [
    {
      title: "Encryption & Transit",
      items: [
        "TLS 1.2+ on all email exchanges",
        "AES-256 encryption at rest",
        "Zero plaintext storage of email content",
      ],
    },
    {
      title: "Access & Control",
      items: [
        "Zero ambient access \u2014 agents only see forwarded content",
        "Role-based admin controls",
        "SSO / SAML integration",
      ],
    },
    {
      title: "Data Sovereignty",
      items: [
        "Choose your data residency region",
        "Zero-retention policies available",
        "No data used for model training",
      ],
    },
    {
      title: "Audit & Compliance",
      items: [
        "Full interaction audit logging",
        "Exportable compliance reports",
        "Real-time usage dashboards",
      ],
    },
  ],
  certifications: [
    {
      title: "SOC 2 Type II",
      description:
        "Audited controls for security, availability, and confidentiality.",
    },
    {
      title: "GDPR Compliant",
      description:
        "Full EU data protection compliance. DPA available on request.",
    },
    {
      title: "HIPAA Ready",
      description:
        "BAA available. Built for healthcare data handling requirements.",
    },
    {
      title: "FedRAMP Pathway",
      description:
        "Government-grade security in progress. Contact us for timeline.",
    },
  ],
  cta: "Download Security Whitepaper",
  microcopy: "Questions? security@workpal.email",
} as const;

export const BUSINESS_USE_CASES = {
  heading: "Built for every team, not just technical ones.",
  subtext: "If they can forward an email, they can use Workpal.",
  roles: [
    {
      title: "Consultants",
      example: "Forward 10 competitor decks, get a synthesis by morning.",
      bullets: [
        "Research and competitive analysis",
        "Slide deck drafts and summaries",
        "Client deliverable preparation",
      ],
    },
    {
      title: "Finance",
      example:
        "Forward a quarterly report, get variance analysis in minutes.",
      bullets: [
        "Financial analysis and modeling",
        "Report generation and formatting",
        "Vendor invoice processing",
      ],
    },
    {
      title: "Legal",
      example:
        "Forward a 40-page contract, get a risk summary and key terms.",
      bullets: [
        "Contract review and redlining",
        "Regulatory research summaries",
        "Due diligence document processing",
      ],
    },
    {
      title: "Operations",
      example:
        "Forward a vendor thread, get a structured comparison table.",
      bullets: [
        "Workflow documentation",
        "Vendor communication drafts",
        "Process optimization analysis",
      ],
    },
  ],
} as const;

export const BUSINESS_DEPLOYMENT = {
  heading: "Deploy your way.",
  subtext:
    "From multi-tenant cloud to air-gapped on-premise. Your infrastructure, your rules.",
  options: [
    {
      title: "Cloud",
      description: "Multi-tenant SaaS. Fast setup, fully managed.",
      features: [
        "SOC 2 Type II certified",
        "99.9% uptime SLA",
        "Automatic updates",
      ],
      recommended: false,
    },
    {
      title: "Private Cloud",
      description: "Dedicated infrastructure in your VPC. Full isolation.",
      features: [
        "AWS, Azure, or GCP",
        "Your data residency region",
        "Dedicated encryption keys",
      ],
      recommended: true,
    },
    {
      title: "On-Premise",
      description: "Full control. Runs behind your firewall.",
      features: [
        "Air-gapped deployment",
        "Custom model hosting",
        "No external data transfer",
      ],
      recommended: false,
    },
  ],
} as const;

export const BUSINESS_CTA = {
  heading: "Ready to govern AI for your team?",
  subtext:
    "See Workpal in action. We\u2019ll show you deployment options, security architecture, and a live demo tailored to your use case.",
  cta: "Request a Demo",
  ctaSecondary: "Talk to Sales",
  microcopy: "No commitment. 30-minute call.",
} as const;
