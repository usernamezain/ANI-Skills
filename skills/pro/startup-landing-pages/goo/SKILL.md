---
name: ani:pro:startup-landing-pages:goo
description: Generate a full premium startup landing page with fluid gradient blobs, 3D tilt perspective hero, mouse-tracking bento grid glow effects, and framer-motion animations — the "Goo" aesthetic.
---

# Goo Startup Landing Page

A complete, multi-section landing page template for modern, sophisticated startups. It combines deep 3D canvas interactions, continuously animated blob backgrounds, and intelligent mouse-tracking glow effects across the bento grid — creating a living, breathing page that feels premium and brand-defining.

## Features

- **Animated Background Blobs**: `BackgroundGradient` renders 4–6 blurred radial blobs (`blur-[120px]`) in indigo, purple, and pink. Each blob moves via `framer-motion` looping keyframes (scale + position shift) on a staggered 6–10s delay, simulating organic "goo" motion.
- **3D Tilt Hero Dashboard**: `HeroSection` uses `useSpring` + `useTransform` from `framer-motion` with `stiffness: 500, damping: 100` to map mouse position (0–1) to ±15° X/Y `perspective` 3D rotations. Creates a tactile, "alive" 3D product dashboard preview.
- **Bento Grid with Mouse Glow**: `BentoGrid` uses CSS Custom Properties (`--mouse-x`, `--mouse-y`) updated by a global `mousemove` listener. Each card shows a `radial-gradient` light following the cursor on hover — a premium interaction pattern used by Vercel, Linear, and Stripe.
- **Animated Logo Strip**: `LogosSection` renders logos as `grayscale` by default, animating to full color on hover with a smooth `transition-all`.
- **Integrated Smooth Scrolling**: Uses `framer-motion`'s `useScroll` and `useTransform` for parallax and reveal animations on scroll for sections like `WorkflowSection`, `StatsSection`, and `IntegrationsSection`.
- **Pricing Grid**: `PricingSection` has 3 tiers with a "Best Value" card using a gradient border (`bg-gradient-to-b from-indigo-500 to-purple-500`) and scale-up on hover.
- **Testimonial, FAQ, Team, Newsletter**: All supporting sections with consistent glassmorphism card styling (`bg-zinc-900/50 backdrop-blur-sm border border-zinc-800`).
- **Text Reveal Animations**: Headlines use `framer-motion` `viewport`-triggered `y: 20 → 0` + `opacity: 0 → 1` reveals with `once: true`.

## Component Structure

The unified implementation is at `references/component.tsx`. It exports `GooPage` as the default export. All section components are named exports in the same file:

- `BackgroundGradient` — animated blob layer (fixed, z-0)
- `Navbar` — fixed glassmorphism top nav
- `HeroSection` — 3D tilt dashboard with CTA
- `LogosSection` — hover-to-color logo strip
- `BentoGrid` — 6-card mouse-glow layout
- `WorkflowSection`, `StatsSection`, `IntegrationsSection`
- `PricingSection` — 3-tier pricing
- `TestimonialSection`, `FAQSection`, `GooTeam`, `GooNewsletter`, `CallToAction`

## Dependencies

- `framer-motion`
- `lucide-react`
- `clsx` / `cn` utility

## How to Use

Drop `GooPage` directly into any Next.js app router page (`page.tsx`). All animations and interactions are fully self-contained. The global mouse listener for bento grid glows is initialized in a `useEffect` at the `GooPage` level and writes to `document.documentElement` CSS variables.
