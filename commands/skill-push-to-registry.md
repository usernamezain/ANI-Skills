---
name: skill:push-to-registry
description: Push Packer build metadata to HCP Packer registry for tracking and managing image lifecycle. Use when integrating Packer builds with HCP Packer for version control and governance.
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
Trigger and execute the Antigravity skill: push-to-registry.
Load the prompt instructions from skills/push-to-registry/SKILL.md and consult the copy-pasteable references or guidelines inside skills/push-to-registry/references/ to complete the task.
</objective>

<execution_context>
@skills/push-to-registry/SKILL.md
</execution_context>
