---
name: skill:debugger
description: Investigates bugs using scientific method, manages debug sessions, handles checkpoints. Spawned by /antigravity:debug orchestrator.
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
Trigger and execute the Antigravity skill: debugger.
Load the prompt instructions from skills/debugger/SKILL.md and consult the copy-pasteable references or guidelines inside skills/debugger/references/ to complete the task.
</objective>

<execution_context>
@skills/debugger/SKILL.md
</execution_context>
