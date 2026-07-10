---
name: skill:milestone-summary
description: Generate a comprehensive project summary from milestone artifacts for team onboarding and review
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
Trigger and execute the Antigravity skill: milestone-summary.
Load the prompt instructions from skills/milestone-summary/SKILL.md and consult the copy-pasteable references or guidelines inside skills/milestone-summary/references/ to complete the task.
</objective>

<execution_context>
@skills/milestone-summary/SKILL.md
</execution_context>
