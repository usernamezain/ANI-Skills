---
name: skill:claude-api
description: |-
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
Trigger and execute the Antigravity skill: claude-api.
Load the prompt instructions from skills/claude-api/SKILL.md and consult the copy-pasteable references or guidelines inside skills/claude-api/references/ to complete the task.
</objective>

<execution_context>
@skills/claude-api/SKILL.md
</execution_context>
