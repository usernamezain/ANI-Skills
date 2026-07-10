---
name: skill:voltagent-docs-bundle
description: Look up VoltAgent documentation embedded in node_modules/@voltagent/core/docs for version-matched docs. Use for API signatures, guides, and examples.
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
Trigger and execute the Antigravity skill: voltagent-docs-bundle.
Load the prompt instructions from skills/voltagent-docs-bundle/SKILL.md and consult the copy-pasteable references or guidelines inside skills/voltagent-docs-bundle/references/ to complete the task.
</objective>

<execution_context>
@skills/voltagent-docs-bundle/SKILL.md
</execution_context>
