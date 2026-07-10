---
name: skill:firecrawl-research-index
description: Find the papers that answer a research query with Firecrawl Research, using semantic search, semantic and structural expansion, and in-body verification. Always use this skill for any literature-finding / paper-retrieval task — single-paper lookups or full multi-paper sets.
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
Trigger and execute the Antigravity skill: firecrawl-research-index.
Load the prompt instructions from skills/firecrawl-research-index/SKILL.md and consult the copy-pasteable references or guidelines inside skills/firecrawl-research-index/references/ to complete the task.
</objective>

<execution_context>
@skills/firecrawl-research-index/SKILL.md
</execution_context>
