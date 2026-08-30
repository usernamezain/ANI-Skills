#!/usr/bin/env python3
"""
regen_toml_commands.py
======================
Regenerates ALL .gemini/commands/*.toml files from SKILL.md data.
Reads each skill's name + description from SKILL.md and writes a TOML
slash-command file that uses the new semantic namespace (e.g. ui:gsap-scrolltrigger).

Also regenerates the commands/*.md stub files.
"""
import os, re, sys, json

sys.stdout.reconfigure(encoding='utf-8')

def read_frontmatter(skill_md_path: str) -> dict:
    """Extract name, description from SKILL.md YAML frontmatter."""
    result = {"name": "", "description": ""}
    try:
        with open(skill_md_path, "r", encoding="utf-8-sig") as f:
            content = f.read(5000)
        name_m = re.search(r'^name:\s*(.+)$', content, re.MULTILINE)
        desc_m = re.search(r'^description:\s*(.+)$', content, re.MULTILINE)
        if name_m:
            result["name"] = name_m.group(1).strip().strip('"\'')
        if desc_m:
            result["description"] = desc_m.group(1).strip().strip('"\'')
    except Exception as e:
        print(f"  [WARN] Could not read {skill_md_path}: {e}")
    return result


def slug_from_name(name: str) -> str:
    """
    Convert semantic name to a safe TOML filename slug.
    e.g.  ui:gsap-scrolltrigger  →  ui-gsap-scrolltrigger
          start:new-project       →  start-new-project
    """
    return name.replace(":", "-").replace("/", "-").replace(" ", "-").lower()


TOML_TEMPLATE = '''\
description = "{description}"

prompt = """
Invoke the {name} skill.
Load the prompt instructions from skills/{folder_id}/SKILL.md and consult the copy-pasteable references or guidelines inside skills/{folder_id}/references/ to complete the task.
"""
'''

COMMAND_MD_TEMPLATE = '''\
# {name}

{description}

**Skill folder:** `skills/{folder_id}/`
**Namespace:** `{namespace}`
'''


def run():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    skills_dir   = os.path.join(project_root, "skills")
    toml_dir     = os.path.join(project_root, ".gemini", "commands")
    commands_dir = os.path.join(project_root, "commands")

    # Clean old TOML files
    if os.path.exists(toml_dir):
        for f in os.listdir(toml_dir):
            if f.endswith(".toml"):
                try:
                    os.remove(os.path.join(toml_dir, f))
                except:
                    pass
    os.makedirs(toml_dir, exist_ok=True)

    # Clean old command stubs
    if os.path.exists(commands_dir):
        for f in os.listdir(commands_dir):
            if f.endswith(".md"):
                try:
                    os.remove(os.path.join(commands_dir, f))
                except:
                    pass
    os.makedirs(commands_dir, exist_ok=True)

    # Also regenerate boss-prompt TOMLs from boss-prompts/*.md
    boss_dir = os.path.join(project_root, "boss-prompts")

    written = 0
    errors  = 0

    # ── 1. Skills ─────────────────────────────────────────────────────────────
    for root, dirs, files in os.walk(skills_dir):
        if "SKILL.md" not in files:
            continue
        rel = os.path.relpath(root, skills_dir)
        if any(p.startswith('.') for p in rel.split(os.sep)):
            continue

        folder_id = rel.replace(os.sep, "/")
        skill_md  = os.path.join(root, "SKILL.md")
        fm        = read_frontmatter(skill_md)

        name      = fm["name"] or folder_id
        desc      = fm["description"] or f"Execute the {name} skill."
        # Escape quotes in desc for TOML
        desc_escaped = desc.replace('"', '\\"')
        namespace = name.split(":")[0] if ":" in name else "skill"

        slug = slug_from_name(name)

        # Write TOML
        toml_content = TOML_TEMPLATE.format(
            description=desc_escaped,
            name=name,
            folder_id=folder_id,
        )
        toml_path = os.path.join(toml_dir, f"{slug}.toml")
        try:
            with open(toml_path, "w", encoding="utf-8") as f:
                f.write(toml_content)
        except Exception as e:
            print(f"  [ERROR] TOML write {toml_path}: {e}")
            errors += 1
            continue

        # Write commands stub
        cmd_content = COMMAND_MD_TEMPLATE.format(
            name=name,
            description=desc,
            folder_id=folder_id,
            namespace=namespace,
        )
        cmd_path = os.path.join(commands_dir, f"{slug}.md")
        try:
            with open(cmd_path, "w", encoding="utf-8") as f:
                f.write(cmd_content)
        except Exception as e:
            print(f"  [ERROR] CMD write {cmd_path}: {e}")

        print(f"  [OK] /{slug}")
        written += 1

    # ── 2. Boss prompts ───────────────────────────────────────────────────────
    if os.path.exists(boss_dir):
        for fname in sorted(os.listdir(boss_dir)):
            if not fname.endswith(".md"):
                continue
            slug_base = fname.replace(".md", "")
            name      = f"boss:{slug_base}"
            try:
                with open(os.path.join(boss_dir, fname), "r", encoding="utf-8-sig") as f:
                    raw = f.read(1000)
                # Try to grab first non-empty line after # heading as description
                lines = [l.strip() for l in raw.split('\n') if l.strip() and not l.startswith('#')]
                desc = lines[0] if lines else f"Boss prompt: {slug_base}"
            except:
                desc = f"Boss prompt: {slug_base}"

            desc_escaped = desc.replace('"', '\\"')
            slug = f"boss-{slug_base}"
            toml_content = f'''\
description = "{desc_escaped}"

prompt = """
Invoke the {name} boss prompt.
Load the instructions from boss-prompts/{fname} to orchestrate a multi-skill workflow.
"""
'''
            toml_path = os.path.join(toml_dir, f"{slug}.toml")
            try:
                with open(toml_path, "w", encoding="utf-8") as f:
                    f.write(toml_content)
                print(f"  [OK] /{slug} (boss)")
                written += 1
            except Exception as e:
                print(f"  [ERROR] {slug}: {e}")
                errors += 1

    print(f"\n{'='*60}")
    print(f"  TOML commands written : {written}")
    print(f"  Errors                : {errors}")
    print(f"  Output dir (TOML)     : {toml_dir}")
    print(f"  Output dir (stubs)    : {commands_dir}")
    print(f"{'='*60}")


if __name__ == "__main__":
    run()
