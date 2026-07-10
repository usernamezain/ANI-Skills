---
name: ani:pro:russian-website
description: Generate a premium high-contrast, cyberpunk-themed Russian Samurai promotional website with terminal boot preloader, diagonal sliced parallax image reveal scrolling, and interactive grid boards with red neon borders. Use this skill when the user asks for a Russian-themed design, cyber samurai layout, black-and-red high contrast cyberpunk pages, or terminal preloaded websites.
---

# Russian Samurai Cyberpunk Website

A stunning, ultra-premium promotional and landing page combining terminal aesthetics with high-performance scrolling mechanics. Features high contrast monochrome imagery, diagonal sliced image masks, text reveal typing effects, and glowing grid card borders.

## Component Spec

To render the component, drop it into your page as follows:

```tsx
import RussianSamuraiPage from "@/src/components/CrazyComponents/tsx/RussianWebsite";

export default function Page() {
    return (
        <RussianSamuraiPage
            bootSequence={[
                "INITIALIZING NEURAL NET...",
                "LOADING PROTOCOL: GHOST",
                "SECURITY: BYPASSED",
                "ACCESS GRANTED // ENTER"
            ]}
            heroSubtitle="System Override Initiated"
            heroTitle={<>CYBER <br /> <span className="text-transparent stroke-text">NINJA</span></>}
            aboutText="IN THE NEON JUNGLE, ONLY THE FASTEST SURVIVE. WE ARE THE GLITCH IN THE SYSTEM."
            features={[
                { title: "STEALTH", description: "Undetected navigation through encrypted corporate firewalls." },
                { title: "AGILITY", description: "Lightning fast execution mimicking the cyber-blade draw." }
            ]}
            footerTitle="END OF PROTOCOL"
            footerSubtitle="CONNECTION TERMINATED"
        />
    );
}
```

## Implementation Guidelines

1. **Terminal Preloader:** Ensure typewriter effects are asynchronous and scroll coordinates update gracefully. Swipes up with a custom GSAP `clip-path` transition.
2. **Sliced Image Parallax:** Divide imagery diagonally using polygon masks (`polygon(0 0, 100% 0, 100% 45%, 0 55%)` and `polygon(0 55%, 100% 45%, 100% 100%, 0 100%)`). Offset slices slightly using scrub-based GSAP ScrollTrigger to simulate a sword-cut sliding effect.
3. **Typography:** Use high-contrast headers, outline stroke text, and monospace subheadings. Ensure the custom outline stroke styling is loaded via CSS.
4. **Neon Hover Grids:** Implement border glow effects on the features grid utilizing translated absolute gradients on hover.
