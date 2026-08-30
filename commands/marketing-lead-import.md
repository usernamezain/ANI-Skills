# marketing:lead-import

Import leads into Salesforce, HubSpot, Zoho, or Pipedrive with validation, deduplication against existing CRM records, lead scoring, consent and compliance checks, and source attribution — then push via the CRM MCP and return a full import report with an audit log. Triggers on \"/digital-marketing-pro:lead-import\", \"import these leads\", \"load this CSV into the CRM\", \"add the webinar signups to HubSpot\", \"dedupe and score this lead list\". Nothing touches the live CRM until the Execution Summary is approved with a typed yes — the approval gate is mandatory. Scores leads with the marketing-automation lead-scoring framework and reads the brand profile; for general CRM syncing without scoring use /digital-marketing-pro:crm-sync.

**Skill folder:** `skills/digital-marketing-pro-lead-import/`
**Namespace:** `marketing`
