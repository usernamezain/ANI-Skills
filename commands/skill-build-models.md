---
name: skill:build-models
description: >
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
Trigger and execute the Antigravity skill: build-models.
Load the prompt instructions from skills/build-models/SKILL.md and consult the copy-pasteable references or guidelines inside skills/build-models/references/ to complete the task.
</objective>

<execution_context>
@skills/build-models/SKILL.md
</execution_context>
