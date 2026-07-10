---
name: skill:ai-researcher
description: Researches a chosen AI framework's official docs to produce implementation-ready guidance — best practices, syntax, core patterns, and pitfalls distilled for the specific use case. Writes the Framework Quick Reference and Implementation Guidance sections of AI-SPEC.md. Spawned by /antigravity:ai-integration-phase orchestrator.
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
Trigger and execute the Antigravity skill: ai-researcher.
Load the prompt instructions from skills/ai-researcher/SKILL.md and consult the copy-pasteable references or guidelines inside skills/ai-researcher/references/ to complete the task.
</objective>

<execution_context>
@skills/ai-researcher/SKILL.md
</execution_context>
