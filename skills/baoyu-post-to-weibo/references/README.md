# Skill Reference: baoyu-post-to-weibo

This directory contains reference documentation and execution guidelines for the `baoyu-post-to-weibo` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `baoyu-post-to-weibo`
- **Purpose**: Posts content to Weibo (微博). Supports regular posts with text, images, and videos, and headline articles (头条文章) with Markdown input via Chrome CDP. Use when user asks to "post to Weibo", "发微博", "发布微博", "publish to Weibo", "share on Weibo", "写微博", or "微博头条文章".
- **Allowed Tools**: `No specific tools restricted.`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
