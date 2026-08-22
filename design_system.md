SamStudio: Design System & Motion Physics Blueprint

Version: 2.0.0 (Awwwards-Grade Interactive Specification)

Execution Environment: Antigravity IDE

Primary Objective: Deliver a unified, luxurious, ultra-fast visual design language and smooth motion physics engine optimized for global high-converting Web UX (EN | FR | AR | TR).

1. Brand Philosophy & Identity Pillars

Agency Name: SamStudio

Primary Mark: SamStudio Wordmark (Plus Jakarta Sans ExtraBold with tracked uppercase sub-elements)

Visual Signature: Interlocking SS Monogram framed in an obsidian glass container.

Core Palette Philosophy: Deep obsidian depth (#09090B) paired with high-contrast luxury gold (#E5C158), electric indigo/violet (#6366F1), cyan (#06B6D4), and emerald (#10B981) accents.

Target Tone: International, technologically superior, sleek, conversion-focused, and authoritative.

2. Master Color System & Design Tokens

Obsidian Surface Depth Scale

The UI uses layered translucency rather than solid flat fills to achieve depth and volumetric ambient lighting.

Token Name

Hex Value

CSS Variable / Tailwind

Description / Application

surface-obsidian

#09090B

--bg-obsidian

Base page canvas background

surface-zinc-dark

#121215

--bg-zinc-dark

Secondary section background

surface-card-base

#18181B

--bg-zinc-card

Glassmorphic card surface fill

surface-card-elevated

#242429

--bg-zinc-elevated

Interactive hover cards & modals

border-glass-light

rgba(255,255,255,0.08)

--border-glass

Subdued outer card borders

border-glass-glow

rgba(99,102,241,0.35)

--border-violet-glow

Active/Hover card state border

Luxury & Precision Accent Tokens

Token Name

Hex Value

CSS Accent Class

Purpose

accent-gold

#D4AF37

.text-accent-gold

Primary Turkish B2B export accents & luxury seals

accent-gold-light

#E5C158

.bg-accent-gold-light

Conversion CTAs, high-yield primary buttons

accent-violet

#6366F1

.text-accent-violet

Next.js engineering & AI technology features

accent-violet-glow

#818CF8

.glow-violet

Ambient glow backdrops & hover states

accent-cyan

#06B6D4

.text-accent-cyan

Motion ad video reels & speed metrics

accent-emerald

#10B981

.text-accent-emerald

Active indicators, conversion badges, success states

3. Multilingual Typography Scale & Dynamic RTL Rules

Typography Stack

Latin Headings (EN, FR, TR): Plus Jakarta Sans, sans-serif

Arabic Headings & Body (AR): Cairo, sans-serif (With $+1\text{px}$ optical size calibration)

General Body (EN, FR, TR): Inter, sans-serif

Code & AI Prompt Engine: JetBrains Mono, monospace

Type Scale Matrix

Level

Size (px / rem)

Weight

Line Height

Tracking

Usage

Hero Title

$72\text{px} / 4.5\text{rem}$

$800$ (ExtraBold)

$1.05$

$-0.03\text{em}$

Main hero heading

H1 Display

$52\text{px} / 3.25\text{rem}$

$800$ (ExtraBold)

$1.1$

$-0.02\text{em}$

Primary section titles

H2 Section

$36\text{px} / 2.25\text{rem}$

$700$ (Bold)

$1.2$

$-0.01\text{em}$

Sub-section headers

H3 Card

$24\text{px} / 1.5\text{rem}$

$600$ (SemiBold)

$1.3$

$0\text{em}$

Card titles & feature items

Body Large

$18\text{px} / 1.125\text{rem}$

$400$ (Regular)

$1.6$

$0\text{em}$

Lead paragraphs & hero subtitles

Body Base

$16\text{px} / 1.0\text{rem}$

$400$ (Regular)

$1.5$

$0\text{em}$

General body text

Caption / Badge

$12\text{px} / 0.75\text{rem}$

$600$ (SemiBold)

$1.4$

$+0.05\text{em}$

Tags, badges, and timestamps

Dynamic RTL (Arabic) Layout Rules

Set dir="rtl" dynamically at the HTML root element when switching to Arabic.

Use CSS logical properties (margin-inline-start, padding-inline-end, text-align: start) to prevent manual inline style conflicts.

Rotate structural directional arrows ($180^\circ$) automatically via html[dir="rtl"] .icon-arrow { transform: scaleX(-1); }.

4. UI Components & Glassmorphism Tokens

CSS Glassmorphism Token Definition

.glass-card {
  background: rgba(24, 24, 27, 0.65);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-card:hover {
  border-color: rgba(99, 102, 241, 0.35);
  box-shadow: 0 0 30px -5px rgba(99, 102, 241, 0.25);
  transform: translateY(-4px);
}

.glass-card-gold:hover {
  border-color: rgba(229, 193, 88, 0.4);
  box-shadow: 0 0 30px -5px rgba(229, 193, 88, 0.25);
}


Button Tokens & Micro-Interactions

Primary Gold Conversion Button:

Gradient: linear-gradient(135deg, #E5C158 0%, #D4AF37 100%)

Text Color: #09090B (ExtraBold)

Glow: 0 0 25px rgba(229, 193, 88, 0.35)

Hover Physics: Scale $1.03$, brightness $+5\%$.

Secondary Glass Button:

Background: rgba(255, 255, 255, 0.05)

Border: 1px solid rgba(255, 255, 255, 0.15)

Hover Physics: Border color transitions to accent-violet-glow, fill opacity to $0.12$.

Multilingual Toggle Pill:

Segmented button group with active violet pill slide animation (transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)).

5. Motion Physics & Animation Curves

To achieve Awwwards-grade liquid smooth scroll dynamics and hover interactions, all Framer Motion and CSS transitions adhere strictly to these physics curves:

// Master Motion Transition Configurations
export const awwwardsPhysics = {
  // Ultra-smooth spring easing curve
  easeCustom: [0.16, 1, 0.3, 1],
  
  // Staggered reveal timing for service cards
  staggerContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  },

  // Card slide & fade entrance
  fadeUpVariant: {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    }
  },

  // Modal expand physics
  modalSpring: {
    type: "spring",
    stiffness: 300,
    damping: 30
  }
};


6. Outside AI Generation Standards

When generating supplementary visual assets (realistic studio team photos, dynamic video loops, B2B export product renders), use these baseline parameters:

Aspect Ratios:

Hero/Team Visuals: --ar 16:9

Product Portfolio Showcase: --ar 4:3

Social & Reel Ad Covers: --ar 9:16

Color Temperature: Obsidian dark ambient background with warm gold ($3200\text{K}$) and violet ($6500\text{K}$) rim lights.

7. Next Step Verification Loop

[x] Refine visual color tokens and obsidian surface depths.

[x] Define typography scales for EN, FR, TR, and Arabic with dynamic RTL rules.

[x] Define UI glassmorphism and magnetic button micro-interactions.

[x] Specify Framer Motion / CSS physics animation curves.

Phase Status: Phase 2 Complete. Ready for Phase 3 (Brand Collateral & Outside AI Asset Strategy).