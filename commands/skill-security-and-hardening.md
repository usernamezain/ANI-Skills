---
name: skill:security-and-hardening
description: Hardens code against vulnerabilities. Use when handling user input, authentication, data storage, or external integrations. Use when building any feature that accepts untrusted data, manages user sessions, or interacts with third-party services.
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
Trigger and execute the Antigravity skill: security-and-hardening.
Load the prompt instructions from skills/security-and-hardening/SKILL.md and consult the copy-pasteable references or guidelines inside skills/security-and-hardening/references/ to complete the task.
</objective>

<execution_context>
@skills/security-and-hardening/SKILL.md
</execution_context>
