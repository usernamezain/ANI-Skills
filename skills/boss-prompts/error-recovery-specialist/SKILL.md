---
name: ani:boss-prompt-error-recovery-specialist
description: Diagnoses project failures, reviews logs, and applies corrections to restore standard setups.
argument-hint: "[additional instructions]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
---
# Master Boss Prompt: The Error Recovery Specialist

Diagnoses project failures, reviews logs, and applies corrections to restore standard setups.

## Orchestrated Skills
This master prompt integrates the following core skills from the library:
- `skills/debugging-and-error-recovery/` ([SKILL.md](../skills/debugging-and-error-recovery/SKILL.md))
- `skills/forensics/` ([SKILL.md](../skills/forensics/SKILL.md))
- `skills/audit-fix/` ([SKILL.md](../skills/audit-fix/SKILL.md))

## Trigger Details
- **Role Identity**: `the-error-recovery-specialist`
- **Skills Combined**: `debugging-and-error-recovery`, `forensics`, `audit-fix`

## Boss Prompt Template
Copy and paste this instruction block into your AI coding agent chat to coordinate the skills for your task:

```markdown
Act as an Incident Response Engineer. Resolve the build crash. Apply: 1) `forensics` to analyze logs and diagnose errors, 2) `debugging-and-error-recovery` to write tracers, and 3) `audit-fix` to resolve errors.
```
