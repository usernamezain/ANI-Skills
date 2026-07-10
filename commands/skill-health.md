---
name: skill:health
description: Diagnose planning directory health and optionally repair issues
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
Trigger and execute the Antigravity skill: health.
Load the prompt instructions from skills/health/SKILL.md and consult the copy-pasteable references or guidelines inside skills/health/references/ to complete the task.
</objective>

<execution_context>
@skills/health/SKILL.md
</execution_context>
