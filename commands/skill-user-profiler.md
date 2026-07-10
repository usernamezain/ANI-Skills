---
name: skill:user-profiler
description: Analyzes extracted session messages across 8 behavioral dimensions to produce a scored developer profile with confidence levels and evidence. Spawned by profile orchestration workflows.
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
Trigger and execute the Antigravity skill: user-profiler.
Load the prompt instructions from skills/user-profiler/SKILL.md and consult the copy-pasteable references or guidelines inside skills/user-profiler/references/ to complete the task.
</objective>

<execution_context>
@skills/user-profiler/SKILL.md
</execution_context>
