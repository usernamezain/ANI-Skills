#!/usr/bin/env python3
"""
ingest_gsap_skills.py
=====================
Ingests 8 official GSAP skills from the cloned greensock/gsap-skills repo
into the ANI-Skills library under the ui: namespace.

Mapping:
  gsap-core          -> ui:gsap-core          (folder: gsap-core)
  gsap-frameworks    -> ui:gsap-frameworks     (folder: gsap-frameworks)
  gsap-performance   -> ui:gsap-performance    (folder: gsap-performance)
  gsap-plugins       -> ui:gsap-plugins        (folder: gsap-plugins)
  gsap-react         -> ui:gsap-react          (folder: gsap-react)
  gsap-scrolltrigger -> ui:gsap-scrolltrigger-official (folder: gsap-scrolltrigger-official)
  gsap-timeline      -> ui:gsap-timeline-official      (folder: gsap-timeline-official)
  gsap-utils         -> ui:gsap-utils          (folder: gsap-utils)
"""
import os, re, shutil, sys

sys.stdout.reconfigure(encoding='utf-8')

ROOT      = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC       = os.path.join(ROOT, '_tmp_gsap_skills', 'skills')
SKILLS_DIR= os.path.join(ROOT, 'skills')

# Map: source-folder -> (dest-folder, new-name, description-override)
SKILL_MAP = {
    'gsap-core':          ('gsap-core',                   'ui:gsap-core',                  ''),
    'gsap-frameworks':    ('gsap-frameworks',              'ui:gsap-frameworks',             ''),
    'gsap-performance':   ('gsap-performance',             'ui:gsap-performance',            ''),
    'gsap-plugins':       ('gsap-plugins',                 'ui:gsap-plugins',               ''),
    'gsap-react':         ('gsap-react',                   'ui:gsap-react',                 ''),
    'gsap-scrolltrigger': ('gsap-scrolltrigger-official',  'ui:gsap-scrolltrigger-official',''),
    'gsap-timeline':      ('gsap-timeline-official',       'ui:gsap-timeline-official',     ''),
    'gsap-utils':         ('gsap-utils',                   'ui:gsap-utils',                 ''),
}

def update_skill_name_in_md(content: str, new_name: str) -> str:
    """Replace or insert name: field in YAML frontmatter."""
    # Check if frontmatter exists
    if content.startswith('---'):
        # Replace existing name: field
        updated, count = re.subn(
            r'^(name:\s*)(.+)$',
            lambda m: m.group(1) + new_name,
            content, count=1, flags=re.MULTILINE
        )
        if count == 0:
            # No name field — inject after opening ---
            updated = re.sub(r'^---\n', f'---\nname: {new_name}\n', content, count=1, flags=re.MULTILINE)
        return updated
    else:
        # No frontmatter at all — prepend one
        return f'---\nname: {new_name}\n---\n\n' + content


def ingest():
    ingested = 0
    skipped  = 0

    for src_folder, (dest_folder, new_name, _) in SKILL_MAP.items():
        src_path  = os.path.join(SRC, src_folder)
        dest_path = os.path.join(SKILLS_DIR, dest_folder)

        if not os.path.exists(src_path):
            print(f'[SKIP] Source not found: {src_path}')
            skipped += 1
            continue

        # Remove existing dest if present
        if os.path.exists(dest_path):
            shutil.rmtree(dest_path)

        # Copy entire skill folder
        shutil.copytree(src_path, dest_path)
        print(f'[COPY] {src_folder} -> {dest_folder}')

        # Update name: in SKILL.md
        skill_md = os.path.join(dest_path, 'SKILL.md')
        if os.path.exists(skill_md):
            with open(skill_md, 'r', encoding='utf-8-sig') as f:
                content = f.read()
            updated = update_skill_name_in_md(content, new_name)
            with open(skill_md, 'w', encoding='utf-8') as f:
                f.write(updated)
            print(f'  [OK] name: {new_name}')
        else:
            # Create minimal SKILL.md
            with open(skill_md, 'w', encoding='utf-8') as f:
                f.write(f'---\nname: {new_name}\ndescription: Official GSAP skill for {src_folder}\n---\n')
            print(f'  [CREATED] minimal SKILL.md for {new_name}')

        ingested += 1

    print(f'\n{"="*60}')
    print(f'  Ingested : {ingested}')
    print(f'  Skipped  : {skipped}')
    print(f'{"="*60}')


if __name__ == '__main__':
    ingest()
