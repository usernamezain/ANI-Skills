---
name: skill:firecrawl-build
description: Integrate Firecrawl into application code whenever a product, agent, or workflow needs web data inside the app: web search, live search results, page scraping, structured extraction, or browser interaction. Use when building any feature that needs data from the web in code, even if the user does not mention Firecrawl explicitly and only describes wanting web data, website content, search, scraping, or interaction in an application. Trigger for Firecrawl requests, "fire girl" shorthand, and generic app-level web-data needs that should map to `/scrape`, `/search`, or `/interact`. Do not use this skill for one-off terminal-only web tasks during the current session; use `firecrawl/cli` for those.
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
Trigger and execute the Antigravity skill: firecrawl-build.
Load the prompt instructions from skills/firecrawl-build/SKILL.md and consult the copy-pasteable references or guidelines inside skills/firecrawl-build/references/ to complete the task.
</objective>

<execution_context>
@skills/firecrawl-build/SKILL.md
</execution_context>
