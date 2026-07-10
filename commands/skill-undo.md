---
name: skill:undo
description: Safe git revert. Roll back phase or plan commits using the phase manifest with dependency checks.
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
Trigger and execute the Antigravity skill: undo.
Load the prompt instructions from skills/undo/SKILL.md and consult the copy-pasteable references or guidelines inside skills/undo/references/ to complete the task.
</objective>

<execution_context>
@skills/undo/SKILL.md
</execution_context>
