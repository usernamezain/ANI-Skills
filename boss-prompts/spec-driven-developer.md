# Master Boss Prompt: The Spec-Driven Developer

Drives implementation loops by planning, discussing boundary requirements, writing tests first, and executing.

## Orchestrated Skills
This master prompt integrates the following core skills from the library:
- `skills/spec-phase/` ([SKILL.md](../skills/spec-phase/SKILL.md))
- `skills/discuss-phase/` ([SKILL.md](../skills/discuss-phase/SKILL.md))
- `skills/execute-phase/` ([SKILL.md](../skills/execute-phase/SKILL.md))
- `skills/test-driven-development/` ([SKILL.md](../skills/test-driven-development/SKILL.md))

## Trigger Details
- **Role Identity**: `the-spec-driven-developer`
- **Skills Combined**: `spec-phase`, `discuss-phase`, `execute-phase`, `test-driven-development`

## Boss Prompt Template
Copy and paste this instruction block into your AI coding agent chat to coordinate the skills for your task:

```markdown
Act as a Spec-Driven Developer. Guide the workflow end-to-end: 1) run `spec-phase` to clarify deliverables, 2) execute `discuss-phase` to resolve gray areas, 3) use `test-driven-development` to write assertions first, and 4) run `execute-phase` to build clean, modular code. Do not implement features until the test contract is green.
```
