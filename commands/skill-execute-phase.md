---
name: skill:execute-phase
description: Execute all plans in a phase with wave-based parallelization
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
Trigger and execute the Antigravity skill: execute-phase.
Load the prompt instructions from skills/execute-phase/SKILL.md and consult the copy-pasteable references or guidelines inside skills/execute-phase/references/ to complete the task.
</objective>

<execution_context>
@skills/execute-phase/SKILL.md
</execution_context>
