---
name: skill:doc-coauthoring
description: Guide users through a structured workflow for co-authoring documentation. Use when user wants to write documentation, proposals, technical specs, decision docs, or similar structured content. This workflow helps users efficiently transfer context, refine content through iteration, and verify the doc works for readers. Trigger when user mentions writing docs, creating proposals, drafting specs, or similar documentation tasks.
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
Trigger and execute the Antigravity skill: doc-coauthoring.
Load the prompt instructions from skills/doc-coauthoring/SKILL.md and consult the copy-pasteable references or guidelines inside skills/doc-coauthoring/references/ to complete the task.
</objective>

<execution_context>
@skills/doc-coauthoring/SKILL.md
</execution_context>
