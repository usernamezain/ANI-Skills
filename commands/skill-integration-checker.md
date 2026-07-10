---
name: skill:integration-checker
description: Verifies cross-phase integration and E2E flows. Checks that phases connect properly and user workflows complete end-to-end.
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
Trigger and execute the Antigravity skill: integration-checker.
Load the prompt instructions from skills/integration-checker/SKILL.md and consult the copy-pasteable references or guidelines inside skills/integration-checker/references/ to complete the task.
</objective>

<execution_context>
@skills/integration-checker/SKILL.md
</execution_context>
