---
name: marketing:startup-research
description: "Research startups and emerging companies with funding data, team composition, product positioning, market traction, and news coverage. Combines Apollo firmographics, LinkedIn team data, and web intelligence for comprehensive startup due diligence."
---

# Startup Research

Research startups and emerging companies with funding data, team composition, product positioning, market traction, and news coverage. Combines Apollo firmographics, LinkedIn team data, and web intelligence for comprehensive startup due diligence. Read [the API map](references/sandbase-api-map.md) before selecting a capability.

## Call SandBase capabilities

For every selected tool, call `sandbase_describe_tool` first and use only arguments in its current input schema. Then call `sandbase_call_tool` with the exact `tool_name`.

## Available Tools

- `apollo_company_enrich`
- `apollo_company_news_search`
- `linkedin_web_v2_company_profile`
- `linkedin_web_v2_company_posts`
- `tavily_search`
- `exa_search`

## Workflow

1. Understand the user's research question, target, and context.
2. Call `sandbase_describe_tool` for each selected tool to confirm parameter schema.
3. Call `sandbase_call_tool` with the exact tool_name and schema-defined arguments.
4. Synthesize findings into a clear, evidence-backed answer.
5. Cite sources, note evidence gaps, and separate observations from interpretations.

## Guidelines

- Always call `sandbase_describe_tool` before using any capability.
- Cite sources and preserve attribution (URLs, usernames, dates, metrics).
- Separate factual observations from analysis and recommendations.
- If data is unavailable, note the gap and continue with available evidence.
- Read-only research only. Never take actions on platforms.


## When to Use
- Use this skill when the task involves `startup-research` workflows, tooling, or domain requirements from `sandbaseai/sandbase-skills`.
- Trigger on user keywords: `startup-research`, `sandbase-skills`, `marketing`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
