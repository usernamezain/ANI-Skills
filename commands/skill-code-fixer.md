---
name: skill:code-fixer
description: Applies fixes to code review findings from REVIEW.md. Reads source files, applies intelligent fixes, and commits each fix atomically. Spawned by /antigravity:code-review --fix.
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
Trigger and execute the Antigravity skill: code-fixer.
Load the prompt instructions from skills/code-fixer/SKILL.md and consult the copy-pasteable references or guidelines inside skills/code-fixer/references/ to complete the task.
</objective>

<execution_context>
@skills/code-fixer/SKILL.md
</execution_context>
