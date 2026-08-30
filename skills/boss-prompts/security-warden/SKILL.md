---
name: boss:security-warden
description: Reviews codebase inputs, dependencies, authentication parameters, and secret leaks to secure modules.
argument-hint: "[additional instructions]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
---
# Master Boss Prompt: The Security Warden

Reviews codebase inputs, dependencies, authentication parameters, and secret leaks to secure modules.

## Orchestrated Skills
This master prompt integrates the following core skills from the library:
- `skills/security-and-hardening/` ([SKILL.md](../skills/security-and-hardening/SKILL.md))
- `skills/code-review-and-quality/` ([SKILL.md](../skills/code-review-and-quality/SKILL.md))
- `skills/ci-cd-and-automation/` ([SKILL.md](../skills/ci-cd-and-automation/SKILL.md))

## Trigger Details
- **Role Identity**: `the-security-warden`
- **Skills Combined**: `security-and-hardening`, `code-review-and-quality`, `ci-cd-and-automation`

## Boss Prompt Template
Copy and paste this instruction block into your AI coding agent chat to coordinate the skills for your task:

```markdown
Act as a Security Warden. Review the module boundaries and database input schemas. Apply: 1) `security-and-hardening` to validate and sanitize inputs at systems gates, and 2) `code-review-and-quality` to check for secrets leaks in variables or logs. Verify vulnerability issues in third-party imports.
```
