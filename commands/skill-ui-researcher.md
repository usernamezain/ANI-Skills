---
name: skill:ui-researcher
description: Produces UI-SPEC.md design contract for frontend phases. Reads upstream artifacts, detects design system state, asks only unanswered questions. Spawned by /antigravity:ui-phase orchestrator.
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
Trigger and execute the Antigravity skill: ui-researcher.
Load the prompt instructions from skills/ui-researcher/SKILL.md and consult the copy-pasteable references or guidelines inside skills/ui-researcher/references/ to complete the task.
</objective>

<execution_context>
@skills/ui-researcher/SKILL.md
</execution_context>
