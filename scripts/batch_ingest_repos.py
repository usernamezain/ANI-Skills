#!/usr/bin/env python3
"""
batch_ingest_repos.py
=====================
Automated engine that iterates through all repository entries in `skill-word.md`,
clones them sequentially with non-blocking environment, extracts/synthesizes skills
with rich "When to use / What to use" contracts, places them into semantic namespaces,
builds references, updates `skill-word.md`, and cleans up temporary directories.
"""
import os, re, shutil, subprocess, sys

sys.stdout.reconfigure(encoding='utf-8')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKILLS_DIR = os.path.join(ROOT, "skills")
SKILL_WORD_FILE = os.path.join(ROOT, "skill-word.md")
TMP_DIR = os.path.join(ROOT, "_tmp_batch_repo")

# Disable git credential popups / interactive prompts
GIT_ENV = os.environ.copy()
GIT_ENV["GIT_TERMINAL_PROMPT"] = "0"
GIT_ENV["GIT_ASKPASS"] = "echo"

NAMESPACE_RULES = [
    (r'marketing|advertis|growth|seo|aso|linkedin|sales|persuasion|copywriting|gtm|cmo|postiz|tweet|distribb|citlyze|supercmo', 'marketing'),
    (r'security|trailofbits|vibesec|cso|vuln|threat|hardening', 'security'),
    (r'auth|auth0|oauth|jwt|session', 'auth'),
    (r'flutter|expo|react-native|ios|swiftui|mobile', 'mobile'),
    (r'threejs|webgpu|nixie|remotion|stitch|design|hig-doctor|canvas|animation|gsap|ui-ux', 'ui'),
    (r'duckdb|mongodb|redis|qdrant|database|sql|vector|materials-simulation', 'db'),
    (r'sentry|datadog|opentelemetry|monitoring|observability|health', 'monitoring'),
    (r'openai|huggingface|fal-ai|minimax|coderabbit|ai-research|ai-dev-kit|gbrain|llm', 'ai'),
    (r'browserbase|scrape|twitter-scraper|tweetclaw|browse', 'scraping'),
    (r'prose|humanizer|unslop|writing|notion|pdf|diagram|markdown', 'doc'),
    (r'product-manager|pm-skills|agile|scrum|spec', 'plan'),
    (r'azure|microsoft|wordpress|firebase|resend|mailtrap|n8n|cloud|devops', 'cloud'),
    (r'apollo|graphql|api', 'api'),
    (r'quality|web-quality|performance', 'quality'),
]

def determine_namespace(repo_name: str, skill_name: str, desc: str) -> str:
    text = f"{repo_name} {skill_name} {desc}".lower()
    for pattern, ns in NAMESPACE_RULES:
        if re.search(pattern, text):
            return ns
    return "ai"

def update_skill_word_entry(repo_url: str, count: int, status: str = "Ingested"):
    if not os.path.exists(SKILL_WORD_FILE):
        return
    with open(SKILL_WORD_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    escaped_url = re.escape(repo_url)
    pattern = rf'- \[[ x]\] (\[.*?\]\({escaped_url}.*?\))(.*)'
    replacement = rf'- [x] \1 — **{status} ({count} skills)**'
    new_content, n = re.subn(pattern, replacement, content)
    if n > 0:
        with open(SKILL_WORD_FILE, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"  [CHECKLIST] Updated skill-word.md for {repo_url}")

def sanitize_slug(name: str) -> str:
    return re.sub(r'[^a-zA-Z0-9_-]', '-', name).strip('-').lower()

def extract_readme_sections(readme_path: str) -> dict:
    if not os.path.exists(readme_path):
        return {"desc": "", "content": ""}
    with open(readme_path, "r", encoding="utf-8", errors="ignore") as f:
        full = f.read()

    lines = full.split("\n")
    desc_lines = []
    for line in lines[1:25]:
        line_str = line.strip()
        if line_str and not line_str.startswith("#") and not line_str.startswith("[!"):
            desc_lines.append(line_str)
            if len(desc_lines) >= 3:
                break
    desc = " ".join(desc_lines) if desc_lines else "Specialized AI skill package."

    return {
        "desc": desc[:300],
        "content": full
    }

def process_repo(repo_url: str):
    print(f"\n============================================================")
    print(f" Processing: {repo_url}")
    print(f"============================================================")

    if os.path.exists(TMP_DIR):
        try:
            shutil.rmtree(TMP_DIR)
        except:
            subprocess.run(["powershell", "-Command", f"Remove-Item -Recurse -Force '{TMP_DIR}'"], capture_output=True)

    clone_cmd = ["git", "clone", "--depth", "1", repo_url, TMP_DIR]
    try:
        res = subprocess.run(clone_cmd, capture_output=True, text=True, env=GIT_ENV, timeout=45)
    except subprocess.TimeoutExpired:
        print(f"  [TIMEOUT] Git clone timed out for {repo_url}")
        update_skill_word_entry(repo_url, 0, status="Unavailable / Private repo")
        return
    except Exception as e:
        print(f"  [ERROR] {e}")
        update_skill_word_entry(repo_url, 0, status=f"Error: {e}")
        return

    if res.returncode != 0:
        print(f"  [SKIPPED] Repo not accessible: {res.stderr.strip()[:100]}")
        update_skill_word_entry(repo_url, 0, status="Unavailable / Private upstream")
        return

    repo_parts = repo_url.rstrip("/").split("/")
    repo_owner = repo_parts[-2] if len(repo_parts) >= 2 else "upstream"
    repo_name = repo_parts[-1]

    found_skills = []
    for root, dirs, files in os.walk(TMP_DIR):
        if ".git" in root:
            continue
        for f in files:
            if f.lower() == "skill.md":
                found_skills.append((os.path.relpath(root, TMP_DIR), os.path.join(root, f)))

    ingested_count = 0

    if found_skills:
        print(f"  [DISCOVERY] Found {len(found_skills)} existing SKILL.md definitions.")
        for rel_dir, skill_md_path in found_skills:
            with open(skill_md_path, "r", encoding="utf-8", errors="ignore") as sf:
                skill_content = sf.read()

            m_name = re.search(r'^name:\s*(.+)$', skill_content, re.MULTILINE)
            m_desc = re.search(r'^description:\s*(.+)$', skill_content, re.MULTILINE)

            raw_name = m_name.group(1).strip().strip('"\'') if m_name else (os.path.basename(rel_dir) if rel_dir != "." else repo_name)
            raw_name = raw_name.replace("ani:", "").replace("gstack-", "")
            raw_desc = m_desc.group(1).strip().strip('"\'') if m_desc else f"Skill from {repo_name}"

            ns = determine_namespace(repo_name, raw_name, raw_desc)
            slug = sanitize_slug(raw_name)
            final_name = f"{ns}:{slug}"
            dest_folder_name = f"{repo_name}-{slug}" if slug != repo_name else repo_name
            dest_dir = os.path.join(SKILLS_DIR, dest_folder_name)

            os.makedirs(dest_dir, exist_ok=True)
            src_skill_dir = os.path.dirname(skill_md_path)
            for item in os.listdir(src_skill_dir):
                s_item = os.path.join(src_skill_dir, item)
                d_item = os.path.join(dest_dir, item)
                if os.path.isdir(s_item):
                    shutil.copytree(s_item, d_item, dirs_exist_ok=True)
                elif item.lower() != "skill.md":
                    shutil.copy(s_item, d_item)

            when_section = f"""

## When to Use
- Use this skill when the task involves `{raw_name}` workflows, tooling, or domain requirements from `{repo_owner}/{repo_name}`.
- Trigger on user keywords: `{raw_name}`, `{repo_name}`, `{ns}`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
"""
            if "When to Use" not in skill_content:
                skill_content += when_section

            if skill_content.startswith("---"):
                new_skill_content = re.sub(r'^(name:\s*)(.+)$', f'name: {final_name}', skill_content, count=1, flags=re.MULTILINE)
                if 'name:' not in new_skill_content:
                    new_skill_content = re.sub(r'^---\n', f'---\nname: {final_name}\n', new_skill_content, count=1)
            else:
                new_skill_content = f"---\nname: {final_name}\ndescription: \"{raw_desc}\"\n---\n\n" + skill_content

            with open(os.path.join(dest_dir, "SKILL.md"), "w", encoding="utf-8") as out_f:
                out_f.write(new_skill_content)

            print(f"  [INGESTED] {final_name} -> skills/{dest_folder_name}/")
            ingested_count += 1

    else:
        print(f"  [SYNTHESIS] Synthesizing skill from repository README...")
        readme_candidates = ["README.md", "readme.md", "Readme.md"]
        readme_file = None
        for rc in readme_candidates:
            p = os.path.join(TMP_DIR, rc)
            if os.path.exists(p):
                readme_file = p
                break

        readme_info = extract_readme_sections(readme_file) if readme_file else {"desc": f"{repo_name} tools and methodologies.", "content": ""}
        ns = determine_namespace(repo_name, repo_name, readme_info["desc"])
        slug = sanitize_slug(repo_name)
        final_name = f"{ns}:{slug}"
        dest_folder_name = f"{repo_name}"
        dest_dir = os.path.join(SKILLS_DIR, dest_folder_name)
        ref_dir = os.path.join(dest_dir, "references")

        os.makedirs(ref_dir, exist_ok=True)

        for item in os.listdir(TMP_DIR):
            if item.startswith(".") or item in ["node_modules", ".git"]:
                continue
            src_item = os.path.join(TMP_DIR, item)
            dst_item = os.path.join(ref_dir, item)
            try:
                if os.path.isdir(src_item):
                    shutil.copytree(src_item, dst_item, dirs_exist_ok=True)
                else:
                    shutil.copy(src_item, dst_item)
            except Exception as e:
                pass

        skill_body = f"""---
name: {final_name}
description: "{readme_info['desc'].replace('\"', '')}"
---

# {repo_name} Skill

{readme_info['desc']}

## When to Use
- Use this skill whenever working with `{repo_name}` or related `{ns}` workflows.
- Use when the user requests functionality, patterns, or architecture described in `{repo_owner}/{repo_name}`.

## What to Use
- Apply the authoritative guides, configurations, API patterns, and code samples stored in `references/`.
- Follow best practices established by official maintainers.

## Core Documentation & Reference
```markdown
{readme_info['content'][:15000]}
```
"""
        with open(os.path.join(dest_dir, "SKILL.md"), "w", encoding="utf-8") as out_f:
            out_f.write(skill_body)

        print(f"  [SYNTHESIZED] {final_name} -> skills/{dest_folder_name}/")
        ingested_count += 1

    try:
        shutil.rmtree(TMP_DIR)
    except:
        subprocess.run(["powershell", "-Command", f"Remove-Item -Recurse -Force '{TMP_DIR}'"], capture_output=True)

    update_skill_word_entry(repo_url, ingested_count, status="Ingested")

def main():
    if not os.path.exists(SKILL_WORD_FILE):
        print(f"Error: {SKILL_WORD_FILE} not found.")
        return

    with open(SKILL_WORD_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    # Extract all uncompleted markdown links: - [ ] [title](url)
    matches = re.findall(r'- \[ \] \[(.*?)\]\((https://github\.com/[^\s\)]+)\)', content)
    print(f"Found {len(matches)} remaining repositories to process.")

    for title, url in matches:
        clean_url = url.split("/tree/")[0].split(" ")[0].rstrip("/")
        process_repo(clean_url)

    print("\nAll repository ingestions complete! Rebuilding index and commands...")

if __name__ == '__main__':
    main()
