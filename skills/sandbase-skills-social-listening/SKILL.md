---
name: ai:social-listening
description: "Monitor conversations about any topic, brand, or keyword across Twitter, Reddit, Threads, Weibo, and community platforms simultaneously. Aggregates volume, sentiment, key voices, and emerging narratives across the global social web."
---

# Social Listening

Monitor conversations about any topic, brand, or keyword across Twitter, Reddit, Threads, Weibo, and community platforms simultaneously. Aggregates volume, sentiment, key voices, and emerging narratives across the global social web. Read [the API map](references/sandbase-api-map.md) before selecting a capability.

## Call SandBase capabilities

For every selected tool, call `sandbase_describe_tool` first and use only arguments in its current input schema. Then call `sandbase_call_tool` with the exact `tool_name`.

## Available Tools

- `twitter_web_search_timeline`
- `reddit_app_dynamic_search`
- `threads_web_search_recent`
- `weibo_web_search`
- `bilibili_web_general_search`

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
- Use this skill when the task involves `social-listening` workflows, tooling, or domain requirements from `sandbaseai/sandbase-skills`.
- Trigger on user keywords: `social-listening`, `sandbase-skills`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
