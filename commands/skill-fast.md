---
name: skill:fast
description: Execute a trivial task inline — no subagents, no planning overhead
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
Trigger and execute the Antigravity skill: fast.
Load the prompt instructions from skills/fast/SKILL.md and consult the copy-pasteable references or guidelines inside skills/fast/references/ to complete the task.
</objective>

<execution_context>
@skills/fast/SKILL.md
</execution_context>
