---
name: antigravity:onboard
description: "Guide existing codebase onboarding through mapping, doc ingest, and planning setup"
argument-hint: "[--fast] [--text]"
allowed-tools:
  - Read
  - Bash
  - Write
  - Glob
  - Grep
  - Agent
  - AskUserQuestion
---

<runtime_note>
**Copilot (VS Code):** Use `vscode_askquestions` wherever this workflow calls `AskUserQuestion`. They are equivalent — `vscode_askquestions` is the VS Code Copilot implementation of the same interactive question API.
</runtime_note>

<objective>
Guide brownfield onboarding for an existing codebase by routing through the existing ANI primitives in the safe order: codebase map → docs ingest → project initialization → onboarding summary.

**Creates or confirms:**
- `.planning/codebase/` — evidence-backed codebase map from `/ani-map-codebase`
- `.planning/PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md` — project setup from `/ani-new-project` or `/ani-ingest-docs`
- `.planning/onboarding/SUMMARY.md` — lightweight index of what was learned and the next command

**Non-goals:** This command does not execute phases, ship work, or overwrite existing planning artifacts without an explicit gate.
</objective>

<execution_context>
@~/.claude/ani-core/workflows/onboard.md
@~/.claude/ani-core/references/ui-brand.md
@~/.claude/ani-core/references/gate-prompts.md
</execution_context>

<context>
Arguments: $ARGUMENTS

Flags:
- `--fast` — prefer `/ani-map-codebase --fast` for the mapping handoff; the complete map is still required before `/ani-new-project`.
- `--text` — use plain-text numbered lists instead of TUI menus.
</context>

<process>
Execute the onboard workflow end-to-end. Preserve all safety gates, text-mode fallbacks, idempotency checks, and top-level handoff rules for nested interactive commands.
</process>
