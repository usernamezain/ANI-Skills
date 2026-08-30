---
name: ai:exa-similar-finder
description: "Find web pages and content similar to a given URL using Exa's neural similarity search. Ideal for competitor discovery, alternative source finding, related content research, and expanding research beyond known sources."
---

# Exa Similar Finder

Find web pages and content similar to a given URL using Exa's neural similarity search. Ideal for competitor discovery, alternative source finding, related content research, and expanding research beyond known sources. Read [the API map](references/sandbase-api-map.md) before selecting a capability.

## Call SandBase capabilities

For every selected tool, call `sandbase_describe_tool` first and use only arguments in its current input schema. Then call `sandbase_call_tool` with the exact `tool_name`.

## Available Tools

- `exa_find_similar`

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
- Use this skill when the task involves `exa-similar-finder` workflows, tooling, or domain requirements from `sandbaseai/sandbase-skills`.
- Trigger on user keywords: `exa-similar-finder`, `sandbase-skills`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
