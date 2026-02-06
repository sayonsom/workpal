export const SITE = {
  name: "Workpal",
  nameLower: "workpal",
  tagline: "Your AI operator, right in your inbox.",
  agentEmail: "your-agent@workpal.email",
  sampleAgentEmail: "agent@workpal.email",
  copyright: "2025 Workpal Inc.",
  footerTagline: "Built with \u2615 for people who hate context-switching.",
} as const;

export const NAV = {
  links: [
    { label: "How it Works", href: "#how-it-works" },
    { label: "Why Not ChatGPT?", href: "#comparison" },
    { label: "For Business", href: "#for-business" },
  ],
  cta: "Get Your Workpal",
} as const;

export const HERO = {
  badge: "Your own AI, right in your inbox.",
  headlineLines: ["Get your own", "Workpal email."],
  subtext:
    "Workpal is your personal AI assistant that does tedious tasks for you \u2014 directly from your inbox. It reports only to you, and no one else.",
  inputPlaceholder: "Enter your email address",
  ctaLabel: "Get My Workpal",
  microcopy:
    "Free forever for individuals. No credit card. No new apps to learn.",
  emailUI: {
    from: "You",
    to: "agent@workpal.email",
    subject: "Summarize Q3 report",
    reply: "Here\u2019s a 5-point summary + next steps\u2026",
  },
} as const;

export const HOW_IT_WORKS = {
  heading: "How it actually works.",
  subtext: "No dashboard. No learning curve. Just email.",
  steps: [
    {
      title: "Get your agent",
      description:
        "Paste your LinkedIn. We create an AI operator that understands your role and context.",
      placeholderLabel: "Image: LinkedIn to Agent creation",
    },
    {
      title: "Forward anything",
      description:
        "Forward any email, doc, or task. Your agent only sees what you forward \u2014 nothing else.",
      placeholderLabel: "Image: Email forwarding",
    },
    {
      title: "Get it back, done",
      description:
        "Your agent replies to you with drafts, summaries, and actions. You decide what gets sent.",
      placeholderLabel: "Image: Agent reply in inbox",
    },
  ],
  cta: "Try it now \u2014 it\u2019s free",
} as const;

export const COMPARISON = {
  heading: "Why not just use ChatGPT, Gemini, or Claude?",
  subtext: "Great for thinking. Not built for inbox work.",
  leftCard: {
    title: "ChatGPT / Gemini / Claude",
    items: [
      "One long, messy conversation history",
      "Memory and past chats bleed into new tasks",
      "Manual copy-paste from email and attachments",
      "Hard to trace outputs back to the original thread",
    ],
  },
  rightCard: {
    title: "Workpal",
    items: [
      "Each forwarded email is its own clean context",
      "No cross-task memory bleed or hidden state",
      "Replies come back to the same thread",
      "Clear audit trail: input email \u2192 output",
    ],
  },
  footer: "Designed for real work, not open-ended chatting.",
  cta: "Try it on a real email",
  microcopy: "Forward one email. See the difference.",
} as const;

export const FOR_BUSINESS = {
  badge: "For Teams & Enterprise",
  headlineLines: [
    "Your team is already using AI.",
    "You just don\u2019t control it.",
  ],
  body: "Every ChatGPT tab is ungoverned data flow. Workpal gives your team an AI they\u2019ll actually use \u2014 with visibility, controls, and auditability.",
  bullets: [
    "No inbox access by default \u2014 agents only see what users forward",
    "Private cloud deployment (AWS, Azure, GCP)",
    "Full audit trail for every interaction",
  ],
  cta: "Explore Workpal for Business",
  microcopy: "SOC 2 roadmap in progress",
  placeholderLabel: "Image: Dashboard / Admin mockup",
} as const;

export const FOOTER = {
  links: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Contact", href: "#" },
  ],
} as const;
