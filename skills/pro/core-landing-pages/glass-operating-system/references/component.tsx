'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Copy, Globe, Grid3X3, Layers, LayoutTemplate, Wifi } from 'lucide-react';

// --- Utility ---
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// --- ScrambleText Component ---
export const ScrambleText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState('');
    const chars = '!<>-_\\\\/[]{}—=+*^?#________';
    
    useEffect(() => {
        let iteration = 0;
        let interval: any = null;
        
        interval = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );
            
            if (iteration >= text.length) {
                clearInterval(interval);
            }
            iteration += 1 / 3;
        }, 30);
        
        return () => clearInterval(interval);
    }, [text]);
    
    return <span>{displayText}</span>;
};

// --- TimeDisplay Component ---
export const TimeDisplay = () => {
    const [time, setTime] = useState('');
    
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + '.' + Math.floor(now.getMilliseconds() / 10).toString().padStart(2, '0'));
        };
        updateTime();
        const interval = setInterval(updateTime, 50);
        return () => clearInterval(interval);
    }, []);
    
    return <span className="font-mono text-sm tracking-widest">{time}</span>;
};

// --- Card Component ---
interface CardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export const Card = ({ children, className, delay = 0 }: CardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md",
                "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/[0.08] before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100",
                className
            )}
        >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.05] via-transparent to-transparent opacity-50"></div>
            <div className="relative z-10 h-full p-6 flex flex-col">
                {children}
            </div>
        </motion.div>
    );
};

// --- Main Layout Component ---
export default function GlassOperatingSystem() {
    return (
        <main className="min-h-screen bg-black p-4 text-white selection:bg-white/20 selection:text-white md:p-8 font-sans">
            {/* Background Noise */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.04]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* Header Section */}
                <header className="mb-8 flex items-center justify-between">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                            <Grid3X3 className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium tracking-wider"><ScrambleText text="SYSTEM_OS" /></span>
                            <span className="text-xs text-white/50">v2.0.4 // KERNEL</span>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex items-center gap-6"
                    >
                        <div className="hidden items-center gap-2 md:flex text-white/50">
                            <Wifi className="h-4 w-4" />
                            <span className="text-xs uppercase tracking-widest">Connected</span>
                        </div>
                        <div className="h-1 w-1 rounded-full bg-white/20"></div>
                        <TimeDisplay />
                    </motion.div>
                </header>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-3 md:gap-6 h-[80vh] min-h-[600px]">
                    
                    {/* Hero Text Card - spans 2 cols, 2 rows */}
                    <Card className="md:col-span-2 md:row-span-2 group" delay={0.1}>
                        <div className="flex-1 flex flex-col justify-end">
                            <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-4 leading-none">
                                DIGITAL <br/>
                                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30">
                                    WORKSPACE
                                </span>
                            </h1>
                            <p className="text-white/40 max-w-sm text-sm leading-relaxed mb-8">
                                A high-performance spatial interface designed for modern web applications. Focus on what matters.
                            </p>
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-105 active:scale-95">
                                    Initialize
                                    <ArrowUpRight className="h-4 w-4" />
                                </button>
                                <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10">
                                    <Copy className="h-4 w-4 text-white/70" />
                                </button>
                            </div>
                        </div>
                        <div className="absolute top-6 right-6 flex items-center gap-2 opacity-30">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs font-mono tracking-widest uppercase">Live</span>
                        </div>
                    </Card>

                    {/* Stats/Globe Card - 1 col, 2 rows */}
                    <Card className="md:col-span-1 md:row-span-2" delay={0.2}>
                        <div className="flex items-center justify-between mb-4">
                            <Globe className="h-5 w-5 text-white/50" />
                            <span className="text-xs text-white/30 font-mono">NODE_01</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center relative">
                            {/* Simple CSS Globe representation */}
                            <div className="w-40 h-40 rounded-full border border-white/10 relative flex items-center justify-center group-hover:border-white/30 transition-colors duration-700">
                                <div className="absolute inset-0 rounded-full border border-white/5 rotate-45"></div>
                                <div className="absolute inset-0 rounded-full border border-white/5 -rotate-45"></div>
                                <div className="absolute w-full h-[1px] bg-white/10"></div>
                                <div className="absolute h-full w-[1px] bg-white/10"></div>
                                <div className="w-2 h-2 rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between items-end">
                            <div className="flex flex-col">
                                <span className="text-xs text-white/40 mb-1">LATENCY</span>
                                <span className="text-xl font-mono">12<span className="text-xs text-white/50 ml-1">ms</span></span>
                            </div>
                            <div className="text-right">
                                <span className="text-xs text-green-400 font-mono">+99.9%</span>
                            </div>
                        </div>
                    </Card>

                    {/* Components Card - 1 col, 1 row */}
                    <Card className="md:col-span-1 md:row-span-1" delay={0.3}>
                        <div className="flex items-center gap-3 mb-6">
                            <Layers className="h-5 w-5 text-white/50" />
                            <span className="text-sm font-medium tracking-wide">STACK</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['REACT', 'GSAP', 'FRAMER', 'TAILWIND'].map((tech) => (
                                <span key={tech} className="px-2 py-1 text-[10px] tracking-widest font-mono border border-white/10 rounded-md text-white/60 bg-white/5">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </Card>

                    {/* Active Users Card - 1 col, 1 row */}
                    <Card className="md:col-span-1 md:row-span-1 group" delay={0.4}>
                        <div className="flex flex-col h-full justify-between">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-white/50 uppercase tracking-widest">Capacity</span>
                                <LayoutTemplate className="h-4 w-4 text-white/30 group-hover:text-white/80 transition-colors" />
                            </div>
                            <div>
                                <div className="text-4xl font-light tracking-tighter mb-1">84%</div>
                                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-[84%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Bottom Wide Card - spans 2 cols, 1 row */}
                    <Card className="md:col-span-2 md:row-span-1 overflow-hidden" delay={0.5}>
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                        <div className="flex flex-col h-full justify-center">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-white/40 font-mono">TERMINAL // LOGS</span>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                    <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                </div>
                            </div>
                            <div className="font-mono text-xs text-white/60 space-y-1">
                                <div className="flex gap-2">
                                    <span className="text-blue-400">→</span>
                                    <span>Mounting spatial interfaces...</span>
                                    <span className="text-green-400 ml-auto">OK</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-blue-400">→</span>
                                    <span>Establishing secure connection...</span>
                                    <span className="text-green-400 ml-auto">OK</span>
                                </div>
                                <div className="flex gap-2 opacity-50">
                                    <span className="text-blue-400">→</span>
                                    <span>Awaiting user input_</span>
                                    <span className="animate-pulse">_</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                </div>
            </div>
        </main>
    );
}
