'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Droplets } from 'lucide-react';

// --- 1. THE ENGINE (SVG FILTERS) ---
// This hidden component powers the liquid physics across the site.
function LiquidFilters() {
    return (
        <svg className="fixed h-0 w-0 pointer-events-none">
            <defs>
                {/* FILTER 1: The Gooey Effect (Merges shapes) */}
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                        result="goo"
                    />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>

                {/* FILTER 2: Liquid Distortion (Ripples text) */}
                <filter id="liquid-metal">
                    <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" seed="1">
                        <animate attributeName="baseFrequency" dur="10s" values="0.01;0.02;0.01" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
                </filter>

                {/* FILTER 3: Chrome Reflection Gradient Definition */}
                <linearGradient id="chrome-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="20%" stopColor="#a0a0a0" />
                    <stop offset="50%" stopColor="#404040" />
                    <stop offset="51%" stopColor="#000000" />
                    <stop offset="80%" stopColor="#a0a0a0" />
                    <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
            </defs>
        </svg>
    );
}

// --- 2. COMPONENTS ---

// The "T-1000" Text Component
function ChromeText({ children, className, size = "large" }: { children: React.ReactNode, className: string, size: string }) {
    return (
        <div className={`relative font-black uppercase tracking-tighter ${className}`}>
            {/* The Liquid Distortion Layer */}
            <span
                className="absolute inset-0 block text-transparent bg-clip-text select-none blur-[2px] opacity-70"
                style={{
                    backgroundImage: 'linear-gradient(180deg, #fff 0%, #aaa 40%, #000 50%, #aaa 60%, #fff 100%)',
                    filter: 'url(#liquid-metal)',
                }}
            >
                {children}
            </span>

            {/* The Sharp Chrome Layer */}
            <span
                className="relative block text-transparent bg-clip-text"
                style={{
                    backgroundImage: 'linear-gradient(180deg, #fff 0%, #silver 40%, #000 50%, #888 60%, #fff 100%)',
                    WebkitTextStroke: '1px rgba(255,255,255,0.2)',
                    filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.5))'
                }}
            >
                {children}
            </span>

            {/* The Shine Animation */}
            <motion.span
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 block text-transparent bg-clip-text mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                    backgroundSize: '200% 100%'
                }}
            >
                {children}
            </motion.span>
        </div>
    );
};

// The Molten Button
function MoltenButton({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative h-20 w-48" style={{ filter: "url(#goo)" }}>
            {/* Main Blob */}
            <button className="absolute inset-0 z-20 flex items-center justify-center rounded-full bg-white text-xl font-bold uppercase tracking-widest text-black transition-transform hover:scale-95 active:scale-90">
                {children}
            </button>

            {/* Hover Drips */}
            <motion.div
                className="absolute left-1/2 top-1/2 z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                whileHover={{ scale: [1, 1.5, 1], x: [0, -40, 40, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
                className="absolute left-1/2 top-1/2 z-10 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                whileHover={{ scale: [1, 1.3, 1], y: [0, 40, -40, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: 0.1 }}
            />
        </div>
    );
}

// Background Fluid Mesh
function FluidBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-neutral-900">
            <div className="absolute inset-0 opacity-30" style={{ filter: 'url(#liquid-metal)' }}>
                <motion.div
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -left-[20%] h-[80vh] w-[80vh] rounded-full bg-gradient-to-br from-gray-100 to-gray-800"
                />
                <motion.div
                    animate={{ rotate: -360, scale: [1, 1.5, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[40%] -right-[20%] h-[100vh] w-[100vh] rounded-full bg-gradient-to-tl from-white via-gray-500 to-black mix-blend-exclusion"
                />
            </div>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
    );
}

export default function ChromeLiquid() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -300]);

    // Mouse Physics for the sphere
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        mouseX.set(clientX);
        mouseY.set(clientY);
    };

    return (
        <main
            onMouseMove={handleMouseMove}
            className="relative min-h-screen w-full overflow-hidden bg-black text-white selection:bg-white selection:text-black"
        >
            <LiquidFilters />
            <FluidBackground />

            {/* --- HERO SECTION --- */}
            <section className="relative z-10 flex min-h-screen flex-col items-center justify-center">

                {/* Floating Orb that follows mouse slowly */}
                <motion.div
                    className="absolute pointer-events-none mix-blend-difference"
                    animate={{
                        x: mouseX.get(),
                        y: mouseY.get(),
                    }}
                    transition={{ type: "spring", damping: 50, stiffness: 200, mass: 3 }} // Heavy fluid feel
                    style={{ x: -150, y: -150 }} // Center it
                >
                    <div className="h-[300px] w-[300px] rounded-full bg-gradient-to-b from-white to-black blur-md" />
                </motion.div>

                <div className="relative z-20 flex flex-col items-center gap-8 mix-blend-hard-light">
                    <motion.div
                        initial={{ filter: "blur(20px)", opacity: 0 }}
                        animate={{ filter: "blur(0px)", opacity: 1 }}
                        transition={{ duration: 2 }}
                    >
                        <ChromeText className="text-[15vw] leading-[0.8]" size="large">
                            LIQUID
                        </ChromeText>
                        <ChromeText className="text-[15vw] leading-[0.8] ml-20 md:ml-40" size="large">
                            METAL
                        </ChromeText>
                    </motion.div>

                    <p className="max-w-md text-center text-lg font-medium text-gray-400 uppercase tracking-[0.2em] mt-8">
                        State: Flux <span className="mx-2">///</span> Viscosity: High
                    </p>

                    <div className="mt-12">
                        <MoltenButton>
                            Initiate
                        </MoltenButton>
                    </div>
                </div>

            </section>

            {/* --- CONTENT SECTION --- */}
            <section ref={containerRef} className="relative z-10 min-h-screen px-6 py-24">
                <div className="container mx-auto">

                    {/* Liquid Cards */}
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">

                        {/* Card 1 */}
                        <motion.div
                            style={{ y: yParallax }}
                            className="group relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-black/50 p-12 backdrop-blur-md"
                        >
                            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-[50px] transition-all duration-700 group-hover:bg-white/30" />

                            <Droplets className="mb-8 text-white" size={48} />
                            <h3 className="mb-4 text-5xl font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                                Fluidity
                            </h3>
                            <p className="text-xl text-gray-400">
                                The interface adapts to the container. Like water, it has no shape, yet it takes every shape.
                            </p>
                        </motion.div>

                        {/* Card 2 */}
                        <div className="flex flex-col justify-center pt-24">
                            <h2 className="text-6xl font-black uppercase leading-none md:text-8xl">
                                <span className="block text-stroke-1 text-transparent">Hard</span>
                                <span className="block text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">Shell</span>
                            </h2>
                            <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent" />
                            <p className="mt-8 text-right font-mono text-sm text-gray-500 uppercase">
                                00101010 MERCURY BASE
                            </p>
                        </div>
                    </div>

                    {/* Molten Marquee */}
                    <div className="mt-40 overflow-hidden border-y border-white/20 bg-white/5 py-12 backdrop-blur-sm">
                        <motion.div
                            animate={{ x: "-50%" }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="flex w-max items-center gap-12"
                            style={{ filter: "url(#liquid-metal)" }} // APPLYING THE DISTORTION HERE
                        >
                            {Array.from({ length: 6 }).map((_, i) => (
                                <span key={i} className="text-8xl font-black text-gray-400 opacity-50 uppercase">
                                    Chromium
                                </span>
                            ))}
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="relative z-10 flex flex-col items-center justify-center gap-8 bg-linear-to-b from-transparent to-white/10 py-32">
                <div className="h-px w-24 bg-white" />
                <ChromeText className="text-6xl md:text-8xl" size="large">
                    THE END
                </ChromeText>
                <div className="h-px w-24 bg-white" />
            </footer>

        </main>
    );
}
