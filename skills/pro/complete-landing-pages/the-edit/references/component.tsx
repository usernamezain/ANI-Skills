"use client";

import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValueEvent,
    AnimatePresence,
} from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, MoveRight, Plus, Minus } from "lucide-react";
import { cn } from "@/src/lib/utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- ASSETS ---
export const IMAGES = {
    hero: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop",
    model1: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    arch1: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
    fashion: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop",
    object: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2000&auto=format&fit=crop",
    natural: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop",
    interior: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop"
};

// --- COMPONENTS ---

// 1. Smooth Scroll Setup
export function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return <>{children}</>;
};

// 2. Animated Divider Line
export function Separator({ color = "bg-stone-900" }: { color?: string }) {
    return (
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className={cn("h-px w-full origin-left opacity-30", color)}
        />
    );
}

// 3. Navigation
export function Navbar() {
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) setHidden(true);
        else setHidden(false);
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" }
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full z-50 bg-[#F5F5F0]/80 backdrop-blur-md border-b border-stone-200 px-6 py-5 flex justify-between items-center"
        >
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-stone-500">
                <span className="text-black">Issue No. 24</span>
                <span className="hidden md:inline hover:text-black cursor-pointer transition-colors">Digital Edition</span>
                <span className="hidden lg:inline hover:text-black cursor-pointer transition-colors">The Earth Edit</span>
            </div>

            <div className="font-serif text-3xl font-black tracking-tighter absolute left-1/2 -translate-x-1/2">EDIT.</div>

            <div className="flex items-center gap-8">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] hidden md:inline">Archive</span>
                <button className="text-[10px] font-black uppercase tracking-[0.3em] bg-stone-900 text-white rounded-full px-6 py-2.5 hover:bg-stone-700 transition-all scale-95 hover:scale-100">
                    Subscribe
                </button>
            </div>
        </motion.nav>
    )
}

// 4. Hero: Full Bleed with Parallax
export function Hero() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <header ref={container} className="relative h-[110vh] overflow-hidden bg-stone-900">
            <motion.div style={{ y, opacity, scale }} className="absolute inset-0 z-0">
                <img src={IMAGES.hero} alt="Cover" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/30" />
            </motion.div>

            <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 md:px-20">
                <div className="max-w-7xl mx-auto w-full">
                    <motion.div
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-12"
                    >
                        <div className="relative">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 }}
                                className="mb-6 block text-[10px] font-black uppercase tracking-[0.5em] text-white/70"
                            >
                                / Editorial Volume 01
                            </motion.span>
                            <h1 className="font-serif text-[18vw] md:text-[14vw] leading-[0.75] text-white tracking-tighter">
                                Silent <br />
                                <span className="italic font-extralight opacity-80 pl-[10vw]">Dialogue</span>
                            </h1>
                        </div>
                        <div className="max-w-xs text-stone-300 text-xs font-medium leading-relaxed uppercase tracking-[0.2em] mb-4">
                            Exploring the invisible thread between natural solitude and architectural intent. A collection of moments.
                        </div>
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute bottom-0 left-0 h-1 bg-white z-20 origin-left"
            />
        </header>
    )
}

// 5. Editorial Narrative (Pinned Character Reveal)
export function TheManifesto() {
    const triggerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const chars = gsap.utils.toArray(".manifesto-char");
            gsap.to(chars, {
                opacity: 1,
                color: "#1c1917",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 2,
                }
            });
        });
        return () => ctx.revert();
    }, []);

    const text = "True luxury is not defined by excess, but by the intentional presence of space.";

    return (
        <section ref={triggerRef} className="py-64 bg-[#F5F5F0] px-6 text-center">
            <div className="max-w-5xl mx-auto">
                <h2 className="font-serif text-5xl md:text-8xl leading-tight text-stone-300">
                    {text.split(" ").map((word, i) => (
                        <span key={i} className="inline-block mr-4">
                            {word.split("").map((char, j) => (
                                <span key={j} className="manifesto-char opacity-20">
                                    {char}
                                </span>
                            ))}
                        </span>
                    ))}
                </h2>
            </div>
        </section>
    );
}

// 6. Spotlight Bento Grid
export function SpotlightGrid() {
    return (
        <section className="bg-white py-48 px-6 md:px-20 border-y border-stone-100">
            <div className="max-w-7xl mx-auto">
                <div className="mb-24 flex items-end justify-between border-b border-stone-900 pb-12">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-400">Section 03</span>
                        <h2 className="font-serif text-6xl mt-4">Selected <br />Pieces.</h2>
                    </div>
                    <MoveRight className="w-12 h-12 stroke-1 text-stone-300 translate-y-[-10px]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[1200px] md:h-[800px]">
                    <div className="md:col-span-2 group relative overflow-hidden bg-stone-100 rounded-sm">
                        <ParallaxImage src={IMAGES.natural} alt="Nature" speed={0.15} />
                        <div className="absolute bottom-8 left-8 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] font-bold uppercase tracking-widest">Natural</span>
                            <h3 className="text-3xl font-serif">Wildness Reserved</h3>
                        </div>
                    </div>
                    <div className="md:col-span-1 group relative overflow-hidden bg-stone-100 rounded-sm">
                        <ParallaxImage src={IMAGES.object} alt="Object" speed={0.05} />
                        <div className="absolute bottom-8 left-8 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] font-bold uppercase tracking-widest">Symmetry</span>
                            <h3 className="text-2xl font-serif">Perfect Object</h3>
                        </div>
                    </div>
                    <div className="md:col-span-1 md:row-span-2 group relative overflow-hidden bg-stone-100 rounded-sm">
                        <ParallaxImage src={IMAGES.model1} alt="Model" speed={0.2} />
                    </div>
                    <div className="md:col-span-1 group relative overflow-hidden bg-stone-100 rounded-sm">
                        <div className="p-12 flex flex-col justify-between h-full bg-stone-900 text-white">
                            <Sparkles className="w-8 h-8 text-stone-500" />
                            <p className="font-serif text-xl italic leading-relaxed opacity-80">
                                "The grid is a visual manifestation of the internal order of things."
                            </p>
                            <span className="text-[10px] font-black uppercase tracking-widest">Editorial Note</span>
                        </div>
                    </div>
                    <div className="md:col-span-2 group relative overflow-hidden bg-stone-100 rounded-sm">
                        <ParallaxImage src={IMAGES.interior} alt="Interior" speed={0.1} />
                    </div>
                </div>
            </div>
        </section>
    );
}

// 7. Horizontal Scroll Lookbook
export function Lookbook() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["20%", "-60%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-stone-900 overflow-hidden">
            <div className="sticky top-0 flex h-screen items-center">
                <div className="absolute top-20 left-20 z-20">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-500">Visual Essay</span>
                    <h2 className="font-serif text-8xl text-stone-200 mt-4 leading-none">The <br /> Archive</h2>
                </div>

                <motion.div style={{ x }} className="flex gap-12">
                    {[IMAGES.fashion, IMAGES.hero, IMAGES.model1, IMAGES.arch1, IMAGES.interior].map((src, i) => (
                        <div key={i} className="relative h-[65vh] w-[80vw] md:w-[45vw] lg:w-[35vw] shrink-0">
                            <div className="absolute -top-12 left-0 font-serif text-6xl italic text-stone-700 opacity-40">0{i + 1}</div>
                            <img src={src} className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out cursor-pointer" />
                            <div className="mt-8 flex justify-between items-end">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">Subject</span>
                                    <h4 className="text-xl font-serif text-stone-300">Study of Forms {i + 1}</h4>
                                </div>
                                <ArrowRight className="text-stone-500 w-6 h-6" />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

// 8. Editorial Accordion (The Dialogue)
export function TheDialogue() {
    const [open, setOpen] = useState(0);

    const qa = [
        { q: "What defines an essential edit?", a: "An essential edit is the distillation of variety into a singular, cohesive narrative that prioritizes timelessness over trends." },
        { q: "How does nature influence architecture?", a: "Nature provides the raw materials and the lighting engine. Architecture simply provides the frame to view it." },
        { q: "Why is white space important in design?", a: "White space is the breathing room that allows the content to exist without competition. It is the silence between notes." }
    ];

    return (
        <section className="py-48 bg-[#F5F5F0] px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-32">
                    <h2 className="font-serif text-7xl mt-6 text-stone-900 italic tracking-tighter">In Conversation.</h2>
                </div>

                <div className="space-y-12">
                    {qa.map((item, i) => (
                        <div key={i} className="group cursor-pointer" onClick={() => setOpen(open === i ? -1 : i)}>
                            <div className="flex justify-between items-center py-8 border-b border-stone-300 group-hover:border-stone-900 transition-colors">
                                <h3 className="font-serif text-3xl md:text-5xl text-stone-900 tracking-tighter transition-transform group-hover:translate-x-4">
                                    {item.q}
                                </h3>
                                {open === i ? <Minus size={32} /> : <Plus size={32} />}
                            </div>
                            <AnimatePresence>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="py-12 text-2xl font-serif text-stone-600 leading-relaxed max-w-2xl">
                                            {item.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 9. Editorial Footer
export function Footer() {
    return (
        <footer className="bg-stone-900 text-stone-200 px-6 py-32 md:px-20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-stone-700" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 mb-32">
                    <div className="flex flex-col gap-12">
                        <h2 className="font-serif text-[8vw] md:text-[5vw] leading-none mb-4 italic">Next <br />Issue.</h2>
                        <div className="flex flex-col gap-4 text-sm font-black uppercase tracking-[0.4em] opacity-40">
                            <span>Release Date : 25 Oct 24</span>
                            <span>Theme : Urban Kinetic</span>
                            <span>Editor : R. Vora</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-16">
                        <div className="flex flex-col gap-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-500">Navigation</span>
                            <nav className="flex flex-col gap-4 font-serif text-2xl">
                                <a href="#" className="hover:italic hover:translate-x-2 transition-all">Collections</a>
                                <a href="#" className="hover:italic hover:translate-x-2 transition-all">Manifesto</a>
                                <a href="#" className="hover:italic hover:translate-x-2 transition-all">Archive</a>
                                <a href="#" className="hover:italic hover:translate-x-2 transition-all">Masthead</a>
                            </nav>
                        </div>
                    </div>

                    <div className="flex flex-col justify-end lg:items-end">
                        <div className="w-full max-w-xs">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-500 mb-8 block">Subscription</span>
                            <div className="flex border-b border-stone-500 py-4 group">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="bg-transparent outline-none w-full font-serif text-xl placeholder:text-stone-700 focus:placeholder:text-stone-500 transition-all"
                                />
                                <ArrowRight className="w-6 h-6 text-stone-700 group-hover:text-stone-200 transition-colors cursor-pointer" />
                            </div>
                            <p className="mt-6 text-[10px] leading-relaxed opacity-30 uppercase tracking-widest">
                                By subscribing you agree to the terms and privacy policy of The Edit.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="font-serif text-4xl font-black">EDIT.</div>
                    <div className="flex gap-16 text-[10px] font-black uppercase tracking-[0.5em] text-stone-600">
                        <span>Instagram</span>
                        <span>Twitter</span>
                        <span>Pinterest</span>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-700">
                        © 2024 Uilora Editorial
                    </div>
                </div>
            </div>

            <div className="absolute -bottom-20 -right-20 opacity-5 pointer-events-none select-none">
                <span className="text-[40vw] font-serif font-black leading-none">TE</span>
            </div>
        </footer>
    )
}

// Internal Helper
export function ParallaxImage({ src, alt, speed = 0.1 }: { src: string, alt: string, speed?: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    return (
        <div ref={ref} className="h-full w-full overflow-hidden relative">
            <motion.img
                style={{ y, scale: 1.2 }}
                src={src}
                alt={alt}
                className="h-full w-full object-cover"
            />
        </div>
    )
}

// --- MAIN PAGE ---
export default function TheEditPage() {
    return (
        <SmoothScroll>
            <div className="min-h-screen bg-[#F5F5F0] text-stone-900 selection:bg-stone-900 selection:text-stone-100 overflow-x-hidden">
                <Navbar />

                <main>
                    <Hero />
                    <TheManifesto />
                    <SpotlightGrid />
                    <Lookbook />
                    <TheDialogue />
                </main>

                <Footer />
            </div>
        </SmoothScroll>
    );
}
