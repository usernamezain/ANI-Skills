# Antigravity Skills Library — Antigravity CLI Context

This context gives the Antigravity IDE and Gemini CLI the operating reference for the **Antigravity Skills Library**, a collection of **367 professional skills and prompts** across visual layout animations, testing automation, planning workflows, and algorithmic DSA.

## What Antigravity Skills Library is

A production-grade, zero-pain-point skills library for AI coding agents:
- **Visual scrollytelling**: GSAP, ScrollTrigger, Lenis, and Three.js templates.
- **Testing & Scraping**: 47 LambdaTest testing and browser automation (Puppeteer, Playwright, Selenium, Cypress) skills.
- **DSA Solving**: 20 algorithm templates in Python and JS.
- **Master Prompts**: 22 Boss Prompts for choreographing multiple skills together.

## The slash commands (installed via installer)

When this package is open inside the Antigravity IDE (built on the Gemini 3 backend), it automatically loads custom TOML commands defined under `.gemini/commands/`.

The commands are registered under the hyphenated namespace:
- `/skill-dsa-sliding-window` — solve subarray/substring problems.
- `/skill-buttery-smooth-120fps-performance` — implement smooth scrolling.
- `/skill-puppeteer-skill` — run headless browser scraping or automation.
- `/skill-[name]` — triggers any other of the 367 skills.

To configure links globally or generate Cursor/Windsurf/Trae rule files, run the installer:
```bash
npx ani-skills
```

## Working with Skills
- Refer to \`skills/[name]/SKILL.md\` for parameters, constraints, and instructions.
- Refer to \`skills/[name]/references/\` for copy-pasteable visual code samples or validation guides.
- Refer to \`boss-prompts/\` for master prompts to compose multiple skills.
