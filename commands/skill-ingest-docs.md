---
name: skill:ingest-docs
description: Bootstrap or merge a .planning/ setup from existing ADRs, PRDs, SPECs, and docs in a repo.
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
Trigger and execute the Antigravity skill: ingest-docs.
Load the prompt instructions from skills/ingest-docs/SKILL.md and consult the copy-pasteable references or guidelines inside skills/ingest-docs/references/ to complete the task.
</objective>

<execution_context>
@skills/ingest-docs/SKILL.md
</execution_context>
