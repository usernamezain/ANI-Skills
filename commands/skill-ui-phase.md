---
name: skill:ui-phase
description: Generate UI design contract (UI-SPEC.md) for frontend phases
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
Trigger and execute the Antigravity skill: ui-phase.
Load the prompt instructions from skills/ui-phase/SKILL.md and consult the copy-pasteable references or guidelines inside skills/ui-phase/references/ to complete the task.
</objective>

<execution_context>
@skills/ui-phase/SKILL.md
</execution_context>
