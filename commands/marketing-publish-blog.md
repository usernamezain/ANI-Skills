# marketing:publish-blog

Publish a blog post to WordPress or Webflow through the connected CMS MCP with SEO metadata, categories and tags, featured image, slug optimization, and optional scheduling. Runs pre-publish gates — content-scorer.py, brand-voice-scorer.py, SEO and compliance checks — and a MANDATORY approval gate: an Execution Summary the user must approve with an explicit typed yes (logged via approval-manager.py) before anything goes live, then verifies the live URL and schema markup and submits to Google Search Console if connected. Triggers on \"/digital-marketing-pro:publish-blog\", \"publish this post to WordPress\", \"push the draft live on Webflow\", \"schedule this article for Monday\", \"take this blog post live\". Reads the brand profile and platform-publishing-specs.md for CMS field mappings.

**Skill folder:** `skills/digital-marketing-pro-publish-blog/`
**Namespace:** `marketing`
