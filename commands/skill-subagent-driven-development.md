---
name: skill:subagent-driven-development
description: Use when executing implementation plans with independent tasks in the current session
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
Trigger and execute the Antigravity skill: subagent-driven-development.
Load the prompt instructions from skills/subagent-driven-development/SKILL.md and consult the copy-pasteable references or guidelines inside skills/subagent-driven-development/references/ to complete the task.
</objective>

<execution_context>
@skills/subagent-driven-development/SKILL.md
</execution_context>
