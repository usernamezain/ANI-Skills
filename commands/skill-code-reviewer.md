---
name: skill:code-reviewer
description: Reviews source files for bugs, security issues, and code quality problems. Produces structured REVIEW.md with severity-classified findings. Spawned by /antigravity:code-review.
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
Trigger and execute the Antigravity skill: code-reviewer.
Load the prompt instructions from skills/code-reviewer/SKILL.md and consult the copy-pasteable references or guidelines inside skills/code-reviewer/references/ to complete the task.
</objective>

<execution_context>
@skills/code-reviewer/SKILL.md
</execution_context>
