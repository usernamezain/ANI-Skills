---
name: skill:validate-phase
description: Retroactively audit and fill Nyquist validation gaps for a completed phase
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
Trigger and execute the Antigravity skill: validate-phase.
Load the prompt instructions from skills/validate-phase/SKILL.md and consult the copy-pasteable references or guidelines inside skills/validate-phase/references/ to complete the task.
</objective>

<execution_context>
@skills/validate-phase/SKILL.md
</execution_context>
