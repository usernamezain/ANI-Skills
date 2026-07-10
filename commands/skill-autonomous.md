---
name: skill:autonomous
description: Run all remaining phases autonomously — discuss→plan→execute per phase
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
Trigger and execute the Antigravity skill: autonomous.
Load the prompt instructions from skills/autonomous/SKILL.md and consult the copy-pasteable references or guidelines inside skills/autonomous/references/ to complete the task.
</objective>

<execution_context>
@skills/autonomous/SKILL.md
</execution_context>
