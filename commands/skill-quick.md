---
name: skill:quick
description: Execute a quick task with antigravity guarantees (atomic commits, state tracking) but skip optional agents
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
Trigger and execute the Antigravity skill: quick.
Load the prompt instructions from skills/quick/SKILL.md and consult the copy-pasteable references or guidelines inside skills/quick/references/ to complete the task.
</objective>

<execution_context>
@skills/quick/SKILL.md
</execution_context>
