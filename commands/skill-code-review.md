---
name: skill:code-review
description: Review source files changed during a phase for bugs, security issues, and code quality problems
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
Trigger and execute the Antigravity skill: code-review.
Load the prompt instructions from skills/code-review/SKILL.md and consult the copy-pasteable references or guidelines inside skills/code-review/references/ to complete the task.
</objective>

<execution_context>
@skills/code-review/SKILL.md
</execution_context>
