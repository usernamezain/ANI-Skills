# marketing:seo-implement

Execute approved SEO changes on a connected WordPress or Webflow CMS — meta title/description updates, JSON-LD schema deployment, canonical URLs, 301/302 redirects, and Search Console indexing requests — with before/after diffs, post-deploy verification, and stored rollback snapshots. Every run stops at a mandatory approval gate: nothing deploys until the user reviews the diff and gives explicit approval. Triggers on \"/digital-marketing-pro:seo-implement\", \"update the meta tags on these pages\", \"deploy the schema markup\", \"set up 301 redirects for the migration\", \"push the audit fixes live\". Consumes PLAN.md from /digital-marketing-pro:seo-audit, reads the brand profile, and logs every change via seo-executor.py.

**Skill folder:** `skills/digital-marketing-pro-seo-implement/`
**Namespace:** `marketing`
