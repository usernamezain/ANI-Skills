---
name: skill:firecrawl-build-interact
description: Integrate Firecrawl `/interact` into product code for dynamic pages and browser actions after scraping. Use when a feature needs clicks, form fills, pagination, authentication-aware flows, or other multi-step interactions that plain `/scrape` cannot complete.
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
Trigger and execute the Antigravity skill: firecrawl-build-interact.
Load the prompt instructions from skills/firecrawl-build-interact/SKILL.md and consult the copy-pasteable references or guidelines inside skills/firecrawl-build-interact/references/ to complete the task.
</objective>

<execution_context>
@skills/firecrawl-build-interact/SKILL.md
</execution_context>
