---
name: skill:requesting-code-review
description: Use when completing tasks, implementing major features, or before merging to verify work meets requirements
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
Trigger and execute the Antigravity skill: requesting-code-review.
Load the prompt instructions from skills/requesting-code-review/SKILL.md and consult the copy-pasteable references or guidelines inside skills/requesting-code-review/references/ to complete the task.
</objective>

<execution_context>
@skills/requesting-code-review/SKILL.md
</execution_context>
