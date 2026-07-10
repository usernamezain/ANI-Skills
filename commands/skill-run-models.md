---
name: skill:run-models
description: Run AI models on Replicate via predictions, webhooks, and streaming.
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
Trigger and execute the Antigravity skill: run-models.
Load the prompt instructions from skills/run-models/SKILL.md and consult the copy-pasteable references or guidelines inside skills/run-models/references/ to complete the task.
</objective>

<execution_context>
@skills/run-models/SKILL.md
</execution_context>
