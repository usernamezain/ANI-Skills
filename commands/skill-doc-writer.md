---
name: skill:doc-writer
description: Writes and updates project documentation. Spawned with a doc_assignment block specifying doc type, mode (create/update/supplement), and project context.
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
Trigger and execute the Antigravity skill: doc-writer.
Load the prompt instructions from skills/doc-writer/SKILL.md and consult the copy-pasteable references or guidelines inside skills/doc-writer/references/ to complete the task.
</objective>

<execution_context>
@skills/doc-writer/SKILL.md
</execution_context>
