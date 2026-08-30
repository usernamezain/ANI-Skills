# marketing:credential-switch

Switch the active credential profile to a different client brand, validating each configured platform's API keys, env vars, and token expiry before anything runs — preventing cross-client data leaks and misrouted ad spend. Outputs a per-platform validation report plus a logged switch confirmation with audit trail. Triggers on \"/digital-marketing-pro:credential-switch\", \"switch to the other client's account\", \"activate Acme's API keys\", \"are the right credentials active\", \"change which brand we're working on\". Reads brand and credential profiles under ~/.claude-marketing/ and pairs with /digital-marketing-pro:client-onboarding when a profile is missing.

**Skill folder:** `skills/digital-marketing-pro-credential-switch/`
**Namespace:** `marketing`
