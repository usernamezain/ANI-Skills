---
name: skill:update
description: Update antigravity to latest version with changelog display
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
Trigger and execute the Antigravity skill: update.
Load the prompt instructions from skills/update/SKILL.md and consult the copy-pasteable references or guidelines inside skills/update/references/ to complete the task.
</objective>

<execution_context>
@skills/update/SKILL.md
</execution_context>
