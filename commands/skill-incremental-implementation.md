---
name: skill:incremental-implementation
description: Delivers changes incrementally. Use when implementing any feature or change that touches more than one file. Use when you're about to write a large amount of code at once, or when a task feels too big to land in one step.
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
Trigger and execute the Antigravity skill: incremental-implementation.
Load the prompt instructions from skills/incremental-implementation/SKILL.md and consult the copy-pasteable references or guidelines inside skills/incremental-implementation/references/ to complete the task.
</objective>

<execution_context>
@skills/incremental-implementation/SKILL.md
</execution_context>
