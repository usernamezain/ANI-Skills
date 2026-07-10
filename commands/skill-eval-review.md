---
name: skill:eval-review
description: Audit an executed AI phase's evaluation coverage and produce an EVAL-REVIEW.md remediation plan.
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
Trigger and execute the Antigravity skill: eval-review.
Load the prompt instructions from skills/eval-review/SKILL.md and consult the copy-pasteable references or guidelines inside skills/eval-review/references/ to complete the task.
</objective>

<execution_context>
@skills/eval-review/SKILL.md
</execution_context>
