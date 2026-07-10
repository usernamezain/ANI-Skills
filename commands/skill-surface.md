---
name: skill:surface
description: Toggle which skills are surfaced — apply a profile, list, or disable a cluster without reinstall
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
Trigger and execute the Antigravity skill: surface.
Load the prompt instructions from skills/surface/SKILL.md and consult the copy-pasteable references or guidelines inside skills/surface/references/ to complete the task.
</objective>

<execution_context>
@skills/surface/SKILL.md
</execution_context>
