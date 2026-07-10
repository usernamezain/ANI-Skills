# Design Constraints & Physics Parameters: The Edit

## 1. Minimalist Parallax Configuration
Unlike aggressive parallax layouts, the editorial style demands subtle depth.
```javascript
const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
```
- A total travel distance of 30% (`-15%` to `15%`) mapped across the visibility range of the element ensures the image moves just enough to create separation from the background without feeling disconnected or distracting from the typography.
- The image is scaled slightly (`scale: 1.2`) within `overflow-hidden` containers to ensure the edges don't show during translation.

## 2. Navigational Friction
To maximize screen real-estate for large editorial imagery, the navigation bar auto-hides.
```javascript
useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
});
```
- It only triggers after scrolling past a threshold (`150px`) to prevent twitchiness at the very top of the page.

## 3. Typographic System & Spacing
The layout relies entirely on extreme contrast in font styling rather than color.
- **Micro-copy (Metadata/Labels):** `text-[10px] font-black uppercase tracking-[0.3em] text-stone-500`. Very small, heavily tracked, and muted.
- **Headers:** `font-serif text-[14vw] tracking-tighter leading-[0.75]`. Massive, tightly packed, filling the viewport.
- **Whitespace:** Uses extreme padding classes (`py-48`, `py-64`) to force the user to focus on one concept at a time. The background is a warm off-white (`#F5F5F0`) to reduce glare compared to pure `#FFF`.

## 4. Accordion Physics
Framer Motion is used for the accordion to handle the layout shifts gracefully.
```javascript
initial={{ height: 0, opacity: 0 }}
animate={{ height: "auto", opacity: 1 }}
exit={{ height: 0, opacity: 0 }}
```
- Animating to `height: "auto"` allows the content to dictate the space, which is critical for editorial content that may wrap differently across devices.
