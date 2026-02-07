export const SITE = {
  name: "Workpal",
  nameLower: "workpal",
  tagline: "Your private AI email address.",
  agentEmail: "your-agent@workpal.email",
  sampleAgentEmail: "agent@workpal.email",
  copyright: "\u00a9 2026 Workpal.",
  footerTagline: "workpal.email \u2014 The AI that only talks to you.",
} as const;

export const NAV = {
  links: [
    { label: "How it Works", href: "/#how-it-works" },
    { label: "Security", href: "/#security" },
    { label: "FAQ", href: "/#faq" },
  ],
  cta: "Get my Workpal Email",
} as const;

export const HERO = {
  badge: "No prompts. No dashboards. Just email.",
  headline: "Your private AI email address.",
  headlineSub: "Forward work in, get work back. No additional prompts needed. It never contacts anyone but you.",
  subtext:
    "Workpal figures out what to do from the emails you forward \u2014 messy PDFs, long threads, and spreadsheets included.",
  bullets: [
    "No access to your full inbox. Only what you forward.",
    "Your AI email (@workpal.email) responds only to you.",
  ],
  flow: {
    title: "How it works",
    steps: [
      { label: "Boss emails you", actor: "boss@client.com", icon: "inbox" },
      { label: "You forward to Workpal", actor: "you \u2192 workpal.email", icon: "forward" },
      { label: "Workpal does the work", actor: "workpal.email", icon: "sparkle" },
      { label: "Workpal emails you back", actor: "workpal.email \u2192 you", icon: "reply" },
      { label: "You edit & send to boss", actor: "you \u2192 boss@client.com", icon: "send" },
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
  ctaLabel: "Create my Workpal",
  closedLoopNote: "This email will only respond to",
  closedLoopNoteYou: "you",
  urgency: "Open for 1,500 Beta Testers",
  microcopy: "Free to start \u00b7 No credit card \u00b7 Cancel anytime",
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
        "It reads the context to determine what\u2019s needed \u2014 a polite decline, a deal summary, data extraction, or a draft reply. No prompting required.",
      videoMp4: "/assets/videos/mockup-2-forward.mp4",
      videoWebm: "/assets/videos/mockup-2-forward.webm",
      videoAlt: "Workpal analyzing email context and task",
    },
    {
      step: 3,
      title: "You get the result (privately)",
      description:
        "Workpal emails you back. You review it, tweak if needed, then forward it yourself. You are always in control of what leaves your inbox.",
      videoMp4: "/assets/videos/mockup-3-reply.mp4",
      videoWebm: "/assets/videos/mockup-3-reply.webm",
      videoAlt: "Workpal reply with polished deliverable in your inbox",
    },
  ],
  cta: "Create my Workpal \u2014 it\u2019s free to start",
} as const;

export const COMPARISON_SECTION = {
  sectionId: "comparison",
  label: "Why Workpal?",
  heading: "Stop copy-pasting into ChatGPT.",
  subtitle: "Stay in your inbox.",
  left: {
    header: "The ChatGPT Way",
    rows: [
      { icon: "\u2715", text: "Switch tabs, login, find the right chat" },
      { icon: "\u2715", text: "Copy-paste sensitive email threads" },
      { icon: "\u2715", text: "Write long, detailed prompts" },
      { icon: "\u2715", text: "Copy result back into email" },
      { icon: "\u26a0", text: "Risk pasting wrong info to wrong person" },
    ],
  },
  right: {
    header: "The Workpal Way",
    rows: [
      { icon: "\u2713", text: "Just hit \"Forward\"" },
      { icon: "\u2713", text: "Context stays in your email" },
      { icon: "\u2713", text: "Zero prompting \u2014 it reads the thread" },
      { icon: "\u2713", text: "Result arrives in your inbox" },
      { icon: "\u25c6", text: "Closed loop: replies only to you" },
    ],
  },
} as const;

export const SOCIAL_PROOF = {
  userCount: "Thanks to our 500+ Private Alpha Users",
  testimonials: [
    {
      quote:
        "WorkPal keeps my four executives, their calendars, and my sanity all in one place.",
      name: "Lorraine Athaide",
      role: "Senior Executive Assistant",
      company: "RDS Brokerage",
      photo: "/assets/testimonials/lorraine.webp",
      linkedin: "https://www.linkedin.com/in/lorraine-athaide-2514211b/",
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
      tabLabel: "Client Brief",
      forwardedEmail: {
        from: "partner@lawfirm.com",
        subject: "Meridian acquisition \u2014 can you summarize where we stand?",
        body: "Hey, the board meets Thursday. Can you pull together a one-page summary of the Meridian deal \u2014 final pricing, revised timeline after their Q2 pushback, and the three concessions we agreed to?",
      },
      workpalReply: {
        fromLine: "you@workpal.email \u2192 you@company.com",
        subject: "Re: Meridian acquisition \u2014 summary",
        body: "**Meridian Acquisition \u2014 Executive Summary**\n\n**Final Pricing:** $42M all-cash, revised down from $45M following due diligence adjustments on the IP portfolio valuation.\n\n**Revised Timeline:** Close expected Aug 15 (pushed 6 weeks from original June 30 target due to their Q2 earnings review).\n\n**Key Concessions:**\n1. 18-month earn-out on the SaaS revenue stream\n2. Retained two senior engineers through 2026\n3. Waived the non-compete clause for their APAC division\n\n_Ready to copy into your reply, or edit as needed._",
      },
    },
    {
      tabLabel: "Meeting Follow-up",
      forwardedEmail: {
        from: "cto@startup.io",
        subject: "Re: Re: Re: Roadmap sync \u2014 next steps",
        body: "Good call today. Lots discussed. Can someone pull together the action items? I think we agreed on the API deadline, the hiring plan change, and something about the SOC2 audit but I can\u2019t remember the details.",
      },
      workpalReply: {
        fromLine: "you@workpal.email \u2192 you@company.com",
        subject: "Re: Roadmap sync \u2014 action items",
        body: "**Roadmap Sync \u2014 Action Items**\n\n**1. API v2 Deadline:** Moved to Sept 1. Backend team to deliver staging build by Aug 15 for partner testing.\n\n**2. Hiring Plan:** Pausing the third frontend hire. Reallocating budget to a senior DevOps role (JD to be drafted by EOW).\n\n**3. SOC2 Audit:** Kicking off Aug 1 with Vanta. Sarah owns the evidence collection. Target completion: Oct 15.\n\n_Formatted as a follow-up email draft, ready to send to the team._",
      },
    },
    {
      tabLabel: "Contract Review",
      forwardedEmail: {
        from: "legal@vendor.com",
        subject: "SaaS Agreement v3 \u2014 attached for review",
        body: "Hi, attached is the updated SaaS agreement incorporating your redlines. Please review the liability cap changes in Section 8 and the new data residency clause in Section 12. Need sign-off by Friday.",
      },
      workpalReply: {
        fromLine: "you@workpal.email \u2192 you@company.com",
        subject: "Re: SaaS Agreement v3 \u2014 key changes flagged",
        body: "**Contract Review \u2014 Key Changes Flagged**\n\n**Section 8 (Liability Cap):** Cap reduced from 12 months to 6 months of fees. This is below your standard threshold \u2014 recommend pushing back.\n\n**Section 12 (Data Residency):** New clause restricts data to US-only hosting. Conflicts with your EU client base if you need GDPR-compliant storage in Frankfurt.\n\n**Other Changes:** Minor formatting in Sections 3 and 5. No substantive edits detected elsewhere.\n\n_Summary ready. Review and decide before forwarding your response to legal._",
      },
    },
  ],
} as const;

export const PERSONALIZATION = {
  sectionId: "personalization",
  label: "Personalization",
  heading: "Teach it to sound like you",
  headingSuffix: "(optional)",
  subtitle: "Workpal is smart out of the box. But it gets sharper when it knows your background, role, and tone.",
  cards: [
    {
      tag: "Works immediately",
      tagStyle: "neutral",
      title: "Without personalization",
      body: "Generates clean, professional responses. Identifies tasks from context. Handles summaries, drafts, and extraction with standard business tone.",
    },
    {
      tag: "Optional \u2014 add anytime",
      tagStyle: "accent",
      title: "With your background",
      body: "Mimics your seniority, industry jargon, and writing style. Knows the difference between how a VP of Sales writes vs. an engineering lead.",
      methods: ["LinkedIn", "Resume PDF", "Email signature", "Self-description"],
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
        "It uses professional formatting by default. You can optionally connect your LinkedIn, upload a resume, or describe your role so Workpal matches your seniority, industry vocabulary, and tone.",
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
  ],
} as const;

export const FINAL_CTA = {
  heading: "Ready to create your AI email?",
  subtext:
    "60 seconds. No credit card. It only ever emails you.",
} as const;

export const FOOTER = {
  links: [
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
    addCta: "Add Skill",
    namePlaceholder: "Skill name",
    descriptionPlaceholder: "Describe what this skill does...",
    emptyState: "No skills defined yet.",
  },
  samples: {
    heading: "Writing Samples",
    addCta: "Add Sample",
    titlePlaceholder: "Sample title",
    contentPlaceholder: "Paste a writing sample...",
    emptyState: "No writing samples yet. Add samples to help your agent learn your style.",
  },
  usage: {
    heading: "Usage",
    tasksUsed: "Tasks used",
    period: "Current period",
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
