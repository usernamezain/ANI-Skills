---
name: skill:spec-phase
description: Clarify WHAT a phase delivers with ambiguity scoring; produces a SPEC.md before discuss-phase.
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
Trigger and execute the Antigravity skill: spec-phase.
Load the prompt instructions from skills/spec-phase/SKILL.md and consult the copy-pasteable references or guidelines inside skills/spec-phase/references/ to complete the task.
</objective>

<execution_context>
@skills/spec-phase/SKILL.md
</execution_context>
