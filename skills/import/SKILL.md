---
name: ani:import
description: Ingest external plans with conflict detection against project decisions before writing anything.
argument-hint: "--from <filepath> | --from-gsd2"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
  - Agent
---

<objective>
Import external plan files into the antigravity planning system with conflict detection against PROJECT.md decisions.

- **--from**: Import an external plan file, detect conflicts, write as antigravity PLAN.md, validate via plan-checker.
- **--from-gsd2**: Reverse-migrate a 2 project (`.antigravity/` directory) back to antigravity v1 (`.planning/`) format. Runs `tools.cjs from-gsd2`. Pass `--path <dir>` to migrate a project at a different path.
</objective>

<execution_context>
@~/.claude/ani-skills/workflows/import.md
@~/.claude/ani-skills/references/ui-brand.md
@~/.claude/ani-skills/references/gate-prompts.md
@~/.claude/ani-skills/references/doc-conflict-engine.md
</execution_context>

<context>
$ARGUMENTS
</context>

<process>
If `--from-gsd2` is in $ARGUMENTS:
Run: `node "$HOME/.claude/ani-skills/bin/tools.cjs" from-gsd2`
Pass `--path <dir>` if provided. Present the migration result to the user.
Stop here (do not run the standard import workflow).

Otherwise, execute the import workflow end-to-end.
</process>

