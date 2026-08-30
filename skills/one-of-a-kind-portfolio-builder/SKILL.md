---
name: ui:portfolio-builder
description: Build a genuinely distinctive personal/creative portfolio site by orchestrating the full library of installed animation and section skills (gsap-scrolltrigger-effects, custom-cursor-effects, text-motion-typography, morph-mask-reveal-transitions, preloader-visual-loading, threejs-interactive-backgrounds, retro-90s-ui-effects, buttery-smooth-120fps-performance, and the 20 section skills — hero, navbar, about, portfolio grid, testimonials, pricing, footer, contact form, stats, FAQ, team, CTA, gallery, timeline, blog, logo cloud, comparison table, video hero, newsletter). Use this skill whenever the user asks to "build my portfolio", "make a portfolio site", "design a personal website", or wants a site that "stands out", "looks unlike anything else", or "no one has seen before" — it is the master assembly skill that picks unusual, deliberately non-templated combinations from the other skills instead of defaulting to the most obvious pairing of each.
---

# One-of-a-Kind Portfolio Builder

Most "creative portfolio" briefs produce the same result: dark background, centered hero, fade-up-on-scroll grid, generic testimonials carousel. Every technique below is real and works, but the ingredients aren't the differentiator — the *combination* is. This skill's job is to actively avoid the default pairing and force a specific, opinionated point of view before writing any code.

## Step 0 — Read the actual skill files before building anything

Before writing code, check which of the following are installed/available and open the ones relevant to your plan (paths assume standard install location; adjust if different):
- Core effects: `gsap-scrolltrigger-effects`, `custom-cursor-effects`, `text-motion-typography`, `morph-mask-reveal-transitions`, `preloader-visual-loading`, `threejs-interactive-backgrounds`, `retro-90s-ui-effects`, `buttery-smooth-120fps-performance`
- Sections: `hero-cinematic-parallax-section`, `hero-split-text-reveal-section`, `scroll-morph-navbar-section`, `pinned-storytelling-about-section`, `portfolio-hover-reveal-grid-section`, `scrub-carousel-testimonials-section`, `tilt-hover-pricing-cards-section`, `mask-reveal-footer-section`, `floating-label-contact-form-section`, `animated-stats-counter-section`, `smooth-accordion-faq-section`, `tilt-3d-team-cards-section`, `magnetic-cta-section`, `horizontal-scroll-gallery-section`, `scroll-pinned-timeline-section`, `stagger-reveal-blog-cards-section`, `marquee-logo-cloud-section`, `scroll-comparison-table-section`, `video-hero-section`, `morph-newsletter-signup-section`

Do not reproduce a section's code from memory once you've opened its SKILL.md — copy the actual patterns so the correctness rules (touch guards, `will-change` cleanup, `ScrollTrigger.refresh()`, reduced-motion handling) travel with the code.

## Step 1 — Interview before designing (never skip this)

A portfolio's originality comes from the person, not the template. Before picking effects, get:
1. **Field/discipline** — photographer, developer, illustrator, motion designer, writer, architect, musician, etc. This alone should change the whole visual language, not just the copy.
2. **One real reference point they love** (a film, a decade, a material, a place — not "clean and modern," that's not a reference).
3. **What they want visitors to feel** in the first three seconds.
4. **Real content available now**: actual project names/images, or should the build use clearly-labeled placeholders?

If this is a coding-agent context without a live user to ask, make explicit, stated assumptions instead of defaulting silently — e.g. "Assuming a motion designer with a maximalist, tactile reference point since none was given" — and note that the site can be re-themed once real answers exist.

## Step 2 — The anti-cliché checklist (run this against your first instinct, every time)

Before finalizing a plan, check whether you've defaulted to any of these — if 3+ are true, stop and pick different techniques:
- [ ] Dark background + white sans-serif + centered hero text (the single most common portfolio pattern)
- [ ] Fade-up-on-scroll as the *only* reveal technique used anywhere on the page
- [ ] A hero that is just a big name + role + one CTA, no other point of view
- [ ] Purple/blue gradient glow as the accent color (extremely common default — pick a deliberate palette instead, see Step 3)
- [ ] Every section uses the same entrance timing/easing with no variation
- [ ] Generic stock-feeling "hover to see project" grid with no distinguishing personality

The goal isn't to avoid these techniques forever — pinning, scrubbing, and fade-ups are genuinely good tools — it's to make sure at least two or three sections do something a visitor hasn't seen five times already this month.

## Step 3 — Force one unconventional pairing (this is the actual originality mechanism)

Pick **one deliberate collision** of aesthetics/techniques that wouldn't be anyone's first instinct, and let it define the whole site rather than living in one isolated section. Some starting combinations (invent your own once you see the pattern — these are prompts, not a menu to pick from verbatim):

- **Retro terminal × real 3D** — `retro-90s-ui-effects`' CRT scanlines/monospace/glitch text as the *entire* type system, layered over a genuinely modern `threejs-interactive-backgrounds` particle field or shader gradient. Old-web texture with next-gen depth underneath.
- **Editorial print × scroll-scrub** — treat `hero-split-text-reveal-section`'s huge line-mask typography like a magazine cover, then use `gsap-scrolltrigger-effects` pin+scrub (via `pinned-storytelling-about-section`) for a slow, print-like pace instead of the usual fast SaaS-style reveals.
- **Physical material metaphor** — pick one real material (paper, film, ceramic, brass) as a literal constraint: grain/texture overlays, a `morph-mask-reveal-transitions` "page turn"-style wipe instead of a generic fade, cursor as a "pen" or "stylus" via `custom-cursor-effects` instead of a dot.
- **Sound-adjacent motion** — for a musician/audio portfolio, drive `animated-stats-counter-section`-style numeric reveals and `text-motion-typography` letter-stagger timing off a waveform-like easing curve (irregular, punchy `stagger` values) instead of uniform stagger, so text motion itself feels rhythmic.
- **Deliberately quiet** — for a photographer/architect, the "unconventional" move might be restraint: almost no motion except `morph-mask-reveal-transitions`' clip-path image reveals and slow `gsap-scrolltrigger-effects` parallax, zero cursor gimmicks, generous whitespace. Restraint is a legitimate point of view, not a fallback.

Whatever you choose, name it explicitly in your plan (e.g. "CRT-terminal-meets-particle-field") and apply it consistently — the navbar, cursor, section transitions, and color palette should all visibly belong to the same decision, not feel like five unrelated demos stapled together.

## Step 4 — Assemble sections with intentional rhythm, not uniform repetition

Once the pairing is chosen, select from the 20 section skills and vary *how* each one enters — don't apply the same `scrollTrigger` easing/stagger everywhere:

1. **Hero** — `hero-cinematic-parallax-section` or `hero-split-text-reveal-section`, reskinned per the chosen pairing.
2. **Nav** — `scroll-morph-navbar-section`, cursor state changes wired via `custom-cursor-effects`.
3. **About/story** — `pinned-storytelling-about-section` for a narrative-heavy person, or skip pinning and use a quieter reveal for a restraint-based direction.
4. **Work** — `portfolio-hover-reveal-grid-section` (image-preview) or `horizontal-scroll-gallery-section` (if the work benefits from a slower, deliberate one-at-a-time pace) — pick one, not both, to avoid redundant scroll mechanics.
5. **Proof** — `animated-stats-counter-section` and/or `scrub-carousel-testimonials-section`, only if real numbers/quotes exist; cut this section entirely rather than filling it with fake placeholder stats.
6. **Contact** — `floating-label-contact-form-section` or a single `magnetic-cta-section` linking to email — pick based on whether the person wants to filter inbound inquiries (form) or keep it low-friction (single CTA).
7. **Footer** — `mask-reveal-footer-section`.
8. **Loading** — apply `preloader-visual-loading` only if the page has genuinely heavy assets (video/3D) that benefit from a real progress readout; skip it for a lightweight page, since an unnecessary preloader is itself a cliché and adds friction.

Layer `buttery-smooth-120fps-performance`'s rules (Lenis smooth-scroll sync, transform-only animation, single render loop, `will-change` hygiene) across the whole build regardless of which pairing was chosen — smoothness is table stakes, not the differentiator.

## Step 5 — Palette and type as originality signals, not decoration

Generic AI-built sites default to purple/blue gradients on near-black. Deliberately choose a 2–3 color palette and a type pairing that supports the Step 3 pairing (e.g. terminal-green monospace + off-white for the CRT direction; warm paper cream + a serif display face for the print direction). State the palette explicitly in the build plan before writing CSS so it's applied consistently via CSS custom properties (`--accent`, `--bg`, `--fg`) rather than ad-hoc hex values scattered through each section's code.

## Step 6 — Before shipping, sanity-check against the brief

- Does the site look like it belongs to *this specific person's* field and reference point, or could it be reskinned for anyone with a find-and-replace of the name? If the latter, go back to Step 3.
- Is there at least one moment (not just the hero) that a visitor would screenshot or mention to a friend?
- Did `buttery-smooth-120fps-performance` and touch-device/`prefers-reduced-motion` guards actually get applied, or only planned?
- Real content vs. placeholder: label placeholders unambiguously (e.g. `[PROJECT NAME]`, obvious placeholder imagery) so the person doesn't accidentally ship fake project names.

## Notes for the agent

- This skill is a planning/orchestration layer — the actual DOM/CSS/JS should be copied from the referenced section and effect skills' own code blocks, not reinvented from scratch, so their correctness rules and accessibility notes carry over.
- If the person has no strong reference point and won't engage with Step 1's interview, make the boldest reasonable assumption rather than defaulting to the safest, most generic option — a distinctive site that needs one round of "actually, tone that down" feedback is a better outcome than an inoffensive template.
- "Never seen before" is a direction, not a literal claim — the goal is a specific, coherent point of view assembled from real, working techniques, not fabricated novelty.
