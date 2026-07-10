#!/usr/bin/env python3
"""
Verify library integrity by validating that all 271 skill files have proper YAML frontmatter and formatting.
"""
import os
import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Anchor to the project root directory
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
os.chdir(project_root)

skills_dir = "skills"

# Count total SKILL.md files
skill_paths = glob.glob(os.path.join(skills_dir, "**/SKILL.md"), recursive=True)
print(f"Total SKILL.md files found: {len(skill_paths)}")

# Validate that we have skills
if len(skill_paths) == 0:
    print("Error: No skills found.")
    sys.exit(1)

# Inspect all SKILL.md files for correct YAML structure
invalid_skills = []
for path in skill_paths:
    try:
        with open(path, "r", encoding="utf-8-sig") as f:
            content = f.read(10000) # Read first 10000 chars for frontmatter
            fm_match = re.match(r'^---\r?\n(.*?)\r?\n---\r?\n', content, re.DOTALL)
            if not fm_match:
                invalid_skills.append((path, f"Missing frontmatter delimiters (---). Starts with: {repr(content[:30])}"))
                continue
            
            fm_text = fm_match.group(1)
            name_match = re.search(r'^name:\s*(.+)$', fm_text, re.MULTILINE)
            desc_match = re.search(r'^description:\s*(.+)$', fm_text, re.MULTILINE)
            
            if not name_match:
                invalid_skills.append((path, "Missing 'name' field in frontmatter"))
            if not desc_match:
                invalid_skills.append((path, "Missing 'description' field in frontmatter"))
    except Exception as e:
        invalid_skills.append((path, f"Read error: {e}"))

if invalid_skills:
    print(f"Error: Found {len(invalid_skills)} invalid skill files:")
    for path, reason in invalid_skills:
        print(f" - {os.path.relpath(path, project_root)}: {reason}")
    sys.exit(1)
else:
    print(f"All {len(skill_paths)} skill files successfully passed the YAML frontmatter check.")
    sys.exit(0)
