---
name: skill:bdi-mental-states
description: This skill should be used when the user asks to "model agent mental states", "implement BDI architecture", "create belief-desire-intention models", "transform RDF to beliefs", "build cognitive agent", or mentions BDI ontology, mental state modeling, rational agency, or neuro-symbolic AI integration.
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
Trigger and execute the Antigravity skill: bdi-mental-states.
Load the prompt instructions from skills/bdi-mental-states/SKILL.md and consult the copy-pasteable references or guidelines inside skills/bdi-mental-states/references/ to complete the task.
</objective>

<execution_context>
@skills/bdi-mental-states/SKILL.md
</execution_context>
