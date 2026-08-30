#!/usr/bin/env node
/**
 * ANI-Skills Library Installer  v2.0
 * ====================================
 * Installs skills to all 8 supported AI coding agents
 * (project-local paths AND global user paths).
 *
 * Supported agents:
 *   Antigravity | Claude Code | Codex | Cursor
 *   Gemini CLI  | GitHub Copilot | OpenCode | Windsurf
 */
const fs      = require('fs');
const path    = require('path');
const readline= require('readline');
const os      = require('os');
const { execSync } = require('child_process');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const projectRoot = path.dirname(__dirname);
const skillsSrc   = path.join(projectRoot, 'skills');
const geminiCmdSrc= path.join(projectRoot, '.gemini', 'commands');

const homeDir = process.env.HOME || process.env.USERPROFILE || os.homedir();
const cwd     = process.cwd();

// ─── helpers ─────────────────────────────────────────────────────────────────

function showBanner() {
  console.clear();
  console.log(`
╔══════════════════════════════════════════════════════╗
║        ANI-SKILLS ULTRA PACKAGE  v2.0                ║
║  444 skills · 8 agents · semantic namespaces         ║
╚══════════════════════════════════════════════════════╝
`);
}

function shouldLink() {
  const isGit        = fs.existsSync(path.join(projectRoot, '.git'));
  const isNodeModules= projectRoot.includes('node_modules');
  const isNpx        = projectRoot.includes('npm-cache') || projectRoot.includes('_npx');
  return isGit && !isNodeModules && !isNpx;
}

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(child =>
      copyRecursiveSync(path.join(src, child), path.join(dest, child))
    );
  } else {
    try {
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      fs.copyFileSync(src, dest);
    } catch (e) {
      try { fs.chmodSync(dest, 0o666); fs.unlinkSync(dest); fs.copyFileSync(src, dest); }
      catch (err) { console.error(`  [Warn] Copy failed ${src}: ${err.message}`); }
    }
  }
}

function linkOrCopy(src, dest) {
  if (!fs.existsSync(src)) { console.warn(`  [Skip] Source not found: ${src}`); return; }
  try {
    const s = fs.lstatSync(dest);
    if (s.isSymbolicLink() || s.isFile()) fs.unlinkSync(dest);
    else fs.rmSync(dest, { recursive: true, force: true });
  } catch (_) {}
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (shouldLink()) {
    try {
      const type = process.platform === 'win32' ? 'junction' : 'dir';
      fs.symlinkSync(src, dest, type);
      console.log(`  [✓ Link] ${dest}`);
      return;
    } catch (_) {}
  }
  copyRecursiveSync(src, dest);
  console.log(`  [✓ Copy] ${dest}`);
}

// ─── ALL 8 AGENT TARGETS ─────────────────────────────────────────────────────
//  Each entry:  { name, projectPath, globalPath, commandsGlobalPath? }

function getAgents() {
  return [
    {
      id:          'antigravity',
      name:        'Antigravity IDE',
      trigger:     path.join(homeDir, '.gemini', 'config'),
      projectPath: path.join(cwd, '.agents', 'skills'),
      globalPath:  path.join(homeDir, '.gemini', 'config', 'skills'),
      commandsGlobal: [
        path.join(homeDir, '.gemini', 'commands'),
        path.join(homeDir, '.gemini', 'config', 'commands'),
      ],
      docs: 'https://antigravity.google/docs/skills',
    },
    {
      id:          'claude',
      name:        'Claude Code',
      trigger:     path.join(homeDir, '.claude'),
      projectPath: path.join(cwd, '.claude', 'skills'),
      globalPath:  path.join(homeDir, '.claude', 'skills'),
      docs: 'https://docs.anthropic.com/en/docs/claude-code/skills',
    },
    {
      id:          'codex',
      name:        'Codex (OpenAI)',
      trigger:     path.join(homeDir, '.agents'),
      projectPath: path.join(cwd, '.agents', 'skills'),
      globalPath:  path.join(homeDir, '.agents', 'skills'),
      docs: 'https://developers.openai.com/codex/skills',
    },
    {
      id:          'cursor',
      name:        'Cursor',
      trigger:     path.join(homeDir, '.cursor'),
      projectPath: path.join(cwd, '.cursor', 'skills'),
      globalPath:  path.join(homeDir, '.cursor', 'skills'),
      docs: 'https://cursor.com/docs/context/skills',
    },
    {
      id:          'gemini-cli',
      name:        'Gemini CLI',
      trigger:     path.join(homeDir, '.gemini'),
      projectPath: path.join(cwd, '.gemini', 'skills'),
      globalPath:  path.join(homeDir, '.gemini', 'skills'),
      commandsGlobal: [path.join(homeDir, '.gemini', 'commands')],
      docs: 'https://geminicli.com/docs/cli/skills/',
    },
    {
      id:          'copilot',
      name:        'GitHub Copilot',
      trigger:     path.join(homeDir, '.copilot'),
      projectPath: path.join(cwd, '.github', 'skills'),
      globalPath:  path.join(homeDir, '.copilot', 'skills'),
      docs: 'https://docs.github.com/en/copilot/concepts/agents/about-agent-skills',
    },
    {
      id:          'opencode',
      name:        'OpenCode',
      trigger:     path.join(homeDir, '.config', 'opencode'),
      projectPath: path.join(cwd, '.opencode', 'skills'),
      globalPath:  path.join(homeDir, '.config', 'opencode', 'skills'),
      docs: 'https://opencode.ai/docs/skills',
    },
    {
      id:          'windsurf',
      name:        'Windsurf (Cascade)',
      trigger:     path.join(homeDir, '.codeium'),
      projectPath: path.join(cwd, '.windsurf', 'skills'),
      globalPath:  path.join(homeDir, '.codeium', 'windsurf', 'skills'),
      docs: 'https://docs.windsurf.com/windsurf/cascade/skills',
    },
  ];
}

// ─── install one agent ────────────────────────────────────────────────────────

function installAgent(agent, mode = 'both') {
  console.log(`\n▶ ${agent.name}`);
  if (mode === 'project' || mode === 'both') {
    linkOrCopy(skillsSrc, agent.projectPath);
  }
  if (mode === 'global' || mode === 'both') {
    linkOrCopy(skillsSrc, agent.globalPath);
    if (agent.commandsGlobal) {
      agent.commandsGlobal.forEach(dest => linkOrCopy(geminiCmdSrc, dest));
    }
  }
}

// ─── rules files ─────────────────────────────────────────────────────────────

function generateRules() {
  const agents = getAgents();
  const agentPathList = agents.map(a =>
    `  ${a.name.padEnd(20)} project: ${a.projectPath}\n` +
    `${''.padEnd(24)} global:  ${a.globalPath}`
  ).join('\n');

  const content = `# ANI-Skills Ultra Package v2.0
# 444 skills · Semantic namespaces · 8 AI agents

## Skill Namespaces
| Prefix    | Category                                  |
|-----------|-------------------------------------------|
| start:    | Project bootstrap & initialization        |
| ui:       | UI/UX · GSAP · Three.js · animations      |
| react:    | React ecosystem                           |
| angular:  | Angular ecosystem                         |
| next:     | Next.js / Vercel                          |
| test:     | All testing frameworks                    |
| scraping: | Browser automation & web scraping         |
| db:       | Databases (ClickHouse, Neon, Supabase…)   |
| cloud:    | Cloud infra (Cloudflare, Netlify, AWS…)   |
| ai:       | AI/LLM frameworks (Gemini, Venice…)       |
| stripe:   | Stripe payments                           |
| api:      | API design, MCP, interfaces               |
| dsa:      | Data structures & algorithms              |
| plan:     | ANI planning workflow                     |
| debug:    | Debugging & error recovery                |
| security: | Security & hardening                      |
| doc:      | Documentation & file generation           |
| agent:    | Multi-agent orchestration patterns        |
| git:      | Git workflow & versioning                 |
| perf:     | Performance optimization                  |
| obsidian: | Obsidian tools                            |
| media:    | Content creation & media tools            |
| quality:  | Code quality & review                     |
| meta:     | Namespace meta-skills                     |
| boss:     | Boss prompt orchestrators                 |

## Skill Registry Paths
${agentPathList}

## Execution Policy
1. When a skill matches, read \`skills/<folder>/SKILL.md\` and any \`references/\` assets.
2. Use the namespace to identify the skill category. Example: \`ui:gsap-scrolltrigger\` → \`skills/gsap-scrolltrigger-effects/SKILL.md\`
3. For multi-skill tasks, consult \`boss-prompts/\` for orchestration personas.
4. Follow ANI coding standards: CommonJS only, no external deps, execFileSync over execSync.
`;

  const files = [
    '.cursorrules', '.windsurfrules', '.traerules',
    '.clinerules', '.geminirules', '.copilot-rules',
  ];
  files.forEach(f => {
    try {
      fs.writeFileSync(path.join(projectRoot, f), content, 'utf8');
      console.log(`  [✓] Wrote ${f}`);
    } catch (e) {
      console.error(`  [!] Failed ${f}: ${e.message}`);
    }
  });
  console.log('\nRules files written.');
}

// ─── compile index ────────────────────────────────────────────────────────────

function compileIndex() {
  console.log('\nRebuilding skills_index.json...');
  try {
    const s = path.join(projectRoot, 'scripts', 'update_skills_index.py');
    console.log(execSync(`python "${s}"`).toString());
  } catch (e) { console.error(`[Error] ${e.message}`); }
}

// ─── interactive menu ─────────────────────────────────────────────────────────

function mainMenu() {
  showBanner();
  const agents = getAgents();
  console.log('Install skills to an AI agent:\n');
  agents.forEach((a, i) => {
    console.log(`  [${i+1}]  ${a.name.padEnd(22)} → project + global`);
  });
  console.log(`\n  [A]  Install to ALL detected agents (auto)`);
  console.log(`  [R]  Generate rules files (.cursorrules / .geminirules / etc.)`);
  console.log(`  [I]  Rebuild skills_index.json`);
  console.log(`  [Q]  Quit\n`);

  rl.question('Choice: ', choice => {
    const c = choice.trim().toUpperCase();
    const idx = parseInt(c, 10);
    if (!isNaN(idx) && idx >= 1 && idx <= agents.length) {
      installAgent(agents[idx - 1]);
      rl.question('\nPress Enter to return to menu...', () => mainMenu());
    } else if (c === 'A') {
      runAutoInstall(true);
    } else if (c === 'R') {
      generateRules();
      rl.question('\nPress Enter to return to menu...', () => mainMenu());
    } else if (c === 'I') {
      compileIndex();
      rl.question('\nPress Enter to return to menu...', () => mainMenu());
    } else if (c === 'Q') {
      console.log('\nDone. Enjoy your ANI-Skills Ultra package!');
      rl.close();
      process.exit(0);
    } else {
      console.log('Invalid option.');
      rl.question('Press Enter...', () => mainMenu());
    }
  });
}

// ─── auto install (postinstall / --auto) ─────────────────────────────────────

function runAutoInstall(interactive = false) {
  showBanner();
  console.log('Auto-detecting installed AI agents...\n');
  const agents  = getAgents();
  let configured = 0;

  agents.forEach(agent => {
    if (fs.existsSync(agent.trigger)) {
      installAgent(agent);
      configured++;
    } else {
      console.log(`  [–] ${agent.name} not detected (${agent.trigger})`);
    }
  });

  generateRules();
  compileIndex();

  console.log(`\n✓ Configured ${configured} / ${agents.length} agents.`);
  if (configured === 0) {
    console.log('\nNo AI agent directories found. Run interactively: npx ani-skills');
  }

  if (interactive) {
    rl.question('\nPress Enter to return to menu...', () => mainMenu());
  } else {
    rl.close();
    process.exit(0);
  }
}

// ─── entry ────────────────────────────────────────────────────────────────────
const args   = process.argv.slice(2);
const isAuto = args.includes('--auto') || args.includes('--yes') || args.includes('-y') || !process.stdout.isTTY;

if (isAuto) {
  runAutoInstall(false);
} else {
  mainMenu();
}
