---
name: skill:manager
description: Interactive command center for managing multiple phases from one terminal
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
Trigger and execute the Antigravity skill: manager.
Load the prompt instructions from skills/manager/SKILL.md and consult the copy-pasteable references or guidelines inside skills/manager/references/ to complete the task.
</objective>

<execution_context>
@skills/manager/SKILL.md
</execution_context>
