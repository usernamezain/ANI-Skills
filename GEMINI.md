# ANI-Skills Ultra — Antigravity CLI Context

This context gives the Antigravity IDE and Gemini CLI the operating reference for the **ANI-Skills Ultra Package**, a vast collection of **3,028 professional skills** across 29 semantic namespaces: UI animations, marketing & growth, testing automation, mobile iOS/Flutter, cloud infrastructure, AI frameworks, planning workflows, security, and algorithmic DSA.

## Semantic Namespace Map (3,028 Skills)

| Prefix | Category | Skill Count |
|---|---|---|
| `ai:` | AI/LLM frameworks (Gemini, OpenAI, HuggingFace, Fal.ai, Venice, VoltAgent) | 974 |
| `marketing:` | SEO, ASO, Ads, Growth, Copywriting, Social Media, Influencer | 629 |
| `ui:` | UI/UX · GSAP · Three.js · WebGPU · Shaders · CSS Animations | 256 |
| `plan:` | Product Management, PRDs, GStack specs, roadmaps, agile | 202 |
| `db:` | Databases & Vector DBs (DuckDB, ClickHouse, Redis, MongoDB, Qdrant) | 113 |
| `monitoring:` | Sentry, Datadog, APM, Telemetry, RCA root cause traces | 112 |
| `cloud:` | Cloud infra & DevOps (Azure, AWS, Cloudflare, Netlify, Terraform, n8n) | 107 |
| `mobile:` | Mobile development (iOS SwiftUI, Flutter, Expo, React Native) | 83 |
| `auth:` | Authentication & Identity (Auth0, OAuth, JWT, 2FA, session security) | 77 |
| `doc:` | Documentation, PDF generation, Mermaid diagrams, Prose polish | 75 |
| `security:` | Security audits & hardening (Trail of Bits, VibeSec, CSO, OWASP) | 67 |
| `quality:` | Code quality, safeguards (Canary, Careful, Freeze, Health review) | 52 |
| `test:` | All testing frameworks (Jest, Playwright, Cypress, Vitest, BDD) | 50 |
| `api:` | API design, GraphQL Apollo, REST, MCP servers | 50 |
| `scraping:` | Browser automation & scraping (Browserbase daemon, Puppeteer) | 46 |
| `boss:` | Boss prompt orchestrators (36 executive personas & review workflows) | 36 |
| `media:` | Content creation & media tools | 20 |
| `dsa:` | Algorithmic DSA problem solving patterns | 20 |
| `agent:` | Multi-agent orchestration patterns | 19 |
| `git:` | Git workflow & versioning | 8 |
| `debug:` | Debugging & error recovery | 7 |
| `start:` | Project bootstrap & initialization | 6 |
| `meta:` | Namespace meta-skills | 6 |
| `stripe:` | Stripe payments | 4 |
| `react:` | React ecosystem | 3 |
| `obsidian:` | Obsidian note-taking tools | 3 |
| `angular:` | Angular ecosystem | 1 |
| `perf:` | Performance optimization | 1 |
| `next:` | Next.js / Vercel | 1 |

## Installed Paths (all 8 AI agents)

| Agent | Project Path | Global Path |
|---|---|---|
| **Antigravity** | `.agents/skills/` | `~/.gemini/config/skills/` |
| **Claude Code** | `.claude/skills/` | `~/.claude/skills/` |
| **Codex** | `.agents/skills/` | `~/.agents/skills/` |
| **Cursor** | `.cursor/skills/` | `~/.cursor/skills/` |
| **Gemini CLI** | `.gemini/skills/` | `~/.gemini/skills/` |
| **GitHub Copilot** | `.github/skills/` | `~/.copilot/skills/` |
| **OpenCode** | `.opencode/skills/` | `~/.config/opencode/skills/` |
| **Windsurf** | `.windsurf/skills/` | `~/.codeium/windsurf/skills/` |

## Interactive GUI & CLI Installer (Smart Zero-Lag Edition)

When typing `ani-skills` or running `npx ani-skills`:
```bash
ani-skills
# or
npx ani-skills
```
An interactive Web GUI popup launches automatically in the browser with:
- **Smart Workspace Stack Detection:** Identifies active project technologies (React, Next.js, Python, Tailwind, Neon, etc.) and auto-selects only required skills (eliminating prompt lag).
- **Target AI Agent selector:** (Antigravity IDE, Claude Code, Cursor, Windsurf, Copilot, Codex, Gemini CLI, OpenCode).
- **1-Click "Install Required Only":** Zero-lag installation that keeps AI prompt bars responsive.
- **Instant path configuration and lean rules file generation:** Tailors directives to active project requirements.

### Precision CLI Modes:
```bash
# Auto-installs only project-required skills (Zero-Lag Default)
ani-skills --auto

# Preview required skills without writing to disk
ani-skills --dry-run

# Force complete 3,028 skills suite
ani-skills --all
```
