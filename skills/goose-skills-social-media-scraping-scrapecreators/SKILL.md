---
name: marketing:social-media-scraping-scrapecreators
description: Compatibility alias for the original ScrapeCreators social scraping skill. Use scrapecreators-api for current endpoint guidance and the task-specific Brand Growth research skills for finished analysis.
tags: [social, research, deprecated]
---

# ScrapeCreators social scraping (compatibility alias)

This legacy slug remains available so existing installations do not break.

For current work:

1. Use `scrapecreators-api` for provider authentication, endpoints, pagination, provenance, and normalized output.
2. Use a task-specific workflow for the final deliverable:
   - `comment-mining`
   - `competitor-social-research`
   - `influencer-prospecting`
   - `trend-discovery`
   - `outlier-post-finder`
   - `social-listening-brief`
   - `product-demand-research`
   - `competitor-ad-intelligence`

Do not stop at a raw API response when the user asked for research or a recommendation.


## When to Use
- Use this skill when the task involves `social-media-scraping-scrapecreators` workflows, tooling, or domain requirements from `gooseworks-ai/goose-skills`.
- Trigger on user keywords: `social-media-scraping-scrapecreators`, `goose-skills`, `marketing`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
