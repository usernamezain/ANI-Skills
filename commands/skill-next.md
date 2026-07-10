---
name: skill:next
description: Smart entry — detect project state and route to the right next ANI action.
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
Trigger and execute the Antigravity skill: next.
Load the prompt instructions from skills/next/SKILL.md and consult the copy-pasteable references or guidelines inside skills/next/references/ to complete the task.
</objective>

<execution_context>
@skills/next/SKILL.md
</execution_context>
