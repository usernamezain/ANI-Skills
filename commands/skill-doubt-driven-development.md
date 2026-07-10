---
name: skill:doubt-driven-development
description: Subjects every non-trivial decision to a fresh-context adversarial review before it stands. Use when correctness matters more than speed, when working in unfamiliar code, when stakes are high (production, security-sensitive logic, irreversible operations), or any time a confident output would be cheaper to verify now than to debug later.
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
Trigger and execute the Antigravity skill: doubt-driven-development.
Load the prompt instructions from skills/doubt-driven-development/SKILL.md and consult the copy-pasteable references or guidelines inside skills/doubt-driven-development/references/ to complete the task.
</objective>

<execution_context>
@skills/doubt-driven-development/SKILL.md
</execution_context>
