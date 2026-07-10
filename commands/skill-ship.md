---
name: skill:ship
description: Create PR, run review, and prepare for merge after verification passes
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
Trigger and execute the Antigravity skill: ship.
Load the prompt instructions from skills/ship/SKILL.md and consult the copy-pasteable references or guidelines inside skills/ship/references/ to complete the task.
</objective>

<execution_context>
@skills/ship/SKILL.md
</execution_context>
