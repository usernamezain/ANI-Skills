---
name: skill:using-superpowers
description: Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions
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
Trigger and execute the Antigravity skill: using-superpowers.
Load the prompt instructions from skills/using-superpowers/SKILL.md and consult the copy-pasteable references or guidelines inside skills/using-superpowers/references/ to complete the task.
</objective>

<execution_context>
@skills/using-superpowers/SKILL.md
</execution_context>
