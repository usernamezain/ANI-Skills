---
name: skill:using-git-worktrees
description: Use when starting feature work that needs isolation from current workspace or before executing implementation plans - ensures an isolated workspace exists via native tools or git worktree fallback
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
Trigger and execute the Antigravity skill: using-git-worktrees.
Load the prompt instructions from skills/using-git-worktrees/SKILL.md and consult the copy-pasteable references or guidelines inside skills/using-git-worktrees/references/ to complete the task.
</objective>

<execution_context>
@skills/using-git-worktrees/SKILL.md
</execution_context>
