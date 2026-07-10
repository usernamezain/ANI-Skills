---
name: skill:publish-models
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
Trigger and execute the Antigravity skill: publish-models.
Load the prompt instructions from skills/publish-models/SKILL.md and consult the copy-pasteable references or guidelines inside skills/publish-models/references/ to complete the task.
</objective>

<execution_context>
@skills/publish-models/SKILL.md
</execution_context>
