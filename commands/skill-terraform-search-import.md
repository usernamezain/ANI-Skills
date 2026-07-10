---
name: skill:terraform-search-import
description: Discover existing cloud resources using Terraform Search queries and bulk import them into Terraform management. Use when bringing unmanaged infrastructure under Terraform control, auditing cloud resources, or migrating to IaC.
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
Trigger and execute the Antigravity skill: terraform-search-import.
Load the prompt instructions from skills/terraform-search-import/SKILL.md and consult the copy-pasteable references or guidelines inside skills/terraform-search-import/references/ to complete the task.
</objective>

<execution_context>
@skills/terraform-search-import/SKILL.md
</execution_context>
