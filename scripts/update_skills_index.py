#!/usr/bin/env python3
"""
Update skills_index.json by scanning the skills/ directory.
This script extracts names and descriptions from SKILL.md files and generates the index.
"""
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

def extract_description(skill_md_path):
    try:
        with open(skill_md_path, "r", encoding="utf-8-sig") as f:
            content = f.read(10000) # Read first 10000 chars for frontmatter
            
            # Try to find description in YAML frontmatter
            match = re.search(r'^description:\s*(.+)$', content, re.MULTILINE)
            if match:
                desc = match.group(1).strip()
                # Remove quotes if present
                if (desc.startswith('"') and desc.endswith('"')) or (desc.startswith("'") and desc.endswith("'")):
                    desc = desc[1:-1].strip()
                return desc
    except Exception as e:
        print(f"Error reading {skill_md_path}: {e}")
        
    return ""

def update_index():
    # Anchor to the project root directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    os.chdir(project_root)
    
    skills_dir = "skills"
    index_path = "skills_index.json"
    
    if not os.path.exists(skills_dir):
        print(f"Error: {skills_dir} directory not found.")
        return
        
    skills = []
    
    # Walk skills directory recursively to find all SKILL.md files
    for root, dirs, files in os.walk(skills_dir):
        if "SKILL.md" in files:
            skill_md_path = os.path.join(root, "SKILL.md")
            
            # Get relative skill path from skills/
            rel_dir = os.path.relpath(root, skills_dir)
            skill_id = rel_dir.replace(os.sep, "/")
            
            # Skip hidden directories
            if any(part.startswith('.') for part in rel_dir.split(os.sep)):
                continue
                
            desc = extract_description(skill_md_path)
            
            # Get skill frontmatter name key
            name = skill_id
            try:
                with open(skill_md_path, "r", encoding="utf-8-sig") as f:
                    fm_content = f.read(2000)
                    name_match = re.search(r'^name:\s*(.+)$', fm_content, re.MULTILINE)
                    if name_match:
                        name = name_match.group(1).strip()
            except:
                pass
            
            skills.append({
                "id": skill_id,
                "path": f"skills/{skill_id}",
                "name": name,
                "description": desc
            })
                
    # Sort by id for consistency
    skills.sort(key=lambda x: x["id"])
    
    try:
        with open(index_path, "w", encoding="utf-8") as f:
            json.dump(skills, f, indent=2, ensure_ascii=False)
        print(f"Successfully updated {index_path} with {len(skills)} skills.")
    except Exception as e:
        print(f"Error writing to {index_path}: {e}")

if __name__ == "__main__":
    update_index()
