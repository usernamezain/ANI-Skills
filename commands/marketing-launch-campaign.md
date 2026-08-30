# marketing:launch-campaign

Orchestrate the full multi-channel launch of an approved campaign plan — pre-launch BLOCKER gates (approved plan, assets present, connectors probed, conversion tracking verified, C2PA-signed AI assets for EU markets), then dependency-ordered activation across CRM, landing page, email, paid ads, organic social, influencer, and PR, with a checkpoint after every step and a dual-copy launch record. Nothing executes until the dry-run preview is shown and the user types an explicit yes. Triggers on \"/digital-marketing-pro:launch-campaign\", \"go live with the campaign\", \"kick off the launch\", \"activate every channel for this campaign\", \"flip the switch on the launch\". Consumes the plan from /digital-marketing-pro:campaign-plan, delegates paid ads to /digital-marketing-pro:launch-ad-campaign, and resumes interrupted launches via /digital-marketing-pro:resume.

**Skill folder:** `skills/digital-marketing-pro-launch-campaign/`
**Namespace:** `marketing`
