'use client';

import React, { useEffect, useState } from 'react';
import { Play, Disc, Monitor, ArrowDown } from 'lucide-react';
import gsap from 'gsap';

// --- Custom Hook: Text Scramble Effect ---
export function useScramble(text: string, speed: number = 40, active: boolean = true) {
    const [displayText, setDisplayText] = useState('');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

    useEffect(() => {
        if (!active) return;

        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((letter, index) => {
                        if (index < iterations) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 3;
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, active]);

    return displayText;
};

// --- Component: Retro Grid Background ---
export function RetroGrid() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#12001f]">
            {/* The Sun */}
            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-b from-yellow-300 to-pink-600 blur-[80px] opacity-40" />

            {/* The Moving Grid */}
            <div className="perspective-grid absolute inset-0 z-0 opacity-40" />

            <style jsx>{`
      .perspective-grid {
        background-image: 
          linear-gradient(rgba(255, 0, 255, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 0, 255, 0.3) 1px, transparent 1px);
        background-size: 40px 40px;
        background-position: center bottom;
        transform: perspective(500px) rotateX(60deg) scale(2);
        transform-origin: bottom;
        animation: gridMove 2s linear infinite;
        mask-image: linear-gradient(to bottom, transparent 5%, black 40%);
      }
      
      @keyframes gridMove {
        0% { background-position: 0 0; }
        100% { background-position: 0 40px; }
      }
    `}</style>
        </div>
    );
}

// --- Component: CRT Overlay ---
export function CRTOverlay() {
    return (
        <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />
            <div className="absolute inset-0 bg-black opacity-10 animate-flicker pointer-events-none" />
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] pointer-events-none" />

            <style jsx>{`
      @keyframes flicker {
        0% { opacity: 0.1; }
        5% { opacity: 0.15; }
        10% { opacity: 0.1; }
        100% { opacity: 0.1; }
      }
      .animate-flicker {
        animation: flicker 0.15s infinite;
      }
    `}</style>
        </div>
    );
}

// --- Main Hero Component ---
export default function Retro80s() {
    const [booted, setBooted] = useState(false);
    const title = useScramble("NEO_SYNTH", 50, booted);
    const sub = useScramble("SYSTEM ONLINE // READY FOR INPUT", 30, booted);

    useEffect(() => {
        // Simulate system boot delay
        const timer = setTimeout(() => setBooted(true), 500);

        // GSAP floating elements
        gsap.to('.floating', {
            y: -15,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            stagger: 0.2
        });

        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="relative h-screen w-full overflow-hidden bg-black font-mono text-pink-500 selection:bg-pink-500 selection:text-black">
            {/* Background Layers */}
            <RetroGrid />
            <CRTOverlay />

            {/* Navigation */}
            <nav className="relative z-40 flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 uppercase tracking-widest border-b border-pink-500/20 bg-black/40 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <Monitor className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
                    <span className="text-xs sm:text-sm">SYS.OS v1.0</span>
                </div>
                <div className="hidden sm:flex gap-4 md:gap-6 lg:gap-8 text-[10px] sm:text-xs">
                    <a href="#" className="hover:text-cyan-400 hover:underline decoration-2 underline-offset-4">Archives</a>
                    <a href="#" className="hover:text-cyan-400 hover:underline decoration-2 underline-offset-4">Cassettes</a>
                    <a href="#" className="hover:text-cyan-400 hover:underline decoration-2 underline-offset-4">Protocol</a>
                </div>
                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" />
            </nav>

            {/* Main Content */}
            <div className="relative z-30 flex h-full flex-col items-center justify-center text-center px-4">

                {/* Top Glitch Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded border border-cyan-500/50 bg-cyan-900/20 px-3 py-1 text-xs text-cyan-400 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    SECURE CONNECTION
                </div>

                {/* Massive Title */}
                <h1 className="glitch-text text-6xl font-black tracking-tighter md:text-9xl lg:text-[10rem] text-transparent stroke-white"
                    style={{
                        WebkitTextStroke: '2px #ff00ff',
                        textShadow: '4px 4px 0px #00ffff'
                    }}>
                    {title}
                </h1>

                {/* Subtitle */}
                <p className="mt-8 max-w-2xl font-mono text-lg text-cyan-300 md:text-xl">
                    {sub} <span className="animate-pulse">_</span>
                </p>

                {/* Retro Buttons */}
                <div className="floating mt-12 flex flex-col gap-6 sm:flex-row">
                    <button className="group relative overflow-hidden bg-pink-600 px-8 py-4 font-bold text-white transition-transform active:scale-95 shadow-[4px_4px_0px_#ffffff]">
                        <div className="relative z-10 flex items-center gap-2">
                            <Play className="fill-current h-4 w-4" />
                            <span>START ENGINE</span>
                        </div>
                        <div className="absolute inset-0 -translate-x-full bg-white transition-transform group-hover:translate-x-0" />
                        <div className="absolute inset-0 z-10 -translate-x-full bg-transparent text-pink-600 flex items-center justify-center gap-2 transition-transform group-hover:translate-x-0">
                            <Play className="fill-current h-4 w-4" />
                            <span>START ENGINE</span>
                        </div>
                    </button>

                    <button className="group flex items-center gap-2 border-2 border-cyan-400 px-8 py-4 font-bold text-cyan-400 hover:bg-cyan-400/10 transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                        <Disc className="h-5 w-5 group-hover:rotate-180 transition-transform duration-700" />
                        <span>LOAD DISC</span>
                    </button>
                </div>
            </div>

            {/* Decorative Floating Elements */}
            <div className="floating absolute bottom-12 left-12 hidden md:block">
                <div className="w-32 h-32 border border-pink-500/30 rounded-full flex items-center justify-center animate-spin-slow">
                    <div className="w-24 h-24 border border-cyan-500/30 rounded-full border-dashed" />
                </div>
            </div>

            {/* Right Side Data */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden flex-col gap-8 text-[10px] text-pink-500/50 md:flex text-right font-mono">
                <div>
                    <p>CPU_TEMP</p>
                    <p className="text-xl text-pink-400">42°C</p>
                </div>
                <div>
                    <p>MEM_USAGE</p>
                    <p className="text-xl text-pink-400">64TB</p>
                </div>
                <div>
                    <p>UPTIME</p>
                    <p className="text-xl text-pink-400">09:14:21</p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cyan-500/50">
                <span className="text-[10px] uppercase tracking-widest">Scroll to Enter</span>
                <ArrowDown className="h-4 w-4 animate-bounce" />
            </div>

        </main>
    );
}
