/**
 * ANI-Skills Ultra — Smart Project Stack Detector & Precision Skill Matcher
 * =========================================================================
 * Analyzes workspace dependencies, config files, and file structures to detect
 * the exact technologies used by a project. Resolves only the required skills
 * from the 3,028+ skills library to eliminate prompt lag, UI freezing, and bloat.
 */

const fs = require('fs');
const path = require('path');

// ─── TECHNOLOGY SIGNALS & SKILL PATTERNS ─────────────────────────────────────
const DETECTORS = [
  // --- Frontend & UI ---
  {
    id: 'react',
    name: 'React',
    group: 'Frontend',
    detect: (pkg, files) => hasDep(pkg, ['react', 'react-dom']) || files.has('react'),
    patterns: [
      /^react:/i,
      /react-best-practices/i,
      /composition-patterns/i,
      /stitch--react-components/i,
      /react-vite-dashboard/i
    ],
    exclude: [/marketing|reactivation|mobile|native/i]
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    group: 'Frontend',
    detect: (pkg, files) => hasDep(pkg, ['next']) || files.has('next.config.js') || files.has('next.config.mjs') || files.has('next.config.ts'),
    patterns: [
      /^next:/i,
      /vercel-next-skills/i,
      /sentry-nextjs-sdk/i
    ],
    exclude: [/next-gen|marketing|plan:next$/i]
  },
  {
    id: 'tailwind',
    name: 'TailwindCSS / Styling',
    group: 'Frontend',
    detect: (pkg, files) => hasDep(pkg, ['tailwindcss', '@tailwindcss/vite', '@tailwindcss/postcss']) || files.has('tailwind.config.js') || files.has('tailwind.config.ts'),
    patterns: [
      /fluid-responsive-layout/i,
      /ui-ux-pro-max/i,
      /frontend-ui-engineering/i,
      /frontend-design/i
    ]
  },
  {
    id: 'shadcn',
    name: 'Shadcn / Radix UI',
    group: 'Frontend',
    detect: (pkg, files) => hasDep(pkg, ['@radix-ui/react-primitive', '@radix-ui/react-dialog', 'lucide-react']) || files.has('components.json'),
    patterns: [
      /frontend-ui-engineering/i,
      /ui-ux-pro-max/i
    ]
  },
  {
    id: 'gsap',
    name: 'GSAP Animation',
    group: 'Animation',
    detect: (pkg) => hasDep(pkg, ['gsap', '@gsap/shockingly']),
    patterns: [
      /(^|[-:_])gsap([-_:]|$)/i,
      /scrolltrigger/i,
      /precision-easing-motion-design/i
    ]
  },
  {
    id: 'threejs',
    name: 'Three.js / 3D & WebGL',
    group: 'Animation',
    detect: (pkg) => hasDep(pkg, ['three', '@types/three', '@react-three/fiber', '@react-three/drei']),
    patterns: [
      /(^|[-:_])three([-_:]|$)/i,
      /(^|[-:_])threejs([-_:]|$)/i,
      /three-cursor-particle/i,
      /three-carousel-slider/i,
      /threejs-interactive-backgrounds/i
    ]
  },
  {
    id: 'webgpu',
    name: 'WebGPU / Shaders',
    group: 'Animation',
    detect: (pkg, files) => hasDep(pkg, ['@webgpu/types', 'wgpu']) || files.has('shaders'),
    patterns: [
      /webgpu/i,
      /shader/i
    ]
  },
  {
    id: 'remotion',
    name: 'Remotion (React Video)',
    group: 'Video',
    detect: (pkg) => hasDep(pkg, ['remotion', '@remotion/cli']),
    patterns: [
      /remotion/i,
      /slack-gif-creator/i
    ]
  },
  {
    id: 'angular',
    name: 'Angular',
    group: 'Frontend',
    detect: (pkg, files) => hasDep(pkg, ['@angular/core', '@angular/common']) || files.has('angular.json'),
    patterns: [
      /^angular:/i,
      /angular-developer/i,
      /angular-new-app/i
    ]
  },

  // --- Databases & Vector Search ---
  {
    id: 'neon',
    name: 'Neon Postgres',
    group: 'Database',
    detect: (pkg, files, py) => hasDep(pkg, ['@neondatabase/serverless', 'neon']) || hasPy(py, ['neon-postgres']),
    patterns: [
      /(^|[-:_])neon([-_:]|$)/i
    ]
  },
  {
    id: 'clickhouse',
    name: 'ClickHouse',
    group: 'Database',
    detect: (pkg, files, py) => hasDep(pkg, ['@clickhouse/client', 'clickhouse']) || hasPy(py, ['clickhouse-connect', 'clickhouse-driver']),
    patterns: [
      /clickhouse/i
    ]
  },
  {
    id: 'duckdb',
    name: 'DuckDB',
    group: 'Database',
    detect: (pkg, files, py) => hasDep(pkg, ['duckdb', '@duckdb/duckdb-wasm']) || hasPy(py, ['duckdb']),
    patterns: [
      /duckdb/i
    ]
  },
  {
    id: 'supabase',
    name: 'Supabase',
    group: 'Database',
    detect: (pkg, files, py) => hasDep(pkg, ['@supabase/supabase-js', '@supabase/ssr']) || hasPy(py, ['supabase']) || files.has('supabase'),
    patterns: [
      /supabase/i
    ]
  },
  {
    id: 'redis',
    name: 'Redis',
    group: 'Database',
    detect: (pkg, files, py) => hasDep(pkg, ['redis', 'ioredis']) || hasPy(py, ['redis', 'aioredis']),
    patterns: [
      /redis/i
    ]
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    group: 'Database',
    detect: (pkg, files, py) => hasDep(pkg, ['mongodb', 'mongoose']) || hasPy(py, ['pymongo', 'motor']),
    patterns: [
      /mongodb/i,
      /(^|[-:_])mongo([-_:]|$)/i
    ]
  },
  {
    id: 'qdrant',
    name: 'Qdrant Vector DB',
    group: 'Database',
    detect: (pkg, files, py) => hasDep(pkg, ['@qdrant/js-client-rest']) || hasPy(py, ['qdrant-client']),
    patterns: [
      /qdrant/i
    ]
  },
  {
    id: 'postgres_general',
    name: 'PostgreSQL / SQL',
    group: 'Database',
    detect: (pkg, files, py) => hasDep(pkg, ['pg', 'postgres', 'drizzle-orm', 'prisma', 'knex', 'typeorm']) || hasPy(py, ['psycopg2', 'asyncpg', 'sqlalchemy']),
    patterns: [
      /claimable-postgres/i,
      /neon-postgres/i
    ]
  },

  // --- Cloud & Infrastructure ---
  {
    id: 'cloudflare',
    name: 'Cloudflare Workers / Pages',
    group: 'Cloud',
    detect: (pkg, files) => hasDep(pkg, ['wrangler', '@cloudflare/workers-types']) || files.has('wrangler.toml') || files.has('wrangler.json'),
    patterns: [
      /cloudflare/i
    ]
  },
  {
    id: 'netlify',
    name: 'Netlify',
    group: 'Cloud',
    detect: (pkg, files) => hasDep(pkg, ['@netlify/functions', 'netlify-cli']) || files.has('netlify.toml'),
    patterns: [
      /netlify/i
    ]
  },
  {
    id: 'terraform',
    name: 'Terraform',
    group: 'Cloud',
    detect: (pkg, files, py, fileList) => fileList.some(f => f.endsWith('.tf') || f.endsWith('.tfvars')),
    patterns: [
      /terraform/i
    ]
  },
  {
    id: 'docker',
    name: 'Docker & Containers',
    group: 'DevOps',
    detect: (pkg, files) => files.has('Dockerfile') || files.has('docker-compose.yml') || files.has('compose.yaml') || files.has('.dockerignore'),
    patterns: [
      /ci-cd-and-automation/i,
      /cicd-pipeline-skill/i
    ]
  },

  // --- Testing Frameworks ---
  {
    id: 'playwright',
    name: 'Playwright E2E',
    group: 'Testing',
    detect: (pkg, files) => hasDep(pkg, ['@playwright/test', 'playwright']) || files.has('playwright.config.js') || files.has('playwright.config.ts'),
    patterns: [
      /playwright/i,
      /browser-testing-with-devtools/i,
      /webapp-testing/i
    ]
  },
  {
    id: 'vitest',
    name: 'Vitest Unit Testing',
    group: 'Testing',
    detect: (pkg, files) => hasDep(pkg, ['vitest']) || files.has('vitest.config.js') || files.has('vitest.config.ts'),
    patterns: [
      /vitest/i
    ]
  },
  {
    id: 'jest',
    name: 'Jest Testing',
    group: 'Testing',
    detect: (pkg, files) => hasDep(pkg, ['jest', '@types/jest']) || files.has('jest.config.js') || files.has('jest.config.ts'),
    patterns: [
      /(^|[-:_])jest([-_:]|$)/i
    ]
  },
  {
    id: 'cypress',
    name: 'Cypress',
    group: 'Testing',
    detect: (pkg, files) => hasDep(pkg, ['cypress']) || files.has('cypress.config.js') || files.has('cypress.config.ts'),
    patterns: [
      /cypress/i
    ]
  },
  {
    id: 'pytest',
    name: 'Pytest (Python)',
    group: 'Testing',
    detect: (pkg, files, py) => hasPy(py, ['pytest']) || files.has('pytest.ini'),
    patterns: [
      /pytest/i
    ]
  },

  // --- AI / LLM Frameworks ---
  {
    id: 'openai',
    name: 'OpenAI API',
    group: 'AI',
    detect: (pkg, files, py) => hasDep(pkg, ['openai']) || hasPy(py, ['openai']),
    patterns: [
      /openai/i
    ]
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    group: 'AI',
    detect: (pkg, files, py) => hasDep(pkg, ['@google/genai', '@google/generative-ai']) || hasPy(py, ['google-generativeai', 'google-genai']),
    patterns: [
      /gemini/i
    ]
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    group: 'AI',
    detect: (pkg, files, py) => hasDep(pkg, ['@anthropic-ai/sdk']) || hasPy(py, ['anthropic']),
    patterns: [
      /claude-api/i
    ]
  },
  {
    id: 'huggingface',
    name: 'HuggingFace & Transformers',
    group: 'AI',
    detect: (pkg, files, py) => hasDep(pkg, ['@huggingface/inference']) || hasPy(py, ['transformers', 'peft', 'accelerate', 'tokenizers', 'diffusers']),
    patterns: [
      /huggingface/i,
      /transformers/i
    ]
  },
  {
    id: 'pytorch',
    name: 'PyTorch / Deep Learning',
    group: 'AI',
    detect: (pkg, files, py) => hasPy(py, ['torch', 'torchvision', 'torchtitan', 'deepspeed']),
    patterns: [
      /deepspeed/i,
      /pytorch/i,
      /torchtitan/i
    ]
  },
  {
    id: 'agents_framework',
    name: 'AI Agent Frameworks (LangChain / LlamaIndex)',
    group: 'AI',
    detect: (pkg, files, py) => hasDep(pkg, ['langchain', '@langchain/core', 'llamaindex']) || hasPy(py, ['langchain', 'llama-index', 'crewai', 'autogen', 'dspy']),
    patterns: [
      /multi-agent-patterns/i,
      /dispatching-parallel-agents/i,
      /subagent-driven-development/i
    ]
  },

  // --- Mobile Frameworks ---
  {
    id: 'flutter',
    name: 'Flutter (Dart)',
    group: 'Mobile',
    detect: (pkg, files) => files.has('pubspec.yaml'),
    patterns: [
      /flutter/i
    ]
  },
  {
    id: 'react_native',
    name: 'React Native / Expo',
    group: 'Mobile',
    detect: (pkg, files) => hasDep(pkg, ['react-native', 'expo']) || files.has('app.json'),
    patterns: [
      /react-native/i,
      /detox-skill/i
    ]
  },
  {
    id: 'ios_swift',
    name: 'iOS / SwiftUI',
    group: 'Mobile',
    detect: (pkg, files, py, fileList) => files.has('Podfile') || files.has('Package.swift') || fileList.some(f => f.endsWith('.xcodeproj') || f.endsWith('.xcworkspace')),
    patterns: [
      /xcuitest/i,
      /apple-hig/i,
      /hig-doctor/i
    ]
  },

  // --- Payments & Auth ---
  {
    id: 'stripe',
    name: 'Stripe Payments',
    group: 'Fintech',
    detect: (pkg, files, py) => hasDep(pkg, ['stripe', '@stripe/stripe-js']) || hasPy(py, ['stripe']),
    patterns: [
      /stripe/i
    ]
  },
  {
    id: 'auth_systems',
    name: 'Authentication & Identity',
    group: 'Security',
    detect: (pkg) => hasDep(pkg, ['@auth0/auth0-spa-js', '@clerk/nextjs', 'next-auth', '@auth/core', 'better-auth', 'lucia']),
    patterns: [
      /better-auth/i,
      /create-auth/i,
      /email-and-password/i,
      /two-factor-authentication/i
    ]
  },

  // --- Monitoring & APM ---
  {
    id: 'sentry',
    name: 'Sentry Observability',
    group: 'Monitoring',
    detect: (pkg, files, py) => hasDep(pkg, ['@sentry/nextjs', '@sentry/react', '@sentry/node']) || hasPy(py, ['sentry-sdk']),
    patterns: [
      /sentry/i
    ]
  },
  {
    id: 'datadog',
    name: 'Datadog APM',
    group: 'Monitoring',
    detect: (pkg, files, py) => hasDep(pkg, ['dd-trace', '@datadog/browser-rum']) || hasPy(py, ['ddtrace']),
    patterns: [
      /datadog/i
    ]
  }
];

// ─── UNIVERSAL CORE ENGINEERING SKILLS ─────────────────────────────────────────
// Essential hygiene skills installed for any active code repository
const UNIVERSAL_CORE_SKILLS = [
  // Git hygiene
  'git-workflow-and-versioning',
  'finishing-a-development-branch',
  'pr-branch',
  
  // Debugging & Code Quality
  'systematic-debugging',
  'debugging-and-error-recovery',
  'code-review-and-quality',
  'verification-before-completion',
  
  // High-value Boss Personas
  'boss-prompt-systematic-debugger',
  'boss-prompt-spec-driven-developer',
  'boss-prompt-performance-auditor'
];

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────
function hasDep(pkg, depNames) {
  if (!pkg) return false;
  const pool = {
    ...(pkg.dependencies || {}),
    ...(pkg.devDependencies || {}),
    ...(pkg.peerDependencies || {})
  };
  return depNames.some(d => pool[d] !== undefined);
}

function hasPy(pyDeps, depNames) {
  if (!pyDeps || pyDeps.length === 0) return false;
  return depNames.some(d => pyDeps.some(p => p.toLowerCase().startsWith(d.toLowerCase())));
}

function readPythonDeps(rootDir) {
  const deps = [];
  const reqFiles = ['requirements.txt', 'requirements-dev.txt', 'pyproject.toml', 'Pipfile'];
  reqFiles.forEach(f => {
    const p = path.join(rootDir, f);
    if (fs.existsSync(p)) {
      try {
        const lines = fs.readFileSync(p, 'utf8').split('\n');
        lines.forEach(l => {
          const clean = l.trim().split(/[\s=><~]/)[0];
          if (clean && !clean.startsWith('#')) deps.push(clean);
        });
      } catch (_) {}
    }
  });
  return deps;
}

function scanWorkspaceFiles(rootDir) {
  const filesSet = new Set();
  const fileList = [];
  
  try {
    const entries = fs.readdirSync(rootDir);
    entries.forEach(e => {
      filesSet.add(e);
      fileList.push(e);
    });
  } catch (_) {}

  return { filesSet, fileList };
}

// ─── WORKSPACE DETECTION ENGINE ───────────────────────────────────────────────
function detectWorkspaceStack(workspaceDir = process.cwd()) {
  let pkg = null;
  try {
    const pkgPath = path.join(workspaceDir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    }
  } catch (_) {}

  const { filesSet, fileList } = scanWorkspaceFiles(workspaceDir);
  const pyDeps = readPythonDeps(workspaceDir);
  const isGitRepo = fs.existsSync(path.join(workspaceDir, '.git'));

  const detected = [];

  DETECTORS.forEach(detector => {
    try {
      if (detector.detect(pkg, filesSet, pyDeps, fileList)) {
        detected.push(detector);
      }
    } catch (_) {}
  });

  return {
    workspaceDir,
    isGitRepo,
    technologies: detected.map(d => d.name),
    detectedDetectors: detected,
    pkgName: pkg?.name || path.basename(workspaceDir)
  };
}

// ─── SKILLS RESOLVER (REQUIRED ONLY) ──────────────────────────────────────────
function resolveRequiredSkills(workspaceDir = process.cwd(), skillsIndex = []) {
  const stack = detectWorkspaceStack(workspaceDir);
  const matchedSkillIds = new Set();
  const matchedSkills = [];

  // 1. Add skills matching detected technologies
  stack.detectedDetectors.forEach(detector => {
    skillsIndex.forEach(skill => {
      const text = `${skill.id} ${skill.name}`;
      
      // Check exclusion
      if (detector.exclude && detector.exclude.some(ex => ex.test(text))) {
        return;
      }

      // Check inclusion patterns
      const isMatch = detector.patterns.some(p => p.test(skill.id) || p.test(skill.name));
      if (isMatch && !matchedSkillIds.has(skill.id)) {
        matchedSkillIds.add(skill.id);
        matchedSkills.push(skill);
      }
    });
  });

  // 2. Add Universal Core Engineering skills (if active coding repo)
  if (stack.isGitRepo || stack.technologies.length > 0) {
    UNIVERSAL_CORE_SKILLS.forEach(coreId => {
      const found = skillsIndex.find(s => s.id === coreId || s.name.endsWith(':' + coreId) || s.path.endsWith('/' + coreId));
      if (found && !matchedSkillIds.has(found.id)) {
        matchedSkillIds.add(found.id);
        matchedSkills.push(found);
      }
    });
  }

  // 3. Fallback for completely brand-new empty directory
  if (matchedSkills.length === 0) {
    // Provide a lean starter pack
    const starterPatterns = [/start:/i, /git-workflow/i, /code-review/i, /systematic-debugging/i];
    skillsIndex.forEach(skill => {
      if (starterPatterns.some(p => p.test(skill.name) || p.test(skill.id))) {
        if (!matchedSkillIds.has(skill.id)) {
          matchedSkillIds.add(skill.id);
          matchedSkills.push(skill);
        }
      }
    });
  }

  const totalAvailable = skillsIndex.length || 3028;
  const requiredCount = matchedSkills.length;
  const reductionPercent = (((totalAvailable - requiredCount) / totalAvailable) * 100).toFixed(1);

  return {
    workspaceDir: stack.workspaceDir,
    pkgName: stack.pkgName,
    technologies: stack.technologies,
    requiredSkills: matchedSkills,
    requiredSkillIds: Array.from(matchedSkillIds),
    stats: {
      totalAvailable,
      requiredCount,
      reductionPercent: `${reductionPercent}%`,
      lagPrevented: true
    }
  };
}

module.exports = {
  detectWorkspaceStack,
  resolveRequiredSkills,
  DETECTORS,
  UNIVERSAL_CORE_SKILLS
};
