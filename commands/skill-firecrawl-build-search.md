---
name: skill:firecrawl-build-search
description: Integrate Firecrawl `/search` into product code and agent workflows. Use when an app needs discovery before extraction, when the feature starts with a query instead of a URL, or when the system should search the web and optionally hydrate result content.
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
Trigger and execute the Antigravity skill: firecrawl-build-search.
Load the prompt instructions from skills/firecrawl-build-search/SKILL.md and consult the copy-pasteable references or guidelines inside skills/firecrawl-build-search/references/ to complete the task.
</objective>

<execution_context>
@skills/firecrawl-build-search/SKILL.md
</execution_context>
