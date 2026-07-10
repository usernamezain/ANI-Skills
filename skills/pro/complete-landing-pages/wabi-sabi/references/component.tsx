"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Wind, Minus, Plus, ArrowRight, Circle } from "lucide-react";
import Lenis from "lenis";
import { cn } from "@/src/lib/utils";

// --- Assets ---
const IMAGES = {
    stone: "https://images.unsplash.com/photo-1656857221015-ddc2163a08da?q=80&w=2670&auto=format&fit=crop",
    fog: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2000&auto=format&fit=crop",
    moss: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2000&auto=format&fit=crop",
    branch: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2000&auto=format&fit=crop",
    temple: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop",
    water: "https://images.unsplash.com/photo-1724768026557-f781751fdf42?q=80&w=683&auto=format&fit=crop"
};

// --- Components ---

// 1. Smooth Scroll
export function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 2.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
}

// 2. Hanko (Stamp) Cursor
export function HankoCursor() {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    const x = useSpring(mouseX, { damping: 20, stiffness: 100, mass: 0.5 });
    const y = useSpring(mouseY, { damping: 20, stiffness: 100, mass: 0.5 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            style={{ x, y, translateX: "-50%", translateY: "-50%" }}
            className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:flex items-center justify-center mix-blend-multiply"
        >
            <div className="h-12 w-12 rounded-full border border-red-800 bg-red-600/10 backdrop-blur-sm flex items-center justify-center">
                <span className="font-serif text-[8px] text-red-900 tracking-widest font-bold">ZEN</span>
            </div>
        </motion.div>
    );
}

// 3. Washi Paper Texture
export function WashiTexture() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-overlay">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
        </div>
    );
}

// 4. Vertical Navigation
export function VerticalNav() {
    return (
        <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-8 writing-vertical-rl items-center mix-blend-difference text-neutral-800">
            <div className="h-20 w-px bg-current opacity-30" />
            {["Philosophy", "Works", "Contact"].map((item, i) => (
                <a key={i} href="#" className="text-xs uppercase tracking-[0.3em] hover:opacity-50 transition-opacity rotate-180">
                    {item}
                </a>
            ))}
            <div className="h-20 w-px bg-current opacity-30" />
        </nav>
    );
}

// 5. Hero Section
export function HeroSection() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden px-6 bg-[#f0f0eb]">
            <motion.div
                style={{ y: y1, opacity }}
                className="relative z-10 w-full max-w-md aspect-[3/4] overflow-hidden grayscale contrast-[1.1]"
            >
                <div className="absolute inset-0 border border-neutral-900/10 z-20 m-4" />
                <img src={IMAGES.stone} alt="Zen Stone" className="h-full w-full object-cover" />
            </motion.div>

            <div className="absolute inset-0 z-20 flex flex-col justify-between p-12 pointer-events-none">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="font-serif text-6xl md:text-9xl text-neutral-900 tracking-tight leading-none opacity-90"
                >
                    MU <br />
                    <span className="text-2xl md:text-4xl tracking-[0.5em] font-sans font-light opacity-50 block mt-4 ml-2">NOTHINGNESS</span>
                </motion.h1>

                <div className="flex justify-between items-end">
                    <div className="flex flex-col gap-2">
                        <span className="h-px w-12 bg-neutral-900" />
                        <p className="font-mono text-xs max-w-[200px] text-neutral-600">
                            The empty space is not empty.<br />
                            It is full of potential.
                        </p>
                    </div>
                    <div className="text-xs font-mono">2125 — KYOTO</div>
                </div>
            </div>
        </section>
    );
}

// 6. Ma Philosophy (Text Focus)
export function PhilisophyMa() {
    return (
        <section className="py-64 bg-[#f0f0eb] px-6 text-center">
            <div className="max-w-4xl mx-auto">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.3 }}
                    className="text-[10px] font-mono tracking-[1em] uppercase mb-12 block"
                >
                    Principle of Void
                </motion.span>
                <h2 className="font-serif text-4xl md:text-7xl text-neutral-800 leading-[1.1] italic">
                    "Ma is the pure space between things. It is the silence that allows the note to be heard."
                </h2>
                <div className="mt-20 flex justify-center">
                    <div className="h-24 w-px bg-neutral-900/10" />
                </div>
            </div>
        </section>
    );
}

// 7. Haiku & Ink Reveal
export function HaikuSection() {
    return (
        <section className="min-h-screen flex items-center justify-center py-24 px-6 bg-[#e8e6e1]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-6xl w-full items-center">
                <div className="space-y-12 order-2 md:order-1">
                    {[
                        { title: "Impermanence", text: "Code rots. Design fades. Only the feeling remains." },
                        { title: "Incompleteness", text: "We build systems that invite you to finish them." },
                        { title: "Imperfection", text: "The glitch is not an error. It is a feature of reality." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            className="group cursor-pointer"
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <span className="text-xs font-mono text-neutral-400">0{i + 1}</span>
                                <h3 className="text-2xl md:text-3xl font-serif text-neutral-800 transition-all duration-500">{item.title}</h3>
                            </div>
                            <p className="pl-8 text-sm text-neutral-500 font-mono border-l border-neutral-300 ml-1.5 pl-6">{item.text}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center order-1 md:order-2">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="relative w-full h-full"
                    >
                        <img src={IMAGES.fog} alt="Fog" className="w-full h-full object-cover grayscale opacity-80 rounded-sm" />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 animate-[spin_60s_linear_infinite]">
                                <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                                <text>
                                    <textPath xlinkHref="#curve" className="text-[5px] uppercase font-mono tracking-[0.4em] fill-white/80">
                                        Digital Wabi Sabi — The Art of Imperfection —
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// 8. Ephemeral Archive (Grid)
export function EphemeralArchive() {
    const items = [
        { img: IMAGES.moss, title: "Biological State" },
        { img: IMAGES.branch, title: "Fractal Decay" },
        { img: IMAGES.water, title: "Mutable Form" }
    ];
    return (
        <section className="py-48 bg-[#f0f0eb] px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-24 flex items-end justify-between border-b border-neutral-900/10 pb-12">
                    <h3 className="font-serif text-5xl md:text-7xl text-neutral-800">Ephemeral <br /> Archive.</h3>
                    <span className="hidden md:block text-[10px] font-mono tracking-widest opacity-40 uppercase">Kyoto / 2024</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-[3/4] overflow-hidden grayscale contrast-[1.1] transition-all duration-700 group-hover:grayscale-0">
                                <img src={item.img} className="h-full w-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                            </div>
                            <h4 className="mt-8 font-serif text-2xl text-neutral-700 italic opacity-80 group-hover:opacity-100 transition-opacity">
                                {item.title}
                            </h4>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 10. Zen Dialogue (Accordion)
export function ZenDialogue() {
    const [active, setActive] = useState(0);
    const faq = [
        { q: "Why focus on imperfection?", a: "Because digital perfection is sterile. By embracing the 'glitch' and the 'raw', we create products that feel human and alive." },
        { q: "What is the Ma principle?", a: "Ma is the 'negative space'. It prevents the user from being overwhelmed. It provides the literal room to breathe." },
        { q: "How does wabi sabi age?", a: "Gracefully. We build systems that don't break when they get old; they simply change their emotional resonance." }
    ];
    return (
        <section className="py-64 bg-[#f0f0eb] px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-32 text-center">
                    <span className="text-[10px] font-mono tracking-[1em] text-neutral-400 uppercase">Dialogue</span>
                    <h2 className="font-serif text-6xl mt-4 text-neutral-800 italic">Ma & Method.</h2>
                </div>
                <div className="space-y-4">
                    {faq.map((item, i) => (
                        <div key={i} className="border-b border-neutral-900/10 py-12 cursor-pointer group" onClick={() => setActive(active === i ? -1 : i)}>
                            <div className="flex justify-between items-center">
                                <h4 className={cn("font-serif text-3xl transition-all duration-700", active === i ? "pl-12 italic" : "group-hover:pl-6 opacity-40")}>{item.q}</h4>
                                {active === i ? <Minus size={20} className="opacity-20" /> : <Plus size={20} className="opacity-20" />}
                            </div>
                            <AnimatePresence>
                                {active === i && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                        <p className="pt-12 pb-6 px-12 text-xl font-serif text-neutral-500 max-w-2xl leading-relaxed italic">
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

// 11. States of Being (Stats)
export function StatesOfBeing() {
    const stats = [
        { t: "Matured", d: "A core refined by the passage of countless cycles, gaining depth and narrative through time." },
        { t: "Balanced", d: "Harmonious integration of form and void, where every element exists in perfect equilibrium." },
        { t: "Sustained", d: "Architectures built not for eternity, but for a beautiful, enduring resonance within the now." }
    ];
    return (
        <section className="py-64 px-6 bg-[#e8e6e1] border-y border-neutral-900/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-32 text-center md:text-left">
                {stats.map((s, i) => (
                    <div key={i} className="group cursor-default border-t border-neutral-900/10 pt-12">
                        <h5 className="font-serif text-6xl md:text-8xl italic text-neutral-800 transition-all duration-1000 group-hover:pl-4">
                            {s.t}
                        </h5>
                        <p className="mt-8 text-lg font-serif text-neutral-500 leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
                            {s.d}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

// 12. Minimal Footer
export function Footer() {
    return (
        <footer className="py-32 px-6 bg-[#f0f0eb] text-neutral-500 font-mono text-xs text-center border-t border-neutral-900/5">
            <div className="max-w-4xl mx-auto flex flex-col items-center gap-12">
                <div className="flex items-center gap-4">
                    <Wind size={20} className="stroke-[1px]" />
                    <span className="tracking-[0.8em] font-normal">BREATHE / ZEN.OS</span>
                </div>
                <div className="flex gap-12 opacity-40 uppercase tracking-widest text-[10px]">
                    <a href="#" className="hover:opacity-100 transition-opacity">Philosophy</a>
                    <a href="#" className="hover:opacity-100 transition-opacity">Archive</a>
                    <a href="#" className="hover:opacity-100 transition-opacity">Kyoto Outpost</a>
                </div>
                <div className="opacity-20 uppercase tracking-[0.5em] mt-12">
                    © 2125 — Uilora Zen Systems
                </div>
            </div>
        </footer>
    );
}

// --- Main Layout ---
export default function WabiSabiPage() {
    return (
        <SmoothScroll>
            <main className="min-h-screen w-full bg-[#f0f0eb] text-[#1a1a1a] selection:bg-red-900 selection:text-white overflow-x-hidden font-sans">
                <WashiTexture />
                <HankoCursor />
                <VerticalNav />

                {/* Header / Logo */}
                <header className="fixed top-0 left-0 p-8 z-50 pointer-events-none">
                    <div className="text-xl font-serif tracking-tighter pointer-events-auto cursor-pointer">
                        <span className="font-bold">ZEN.</span>
                        <span className="text-xs font-sans tracking-widest opacity-50 ml-1">OS</span>
                    </div>
                </header>

                <main>
                    <HeroSection />
                    <PhilisophyMa />
                    <HaikuSection />
                    <EphemeralArchive />
                    <ZenDialogue />
                    <StatesOfBeing />
                </main>

                <Footer />
            </main>
        </SmoothScroll>
    );
}
