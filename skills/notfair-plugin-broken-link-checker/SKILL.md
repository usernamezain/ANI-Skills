---
name: ai:broken-link-checker
argument-hint: "<URL to check, e.g. https://example.com>"
description: >
  Scans a website to find broken links (404s, 500s). Crawls internal pages,
  identifies broken outbound links, and reports source pages for easy fixing.
  Use this when the user asks to "check for broken links", "find 404s",
  "audit my links", or "is my site healthy".
---

# Canonical NotFair workflow

Read [`../../seo/broken-link-checker/SKILL.md`](../../seo/broken-link-checker/SKILL.md) completely, then follow it as the active workflow. Resolve every relative reference from that file against `../../seo/broken-link-checker/`.


## When to Use
- Use this skill when the task involves `broken-link-checker` workflows, tooling, or domain requirements from `nowork-studio/notfair-plugin`.
- Trigger on user keywords: `broken-link-checker`, `notfair-plugin`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
