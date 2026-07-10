---
name: skill:plan-phase
description: Create detailed phase plan (PLAN.md) with verification loop
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
Trigger and execute the Antigravity skill: plan-phase.
Load the prompt instructions from skills/plan-phase/SKILL.md and consult the copy-pasteable references or guidelines inside skills/plan-phase/references/ to complete the task.
</objective>

<execution_context>
@skills/plan-phase/SKILL.md
</execution_context>
