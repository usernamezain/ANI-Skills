---
name: skill:progress
description: Check progress, advance workflow, or dispatch freeform intent — the unified antigravity situational command
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
Trigger and execute the Antigravity skill: progress.
Load the prompt instructions from skills/progress/SKILL.md and consult the copy-pasteable references or guidelines inside skills/progress/references/ to complete the task.
</objective>

<execution_context>
@skills/progress/SKILL.md
</execution_context>
