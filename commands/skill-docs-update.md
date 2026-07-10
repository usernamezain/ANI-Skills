---
name: skill:docs-update
description: Generate or update project documentation verified against the codebase
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
Trigger and execute the Antigravity skill: docs-update.
Load the prompt instructions from skills/docs-update/SKILL.md and consult the copy-pasteable references or guidelines inside skills/docs-update/references/ to complete the task.
</objective>

<execution_context>
@skills/docs-update/SKILL.md
</execution_context>
