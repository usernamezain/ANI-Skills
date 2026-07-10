---
name: skill:inbox
description: Triage and review open GitHub issues and PRs against project templates and contribution guidelines.
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
Trigger and execute the Antigravity skill: inbox.
Load the prompt instructions from skills/inbox/SKILL.md and consult the copy-pasteable references or guidelines inside skills/inbox/references/ to complete the task.
</objective>

<execution_context>
@skills/inbox/SKILL.md
</execution_context>
