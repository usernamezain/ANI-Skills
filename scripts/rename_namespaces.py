#!/usr/bin/env python3
"""
rename_namespaces.py
====================
Batch-updates the `name:` field in every SKILL.md across the skills/ directory,
replacing the old flat `ani:*` naming with semantic namespace prefixes:
  ui:, react:, angular:, next:, test:, scraping:, db:, cloud:, ai:,
  stripe:, api:, dsa:, plan:, debug:, security:, doc:, agent:, git:,
  perf:, obsidian:, media:, quality:, start:
"""
import os, re, sys

sys.stdout.reconfigure(encoding='utf-8')

# ─────────────────────────────────────────────────────────────────────────────
# FULL NAMESPACE MAP  { folder-id : new-name }
# ─────────────────────────────────────────────────────────────────────────────
NAMESPACE_MAP = {

    # ── START: project bootstrap ──────────────────────────────────────────────
    "new-project":                          "start:new-project",
    "new-milestone":                        "start:new-milestone",
    "onboard":                              "start:onboard",
    "angular-new-app":                      "start:new-angular-app",
    "create-voltagent":                     "start:new-voltagent",
    "new-terraform-provider":              "start:new-terraform-provider",

    # ── UI: animations, GSAP, Three.js, layout ───────────────────────────────
    "gsap-scrolltrigger-effects":           "ui:gsap-scrolltrigger",
    "gsap-timeline-choreography":           "ui:gsap-timeline",
    "buttery-smooth-120fps-performance":    "ui:smooth-scroll-120fps",
    "hero-cinematic-parallax-section":      "ui:hero-parallax",
    "hero-split-text-reveal-section":       "ui:hero-split-text",
    "scroll-morph-navbar-section":          "ui:scroll-morph-navbar",
    "scroll-pinned-timeline-section":       "ui:scroll-pinned-timeline",
    "scroll-comparison-table-section":      "ui:scroll-comparison-table",
    "horizontal-scroll-gallery-section":    "ui:horizontal-scroll-gallery",
    "scrub-carousel-testimonials-section":  "ui:scrub-carousel",
    "stagger-reveal-blog-cards-section":    "ui:stagger-blog-cards",
    "pinned-storytelling-about-section":    "ui:pinned-storytelling",
    "portfolio-hover-reveal-grid-section":  "ui:portfolio-hover-grid",
    "tilt-3d-team-cards-section":          "ui:tilt-3d-cards",
    "tilt-hover-pricing-cards-section":     "ui:tilt-pricing-cards",
    "animated-stats-counter-section":       "ui:stats-counter",
    "floating-label-contact-form-section":  "ui:floating-label-form",
    "marquee-logo-cloud-section":           "ui:marquee-logo-cloud",
    "mask-reveal-footer-section":           "ui:mask-reveal-footer",
    "morph-newsletter-signup-section":      "ui:morph-newsletter",
    "magnetic-cta-section":                 "ui:magnetic-cta",
    "magnetic-huge-text-nav-links":         "ui:magnetic-nav-links",
    "ticker-banner-designer":               "ui:ticker-banner",
    "fullscreen-menu-overlay":              "ui:menu-fullscreen",
    "mega-menu-dropdown":                   "ui:menu-mega-dropdown",
    "side-drawer-nav-menu":                 "ui:menu-side-drawer",
    "top-down-curtain-menu":               "ui:menu-curtain",
    "split-panel-menu-reveal":              "ui:menu-split-panel",
    "circular-radial-menu-reveal":          "ui:menu-radial",
    "morphing-hamburger-icon":              "ui:hamburger-morph",
    "custom-inertial-cursor":               "ui:cursor-inertial",
    "custom-cursor-effects":               "ui:cursor-effects",
    "three-cursor-particle-explosion":      "ui:cursor-particle-explosion",
    "three-carousel-slider":               "ui:three-carousel",
    "threejs-interactive-backgrounds":      "ui:threejs-backgrounds",
    "multi-slat-about-reveal":              "ui:slat-about-reveal",
    "slat-reveal-designer":                "ui:slat-reveal",
    "morph-mask-reveal-transitions":        "ui:morph-mask-reveal",
    "text-motion-typography":              "ui:text-motion",
    "preloader-visual-loading":             "ui:preloader",
    "video-hero-section":                   "ui:video-hero",
    "fluid-responsive-layout-system":       "ui:fluid-layout",
    "cross-device-responsive-qa":           "ui:responsive-qa",
    "precision-easing-motion-design":       "ui:precision-easing",
    "animation-accessibility-performance-audit": "ui:animation-audit",
    "retro-90s-ui-effects":                "ui:retro-90s",
    "frontend-design":                     "ui:design",
    "frontend-ui-engineering":             "ui:engineering",
    "canvas-design":                       "ui:canvas",
    "keyboard-grid-designer":              "ui:keyboard-grid",
    "smooth-accordion-faq-section":        "ui:accordion-faq",
    "ui-ux-pro-max":                       "ui:ux-pro-max",
    "google-design-md":                    "ui:google-design-md",
    "baoyu-slide-deck":                    "ui:slide-deck",
    "remotion":                            "ui:remotion",
    "remotion-best-practices":             "ui:remotion-advanced",
    "slack-gif-creator":                   "ui:slack-gif",
    "theme-factory":                       "ui:theme-factory",
    "brand-guidelines":                    "ui:brand-guidelines",
    "sketch":                              "ui:sketch",
    "web-design-guidelines":               "ui:web-design-guidelines",
    "algorithmic-art":                     "ui:algorithmic-art",
    "one-of-a-kind-portfolio-builder":     "ui:portfolio-builder",
    # UI workflow agents
    "ui-phase":                            "ui:phase",
    "ui-review":                           "ui:review",
    "ui-auditor":                          "ui:auditor",
    "ui-checker":                          "ui:checker",
    "ui-researcher":                       "ui:researcher",

    # ── PRO skills ────────────────────────────────────────────────────────────
    # (pro/ subfolder skills are covered by the pro folder scan below)

    # ── REACT ─────────────────────────────────────────────────────────────────
    "react-best-practices":                "react:best-practices",
    "react-native-skills":                 "react:native",
    "composition-patterns":                "react:composition-patterns",

    # ── ANGULAR ───────────────────────────────────────────────────────────────
    "angular-developer":                   "angular:developer",

    # ── NEXT.JS ───────────────────────────────────────────────────────────────
    "vercel-next-skills":                  "next:best-practices",

    # ── TEST: all testing frameworks ──────────────────────────────────────────
    "jest-skill":                          "test:jest",
    "vitest-skill":                        "test:vitest",
    "jasmine-skill":                       "test:jasmine",
    "mocha-skill":                         "test:mocha",
    "karma-skill":                         "test:karma",
    "junit-5-skill":                       "test:junit5",
    "testng-skill":                        "test:testng",
    "rspec-skill":                         "test:rspec",
    "phpunit-skill":                       "test:phpunit",
    "pytest-skill":                        "test:pytest",
    "mstest-skill":                        "test:mstest",
    "nunit-skill":                         "test:nunit",
    "xunit-skill":                         "test:xunit",
    "specflow-skill":                      "test:specflow",
    "reqnroll-skill":                      "test:reqnroll",
    "behat-skill":                         "test:behat",
    "behave-skill":                        "test:behave",
    "cucumber-skill":                      "test:cucumber",
    "gauge-skill":                         "test:gauge",
    "robot-framework-skill":               "test:robot-framework",
    "capybara-skill":                      "test:capybara",
    "geb-skill":                           "test:geb",
    "testunit-skill":                      "test:ruby-testunit",
    "lettuce-skill":                       "test:lettuce",
    "appium-skill":                        "test:appium",
    "espresso-skill":                      "test:espresso",
    "xcuitest-skill":                      "test:xcuitest",
    "detox-skill":                         "test:detox",
    "flutter-testing-skill":               "test:flutter",
    "nemojs-skill":                        "test:nemo",
    "serenity-bdd-skill":                  "test:serenity-bdd",
    "testcafe-skill":                      "test:testcafe",
    "webdriverio-skill":                   "test:webdriverio",
    "selenium-skill":                      "test:selenium",
    "selenide-skill":                      "test:selenide",
    "nightwatchjs-skill":                  "test:nightwatch",
    "codeception-skill":                   "test:codeception",
    "laravel-dusk-skill":                  "test:laravel-dusk",
    "protractor-skill":                    "test:protractor",
    "hyperexecute-skill":                  "test:hyperexecute",
    "smartui-skill":                       "test:smartui",
    "cypress-skill":                       "test:cypress",
    "playwright-skill":                    "test:playwright",
    "webapp-testing":                      "test:webapp",
    "add-tests":                           "test:add-tests",
    "run-acceptance-tests":                "test:acceptance",
    "test-driven-development":             "test:tdd",
    "test-framework-migration-skill":      "test:framework-migration",
    "browser-testing-with-devtools":       "test:browser-devtools",

    # ── SCRAPING ──────────────────────────────────────────────────────────────
    "puppeteer-skill":                     "scraping:puppeteer",
    "firecrawl-build":                     "scraping:firecrawl",
    "firecrawl-build-scrape":              "scraping:firecrawl-scrape",
    "firecrawl-build-search":              "scraping:firecrawl-search",
    "firecrawl-build-interact":            "scraping:firecrawl-interact",
    "firecrawl-build-onboarding":          "scraping:firecrawl-onboarding",
    "firecrawl-research-index":            "scraping:firecrawl-index",

    # ── DB: databases ─────────────────────────────────────────────────────────
    "clickhouse-best-practices":           "db:clickhouse-best-practices",
    "clickhouse-architecture-advisor":     "db:clickhouse-architect",
    "clickhousectl-cloud-deploy":          "db:clickhouse-cloud-deploy",
    "clickhousectl-local-dev":             "db:clickhouse-local-dev",
    "clickhouse-js-node-coding":           "db:clickhouse-js-coding",
    "clickhouse-js-node-rowbinary":        "db:clickhouse-js-rowbinary",
    "clickhouse-js-node-troubleshooting":  "db:clickhouse-js-debug",
    "clickhouse-managed-postgres-rca":     "db:clickhouse-postgres-rca",
    "chdb-datastore":                      "db:chdb-datastore",
    "chdb-sql":                            "db:chdb-sql",
    "neon":                                "db:neon",
    "neon-postgres":                       "db:neon-postgres",
    "neon-postgres-branches":              "db:neon-branches",
    "neon-ai-gateway":                     "db:neon-ai-gateway",
    "neon-functions":                      "db:neon-functions",
    "neon-object-storage":                 "db:neon-storage",
    "neon-postgres-egress-optimizer":      "db:neon-egress",
    "supabase":                            "db:supabase",
    "supabase-postgres-best-practices":    "db:supabase-best-practices",
    "claimable-postgres":                  "db:claimable-postgres",
    "tinybird":                            "db:tinybird",
    "tinybird-cli-guidelines":             "db:tinybird-cli",
    "tinybird-python-sdk-guidelines":      "db:tinybird-python",
    "tinybird-typescript-sdk-guidelines":  "db:tinybird-typescript",

    # ── CLOUD: Cloudflare, Netlify, AWS, Azure, Terraform ────────────────────
    "cloudflare-skills-cloudflare":        "cloud:cloudflare",
    "cloudflare-skills-agents-sdk":        "cloud:cloudflare-agents",
    "cloudflare-skills-cloudflare-email-service": "cloud:cloudflare-email",
    "cloudflare-skills-cloudflare-one":    "cloud:cloudflare-one",
    "cloudflare-skills-cloudflare-one-migrations": "cloud:cloudflare-one-migrations",
    "cloudflare-skills-durable-objects":   "cloud:cloudflare-durable-objects",
    "cloudflare-skills-sandbox-sdk":       "cloud:cloudflare-sandbox",
    "cloudflare-skills-turnstile-spin":    "cloud:cloudflare-turnstile",
    "cloudflare-skills-web-perf":          "cloud:cloudflare-web-perf",
    "cloudflare-skills-workers-best-practices": "cloud:cloudflare-workers",
    "cloudflare-skills-wrangler":          "cloud:wrangler",
    "netlify-skills-netlify-access-control": "cloud:netlify-access-control",
    "netlify-skills-netlify-agent-runner": "cloud:netlify-agent-runner",
    "netlify-skills-netlify-ai-gateway":   "cloud:netlify-ai-gateway",
    "netlify-skills-netlify-blobs":        "cloud:netlify-blobs",
    "netlify-skills-netlify-caching":      "cloud:netlify-caching",
    "netlify-skills-netlify-config":       "cloud:netlify-config",
    "netlify-skills-netlify-database":     "cloud:netlify-database",
    "netlify-skills-netlify-deploy":       "cloud:netlify-deploy",
    "netlify-skills-netlify-edge-functions": "cloud:netlify-edge",
    "netlify-skills-netlify-forms":        "cloud:netlify-forms",
    "netlify-skills-netlify-frameworks":   "cloud:netlify-frameworks",
    "netlify-skills-netlify-functions":    "cloud:netlify-functions",
    "netlify-skills-netlify-identity":     "cloud:netlify-identity",
    "netlify-skills-netlify-image-cdn":    "cloud:netlify-image-cdn",
    "netlify-skills-netlify-mcp-servers":  "cloud:netlify-mcp",
    "aws-ami-builder":                     "cloud:aws-ami",
    "azure-image-builder":                 "cloud:azure-image",
    "azure-verified-modules":              "cloud:azure-modules",
    "windows-builder":                     "cloud:windows-builder",
    "push-to-registry":                    "cloud:push-to-registry",
    "terraform-style-guide":               "cloud:terraform-style",
    "terraform-search-import":             "cloud:terraform-import",
    "terraform-stacks":                    "cloud:terraform-stacks",
    "terraform-test":                      "cloud:terraform-test",
    "refactor-module":                     "cloud:terraform-refactor",
    "provider-resources":                  "cloud:terraform-provider-resources",
    "provider-actions":                    "cloud:terraform-provider-actions",
    "provider-docs":                       "cloud:terraform-provider-docs",
    "provider-test-patterns":              "cloud:terraform-provider-tests",
    "ci-cd-and-automation":                "cloud:ci-cd",
    "cicd-pipeline-skill":                 "cloud:cicd-pipeline",
    "observability-and-instrumentation":   "cloud:observability",
    "seo-aeo-best-practices":              "cloud:seo-aeo",

    # ── AI: LLM frameworks, agents, models ───────────────────────────────────
    "gemini-api-dev":                      "ai:gemini-api",
    "gemini-interactions-api":             "ai:gemini-interactions",
    "gemini-live-api-dev":                 "ai:gemini-live",
    "gemini-omni-flash-api":               "ai:gemini-omni",
    "claude-api":                          "ai:claude-api",
    "voltagent-best-practices":            "ai:voltagent-best-practices",
    "voltagent-docs-bundle":               "ai:voltagent-docs",
    "voltagent-core-reference":            "ai:voltagent-core",
    "find-models":                         "ai:replicate-find",
    "run-models":                          "ai:replicate-run",
    "compare-models":                      "ai:replicate-compare",
    "build-models":                        "ai:replicate-build",
    "publish-models":                      "ai:replicate-publish",
    "prompt-images":                       "ai:prompt-images",
    "prompt-videos":                       "ai:prompt-videos",
    "composio":                            "ai:composio",
    "hosted-agents":                       "ai:hosted-agents",
    "notebooklm":                          "ai:notebooklm",
    "bdi-mental-states":                   "ai:bdi-mental-states",
    "ai-researcher":                       "ai:researcher",
    "ai-integration-phase":               "ai:integration-phase",
    "advanced-evaluation":                 "ai:advanced-evaluation",
    "evaluation":                          "ai:evaluation",
    "eval-review":                         "ai:eval-review",
    "eval-auditor":                        "ai:eval-auditor",
    "eval-planner":                        "ai:eval-planner",
    "score-eval":                          "ai:score-eval",
    "framework-selector":                  "ai:framework-selector",
    "context-engineering":                 "ai:context-engineering",
    "context-fundamentals":                "ai:context-fundamentals",
    "context-compression":                 "ai:context-compression",
    "context-degradation":                 "ai:context-degradation",
    "context-optimization":                "ai:context-optimization",
    "filesystem-context":                  "ai:filesystem-context",
    "multi-agent-patterns":                "ai:multi-agent",
    "mempalace-capture":                   "ai:mempalace-capture",
    "mempalace-recall":                    "ai:mempalace-recall",
    "memory-systems":                      "ai:memory-systems",
    "using-superpowers":                   "ai:superpowers",
    "using-agent-skills":                  "ai:agent-skills",
    "mcp-builder":                         "ai:mcp-builder",
    # Venice AI
    "venice-skills-venice-api-overview":   "ai:venice-api",
    "venice-skills-venice-auth":           "ai:venice-auth",
    "venice-skills-venice-api-keys":       "ai:venice-api-keys",
    "venice-skills-venice-chat":           "ai:venice-chat",
    "venice-skills-venice-image-generate": "ai:venice-image-generate",
    "venice-skills-venice-image-edit":     "ai:venice-image-edit",
    "venice-skills-venice-audio-speech":   "ai:venice-audio-speech",
    "venice-skills-venice-audio-music":    "ai:venice-audio-music",
    "venice-skills-venice-audio-transcription": "ai:venice-transcription",
    "venice-skills-venice-video":          "ai:venice-video",
    "venice-skills-venice-embeddings":     "ai:venice-embeddings",
    "venice-skills-venice-models":         "ai:venice-models",
    "venice-skills-venice-characters":     "ai:venice-characters",
    "venice-skills-venice-augment":        "ai:venice-augment",
    "venice-skills-venice-responses":      "ai:venice-responses",
    "venice-skills-venice-errors":         "ai:venice-errors",
    "venice-skills-venice-billing":        "ai:venice-billing",
    "venice-skills-venice-crypto-rpc":     "ai:venice-crypto",
    "venice-skills-venice-x402":           "ai:venice-x402",

    # ── STRIPE ────────────────────────────────────────────────────────────────
    "stripe-best-practices":               "stripe:best-practices",
    "stripe-directory":                    "stripe:directory",
    "stripe-projects":                     "stripe:projects",
    "upgrade-stripe":                      "stripe:upgrade",

    # ── API ───────────────────────────────────────────────────────────────────
    "api-and-interface-design":            "api:design",
    "source-driven-development":           "api:source-driven",
    "connect-recommend":                   "api:connect-recommend",

    # ── DSA ───────────────────────────────────────────────────────────────────
    "dsa-sliding-window":                  "dsa:sliding-window",
    "dsa-two-pointers":                    "dsa:two-pointers",
    "dsa-fast-and-slow-pointers":          "dsa:fast-slow-pointers",
    "dsa-merge-intervals":                 "dsa:merge-intervals",
    "dsa-cyclic-sort":                     "dsa:cyclic-sort",
    "dsa-in-place-reversal-of-linked-list":"dsa:linked-list-reversal",
    "dsa-tree-bfs":                        "dsa:tree-bfs",
    "dsa-tree-dfs":                        "dsa:tree-dfs",
    "dsa-k-way-merge":                     "dsa:k-way-merge",
    "dsa-knapsack-dynamic-programming":    "dsa:knapsack-dp",
    "dsa-topological-sort":                "dsa:topological-sort",
    "dsa-modified-binary-search":          "dsa:binary-search",
    "dsa-two-heaps":                       "dsa:two-heaps",
    "dsa-top-k-elements":                  "dsa:top-k",
    "dsa-backtracking-sudoku-solver":      "dsa:backtracking",
    "dsa-subsets":                         "dsa:subsets",
    "dsa-segment-tree-range-queries":      "dsa:segment-tree",
    "dsa-trie-prefix-tree":                "dsa:trie",
    "dsa-union-find-disjoint-set":         "dsa:union-find",
    "dsa-dijkstras-shortest-path":         "dsa:dijkstra",

    # ── PLAN: ANI workflow ────────────────────────────────────────────────────
    "discuss-phase":                       "plan:discuss",
    "plan-phase":                          "plan:phase",
    "execute-phase":                       "plan:execute",
    "spec-phase":                          "plan:spec",
    "mvp-phase":                           "plan:mvp",
    "autonomous":                          "plan:autonomous",
    "fast":                                "plan:fast",
    "quick":                               "plan:quick",
    "next":                                "plan:next",
    "progress":                            "plan:progress",
    "health":                              "plan:health",
    "stats":                               "plan:stats",
    "help":                                "plan:help",
    "cleanup":                             "plan:cleanup",
    "complete-milestone":                  "plan:complete-milestone",
    "audit-milestone":                     "plan:audit-milestone",
    "milestone-summary":                   "plan:milestone-summary",
    "phase":                               "plan:phase-crud",
    "roadmapper":                          "plan:roadmapper",
    "planner":                             "plan:planner",
    "plan-checker":                        "plan:plan-checker",
    "plan-review-convergence":             "plan:plan-review",
    "ultraplan-phase":                     "plan:ultraplan",
    "spec-driven-development":             "plan:spec-driven",
    "incremental-implementation":          "plan:incremental",
    "planning-and-task-breakdown":         "plan:breakdown",
    "planning-with-files":                 "plan:with-files",
    "writing-plans":                       "plan:writing-plans",
    "executing-plans":                     "plan:executing-plans",
    "manager":                             "plan:manager",
    "workstreams":                         "plan:workstreams",
    "thread":                              "plan:thread",
    "capture":                             "plan:capture",
    "explore":                             "plan:explore",
    "spike":                               "plan:spike",
    "graphify":                            "plan:graphify",
    "import":                              "plan:import",
    "inbox":                               "plan:inbox",
    "review-backlog":                      "plan:review-backlog",
    "ingest-docs":                         "plan:ingest-docs",
    "map-codebase":                        "plan:map-codebase",
    "resume-work":                         "plan:resume",
    "pause-work":                          "plan:pause",
    "audit-uat":                           "plan:audit-uat",
    "audit-fix":                           "plan:audit-fix",
    "extract-learnings":                   "plan:extract-learnings",
    "profile-user":                        "plan:profile-user",
    "settings":                            "plan:settings",
    "config":                              "plan:config",
    "surface":                             "plan:surface",
    "update":                              "plan:update",
    "workspace":                           "plan:workspace",
    "idea-refine":                         "plan:idea-refine",
    "interview-me":                        "plan:interview-me",
    "brainstorming":                       "plan:brainstorming",
    "deep-code-scan":                      "plan:deep-code-scan",
    "verify-work":                         "plan:verify-work",
    "validate-phase":                      "plan:validate-phase",
    "secure-phase":                        "plan:secure-phase",
    "new-project":                         "start:new-project",   # already above; Python dict last-wins

    # ── DEBUG ─────────────────────────────────────────────────────────────────
    "debug":                               "debug:debug",
    "debugger":                            "debug:debugger",
    "systematic-debugging":                "debug:systematic",
    "debugging-and-error-recovery":        "debug:recovery",
    "debug-session-manager":               "debug:session-manager",
    "forensics":                           "debug:forensics",
    "doubt-driven-development":            "debug:doubt-driven",

    # ── SECURITY ──────────────────────────────────────────────────────────────
    "security-and-hardening":              "security:harden",
    "security-auditor":                    "security:auditor",
    "two-factor-authentication-best-practices": "security:2fa",
    "email-and-password-best-practices":   "security:email-password",
    "better-auth-best-practices":          "security:auth",
    "organization-best-practices":         "security:org-practices",
    "create-auth-skill":                   "security:create-auth",

    # ── DOC: documentation tools ──────────────────────────────────────────────
    "docs-update":                         "doc:update",
    "documentation-and-adrs":             "doc:adrs",
    "doc-writer":                          "doc:writer",
    "doc-verifier":                        "doc:verifier",
    "doc-classifier":                      "doc:classifier",
    "doc-synthesizer":                     "doc:synthesizer",
    "doc-coauthoring":                     "doc:coauthoring",
    "docx":                                "doc:docx",
    "pdf":                                 "doc:pdf",
    "pptx":                                "doc:pptx",
    "xlsx":                                "doc:xlsx",
    "defuddle":                            "doc:defuddle",
    "json-canvas":                         "doc:json-canvas",
    "google-workspace-cli":                "doc:google-workspace-cli",
    "google-workspace-vhs":                "doc:google-workspace-vhs",
    "internal-comms":                      "doc:internal-comms",

    # ── AGENT: orchestration, subagent patterns ───────────────────────────────
    "dispatching-parallel-agents":         "agent:dispatch-parallel",
    "subagent-driven-development":         "agent:subagent-driven",
    "executor":                            "agent:executor",
    "verifier":                            "agent:verifier",
    "code-reviewer":                       "agent:code-reviewer",
    "code-fixer":                          "agent:code-fixer",
    "nyquist-auditor":                     "agent:nyquist-auditor",
    "codebase-mapper":                     "agent:codebase-mapper",
    "pattern-mapper":                      "agent:pattern-mapper",
    "intel-updater":                       "agent:intel-updater",
    "phase-researcher":                    "agent:phase-researcher",
    "project-researcher":                  "agent:project-researcher",
    "research-synthesizer":                "agent:research-synthesizer",
    "assumptions-analyzer":                "agent:assumptions-analyzer",
    "advisor-researcher":                  "agent:advisor-researcher",
    "domain-researcher":                   "agent:domain-researcher",
    "integration-checker":                 "agent:integration-checker",
    "user-profiler":                       "agent:user-profiler",
    "tool-design":                         "agent:tool-design",

    # ── GIT ───────────────────────────────────────────────────────────────────
    "git-workflow-and-versioning":         "git:workflow",
    "using-git-worktrees":                 "git:worktrees",
    "pr-branch":                           "git:pr-branch",
    "undo":                                "git:undo",
    "ship":                                "git:ship",
    "finishing-a-development-branch":      "git:finish-branch",
    "requesting-code-review":              "git:request-review",
    "receiving-code-review":              "git:receive-review",

    # ── PERF ──────────────────────────────────────────────────────────────────
    "performance-optimization":            "perf:optimize",

    # ── OBSIDIAN ──────────────────────────────────────────────────────────────
    "obsidian-markdown":                   "obsidian:markdown",
    "obsidian-bases":                      "obsidian:bases",
    "obsidian-cli":                        "obsidian:cli",

    # ── MEDIA: content creation ───────────────────────────────────────────────
    "baoyu-article-illustrator":           "media:article-illustrator",
    "baoyu-comic":                         "media:comic",
    "baoyu-compress-image":                "media:compress-image",
    "baoyu-cover-image":                   "media:cover-image",
    "baoyu-danger-gemini-web":             "media:gemini-web",
    "baoyu-danger-x-to-markdown":          "media:x-to-markdown",
    "baoyu-diagram":                       "media:diagram",
    "baoyu-format-markdown":               "media:format-markdown",
    "baoyu-image-cards":                   "media:image-cards",
    "baoyu-imagine":                       "media:imagine",
    "baoyu-infographic":                   "media:infographic",
    "baoyu-markdown-to-html":              "media:markdown-to-html",
    "baoyu-post-to-wechat":                "media:post-wechat",
    "baoyu-post-to-weibo":                 "media:post-weibo",
    "baoyu-post-to-x":                     "media:post-x",
    "baoyu-translate":                     "media:translate",
    "baoyu-url-to-markdown":               "media:url-to-markdown",
    "baoyu-xhs-images":                    "media:xhs-images",
    "baoyu-youtube-transcript":            "media:youtube-transcript",
    "typefully":                           "media:typefully",

    # ── QUALITY ───────────────────────────────────────────────────────────────
    "code-review":                         "quality:code-review",
    "code-review-and-quality":             "quality:review-and-quality",
    "code-simplification":                 "quality:simplify",
    "deprecation-and-migration":           "quality:deprecation",
    "verification-before-completion":      "quality:verify-completion",
    "agy-customizations":                  "quality:agy-customizations",
    "sanity-best-practices":               "quality:sanity-cms",
    "sanity-migration":                    "quality:sanity-migration",
    "content-experimentation-best-practices": "quality:content-experiments",
    "content-modeling-best-practices":     "quality:content-modeling",

    # ── NAMESPACE SKILLS (meta) ────────────────────────────────────────────────
    "ns-context":                          "meta:context",
    "ns-ideate":                           "meta:ideate",
    "ns-manage":                           "meta:manage",
    "ns-project":                          "meta:project",
    "ns-review":                           "meta:review",
    "ns-workflow":                         "meta:workflow",

    # ── SANITY / PORTABLE TEXT ────────────────────────────────────────────────
    "portable-text-conversion":            "quality:portable-text-convert",
    "portable-text-serialization":         "quality:portable-text-serialize",

    # ── WRITING / SKILLS CREATION ─────────────────────────────────────────────
    "writing-plans":                       "plan:writing-plans",
    "writing-skills":                      "plan:writing-skills",
    "skill-creator":                       "plan:skill-creator",
    "using-git-worktrees":                 "git:worktrees",
}

# ─────────────────────────────────────────────────────────────────────────────
# PRO sub-skills  (skills/pro/* folders)
# Detected by walking the pro/ subfolder
# ─────────────────────────────────────────────────────────────────────────────
PRO_PREFIX = "ui:pro-"   # all pro skills get ui:pro- prefix

def get_pro_name(folder_id: str) -> str:
    """Convert pro/xxx folder id to ui:pro-xxx"""
    slug = folder_id.replace("pro/", "").replace("/", "-")
    return f"{PRO_PREFIX}{slug}"

# ─────────────────────────────────────────────────────────────────────────────
def update_skill_name(skill_md_path: str, new_name: str) -> bool:
    """Update the `name:` field in SKILL.md frontmatter. Returns True if changed."""
    try:
        with open(skill_md_path, "r", encoding="utf-8-sig") as f:
            content = f.read()

        # Match `name:` in YAML frontmatter (between --- delimiters)
        pattern = r'^(name:\s*)(.+)$'
        new_content, count = re.subn(pattern, lambda m: m.group(1) + new_name, content, count=1, flags=re.MULTILINE)

        if count == 0:
            # No name: field found — inject one after first ---
            new_content = re.sub(r'^---\n', f'---\nname: {new_name}\n', content, count=1, flags=re.MULTILINE)

        if new_content != content:
            with open(skill_md_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            return True
        return False
    except Exception as e:
        print(f"[ERROR] {skill_md_path}: {e}")
        return False


def run():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    skills_dir = os.path.join(project_root, "skills")

    updated = 0
    skipped = 0
    unmapped = []

    for root, dirs, files in os.walk(skills_dir):
        if "SKILL.md" not in files:
            continue
        # Skip hidden dirs
        rel = os.path.relpath(root, skills_dir)
        if any(p.startswith('.') for p in rel.split(os.sep)):
            continue

        skill_id = rel.replace(os.sep, "/")
        skill_md = os.path.join(root, "SKILL.md")

        # Determine new name
        if skill_id in NAMESPACE_MAP:
            new_name = NAMESPACE_MAP[skill_id]
        elif skill_id.startswith("pro/"):
            new_name = get_pro_name(skill_id)
        else:
            unmapped.append(skill_id)
            skipped += 1
            continue

        changed = update_skill_name(skill_md, new_name)
        if changed:
            print(f"  [OK] {skill_id}  →  {new_name}")
            updated += 1
        else:
            skipped += 1

    print(f"\n{'='*60}")
    print(f"  Updated : {updated}")
    print(f"  Skipped : {skipped}")
    if unmapped:
        print(f"\n  UNMAPPED SKILLS ({len(unmapped)}) — kept as-is:")
        for s in sorted(unmapped):
            print(f"    - {s}")
    print(f"{'='*60}")


if __name__ == "__main__":
    run()
