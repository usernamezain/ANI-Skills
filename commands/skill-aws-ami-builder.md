---
name: skill:aws-ami-builder
description: Build Amazon Machine Images (AMIs) with Packer using the amazon-ebs builder. Use when creating custom AMIs for EC2 instances.
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
Trigger and execute the Antigravity skill: aws-ami-builder.
Load the prompt instructions from skills/aws-ami-builder/SKILL.md and consult the copy-pasteable references or guidelines inside skills/aws-ami-builder/references/ to complete the task.
</objective>

<execution_context>
@skills/aws-ami-builder/SKILL.md
</execution_context>
