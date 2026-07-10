---
name: skill:import
description: Ingest external plans with conflict detection against project decisions before writing anything.
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
Trigger and execute the Antigravity skill: import.
Load the prompt instructions from skills/import/SKILL.md and consult the copy-pasteable references or guidelines inside skills/import/references/ to complete the task.
</objective>

<execution_context>
@skills/import/SKILL.md
</execution_context>
