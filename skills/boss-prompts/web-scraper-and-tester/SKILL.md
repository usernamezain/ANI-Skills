---
name: ani:boss-prompt-web-scraper-and-tester
description: Orchestrates browser automation, dynamic page crawling, element selecting, and end-to-end user flow testing using Puppeteer, Playwright, Selenium, and Cypress.
argument-hint: "[additional instructions]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
---
# Master Boss Prompt: The Web Scraper & Browser Automation Specialist

Orchestrates browser automation, dynamic page crawling, element selecting, and end-to-end user flow testing using Puppeteer, Playwright, Selenium, and Cypress.

## Orchestrated Skills
This master prompt integrates the following core skills from the library:
- `skills/puppeteer-skill/` ([SKILL.md](../skills/puppeteer-skill/SKILL.md))
- `skills/playwright-skill/` ([SKILL.md](../skills/playwright-skill/SKILL.md))
- `skills/selenium-skill/` ([SKILL.md](../skills/selenium-skill/SKILL.md))
- `skills/cypress-skill/` ([SKILL.md](../skills/cypress-skill/SKILL.md))
- `skills/webdriverio-skill/` ([SKILL.md](../skills/webdriverio-skill/SKILL.md))
- `skills/browser-testing-with-devtools/` ([SKILL.md](../skills/browser-testing-with-devtools/SKILL.md))
- `skills/smartui-skill/` ([SKILL.md](../skills/smartui-skill/SKILL.md))

## Trigger Details
- **Role Identity**: `web-scraper-and-tester`
- **Skills Combined**: `puppeteer-skill`, `playwright-skill`, `selenium-skill`, `cypress-skill`, `webdriverio-skill`, `browser-testing-with-devtools`, `smartui-skill`

## Boss Prompt Template
Copy and paste this instruction block into your AI coding agent chat to coordinate the skills for your task:

```markdown
Act as a Browser Automation & Web Scraping Architect. Your objective is to scrape, crawl, or automate a web flow. You must evaluate the target's requirements and apply:
1. Choose the optimal framework:
   - Use `puppeteer-skill` for fast, lightweight headless Chromium crawling and PDF/screenshot generation.
   - Use `playwright-skill` for multi-browser support (Chromium, Firefox, WebKit) and modern async selector wait states.
   - Use `selenium-skill` or `webdriverio-skill` for cross-platform legacy browser drivers or custom grid runs.
   - Use `cypress-skill` for end-to-end visual dashboard testing of DOM nodes.
2. Apply `browser-testing-with-devtools` to trace network requests, inspect headers, evaluate console errors, and handle anti-scraping/CAPTCHA blocks (e.g. User-Agent rotation, viewport overrides, cloudflare wait states).
3. Use `smartui-skill` to execute visual regression tests and take screenshot comparisons.
```
