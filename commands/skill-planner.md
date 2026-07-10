---
name: skill:planner
description: Creates executable phase plans with task breakdown, dependency analysis, and goal-backward verification. Spawned by /antigravity:plan-phase orchestrator.
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
Trigger and execute the Antigravity skill: planner.
Load the prompt instructions from skills/planner/SKILL.md and consult the copy-pasteable references or guidelines inside skills/planner/references/ to complete the task.
</objective>

<execution_context>
@skills/planner/SKILL.md
</execution_context>
