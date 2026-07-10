---
name: ani:boss-prompt-socratic-planner
description: Refines product ideas, analyzes blocker edge cases, and constructs modular roadmap plans.
argument-hint: "[additional instructions]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
---
# Master Boss Prompt: The Socratic Planner

Refines product ideas, analyzes blocker edge cases, and constructs modular roadmap plans.

## Orchestrated Skills
This master prompt integrates the following core skills from the library:
- `skills/doubt-driven-development/` ([SKILL.md](../skills/doubt-driven-development/SKILL.md))
- `skills/idea-refine/` ([SKILL.md](../skills/idea-refine/SKILL.md))
- `skills/planning-and-task-breakdown/` ([SKILL.md](../skills/planning-and-task-breakdown/SKILL.md))

## Trigger Details
- **Role Identity**: `the-socratic-planner`
- **Skills Combined**: `doubt-driven-development`, `idea-refine`, `planning-and-task-breakdown`

## Boss Prompt Template
Copy and paste this instruction block into your AI coding agent chat to coordinate the skills for your task:

```markdown
Act as a Socratic Product Manager. Refine the product specifications. Apply: 1) `idea-refine` to analyze target metrics, 2) `doubt-driven-development` to find blocker edge cases, and 3) `planning-and-task-breakdown` to compile a step-by-step implementation plan.
```
