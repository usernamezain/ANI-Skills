#!/usr/bin/env node
/**
 * ANI-Skills Ultra Package Installer v2.0
 * ========================================
 * High-performance, multi-agent installer featuring:
 * - Interactive Monochromatic Web GUI Popup with category checkboxes
 * - Interactive TUI Terminal fallback
 * - Full support for all 8 AI Coding Agents (Project & Global paths)
 * - 3,028 Skills across 29 Semantic Namespaces
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const os = require('os');
const { exec, execSync } = require('child_process');

const projectRoot = path.dirname(__dirname);
const skillsSrc = path.join(projectRoot, 'skills');
const geminiCmdSrc = path.join(projectRoot, '.gemini', 'commands');
const homeDir = process.env.HOME || process.env.USERPROFILE || os.homedir();
const cwd = process.cwd();

// ─── AGENT DEFINITIONS ────────────────────────────────────────────────────────
function getAgents() {
  return [
    {
      id: 'antigravity',
      name: 'Antigravity IDE',
      trigger: path.join(homeDir, '.gemini', 'config'),
      projectPath: path.join(cwd, '.agents', 'skills'),
      globalPath: path.join(homeDir, '.gemini', 'config', 'skills'),
      commandsGlobal: [
        path.join(homeDir, '.gemini', 'commands'),
        path.join(homeDir, '.gemini', 'config', 'commands'),
      ],
      docs: 'https://antigravity.google/docs/skills',
    },
    {
      id: 'claude',
      name: 'Claude Code',
      trigger: path.join(homeDir, '.claude'),
      projectPath: path.join(cwd, '.claude', 'skills'),
      globalPath: path.join(homeDir, '.claude', 'skills'),
      docs: 'https://docs.anthropic.com/en/docs/claude-code/skills',
    },
    {
      id: 'cursor',
      name: 'Cursor',
      trigger: path.join(homeDir, '.cursor'),
      projectPath: path.join(cwd, '.cursor', 'skills'),
      globalPath: path.join(homeDir, '.cursor', 'skills'),
      docs: 'https://cursor.com/docs/context/skills',
    },
    {
      id: 'windsurf',
      name: 'Windsurf (Cascade)',
      trigger: path.join(homeDir, '.codeium'),
      projectPath: path.join(cwd, '.windsurf', 'skills'),
      globalPath: path.join(homeDir, '.codeium', 'windsurf', 'skills'),
      docs: 'https://docs.windsurf.com/windsurf/cascade/skills',
    },
    {
      id: 'copilot',
      name: 'GitHub Copilot',
      trigger: path.join(homeDir, '.copilot'),
      projectPath: path.join(cwd, '.github', 'skills'),
      globalPath: path.join(homeDir, '.copilot', 'skills'),
      docs: 'https://docs.github.com/en/copilot/concepts/agents/about-agent-skills',
    },
    {
      id: 'codex',
      name: 'Codex (OpenAI)',
      trigger: path.join(homeDir, '.agents'),
      projectPath: path.join(cwd, '.agents', 'skills'),
      globalPath: path.join(homeDir, '.agents', 'skills'),
      docs: 'https://developers.openai.com/codex/skills',
    },
    {
      id: 'gemini-cli',
      name: 'Gemini CLI',
      trigger: path.join(homeDir, '.gemini'),
      projectPath: path.join(cwd, '.gemini', 'skills'),
      globalPath: path.join(homeDir, '.gemini', 'skills'),
      commandsGlobal: [path.join(homeDir, '.gemini', 'commands')],
      docs: 'https://geminicli.com/docs/cli/skills/',
    },
    {
      id: 'opencode',
      name: 'OpenCode',
      trigger: path.join(homeDir, '.config', 'opencode'),
      projectPath: path.join(cwd, '.opencode', 'skills'),
      globalPath: path.join(homeDir, '.config', 'opencode', 'skills'),
      docs: 'https://opencode.ai/docs/skills',
    },
  ];
}

// ─── CATEGORY DEFINITIONS ─────────────────────────────────────────────────────
function getCategories() {
  return [
    { id: 'all', name: '⚡ All Skills (Complete Suite)', count: 3028, desc: 'Installs all 3,028 skills across every category' },
    { id: 'ai', name: '🤖 AI & LLM Frameworks', count: 974, desc: 'OpenAI, Gemini, HuggingFace, Fal.ai, Venice, VoltAgent, MiniMax' },
    { id: 'marketing', name: '📈 Marketing, Growth & SEO', count: 629, desc: 'AEO/GEO, Google Ads, LinkedIn, Copywriting, Social Media' },
    { id: 'ui', name: '✨ UI, GSAP & 3D WebGPU', count: 256, desc: 'GSAP animations, Three.js, WebGPU shaders, landing pages' },
    { id: 'plan', name: '📋 Product Management & Specs', count: 202, desc: 'Product Manager skills, PRDs, GStack specs, roadmaps' },
    { id: 'db', name: '🗄️ Databases & Vector Search', count: 113, desc: 'DuckDB, ClickHouse, Redis, MongoDB, Qdrant, Supabase' },
    { id: 'monitoring', name: '📊 APM & Observability', count: 112, desc: 'Sentry, Datadog, OpenTelemetry, RCA traces, health checks' },
    { id: 'cloud', name: '☁️ Cloud, DevOps & Automation', count: 107, desc: 'Azure, AWS, Cloudflare, Netlify, Terraform, n8n, Resend' },
    { id: 'mobile', name: '📱 Mobile, iOS & Flutter', count: 83, desc: 'SwiftUI live-device QA, Flutter, Expo, React Native, ASO' },
    { id: 'auth', name: '🔐 Auth & Identity Systems', count: 77, desc: 'Auth0, OAuth, JWT, 2FA, session management' },
    { id: 'doc', name: '📄 Docs, PDF & Prose Engines', count: 75, desc: 'Make-PDF, Mermaid diagrams, Unslop, Humanizer, Notion' },
    { id: 'security', name: '🛡️ Security & Hardening', count: 67, desc: 'Trail of Bits, VibeSec, CSO audits, OWASP zero-trust' },
    { id: 'quality', name: '🎯 Code Quality & Safeguards', count: 52, desc: 'Canary, Careful guardrails, Freeze, Health audits' },
    { id: 'test', name: '🧪 Test Automation & BDD', count: 50, desc: 'Jest, Playwright, Cypress, Vitest, Cucumber, Robot' },
    { id: 'api', name: '🔌 APIs & GraphQL', count: 50, desc: 'Apollo GraphQL, REST design, MCP server architectures' },
    { id: 'scraping', name: '🌐 Browser Automation & Scraping', count: 46, desc: 'Browserbase daemon, Puppeteer, X-Twitter scrapers' },
    { id: 'boss', name: '👑 Executive Boss Personas', count: 36, desc: 'Garry Tan Founder Mode, CSO, VP Eng, Product Director' },
    { id: 'dsa', name: '🧮 Algorithmic DSA Workflows', count: 20, desc: 'Sliding window, dynamic programming, backtracking, graphs' },
    { id: 'start', name: '🚀 Project Bootstrap', count: 6, desc: 'New project scaffolding, milestone bootstrap, onboarding' },
  ];
}

// ─── FILE COPY / LINK UTILITIES ───────────────────────────────────────────────
function shouldLink() {
  const isGit = fs.existsSync(path.join(projectRoot, '.git'));
  const isNodeModules = projectRoot.includes('node_modules');
  const isNpx = projectRoot.includes('npm-cache') || projectRoot.includes('_npx');
  return isGit && !isNodeModules && !isNpx;
}

function copyRecursiveFiltered(src, dest, allowedCategories) {
  if (!fs.existsSync(src)) return 0;
  let copied = 0;
  fs.mkdirSync(dest, { recursive: true });

  const isAll = allowedCategories.includes('all');
  const folders = fs.readdirSync(src);

  for (const folder of folders) {
    const folderPath = path.join(src, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    let include = isAll;
    if (!include) {
      const skillMd = path.join(folderPath, 'SKILL.md');
      if (fs.existsSync(skillMd)) {
        const content = fs.readFileSync(skillMd, 'utf8');
        const m = content.match(/^name:\s*(.+)$/m);
        const name = m ? m[1].trim() : '';
        const ns = name.includes(':') ? name.split(':')[0] : 'ai';
        if (allowedCategories.includes(ns)) {
          include = true;
        }
      }
    }

    if (include) {
      const targetPath = path.join(dest, folder);
      try {
        fs.cpSync(folderPath, targetPath, { recursive: true });
        copied++;
      } catch (_) {}
    }
  }
  return copied;
}

function installToAgent(agent, selectedCategories, mode = 'both') {
  const isAll = selectedCategories.includes('all');
  const results = { agent: agent.name, paths: [], count: 0 };

  if (mode === 'project' || mode === 'both') {
    if (isAll && shouldLink()) {
      try {
        const type = process.platform === 'win32' ? 'junction' : 'dir';
        if (fs.existsSync(agent.projectPath)) fs.rmSync(agent.projectPath, { recursive: true, force: true });
        fs.mkdirSync(path.dirname(agent.projectPath), { recursive: true });
        fs.symlinkSync(skillsSrc, agent.projectPath, type);
        results.paths.push(`${agent.projectPath} (symlinked all)`);
        results.count = 3028;
      } catch (_) {
        const count = copyRecursiveFiltered(skillsSrc, agent.projectPath, selectedCategories);
        results.paths.push(agent.projectPath);
        results.count = count;
      }
    } else {
      const count = copyRecursiveFiltered(skillsSrc, agent.projectPath, selectedCategories);
      results.paths.push(agent.projectPath);
      results.count = count;
    }
  }

  if (mode === 'global' || mode === 'both') {
    if (isAll && shouldLink()) {
      try {
        const type = process.platform === 'win32' ? 'junction' : 'dir';
        if (fs.existsSync(agent.globalPath)) fs.rmSync(agent.globalPath, { recursive: true, force: true });
        fs.mkdirSync(path.dirname(agent.globalPath), { recursive: true });
        fs.symlinkSync(skillsSrc, agent.globalPath, type);
        results.paths.push(`${agent.globalPath} (symlinked all)`);
      } catch (_) {
        copyRecursiveFiltered(skillsSrc, agent.globalPath, selectedCategories);
        results.paths.push(agent.globalPath);
      }
    } else {
      copyRecursiveFiltered(skillsSrc, agent.globalPath, selectedCategories);
      results.paths.push(agent.globalPath);
    }
  }

  return results;
}

function generateRulesFiles() {
  const agents = getAgents();
  const agentPathList = agents.map(a =>
    `  ${a.name.padEnd(20)} project: ${a.projectPath}\n` +
    `${''.padEnd(24)} global:  ${a.globalPath}`
  ).join('\n');

  const content = `# ANI-Skills Ultra Package v2.0
# 3,028 skills · 29 Semantic Namespaces · 8 AI Coding Agents

## Semantic Namespaces
| Prefix | Category |
|---|---|
| start: | Project bootstrap & initialization |
| ui: | UI/UX · GSAP · Three.js · WebGPU animations |
| marketing: | SEO · ASO · Ads · Growth · Social media |
| ai: | AI/LLM frameworks (Gemini, OpenAI, Venice, VoltAgent, Fal) |
| boss: | Boss prompt orchestrators (36 executive personas) |
| mobile: | Mobile development (iOS SwiftUI, Flutter, Expo, React Native) |
| db: | Databases (DuckDB, ClickHouse, Redis, MongoDB, Qdrant) |
| monitoring:| Sentry · Datadog · APM · Telemetry · RCA |
| cloud: | Cloud infra (Azure, AWS, Cloudflare, Netlify, Terraform) |
| test: | Testing frameworks (Jest, Playwright, Cypress, Vitest) |
| doc: | Documentation, PDF generation & prose polish |
| security: | Security audits (Trail of Bits, VibeSec, CSO) |
| plan: | Product Management, PRDs, GStack specs |
| scraping: | Browser automation & scraping (Browserbase, Puppeteer) |
| dsa: | Data structures & algorithms |

## Configured Agent Registry Paths
${agentPathList}

## Execution Policy
1. When matching a skill, read \`skills/<folder>/SKILL.md\` and its \`references/\` assets.
2. For executive reviews or multi-agent orchestration, consult \`boss-prompts/\`.
`;

  const files = ['.cursorrules', '.windsurfrules', '.traerules', '.clinerules', '.geminirules', '.copilot-rules'];
  files.forEach(f => {
    try {
      fs.writeFileSync(path.join(projectRoot, f), content, 'utf8');
    } catch (_) {}
  });
}

// ─── WEB GUI SERVER ───────────────────────────────────────────────────────────
function startGuiServer(callback) {
  const port = 48123;
  const categories = getCategories();
  const agents = getAgents().map(a => ({
    ...a,
    detected: fs.existsSync(a.trigger)
  }));

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ANI-Skills Ultra Installer</title>
  <style>
    :root {
      --bg: #09090b;
      --card-bg: #121216;
      --card-border: #27272a;
      --text: #f4f4f5;
      --text-muted: #a1a1aa;
      --accent: #ffffff;
      --highlight: #22c55e;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", monospace;
      padding: 32px 16px;
      line-height: 1.5;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding: 32px 24px;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
    }
    .banner-title {
      font-size: 32px;
      font-weight: 900;
      letter-spacing: 2px;
      margin-bottom: 8px;
      color: #fff;
      text-transform: uppercase;
    }
    .badge {
      display: inline-block;
      background: #27272a;
      color: #fafafa;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 999px;
      margin-bottom: 12px;
    }
    .subtitle {
      color: var(--text-muted);
      font-size: 14px;
    }
    .section-title {
      font-size: 18px;
      font-weight: 700;
      margin: 32px 0 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 12px;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 14px 16px;
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      transition: border-color 0.15s, background 0.15s;
      user-select: none;
    }
    .card:hover {
      border-color: #52525b;
      background: #18181b;
    }
    .card.selected {
      border-color: var(--accent);
      background: #1e1e24;
    }
    .checkbox {
      margin-top: 3px;
      accent-color: #ffffff;
      width: 18px;
      height: 18px;
    }
    .card-info {
      flex: 1;
    }
    .card-name {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 2px;
    }
    .card-desc {
      font-size: 12px;
      color: var(--text-muted);
    }
    .detected-tag {
      font-size: 10px;
      background: #052e16;
      color: #4ade80;
      padding: 2px 6px;
      border-radius: 4px;
      margin-left: 6px;
    }
    .btn-row {
      display: flex;
      gap: 12px;
      margin: 36px 0;
    }
    .btn {
      flex: 1;
      padding: 16px;
      font-size: 16px;
      font-weight: 700;
      background: #ffffff;
      color: #000000;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: opacity 0.15s, transform 0.05s;
    }
    .btn:hover { opacity: 0.9; }
    .btn:active { transform: scale(0.99); }
    .btn-secondary {
      background: transparent;
      color: #fafafa;
      border: 1px solid var(--card-border);
      flex: 0 0 140px;
    }
    .console-box {
      display: none;
      background: #000;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 20px;
      font-family: monospace;
      font-size: 13px;
      color: #4ade80;
      white-space: pre-wrap;
      max-height: 250px;
      overflow-y: auto;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">ANI-SKILLS ULTRA v2.0</div>
      <h1 class="banner-title">ANI-SKILLS ULTRA</h1>
      <p class="subtitle">3,028 Skills · 29 Semantic Namespaces · 8 AI Coding Agents</p>
    </div>

    <div class="section-title">
      <span>1. Select Target AI Coding Assistants</span>
      <button class="btn-secondary" style="padding:4px 8px; font-size:11px;" onclick="toggleAllAgents()">Toggle All</button>
    </div>
    <div class="grid" id="agent-grid">
      ${agents.map(a => `
        <label class="card ${a.detected ? 'selected' : ''}" id="agent-card-${a.id}">
          <input type="checkbox" class="checkbox agent-cb" value="${a.id}" ${a.detected ? 'checked' : ''} onchange="updateCardState('agent-card-${a.id}', this.checked)">
          <div class="card-info">
            <div class="card-name">${a.name} ${a.detected ? '<span class="detected-tag">Detected</span>' : ''}</div>
            <div class="card-desc">${a.projectPath}</div>
          </div>
        </label>
      `).join('')}
    </div>

    <div class="section-title">
      <span>2. Select Skill Categories & Bundles</span>
      <button class="btn-secondary" style="padding:4px 8px; font-size:11px;" onclick="toggleAllCategories()">Toggle All</button>
    </div>
    <div class="grid" id="category-grid">
      ${categories.map(c => `
        <label class="card ${c.id === 'all' ? 'selected' : ''}" id="cat-card-${c.id}">
          <input type="checkbox" class="checkbox cat-cb" value="${c.id}" ${c.id === 'all' ? 'checked' : ''} onchange="updateCardState('cat-card-${c.id}', this.checked)">
          <div class="card-info">
            <div class="card-name">${c.name} <span style="font-size:11px; color:#a1a1aa">(${c.count})</span></div>
            <div class="card-desc">${c.desc}</div>
          </div>
        </label>
      `).join('')}
    </div>

    <div class="btn-row">
      <button class="btn" id="install-btn" onclick="runInstall()">⚡ Install Selected Skills</button>
    </div>

    <div class="console-box" id="console"></div>
  </div>

  <script>
    function updateCardState(cardId, isChecked) {
      const card = document.getElementById(cardId);
      if (card) {
        if (isChecked) card.classList.add('selected');
        else card.classList.remove('selected');
      }
    }

    function toggleAllAgents() {
      const cbs = document.querySelectorAll('.agent-cb');
      const allChecked = Array.from(cbs).every(c => c.checked);
      cbs.forEach(c => {
        c.checked = !allChecked;
        updateCardState('agent-card-' + c.value, c.checked);
      });
    }

    function toggleAllCategories() {
      const cbs = document.querySelectorAll('.cat-cb');
      const allChecked = Array.from(cbs).every(c => c.checked);
      cbs.forEach(c => {
        c.checked = !allChecked;
        updateCardState('cat-card-' + c.value, c.checked);
      });
    }

    async function runInstall() {
      const btn = document.getElementById('install-btn');
      const consoleBox = document.getElementById('console');
      btn.disabled = true;
      btn.textContent = 'Installing...';
      consoleBox.style.display = 'block';
      consoleBox.textContent = '▶ Initiating installation protocol...\\n';

      const selectedAgents = Array.from(document.querySelectorAll('.agent-cb:checked')).map(c => c.value);
      const selectedCategories = Array.from(document.querySelectorAll('.cat-cb:checked')).map(c => c.value);

      if (selectedAgents.length === 0) {
        consoleBox.textContent += '❌ Please select at least one AI Coding Agent.\\n';
        btn.disabled = false;
        btn.textContent = '⚡ Install Selected Skills';
        return;
      }

      try {
        const res = await fetch('/api/install', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agents: selectedAgents, categories: selectedCategories })
        });
        const data = await res.json();
        consoleBox.textContent += data.log + '\\n\\n✓ INSTALLATION COMPLETED SUCCESSFULLY! You can close this window.';
        btn.textContent = '✓ Installed';
      } catch (err) {
        consoleBox.textContent += '❌ Error: ' + err.message;
        btn.disabled = false;
        btn.textContent = '⚡ Retry Install';
      }
    }
  </script>
</body>
</html>`;

  const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } else if (req.method === 'POST' && req.url === '/api/install') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const payload = JSON.parse(body);
          const allAgents = getAgents();
          const targetAgents = allAgents.filter(a => payload.agents.includes(a.id));
          const selectedCats = payload.categories && payload.categories.length > 0 ? payload.categories : ['all'];

          let logOutput = `▶ Configuring ${targetAgents.length} AI agent(s) with ${selectedCats.join(', ')}...\n`;

          targetAgents.forEach(agent => {
            const result = installToAgent(agent, selectedCats, 'both');
            logOutput += `\n[✓ ${agent.name}]\n  Project: ${agent.projectPath}\n  Global:  ${agent.globalPath} (${result.count} skills)`;
          });

          generateRulesFiles();
          logOutput += '\n\n[✓ Rules Files] .cursorrules, .windsurfrules, .geminirules generated.';

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, log: logOutput }));
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
      });
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`\n✨ ANI-Skills Ultra GUI running at: ${url}`);
    openBrowser(url);
    if (callback) callback(server);
  });
}

function openBrowser(url) {
  const cmd = process.platform === 'win32' ? `start "" "${url}"` :
              process.platform === 'darwin' ? `open "${url}"` : `xdg-open "${url}"`;
  exec(cmd, () => {});
}

// ─── CLI FALLBACK MENU ─────────────────────────────────────────────────────────
function showCliBanner() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║                    ANI-SKILLS ULTRA PACKAGE v2.0                     ║
║  3,028 skills · 29 namespaces · 8 AI Agents · GUI + CLI Installer   ║
╚══════════════════════════════════════════════════════════════════════╝
`);
}

function runCliAutoInstall() {
  showCliBanner();
  console.log('Auto-detecting installed AI agents...\n');
  const agents = getAgents();
  let configured = 0;

  agents.forEach(agent => {
    if (fs.existsSync(agent.trigger)) {
      const res = installToAgent(agent, ['all'], 'both');
      console.log(`  [✓] ${agent.name} configured (${res.count} skills)`);
      configured++;
    } else {
      console.log(`  [–] ${agent.name} (not detected)`);
    }
  });

  generateRulesFiles();
  console.log(`\n✓ Configured ${configured} / ${agents.length} detected agents.`);
  process.exit(0);
}

// ─── ENTRY POINT ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const isAuto = args.includes('--auto') || args.includes('--yes') || args.includes('-y') || !process.stdout.isTTY;
const isCliOnly = args.includes('--cli');

if (isAuto) {
  runCliAutoInstall();
} else if (isCliOnly) {
  runCliAutoInstall();
} else {
  showCliBanner();
  console.log('Launching Interactive Web GUI Popup in browser...');
  startGuiServer();
}
