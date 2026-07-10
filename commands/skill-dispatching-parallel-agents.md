---
name: skill:dispatching-parallel-agents
description: Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies
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
Trigger and execute the Antigravity skill: dispatching-parallel-agents.
Load the prompt instructions from skills/dispatching-parallel-agents/SKILL.md and consult the copy-pasteable references or guidelines inside skills/dispatching-parallel-agents/references/ to complete the task.
</objective>

<execution_context>
@skills/dispatching-parallel-agents/SKILL.md
</execution_context>
