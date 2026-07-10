---
name: skill:review-backlog
description: Review and promote backlog items to active milestone
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
Trigger and execute the Antigravity skill: review-backlog.
Load the prompt instructions from skills/review-backlog/SKILL.md and consult the copy-pasteable references or guidelines inside skills/review-backlog/references/ to complete the task.
</objective>

<execution_context>
@skills/review-backlog/SKILL.md
</execution_context>
