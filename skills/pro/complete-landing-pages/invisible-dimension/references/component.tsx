import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Globe, Maximize2, Aperture } from 'lucide-react';
import { cn } from "@/src/lib/utils";

// --- HOOKS ---
export function useMousePosition() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    useEffect(() => {
        const updateMouse = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };
        window.addEventListener("mousemove", updateMouse);
        return () => window.removeEventListener("mousemove", updateMouse);
    }, [x, y]);

    return { x, y };
}

// --- SUB-COMPONENTS ---

// 1. The X-Ray Lens (The Magic)
// This creates the "hole" in the top layer to reveal the bottom layer
export function Lens({ mouseX, mouseY }: { mouseX: any, mouseY: any }) {
    const size = 300; // Size of the reveal

    return (
        <motion.div
            style={{
                background: `radial-gradient(circle ${size / 2}px at ${mouseX}px ${mouseY}px, transparent 10%, black 100%)`,
            }}
            className="pointer-events-none fixed inset-0 z-40 h-full w-full"
        />
    );
}

// 2. The Content (We render this TWICE)
// Once for the "Boring" top layer, Once for the "Exciting" bottom layer
export function ContentLayer({ isHiddenLayer = false }: { isHiddenLayer?: boolean }) {
    const { scrollYProgress } = useScroll();

    // Parallax calculations
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const xGallery = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "-50%"]);

    return (
        <div className={`relative min-h-[300vh] w-full overflow-hidden px-8 py-12 ${isHiddenLayer ? 'bg-black text-white' : 'bg-transparent text-gray-500'}`}>

            {/* --- HERO --- */}
            <section className="relative flex h-screen flex-col justify-between">
                <nav className="flex justify-between border-b border-current pb-4 text-xs font-mono uppercase tracking-widest">
                    <div>Dimension: {isHiddenLayer ? 'VIVID [02]' : 'NULL [01]'}</div>
                    <div className="flex gap-8">
                        <span>Work</span>
                        <span>Studio</span>
                        <span>Contact</span>
                    </div>
                </nav>

                <div className="relative z-10 mt-20">
                    <motion.h1
                        style={{ y: yHero }}
                        className={`text-[12vw] leading-[0.8] tracking-tighter font-serif ${isHiddenLayer ? 'font-bold' : 'font-thin opacity-20'}`}
                    >
                        {isHiddenLayer ? (
                            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                HIDDEN<br />REALITY
                            </span>
                        ) : (
                            <span>
                                VISIBLE<br />SURFACE
                            </span>
                        )}
                    </motion.h1>
                </div>

                <div className="flex justify-between items-end pb-12">
                    <div className="max-w-md font-mono text-sm">
                        {isHiddenLayer ?
                            "/// SYSTEM BREACH DETECTED. THE TRUTH IS UNDERNEATH." :
                            "We build digital experiences. Hover to inspect."}
                    </div>
                    <Aperture className={`animate-spin-slow ${isHiddenLayer ? 'text-pink-500' : 'text-gray-800'}`} size={48} />
                </div>
            </section>

            {/* --- MARQUEE STRIP --- */}
            <div className={`w-full overflow-hidden border-y border-current py-6 font-mono text-4xl uppercase ${isHiddenLayer ? 'bg-white text-black' : 'bg-transparent'}`}>
                <motion.div
                    animate={{ x: "-100%" }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="whitespace-nowrap"
                >
                    {Array(5).fill(" • Visualizing the Unknown ").map((s, i) => (
                        <span key={i}>{s}</span>
                    ))}
                </motion.div>
            </div>

            {/* --- HORIZONTAL GALLERY --- */}
            <section className="relative h-[100vh] flex items-center">
                <div className="w-full">
                    <h2 className="mb-12 text-6xl font-thin uppercase tracking-tight">Archives</h2>
                    <motion.div style={{ x: xGallery }} className="flex w-max gap-8 pl-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className={`relative h-[60vh] w-[40vw] flex-shrink-0 border border-current p-4 ${isHiddenLayer ? 'border-pink-500/50' : 'border-gray-800'}`}>
                                <div className="h-full w-full bg-current opacity-10" />
                                <div className="absolute bottom-4 left-4 text-4xl font-bold">0{i}</div>
                                {isHiddenLayer && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-6xl font-black text-pink-500 mix-blend-overlay">SECRET</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <section className="flex h-[50vh] items-center justify-center border-t border-current text-center">
                <div>
                    <div className="text-sm font-mono uppercase mb-4">Are you ready?</div>
                    <h2 className={`text-8xl font-serif ${isHiddenLayer ? 'text-white' : 'text-transparent text-stroke-1'}`}>
                        ENTER VOID
                    </h2>
                </div>
            </section>

        </div>
    );
}

// --- MAIN EXPORT COMPONENT ---
export default function WinningLandingPage() {
    const { x, y } = useMousePosition();

    // Distinct pixel values for the mask logic
    const mouseX = useTransform(x, (val) => val);
    const mouseY = useTransform(y, (val) => val);

    return (
        <main className="relative min-h-screen w-full bg-[#050505] cursor-none">

            {/* BACKGROUND (The Boring Layer) */}
            <div className="relative z-10 bg-black">
                <ContentLayer isHiddenLayer={false} />
            </div>

            {/* FOREGROUND (The Extraordinary Layer) */}
            <motion.div
                className="absolute top-0 left-0 z-20 h-full w-full pointer-events-none mix-blend-normal"
                style={{
                    // The Flashlight Mask revealing the secret colorful content
                    maskImage: useMotionTemplate`radial-gradient(circle 250px at ${mouseX}px ${mouseY}px, black 100%, transparent 100%)`,
                    WebkitMaskImage: useMotionTemplate`radial-gradient(circle 250px at ${mouseX}px ${mouseY}px, black 100%, transparent 100%)`,
                }}
            >
                {/* This content matches exactly but has different styles */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <ContentLayer isHiddenLayer={true} />
                </div>
            </motion.div>

            {/* CUSTOM CURSOR */}
            <motion.div
                style={{ x, y }}
                className="pointer-events-none fixed left-0 top-0 z-50 -ml-6 -mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white/10 backdrop-blur-sm mix-blend-difference"
            >
                <div className="h-1 w-1 bg-white rounded-full" />
            </motion.div>

            {/* GRAIN OVERLAY */}
            <div className="fixed inset-0 z-[60] pointer-events-none opacity-[0.05] mix-blend-overlay">
                <svg className="h-full w-full">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.6" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
            </div>

        </main>
    );
}
