---
name: skill:secure-phase
description: Retroactively verify threat mitigations for a completed phase
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
Trigger and execute the Antigravity skill: secure-phase.
Load the prompt instructions from skills/secure-phase/SKILL.md and consult the copy-pasteable references or guidelines inside skills/secure-phase/references/ to complete the task.
</objective>

<execution_context>
@skills/secure-phase/SKILL.md
</execution_context>
