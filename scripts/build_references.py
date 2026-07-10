import os
import glob
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

root_dir = r"c:\Users\SHABBIR TRADERS\Desktop\skills"
skills_dir = os.path.join(root_dir, "skills")

animation_skills = {
    "animated-stats-counter-section", "animation-accessibility-performance-audit",
    "buttery-smooth-120fps-performance", "circular-radial-menu-reveal",
    "cross-device-responsive-qa", "custom-cursor-effects",
    "floating-label-contact-form-section", "fluid-responsive-layout-system",
    "fullscreen-menu-overlay", "gsap-scrolltrigger-effects",
    "gsap-timeline-choreography", "hero-cinematic-parallax-section",
    "hero-split-text-reveal-section", "horizontal-scroll-gallery-section",
    "magnetic-cta-section", "magnetic-huge-text-nav-links",
    "marquee-logo-cloud-section", "mask-reveal-footer-section",
    "mega-menu-dropdown", "morph-mask-reveal-transitions",
    "morph-newsletter-signup-section", "morphing-hamburger-icon",
    "one-of-a-kind-portfolio-builder", "pinned-storytelling-about-section",
    "portfolio-hover-reveal-grid-section", "precision-easing-motion-design",
    "preloader-visual-loading", "retro-90s-ui-effects",
    "scroll-comparison-table-section", "scroll-morph-navbar-section",
    "scroll-pinned-timeline-section", "scrub-carousel-testimonials-section",
    "side-drawer-nav-menu", "smooth-accordion-faq-section",
    "split-panel-menu-reveal", "stagger-reveal-blog-cards-section",
    "text-motion-typography", "threejs-interactive-backgrounds",
    "tilt-3d-team-cards-section", "tilt-hover-pricing-cards-section",
    "top-down-curtain-menu", "video-hero-section"
}

def extract_code_blocks(md_content):
    # Find all fenced code blocks like ```lang ... ```
    blocks = re.findall(r"```([a-zA-Z0-9_-]+)\r?\n(.*?)\r?\n```", md_content, re.DOTALL)
    html_blocks = []
    css_blocks = []
    js_blocks = []
    
    for lang, code in blocks:
        lang = lang.lower()
        if lang == 'html':
            html_blocks.append(code)
        elif lang == 'css':
            css_blocks.append(code)
        elif lang in ('js', 'javascript'):
            js_blocks.append(code)
            
    return html_blocks, css_blocks, js_blocks

def build_animation_reference(skill_name, md_content, dest_folder):
    html_blocks, css_blocks, js_blocks = extract_code_blocks(md_content)
    
    # If no code blocks found, fallback to generating a README.md
    if not html_blocks and not css_blocks and not js_blocks:
        build_workflow_reference(skill_name, md_content, dest_folder)
        return
        
    os.makedirs(dest_folder, exist_ok=True)
    index_path = os.path.join(dest_folder, "index.html")
    
    # Determine CDN libraries based on text/code context
    needs_three = 'three.js' in md_content.lower() or 'webgl' in md_content.lower() or 'particle' in md_content.lower()
    needs_anime = 'anime.js' in md_content.lower() or 'anime(' in md_content.lower()
    needs_lenis = 'lenis' in md_content.lower()
    
    scripts = [
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>',
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>'
    ]
    
    if needs_three:
        scripts.append('<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>')
    if needs_anime:
        scripts.append('<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>')
    if needs_lenis:
        scripts.append('<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>')
        
    scripts_html = "\n  ".join(scripts)
    
    combined_html = "\n\n".join(html_blocks)
    combined_css = "\n\n".join(css_blocks)
    combined_js = "\n\n".join(js_blocks)
    
    # Wrap in basic HTML structure
    html_template = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Skill Reference: {skill_name}</title>
  {scripts_html}
  <style>
    body {{
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #0b0b0b;
      color: #f5f5f5;
      overflow-x: hidden;
    }}
    
    /* Combined CSS from skill */
    {combined_css}
  </style>
</head>
<body>

  <!-- Combined HTML Structure -->
  {combined_html}

  <script>
    document.addEventListener("DOMContentLoaded", () => {{
      // Register GSAP ScrollTrigger if present
      if (typeof ScrollTrigger !== "undefined") {{
        gsap.registerPlugin(ScrollTrigger);
      }}

      // Basic Lenis scroll integration if needed
      if (typeof Lenis !== "undefined") {{
        const lenis = new Lenis({{
          duration: 1.1,
          easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true
        }});
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => {{ lenis.raf(time * 1000); }});
        gsap.ticker.lagSmoothing(0);
      }}

      // Combined Animation Code
      {combined_js}
    }});
  </script>
</body>
</html>
"""
    
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(html_template)

def build_workflow_reference(skill_name, md_content, dest_folder):
    os.makedirs(dest_folder, exist_ok=True)
    readme_path = os.path.join(dest_folder, "README.md")
    
    # Extract metadata from frontmatter
    fm_match = re.match(r'^---\r?\n(.*?)\r?\n---\r?\n', md_content, re.DOTALL)
    description = ""
    allowed_tools = ""
    
    if fm_match:
        fm_text = fm_match.group(1)
        desc_match = re.search(r'^description:\s*(.+)$', fm_text, re.MULTILINE)
        tools_match = re.search(r'^allowed-tools:\s*(.+)$', fm_text, re.MULTILINE)
        
        description = desc_match.group(1).strip() if desc_match else "No description provided."
        allowed_tools = tools_match.group(1).strip() if tools_match else "No specific tools restricted."
        
    readme_template = f"""# Skill Reference: {skill_name}

This directory contains reference documentation and execution guidelines for the `{skill_name}` agent skill.

## Metadata & Integration Details

- **Skill Identifier**: `{skill_name}`
- **Purpose**: {description}
- **Allowed Tools**: `{allowed_tools}`

## Guidelines for Coding Agents

1. **Triggering Intent**: This skill should be loaded by an AI coding agent whenever the user request matches the purpose or constraints described above.
2. **Context Integrity**: Maintain documentation integrity. Keep comments and descriptions matching the source file specifications.
3. **Execution Safety**: Do not modify files outside the scope of the active milestone unless authorized by safety gates.
"""
    
    with open(readme_path, "w", encoding="utf-8") as f:
        f.write(readme_template)

# Iterate through skills folder
skills = [d for d in os.listdir(skills_dir) if os.path.isdir(os.path.join(skills_dir, d))]
created_count = 0
skipped_count = 0

for d in skills:
    skill_path = os.path.join(skills_dir, d)
    skill_md = os.path.join(skill_path, "SKILL.md")
    dest_ref_folder = os.path.join(skill_path, "references")
    
    if not os.path.exists(skill_md):
        continue
        
    # Check if references folder already exists
    if os.path.exists(dest_ref_folder):
        skipped_count += 1
        continue
        
    # Read SKILL.md
    with open(skill_md, "r", encoding="utf-8-sig") as f:
        content = f.read()
        
    if d in animation_skills:
        build_animation_reference(d, content, dest_ref_folder)
    else:
        build_workflow_reference(d, content, dest_ref_folder)
        
    created_count += 1

print("\n--- Reference Building Summary ---")
print(f"Total skills directories scanned: {len(skills)}")
print(f"Created 'references/' folder for: {created_count} skills.")
print(f"Skipped (already exist): {skipped_count} skills.")
sys.exit(0)
