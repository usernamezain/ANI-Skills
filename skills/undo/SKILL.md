---
name: git:undo
description: "Safe git revert. Roll back phase or plan commits using the phase manifest with dependency checks."
argument-hint: "--last N | --phase NN | --plan NN-MM"
allowed-tools:
  - Read
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
requires: [phase]
---

<objective>
Safe git revert — roll back antigravity phase or plan commits using the phase manifest, with dependency checks and a confirmation gate before execution.

Three modes:
- **--last N**: Show recent antigravity commits for interactive selection
- **--phase NN**: Revert all commits for a phase (manifest + git log fallback)
- **--plan NN-MM**: Revert all commits for a specific plan
</objective>

<execution_context>
@~/.claude/ani-skills/workflows/undo.md
@~/.claude/ani-skills/references/ui-brand.md
@~/.claude/ani-skills/references/gate-prompts.md
</execution_context>

<context>
$ARGUMENTS
</context>

<process>
Execute end-to-end.
</process>

