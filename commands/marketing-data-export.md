# marketing:data-export

Export marketing data — metrics, contacts, campaigns, performance snapshots — to BigQuery, Google Sheets, or Supabase as clean tabular data with schema documentation, PII redaction, and post-export integrity verification, gated behind an explicit approval step. Triggers on \"/digital-marketing-pro:data-export\", \"send this month's metrics to BigQuery\", \"export contacts to a Google Sheet\", \"get campaign data into our warehouse\", \"set up a recurring weekly export\". Reads local campaign, execution, and performance stores plus connected analytics and CRM MCPs, and pairs with /digital-marketing-pro:segment-audience to build a segment before exporting its members.

**Skill folder:** `skills/digital-marketing-pro-data-export/`
**Namespace:** `marketing`
