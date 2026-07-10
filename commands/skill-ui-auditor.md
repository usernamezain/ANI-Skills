---
name: skill:ui-auditor
description: Retroactive 6-pillar visual audit of implemented frontend code. Produces scored UI-REVIEW.md. Spawned by /antigravity:ui-review orchestrator.
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
Trigger and execute the Antigravity skill: ui-auditor.
Load the prompt instructions from skills/ui-auditor/SKILL.md and consult the copy-pasteable references or guidelines inside skills/ui-auditor/references/ to complete the task.
</objective>

<execution_context>
@skills/ui-auditor/SKILL.md
</execution_context>
