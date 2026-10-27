#!/usr/bin/env node
/**
 * ANI-Skills Ultra Package Installer v2.1 (Smart Zero-Lag Edition)
 * ===============================================================
 * High-performance, stack-aware AI agent installer featuring:
 * - Smart Workspace Stack Detection: installs strictly required skills to prevent editor lag
 * - Interactive Web GUI Popup with 1-Click Required-Only installer
 * - Zero-Lag CLI Auto Mode: filters 3,028 skills down to project essentials
 * - Full support for 15+ AI Coding Agents (Project & Global paths)
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const os = require('os');
const { exec, execSync } = require('child_process');

const projectRoot = path.dirname(__dirname);
const skillsSrc = path.join(projectRoot, 'skills');
const homeDir = process.env.HOME || process.env.USERPROFILE || os.homedir();
const cwd = process.cwd();

const { detectWorkspaceStack, resolveRequiredSkills, DETECTORS } = require('./detector.js');

// ─── AGENT DEFINITIONS ────────────────────────────────────────────────────────
function getAgents() {
  return [
    {
      id: 'vscode',
      name: 'VS Code (Claude Ext)',
      trigger: path.join(homeDir, '.vscode'),
      projectPath: path.join(cwd, '.vscode', 'skills'),
      globalPath: path.join(homeDir, '.vscode', 'skills'),
      docs: 'https://code.visualstudio.com/docs',
    },
    {
      id: 'antigravity',
      name: 'Antigravity IDE',
      trigger: path.join(homeDir, '.gemini', 'config'),
      projectPath: path.join(cwd, '.agents', 'skills'),
      globalPath: path.join(homeDir, '.gemini', 'config', 'skills'),
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
      id: 'cline',
      name: 'Cline / Roo Code',
      trigger: path.join(homeDir, '.cline'),
      projectPath: path.join(cwd, '.cline', 'skills'),
      globalPath: path.join(homeDir, '.cline', 'skills'),
      docs: 'https://github.com/cline/cline',
    },
    {
      id: 'aider',
      name: 'Aider CLI',
      trigger: path.join(homeDir, '.aider'),
      projectPath: path.join(cwd, '.aider', 'skills'),
      globalPath: path.join(homeDir, '.aider', 'skills'),
      docs: 'https://aider.chat/docs/',
    },
    {
      id: 'continue',
      name: 'Continue.dev',
      trigger: path.join(homeDir, '.continue'),
      projectPath: path.join(cwd, '.continue', 'skills'),
      globalPath: path.join(homeDir, '.continue', 'skills'),
      docs: 'https://continue.dev/docs',
    },
    {
      id: 'trae',
      name: 'Trae IDE',
      trigger: path.join(homeDir, '.trae'),
      projectPath: path.join(cwd, '.trae', 'skills'),
      globalPath: path.join(homeDir, '.trae', 'skills'),
      docs: 'https://trae.ai/docs',
    },
    {
      id: 'pearai',
      name: 'PearAI',
      trigger: path.join(homeDir, '.pearai'),
      projectPath: path.join(cwd, '.pearai', 'skills'),
      globalPath: path.join(homeDir, '.pearai', 'skills'),
      docs: 'https://trypear.ai/docs',
    },
    {
      id: 'goose',
      name: 'Goose / Block',
      trigger: path.join(homeDir, '.config', 'goose'),
      projectPath: path.join(cwd, '.goose', 'skills'),
      globalPath: path.join(homeDir, '.config', 'goose', 'skills'),
      docs: 'https://block.github.io/goose/',
    },
    {
      id: 'openhands',
      name: 'OpenHands',
      trigger: path.join(homeDir, '.openhands'),
      projectPath: path.join(cwd, '.openhands', 'skills'),
      globalPath: path.join(homeDir, '.openhands', 'skills'),
      docs: 'https://github.com/All-Hands-AI/OpenHands',
    },
    {
      id: 'zed',
      name: 'Zed IDE AI',
      trigger: path.join(homeDir, '.config', 'zed'),
      projectPath: path.join(cwd, '.zed', 'skills'),
      globalPath: path.join(homeDir, '.config', 'zed', 'skills'),
      docs: 'https://zed.dev/docs/ai',
    },
    {
      id: 'gemini-cli',
      name: 'Gemini CLI',
      trigger: path.join(homeDir, '.gemini'),
      projectPath: path.join(cwd, '.gemini', 'skills'),
      globalPath: path.join(homeDir, '.gemini', 'skills'),
      docs: 'https://geminicli.com/docs/cli/skills/',
    },
    {
      id: 'codex',
      name: 'Codex (OpenAI)',
      trigger: path.join(homeDir, '.agents'),
      projectPath: path.join(cwd, '.agents', 'skills'),
      globalPath: path.join(homeDir, '.agents', 'skills'),
      docs: 'https://developers.openai.com/codex/skills',
    }
  ];
}

// ─── CATEGORY DEFINITIONS ─────────────────────────────────────────────────────
function getCategories() {
  return [
    { id: 'all', name: '⚡ All Skills (Complete Suite)', count: 3028, desc: 'Installs all 3,028 skills across every category (May cause editor prompt latency)' },
    
    // --- AI & ML ---
    { id: 'ai:openai', name: '🤖 AI: OpenAI & GPT', count: 0, desc: 'GPT-4, ChatGPT, Codex' },
    { id: 'ai:anthropic', name: '🤖 AI: Anthropic & Claude', count: 0, desc: 'Claude, Constitutional AI' },
    { id: 'ai:gemini', name: '🤖 AI: Google Gemini', count: 0, desc: 'Gemini, Vertex AI' },
    { id: 'ai:huggingface', name: '🤖 AI: HuggingFace & OSS', count: 0, desc: 'Transformers, PEFT, Tokenizers' },
    { id: 'ai:models', name: '🤖 AI: Llama, Mistral & Open Models', count: 0, desc: 'Llama 3, Mistral, Mixtral, Qwen' },
    { id: 'ai:agents', name: '🤖 AI: Agents & Frameworks', count: 0, desc: 'LangChain, LlamaIndex, AutoGPT, CrewAI' },
    { id: 'ai:vision', name: '👁️ AI: Vision & Image Gen', count: 0, desc: 'Stable Diffusion, CLIP, SAM, Midjourney' },
    { id: 'ai:audio', name: '🔊 AI: Audio & Speech', count: 0, desc: 'Whisper, TTS, Audiocraft' },
    { id: 'ai:training', name: '🏋️ AI: Training & Fine-Tuning', count: 0, desc: 'LoRA, RLHF, PyTorch, DeepSpeed' },
    { id: 'ai:inference', name: '⚡ AI: Inference & Serving', count: 0, desc: 'vLLM, TensorRT, Quantization (GGUF/GPTQ)' },
    { id: 'ai:mlops', name: '🛠️ AI: MLOps & Eval', count: 0, desc: 'WandB, MLflow, Ray, Evals, Phoenix' },
    { id: 'ai:data', name: '🗄️ AI: Data & Scraping', count: 0, desc: 'Datasets, Pandas, SQL integrations' },
    { id: 'ai:research', name: '🔬 AI: Research & Papers', count: 0, desc: 'Arxiv, Research, Scholar' },
    { id: 'ai:other_a_f', name: '🤖 AI: Other (A-F)', count: 0, desc: 'General AI tools (A-F)' },
    { id: 'ai:other_g_m', name: '🤖 AI: Other (G-M)', count: 0, desc: 'General AI tools (G-M)' },
    { id: 'ai:other_n_s', name: '🤖 AI: Other (N-S)', count: 0, desc: 'General AI tools (N-S)' },
    { id: 'ai:other_t_z', name: '🤖 AI: Other (T-Z)', count: 0, desc: 'General AI tools (T-Z)' },

    // --- MARKETING ---
    { id: 'marketing:seo', name: '🔍 Mktg: SEO & Organic', count: 0, desc: 'On-page, Technical, Backlinks, Ahrefs' },
    { id: 'marketing:content', name: '📝 Mktg: Content Strategy', count: 0, desc: 'Blogging, Content Planning, Repurposing' },
    { id: 'marketing:copywriting', name: '✍️ Mktg: Copywriting', count: 0, desc: 'Sales Copy, Messaging, Hooks' },
    { id: 'marketing:social', name: '📱 Mktg: Social Media', count: 0, desc: 'Organic Social, Community' },
    { id: 'marketing:linkedin', name: '💼 Mktg: LinkedIn & B2B', count: 0, desc: 'B2B Outreach, LinkedIn Growth' },
    { id: 'marketing:twitter', name: '🐦 Mktg: Twitter/X', count: 0, desc: 'X/Twitter Growth, Threads' },
    { id: 'marketing:tiktok', name: '🎵 Mktg: TikTok & YouTube', count: 0, desc: 'Short-form Video, UGC, YouTube' },
    { id: 'marketing:ads_meta', name: '🎯 Mktg: Meta Ads (FB/IG)', count: 0, desc: 'Facebook & Instagram Paid Ads' },
    { id: 'marketing:ads_google', name: '🎯 Mktg: Google Ads', count: 0, desc: 'Google Search, PPC, Display' },
    { id: 'marketing:email', name: '✉️ Mktg: Email & Outreach', count: 0, desc: 'Cold Email, Newsletters, Sequences' },
    { id: 'marketing:analytics', name: '📊 Mktg: Analytics & Data', count: 0, desc: 'Attribution, Metrics, Tracking' },
    { id: 'marketing:growth', name: '🚀 Mktg: Growth & CRO', count: 0, desc: 'Conversion Rate, Growth Loops, Pricing' },
    { id: 'marketing:research', name: '🔬 Mktg: Research', count: 0, desc: 'Competitor, Market Research' },
    { id: 'marketing:strategy', name: '🗺️ Mktg: Strategy', count: 0, desc: 'Plans, Roadmaps, Launches' },
    { id: 'marketing:other_a_f', name: '📈 Mktg: Other (A-F)', count: 0, desc: 'General marketing tools (A-F)' },
    { id: 'marketing:other_g_m', name: '📈 Mktg: Other (G-M)', count: 0, desc: 'General marketing tools (G-M)' },
    { id: 'marketing:other_n_s', name: '📈 Mktg: Other (N-S)', count: 0, desc: 'General marketing tools (N-S)' },
    { id: 'marketing:other_t_z', name: '📈 Mktg: Other (T-Z)', count: 0, desc: 'General marketing tools (T-Z)' },

    // --- UI/DESIGN ---
    { id: 'ui:gsap', name: '✨ UI: GSAP Animations', count: 0, desc: 'ScrollTrigger, Timelines' },
    { id: 'ui:threejs', name: '🧊 UI: 3D, WebGL & Shaders', count: 0, desc: 'Three.js, WebGPU, GLSL' },
    { id: 'ui:react', name: '🧩 UI: React & Ecosystem', count: 0, desc: 'React, Next.js, Hooks' },
    { id: 'ui:components', name: '🧱 UI: Styling & Components', count: 0, desc: 'Tailwind, Shadcn, WPDS' },
    { id: 'ui:figma', name: '🎨 UI: Figma & Design Systems', count: 0, desc: 'Figma to Code, Design Tokens' },
    { id: 'ui:video', name: '🎥 UI: Video & Remotion', count: 0, desc: 'Remotion, Video Generation' },
    { id: 'ui:other_a_m', name: '✨ UI: Other (A-M)', count: 0, desc: 'General UI skills (A-M)' },
    { id: 'ui:other_n_z', name: '✨ UI: Other (N-Z)', count: 0, desc: 'General UI skills (N-Z)' },

    // --- OTHER CORE NAMESPACES ---
    { id: 'plan', name: '📋 Product Management & Specs', count: 202, desc: 'Product Manager skills, PRDs, roadmaps' },
    { id: 'db', name: '🗄️ Databases & Vector Search', count: 113, desc: 'DuckDB, ClickHouse, Redis, Qdrant' },
    { id: 'monitoring', name: '📊 APM & Observability', count: 112, desc: 'Sentry, Datadog, RCA traces' },
    { id: 'cloud', name: '☁️ Cloud, DevOps & Automation', count: 107, desc: 'Azure, AWS, Terraform, n8n' },
    { id: 'mobile', name: '📱 Mobile, iOS & Flutter', count: 83, desc: 'SwiftUI, Flutter, React Native' },
    { id: 'auth', name: '🔐 Auth & Identity Systems', count: 77, desc: 'Auth0, OAuth, JWT, session management' },
    { id: 'doc', name: '📄 Docs, PDF & Prose Engines', count: 75, desc: 'Mermaid, Unslop, Notion' },
    { id: 'security', name: '🛡️ Security & Hardening', count: 67, desc: 'Trail of Bits, OWASP' },
    { id: 'quality', name: '🎯 Code Quality & Safeguards', count: 52, desc: 'Canary, Careful guardrails, Freeze' },
    { id: 'test', name: '🧪 Test Automation & BDD', count: 50, desc: 'Playwright, Cypress, Vitest' },
    { id: 'api', name: '🔌 APIs & GraphQL', count: 50, desc: 'Apollo, REST, MCP servers' },
    { id: 'scraping', name: '🌐 Browser Automation & Scraping', count: 46, desc: 'Browserbase, Puppeteer' },
    { id: 'boss', name: '👑 Executive Boss Personas', count: 36, desc: 'Garry Tan, CSO, VP Eng' },
    { id: 'dsa', name: '🧮 Algorithmic DSA Workflows', count: 20, desc: 'Sliding window, dynamic programming' },
    { id: 'start', name: '🚀 Project Bootstrap', count: 6, desc: 'New project scaffolding' }
  ];
}

function shouldLink() {
  const isGit = fs.existsSync(path.join(projectRoot, '.git'));
  const isNodeModules = projectRoot.includes('node_modules');
  const isNpx = projectRoot.includes('npm-cache') || projectRoot.includes('_npx');
  return isGit && !isNodeModules && !isNpx;
}

const Subcategories = {
  'ai:openai': /openai|chatgpt|gpt-4|whisper|codex/i,
  'ai:anthropic': /anthropic|claude/i,
  'ai:gemini': /gemini|vertex|google ai/i,
  'ai:huggingface': /huggingface|transformers|peft|tokenizers|accelerate/i,
  'ai:models': /llama|mistral|mixtral|qwen|phi|gemma/i,
  'ai:agents': /agent|langchain|llamaindex|autogpt|crewai|dspy/i,
  'ai:vision': /vision|image|stable diffusion|clip|sam|midjourney|llava|blip|render/i,
  'ai:audio': /audio|speech|whisper|tts|audiocraft/i,
  'ai:training': /train|fine-tune|lora|rlhf|sft|dpo|pytorch|deepspeed|megatron|moe/i,
  'ai:inference': /infer|serve|vllm|tensorrt|quantiz|gguf|gptq|awq/i,
  'ai:mlops': /mlops|wandb|mlflow|ray|eval|phoenix|langsmith|tensorboard/i,
  'ai:data': /data|dataset|scrape|pandas|sql/i,
  'ai:research': /research|paper|arxiv|scholar/i,
  
  'marketing:seo': /seo|rank|keyword|backlink|sitemap|search console|ahrefs|serp/i,
  'marketing:content': /content|blog|article|newsletter|repurpose/i,
  'marketing:copywriting': /copywrit|messaging|hook|sales copy|angle|story/i,
  'marketing:social': /social|community/i,
  'marketing:linkedin': /linkedin|b2b/i,
  'marketing:twitter': /twitter|x\b|xquik|tweet/i,
  'marketing:tiktok': /tiktok|youtube|ugc|video/i,
  'marketing:ads_meta': /meta|facebook|instagram|fb ad/i,
  'marketing:ads_google': /google ad|ppc|sem/i,
  'marketing:email': /email|outreach|sequence|cold/i,
  'marketing:analytics': /analytic|metric|track|attribut|dashboard/i,
  'marketing:growth': /growth|cro|conversion|pricing|onboard|churn|retention/i,
  'marketing:research': /research|competitor|market/i,
  'marketing:strategy': /strategy|plan|roadmap|launch/i,

  'ui:gsap': /gsap|scrolltrigger|animat/i,
  'ui:threejs': /threejs|3d|webgpu|shader|webgl/i,
  'ui:react': /react|next\.js|hook/i,
  'ui:components': /tailwind|shadcn|component|wpds/i,
  'ui:figma': /figma|design system/i,
  'ui:video': /video|remotion/i
};

function matchesCategory(skill, allowedCategories) {
  if (allowedCategories.includes('all')) return true;
  
  const folder = (skill.path || '').replace(/^skills[\\\/]/, '');

  // Exact ID / Folder / Name Match
  if (allowedCategories.includes(skill.id)) return true;
  if (folder && allowedCategories.includes(folder)) return true;
  if (allowedCategories.includes(skill.name)) return true;
  
  const ns = skill.name.includes(':') ? skill.name.split(':')[0] : 'ai';
  
  for (const cat of allowedCategories) {
    if (cat === ns) return true;
    if (cat.includes(':')) {
      const regex = Subcategories[cat];
      if (regex && (regex.test(skill.description) || regex.test(skill.name) || regex.test(skill.id))) {
        return true;
      }
      if (cat.includes(':other_')) {
        const prefix = cat.split(':')[0];
        if (ns === prefix) {
          let matchedAnyRegex = false;
          for (let key in Subcategories) {
            if (key.startsWith(prefix + ':') && (Subcategories[key].test(skill.name) || Subcategories[key].test(skill.description) || Subcategories[key].test(skill.id))) {
              matchedAnyRegex = true;
              break;
            }
          }
          if (!matchedAnyRegex) {
            const char = skill.name.replace(prefix + ':', '').toLowerCase().charAt(0);
            if (cat.endsWith('_a_f') && char >= 'a' && char <= 'f') return true;
            if (cat.endsWith('_g_m') && char >= 'g' && char <= 'm') return true;
            if (cat.endsWith('_n_s') && char >= 'n' && char <= 's') return true;
            if (cat.endsWith('_t_z') && char >= 't' && char <= 'z') return true;
            if (cat.endsWith('_a_m') && char >= 'a' && char <= 'm') return true;
            if (cat.endsWith('_n_z') && char >= 'n' && char <= 'z') return true;
          }
        }
      }
    }
  }
  return false;
}

function getSkillsIndex() {
  try {
    const p = path.join(projectRoot, 'skills_index.json');
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (_) {
    return [];
  }
}

function downloadSkills(selectedCategories) {
  const index = getSkillsIndex();
  let foldersToCheckout = [];
  index.forEach(skill => {
    if (matchesCategory(skill, selectedCategories)) {
      foldersToCheckout.push(skill.path);
    }
  });

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ani-skills-'));
  
  if (selectedCategories.includes('all')) {
    console.log("> Downloading all skills from GitHub repository (Complete Suite)...");
    execSync('git clone --depth 1 https://github.com/usernamezain/ANI-Skills.git .', { cwd: tempDir, stdio: 'ignore' });
  } else {
    console.log(`> Downloading ${foldersToCheckout.length} required skills via fast sparse-checkout...`);
    execSync('git clone --depth 1 --filter=blob:none --sparse https://github.com/usernamezain/ANI-Skills.git .', { cwd: tempDir, stdio: 'ignore' });
    
    if (foldersToCheckout.length > 0) {
      try {
        execSync('git sparse-checkout set --stdin', {
          cwd: tempDir,
          input: foldersToCheckout.join('\n'),
          stdio: ['pipe', 'ignore', 'ignore']
        });
      } catch (_) {
        const chunk = foldersToCheckout.slice(0, 40).join(' ');
        execSync(`git sparse-checkout set ${chunk}`, { cwd: tempDir, stdio: 'ignore' });
      }
    }
  }
  return path.join(tempDir, 'skills');
}

function ensureSkillsAvailable(selectedCategories) {
  const index = getSkillsIndex();
  let foldersNeeded = [];
  index.forEach(skill => {
    if (matchesCategory(skill, selectedCategories)) {
      foldersNeeded.push(skill.path);
    }
  });

  const localGit = path.join(projectRoot, '.git');
  if (fs.existsSync(localGit) && foldersNeeded.length > 0 && !selectedCategories.includes('all')) {
    const missing = foldersNeeded.filter(p => !fs.existsSync(path.join(projectRoot, p)));
    if (missing.length > 0) {
      console.log(`> Materializing ${missing.length} required skill folders from local repository...`);
      const chunkSize = 40;
      for (let i = 0; i < missing.length; i += chunkSize) {
        const chunk = missing.slice(i, i + chunkSize);
        try {
          execSync(`git checkout HEAD -- ${chunk.join(' ')}`, { cwd: projectRoot, stdio: 'ignore' });
        } catch (_) {}
      }
    }
    if (fs.existsSync(skillsSrc) && fs.readdirSync(skillsSrc).length > 0) {
      return skillsSrc;
    }
  }

  if (!global.downloadedSkillsSrc) {
    global.downloadedSkillsSrc = downloadSkills(selectedCategories);
  }
  return global.downloadedSkillsSrc;
}

function copyRecursiveFiltered(src, dest, allowedCategories) {
  if (!fs.existsSync(src)) return 0;
  let copied = 0;
  fs.mkdirSync(dest, { recursive: true });

  const folders = fs.readdirSync(src);
  const isAll = allowedCategories.includes('all');
  const index = getSkillsIndex();

  for (const folder of folders) {
    const folderPath = path.join(src, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    let include = isAll;
    if (!include) {
      const skill = index.find(s => s.path === 'skills/' + folder) || { id: folder, name: folder, path: 'skills/' + folder };
      if (matchesCategory(skill, allowedCategories)) {
        include = true;
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
  const activeSrc = ensureSkillsAvailable(selectedCategories);

  if (mode === 'project' || mode === 'both') {
    if (!isAll && fs.existsSync(agent.projectPath)) {
      try { fs.rmSync(agent.projectPath, { recursive: true, force: true }); } catch (_) {}
    }

    if (isAll && shouldLink()) {
      try {
        const type = process.platform === 'win32' ? 'junction' : 'dir';
        if (fs.existsSync(agent.projectPath)) fs.rmSync(agent.projectPath, { recursive: true, force: true });
        fs.mkdirSync(path.dirname(agent.projectPath), { recursive: true });
        fs.symlinkSync(activeSrc, agent.projectPath, type);
        results.paths.push(`${agent.projectPath} (symlinked all)`);
        results.count = 3028;
      } catch (_) {
        const count = copyRecursiveFiltered(activeSrc, agent.projectPath, selectedCategories);
        results.paths.push(agent.projectPath);
        results.count = count;
      }
    } else {
      const count = copyRecursiveFiltered(activeSrc, agent.projectPath, selectedCategories);
      results.paths.push(agent.projectPath);
      results.count = count;
    }
  }

  if (mode === 'global' || mode === 'both') {
    if (!isAll && fs.existsSync(agent.globalPath)) {
      try { fs.rmSync(agent.globalPath, { recursive: true, force: true }); } catch (_) {}
    }

    if (isAll && shouldLink()) {
      try {
        const type = process.platform === 'win32' ? 'junction' : 'dir';
        if (fs.existsSync(agent.globalPath)) fs.rmSync(agent.globalPath, { recursive: true, force: true });
        fs.mkdirSync(path.dirname(agent.globalPath), { recursive: true });
        fs.symlinkSync(activeSrc, agent.globalPath, type);
        results.paths.push(`${agent.globalPath} (symlinked all)`);
      } catch (_) {
        copyRecursiveFiltered(activeSrc, agent.globalPath, selectedCategories);
        results.paths.push(agent.globalPath);
      }
    } else {
      copyRecursiveFiltered(activeSrc, agent.globalPath, selectedCategories);
      results.paths.push(agent.globalPath);
    }
  }

  return results;
}

function generateRulesFiles(detection = null) {
  const agents = getAgents();
  const agentPathList = agents.map(a =>
    `  ${a.name.padEnd(20)} project: ${a.projectPath}\n` +
    `${''.padEnd(24)} global:  ${a.globalPath}`
  ).join('\n');

  const techTitle = detection && detection.technologies && detection.technologies.length > 0
    ? detection.technologies.join(', ')
    : 'Universal Project Baseline';

  const skillCountText = detection ? `${detection.stats.requiredCount} skills (Zero-Lag Precision Profile)` : 'Precision Skill Profile';

  const activeSkillsList = detection && detection.requiredSkills && detection.requiredSkills.length > 0
    ? detection.requiredSkills.map(s => `- \`/${s.name.replace(':', '-')}\`: ${s.description ? s.description.slice(0, 110) + '...' : s.name}`).slice(0, 35).join('\n')
    : `- \`/git-workflow\`: Clean commit and PR branching hygiene\n- \`/debug-systematic\`: Hypothesis-driven systematic debugging\n- \`/quality-review\`: Code quality and safety guardrails`;

  const content = `# ANI-Skills Ultra — Optimized Project Context
# Detected Stack: ${techTitle}
# Active Required Profile: ${skillCountText}

## Configured Agent Registry Paths
${agentPathList}

## Active Project Directives
${activeSkillsList}

## Execution Policy
1. When matching a directive, read \`.agents/skills/<folder>/SKILL.md\` and its \`references/\` assets.
2. Only load skills strictly required for the immediate task to preserve context window and maintain zero latency.
`;

  const files = ['.cursorrules', '.windsurfrules', '.traerules', '.clinerules', '.roomodes', '.geminirules', '.copilot-rules', '.vscoderules', '.clauderules'];
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
  
  const allSkills = getSkillsIndex();
  const detection = resolveRequiredSkills(cwd, allSkills);

  categories.forEach(cat => {
    if (cat.id !== 'all') {
      cat.skills = allSkills.filter(s => matchesCategory(s, [cat.id]));
      cat.count = cat.skills.length;
    }
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ANI-Skills Ultra Installer | Smart Zero-Lag Edition</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <style>
    :root {
      --bg: #09090b; --card-bg: rgba(24, 24, 27, 0.75); --card-border: #27272a;
      --text: #fafafa; --text-muted: #a1a1aa; --accent: #3b82f6; --highlight: #22c55e;
      --brand: #f59e0b;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { background: var(--bg); color: var(--text); overflow-x: hidden; padding-bottom: 60px; }
    .bg-gradient { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: radial-gradient(circle at 50% 20%, #1e1b4b 0%, #09090b 80%); z-index: -2; }
    .container { max-width: 1020px; margin: 0 auto; padding: 40px 20px; }
    
    .promo-header { text-align: center; margin-bottom: 30px; border-bottom: 1px solid var(--card-border); padding-bottom: 20px; }
    .brand-title { font-size: 26px; font-weight: 800; letter-spacing: 1px; margin-bottom: 6px; background: linear-gradient(90deg, #f59e0b, #ef4444); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    
    .smart-card {
      background: linear-gradient(135deg, rgba(30, 58, 138, 0.35) 0%, rgba(17, 24, 39, 0.8) 100%);
      border: 1px solid rgba(59, 130, 246, 0.4);
      border-radius: 14px;
      padding: 24px;
      margin-bottom: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .smart-badge { display: inline-flex; align-items: center; gap: 6px; background: #22c55e; color: #000; font-size: 11px; font-weight: 800; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; margin-bottom: 12px; }
    .smart-title { font-size: 22px; font-weight: 800; margin-bottom: 8px; color: #fff; }
    .smart-desc { font-size: 14px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px; }
    .tech-pill { display: inline-block; background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); color: #93c5fd; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: 600; margin: 0 4px 6px 0; }
    
    .btn-smart { background: #22c55e; color: #000; font-weight: 800; border: none; padding: 14px 28px; border-radius: 8px; font-size: 15px; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 14px rgba(34,197,94,0.3); }
    .btn-smart:hover { background: #16a34a; transform: translateY(-2px); }
    
    .section-title { font-size: 20px; font-weight: 700; margin: 30px 0 16px; display: flex; justify-content: space-between; align-items: center; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px; }
    
    .card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 12px; padding: 16px; cursor: pointer; transition: 0.2s; }
    .card:hover { border-color: #52525b; }
    .card.selected { border-color: var(--accent); background: rgba(30, 41, 59, 0.7); }
    .card-header { display: flex; align-items: flex-start; gap: 12px; }
    .checkbox { margin-top: 3px; accent-color: var(--accent); width: 18px; height: 18px; cursor: pointer; }
    .card-name { font-size: 15px; font-weight: 700; margin-bottom: 4px; display: flex; justify-content: space-between; }
    .card-desc { font-size: 13px; color: var(--text-muted); line-height: 1.4; }
    .btn-row { display: flex; gap: 16px; margin: 30px 0; }
    .btn { background: #fff; color: #000; border: none; padding: 14px 28px; border-radius: 8px; font-size: 15px; font-weight: 700; cursor: pointer; transition: 0.2s; flex: 1; }
    .btn:hover { transform: translateY(-2px); }
    .btn-secondary { background: transparent; color: #fff; border: 1px solid var(--card-border); }
    #log { margin-top: 20px; padding: 16px; background: #000; border: 1px solid #27272a; border-radius: 8px; font-family: monospace; font-size: 13px; color: #22c55e; white-space: pre-wrap; display: none; }
  </style>
</head>
<body>
  <div class="bg-gradient"></div>
  
  <div class="container">
    <div class="promo-header">
      <div class="brand-title">⚡ ANI-Skills Ultra (Smart Zero-Lag Edition)</div>
      <p style="color:var(--text-muted); font-size:14px;">Precision-matched AI agent skills tailored specifically to your active project.</p>
    </div>

    <!-- Smart Project Detection Card -->
    <div class="smart-card">
      <div class="smart-badge">🎯 Workspace Auto-Detection</div>
      <div class="smart-title">${detection.pkgName}</div>
      <div class="smart-desc">
        Detected Project Stack:
        <div style="margin: 8px 0;">
          ${detection.technologies.length > 0 ? detection.technologies.map(t => `<span class="tech-pill">${t}</span>`).join('') : '<span class="tech-pill">Universal Project Baseline</span>'}
        </div>
        Identified <strong>${detection.stats.requiredCount} strictly required skills</strong> (out of ${detection.stats.totalAvailable}).
        Installing only required skills eliminates editor autocomplete latency and keeps prompt inputs fast.
      </div>
      <button class="btn-smart" onclick="installRequiredOnly()">
        ⚡ Install ${detection.stats.requiredCount} Required Skills (Recommended · Zero-Lag)
      </button>
    </div>

    <div class="section-title">1. Target AI Assistants</div>
    <div class="grid agent-grid">
      ${agents.map(a => `
        <div class="card ${a.detected ? 'selected' : ''}" onclick="toggleCb(this, event)">
          <div class="card-header">
            <input type="checkbox" class="checkbox agent-cb" value="${a.id}" ${a.detected ? 'checked' : ''}>
            <div style="flex:1">
              <div class="card-name">${a.name} ${a.detected ? '<span style="color:#22c55e;font-size:12px;background:rgba(34,197,94,0.1);padding:2px 8px;border-radius:12px">Detected</span>' : ''}</div>
              <div class="card-desc">Target: ${a.projectPath}</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="section-title">
      <span>2. Manual Customization & Categories</span>
      <span style="font-size:13px; color:var(--text-muted); cursor:pointer;" onclick="toggleAllCats(this)">Select All (Not Recommended)</span>
    </div>
    
    <div class="grid cat-grid">
      ${categories.map(c => `
        <div class="card" onclick="toggleCb(this, event)">
          <div class="card-header">
            <input type="checkbox" class="checkbox cat-cb" value="${c.id}">
            <div style="flex:1">
              <div class="card-name">${c.name} ${c.count > 0 ? `<span style="color:#a1a1aa;font-size:12px">(${c.count})</span>` : ''}</div>
              <div class="card-desc">${c.desc}</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="btn-row">
      <button class="btn btn-secondary" onclick="window.close()">Cancel</button>
      <button class="btn" id="installBtn" onclick="installCustom()">Install Selected Categories</button>
    </div>
    <div id="log"></div>
  </div>

  <script>
    window.REQUIRED_SKILL_IDS = ${JSON.stringify(detection.requiredSkillIds)};

    function toggleCb(card, e) {
      if (e && e.target && e.target.tagName.toLowerCase() === 'input') return;
      const cb = card.querySelector('.checkbox');
      if (cb) {
        cb.checked = !cb.checked;
        if (cb.checked) card.classList.add('selected');
        else card.classList.remove('selected');
      }
    }

    function toggleAllCats(el) {
      const isSelectAll = el.innerText.includes('Select All');
      document.querySelectorAll('.cat-cb').forEach(cb => {
        cb.checked = isSelectAll;
        const card = cb.closest('.card');
        if (isSelectAll) card.classList.add('selected');
        else card.classList.remove('selected');
      });
      el.innerText = isSelectAll ? 'Deselect All' : 'Select All (Not Recommended)';
    }

    async function executeInstall(categories) {
      const agents = Array.from(document.querySelectorAll('.agent-cb:checked')).map(cb => cb.value);
      if (agents.length === 0) return alert('Please select at least one AI assistant');

      const log = document.getElementById('log');
      log.style.display = 'block';
      log.innerHTML = '> Starting smart precision installation...\n';

      try {
        const res = await fetch('/api/install', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agents, categories, mode: 'both' })
        });

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          log.innerHTML += decoder.decode(value);
          log.scrollTop = log.scrollHeight;
        }
      } catch (err) {
        log.innerHTML += '\\n> Error: ' + err.message;
      }
    }

    function installRequiredOnly() {
      executeInstall(window.REQUIRED_SKILL_IDS);
    }

    function installCustom() {
      const selected = Array.from(document.querySelectorAll('.cat-cb:checked')).map(cb => cb.value);
      if (selected.length === 0) return alert('Please select at least one category or click Install Required Only');
      executeInstall(selected);
    }
  </script>
</body>
</html>`;

  const server = require('http').createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } else if (req.method === 'POST' && req.url === '/api/install') {
      let body = '';
      req.on('data', chunk => body += chunk.toString());
      req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain', 'Transfer-Encoding': 'chunked' });
        try {
          const data = JSON.parse(body);
          res.write('> Starting precision installation...\n');
          
          const activeSrc = ensureSkillsAvailable(data.categories);
          res.write('> Required skills prepared.\n');

          const targetAgents = getAgents().filter(a => data.agents.includes(a.id));
          targetAgents.forEach(agent => {
            res.write(`> Configuring ${agent.name}...\n`);
            const results = installToAgent(agent, data.categories, data.mode);
            res.write(`> \u2714 Installed ${results.count} skills to ${agent.name}.\n`);
          });

          res.write('> Generating project-optimized rules files...\n');
          generateRulesFiles(detection);
          res.write('> \u2714 Rules files generated.\n');
          res.write('> \u2728 Installation complete! Lag-free skills are now active.\n');
          res.end();
          
          setTimeout(() => {
            console.log('Installation complete. Shutting down server...');
            process.exit(0);
          }, 2000);
          
        } catch (err) {
          res.write(`> Error: ${err.message}\n`);
          res.end();
        }
      });
    }
  });

  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`\n\x1b[36m🚀 Starting ANI-Skills Ultra Installer at ${url}\x1b[0m\n`);
    if (callback) callback(url);
  });
}

function openBrowser(url) {
  const cmd = process.platform === 'win32' ? `start "" "${url}"` :
              process.platform === 'darwin' ? `open "${url}"` : `xdg-open "${url}"`;
  exec(cmd, () => {});
}

// ─── CLI BANNER & AUTO INSTALLER ──────────────────────────────────────────────
function showCliBanner() {
  console.log(`
╔══════════════════════════════════════════════════════════════════════╗
║         ANI-SKILLS ULTRA — SMART REQUIRED-ONLY INSTALLER             ║
║           Zero-Lag · Stack-Aware · Precision AI Skills               ║
╚══════════════════════════════════════════════════════════════════════╝
`);
}

function runCliSmartInstall(options = {}) {
  showCliBanner();
  const allSkills = getSkillsIndex();
  const detection = resolveRequiredSkills(cwd, allSkills);

  console.log(`\x1b[36m🔍 Scanning workspace for project technologies...\x1b[0m`);
  console.log(`📁 Project Directory: ${cwd}`);
  
  if (detection.technologies.length > 0) {
    console.log(`\x1b[32m✔ Detected Tech Stack:\x1b[0m ${detection.technologies.join(', ')}`);
  } else {
    console.log(`\x1b[33mℹ Universal Coding Baseline detected.\x1b[0m`);
  }

  const isAllForced = options.all === true;
  const targetCategories = isAllForced ? ['all'] : detection.requiredSkillIds;

  console.log(`\n\x1b[35m🎯 Installation Strategy:\x1b[0m ${isAllForced ? '⚡ ALL Skills (3,028 skills - may cause lag)' : `🎯 Required Only (${detection.stats.requiredCount} skills, ${detection.stats.reductionPercent} bloat reduction)`}`);
  
  if (!isAllForced) {
    console.log(`\x1b[32m⚡ Zero-Lag Mode Active:\x1b[0m Only installing skills matching active stack to ensure editor prompt remains fast.\n`);
  }

  if (options.dryRun) {
    console.log('--- PREVIEW: Required Skills to be Installed ---');
    detection.requiredSkills.forEach(s => console.log(`  - [${s.name}] (${s.id})`));
    console.log(`\nTotal: ${detection.stats.requiredCount} skills.`);
    return;
  }

  const agents = getAgents();
  let configured = 0;

  agents.forEach(agent => {
    if (fs.existsSync(agent.trigger)) {
      const res = installToAgent(agent, targetCategories, 'both');
      console.log(`  [✓] ${agent.name} configured (${res.count} skills)`);
      configured++;
    } else {
      console.log(`  [–] ${agent.name} (not detected)`);
    }
  });

  generateRulesFiles(detection);
  console.log(`\n\x1b[32m✓ Configured ${configured} / ${agents.length} detected agents with required skills.\x1b[0m`);
}

// ─── ENTRY POINT ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const isAll = args.includes('--all');
const isDryRun = args.includes('--dry-run');
const isSmart = args.includes('--smart') || args.includes('--required') || args.includes('--detect');
const isAuto = args.includes('--auto') || args.includes('--yes') || args.includes('-y') || !process.stdout.isTTY;
const isCliOnly = args.includes('--cli');

if (isDryRun) {
  runCliSmartInstall({ all: isAll, dryRun: true });
} else if (isAuto || isSmart || isCliOnly) {
  runCliSmartInstall({ all: isAll, dryRun: false });
} else {
  showCliBanner();
  console.log('Launching Interactive Web GUI in browser...');
  startGuiServer((url) => {
    openBrowser(url);
  });
}
