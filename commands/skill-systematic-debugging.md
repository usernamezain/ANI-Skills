---
name: skill:systematic-debugging
description: Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes
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
Trigger and execute the Antigravity skill: systematic-debugging.
Load the prompt instructions from skills/systematic-debugging/SKILL.md and consult the copy-pasteable references or guidelines inside skills/systematic-debugging/references/ to complete the task.
</objective>

<execution_context>
@skills/systematic-debugging/SKILL.md
</execution_context>
