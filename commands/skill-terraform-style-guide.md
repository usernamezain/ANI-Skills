---
name: skill:terraform-style-guide
description: Generate Terraform HCL code following HashiCorp's official style conventions and best practices. Use when writing, reviewing, or generating Terraform configurations.
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
Trigger and execute the Antigravity skill: terraform-style-guide.
Load the prompt instructions from skills/terraform-style-guide/SKILL.md and consult the copy-pasteable references or guidelines inside skills/terraform-style-guide/references/ to complete the task.
</objective>

<execution_context>
@skills/terraform-style-guide/SKILL.md
</execution_context>
