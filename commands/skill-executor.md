---
name: skill:executor
description: Executes antigravity plans with atomic commits, deviation handling, checkpoint protocols, and state management. Spawned by execute-phase orchestrator or execute-plan command.
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
Trigger and execute the Antigravity skill: executor.
Load the prompt instructions from skills/executor/SKILL.md and consult the copy-pasteable references or guidelines inside skills/executor/references/ to complete the task.
</objective>

<execution_context>
@skills/executor/SKILL.md
</execution_context>
