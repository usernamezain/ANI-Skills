---
name: skill:thread
description: Manage persistent context threads for cross-session work
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
Trigger and execute the Antigravity skill: thread.
Load the prompt instructions from skills/thread/SKILL.md and consult the copy-pasteable references or guidelines inside skills/thread/references/ to complete the task.
</objective>

<execution_context>
@skills/thread/SKILL.md
</execution_context>
