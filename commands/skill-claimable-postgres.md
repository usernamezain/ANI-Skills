---
name: skill:claimable-postgres
description: >-
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
Trigger and execute the Antigravity skill: claimable-postgres.
Load the prompt instructions from skills/claimable-postgres/SKILL.md and consult the copy-pasteable references or guidelines inside skills/claimable-postgres/references/ to complete the task.
</objective>

<execution_context>
@skills/claimable-postgres/SKILL.md
</execution_context>
