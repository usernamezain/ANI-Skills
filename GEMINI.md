# ANI-Skills Ultra — Antigravity CLI Context

This context gives the Antigravity IDE and Gemini CLI the operating reference for the **ANI-Skills Ultra Package**, a collection of **579 professional skills** across semantic namespaces: UI animations, testing automation, mobile iOS development, cloud infrastructure, AI frameworks, planning workflows, and algorithmic DSA.

## Semantic Namespace Map

| Prefix | Category |
|---|---|
| `start:` | Project bootstrap & initialization |
| `ui:` | UI/UX · GSAP · Three.js · animations · layout · design shotgun |
| `react:` | React ecosystem |
| `angular:` | Angular ecosystem |
| `next:` | Next.js / Vercel |
| `mobile:` | Mobile development (iOS, SwiftUI, live-device QA & debugging) |
| `test:` | All testing frameworks (Jest, Playwright, Cypress, RSpec…) |
| `scraping:` | Browser automation & web scraping (browse daemon, scrape, cookies) |
| `db:` | Databases (ClickHouse, Neon, Supabase, Tinybird) |
| `cloud:` | Cloud infra (Cloudflare, Netlify, AWS, Azure, Terraform) |
| `ai:` | AI/LLM frameworks (Gemini, VoltAgent, Venice, Replicate, Gbrain, Codex) |
| `stripe:` | Stripe payments |
| `api:` | API design, MCP, interfaces |
| `dsa:` | Data structures & algorithms |
| `plan:` | ANI planning workflow & GStack specs |
| `debug:` | Debugging & error recovery |
| `security:` | Security & hardening |
| `doc:` | Documentation & rendering (Mermaid diagram, make-pdf, release docs) |
| `agent:` | Multi-agent orchestration patterns |
| `git:` | Git workflow & versioning |
| `perf:` | Performance optimization |
| `obsidian:` | Obsidian tools |
| `media:` | Content creation & media tools |
| `quality:` | Code quality, safeguards (canary, careful, freeze, health, review) |
| `meta:` | Namespace meta-skills |
| `boss:` | Boss prompt orchestrators (36 executive personas & workflows) |

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

## Slash Commands

All skills are registered as slash commands using the format `/namespace-skill-name`:

```
/boss-gstack-ceo-review        → boss:gstack-ceo-review (Garry Tan Founder Mode)
/boss-gstack-office-hours      → boss:gstack-office-hours (YC Partner Office Hours)
/boss-gstack-autoplan          → boss:gstack-autoplan (4-way Executive Board Review)
/boss-gstack-cso               → boss:gstack-cso (Chief Security Officer Audit)
/boss-gstack-investigate       → boss:gstack-investigate (Staff Debugger Hypothesis Testing)
/ui-gsap-scrolltrigger         → ui:gsap-scrolltrigger
/start-new-project             → start:new-project
/mobile-gstack-ios-qa          → mobile:gstack-ios-qa
/scraping-gstack-browse        → scraping:gstack-browse
/doc-gstack-make-pdf           → doc:gstack-make-pdf
```

## Working with Skills
- Refer to `skills/[folder-name]/SKILL.md` for parameters, constraints, and instructions.
- Refer to `skills/[folder-name]/references/` for copy-pasteable visual code samples or validation guides.
- Refer to `boss-prompts/` for master executive orchestrator prompts to compose multiple skills.

## Installer
To configure all 8 agents at once:
```bash
npx ani-skills
# or interactively:
node bin/install.js
```
