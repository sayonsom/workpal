export const SITE = {
  name: "Workpal",
  nameLower: "workpal",
  tagline: "Your private AI email address.",
  agentEmail: "your-agent@workpal.email",
  sampleAgentEmail: "agent@workpal.email",
  copyright: "\u00a9 2026 Workpal.",
  footerTagline: "workpal.email \u2014 Forward your work. Get it done.",
} as const;

export const NAV = {
  links: [
    { label: "How it Works", href: "/#how-it-works" },
    { label: "Security", href: "/#security" },
    { label: "FAQ", href: "/#faq" },
  ],
  cta: "Create your Workpal",
} as const;

export const HERO = {
  badge: "Your private AI email address",
  headline: "The AI colleague who only talks to you.",
  headlineSub: "Forward any email. Get the work done. No apps, no prompts, no inbox access.",
  subtext:
    "Workpal reads context like a smart colleague would \u2014 contracts, long threads, messy attachments. It drafts replies in your voice, flags what matters, and learns how you work. The more you use it, the better it gets.",
  bullets: [
    "Zero inbox access. Only processes what you explicitly forward.",
    "Learns your writing style. After 50 emails, it sounds like you.",
    "Replies only to you. The outside world never sees it.",
  ],
  flow: {
    title: "How it works",
    steps: [
      { label: "Someone emails you", actor: "colleague@company.com", icon: "inbox" },
      { label: "You forward to Workpal", actor: "you \u2192 workpal.email", icon: "forward" },
      { label: "Workpal does the work", actor: "workpal.email", icon: "sparkle" },
      { label: "Workpal emails you back", actor: "workpal.email \u2192 you", icon: "reply" },
      { label: "You edit & send", actor: "you \u2192 colleague@company.com", icon: "send" },
    ],
    closedNote: "Your Workpal stays behind the scenes \u2014 the outside world never sees it.",
  },
  steps: {
    yourEmail: {
      label: "Your email address",
      placeholder: "you@company.com",
      helpText: "Your Workpal will only ever reply to this address.",
    },
    workpalEmail: {
      label: "Your Workpal\u2019s email address",
      suffix: "@workpal.email",
      editLabel: "Customize",
      helpText: "Forward tasks here. This address only replies to you.",
    },
  },
  handleAvailable: "Available!",
  handleTaken: "This handle is taken.",
  handleChecking: "Checking...",
  ctaLabel: "Create your Workpal",
  closedLoopNote: "This email will only respond to",
  closedLoopNoteYou: "you",
  socialProofLine: "500+ professionals already using Workpal",
  urgency: "Limited beta \u00b7 Free while in beta",
  microcopy: "60 seconds. No credit card. Your Workpal only ever emails you.",
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
  sectionId: "how-it-works",
  heading: "The \u201CClosed Loop\u201D Workflow",
  subtext: "Workpal never contacts anyone but you. You\u2019re always the firewall between AI output and the real world.",
  steps: [
    {
      step: 1,
      title: "Forward to your Workpal",
      description:
        "Don\u2019t break your flow. Just forward any email, thread, or attachment to your private workpal.email address. No tabs, no copy-pasting.",
      videoMp4: "/assets/videos/mockup-1-linkedin.mp4",
      videoWebm: "/assets/videos/mockup-1-linkedin.webm",
      videoAlt: "Email being forwarded to Workpal address",
    },
    {
      step: 2,
      title: "Workpal figures out the task",
      description:
        "It reads context like a colleague would \u2014 tone, urgency, relationship dynamics. A polite decline, a deal summary, data extraction, or a draft reply. No prompting required.",
      videoMp4: "/assets/videos/mockup-2-forward.mp4",
      videoWebm: "/assets/videos/mockup-2-forward.webm",
      videoAlt: "Workpal analyzing email context and task",
    },
    {
      step: 3,
      title: "You get the result (privately)",
      description:
        "Workpal emails you back. You review it, tweak if needed, then forward it yourself. You are always in control of what leaves your inbox. Every draft teaches Workpal your style. The more you use it, the sharper it gets.",
      videoMp4: "/assets/videos/mockup-3-reply.mp4",
      videoWebm: "/assets/videos/mockup-3-reply.webm",
      videoAlt: "Workpal reply with polished deliverable in your inbox",
    },
  ],
  cta: "Create your Workpal \u2014 it\u2019s free to start",
} as const;

export const BEFORE_AFTER = {
  sectionId: "before-after",
  heading: "What changes after your first week",
  before: {
    label: "Before Workpal",
    items: [
      "Spend 20 min drafting a polite decline",
      "Read a 47-page contract yourself",
      "Forget to follow up on 3 threads",
      "Copy-paste into AI tools, reformat, paste back",
      "Everyone on the team writes differently",
    ],
  },
  after: {
    label: "After Workpal",
    items: [
      "Forward \u2192 polite decline in your voice, 90 seconds",
      "Forward \u2192 12 key changes flagged, 2 minutes",
      "Workpal reminds you and drafts the follow-up",
      "Never leave your inbox. Ever.",
      "Every Workpal learns its user\u2019s style",
    ],
  },
} as const;

export const SOCIAL_PROOF = {
  userCount: "500+ professionals already using Workpal",
  testimonials: [
    {
      quote:
        "WorkPal keeps my four executives, their calendars, and my sanity all in one place.",
      name: "Lorraine Athaide",
      role: "Senior Executive Assistant",
      company: "RDS Brokerage",
      photo: "/assets/testimonials/lorraine.webp",
      linkedin: "https://www.linkedin.com/in/lorraine-athaide-2514211b/",
      featured: true,
    },
    {
      quote:
        "As a designer, I live in creative chaos \u2014 WorkPal gives that chaos a system without killing the flow.",
      name: "Dors\u0101 Masghati",
      role: "Creative Senior Designer",
      company: "TheOthers",
      photo: "/assets/testimonials/dorsa.webp",
      linkedin: "https://www.linkedin.com/in/dorsa-masghati/",
    },
    {
      quote:
        "Running a startup means wearing every hat. WorkPal lets me track what matters so I can focus on building what lasts.",
      name: "Ray Li",
      role: "CEO",
      company: "Sene",
      photo: "/assets/testimonials/ray.webp",
      linkedin: "https://www.linkedin.com/in/rayxli/",
      section: "leadership",
    },
  ],
} as const;

export const LIVE_DEMO_PREVIEW = {
  sectionId: "demo-preview",
  label: "See it in action",
  heading: "Real emails in. Real work out.",
  subtitle: "Click a scenario to see what Workpal produces \u2014 no prompt needed.",
  tabs: [
    {
      tabLabel: "Exec Reply Draft",
      forwardedEmail: {
        from: "prospect@bigco.com",
        subject: "Re: Pricing discussion \u2014 we need to revisit",
        body: "Hi, after reviewing internally, we feel the per-seat pricing is too high for our 200-person rollout. We\u2019d like to discuss volume discounts or a flat enterprise rate. Can you send over revised options by Thursday?",
      },
      workpalReply: {
        fromLine: "you@workpal.email \u2192 you@company.com",
        subject: "Re: Pricing discussion \u2014 draft response",
        body: "**Draft Reply (in your VP of Sales\u2019 tone):**\n\nThanks for the follow-up. Completely understand the need to align on pricing for a rollout of this scale.\n\nThree options to consider:\n\n**1. Volume tier:** 15% discount at 200+ seats, bringing per-seat to $34/mo\n**2. Annual commit:** 20% discount with 12-month prepay\n**3. Pilot-first:** 50 seats at full price for 90 days, then negotiate enterprise rate based on usage\n\nHappy to walk through any of these on a quick call Thursday morning.\n\n_Ready to send. Edit the numbers if needed._",
      },
    },
    {
      tabLabel: "Meeting Follow-up",
      forwardedEmail: {
        from: "ceo@company.com",
        subject: "Board meeting wrap-up",
        body: "Good meeting today. Can you send follow-up emails to each board member with their specific action items? I think David owns the fundraising timeline, Sarah has the product roadmap update, and Marcus needs to finalize the new hire comp bands.",
      },
      workpalReply: {
        fromLine: "you@workpal.email \u2192 you@company.com",
        subject: "Re: Board meeting \u2014 follow-up drafts ready",
        body: "**3 follow-up emails drafted:**\n\n**To David (Fundraising):**\nAction item: Finalize Series B timeline and send updated deck to lead investors by March 15.\n\n**To Sarah (Product):**\nAction item: Share revised Q2 roadmap with engineering dependencies mapped. Due by next board sync (March 22).\n\n**To Marcus (People):**\nAction item: Finalize comp bands for 3 senior hires and circulate for CEO approval by EOW.\n\n_Each formatted as a separate email draft, ready to send individually._",
      },
    },
    {
      tabLabel: "Vendor Decline",
      forwardedEmail: {
        from: "sales@vendortools.io",
        subject: "Following up on our demo \u2014 next steps?",
        body: "Hi! Great demo last week. I wanted to follow up on next steps \u2014 we\u2019re running a promotion this quarter and I\u2019d love to get you locked in. Can we schedule a call to discuss implementation timeline?",
      },
      workpalReply: {
        fromLine: "you@workpal.email \u2192 you@company.com",
        subject: "Re: Vendor follow-up \u2014 decline draft",
        body: "**Gracious decline draft (in your exec\u2019s voice):**\n\nHi \u2014 thanks for the follow-up and for the thorough demo last week. The team was impressed with the platform.\n\nAfter reviewing our Q2 priorities internally, we\u2019ve decided to hold off on new tooling for now. Our current stack covers the immediate needs, and we want to revisit vendor evaluations in Q3.\n\nI\u2019ll reach out when we\u2019re ready to re-engage. Appreciate your patience.\n\n_Keeps the door open without committing. Ready to send._",
      },
    },
    {
      tabLabel: "Contract Summary",
      forwardedEmail: {
        from: "legal@partner.com",
        subject: "NDA Redline v4 \u2014 attached for final review",
        body: "Hi, attached is the updated NDA incorporating your latest redlines. 30 pages. We\u2019ve modified the non-compete scope in Section 7 and adjusted the data handling terms in Section 12. Please review and confirm by Friday.",
      },
      workpalReply: {
        fromLine: "you@workpal.email \u2192 you@company.com",
        subject: "Re: NDA Redline v4 \u2014 8 material changes flagged",
        body: "**NDA Review \u2014 Key Changes Flagged**\n\n**Section 7 (Non-Compete):** Scope expanded from 12 to 24 months. Now covers APAC region \u2014 this is unusual and may restrict future partnerships.\n\n**Section 12 (Data Handling):** New clause requires data deletion within 30 days of termination. Your standard is 90 days \u2014 flag for legal.\n\n**6 other changes:** Minor formatting in Sections 2, 4, 5. Definition updates in Section 1. No substantive impact.\n\n_Summary ready. The non-compete expansion is the biggest concern._",
      },
    },
  ],
} as const;

export const PERSONALIZATION = {
  sectionId: "personalization",
  label: "Style Learning",
  heading: "It learns your voice. Automatically.",
  subtitle: "Workpal gets sharper with every email you forward \u2014 and every edit you make.",
  progression: [
    {
      stage: "Day 1",
      description: "Clean, professional responses. Identifies tasks from context.",
    },
    {
      stage: "Week 1",
      description: "Picks up your industry jargon, formality level, and sentence structure.",
    },
    {
      stage: "Month 1",
      description: "Matches your voice perfectly. Knows which contacts prefer formal vs casual.",
    },
    {
      stage: "Month 3",
      description: "Drafts are sent with zero edits 60% of the time. It writes like you on your best day.",
    },
  ],
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
      title: "Non-technical people thrive",
      description:
        "The people who struggle most with ChatGPT are often the ones who\u2019d benefit most. Workpal removes the skill gap entirely.",
    },
  ],
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
  certNote: "Working toward SOC 2 Type II certification. Contact security@workpal.email for our current security posture.",
  contact: "security@workpal.email",
} as const;

export const FAQ = {
  sectionId: "faq",
  title: "Frequently Asked Questions",
  items: [
    {
      question: "Will Workpal email my clients or boss?",
      answer:
        "Never. Workpal is a closed loop. It is hard-coded to reply only to your registered email address. It cannot initiate or send emails to anyone else. You always decide what gets forwarded out.",
    },
    {
      question: "Do I need to write prompts?",
      answer:
        "No. Workpal reads the email thread you forward to determine the task. Forward a contract \u2014 it summarizes it. Forward a client question \u2014 it drafts a reply. If it\u2019s unsure, it emails you a clarifying question.",
    },
    {
      question: "How does it know my writing style?",
      answer:
        "Workpal learns automatically from every email you forward and every edit you make to its drafts. Within a week, it picks up your jargon and formality level. Within a month, most users send drafts with zero edits. You can accelerate this by connecting your LinkedIn or describing your role.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes. All emails are encrypted with enterprise-grade TLS in transit. Your data is used solely to generate your response and is never used to train public AI models.",
    },
    {
      question: "What if Workpal misunderstands the task?",
      answer:
        "That\u2019s the beauty of the closed loop. The result comes back to you, not your client. Review it, edit it, or reply to Workpal with a quick correction and it\u2019ll redo it. Zero risk of an AI draft reaching the wrong person.",
    },
    {
      question: "How much does it cost?",
      answer:
        "Workpal is free for up to 10 forwards per month. Pro is $12/month for unlimited forwards with style learning and contact memory.",
    },
    {
      question: "Can Workpal match different writing styles for different people?",
      answer:
        "Yes. Workpal learns each voice separately. When you forward a thread from Person A, it drafts in Person A\u2019s tone. Forward from Person B, it shifts to match. The more you use it per contact, the sharper it gets.",
    },
  ],
} as const;

export const FINAL_CTA = {
  heading: "Ready to meet your AI colleague?",
  subtext:
    "60 seconds. No credit card. It only ever emails you.",
} as const;

export const FOOTER = {
  links: [
    { label: "For Business", href: "/business" },
    { label: "Privacy", href: "/privacy" },
    { label: "Security", href: "/security" },
    { label: "Terms", href: "/terms" },
    { label: "Contact", href: "/contact" },
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

/* ═══════════════════════════════════════════════
   /contact page constants
   ═══════════════════════════════════════════════ */

export const CONTACT = {
  heading: "How can we help?",
  email: "hi@workpal.email",
  categories: [
    {
      title: "Sales",
      description:
        "Enterprise contracts, custom plans, or request a product demo.",
    },
    {
      title: "Support",
      description:
        "Account, billing, data questions, or technical issues.",
    },
    {
      title: "Partnerships",
      description:
        "Data partnerships, integrations, or co-marketing opportunities.",
    },
  ],
  booking: {
    heading: "Schedule a Call",
    subtitle: "30-minute Discovery Call",
    description:
      "Pick a time that works for you. We\u2019ll send a calendar invite to confirm.",
    meetingTypes: [
      "Microsoft Teams",
      "Zoom",
      "Google Meet",
      "Phone Call",
    ],
    timezones: [
      "US/Eastern",
      "US/Central",
      "US/Mountain",
      "US/Pacific",
      "Europe/London",
      "Europe/Berlin",
      "Europe/Paris",
      "Asia/Dubai",
      "Asia/Kolkata",
      "Asia/Singapore",
      "Asia/Tokyo",
      "Australia/Sydney",
      "Pacific/Auckland",
    ],
    timeSlots: [
      "9:00 AM",
      "9:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "1:00 PM",
      "1:30 PM",
      "2:00 PM",
      "2:30 PM",
      "3:00 PM",
      "3:30 PM",
      "4:00 PM",
      "4:30 PM",
      "5:00 PM",
    ],
    cta: "Request Call",
  },
  form: {
    heading: "Send us a message",
    inquiryTypes: [
      "General",
      "Demo request",
      "Enterprise pricing",
      "API access",
      "Partnership",
      "Technical support",
    ],
    cta: "Send Message",
    successMessage: "Message sent! We\u2019ll get back to you within 24 hours.",
    bookingSuccessMessage:
      "Booking request sent! We\u2019ll send you a calendar invite shortly.",
  },
} as const;

/* ═══════════════════════════════════════════════
   Auth / App page constants
   ═══════════════════════════════════════════════ */

export const LOGIN = {
  heading: "Welcome back",
  subtext: "Log in to access your Workpal dashboard.",
  emailPlaceholder: "you@company.com",
  passwordPlaceholder: "Your password",
  ctaLabel: "Log in",
  signupPrompt: "Don\u2019t have an account?",
  signupLink: "Create your Workpal",
  forgotPassword: "Forgot password?",
} as const;

export const DASHBOARD = {
  title: "Dashboard",
  nav: {
    agents: "Agents",
    usage: "Usage",
    settings: "Settings",
  },
  agentList: {
    heading: "Your Agents",
    createCta: "Create Agent",
    emptyState:
      "No agents yet. Create your first agent to get started.",
    copyTooltip: "Copy email address",
    copiedTooltip: "Copied!",
  },
  agentDetail: {
    tabs: {
      tasks: "Tasks",
      skills: "Skills",
      samples: "Samples",
      personalize: "Personalize",
      share: "Share",
    },
    editName: "Edit name",
    deleteAgent: "Delete Agent",
    deleteConfirm:
      "Are you sure you want to delete this agent? This action cannot be undone.",
  },
  tasks: {
    heading: "Task History",
    loadMore: "Load more",
    emptyState: "No tasks yet. Forward an email to your agent to get started.",
  },
  skills: {
    heading: "Skills",
    activeHeading: "Active Skills",
    catalogHeading: "Skills Catalog",
    searchPlaceholder: "Search skills...",
    activateCta: "Activate",
    deactivateCta: "Deactivate",
    addSubSkill: "Add Customization",
    subSkillNamePlaceholder: "Customization name (e.g., 'Write like Michael Pollan')",
    subSkillContentPlaceholder: "Custom instructions for this skill...",
    emptyState: "No skills activated yet. Browse the catalog below to get started.",
    emptySubSkills: "No customizations yet.",
    addCta: "Add Skill",
    namePlaceholder: "Skill name",
    descriptionPlaceholder: "Describe what this skill does...",
  },
  samples: {
    heading: "Writing Samples",
    addCta: "Add Sample",
    namePlaceholder: "Sample name",
    descriptionPlaceholder: "Brief description of this sample...",
    contentPlaceholder: "Paste a writing sample...",
    emptyState: "No writing samples yet. Add samples to help your agent learn your style.",
  },
  usage: {
    heading: "Usage",
    tasksUsed: "Tasks used",
    tasksRemaining: "Tasks remaining",
    plan: "Plan",
  },
  logout: "Log out",
} as const;

export const SETTINGS = {
  heading: "Settings",
  exportData: {
    heading: "Export your data",
    description:
      "Download a copy of all your data including agent configurations, task history, skills, and samples.",
    cta: "Export Data",
  },
  deleteAccount: {
    heading: "Delete account",
    description:
      "Permanently delete your account and all associated data. This action cannot be undone.",
    cta: "Delete Account",
    confirm:
      "Are you absolutely sure? This will permanently delete your account, all agents, task history, and data. This cannot be undone.",
    confirmCta: "Yes, delete my account",
    cancelCta: "Cancel",
  },
} as const;

export const SUCCESS_MODAL = {
  heading: "Your Workpal is ready!",
  subHeading: "Here\u2019s how to get started.",
  tabs: {
    tutorial: {
      label: "1 min tutorial",
      placeholder: "Tutorial video coming soon",
    },
    desktop: {
      label: "Working on desktop",
      steps: [
        "Open Gmail or Outlook on your computer",
        "Forward any work email to your Workpal address",
        "Your Workpal replies directly to your inbox",
        "Review, edit, and send \u2014 you\u2019re always in control",
      ],
    },
    phone: {
      label: "Working from phone",
      steps: [
        "Open your email app on your phone",
        "Forward any email to your Workpal address",
        "Get a polished reply within minutes",
        "Edit and send from anywhere",
      ],
    },
  },
  buttons: {
    gmail: {
      label: "Start forwarding from Gmail",
      href: "https://mail.google.com/mail/u/0/#inbox",
    },
    linkedin: {
      label: "Start forwarding from LinkedIn",
      href: "https://www.linkedin.com/messaging/",
    },
    personalize: {
      label: "Personalize your profile",
    },
  },
} as const;

export const SIGNUP_MODAL = {
  codeStep: {
    heading: "Check your email",
    senderInfo: "We sent a 6-digit code from",
    senderAddress: "Workpal (noreply@workpal.email)",
    spamWarning:
      "Don\u2019t see it? Check your Updates, Promotions, or Spam folder.",
    verifyButton: "Verify Code",
    verifyingButton: "Verifying...",
    resendPrompt: "Didn\u2019t get it?",
    resendButton: "Resend code",
    resendingButton: "Sending...",
    resendSuccess: "A new code has been sent to your email.",
    resendFailed: "Failed to resend. Please try again.",
  },
  successStep: {
    heading: "Your Workpal is ready!",
    subHeading: "Here\u2019s how to get started.",
    agentEmailLabel: "Your Workpal email",
    setPasswordButton: "Set Your Password",
    setPasswordNote:
      "You\u2019ll receive a separate password code at your email.",
    startForwardingButton: "Start Forwarding from Gmail",
  },
} as const;

export const TOAST = {
  defaultError: "Something went wrong. Please try again.",
  existingAccount: "Account exists but credentials don\u2019t match. Try logging in.",
  networkError: "Network error. Check your connection and retry.",
  closeLabel: "Dismiss",
} as const;

export const INBOX = {
  sidebar: {
    compose: "Compose",
    inbox: "Inbox",
    sent: "Sent",
    trash: "Trash",
    logout: "Log out",
  },
  tabs: {
    work: "Work",
    skills: "Skills",
    samples: "Personalize",
  },
  search: {
    placeholder: "Search tasks...",
  },
  taskList: {
    emptyHeading: "No tasks yet",
    emptyText: "Forward an email to your Workpal to get started.",
    loadMore: "Load more",
  },
  taskDetail: {
    back: "Back to Inbox",
    yourRequest: "YOUR REQUEST",
    workpalResponse: "WORKPAL'S RESPONSE",
    attachments: "ATTACHMENTS",
    noPreview: "No preview available.",
  },
  compose: {
    heading: "Send a task to your Workpal",
    subtext: "Forward any email to this address. Your Workpal will read it and reply with completed work.",
    copyLabel: "Copy email",
    copiedLabel: "Copied!",
  },
} as const;
