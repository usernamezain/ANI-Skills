---
name: skill:review
description: Request cross-AI peer review of phase plans from external AI CLIs
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
Trigger and execute the Antigravity skill: review.
Load the prompt instructions from skills/review/SKILL.md and consult the copy-pasteable references or guidelines inside skills/review/references/ to complete the task.
</objective>

<execution_context>
@skills/review/SKILL.md
</execution_context>
