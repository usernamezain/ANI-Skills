---
name: skill:slack-gif-creator
description: Knowledge and utilities for creating animated GIFs optimized for Slack. Provides constraints, validation tools, and animation concepts. Use when users request animated GIFs for Slack like "make me a GIF of X doing Y for Slack."
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
Trigger and execute the Antigravity skill: slack-gif-creator.
Load the prompt instructions from skills/slack-gif-creator/SKILL.md and consult the copy-pasteable references or guidelines inside skills/slack-gif-creator/references/ to complete the task.
</objective>

<execution_context>
@skills/slack-gif-creator/SKILL.md
</execution_context>
