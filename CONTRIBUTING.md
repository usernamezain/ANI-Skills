# Contributing to `ani-skills` 🚀

Welcome to the **ANI-Skills Ultra Package**! We are thrilled you want to contribute to the world's most comprehensive open-source AI Agent Skills library.

Whether you're adding a new production skill, submitting a GitHub repository for batch ingestion, crafting a new Executive Boss prompt, or refining documentation, your contributions help thousands of developers supercharge their AI coding assistants (**Antigravity, Claude Code, Cursor, Windsurf, Copilot, Codex, Gemini CLI, OpenCode**).

---

## 🌟 What Contributions We Love Most

We prioritize high-leverage, well-crafted contributions that give AI agents deterministic superpowers:

1. **✨ Creative UI & Motion Skills (`ui:`)**
   - GSAP 3.x ScrollTrigger pinning, scrubbing, and timeline choreography
   - Three.js, WebGPU, GLSL/TSL shaders, and particle physics
   - High-contrast, monochromatic, minimalist responsive layouts
   - Custom inertial cursors, slat reveals, and morphing navigations

2. **🗄️ Database & Cloud Infrastructure (`db:`, `cloud:`)**
   - Serverless database architectures (**Neon Postgres, Supabase, ClickHouse, DuckDB, Qdrant, Redis**)
   - Infrastructure as Code (**Terraform Stacks, Cloudflare Workers, Azure Verified Modules, AWS**)
   - Zero-downtime canary deployment pipelines and n8n automations

3. **👑 Executive Boss Prompts & Starter Packs (`boss:`)**
   - End-to-end multi-agent orchestration personas (e.g. Founder Mode, CSO, VP Eng, Staff Debugger)
   - Domain-specific starter packs (SaaS, Chrome Extensions, Electron Desktop, Headless E-Commerce) with built-in reference repository learning and interactive discovery questionnaires

4. **🤖 AI & Autonomous Frameworks (`ai:`, `agent:`)**
   - VoltAgent, OpenAI, Google Gemini, Hugging Face, Fal.ai, Venice.ai, Composio toolkits
   - Multi-agent swarm protocols and Model Context Protocol (MCP) servers

5. **📦 New GitHub Repositories for Batch Ingestion**
   - Propose high-value open-source skill repositories or gists by adding them to `skill-word.md` or opening an issue.

6. **🛡️ Security, Testing & Hardening (`security:`, `test:`, `quality:`)**
   - Trail of Bits AST scanning, OWASP zero-trust audits, prompt injection defenses
   - Playwright, Cypress, Vitest, and BDD test automation suites

---

## 🛠️ Step-by-Step GitHub Contribution Workflow

### 1. Fork the Repository
Click the **Fork** button at the top right of [`github.com/usernamezain/ANI-Skills`](https://github.com/usernamezain/ANI-Skills) to create your own copy.

### 2. Clone Your Fork Locally
```bash
git clone https://github.com/YOUR_USERNAME/ANI-Skills.git
cd ANI-Skills
```

### 3. Create a Descriptive Feature Branch
```bash
git checkout -b feat/skill-my-new-skill
# or
git checkout -b feat/boss-new-starter-pack
# or
git checkout -b fix/installer-path-resolution
```

### 4. Authoring a New Skill (`skills/<folder-name>/`)
Every skill must reside in its own folder inside `skills/` and contain:
- `SKILL.md` — The YAML frontmatter contract and step-by-step agent instructions.
- `references/` — Copy-pasteable, verified, runnable code examples and templates.

#### `SKILL.md` Template Structure:
```markdown
---
name: <namespace>:<skill-slug>
description: Precise trigger criteria and concise summary of what this skill delivers.
---

# Skill Title

## Overview
Brief explanation of what the skill solves and architectural principles.

## When to Use / What to Use
- **When to Use**: Specific triggers, user queries, and design patterns.
- **What to Use**: Recommended frameworks, CDNs, packages, or API endpoints.

## Implementation Guidelines
1. Step-by-step procedural execution instructions.
2. Safety limits and dependency rules.
3. Code patterns with clear error handling.

## Example Usage
\`\`\`javascript
// Clean, working reference code
\`\`\`
```

### 5. Rebuild Indexes and Verify Stats
After creating or modifying skills, run our automated build scripts to synchronize the master index and slash commands:

```bash
# Rebuild the master index (skills_index.json)
python scripts/update_skills_index.py

# Regenerate all IDE TOML slash commands
python scripts/regen_toml_commands.py

# Verify that all skills are properly namespaced (0 unmapped)
python scripts/verify_stats.py
```

### 6. Test with the Interactive GUI Installer
Test your changes using the local GUI installer:
```bash
node bin/install.js
```
Confirm that the browser popup launches at `http://localhost:48123` and that your skill categories and target agents configure properly.

### 7. Commit with Conventional Commits
```bash
git add .
git commit -m "feat(ui): add gsap-smooth-horizontal-gallery skill with lenis integration"
```

### 8. Push to GitHub and Open a Pull Request
```bash
git push origin feat/skill-my-new-skill
```
Go to your fork on GitHub and click **Compare & pull request**.

---

## 📋 Pull Request Checklist

Before submitting your PR, please verify:
- [ ] Every new skill has a valid `SKILL.md` with frontmatter (`name: <namespace>:<slug>`).
- [ ] The skill includes a `references/` folder with working code snippets or templates.
- [ ] `python scripts/update_skills_index.py` was executed and updated `skills_index.json`.
- [ ] `python scripts/verify_stats.py` shows **0 stale/unmapped skills**.
- [ ] PR title follows conventional commits (`feat: ...`, `fix: ...`, `docs: ...`).
- [ ] No temporary files, `node_modules/`, or scratch artifacts are included.

---

## 💡 Suggesting Repositories for Ingestion

Have you found an awesome open-source skill repository or gist?
1. Open an issue on GitHub titled: `[Repo Suggestion] owner/repo-name`.
2. Include the GitHub URL, a brief summary of the skills it contains, and the recommended semantic namespace (`ui:`, `ai:`, `marketing:`, `db:`, etc.).
3. Our automated batch ingestion engine will process the repository, synthesize skill contracts, and credit the upstream source!

---

## 🤝 Community & Support

Join our developer community to discuss new skills, collaborate on agent workflows, and get early access to exclusive drops:

- 🔗 **LinkedIn**: [Zain Ali Mughal](https://www.linkedin.com/in/zainali-mughal/)
- 📢 **WhatsApp Channel**: [Join ANI-Skills Community](https://whatsapp.com/channel/0029VbBUVv35fM5eAnXw3w2D)

Thank you for helping make `ani-skills` the gold standard for AI Coding Agents worldwide! 🌟
