---
name: skill:debug
description: Systematic debugging with persistent state across context resets
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
Trigger and execute the Antigravity skill: debug.
Load the prompt instructions from skills/debug/SKILL.md and consult the copy-pasteable references or guidelines inside skills/debug/references/ to complete the task.
</objective>

<execution_context>
@skills/debug/SKILL.md
</execution_context>
