import os
import sys

packs = [
    {
        'id': 'boss-saas-architect',
        'title': 'The SaaS Master Architect (Open SaaS)',
        'role': 'Full-Stack SaaS & Subscription Platform Architect',
        'ref_repos': ['https://github.com/wasp-lang/open-saas', 'https://github.com/shadcn-ui/ui'],
        'skills': ['ui:animated-stats-counter-section', 'db:neon-postgres', 'auth:auth0-management', 'stripe:stripe-best-practices', 'ui:fluid-responsive-layout-system', 'ui:side-drawer-nav-menu'],
        'desc': 'Architects complete multi-tenant SaaS platforms with authentication, Stripe subscriptions, Neon serverless Postgres, and GSAP animated dashboards.'
    },
    {
        'id': 'boss-chrome-extension-pro',
        'title': 'The Chrome Extension Master Studio',
        'role': 'Manifest V3 Chrome Extension Architect',
        'ref_repos': ['https://github.com/GoogleChrome/chrome-extensions-samples'],
        'skills': ['ui:micro-interaction-expert', 'security:vibesec-skill', 'test:playwright-skill', 'doc:make-pdf', 'perf:buttery-smooth-120fps-performance'],
        'desc': 'Builds production-grade Manifest V3 Chrome extensions with background service workers, sidepanels, declarativeNetRequest, and GSAP popup animations.'
    },
    {
        'id': 'boss-electron-desktop-architect',
        'title': 'The Electron Desktop Application Architect',
        'role': 'Native Cross-Platform Desktop App Architect',
        'ref_repos': ['https://github.com/hokein/electron-sample-apps', 'https://github.com/electron/electron-quick-start'],
        'skills': ['ui:side-drawer-nav-menu', 'db:duckdb-analytics', 'security:security-and-hardening', 'perf:buttery-smooth-120fps-performance', 'ui:custom-inertial-cursor'],
        'desc': 'Engineers high-performance Electron desktop apps featuring secure contextBridge IPC, frameless windows, system tray integration, local DuckDB, and monochromatic GSAP UI.'
    },
    {
        'id': 'boss-laas-ai-workflow-engine',
        'title': 'The LaaS & LLM Workflow Engine Architect',
        'role': 'Logic / LLM / Learning as a Service Platform Architect',
        'ref_repos': ['https://github.com/wasp-lang/open-saas', 'https://github.com/voltagent/voltagent'],
        'skills': ['ai:voltagent-best-practices', 'db:qdrant-best-practices', 'cloud:cloudflare-skills-workers-best-practices', 'stripe:stripe-best-practices', 'monitoring:sentry-for-ai-trace-investigation'],
        'desc': 'Builds multi-tenant LLM-as-a-Service and Workflow automation engines with token metering, streaming endpoints, Qdrant vector retrieval, and fallback routing.'
    },
    {
        'id': 'boss-ecommerce-storefront-pro',
        'title': 'The High-Conversion E-Commerce & Storefront Architect',
        'role': 'Headless E-Commerce & Storefront Lead',
        'ref_repos': ['https://github.com/gethugothemes/influencer-hugo', 'https://github.com/Govind783/react-e-commerce', 'https://github.com/vivekkakadiya/Organica'],
        'skills': ['ui:tilt-pricing-cards', 'ui:scrub-carousel-testimonials-section', 'marketing:seo', 'stripe:stripe-best-practices', 'ui:morph-mask-reveal-transitions'],
        'desc': 'Builds ultra-fast headless e-commerce storefronts with 3D product tilt cards, animated sliding cart drawers, Stripe checkout, and rich SEO structured data.'
    },
    {
        'id': 'boss-secure-node-architect',
        'title': 'The Zero-Vulnerability Node.js Hardening Master',
        'role': 'Principal Node.js Security Architect',
        'ref_repos': ['https://gist.github.com/ju2wheels/e39f2cb442d8bc1be1c3', 'https://gist.github.com/ChALkeR/cf4d1fb90a68c6fff66ac9ea74503bf5'],
        'skills': ['security:security-and-hardening', 'security:vibesec-skill', 'monitoring:sentry-for-ai-trace-investigation', 'quality:quality-safeguards-careful'],
        'desc': 'Audits and hardens Node.js architectures against prototype pollution, timing attacks, ReDoS, memory leaks, and insecure crypto with zero external vulnerability footprint.'
    },
    {
        'id': 'boss-ai-agent-platform-creator',
        'title': 'The Autonomous AI Agent & MCP Hub Architect',
        'role': 'Autonomous Multi-Agent Platform Director',
        'ref_repos': ['https://github.com/voltagent/voltagent', 'https://github.com/modelcontextprotocol/servers'],
        'skills': ['ai:agent-platform-skill-registry', 'agent:subagent-driven', 'api:mcp-builder', 'db:redis-caching', 'monitoring:agent-observability-trace-rca'],
        'desc': 'Designs stateful multi-agent orchestration systems, custom MCP tool servers, durable step execution, and real-time observability pipelines.'
    },
    {
        'id': 'boss-mobile-crossplatform-master',
        'title': 'The Mobile iOS SwiftUI & Flutter Studio Architect',
        'role': 'Principal Mobile Application Architect',
        'ref_repos': ['https://github.com/expo/skills', 'https://github.com/flutter/flutter'],
        'skills': ['mobile:hig-doctor', 'mobile:flutter-testing-skill', 'marketing:aso', 'quality:verify-completion'],
        'desc': 'Builds native iOS SwiftUI and Flutter applications conforming to Apple HIG design guidelines, offline sync, real-device QA, and App Store Optimization.'
    },
    {
        'id': 'boss-webgpu-3d-creative-director',
        'title': 'The WebGPU & Three.js 3D Creative Director',
        'role': 'Executive 3D Visualizer & Creative Technologist',
        'ref_repos': ['https://github.com/dgreenheck/webgpu-claude-skill', 'https://github.com/alton47/threejs-skills'],
        'skills': ['ui:webgpu-threejs-tsl', 'ui:threejs-shaders', 'ui:cursor-particle-explosion', 'ui:three-carousel', 'perf:buttery-smooth-120fps-performance'],
        'desc': 'Directs cutting-edge 120fps WebGPU compute shaders, Three.js TSL materials, interactive cursor particle physics, and 3D product visualizers.'
    },
    {
        'id': 'boss-growth-marketing-cmo',
        'title': 'The Automated Growth Engine & CMO Orchestrator',
        'role': 'Chief Marketing Officer & Growth Engineer',
        'ref_repos': ['https://github.com/SupercmoHQ/superCMO-skills', 'https://github.com/gooseworks-ai/goose-skills'],
        'skills': ['marketing:seo', 'marketing:generating-ugc-videos', 'marketing:linkedin-marketing', 'marketing:supercmo-setup', 'doc:unslop'],
        'desc': 'Orchestrates full-funnel growth campaigns: Answer Engine Optimization (GEO/AEO), high-converting ad copy, automated LinkedIn hooks, and viral loops.'
    },
    {
        'id': 'boss-devops-cloud-commander',
        'title': 'The Multi-Cloud & Certified Terraform Commander',
        'role': 'Lead Cloud Infrastructure & DevOps Commander',
        'ref_repos': ['https://github.com/microsoft/skills', 'https://github.com/cloudflare/workers-sdk'],
        'skills': ['cloud:terraform-stacks', 'cloud:cloudflare-skills-workers-best-practices', 'cloud:azure-verified-modules', 'cloud:n8n-error-handling'],
        'desc': 'Deploys certified HashiCorp Terraform modules, Cloudflare edge workers, AWS/Azure serverless infra, and automated canary release pipelines.'
    },
    {
        'id': 'boss-database-data-engineer',
        'title': 'The High-Throughput Analytics & Vector Data Engineer',
        'role': 'Principal Database & Storage Systems Engineer',
        'ref_repos': ['https://github.com/duckdb/duckdb', 'https://github.com/ClickHouse/ClickHouse'],
        'skills': ['db:duckdb-analytics', 'db:clickhouse-best-practices', 'db:neon-postgres', 'db:qdrant-best-practices', 'db:tinybird'],
        'desc': 'Designs sub-millisecond data architectures integrating DuckDB in-process queries, ClickHouse real-time analytics, Neon serverless branching, and Qdrant vector retrieval.'
    },
    {
        'id': 'boss-security-trailofbits-auditor',
        'title': 'The Trail of Bits Deep Security Auditor',
        'role': 'Chief Information Security Officer & Penetration Tester',
        'ref_repos': ['https://github.com/trailofbits/skills'],
        'skills': ['security:trailofbits-audit', 'security:vibesec-skill', 'security:2fa', 'quality:quality-safeguards-freeze'],
        'desc': 'Conducts zero-trust security audits, AST static vulnerability scanning, cryptographic protocol validation, and OWASP Top 10 hardening.'
    },
    {
        'id': 'boss-browser-automation-scraper',
        'title': 'The Stealth Web Scraping & Playwright Commander',
        'role': 'Lead Automation & Web Intelligence Engineer',
        'ref_repos': ['https://github.com/browserbase/skills', 'https://github.com/puppeteer/puppeteer'],
        'skills': ['scraping:browserbase-skills', 'test:playwright-skill', 'scraping:x-twitter-scraper', 'scraping:puppeteer-skill'],
        'desc': 'Builds anti-detect web scrapers, Browserbase cloud browser automation, DOM hydration pipelines, and structured extraction queues.'
    },
    {
        'id': 'boss-video-media-producer',
        'title': 'The Programmatic Video & Motion Media Producer',
        'role': 'Executive Video & Media Engine Producer',
        'ref_repos': ['https://github.com/remotion-dev/skills'],
        'skills': ['ui:remotion', 'media:typefully', 'marketing:generating-audio', 'marketing:generating-videos'],
        'desc': 'Generates programmatic video and motion graphics with Remotion (React), audio waveform synthesis, dynamic canvas captions, and social video pipelines.'
    },
    {
        'id': 'boss-enterprise-auth-identity',
        'title': 'The Zero-Trust Auth & Multi-Tenant Identity Architect',
        'role': 'Principal Identity & Access Management Architect',
        'ref_repos': ['https://github.com/auth0/agent-skills'],
        'skills': ['auth:auth0-management', 'auth:auth0-deploy', 'security:2fa', 'security:security-and-hardening'],
        'desc': 'Designs enterprise authentication architectures with Auth0 Actions, OAuth2/OIDC PKCE, WebAuthn Passkeys, and multi-tenant RBAC isolation.'
    },
    {
        'id': 'boss-observability-sre',
        'title': 'The Sentry & Datadog APM Reliability Engineer',
        'role': 'Principal Site Reliability & APM Telemetry Engineer',
        'ref_repos': ['https://github.com/getsentry/sentry-for-ai', 'https://github.com/DataDog/datadog-agent'],
        'skills': ['monitoring:sentry-for-ai-trace-investigation', 'monitoring:dd-apm', 'monitoring:agent-observability-trace-rca', 'quality:health'],
        'desc': 'Instruments distributed tracing, AI token anomaly alerting, session replay crash forensics, and automated incident root cause analysis.'
    },
    {
        'id': 'boss-fintech-stripe-billing',
        'title': 'The Fintech & Stripe Metered Billing Architect',
        'role': 'Principal Billing & Fintech Systems Architect',
        'ref_repos': ['https://github.com/stripe/stripe-node'],
        'skills': ['stripe:stripe-best-practices', 'stripe:stripe-directory', 'stripe:upgrade', 'db:neon-postgres'],
        'desc': 'Engineers resilient subscription billing lifecycles, metered usage calculations, webhook idempotency, Stripe Customer Portal, and dunning workflows.'
    },
    {
        'id': 'boss-headless-cms-content-architect',
        'title': 'The Next.js Headless CMS & Static Site Studio',
        'role': 'Lead Headless CMS & Content Systems Architect',
        'ref_repos': ['https://github.com/sanity-io/sanity', 'https://github.com/vercel/next.js'],
        'skills': ['next:best-practices', 'doc:notion-export', 'marketing:seo', 'ui:stagger-reveal-blog-cards-section'],
        'desc': 'Builds high-performance Next.js App Router websites integrated with Sanity headless CMS, Portable Text serialization, and on-demand ISR revalidation.'
    },
    {
        'id': 'boss-full-system-qa-commander',
        'title': 'The Full-System QA Automation Commander',
        'role': 'Chief Quality Assurance & Automation Commander',
        'ref_repos': ['https://github.com/microsoft/playwright', 'https://github.com/cypress-io/cypress'],
        'skills': ['test:playwright-skill', 'test:cypress-skill', 'test:vitest', 'test:serenity-bdd-skill', 'quality:verify-completion'],
        'desc': 'Commands multi-browser E2E test suites, visual regression diffing, Screenplay BDD scenarios, parallel CI test matrix, and zero-flakiness gates.'
    }
]

boss_dir = r'C:\Users\SHABBIR TRADERS\Desktop\skills\boss-prompts'
skills_dir = r'C:\Users\SHABBIR TRADERS\Desktop\skills\skills'
os.makedirs(boss_dir, exist_ok=True)

for p in packs:
    # 1. Write Boss Prompt Markdown in boss-prompts/
    boss_file = os.path.join(boss_dir, f"{p['id']}.md")
    ref_list = '\n'.join([f"- `{r}`" for r in p['ref_repos']])
    skill_list = '\n'.join([f"- `{s}`" for s in p['skills']])
    
    boss_content = f"""# Master Boss Prompt: {p['title']}

{p['desc']}

## Executive Role & Mandate
**Role**: `{p['role']}`  
**Namespace**: `boss:{p['id']}`  

---

## 📚 Knowledge Acquisition Protocol (Reference Repositories)
Before initiating implementation or when deep architectural patterns are required:
1. **Explore Reference Source**: Consult official reference architectures:
{ref_list}
2. **Ephemeral Pattern Extraction**: When requested by the user, clone the sample repository into a temporary workspace directory (`scratch/knowledge_clones/{p['id']}/`), analyze its module boundaries and configurations, synthesize the design into the project, and automatically purge the temporary clone directory upon phase completion.
3. **Zero-Fluff Integration**: Apply battle-tested patterns without carrying over legacy dependencies.

---

## 🛠️ Orchestrated Core Skills
This Boss Starter Pack coordinates the following production skills:
{skill_list}

---

## ❓ Discovery & Clarification Matrix (Ask Before Code)
Before writing code, ask the user these 4 strategic alignment questions:
1. **Target Architecture & Scope**: What are the core user flows, scale requirements, and platform constraints?
2. **Tech Stack & Integration**: Which UI framework, database provider, or auth provider is preferred?
3. **Visual & Motion Aesthetic**: Are there specific branding themes, monochromatic palettes, or GSAP animation curves desired?
4. **Deployment & Environment**: What is the target hosting environment (Cloudflare, Vercel, AWS, Native Desktop, Chrome Web Store)?

---

## ⚡ Execution Protocol
- **Phase 1: Discovery & Specification** — Confirm answers to the 4 discovery questions and establish the exact system contract.
- **Phase 2: Architectural Scaffolding** — Generate clean modular file structures adhering to strict security and separation of concerns.
- **Phase 3: Core Implementation & GSAP Animation** — Implement features using monochromatic high-contrast UI, smooth transitions, and durable error handling.
- **Phase 4: Verification & Automated Testing** — Validate end-to-end flows with rigorous unit/integration tests and zero-vulnerability checks.
- **Phase 5: Knowledge Cleanup & Delivery** — Clean up all scratch directories and deliver production-ready code with complete setup documentation.

---

## 🚀 Boss Prompt Trigger Block
Copy and paste this instruction block into your AI coding assistant:

```markdown
Act as {p['role']}. Execute the '{p['title']}' protocol.
1. Review reference patterns from: {', '.join(p['ref_repos'])}.
2. Ask me the 4 alignment questions from the Discovery Matrix.
3. Coordinate skills: {', '.join(p['skills'])}.
4. Build a production-grade, high-contrast, monochromatic solution with GSAP motion and durable execution.
```
"""
    with open(boss_file, 'w', encoding='utf-8') as f:
        f.write(boss_content)

    # 2. Write Skill Definition in skills/
    skill_folder = os.path.join(skills_dir, f"boss-{p['id']}")
    os.makedirs(skill_folder, exist_ok=True)
    skill_file = os.path.join(skill_folder, 'SKILL.md')

    skill_content = f"""---
name: boss:{p['id']}
description: {p['desc']} Use when asked for "{p['title']}", "{p['role']}", or executive orchestration of {p['id']}.
---

# {p['title']}

## Overview
{p['desc']}

## Reference Repositories & Knowledge Acquisition
{ref_list}

*Protocol*: When needed, clone reference repositories into `scratch/knowledge_clones/{p['id']}/` for pattern extraction, and clean up afterwards.

## Coordinated Skills
{skill_list}

## When to Use
- When architecting or bootstrapping {p['id'].replace('boss-', '').replace('-', ' ')} applications.
- When requiring executive-level technical oversight, architectural scaffolding, and high-conversion UX.
- When seeking a complete end-to-end workflow from discovery questioning to verified delivery.

## Execution Steps
1. **Interactive Discovery**: Ask the 4 strategic discovery questions from the prompt specification.
2. **Pattern Synthesis**: Reference official repository patterns and synthesize into project architecture.
3. **Core Build**: Construct the system using high-contrast monochromatic UI, GSAP motion, and clean contracts.
4. **Verification**: Run tests and automated quality checks before finalizing.
"""
    with open(skill_file, 'w', encoding='utf-8') as f:
        f.write(skill_content)

print(f"Successfully generated {len(packs)} Pro Boss Starter Packs in boss-prompts/ and skills/!")
