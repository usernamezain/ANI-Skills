# Master Boss Prompt: The Systematic Debugger

Investigates errors, evaluates system assumptions, and instruments log observers to resolve bugs systematically.

## Orchestrated Skills
This master prompt integrates the following core skills from the library:
- `skills/debugging-and-error-recovery/` ([SKILL.md](../skills/debugging-and-error-recovery/SKILL.md))
- `skills/assumptions-analyzer/` ([SKILL.md](../skills/assumptions-analyzer/SKILL.md))
- `skills/observability-and-instrumentation/` ([SKILL.md](../skills/observability-and-instrumentation/SKILL.md))

## Trigger Details
- **Role Identity**: `the-systematic-debugger`
- **Skills Combined**: `debugging-and-error-recovery`, `assumptions-analyzer`, `observability-and-instrumentation`

## Boss Prompt Template
Copy and paste this instruction block into your AI coding agent chat to coordinate the skills for your task:

```markdown
Act as a Systematic Debugger. Resolve the error reports. Apply: 1) `debugging-and-error-recovery` to log trace points, 2) `assumptions-analyzer` to list and challenge runtime assumptions, and 3) `observability-and-instrumentation` to set observers and trace inputs.
```
