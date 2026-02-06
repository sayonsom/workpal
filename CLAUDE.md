# Cofiboy Landing Page

## Product Overview
Cofiboy gives every professional a governed AI operator accessible entirely through email. No new apps, no dashboards, no context switching. Users forward tasks to their agent's email, and the agent responds back — everything stays in their inbox. The user stays in control of what the agent sees and what gets sent.

**Key messaging pillars:**
1. Inbox-native — no new tools to learn
2. User-controlled — agent only sees what you forward
3. IT-safe — governed, auditable, private-cloud ready

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: AWS (Amplify or S3+CloudFront)
- **Fonts**: Lato (primary via `next/font`), system monospace fallback

## Design System — Slack-Inspired Tokens
The design language is Slack-inspired: clean, warm, confident, slightly playful but deeply professional. Reference `/design/tokens.json` for the full token set.

### Key Design Principles
1. **Aubergine brand accent** — `#3F0E40` used sparingly: nav logo, footer bg, enterprise badge, placeholder accents. Not a dominant color.
2. **Light mode only** — `#FFFFFF` bg, `#F8F8F8` subtle bg sections, `#1D1C1D` text. No dark mode for v1.
3. **Typography** — Lato. Body 15px/1.4. Headlines bold (700). Captions 12px. Normal letter-spacing.
4. **Spacing** — 4px grid: 4, 8, 12, 16, 20, 24, 32, 40, 48.
5. **Radii** — 6px buttons/inputs, 8px cards. Pills for badges.
6. **Shadows** — `0 1px 2px rgba(0,0,0,0.08)` cards. `0 6px 16px rgba(0,0,0,0.12)` elevated.
7. **Green CTA** — `#007A5A` primary. Hover `#006B4F`. White text.
8. **Borders** — `rgba(29,28,29,0.13)` light. `rgba(29,28,29,0.20)` strong.

### Color Palette
```
Background:       #FFFFFF
Subtle BG:        #F8F8F8
Text Primary:     #1D1C1D
Text Subtle:      rgba(29,28,29, 0.70)
Text Muted:       rgba(29,28,29, 0.55)
Link:             #1264A3
Brand Aubergine:  #3F0E40
CTA Green:        #007A5A
CTA Green Hover:  #006B4F
Danger/Accent:    #E01E5A
Warning/Accent:   #ECB22E
Info/Focus:       #1D9BD1
Success:          #2BAC76
```

## Copywriting Voice
- **Tone**: Direct, confident, slightly witty. Like a smart colleague who gets it.
- **Style**: Minimal words, maximum impact. No "revolutionize", "leverage", "seamlessly".
- **Key word**: "operator" (not "assistant"). Implies structured work, not chatting.
- **Control language**: "You decide", "only sees what you forward", "you stay in control".
- **Pattern**: Short headlines (5-8 words). One-liner subtext. Visuals carry the rest.

## Page Sections (6 total)
1. **Navbar** — sticky, logo + 3 anchor links + green CTA
2. **Hero** — headline + LinkedIn input + fake email UI component
3. **How It Works** — 3-step card flow with placeholder visuals
4. **Why Not ChatGPT?** — 2-column comparison killing the objection
5. **For Business** — B2B governance pitch on subtle bg
6. **Footer** — aubergine bg, minimal links

## File Structure
```
src/
  app/
    layout.tsx          # Root layout, fonts, metadata
    page.tsx            # Landing page (all sections composed here)
    globals.css         # Tailwind base + custom CSS variables from tokens
  components/
    landing/
      Navbar.tsx        # Sticky top nav with anchor links
      Hero.tsx          # Hero with input + fake email UI
      HowItWorks.tsx    # 3-step cards
      WhyNotChatGPT.tsx # Comparison section
      ForBusiness.tsx   # B2B governance pitch
      Footer.tsx        # Aubergine footer
    ui/
      Button.tsx        # Primary / secondary / ghost variants
      Badge.tsx         # Pill badge
      Card.tsx          # Elevated card
      ImagePlaceholder.tsx  # Reusable placeholder with src prop
  design/
    tokens.json         # Full Slack-inspired token file (copy from provided JSON)
  lib/
    constants.ts        # All copy strings centralized here
public/
  images/               # Placeholder SVGs for future replacement
    hero-placeholder.svg
    step-1.svg
    step-2.svg
    step-3.svg
    business-placeholder.svg
  favicon.ico
```

## Component Guidelines

### General
- Semantic HTML everywhere: `<section>`, `<nav>`, `<main>`, `<footer>`
- All content max-width 1200px, centered, 16px horizontal padding
- Min hit target 32px on all interactive elements

### Icons & Visuals
- **No icon libraries** (no lucide, heroicons, font-awesome). Zero.
- Hand-craft the ~6 SVGs needed as inline components:
  - Checkmark (How It Works bullets, Business bullets, comparison right card) — #2BAC76
  - X mark (comparison left card) — #E01E5A
  - Right arrow (between How It Works cards) — rgba(29,28,29,0.55)
  - Send/forward arrow (optional, CTA buttons)
- Image placeholders: styled divs with aspect ratio + dashed border + label text

### Fake Email UI (Hero)
- Build as a real styled component, not an image
- Mimic a minimal email client: From line, Subject line, Reply bubble
- Use Slack surface tokens: white bg, light borders, sm shadow
- This component IS the hero illustration

### Comparison Section (WhyNotChatGPT)
- Two cards side by side
- Left card: neutral border, X items in #E01E5A
- Right card: green accent border (2px #007A5A), check items in #2BAC76
- Items are short single-line statements, not paragraphs

### States & Animations
- Buttons: `transition-colors duration-[180ms] ease-[cubic-bezier(0.2,0,0,1)]`
- Cards: `hover:-translate-y-0.5 transition-transform duration-[180ms]`
- Input focus: `focus:border-[#1D9BD1] transition-colors duration-[120ms]`
- Focus ring: `focus-visible:ring-2 ring-[#1D9BD1] ring-offset-2`
- Hero fade-in: CSS animation, opacity 0→1 over 240ms on mount
- NO scroll animations, NO intersection observers

## What NOT to Do
- No dark mode
- No hamburger menu
- No cookie banners, chat widgets, or popups
- No stock photos — placeholders are geometric/minimal
- No icon libraries
- No walls of text — max 3 sentences per section body
- No scroll-triggered animations
- No analytics or third-party scripts
- No external JS dependencies beyond Next.js + Tailwind
