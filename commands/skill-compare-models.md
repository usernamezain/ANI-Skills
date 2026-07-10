---
name: skill:compare-models
description: Compare Replicate models by cost, speed, quality, and capabilities.
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
Trigger and execute the Antigravity skill: compare-models.
Load the prompt instructions from skills/compare-models/SKILL.md and consult the copy-pasteable references or guidelines inside skills/compare-models/references/ to complete the task.
</objective>

<execution_context>
@skills/compare-models/SKILL.md
</execution_context>
