# marketing:gsc-ai-performance

Baseline and interpret Google Search Console's AI Performance Report — combined AI Overviews + AI Mode impressions, cited pages, country and device mix (no click data; attribution stays in GA4) — from a user-supplied CSV export, with an in-SC AI opt-out recommendation and a gated quality scorecard. Triggers on \"/digital-marketing-pro:gsc-ai-performance\", \"read the new GSC AI report\", \"baseline our AI search visibility\", \"how many AI Overviews impressions do we get\", \"should we opt out of AI results\". Parses and archives exports via gsc-ai-performance.py, reconciles actuals against /digital-marketing-pro:aeo-audit probes, and feeds /digital-marketing-pro:seo-drift.

**Skill folder:** `skills/digital-marketing-pro-gsc-ai-performance/`
**Namespace:** `marketing`
