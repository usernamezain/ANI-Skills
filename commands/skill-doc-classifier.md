---
name: skill:doc-classifier
description: Classifies a single planning document as ADR, PRD, SPEC, DOC, or UNKNOWN. Extracts title, scope summary, and cross-references. Spawned in parallel by /antigravity:ingest-docs. Writes a JSON classification file and returns a one-line confirmation.
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
Trigger and execute the Antigravity skill: doc-classifier.
Load the prompt instructions from skills/doc-classifier/SKILL.md and consult the copy-pasteable references or guidelines inside skills/doc-classifier/references/ to complete the task.
</objective>

<execution_context>
@skills/doc-classifier/SKILL.md
</execution_context>
