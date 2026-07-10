# Antigravity Agent Skills Library: User Guide

Welcome to the **Antigravity Agent Skills Library**! This package contains a curated library of **314 agent skills** specifically designed for AI coding assistants (such as Claude Code, Google AI Studio, Cursor, Windsurf, Trae, and the Antigravity IDE).

It consists of:
- **42 Frontend Animation & Section Skills**: Complete, copy-pasteable HTML/CSS/JS components driven by **GSAP + ScrollTrigger**, **Lenis**, **anime.js**, and **three.js**.
- **20 Data Structures & Algorithms (DSA) Skills**: Standard templates and complexity analyses in JS/Python for sorting, traversals, binary search variants, dynamic programming, and heaps.
- **231 Core Workflow & ANI Skills**: Metadata instructions guiding agents through planning, execution, debugging, mapping, and evaluation.
- **21 Master \"Boss Prompts\"**: Role-based master prompts to choreograph multiple skills simultaneously.
- **314 Auto-Complete Slash Commands**: Expose all skills directly when typing `/` in Claude Code.

---

## Table of Contents
1. [Installation & Interactive Setup](#1-installation--interactive-setup)
2. [Slash Command Autocomplete (`/`)](#2-slash-command-autocomplete-)
3. [Agent Integration & Configuration](#3-agent-integration--configuration)
   - [Claude Code (CLI)](#claude-code-cli)
   - [Antigravity IDE & Gemini CLI](#antigravity-ide--gemini-cli)
   - [Cursor, Windsurf, and Trae (IDEs)](#cursor-windsurf-and-trae-ides)
4. [Master Boss Prompts (Orchestration)](#4-master-boss-prompts-orchestration)
5. [DSA Algorithmic Skills](#5-dsa-algorithmic-skills)
6. [Maintenance & Package Building](#6-maintenance--package-building)

---

## 1. Installation & Interactive Setup

You can install the library locally or run the installer directly using npm:

```bash
# Run the interactive setup installer
npx ani-skills-library
```

The installer will prompt you with a numbered menu in your terminal:
```
==================================================
        ANTIGRAVITY SKILLS LIBRARY SETUP          
==================================================
Select your target configuration environment:
[1] Configure Claude Code CLI (symlink skills & commands)
[2] Configure Antigravity IDE / Gemini (install global skills)
[3] Generate IDE Rules files (.cursorrules / .clinerules)
[4] Copy all 314 skills and commands locally to current directory
[5] Compile / Update skills search index
[6] Exit
```
Simply enter the number corresponding to your environment (1-6) and the setup will configure directories, junctions, or instructions files automatically!

---

## 2. Slash Command Autocomplete (`/`)

This package is pre-configured as a **Claude Plugin**. When linked to Claude Code, all 314 skills appear when typing the `/` command in the terminal!

- **Command Namespace**: `/skill:[name]` (e.g. `/skill:buttery-smooth-120fps-performance` or `/skill:dsa-sliding-window`)
- **How it works**: Typing the command tells the agent to open the specific `SKILL.md` instruction file and consult its references, instantly loading the correct constraints and examples into the agent's context.

---

## 3. Agent Integration & Configuration

If configuring manually, follow these paths:

### Claude Code (CLI)
Symlink/copy the `./skills/` directory to `~/.claude/skills/` and copy `./commands/` to `~/.claude/commands/`.

### Antigravity IDE & Gemini CLI
Link/copy `./skills/` to `~/.gemini/skills/` globally or to `.agent/skills/` inside your project directory.

### Cursor, Windsurf, and Trae (IDEs)
Run option `[3]` in the installer to write `.cursorrules` and `.clinerules` to your project workspace. This instructs the agent to consult `./skills/` and `./boss-prompts/`.

---

## 4. Master Boss Prompts (Orchestration)

Master prompts located in the [boss-prompts/](../boss-prompts) directory instruct agents to adopt specialized roles and coordinate multiple skills together:

- **`creative-director.md`**: Coordinates `buttery-smooth-120fps-performance`, `hero-cinematic-parallax-section`, `custom-cursor-effects`, and `tilt-hover-pricing-cards-section` for scrollytelling.
- **`performance-auditor.md`**: Combines frame checks, accessibility audits, and device QA.
- **`spec-driven-developer.md`**: Chains spec phase, discuss phase, execute phase, and TDD.
- **`security-warden.md`**: Combines security hardening and code review.
- **`micro-interaction-expert.md`**: Orchestrates custom cursors, magnetic CTAs, and SVG header morphs.

To use them, copy the template block from the boss prompt markdown file and paste it into your agent chat.

---

## 5. DSA Algorithmic Skills

To assist coding agents in solving algorithms, the library includes 20 DSA pattern templates in `skills/` (prefixed with `dsa-`):
- **Includes**: Sliding window, Two pointers, Slow/fast pointers, Merge intervals, Segment trees, Dijkstra's path, Union-Find, Trie, and Backtracking solvers.
- **Each skill contains**: Big-O time and space complexity markers, optimized templates in JS and Python, boundary validation rules, and logic execution steps.

---

## 6. Maintenance & Package Building

### Rebuilding the Skills Index
AI agents scan `skills_index.json` to trigger skills. Run this command whenever you add or modify a skill:
```bash
npm run build:index
```

### Linting and Verifying Skills
Ensure all 314 skills pass frontmatter audits:
```bash
npm run lint:skills
```
This runs the validator script [scripts/verify_library.py](../scripts/verify_library.py).
