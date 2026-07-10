---
name: skill:ui-checker
description: Validates UI-SPEC.md design contracts against 6 quality dimensions. Produces BLOCK/FLAG/PASS verdicts. Spawned by /antigravity:ui-phase orchestrator.
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
Trigger and execute the Antigravity skill: ui-checker.
Load the prompt instructions from skills/ui-checker/SKILL.md and consult the copy-pasteable references or guidelines inside skills/ui-checker/references/ to complete the task.
</objective>

<execution_context>
@skills/ui-checker/SKILL.md
</execution_context>
