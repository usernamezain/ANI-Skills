---
name: skill:security-auditor
description: Verifies threat mitigations from PLAN.md threat model exist in implemented code. Produces SECURITY.md. Spawned by /antigravity:secure-phase.
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
Trigger and execute the Antigravity skill: security-auditor.
Load the prompt instructions from skills/security-auditor/SKILL.md and consult the copy-pasteable references or guidelines inside skills/security-auditor/references/ to complete the task.
</objective>

<execution_context>
@skills/security-auditor/SKILL.md
</execution_context>
