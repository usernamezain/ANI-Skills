---
name: skill:firecrawl-build-scrape
description: Integrate Firecrawl `/scrape` into product code for single-page extraction. Use when an app already has a URL and needs markdown, HTML, links, screenshots, metadata, or structured page output. Prefer this skill over broader crawl patterns when the feature is page-level.
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
  - Agent
---
<objective>
Trigger and execute the Antigravity skill: firecrawl-build-scrape.
Load the prompt instructions from skills/firecrawl-build-scrape/SKILL.md and consult the copy-pasteable references or guidelines inside skills/firecrawl-build-scrape/references/ to complete the task.
</objective>

<execution_context>
@skills/firecrawl-build-scrape/SKILL.md
</execution_context>
