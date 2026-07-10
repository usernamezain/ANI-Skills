---
name: skill:code-review-and-quality
description: Conducts multi-axis code review. Use before merging any change. Use when reviewing code written by yourself, another agent, or a human. Use when you need to assess code quality across multiple dimensions before it enters the main branch.
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
Trigger and execute the Antigravity skill: code-review-and-quality.
Load the prompt instructions from skills/code-review-and-quality/SKILL.md and consult the copy-pasteable references or guidelines inside skills/code-review-and-quality/references/ to complete the task.
</objective>

<execution_context>
@skills/code-review-and-quality/SKILL.md
</execution_context>
