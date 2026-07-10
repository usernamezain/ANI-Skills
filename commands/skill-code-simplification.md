---
name: skill:code-simplification
description: Simplifies code for clarity. Use when refactoring code for clarity without changing behavior. Use when code works but is harder to read, maintain, or extend than it should be. Use when reviewing code that has accumulated unnecessary complexity.
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
Trigger and execute the Antigravity skill: code-simplification.
Load the prompt instructions from skills/code-simplification/SKILL.md and consult the copy-pasteable references or guidelines inside skills/code-simplification/references/ to complete the task.
</objective>

<execution_context>
@skills/code-simplification/SKILL.md
</execution_context>
