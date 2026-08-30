# ANI-Skills Ultra — Antigravity CLI Context

This context gives the Antigravity IDE and Gemini CLI the operating reference for the **ANI-Skills Ultra Package**, a collection of **517 professional skills** across semantic namespaces: UI animations, testing automation, cloud infrastructure, AI frameworks, planning workflows, and algorithmic DSA.

## Semantic Namespace Map

| Prefix | Category |
|---|---|
| `start:` | Project bootstrap & initialization |
| `ui:` | UI/UX · GSAP · Three.js · animations · layout |
| `react:` | React ecosystem |
| `angular:` | Angular ecosystem |
| `next:` | Next.js / Vercel |
| `test:` | All testing frameworks (Jest, Playwright, Cypress, RSpec…) |
| `scraping:` | Browser automation & web scraping |
| `db:` | Databases (ClickHouse, Neon, Supabase, Tinybird) |
| `cloud:` | Cloud infra (Cloudflare, Netlify, AWS, Azure, Terraform) |
| `ai:` | AI/LLM frameworks (Gemini, VoltAgent, Venice, Replicate…) |
| `stripe:` | Stripe payments |
| `api:` | API design, MCP, interfaces |
| `dsa:` | Data structures & algorithms |
| `plan:` | ANI planning workflow |
| `debug:` | Debugging & error recovery |
| `security:` | Security & hardening |
| `doc:` | Documentation & file generation |
| `agent:` | Multi-agent orchestration patterns |
| `git:` | Git workflow & versioning |
| `perf:` | Performance optimization |
| `obsidian:` | Obsidian tools |
| `media:` | Content creation & media tools |
| `quality:` | Code quality & review |
| `meta:` | Namespace meta-skills |
| `boss:` | Boss prompt orchestrators (22 personas) |

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
/ui-gsap-scrolltrigger         → ui:gsap-scrolltrigger
/start-new-project             → start:new-project
/test-playwright               → test:playwright
/db-clickhouse-best-practices  → db:clickhouse-best-practices
/cloud-netlify-deploy          → cloud:netlify-deploy
/ai-gemini-api                 → ai:gemini-api
/dsa-sliding-window            → dsa:sliding-window
/plan-discuss                  → plan:discuss
/boss-creative-director        → boss:creative-director
```

## Working with Skills
- Refer to `skills/[folder-name]/SKILL.md` for parameters, constraints, and instructions.
- Refer to `skills/[folder-name]/references/` for copy-pasteable visual code samples or validation guides.
- Refer to `boss-prompts/` for master prompts to compose multiple skills.

## Installer
To configure all 8 agents at once:
```bash
npx ani-skills
# or interactively:
node bin/install.js
```
