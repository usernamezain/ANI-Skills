---
name: skill:eval-auditor
description: Retroactive audit of an implemented AI phase's evaluation coverage. Checks implementation against the AI-SPEC.md evaluation plan. Scores each eval dimension as COVERED/PARTIAL/MISSING. Produces a scored EVAL-REVIEW.md with findings, gaps, and remediation guidance. Spawned by /antigravity:eval-review orchestrator.
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
Trigger and execute the Antigravity skill: eval-auditor.
Load the prompt instructions from skills/eval-auditor/SKILL.md and consult the copy-pasteable references or guidelines inside skills/eval-auditor/references/ to complete the task.
</objective>

<execution_context>
@skills/eval-auditor/SKILL.md
</execution_context>
