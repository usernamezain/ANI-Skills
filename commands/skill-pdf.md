---
name: skill:pdf
description: Use this skill whenever the user wants to do anything with PDF files. This includes reading or extracting text/tables from PDFs, combining or merging multiple PDFs into one, splitting PDFs apart, rotating pages, adding watermarks, creating new PDFs, filling PDF forms, encrypting/decrypting PDFs, extracting images, and OCR on scanned PDFs to make them searchable. If the user mentions a .pdf file or asks to produce one, use this skill.
allowed-tools:
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
  - Agent
---
<objective>
Trigger and execute the Antigravity skill: pdf.
Load the prompt instructions from skills/pdf/SKILL.md and consult the copy-pasteable references or guidelines inside skills/pdf/references/ to complete the task.
</objective>

<execution_context>
@skills/pdf/SKILL.md
</execution_context>
