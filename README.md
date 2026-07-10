# `ani-skills` — The Professional AI Agent Skills Library

`ani-skills` is a production-grade, zero-overhead, multi-platform skills library containing **444 professional skills and prompts** across visual layout animations, browser testing automation, planning workflows, database optimizations, and data structures. It is custom-built to extend the capabilities of modern AI coding agents, including the **Antigravity IDE (Gemini CLI), Claude Code, Cursor, Windsurf, Trae, and Cline**.

---

## Table of Contents

1. [Overview & Architecture](#1-overview--architecture)
2. [What are AI Agent Skills?](#2-what-are-ai-agent-skills)
3. [Quick Start & CLI Installer](#3-quick-start--cli-installer)
4. [Multi-Agent Configuration Guides](#4-multi-agent-configuration-guides)
   - [Claude Code Integration](#claude-code-integration)
   - [Antigravity IDE & Gemini CLI Integration](#antigravity-ide--gemini-cli-integration)
   - [Cursor Rules Integration](#cursor-rules-integration)
   - [Windsurf Rules Integration](#windsurf-rules-integration)
   - [Trae Rules Integration](#trae-rules-integration)
   - [Cline / Clinerules Integration](#cline--clinerules-integration)
5. [The 444 Skills Directory Map](#5-the-444-skills-directory-map)
   - [Creative Motion & Frontend Layouts (GSAP, Three.js, Canvas)](#creative-motion--frontend-layouts)
   - [QA, Browser Scraping, & E2E Testing (Playwright, Puppeteer, Selenium)](#qa-browser-scraping--e2e-testing)
   - [System Architecture, Databases, & Infrastructure (ClickHouse, Neon, Supabase)](#system-architecture-databases--infrastructure)
   - [Planning, Workflow, & Safety Abstractions (ANI Workflow, Verification)](#planning-workflow--safety-abstractions)
   - [Data Structures & Algorithms (DSA Complexes)](#data-structures--algorithms-dsa)
6. [Orchestrating Complex Tasks (Boss Prompts)](#6-orchestrating-complex-tasks-boss-prompts)
7. [ANI Coding & Safety Standards](#7-ani-coding--safety-standards)
8. [Troubleshooting & Registry Diagnostics](#8-troubleshooting--registry-diagnostics)

---

## 1. Overview & Architecture

Modern AI coding agents perform tasks by reading context files, applying templates, and executing terminal commands. However, without dedicated guidance, agents frequently reinvent wheels, write sub-optimal algorithms, or struggle with complex frontend math (like scroll-bound curves, custom cursor hover vectors, or WebGL shader buffers).

`ani-skills` addresses this gap by shipping a standardized local directory structure containing validated procedural instructions (`SKILL.md`) and rich source code assets (`references/`). When installed, it hooks directly into your editor's autocomplete menu and prompts system.

### Package Architecture Diagram

```mermaid
graph TD
    A[npm install -g ani-skills] --> B[npx ani-skills]
    B --> C{Choose Option}
    C -->|1| D[Claude Code CLI Symlink]
    C -->|2| E[Antigravity IDE / Gemini TOML Command Setup]
    C -->|3| F[Generate Rules Files: .cursorrules, .windsurfrules, .traerules, .clinerules, .geminirules]
    C -->|4| G[Local Workspace Copy]
    C -->|5| H[Rebuild Index]
    
    subgraph Core Library
        I[skills/ 444 Skills] --> J[SKILL.md Instructions]
        I --> K[references/ Snippets & Templates]
        L[boss-prompts/ 22 Boss Prompts] --> M[Agent Orchestration Rules]
    end
    
    D --> Core Library
    E --> Core Library
    F --> Core Library
    G --> Core Library
```

---

## 2. What are AI Agent Skills?

An **AI Agent Skill** is a self-contained module of instruction and code designed to be consumed by an LLM-based coding assistant. Each skill is located in a dedicated folder under `skills/<skill-name>/` and consists of two main pillars:

### 1. The instruction Contract (`SKILL.md`)
The `SKILL.md` file contains a YAML frontmatter header defining the skill's name and description, followed by step-by-step trigger rules, execution conditions, safety limits, and expected outputs.

*Example structure:*
```markdown
---
name: antigravity:scroll-morph-navbar-section
description: Trigger when the user wants to build a navbar that shrinks, changes color, or morphs on scroll using GSAP ScrollTrigger.
disable-model-invocation: false
---

<objective>
Build a modern glassmorphic navbar that morphs smoothly into a compact pill layout or sticky header upon scrolling down the page.
</objective>

<requirements>
1. Require GSAP and ScrollTrigger CDN scripts in the HTML header.
2. Implement Lenis or smooth scrolling to prevent scroll stuttering.
3. Configure CSS transitions using HSL tailoring to avoid ugly standard colors.
</requirements>
```

### 2. The Reference Assets (`references/`)
Each skill has a `references/` subdirectory containing working sample files (such as fully functional HTML files, CSS systems, or helper scripts). AI agents can pull from these files to quickly paste working code without guessing parameters.

---

## 3. Quick Start & CLI Installer

The easiest way to integrate the skills library is using our global CLI installer.

### Installation

Install the package globally using npm:

```bash
npm install -g ani-skills
```

### Running the Setup CLI

Execute the interactive configuration helper:

```bash
npx ani-skills
```

The CLI will display the main configuration menu:

```text
==================================================
        ANTIGRAVITY SKILLS LIBRARY SETUP          
==================================================
A repository of 444 AI agent skills and prompts.
  
Select your target configuration environment:
[1] Configure Claude Code CLI (symlink skills & commands)
[2] Configure Antigravity IDE / Gemini (install global skills)
[3] Generate IDE Rules files (.cursorrules / .clinerules)
[4] Copy all 444 skills and commands locally to current directory
[5] Compile / Update skills search index
[6] Exit

Enter option (1-6):
```

---

## 4. Multi-Agent Configuration Guides

### Claude Code Integration
Option `[1]` in the installer configures **Claude Code** to natively recognize the skills. 
- **Symlink Setup**: It creates a symlink from the global node modules package folder to your local user home directory under `~/.claude/ani-skills`.
- **Slash Commands**: It registers the custom commands under `~/.claude/commands/`.
- **Triggering**: Once configured, you can type `/` in the Claude Code terminal, and it will list all 444 skills as autocomplete choices (e.g. `/skill-tilt-hover-pricing-cards-section`). Selecting the command loads the corresponding `SKILL.md` and `references/` directly into the agent's context window.

---

### Antigravity IDE & Gemini CLI Integration
Option `[2]` configures the **Antigravity IDE** (powered by the Gemini backend).
- **TOML Command Files**: The installer copies `.toml` metadata files for each skill to your editor configuration path: `~/.gemini/commands/`.
- **Context Injection**: Each TOML config maps a slash command to its relative prompt sequence:
  ```toml
  description = "Trigger to build a buttery-smooth 120fps landing page layout."
  prompt = "Load the skill config from skills/buttery-smooth-120fps-performance/SKILL.md and execute its instructions."
  ```
- **Usage**: Type `/` in the Antigravity chat pane, select the desired capability, and the agent will load the instructions and execute the task.

---

### Cursor Rules Integration
Option `[3]` compiles a custom `.cursorrules` file in your workspace root.
- **Rule Injection**: Cursor parses the `.cursorrules` file to control the behavioral constraints of Cursor Composer and Cursor Chat.
- **Automatic Matching**: The file instructs Cursor's models to scan the `./skills/` folder whenever you type key phrases matching frontend layouts, database engines, or testing frameworks.

---

### Windsurf Rules Integration
Option `[3]` also writes the rules to `.windsurfrules` in the workspace root.
- **Cascade Behavior**: The Windsurf agent uses `.windsurfrules` to shape the behavior of Cascade (both in Write and Chat modes).
- **Tool Constraints**: Instructs Cascade to reference `references/` directories before modifying layout files or generating database tables.

---

### Trae Rules Integration
Option `[3]` generates `.traerules` in the root workspace.
- **AI Copilot Bounds**: The Trae AI copilot reads `.traerules` to maintain compliance with CommonJS formatting guidelines and relative path links, avoiding broken links or local path leakage.

---

### Cline / Clinerules Integration
Option `[3]` writes the configuration to `.clinerules` in the root directory.
- **Custom Tool constraints**: Dictates Cline's directory discovery loop, guiding it to look for `SKILL.md` files in subfolders.

---

## 5. The 444 Skills Directory Map

The library is organized into five functional pillars. Below is a detailed mapping of the key skills in each directory category:

### Creative Motion & Frontend Layouts
These skills provide the step-by-step physics, math formulas, and layout setups for high-contrast, premium, responsive layouts.
- **`buttery-smooth-120fps-performance`**: Best practices for setting up hardware-accelerated animations, avoiding repaint layout thrashing, and configuring requestAnimationFrame loops.
- **`magnetic-cta-section`**: Calculations to pull page elements towards the user's mouse cursor dynamically based on vector distances.
- **`scroll-morph-navbar-section`**: GSAP ScrollTrigger configs to shrink, highlight, or collapse menus on page scroll.
- **`morphing-hamburger-icon`**: Canvas or CSS transitions to transform menu bars into closing symbols or custom shapes.
- **`tilt-hover-pricing-cards-section`**: Vanilla CSS 3D perspective transforms that react to hover angles.
- **`threejs-interactive-backgrounds`**: Fluid particles, noise shaders, and interactive WebGL canvases.
- **`marquee-logo-cloud-section`**: Continuous, infinitely looping horizontal ticker rails.
- **`mask-reveal-footer-section`**: Footer transitions that slide out from behind the viewport.
- **`image-cursor-trail`**: Physics formulas to drop delayed fading image arrays behind the mouse.
- **`top-down-curtain-menu`**: Full-screen slide-down layout navigations with cascading item staggered entries.

---

### QA, Browser Scraping, & E2E Testing
Testing configurations, scrapers, and browser controller modules that bypass cloud protections and run reliably.
- **`playwright-skill`**: Standard E2E setups, parallel test runners, and dynamic page state captures.
- **`puppeteer-skill`**: Scripting headless web browsers for high-performance scraping, dynamic DOM extraction, and page load waits.
- **`selenium-skill`**: Legacy cross-browser automation, grid setups, and element click configurations.
- **`cypress-skill`**: Testing applications inside sandboxed frames, with mock API stubs.
- **`webdriverio-skill`**: Node-based automation systems targeting mobile frameworks.
- **`browser-testing-with-devtools`**: Bypassing detection layers, overriding screen dimensions, and injecting custom cookies.
- **`smartui-skill`**: Running visual regression tests, matching layout pixel diffs on Cloud grids.

---

### System Architecture, Databases, & Infrastructure
Optimized queries, schemas, and adapter setups for high-throughput databases and platforms.
- **`clickhouse-best-practices`**: Columnar database configurations, index optimization keys, and partition strategies.
- **`clickhousectl-local-dev`**: Launching ClickHouse containers, mounting volumes, and checking memory limits.
- **`chdb-datastore`**: Embedded ClickHouse in-memory systems for fast analytical computations.
- **`neon-postgres`**: Postgres setups configured to connect with the Neon Serverless driver.
- **`neon-postgres-branches`**: Using Neon branching APIs to spin up temporary test databases during CI/CD steps.
- **`neon-ai-gateway`**: Routing vector search operations through Neon vector extensions.
- **`supabase` / `supabase-postgres-best-practices`**: Schema triggers, Row-Level Security (RLS) policies, and database connection pools.
- **`better-auth-best-practices`**: Safe credential setups, 2FA workflows, and session token storage.
- **`tinybird-best-practices`**: Real-time analytical APIs, pipeline SQL architectures, and ingestion endpoints.

---

### Planning, Workflow, & Safety Abstractions
The planning engine files that govern the agent's workflow cycle, ensuring it follows the **Plan-Execute-Verify** sequence.
- **`plan-phase`**: Synthesizes the project design criteria into a structured `implementation_plan.md` before making code changes.
- **`verify-work`**: Conducts unit testing, compiler sweeps, and visual verification walkthroughs.
- **`spec-phase`**: Identifies project ambiguities and scores implementation paths.
- **`ui-phase`**: Establishes design systems and styling guidelines using unified tokens.
- **`systematic-debugging`**: Persistent debugging processes for tracking variables across compiler crashes.
- **`observability-and-instrumentation`**: Telemetry log loops, performance trackers, and tracing integrations.

---

### Data Structures & Algorithms (DSA)
Validated structures in JS/Python for resolving algorithmic complexity tests.
- **`dsa-sliding-window`**: Optimizing array subarrays and substring calculations from $O(n^2)$ to $O(n)$.
- **`dsa-binary-search`**: Search routines on sorted ranges and rotated fields.
- **`dsa-dynamic-programming`**: Memoization and tabulation methods for resolving optimization formulas.
- **`dsa-graph-algorithms`**: BFS, DFS, Dijkstra, and topological sort algorithms for routing models.

---

## 6. Orchestrating Complex Tasks (Boss Prompts)

**Boss Prompts** are high-level role-based directives located in `boss-prompts/`. They orchestrate multiple skills together to guide agents through complex workflows. Recommended Boss Prompts include:

- **`creative-director.md`**: Directs the agent to adopt a high-end designer perspective. It triggers visual animation skills (`buttery-smooth-120fps-performance`, `gsap-scrolltrigger-effects`, `custom-cursor-effects`) to construct high-fidelity interactive showcases.
- **`web-scraper-and-tester.md`**: Directs the agent to act as a QA automation engineer, combining browser skills (`puppeteer-skill`, `playwright-skill`, `cypress-skill`) to scrap dynamic content or perform visual regression tests.
- **`llm-eval-judge.md`**: Guides the agent to construct assessment pipelines, evaluating model outputs against specialized rubrics while avoiding bias.
- **`performance-auditor.md`**: Leads the agent to run speed audits, profile SQL query performance, and trace memory leaks.

---

## 7. ANI Coding & Safety Standards

When modifying any core files inside the installer, skills, or rules configurations, agents must comply with these safety and architectural constraints:

1.  **CommonJS Requirements**: Use CommonJS (`const fs = require('fs')`) for all Node scripts. Never use ES Modules (`import/export`) unless explicitly authorized in package files.
2.  **No Core External Dependencies**: Keep scripts dependent only on standard Node.js APIs to ensure fast `npx` load times.
3.  **Command Safety**: Avoid string concatenations in terminal execution to prevent command injection. Use array arguments with `execFileSync` instead of `execSync` where possible.
4.  **Relative Link Integrity**: Maintain relative URLs (`../skills/`) in all public-facing files to prevent leaking local paths or breaking links on external user setups.

---

## 8. Troubleshooting & Registry Diagnostics

### Resolving E404 / E401 NPM Publish Errors
If you run `npm publish` and encounter:
```text
npm error code E404
npm error 404 Not Found - PUT https://registry.npmjs.org/ani-skills - Not found
```
This is the NPM registry's security response when a user is **not logged in** or **lacks write permissions** for a package name. Follow these steps to resolve:

1.  **Verify NPM Login Status**:
    Run `npm whoami` in your terminal. If it returns an error or is empty, you need to authenticate.
2.  **Authenticate**:
    Run `npm login` in your terminal. Complete the browser-based login and 2FA prompts.
3.  **Check Name Availability**:
    If you are logged in and still get a 404, check if the package name is taken by searching for it on npmjs.com. If it is already registered by another account, you must select a unique package name in `package.json`.
4.  **Publish**:
    Once logged in and verified, publish the package:
    ```bash
    npm publish
    ```

### Diagnostics Checks
You can run automated diagnostics to verify the health of the skills library at any time:
- Run YAML verification: `npm run lint:skills`
- Compile / refresh search index: `npm run build:index`
