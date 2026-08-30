# marketing:campaign-audit

Inventory and score everything currently running for a brand across paid search, paid social, email, organic, SEO, AEO/GEO, CRM, and analytics — produces a dated audit document with a 4-tier triage (healthy / quick win / strategic gap / red flag), a quick-wins backlog, and a compliance posture section. Strictly read-only: it never pauses, edits, or launches anything. Triggers on \"/digital-marketing-pro:campaign-audit\", \"what's currently running for this brand\", \"audit our existing campaigns\", \"we just inherited this account\", \"where is budget leaking\". Requires a validated brand profile (run validate-profile first); missing connectors degrade gracefully into findings. Feeds /digital-marketing-pro:campaign-plan and pairs with /digital-marketing-pro:performance-check.

**Skill folder:** `skills/digital-marketing-pro-campaign-audit/`
**Namespace:** `marketing`
