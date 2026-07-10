---
name: skill:plan-review-convergence
description: Cross-AI plan convergence loop — replan with review feedback until no HIGH concerns remain.
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
Trigger and execute the Antigravity skill: plan-review-convergence.
Load the prompt instructions from skills/plan-review-convergence/SKILL.md and consult the copy-pasteable references or guidelines inside skills/plan-review-convergence/references/ to complete the task.
</objective>

<execution_context>
@skills/plan-review-convergence/SKILL.md
</execution_context>
