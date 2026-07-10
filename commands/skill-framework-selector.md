---
name: skill:framework-selector
description: Presents an interactive decision matrix to surface the right AI/LLM framework for the user's specific use case. Produces a scored recommendation with rationale. Spawned by /antigravity:ai-integration-phase and /select-framework orchestrators.
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
Trigger and execute the Antigravity skill: framework-selector.
Load the prompt instructions from skills/framework-selector/SKILL.md and consult the copy-pasteable references or guidelines inside skills/framework-selector/references/ to complete the task.
</objective>

<execution_context>
@skills/framework-selector/SKILL.md
</execution_context>
