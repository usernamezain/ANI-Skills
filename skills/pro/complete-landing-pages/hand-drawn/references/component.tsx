import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, PenTool, Layers, LayoutGrid, CheckCircle2 } from 'lucide-react';
import { cn } from "@/src/lib/utils";

// --- 1. THE ENGINE (Squiggle Filters) ---
// This makes things look hand-drawn without needing images.
export function HandDrawnFilters() {
    return (
        <svg className="fixed h-0 w-0 pointer-events-none">
            <defs>
                {/* TURBULENCE: Creates the wobbly edge effect */}
                <filter id="rough-paper">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
                </filter>

                {/* PENCIL TEXTURE: Adds grain to solid fills */}
                <filter id="pencil-texture">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
                    <feColorMatrix type="saturate" values="0" />
                    <feComposite operator="in" in2="SourceGraphic" />
                </filter>
            </defs>
        </svg>
    );
}

// --- 2. SUB-COMPONENTS ---

// A. Highlighter Effect (Highlights text on scroll)
export function Highlight({ children, color = "#ffeb3b" }: { children: React.ReactNode, color?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <span ref={ref} className="relative inline-block px-1">
            <motion.span
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
                style={{ backgroundColor: color }}
                className="absolute bottom-1 left-0 -z-10 h-[80%] w-full origin-left -rotate-1 rounded-sm opacity-60"
            />
            {children}
        </span>
    );
}

// B. Hand-Drawn Button (Scribbles on hover)
export function SketchButton({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.button
            whileHover="hover"
            whileTap="tap"
            className={cn("group relative px-8 py-4 font-bold text-black", className)}
        >
            {/* The Border (SVG Path that draws itself) */}
            <div className="absolute inset-0 h-full w-full">
                <svg className="h-full w-full overflow-visible">
                    <motion.rect
                        x="2" y="2" width="98%" height="96%" rx="4"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{ filter: "url(#rough-paper)" }}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    />
                </svg>
            </div>

            {/* The Scribble Fill (Appears on Hover) */}
            <motion.div
                className="absolute inset-2 -z-10 bg-black opacity-0"
                variants={{
                    hover: {
                        opacity: 0.1,
                        scale: 1.05,
                        transition: { duration: 0.2 }
                    }
                }}
                style={{
                    maskImage: "url('data:image/svg+xml;utf8,<svg viewBox=%220 0 200 100%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M0,50 Q50,0 100,50 T200,50%22 stroke=%22black%22 stroke-width=%2210%22 fill=%22none%22/></svg>')",
                    filter: "url(#rough-paper)"
                }}
            />

            <span className="relative flex items-center gap-2">{children}</span>
        </motion.button>
    );
}

// C. The Sketch Card
export function SketchCard({ title, icon: Icon, delay }: { title: string, icon: React.ReactNode, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, rotate: Math.random() * 2 - 1 }}
            className="relative flex flex-col gap-4 p-8"
        >
            {/* Hand Drawn Border via CSS + Filter */}
            <div
                className="absolute inset-0 rounded-xl border-2 border-black bg-white shadow-sm"
                style={{ filter: "url(#rough-paper)" }}
            />

            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-black bg-[#f0f0f0]">
                {Icon}
            </div>
            <h3 className="relative z-10 text-xl font-bold">{title}</h3>
            <p className="relative z-10 text-gray-600 leading-relaxed">
                Authentic, rough edges that communicate a human touch in a digital world.
            </p>
        </motion.div>
    )
}

// D. Drawn Arrow (Decoration)
export function DrawnArrow() {
    return (
        <svg width="100" height="100" viewBox="0 0 100 100" className="absolute -right-24 top-0 hidden md:block rotate-12">
            <motion.path
                d="M10,50 Q50,10 90,50 M60,50 L90,50 L80,20"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                style={{ filter: "url(#rough-paper)" }}
            />
            <motion.text
                x="20" y="80"
                fontFamily="monospace"
                fontSize="12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                Look here!
            </motion.text>
        </svg>
    );
}

// --- 3. MAIN PAGE ---
export default function HandDrawnPage() {
    const { scrollYProgress } = useScroll();

    // Parallax for background doodles
    const yDoodle = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-[#fdfbf7] font-sans text-[#2d2d2d] selection:bg-[#ffeb3b]">
            <HandDrawnFilters />

            {/* Background Texture (Grid Paper) */}
            <div
                className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    filter: 'url(#rough-paper)'
                }}
            />

            {/* --- NAVBAR --- */}
            <nav className="fixed top-0 z-50 flex w-full items-center justify-between px-8 py-6 backdrop-blur-sm">
                <div className="text-2xl font-bold tracking-tight">
                    Sketch<span className="text-blue-600">.io</span>
                </div>
                <div className="hidden gap-8 md:flex font-medium">
                    {['Process', 'Work', 'About'].map(item => (
                        <a key={item} href="#" className="relative group">
                            {item}
                            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all group-hover:w-full rounded-full" />
                        </a>
                    ))}
                </div>
                <SketchButton className="text-sm">Get Started</SketchButton>
            </nav>

            {/* --- HERO SECTION --- */}
            <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center">

                <div className="relative mb-6 inline-block">
                    <span className="rounded-full border border-black bg-white px-4 py-2 text-sm font-medium uppercase tracking-widest shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
                        The Creative Studio
                    </span>
                </div>

                <div className="relative max-w-4xl">
                    <h1 className="mb-8 text-6xl font-black leading-[1.1] tracking-tight md:text-8xl">
                        Design that feels <br />
                        <Highlight color="#a5f3fc">Human</Highlight> again.
                    </h1>
                    <DrawnArrow />
                </div>

                <p className="max-w-xl text-xl text-gray-600 font-medium leading-relaxed">
                    We bridge the gap between strict digital grids and the organic chaos of a sketchbook. Professional, yet pleasantly imperfect.
                </p>

                <div className="mt-10 flex gap-6">
                    <SketchButton>
                        View Case Studies <ArrowRight size={18} />
                    </SketchButton>
                </div>

                {/* Floating Doodles */}
                <motion.div style={{ y: yDoodle }} className="absolute left-[10%] top-[20%] opacity-20 hidden lg:block">
                    <LayoutGrid size={64} className="-rotate-12" />
                </motion.div>
                <motion.div style={{ y: yDoodle }} className="absolute right-[10%] bottom-[20%] opacity-20 hidden lg:block">
                    <PenTool size={64} className="rotate-12" />
                </motion.div>

            </section>

            {/* --- FEATURES GRID --- */}
            <section className="relative z-10 px-6 py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl font-bold">The <Highlight>Toolkit</Highlight></h2>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <SketchCard delay={0.1} title="Rough Edges" icon={<Layers size={24} />} />
                        <SketchCard delay={0.2} title="Vector Lines" icon={<PenTool size={24} />} />
                        <SketchCard delay={0.3} title="Smart Layouts" icon={<LayoutGrid size={24} />} />
                    </div>
                </div>
            </section>

            {/* --- TESTIMONIAL (Sticky Note Style) --- */}
            <section className="relative z-10 flex items-center justify-center py-32 bg-[#fffdf5] border-y border-black/5">
                <div className="relative w-full max-w-2xl px-6">
                    {/* Sticky Note */}
                    <motion.div
                        whileHover={{ rotate: 0, scale: 1.02 }}
                        className="relative rotate-1 bg-[#ffeb3b] p-12 shadow-[4px_4px_10px_rgba(0,0,0,0.1)]"
                        style={{ filter: "url(#rough-paper)" }}
                    >
                        {/* Pin */}
                        <div className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border border-black/20 bg-red-500 shadow-sm" />

                        <p className="font-serif text-2xl italic leading-relaxed text-black/80">
                            "It's rare to find a design that feels this personal. It doesn't look like a template; it looks like a conversation."
                        </p>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-black/10" style={{ filter: "url(#rough-paper)" }} />
                            <div>
                                <div className="font-bold">Sarah Jenkins</div>
                                <div className="text-sm opacity-60">Art Director, Vogue</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- CHECKLIST --- */}
            <section className="mx-auto max-w-3xl px-6 py-24">
                <div className="space-y-6">
                    {["Pixel Perfect (Almost)", "React Server Components", "Framer Motion 3D"].map((item, i) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 border-b border-black/10 pb-4"
                        >
                            <CheckCircle2 className="text-green-600" />
                            <span className="text-xl font-medium">{item}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- NEW SECTION: TRUSTED BY MARQUEE --- */}
            <section className="relative z-10 overflow-hidden border-y-2 border-black bg-[#ffeb3b] py-12" style={{ filter: "url(#rough-paper)" }}>
                <div className="flex whitespace-nowrap">
                    <motion.div
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                        className="flex gap-24 px-12 text-3xl font-black uppercase tracking-widest text-black"
                    >
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex items-center gap-8">
                                <span>NOTION</span>
                                <span className="opacity-30">×</span>
                                <span>LINEAR</span>
                                <span className="opacity-30">×</span>
                                <span>GITHUB</span>
                                <span className="opacity-30">×</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* --- NEW SECTION: HAND-DRAWN GALLERY --- */}
            <section className="relative z-10 px-6 py-32">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-20 text-center">
                        <h2 className="text-5xl font-black md:text-6xl">Visual <Highlight color="#fbcfe8">Poetry.</Highlight></h2>
                    </div>

                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                        {[
                            { title: "Wireframes", img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80" },
                            { title: "Storyboards", img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                whileHover={{ rotate: i % 2 === 0 ? 2 : -2 }}
                                className="group relative"
                            >
                                <div className="relative overflow-hidden border-4 border-black bg-white p-4 shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all group-hover:shadow-[16px_16px_0px_rgba(0,0,0,1)]" style={{ filter: "url(#rough-paper)", borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px" }}>
                                    <div className="relative mb-4 aspect-video overflow-hidden border-2 border-dashed border-black">
                                        <img src={item.img} alt={item.title} className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                                    </div>
                                    <h3 className="font-serif text-3xl font-bold italic">{item.title}</h3>
                                    <p className="mt-2 text-gray-600">Bringing the raw, unfiltered creative process directly to the browser.</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- NEW SECTION: PRICING --- */}
            <section className="relative z-10 bg-[#fffdf5] px-6 py-32 border-t border-dashed border-black/20">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-20 text-center">
                        <h2 className="text-4xl font-bold md:text-5xl">Simple <Highlight color="#bbf7d0">Pricing.</Highlight></h2>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Basic Plan */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="relative border-2 border-black bg-white p-12 text-center"
                            style={{ filter: "url(#rough-paper)" }}
                        >
                            <h3 className="text-2xl font-bold">The Sketch</h3>
                            <div className="my-6 text-6xl font-black">$0</div>
                            <ul className="mb-8 space-y-4 font-medium text-gray-600">
                                <li>5 Projects</li>
                                <li>Basic SVG Filters</li>
                                <li>Community Support</li>
                            </ul>
                            <SketchButton className="w-full">Get Started</SketchButton>
                        </motion.div>

                        {/* Pro Plan */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="relative border-4 border-black bg-black text-white p-12 text-center shadow-[12px_12px_0px_#ffeb3b]"
                            style={{ filter: "url(#rough-paper)" }}
                        >
                            <div className="absolute -top-6 right-8 rotate-12 rounded-full border-2 border-black bg-white px-4 py-1 text-sm font-bold text-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                MOST POPULAR
                            </div>
                            <h3 className="text-2xl font-bold">The Masterpiece</h3>
                            <div className="my-6 text-6xl font-black">$29</div>
                            <ul className="mb-8 space-y-4 font-medium text-gray-400">
                                <li>Unlimited Projects</li>
                                <li>Custom Brush Engine</li>
                                <li>Priority Support</li>
                                <li>Team Collaboration</li>
                            </ul>
                            <button className="w-full border-2 border-white bg-white px-8 py-4 font-bold text-black transition-all hover:bg-transparent hover:text-white" style={{ filter: "url(#rough-paper)" }}>
                                Subscribe Now
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- NEW SECTION: FAQ --- */}
            <section className="relative z-10 px-6 py-32">
                <div className="mx-auto max-w-3xl">
                    <h2 className="mb-16 text-center text-4xl font-bold">The <Highlight color="#fed7aa">Scribbled</Highlight> FAQ.</h2>

                    <div className="space-y-6">
                        {[
                            { q: "Is it really drawn by hand?", a: "No, we use complex SVG displacement maps and fractal noise to simulate organic imperfections directly in the DOM." },
                            { q: "Does it impact performance?", a: "The SVG filters are hardware accelerated, meaning they run buttery smooth at 60fps on modern devices." },
                            { q: "Can I customize the brush strokes?", a: "Absolutely. Tweak the baseFrequency and numOctaves in the rough-paper filter to get exactly the look you need." }
                        ].map((faq, i) => (
                            <details key={i} className="group overflow-hidden rounded-xl border-2 border-black bg-white transition-all open:bg-yellow-50" style={{ filter: "url(#rough-paper)" }}>
                                <summary className="cursor-pointer p-6 text-xl font-bold outline-none flex justify-between items-center list-none">
                                    {faq.q}
                                    <span className="transition-transform group-open:rotate-45 text-3xl font-light">+</span>
                                </summary>
                                <div className="border-t-2 border-dashed border-black/20 p-6 text-lg font-medium text-gray-700">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="border-t-2 border-dashed border-black/20 py-12 text-center">
                <p className="font-medium opacity-50">Designed with a 2B Pencil in VS Code.</p>
            </footer>

        </main>
    );
}
