---
name: skill:pr-branch
description: Create a clean PR branch by filtering out .planning/ commits — ready for code review
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
Trigger and execute the Antigravity skill: pr-branch.
Load the prompt instructions from skills/pr-branch/SKILL.md and consult the copy-pasteable references or guidelines inside skills/pr-branch/references/ to complete the task.
</objective>

<execution_context>
@skills/pr-branch/SKILL.md
</execution_context>
