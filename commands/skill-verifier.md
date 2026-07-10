---
name: skill:verifier
description: Verifies phase goal achievement through goal-backward analysis. Checks codebase delivers what phase promised, not just that tasks completed. Creates VERIFICATION.md report.
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
Trigger and execute the Antigravity skill: verifier.
Load the prompt instructions from skills/verifier/SKILL.md and consult the copy-pasteable references or guidelines inside skills/verifier/references/ to complete the task.
</objective>

<execution_context>
@skills/verifier/SKILL.md
</execution_context>
