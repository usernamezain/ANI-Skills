---
name: skill:provider-docs
description: Create, update, and review Terraform provider documentation for Terraform Registry using HashiCorp-recommended patterns, tfplugindocs templates, and schema descriptions. Use when adding or changing provider configuration, resources, data sources, ephemeral resources, list resources, functions, or guides; when validating generated docs; and when troubleshooting missing or incorrect Registry documentation.
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
Trigger and execute the Antigravity skill: provider-docs.
Load the prompt instructions from skills/provider-docs/SKILL.md and consult the copy-pasteable references or guidelines inside skills/provider-docs/references/ to complete the task.
</objective>

<execution_context>
@skills/provider-docs/SKILL.md
</execution_context>
