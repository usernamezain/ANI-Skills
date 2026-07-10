---
name: skill:mempalace-capture
description: File a phase artifact into MemPalace; mirror decision facts into its temporal KG
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
Trigger and execute the Antigravity skill: mempalace-capture.
Load the prompt instructions from skills/mempalace-capture/SKILL.md and consult the copy-pasteable references or guidelines inside skills/mempalace-capture/references/ to complete the task.
</objective>

<execution_context>
@skills/mempalace-capture/SKILL.md
</execution_context>
