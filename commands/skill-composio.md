---
name: skill:composio
description: Use 1000+ external apps via Composio - either directly through the CLI or by building AI agents and apps with the SDK
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
Trigger and execute the Antigravity skill: composio.
Load the prompt instructions from skills/composio/SKILL.md and consult the copy-pasteable references or guidelines inside skills/composio/references/ to complete the task.
</objective>

<execution_context>
@skills/composio/SKILL.md
</execution_context>
