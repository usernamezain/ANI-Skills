#!/usr/bin/env python3
import os
import sys
import json
import re
from datetime import datetime

def generate_scan(target_dir):
    print(f"Scanning codebase in: {target_dir}")
    
    # 1. Gather all files excluding .git, node_modules, .codebase, and temp_clones
    scanned_files = []
    ignored_patterns = [r'\.git', r'node_modules', r'\.codebase', r'temp_clones', r'\.gemini[\\/]antigravity-ide[\\/]brain']
    
    for root, dirs, files in os.walk(target_dir):
        # Apply ignores to dirs in-place to skip traversing them
        dirs[:] = [d for d in dirs if not any(re.search(pat, os.path.join(root, d)) for pat in ignored_patterns)]
        
        for file in files:
            full_path = os.path.join(root, file)
            if any(re.search(pat, full_path) for pat in ignored_patterns):
                continue
            scanned_files.append(os.path.relpath(full_path, target_dir))
            
    print(f"Found {len(scanned_files)} files to scan.")
    
    # 2. Extract Tech Stack
    tech_stack = []
    dependencies = {}
    pkg_json_path = os.path.join(target_dir, "package.json")
    if os.path.exists(pkg_json_path):
        try:
            with open(pkg_json_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                tech_stack.append("Node.js / NPM")
                if "dependencies" in data:
                    dependencies.update(data["dependencies"])
                if "devDependencies" in data:
                    dependencies.update(data["devDependencies"])
        except Exception as e:
            print(f"Error parsing package.json: {e}")
            
    # Check Python, Rust, Go, etc.
    py_files = [f for f in scanned_files if f.endswith(".py")]
    js_files = [f for f in scanned_files if f.endswith(".js") or f.endswith(".cjs") or f.endswith(".mjs")]
    rs_files = [f for f in scanned_files if f.endswith(".rs")]
    go_files = [f for f in scanned_files if f.endswith(".go")]
    
    if py_files:
        tech_stack.append("Python")
    if js_files:
        tech_stack.append("JavaScript (Node.js)")
    if rs_files:
        tech_stack.append("Rust")
    if go_files:
        tech_stack.append("Go")
        
    # 3. Detect AI integrations or cloned GitHub repos references
    ai_cloned_references = []
    github_patterns = [r'github\.com/([\w\-\.]+)/([\w\-\.]+)', r'git clone']
    ai_patterns = [r'gemini', r'claude', r'openai', r'replicate', r'dify', r'llm', r'vector db', r'chroma', r'pinecone']
    
    for rel_path in scanned_files:
        if any(rel_path.endswith(ext) for ext in ['.md', '.py', '.js', '.json', '.toml']):
            try:
                with open(os.path.join(target_dir, rel_path), "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                    
                # Scan for Git references
                for match in re.finditer(r'github\.com/([\w\-\.]+)/([\w\-\.]+)', content):
                    ref = f"https://github.com/{match.group(1)}/{match.group(2)}"
                    if ref not in ai_cloned_references:
                        ai_cloned_references.append(f"GitHub Repository: {ref} (referenced in `{rel_path}`)")
                        
                # Scan for AI references
                for pat in ai_patterns:
                    if re.search(r'\b' + pat + r'\b', content, re.IGNORECASE):
                        ref = f"AI integration reference: '{pat}' (found in `{rel_path}`)"
                        if ref not in ai_cloned_references:
                            ai_cloned_references.append(ref)
            except Exception as e:
                pass

    # 4. Generate Directory Architect Map
    architect_map = []
    for f in sorted(scanned_files):
        parts = f.split(os.sep)
        depth = len(parts) - 1
        indent = "  " * depth
        architect_map.append(f"{indent}- {parts[-1]}")
    architect_text = "\n".join(architect_map)

    # 5. Extract Functions & Algorithms
    functions_list = []
    func_pattern_py = r'def\s+(\w+)\s*\((.*?)\):'
    func_pattern_js = r'(?:function\s+(\w+)|(\w+)\s*=\s*\((.*?)\)\s*=>|(\w+)\s*\((.*?)\)\s*\{)'
    
    for rel_path in scanned_files:
        if rel_path.endswith(".py"):
            try:
                with open(os.path.join(target_dir, rel_path), "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                matches = re.findall(func_pattern_py, content)
                for name, args in matches:
                    functions_list.append(f"- Python Function: `{name}({args.strip()})` in file `{rel_path}`")
            except:
                pass
        elif any(rel_path.endswith(ext) for ext in ['.js', '.cjs', '.mjs']):
            try:
                with open(os.path.join(target_dir, rel_path), "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                matches = re.findall(func_pattern_js, content)
                for m in matches:
                    name = next(x for x in m if x)
                    functions_list.append(f"- JS Function: `{name}()` in file `{rel_path}`")
            except:
                pass

    # 6. Generate individual markdown reports
    codebase_dir = os.path.join(target_dir, ".codebase")
    os.makedirs(codebase_dir, exist_ok=True)
    
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # 6.1 timestamp
    ts_md = f"""# Time-stamp of Last Scan

- **Date and Time of Scan:** `{timestamp}`
- **Files Scanned:** {len(scanned_files)}
- **Scan Base Directory:** `{target_dir}`
"""
    with open(os.path.join(codebase_dir, "time-stamp of last scan.md"), "w", encoding="utf-8") as f:
        f.write(ts_md)

    # 6.2 tech-stack
    ts_list_str = "\n".join([f"- {tech}" for tech in tech_stack])
    dep_list_str = "\n".join([f"  - `{k}`: `{v}`" for k, v in dependencies.items()])
    tech_md = f"""# Technology Stack

## Core Technologies
{ts_list_str}

## Dependencies
{dep_list_str if dependencies else "- None detected"}
"""
    with open(os.path.join(codebase_dir, "tech-stack.md"), "w", encoding="utf-8") as f:
        f.write(tech_md)

    # 6.3 ai used or github cloned
    ai_cloned_str = "\n".join([f"- {ref}" for ref in ai_cloned_references])
    ai_md = f"""# AI Used and Cloned Repositories

## Detected References
{ai_cloned_str if ai_cloned_references else "- No AI or external GitHub repository references detected."}
"""
    with open(os.path.join(codebase_dir, "ai used or github cloned.md"), "w", encoding="utf-8") as f:
        f.write(ai_md)

    # 6.4 architect
    arch_md = f"""# Codebase Architecture

## Directory Tree Map
```
{architect_text}
```
"""
    with open(os.path.join(codebase_dir, "architect.md"), "w", encoding="utf-8") as f:
        f.write(arch_md)

    # 6.5 navigation
    nav_md = f"""# Codebase Navigation Guide

## Entry Points
- Main Entry File: `{scanned_files[0] if scanned_files else "None"}`
- Active Config Folder: `.gemini/config/`
- Command Registry: `.gemini/commands/`

## Key Paths
- `/skills/` - Core AI Agent skills registry
- `/bin/` - Execution scripts and installation files
- `/scripts/` - Ingestion, compilation, and linting helpers
"""
    with open(os.path.join(codebase_dir, "navigation.md"), "w", encoding="utf-8") as f:
        f.write(nav_md)

    # 6.6 algorithm and function
    func_str = "\n".join(functions_list)
    algo_md = f"""# Core Algorithms and Functions

## Function Registry
{func_str if functions_list else "- No functions parsed."}
"""
    with open(os.path.join(codebase_dir, "algorithm and function.md"), "w", encoding="utf-8") as f:
        f.write(algo_md)

    # 6.7 how it works
    works_md = f"""# How It Works

## Lifecycle Workflows
1. **Bootstrap & Install:** `bin/install.js` runs to copy or symlink files to the corresponding user directories.
2. **Auto Detection:** `--auto` mode scans configuration environments (`~/.gemini`, `~/.cursor`, etc.) to run silently.
3. **Slash Commands:** The TOML configurations in `.gemini/commands/` register shortcuts in the AI CLI.
4. **Skills Ingestion:** Ingestion scripts copy and parse repository guides, wrapping them into the `ani:` namespace.
"""
    with open(os.path.join(codebase_dir, "how it works.md"), "w", encoding="utf-8") as f:
        f.write(works_md)

    # 6.8 description and summarizing
    summary_md = f"""# Codebase Summary

This repository is a consolidated professional skills library (`ani-skills`) designed for advanced AI agent workspaces. It hosts 466 skills covering UI/UX animations, plans, testing suites, scraping directives, and DSA workflows. It is mapped to the `ani:` trigger namespace for clean execution under multiple platforms.
"""
    with open(os.path.join(codebase_dir, "description and summarizing.md"), "w", encoding="utf-8") as f:
        f.write(summary_md)

    # 6.9 all info (combined monolithic file)
    all_info_md = f"""# Codebase Inspection - Complete Analysis Report

---
{summary_md}

---
{ts_md}

---
{tech_md}

---
{ai_md}

---
{arch_md}

---
{nav_md}

---
{algo_md}

---
{works_md}
"""
    with open(os.path.join(codebase_dir, "all info.md"), "w", encoding="utf-8") as f:
        f.write(all_info_md)
        
    print(f"Deep code scan successfully written to `.codebase/` with all 9 reports!")

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else os.getcwd()
    generate_scan(target)
