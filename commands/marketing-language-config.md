# marketing:language-config

Configure the brand's multilingual settings in profile.json — primary and secondary languages, do-not-translate terms, preferred translation service per language (routed by language family across the translation MCPs you have connected), and locale formatting for dates, numbers, and currency — with view/add/remove/reset actions and a before/after diff on every change. Triggers on \"/digital-marketing-pro:language-config\", \"add German as a target language\", \"never translate our product name\", \"set the date format for the UK site\", \"which languages is this brand set up for\". This configuration is read by every multilingual command — /digital-marketing-pro:translate-content, /digital-marketing-pro:multilingual-score, /digital-marketing-pro:language-audit, and /digital-marketing-pro:hreflang-check.

**Skill folder:** `skills/digital-marketing-pro-language-config/`
**Namespace:** `marketing`
