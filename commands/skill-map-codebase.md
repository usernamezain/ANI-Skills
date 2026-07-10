---
name: skill:map-codebase
description: Analyze codebase with parallel mapper agents to produce .planning/codebase/ documents
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
Trigger and execute the Antigravity skill: map-codebase.
Load the prompt instructions from skills/map-codebase/SKILL.md and consult the copy-pasteable references or guidelines inside skills/map-codebase/references/ to complete the task.
</objective>

<execution_context>
@skills/map-codebase/SKILL.md
</execution_context>
