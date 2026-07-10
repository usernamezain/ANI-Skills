---
name: skill:domain-researcher
description: Researches the business domain and real-world application context of the AI system being built. Surfaces domain expert evaluation criteria, industry-specific failure modes, regulatory context, and what "good" looks like for practitioners in this field — before the eval-planner turns it into measurable rubrics. Spawned by /antigravity:ai-integration-phase orchestrator.
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
Trigger and execute the Antigravity skill: domain-researcher.
Load the prompt instructions from skills/domain-researcher/SKILL.md and consult the copy-pasteable references or guidelines inside skills/domain-researcher/references/ to complete the task.
</objective>

<execution_context>
@skills/domain-researcher/SKILL.md
</execution_context>
