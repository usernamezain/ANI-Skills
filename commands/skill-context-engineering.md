---
name: skill:context-engineering
description: Optimizes agent context setup. Use when starting a new session, when agent output quality degrades, when switching between tasks, or when you need to configure rules files and context for a project.
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
Trigger and execute the Antigravity skill: context-engineering.
Load the prompt instructions from skills/context-engineering/SKILL.md and consult the copy-pasteable references or guidelines inside skills/context-engineering/references/ to complete the task.
</objective>

<execution_context>
@skills/context-engineering/SKILL.md
</execution_context>
