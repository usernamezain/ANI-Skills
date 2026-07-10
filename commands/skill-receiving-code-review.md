---
name: skill:receiving-code-review
description: Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable - requires technical rigor and verification, not performative agreement or blind implementation
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
Trigger and execute the Antigravity skill: receiving-code-review.
Load the prompt instructions from skills/receiving-code-review/SKILL.md and consult the copy-pasteable references or guidelines inside skills/receiving-code-review/references/ to complete the task.
</objective>

<execution_context>
@skills/receiving-code-review/SKILL.md
</execution_context>
