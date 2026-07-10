"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useMotionTemplate, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Box, Circle, Hexagon, MoveUpRight, Zap, Play, Sparkles } from "lucide-react";
import { cn } from "@/src/lib/utils";

// --- 1. Noise Texture Overlay ---
export const NoiseOverlay = () => {
    return (
        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay">
            <svg className="absolute left-0 top-0 h-full w-full">
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    );
};

// --- 2. Custom Magnetic Cursor ---
export const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovered, setIsHovered] = useState(false);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Main Cursor Dot */}
            <motion.div
                className="pointer-events-none fixed z-[100] h-8 w-8 rounded-full border border-white mix-blend-difference flex items-center justify-center"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
                animate={{
                    scale: isHovered ? 1.5 : 1,
                    backgroundColor: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
                }}
                transition={{ duration: 0.2 }}
            >
                {isHovered && <span className="text-[8px] font-bold text-black mix-blend-normal">GO</span>}
            </motion.div>
        </>
    );
};

// --- 3. Spotlight Bento Card ---
export const BentoCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={cn("group relative rounded-3xl border border-white/10 bg-neutral-950 overflow-hidden", className)}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
                }}
            />
            {children}
        </div>
    );
};

// --- Sections ---

export const Hero = () => {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="z-10 flex flex-col items-center text-center"
            >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-neutral-300 backdrop-blur-md">
                    <Sparkles size={12} />
                    <span>Aura 2.0 Now Live</span>
                </div>
                <h1 className="text-[12vw] font-bold leading-none tracking-tighter text-white mix-blend-difference uppercase">
                    MgnT<span className="italic text-neutral-500">C</span>
                </h1>
                <p className="mt-6 max-w-md text-sm font-medium text-neutral-400 md:text-base">
                    Pioneering the boundary between the physical and the digital since 2125. A new era of web interactions.
                </p>
                <div className="mt-10 flex items-center gap-6">
                    <button className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105">
                        <span className="relative z-10">Discover Aura</span>
                        <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                    </button>
                    <button className="text-sm font-bold text-white transition-colors hover:text-neutral-400">
                        View Showreel
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export const Narrative = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={ref} className="relative py-32 px-8 md:py-48 overflow-hidden">
            <motion.div style={{ y }} className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white uppercase leading-tight">
                    We sculpt <span className="text-neutral-600">voids</span> into vibrant <span className="text-neutral-400 italic">ecosystems</span>.
                </h2>
            </motion.div>
        </section>
    );
};

export const Features = () => {
    return (
        <section className="py-24 px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-16">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-500">Core Mechanisms</h3>
                    <h2 className="mt-2 text-4xl font-bold tracking-tighter text-white">SYSTEM <br /> ARCHITECTURE</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <BentoCard className="md:col-span-2 p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
                        <Box size={32} className="text-white mb-8" />
                        <div>
                            <h4 className="text-2xl font-bold text-white mb-2">Neural Engines</h4>
                            <p className="text-neutral-400 text-sm max-w-md">Our proprietary models predict interaction patterns before they happen, ensuring zero latency rendering.</p>
                        </div>
                    </BentoCard>
                    <BentoCard className="p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
                        <Zap size={32} className="text-white mb-8" />
                        <div>
                            <h4 className="text-2xl font-bold text-white mb-2">Quantum State</h4>
                            <p className="text-neutral-400 text-sm">Superposition processing for real-time physics.</p>
                        </div>
                    </BentoCard>
                    <BentoCard className="p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
                        <Hexagon size={32} className="text-white mb-8" />
                        <div>
                            <h4 className="text-2xl font-bold text-white mb-2">Hex-Mesh</h4>
                            <p className="text-neutral-400 text-sm">Adaptive geometry scaling.</p>
                        </div>
                    </BentoCard>
                    <BentoCard className="md:col-span-2 p-8 md:p-12 min-h-[400px] flex flex-col justify-between">
                        <Circle size={32} className="text-white mb-8" />
                        <div>
                            <h4 className="text-2xl font-bold text-white mb-2">Spatial Audio</h4>
                            <p className="text-neutral-400 text-sm max-w-md">Immersive sonic landscapes generated dynamically based on cursor velocity and screen coordinates.</p>
                        </div>
                    </BentoCard>
                </div>
            </div>
        </section>
    );
};

export const ServicesGrid = () => {
    return (
        <section className="py-24 px-8 border-y border-white/10 bg-neutral-950/50">
            <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8">
                {['Strategy', 'Branding', 'Digital', 'Physical'].map((svc, i) => (
                    <div key={i} className="flex flex-col gap-4 group cursor-pointer">
                        <div className="h-px w-full bg-white/20 group-hover:bg-white transition-colors duration-500" />
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-white">{svc}</span>
                            <MoveUpRight size={16} className="text-neutral-600 group-hover:text-white transition-colors duration-500" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export const ProjectShowcase = () => {
    return (
        <section className="py-24 px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-4xl font-bold tracking-tighter text-white">SELECTED <br /> ARCHIVES</h2>
                    <button className="text-xs font-mono uppercase tracking-widest text-white hover:text-neutral-400 transition-colors">
                        View All [14]
                    </button>
                </div>
                <div className="flex flex-col gap-8">
                    {[1, 2, 3].map((project) => (
                        <div key={project} className="group relative w-full aspect-[21/9] bg-neutral-900 rounded-3xl overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            <div className="z-20 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                                <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Explore Index 0{project}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const Metrics = () => {
    return (
        <section className="py-32 px-8">
            <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                <div className="flex flex-col gap-2">
                    <span className="text-6xl font-bold tracking-tighter text-white">99.9%</span>
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Uptime Fidelity</span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-6xl font-bold tracking-tighter text-white">12ms</span>
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Average Latency</span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-6xl font-bold tracking-tighter text-white">∞</span>
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Scaling Potential</span>
                </div>
            </div>
        </section>
    );
};

export const Testimonials = () => {
    return (
        <section className="py-24 px-8 border-t border-white/10">
            <div className="mx-auto max-w-3xl text-center">
                <QuoteIcon className="mx-auto mb-8 text-neutral-700" />
                <p className="text-2xl md:text-4xl font-medium text-white leading-tight mb-8">
                    "Aura transformed our digital infrastructure from a static brochure into a living, breathing entity."
                </p>
                <div className="text-sm">
                    <span className="block text-white font-bold">Elara Vance</span>
                    <span className="block text-neutral-500 font-mono uppercase tracking-widest text-xs mt-1">Director of Systems, Nexus</span>
                </div>
            </div>
        </section>
    );
};

const QuoteIcon = ({ className }: { className?: string }) => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
);

export const ContactCTA = () => {
    return (
        <section className="py-32 px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
            <div className="mx-auto max-w-4xl text-center relative z-10">
                <h2 className="text-[10vw] md:text-[8vw] font-bold tracking-tighter text-white uppercase leading-none mb-8">
                    INITIATE <br /> <span className="text-neutral-600">SEQUENCE</span>
                </h2>
                <button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-transform hover:scale-105">
                    <span className="relative z-10">Start Project</span>
                    <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </section>
    );
};

export const Footer = () => {
    return (
        <footer className="border-t border-white/10 px-8 py-12 md:py-24">
            <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-end">
                <div className="flex flex-col gap-8">
                    <div className="text-3xl font-bold tracking-tighter text-white">AURA.</div>
                    <p className="text-xs font-mono uppercase tracking-widest max-w-xs leading-relaxed text-neutral-400">
                        Pioneering the boundary between the physical and the digital since 2125.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-8 text-xs font-mono uppercase tracking-widest">
                    <div className="flex flex-col gap-4">
                        <span className="text-white font-bold">Systems</span>
                        <a href="#" className="text-neutral-500 hover:text-white transition-colors">Neural</a>
                        <a href="#" className="text-neutral-500 hover:text-white transition-colors">Quantum</a>
                        <a href="#" className="text-neutral-500 hover:text-white transition-colors">Spatial</a>
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-white font-bold">Social</span>
                        <a href="#" className="text-neutral-500 hover:text-white transition-colors">X-Net</a>
                        <a href="#" className="text-neutral-500 hover:text-white transition-colors">Void</a>
                        <a href="#" className="text-neutral-500 hover:text-white transition-colors">Pulse</a>
                    </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-4">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    <p className="font-mono text-[10px] tracking-[0.3em] text-neutral-600">Uilora Library Standard © 2125</p>
                </div>
            </div>
        </footer>
    );
};

// --- Main Page Assembly ---
export default function MagneticCursorPage() {
    return (
        <main className="relative min-h-screen cursor-none bg-black selection:bg-white selection:text-black">
            <NoiseOverlay />
            <CustomCursor />

            {/* Floating Header */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-8 py-6 mix-blend-difference"
            >
                <div className="font-bold tracking-tighter text-white text-xl">AURA.</div>
                <nav className="hidden gap-8 text-sm font-medium text-white md:flex">
                    {['Works', 'About', 'Contact'].map((item) => (
                        <a key={item} href="#" className="hover:text-neutral-400 transition-colors">{item}</a>
                    ))}
                </nav>
            </motion.header>

            <Hero />
            <Narrative />
            <Features />
            <ServicesGrid />
            <ProjectShowcase />
            <Metrics />
            <Testimonials />
            <ContactCTA />
            <Footer />
        </main>
    );
}
