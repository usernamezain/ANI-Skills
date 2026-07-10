---
name: skill:verification-before-completion
description: Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires running verification commands and confirming output before making any success claims; evidence before assertions always
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
Trigger and execute the Antigravity skill: verification-before-completion.
Load the prompt instructions from skills/verification-before-completion/SKILL.md and consult the copy-pasteable references or guidelines inside skills/verification-before-completion/references/ to complete the task.
</objective>

<execution_context>
@skills/verification-before-completion/SKILL.md
</execution_context>
