# marketing:eval-config

View and tune the brand's content evaluation settings — per-dimension minimum score thresholds, composite weight distribution, auto-reject floors, and content-type overrides — with validation, before/after scoring comparisons, and industry-based recommendations. Outputs an updated, internally consistent eval configuration. Triggers on \"/digital-marketing-pro:eval-config\", \"raise the hallucination threshold\", \"why did this draft auto-reject\", \"recommend eval settings for healthcare\", \"reset eval scoring to defaults\". Reads the brand profile and guidelines, writes via eval-config-manager.py, and pairs with /digital-marketing-pro:eval-content to see the new bar in action.

**Skill folder:** `skills/digital-marketing-pro-eval-config/`
**Namespace:** `marketing`
