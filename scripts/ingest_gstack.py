#!/usr/bin/env python3
"""
ingest_gstack.py
================
Ingests all skills from garrytan/gstack into ANI-Skills Ultra package.
Assigns semantic namespaces:
  - boss:    for executive / founder / director review & orchestration workflows
  - mobile:  for iOS device & SwiftUI skills
  - scraping:for browse, scrape, and browser automation
  - ui:      for design consultation, design HTML, shotgun variants
  - doc:     for diagram, PDF generation, document generation
  - ai:      for benchmark, context save/restore, gbrain sync
  - quality: for health, careful, freeze, canary, learn, review
  - plan:    for spec, autoplan, plan tuning

Also generates boss-prompts/*.md orchestrators for all boss personas.
"""
import os, re, shutil, sys

sys.stdout.reconfigure(encoding='utf-8')

ROOT       = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC        = os.path.join(ROOT, '_tmp_gstack')
SKILLS_DIR = os.path.join(ROOT, 'skills')
BOSS_DIR   = os.path.join(ROOT, 'boss-prompts')

# Map of gstack folder -> (destination folder name, namespace name, category)
GSTACK_SKILLS = {
    # ── BOSS WORKFLOWS ────────────────────────────────────────────────────────
    "plan-ceo-review":     ("gstack-plan-ceo-review",     "boss:gstack-ceo-review",     "boss"),
    "office-hours":        ("gstack-office-hours",        "boss:gstack-office-hours",   "boss"),
    "autoplan":            ("gstack-autoplan",            "boss:gstack-autoplan",       "boss"),
    "plan-eng-review":     ("gstack-plan-eng-review",     "boss:gstack-eng-review",     "boss"),
    "plan-design-review":  ("gstack-plan-design-review",  "boss:gstack-design-review",  "boss"),
    "plan-devex-review":   ("gstack-plan-devex-review",   "boss:gstack-devex-review",   "boss"),
    "cso":                 ("gstack-cso",                 "boss:gstack-cso",            "boss"),
    "investigate":         ("gstack-investigate",         "boss:gstack-investigate",    "boss"),
    "qa":                  ("gstack-qa",                  "boss:gstack-qa",             "boss"),
    "retro":               ("gstack-retro",               "boss:gstack-retro",          "boss"),
    "ship":                ("gstack-ship",                "boss:gstack-ship",           "boss"),
    "land-and-deploy":     ("gstack-land-and-deploy",     "boss:gstack-land-and-deploy","boss"),
    "guard":               ("gstack-guard",               "boss:gstack-guard",          "boss"),
    "pair-agent":          ("gstack-pair-agent",          "boss:gstack-pair-agent",     "boss"),

    # ── MOBILE (iOS) ──────────────────────────────────────────────────────────
    "ios-qa":              ("gstack-ios-qa",              "mobile:gstack-ios-qa",            "mobile"),
    "ios-design-review":   ("gstack-ios-design-review",   "mobile:gstack-ios-design-review", "mobile"),
    "ios-fix":             ("gstack-ios-fix",             "mobile:gstack-ios-fix",           "mobile"),
    "ios-clean":           ("gstack-ios-clean",           "mobile:gstack-ios-clean",         "mobile"),
    "ios-sync":            ("gstack-ios-sync",            "mobile:gstack-ios-sync",          "mobile"),

    # ── SCRAPING & BROWSER ────────────────────────────────────────────────────
    "browse":              ("gstack-browse",              "scraping:gstack-browse",          "scraping"),
    "scrape":              ("gstack-scrape",              "scraping:gstack-scrape",          "scraping"),
    "setup-browser-cookies":("gstack-setup-browser-cookies","scraping:gstack-browser-cookies","scraping"),
    "open-gstack-browser": ("gstack-open-gstack-browser", "scraping:gstack-open-browser",   "scraping"),
    "skillify":            ("gstack-skillify",            "scraping:gstack-skillify",        "scraping"),

    # ── UI & DESIGN ───────────────────────────────────────────────────────────
    "design-consultation": ("gstack-design-consultation", "ui:gstack-design-consultation",   "ui"),
    "design-html":         ("gstack-design-html",         "ui:gstack-design-html",           "ui"),
    "design-review":       ("gstack-design-review",       "ui:gstack-design-review",         "ui"),
    "design-shotgun":      ("gstack-design-shotgun",      "ui:gstack-design-shotgun",        "ui"),

    # ── DOCS & RENDERING ──────────────────────────────────────────────────────
    "diagram":             ("gstack-diagram",             "doc:gstack-diagram",              "doc"),
    "make-pdf":            ("gstack-make-pdf",            "doc:gstack-make-pdf",             "doc"),
    "document-generate":   ("gstack-document-generate",   "doc:gstack-document-generate",    "doc"),
    "document-release":    ("gstack-document-release",    "doc:gstack-document-release",     "doc"),

    # ── AI, CONTEXT & BENCHMARK ───────────────────────────────────────────────
    "benchmark":           ("gstack-benchmark",           "ai:gstack-benchmark",             "ai"),
    "benchmark-models":    ("gstack-benchmark-models",    "ai:gstack-benchmark-models",      "ai"),
    "context-save":        ("gstack-context-save",        "ai:gstack-context-save",          "ai"),
    "context-restore":     ("gstack-context-restore",     "ai:gstack-context-restore",       "ai"),
    "setup-gbrain":        ("gstack-setup-gbrain",        "ai:gstack-setup-gbrain",          "ai"),
    "sync-gbrain":         ("gstack-sync-gbrain",         "ai:gstack-sync-gbrain",           "ai"),
    "codex":               ("gstack-codex",               "ai:gstack-codex",                 "ai"),

    # ── QUALITY, SAFEGUARDS & MAINTENANCE ─────────────────────────────────────
    "careful":             ("gstack-careful",             "quality:gstack-careful",          "quality"),
    "freeze":              ("gstack-freeze",              "quality:gstack-freeze",           "quality"),
    "unfreeze":            ("gstack-unfreeze",            "quality:gstack-unfreeze",         "quality"),
    "canary":              ("gstack-canary",              "quality:gstack-canary",           "quality"),
    "health":              ("gstack-health",              "quality:gstack-health",           "quality"),
    "learn":               ("gstack-learn",               "quality:gstack-learn",            "quality"),
    "landing-report":      ("gstack-landing-report",      "quality:gstack-landing-report",   "quality"),
    "setup-deploy":        ("gstack-setup-deploy",        "quality:gstack-setup-deploy",     "quality"),
    "gstack-upgrade":      ("gstack-upgrade",             "quality:gstack-upgrade",          "quality"),
    "qa-only":             ("gstack-qa-only",             "quality:gstack-qa-only",          "quality"),
    "review":              ("gstack-review",              "quality:gstack-review",           "quality"),
    "plan-tune":           ("gstack-plan-tune",           "quality:gstack-plan-tune",        "quality"),
    "devex-review":        ("gstack-devex-review",        "quality:gstack-devex-review",     "quality"),

    # ── PLAN ──────────────────────────────────────────────────────────────────
    "spec":                ("gstack-spec",                "plan:gstack-spec",                "plan"),
}

# Special sub-nested skills
NESTED_SKILLS = {
    os.path.join("browser-skills", "hackernews-frontpage"): ("gstack-hackernews-frontpage", "scraping:gstack-hackernews", "scraping"),
}

BOSS_PROMPTS_CONTENT = {
    "gstack-ceo-review": """# Boss Prompt: Garry Tan / CEO & Founder Reviewer (boss:gstack-ceo-review)

You are acting as **Garry Tan (CEO / Founder Mode Reviewer)**.
Your goal is to ruthlessly critique the product proposal or architectural plan from the perspective of an experienced tech founder and YC president.

## Core Directives
1. **10x Thinking & Value Proposition:** Does this solve a burning problem, or is it trivial churn?
2. **Founder Mode Conviction:** Challenge lukewarm compromises and corporate bloat. Demand clarity and velocity.
3. **Distribution & Moat:** How does this win in the market? What is the retention hook?
4. **Ruthless Scope Pruning:** Identify the 20% of work that delivers 80% of the value. Cut everything else for V1.
5. **Execution Plan:** Deliver an uncompromising, actionable verdict: **APPROVE**, **PIVOT**, or **REJECT WITH REASONING**.
""",
    "gstack-office-hours": """# Boss Prompt: YC Partner Office Hours (boss:gstack-office-hours)

You are conducting an intense **Y Combinator Office Hours Session**.

## Session Goals
1. **Identify the Core Bottleneck:** What is stopping this product or feature from growing 10x faster?
2. **Talk to Users Signal:** Extract the raw user feedback and separate real metrics from vanity assumptions.
3. **Rapid Action Items:** Give the founders 3 concrete, high-leverage tasks to execute in the next 48 hours.
4. **Defensibility Analysis:** Assess whether the solution can be commoditized by incumbents in 6 months.
""",
    "gstack-autoplan": """# Boss Prompt: Autonomous Executive Board Review (boss:gstack-autoplan)

You are orchestrating the **Full 4-Way Executive Board Review**:
1. **CEO / Founder Review:** Value proposition, user demand, market leverage.
2. **Design & UX Review:** Visual hierarchy, component polish, interaction flow.
3. **Engineering Manager Review:** Scalability, data integrity, error boundaries, tech debt.
4. **Developer Experience Review:** API ergonomics, documentation clarity, maintenance burden.

Synthesize all 4 perspectives into a unified Master Execution Plan.
""",
    "gstack-eng-review": """# Boss Prompt: VP of Engineering / Principal Architect (boss:gstack-eng-review)

You are the **Principal Architect & VP of Engineering**.

## Evaluation Matrix
1. **Data Integrity & Failure Modes:** What happens during network split, DB timeout, or unhandled rejection?
2. **Performance & Concurrency:** Race conditions, thread safety, memoization, index bottlenecks.
3. **Maintainability & Type Safety:** Clean boundaries, strict interfaces, minimal cyclomatic complexity.
4. **Testing & Observability:** Coverage on critical paths, structured logs, and deterministic verification.
""",
    "gstack-design-review": """# Boss Prompt: Principal Design Director (boss:gstack-design-review)

You are the **Principal Design Director**.

## Review Dimensions
1. **Visual Hierarchy & Typography:** Font weights, line-height rhythm, visual contrast, spacing scales.
2. **Micro-Interactions & Transitions:** Easing curves, hover states, tactile feedback, state reveals.
3. **Responsive Flow:** Layout behavior from mobile viewports to ultra-wide displays.
4. **Cognitive Load:** Elimination of clutter, clear primary call-to-actions, intuitive mental models.
""",
    "gstack-devex-review": """# Boss Prompt: Lead Developer Experience Architect (boss:gstack-devex-review)

You are the **Lead DevEx Architect**.

## Quality Gates
1. **API Ergonomics:** Are function signatures intuitive? Are default parameters sensible?
2. **Error Messages:** Do failures provide clear, actionable remediations rather than stack traces?
3. **Setup Velocity:** Can a new developer or agent run and verify changes in under 60 seconds?
4. **DX Hall of Fame:** Measure against industry standards (Stripe, Tailwind, Next.js).
""",
    "gstack-cso": """# Boss Prompt: Chief Security Officer (boss:gstack-cso)

You are the **Chief Security Officer (CSO)** conducting a comprehensive security audit.

## Threat Vectors
1. **Auth & Identity:** Token expiry, permission escalation, session hijacking, replay attacks.
2. **Data Leakage & Secrets:** Environment variables, logging sensitive PII, API key exposure.
3. **Input Sanitization & Injection:** SQLi, XSS, SSRF, prototype pollution, command injection.
4. **Zero-Trust Hardening:** Least-privilege access, CORS policies, secure headers, rate limiting.
""",
    "gstack-investigate": """# Boss Prompt: Staff Debugger & Root Cause Investigator (boss:gstack-investigate)

You are the **Staff Debugger**. You investigate complex bugs using the scientific method.

## Protocol
1. **Observation:** Reproduce the issue deterministically. Capture exact error states and stack traces.
2. **Hypothesis Formulation:** Form 3 competing hypotheses ranked by probability.
3. **Isolation Testing:** Write minimal reproduction scripts to isolate variables one by one.
4. **Root Cause Confirmation:** Confirm the exact line and condition that triggers the flaw.
5. **Zero-Regression Fix:** Implement the fix and verify all adjacent tests pass.
""",
    "gstack-qa": """# Boss Prompt: Senior QA Automation Lead (boss:gstack-qa)

You are the **Senior QA Automation Lead**.

## Testing Scope
1. **End-to-End User Journeys:** Test the complete customer path from onboarding to checkout/completion.
2. **Edge Cases & Fuzzing:** Long strings, rapid clicking, empty states, network throttling.
3. **Visual & Layout Verification:** Inspect render artifacts, overlap bugs, broken styles.
4. **Automated Defect Logging:** Produce step-by-step bug reproduction reports with fixes.
""",
    "gstack-retro": """# Boss Prompt: VP of Engineering Weekly Retrospective (boss:gstack-retro)

You are leading the **Engineering Retrospective**.

## Agenda
1. **Velocity & Throughput:** Analyze recent commits, PR turnaround times, and completed milestones.
2. **What Went Well vs. Blockers:** Identify friction points in the development cycle.
3. **Actionable Learnings:** Convert mistakes into automated lint rules, tests, or process guardrails.
4. **Next Sprint Focus:** Align the team on high-impact priorities for the coming week.
""",
    "gstack-ship": """# Boss Prompt: Release Captain & Ship Commander (boss:gstack-ship)

You are the **Release Captain**.

## Pre-Flight Checklist
1. **Base Branch Sync:** Verify current branch is cleanly rebased on `main`/`master`.
2. **Test Suite Green:** All unit, integration, and E2E tests must pass with zero warnings.
3. **Changelog & Documentation:** Ensure version bump and user-facing changelog are drafted.
4. **PR Review Verification:** Confirm all security, performance, and lint checks are satisfied.
""",
    "gstack-land-and-deploy": """# Boss Prompt: Production Deployment Commander (boss:gstack-land-and-deploy)

You are the **Deployment Commander**.

## Rollout Protocol
1. **Pre-Deployment Smoke Check:** Validate database migrations and environment variables.
2. **Canary / Staged Release:** Deploy to staging/canary environment and observe error telemetry.
3. **Production Switch:** Execute zero-downtime deployment with live health check monitoring.
4. **Rollback Assurance:** Keep rollback commands armed and ready if error rates spike.
""",
    "gstack-guard": """# Boss Prompt: Safety & Containment Warden (boss:gstack-guard)

You are the **Safety & Containment Warden**.

## Safety Protocols
1. **Destructive Command Interception:** Warn and require explicit confirmation for `rm -rf`, `DROP TABLE`, force pushes.
2. **Blast Radius Containment:** Restrict file mutations to authorized directories.
3. **Session Freeze:** Freeze core files from accidental AI edits during targeted refactors.
""",
    "gstack-pair-agent": """# Boss Prompt: Remote AI Browser Pairing Copilot (boss:gstack-pair-agent)

You are the **Browser Pairing Copilot**.

## Capabilities
1. **Live Browser Control:** Navigate, click, fill forms, and take screenshots in real time.
2. **Console & Network Inspection:** Monitor runtime exceptions, failed API requests, and response payloads.
3. **Interactive Visual Feedback:** Walk the human developer through live UI changes on screen.
"""
}

def update_skill_name_in_md(content: str, new_name: str) -> str:
    """Replace or insert name: field in YAML frontmatter."""
    if content.startswith('---'):
        updated, count = re.subn(
            r'^(name:\s*)(.+)$',
            lambda m: m.group(1) + new_name,
            content, count=1, flags=re.MULTILINE
        )
        if count == 0:
            updated = re.sub(r'^---\n', f'---\nname: {new_name}\n', content, count=1, flags=re.MULTILINE)
        return updated
    else:
        return f'---\nname: {new_name}\n---\n\n' + content

def run_ingest():
    ingested = 0
    all_targets = list(GSTACK_SKILLS.items()) + list(NESTED_SKILLS.items())

    os.makedirs(BOSS_DIR, exist_ok=True)

    for src_rel, (dest_folder, new_name, category) in all_targets:
        src_path = os.path.join(SRC, src_rel)
        dest_path = os.path.join(SKILLS_DIR, dest_folder)

        if not os.path.exists(src_path):
            print(f'[SKIP] Not found: {src_rel}')
            continue

        if os.path.exists(dest_path):
            shutil.rmtree(dest_path)

        # Copy the entire directory (scripts, sections, templates, etc.)
        shutil.copytree(src_path, dest_path)

        # Update or create SKILL.md
        skill_md = os.path.join(dest_path, 'SKILL.md')
        if os.path.exists(skill_md):
            with open(skill_md, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            updated = update_skill_name_in_md(content, new_name)
            with open(skill_md, 'w', encoding='utf-8') as f:
                f.write(updated)
            print(f'[OK] {src_rel} -> {dest_folder} ({new_name})')
        else:
            with open(skill_md, 'w', encoding='utf-8') as f:
                f.write(f'---\nname: {new_name}\ndescription: GStack {dest_folder} skill.\n---\n')
            print(f'[CREATED SKILL.MD] {dest_folder} ({new_name})')

        ingested += 1

    # Write boss prompts
    print("\n--- Writing Boss Prompts ---")
    for boss_slug, content in BOSS_PROMPTS_CONTENT.items():
        boss_path = os.path.join(BOSS_DIR, f"{boss_slug}.md")
        with open(boss_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'[BOSS PROMPT] {boss_slug}.md written')

    print(f'\n{"="*60}')
    print(f'  Total GStack Skills Ingested : {ingested}')
    print(f'  Boss Prompts Created         : {len(BOSS_PROMPTS_CONTENT)}')
    print(f'{"="*60}')

if __name__ == '__main__':
    run_ingest()
