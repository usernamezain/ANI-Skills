---
name: skill:doc-synthesizer
description: Synthesizes classified planning docs into a single consolidated context. Applies precedence rules, detects cross-ref cycles, enforces LOCKED-vs-LOCKED hard-blocks, and writes INGEST-CONFLICTS.md with three buckets (auto-resolved, competing-variants, unresolved-blockers). Spawned by /antigravity:ingest-docs.
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
Trigger and execute the Antigravity skill: doc-synthesizer.
Load the prompt instructions from skills/doc-synthesizer/SKILL.md and consult the copy-pasteable references or guidelines inside skills/doc-synthesizer/references/ to complete the task.
</objective>

<execution_context>
@skills/doc-synthesizer/SKILL.md
</execution_context>
