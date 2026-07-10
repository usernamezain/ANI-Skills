---
name: skill:roadmapper
description: Creates project roadmaps with phase breakdown, requirement mapping, success criteria derivation, and coverage validation. Spawned by /antigravity:new-project orchestrator.
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
Trigger and execute the Antigravity skill: roadmapper.
Load the prompt instructions from skills/roadmapper/SKILL.md and consult the copy-pasteable references or guidelines inside skills/roadmapper/references/ to complete the task.
</objective>

<execution_context>
@skills/roadmapper/SKILL.md
</execution_context>
