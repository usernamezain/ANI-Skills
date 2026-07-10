---
name: skill:phase-researcher
description: Researches how to implement a phase before planning. Produces RESEARCH.md consumed by planner. Spawned by /antigravity:plan-phase orchestrator.
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
Trigger and execute the Antigravity skill: phase-researcher.
Load the prompt instructions from skills/phase-researcher/SKILL.md and consult the copy-pasteable references or guidelines inside skills/phase-researcher/references/ to complete the task.
</objective>

<execution_context>
@skills/phase-researcher/SKILL.md
</execution_context>
