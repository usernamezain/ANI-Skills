'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Star, Zap, Send, Smile, MousePointer2 } from 'lucide-react';

// --- Utility: Eye Tracking Hook ---
export function useEyeTracking() {
    const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate position relative to center of screen
            const x = (e.clientX / window.innerWidth - 0.5) * 20; // Move max 10px
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            setPupilPos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return pupilPos;
}

// --- Component: Neo-Brutalist Button ---
export function PopButton({ text, color, icon: Icon }: { text: string, color: string, icon: any }) {
    return (
        <button
            className="group relative flex items-center gap-3 rounded-xl border-4 border-black px-8 py-4 font-bold text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"
            style={{ backgroundColor: color }}
        >
            <span className="relative z-10 text-xl tracking-tight">{text}</span>
            <Icon className="h-6 w-6 stroke-[3px] transition-transform group-hover:rotate-12" />
        </button>
    );
}

// --- Component: Floating Sticker ---
export function Sticker({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
    const ref = useRef(null);

    useEffect(() => {
        // Floating animation
        gsap.to(ref.current, {
            y: -15,
            rotation: 5,
            duration: 2 + Math.random(),
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            delay: delay
        });
    }, [delay]);

    return (
        <div ref={ref} className={`absolute z-10 flex items-center justify-center rounded-full border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${className}`}>
            {children}
        </div>
    );
}

// --- Main Hero Component ---
export default function Cartoonish() {
    const { x, y } = useEyeTracking();

    useEffect(() => {
        const tl = gsap.timeline();

        // 1. Entrance: Elements pop in with elastic bounce
        tl.from('.pop-in', {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'elastic.out(1, 0.5)'
        });

        // 2. Background Grid Slide
        const gridAnimation = gsap.to('.bg-grid', {
            backgroundPosition: '100px 100px',
            duration: 20,
            repeat: -1,
            ease: 'none'
        });

        // Cleanup animations on unmount
        return () => {
            tl.kill();
            gridAnimation.kill();
        };
    }, []);

    return (
        <main className="relative h-screen w-full overflow-hidden bg-[#fff0f5] text-black selection:bg-[#ff90e8] scroll-smooth">

            {/* Fonts */}
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;600&family=Bangers&display=swap');
        .font-cartoon { font-family: 'Fredoka', sans-serif; }
        .font-loud { font-family: 'Bangers', cursive; }
      `}</style>

            {/* 1. Animated Polka Dot Background */}
            <div className="bg-grid absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)',
                    backgroundSize: '30px 30px'
                }}
            />

            {/* 2. Floating Stickers (Decor) */}
            <Sticker className="left-20 top-32 h-16 w-16 bg-[#00e5ff] rotate-12" delay={0}>
                <Zap className="h-8 w-8 fill-yellow-300 stroke-black stroke-[3px]" />
            </Sticker>

            <Sticker className="right-32 top-24 h-20 w-20 bg-[#ff90e8] -rotate-6" delay={0.5}>
                <Star className="h-10 w-10 fill-white stroke-black stroke-[3px]" />
            </Sticker>

            <Sticker className="bottom-32 left-32 h-14 w-14 bg-[#b2ff59] rotate-45" delay={1}>
                <Smile className="h-8 w-8 text-black stroke-[3px]" />
            </Sticker>

            <div className="pop-in absolute bottom-20 right-20 hidden md:block">
                <div className="relative">
                    <div className="absolute -top-12 -left-12 -rotate-12 bg-white border-4 border-black px-4 py-2 rounded-xl shadow-[4px_4px_0px_0px_#000]">
                        <span className="font-cartoon font-bold">Try me!</span>
                    </div>
                    <MousePointer2 className="w-12 h-12 stroke-[3px] fill-black rotate-[-15deg] animate-bounce" />
                </div>
            </div>

            {/* 3. Main Content */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">

                {/* The Giant Text Block */}
                <div className="relative flex flex-col items-center leading-none">

                    {/* Top Line */}
                    <h1 className="pop-in relative z-10 -rotate-3 font-loud text-8xl md:text-[10rem] text-[#ff90e8] drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] [-webkit-text-stroke:4px_black]">
                        MAKE IT
                    </h1>

                    {/* Middle Line (With Eyes) */}
                    <div className="pop-in relative z-20 flex items-center gap-4">
                        <h1 className="rotate-2 font-loud text-8xl md:text-[10rem] text-[#00e5ff] drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] [-webkit-text-stroke:4px_black]">
                            L
                        </h1>

                        {/* The Eyes */}
                        <div className="flex gap-4">
                            <div className="relative h-16 w-16 md:h-24 md:w-24 overflow-hidden rounded-full border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000]">
                                <div
                                    className="absolute h-8 w-8 md:h-12 md:w-12 rounded-full bg-black"
                                    style={{
                                        left: '50%', top: '50%',
                                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                                    }}
                                />
                            </div>
                            <div className="relative h-16 w-16 md:h-24 md:w-24 overflow-hidden rounded-full border-4 border-black bg-white shadow-[6px_6px_0px_0px_#000]">
                                <div
                                    className="absolute h-8 w-8 md:h-12 md:w-12 rounded-full bg-black"
                                    style={{
                                        left: '50%', top: '50%',
                                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                                    }}
                                />
                            </div>
                        </div>

                        <h1 className="rotate-2 font-loud text-8xl md:text-[10rem] text-[#00e5ff] drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] [-webkit-text-stroke:4px_black]">
                            K
                        </h1>
                    </div>

                    {/* Bottom Line */}
                    <h1 className="pop-in relative z-10 -rotate-1 font-loud text-8xl md:text-[10rem] text-[#ffeb3b] drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] [-webkit-text-stroke:4px_black]">
                        STUPID.
                    </h1>

                </div>

                {/* Buttons */}
                <div className="pop-in flex flex-col gap-6 sm:flex-row">
                    <PopButton text="Start Creating" color="#b2ff59" icon={Zap} />
                    <PopButton text="View Pranks" color="#ffffff" icon={Send} />
                </div>

            </div>

            {/* 4. Infinite Marquee Footer */}
            <div className="absolute bottom-0 left-0 w-full border-t-4 border-black bg-[#ff90e8] py-3">
                <div className="flex animate-marquee whitespace-nowrap font-loud text-2xl tracking-widest text-black">
                    <span className="mx-8">💥 NO BORING WEBSITES ALLOWED</span>
                    <span className="mx-8">★ BUILT FOR FUN</span>
                    <span className="mx-8">💥 NO BORING WEBSITES ALLOWED</span>
                    <span className="mx-8">★ BUILT FOR FUN</span>
                    <span className="mx-8">💥 NO BORING WEBSITES ALLOWED</span>
                    <span className="mx-8">★ BUILT FOR FUN</span>
                    <span className="mx-8">💥 NO BORING WEBSITES ALLOWED</span>
                    <span className="mx-8">★ BUILT FOR FUN</span>
                </div>
            </div>

            <style jsx>{`
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </main>
    );
}
