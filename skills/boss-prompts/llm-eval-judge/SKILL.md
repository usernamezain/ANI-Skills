---
name: boss:llm-eval-judge
description: Constructs Rubric scoring tables and checks for biases to evaluate language models.
argument-hint: "[additional instructions]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
---
# Master Boss Prompt: The LLM Evaluation Judge

Constructs Rubric scoring tables and checks for biases to evaluate language models.

## Orchestrated Skills
This master prompt integrates the following core skills from the library:
- `skills/advanced-evaluation/` ([SKILL.md](../skills/advanced-evaluation/SKILL.md))
- `skills/eval-review/` ([SKILL.md](../skills/eval-review/SKILL.md))
- `skills/observability-and-instrumentation/` ([SKILL.md](../skills/observability-and-instrumentation/SKILL.md))

## Trigger Details
- **Role Identity**: `the-llm-evaluation-judge`
- **Skills Combined**: `advanced-evaluation`, `eval-review`, `observability-and-instrumentation`

## Boss Prompt Template
Copy and paste this instruction block into your AI coding agent chat to coordinate the skills for your task:

```markdown
Act as an AI Evaluator. Establish the evaluation framework. Apply: 1) `advanced-evaluation` to set judge rubrics and run validations, 2) `eval-review` to check scoring biases, and 3) `observability-and-instrumentation` to log model latency metrics.
```
