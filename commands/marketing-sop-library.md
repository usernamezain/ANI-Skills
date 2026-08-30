# marketing:sop-library

Manage the agency's Standard Operating Procedure library — create SOPs from category templates, list the library, assign SOPs to brands with per-brand overrides, check compliance against logged executions, version updates with archived backups, and view full histories. Triggers on \"/digital-marketing-pro:sop-library\", \"create an SOP for blog publishing\", \"assign the reporting SOP to this brand\", \"are we following our SOPs\", \"update the campaign launch checklist\". Stores SOPs under ~/.claude-marketing/sops/, reads execution history via execution-tracker.py for compliance scoring, flags declining adherence, and pairs with brand profiles in multi-client agency workflows.

**Skill folder:** `skills/digital-marketing-pro-sop-library/`
**Namespace:** `marketing`
