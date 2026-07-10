---
name: skill:doc-verifier
description: Verifies factual claims in generated docs against the live codebase. Returns structured JSON per doc.
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
Trigger and execute the Antigravity skill: doc-verifier.
Load the prompt instructions from skills/doc-verifier/SKILL.md and consult the copy-pasteable references or guidelines inside skills/doc-verifier/references/ to complete the task.
</objective>

<execution_context>
@skills/doc-verifier/SKILL.md
</execution_context>
