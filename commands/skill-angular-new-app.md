---
name: skill:angular-new-app
description: Creates a new Angular app using the Angular CLI. This skill should be used whenever a user wants to create a new Angular application and contains important guidelines for how to effectively create a modern Angular application.
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
Trigger and execute the Antigravity skill: angular-new-app.
Load the prompt instructions from skills/angular-new-app/SKILL.md and consult the copy-pasteable references or guidelines inside skills/angular-new-app/references/ to complete the task.
</objective>

<execution_context>
@skills/angular-new-app/SKILL.md
</execution_context>
