---
name: ani:deep-code-scan
description: Deep static scan of codebase to generate .codebase documentation reports
argument-hint: "[target directory]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
---

# Deep Code Scan Skill

This skill performs a comprehensive analysis of your active workspace directory, parsing all files and directories, and outputs structured reports inside the `.codebase/` folder.

## Generated Reports

- **architect.md:** Structure and directory trees of the project.
- **navigation.md:** Navigation maps, entry points, and path summaries.
- **algorithm and function.md:** Registry of defined helper functions and code methods.
- **how it works.md:** Step-by-step description of operational lifecycles.
- **description and summarizing.md:** Contextual summary of the project scope.
- **time-stamp of last scan.md:** Local timestamp, files count, and scan duration.
- **tech-stack.md:** Package list, language definitions, and compiler runtimes.
- **ai used or github cloned.md:** References to AI providers, API frameworks, and cloned packages.
- **all info.md:** Monolithic report combining all analysis files.

## How to Run

Execute using the slash command:
`/ani-deep-code-scan`
