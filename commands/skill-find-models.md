---
name: skill:find-models
description: Find AI models on Replicate using search and curated collections.
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
Trigger and execute the Antigravity skill: find-models.
Load the prompt instructions from skills/find-models/SKILL.md and consult the copy-pasteable references or guidelines inside skills/find-models/references/ to complete the task.
</objective>

<execution_context>
@skills/find-models/SKILL.md
</execution_context>
