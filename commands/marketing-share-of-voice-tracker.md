# marketing:share-of-voice-tracker

Use when the user asks to "track our share of voice", "what share of the conversation do we own vs competitors", or "trend our SOV this quarter"; computes SOV% = brand mentions ÷ (brand + competitor panel mentions) per platform per period on a LOCKED competitor panel — a panel switch invalidates the trend (restart the series and log the break; the ECHO O3 rule) — plus a sentiment-weighted SOV variant (sentiment labeled Estimated unless human-coded) and a Wikipedia-pageviews attention-share alternative; built from keyless listening connectors, gdelt.py news echo, and user exports — public counts only, closed platforms are never scraped. Not for backlink or offsite SEO signals — use offsite-signal-analyzer. 声量份额/竞品声量对比/提及份额/注意力份额

**Skill folder:** `skills/aaron-marketing-skills-share-of-voice-tracker/`
**Namespace:** `marketing`
