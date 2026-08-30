# marketing:hreflang-check

Audit hreflang implementation from supplied HTML, sitemap XML, or SEO-tool exports (it does not crawl sites) — running seven checks: self-referential tags, bidirectional pairs, valid ISO 639-1/3166-1 codes, x-default, duplicates, absolute URLs, and URL consistency — producing a 0-100 score, a language coverage matrix, and corrected code snippets per issue. Triggers on \"/digital-marketing-pro:hreflang-check\", \"audit our hreflang tags\", \"why is Google serving the wrong language version\", \"check x-default configuration\", \"validate our international SEO tags\". Compares findings against the brand's configured languages in profile.json to flag markets with no hreflang coverage.

**Skill folder:** `skills/digital-marketing-pro-hreflang-check/`
**Namespace:** `marketing`
