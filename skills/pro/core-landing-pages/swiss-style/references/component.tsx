'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import { ArrowRight, ArrowDownLeft } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image as DreiImage, useCursor } from '@react-three/drei';
import * as THREE from 'three';

// --- 3D Component: Interactive Image ---
export function HoverImage() {
    const ref = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);

    useCursor(hovered); 

    useFrame((state, delta) => {
        if (!ref.current) return;

        const material = ref.current.material as any;

        // Lerp Grayscale: 1 (B&W) -> 0 (Color)
        material.grayscale = THREE.MathUtils.damp(
            material.grayscale,
            hovered ? 0 : 1,
            4,
            delta
        );

        // Lerp Zoom: 1 -> 1.1
        material.zoom = THREE.MathUtils.damp(
            material.zoom,
            hovered ? 1.1 : 1,
            4,
            delta
        );

        // Subtle breathing animation
        ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    });

    return (
        <DreiImage
            ref={ref as any}
            url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
            transparent
            scale={[4, 5]} 
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        />
    );
}

// --- Component: 3D Scene Wrapper ---
export function Scene() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <HoverImage />
        </Canvas>
    );
}

// --- Component: Infinite Marquee ---
export function Marquee() {
    return (
        <div className="relative flex overflow-hidden border-t border-black bg-[#ff3300] py-4 text-black">
            <div className="animate-marquee whitespace-nowrap text-4xl font-black uppercase tracking-tighter">
                <span className="mx-4">New Collection 2024 —</span>
                <span className="mx-4">Paris Fashion Week —</span>
                <span className="mx-4">Available Worldwide —</span>
                <span className="mx-4">New Collection 2024 —</span>
                <span className="mx-4">Paris Fashion Week —</span>
                <span className="mx-4">Available Worldwide —</span>
            </div>
        </div>
    );
}

// --- Main Hero Component ---
export default function SwissPortfolio() {
    const titleLine1 = useRef(null);
    const titleLine2 = useRef(null);
    const navRef = useRef(null);

    useEffect(() => {
        // Smooth Scroll Setup
        const lenis = new Lenis();
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // GSAP Reveal Animation
        const tl = gsap.timeline();

        tl.from(navRef.current, {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
            .from([titleLine1.current, titleLine2.current], {
                y: 150,
                skewY: 7,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out"
            }, "-=0.5")
            .from(".grid-border", {
                scaleX: 0,
                duration: 1.5,
                ease: "expo.out",
                stagger: 0.1
            }, "-=1")
            .from(".reveal-fade", {
                opacity: 0,
                y: 20,
                duration: 1,
                stagger: 0.1
            }, "-=1");

    }, []);

    return (
        <main className="min-h-screen w-full bg-[#f4f4f0] text-black selection:bg-[#ff3300] selection:text-white">

            {/* 1. Navigation */}
            <nav ref={navRef} className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-black/10 bg-[#f4f4f0]/80 px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 backdrop-blur-md">
                <div className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight">Studio.Five</div>
                <div className="hidden sm:flex gap-4 md:gap-6 lg:gap-8 text-xs sm:text-sm font-medium uppercase tracking-widest text-black/60">
                    <a href="#" className="hover:text-black">Index</a>
                    <a href="#" className="hover:text-black">Models</a>
                    <a href="#" className="hover:text-black">Info</a>
                </div>
                <button className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-black px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 text-xs sm:text-sm text-white transition-colors hover:bg-[#ff3300]">
                    Let's Talk
                </button>
            </nav>

            {/* 2. Main Grid Layout */}
            <div className="relative flex min-h-screen flex-col pt-24">

                {/* Top Section: Title & Details */}
                <div className="grid h-full flex-1 grid-cols-1 md:grid-cols-12">

                    {/* Left Col: Massive Typography */}
                    <div className="relative col-span-1 flex flex-col justify-between border-r border-black/10 p-6 md:col-span-7 md:p-12 lg:p-16">
                        <div className="mt-12 overflow-hidden">
                            <h1 className="text-7xl font-bold uppercase leading-[0.85] tracking-tighter md:text-8xl lg:text-[9rem]">
                                <div className="overflow-hidden">
                                    <span ref={titleLine1} className="block">Digital</span>
                                </div>
                                <div className="overflow-hidden">
                                    <span ref={titleLine2} className="ml-12 block text-transparent" style={{ WebkitTextStroke: '2px black' }}>
                                        Luxury
                                    </span>
                                </div>
                            </h1>
                        </div>

                        <div className="reveal-fade mt-12 flex max-w-md flex-col gap-6">
                            <p className="font-serif text-xl italic leading-relaxed text-neutral-600">
                                "Simplicity is the ultimate sophistication. We craft digital experiences that stand the test of time."
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-10 w-10 rounded-full border border-[#f4f4f0] bg-neutral-300" />
                                    ))}
                                </div>
                                <span className="text-sm font-bold uppercase tracking-widest">+400 Projects</span>
                            </div>
                        </div>

                        {/* Decor: Corner Icon */}
                        <div className="absolute right-0 top-0 p-4">
                            <ArrowDownLeft className="h-12 w-12 stroke-1 text-black/20" />
                        </div>
                    </div>

                    {/* Right Col: 3D Visual */}
                    <div className="relative col-span-1 min-h-[50vh] overflow-hidden bg-neutral-200 md:col-span-5 md:min-h-auto">
                        <div className="grid-border absolute top-0 h-[1px] w-full origin-left bg-black" />

                        <div className="absolute inset-0 h-full w-full cursor-pointer">
                            <Scene />
                        </div>

                        {/* Overlay Badge */}
                        <div className="pointer-events-none absolute bottom-8 left-8">
                            <div className="flex h-24 w-24 animate-spin-slow items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
                                <ArrowRight className="h-8 w-8 text-white" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Section: Infinite Marquee */}
                <div className="z-10 mt-auto">
                    <Marquee />
                </div>
            </div>

            {/* Decorative Grid Lines overlaying everything (optional) */}
            <div className="pointer-events-none absolute inset-0 z-0 hidden w-full justify-between px-6 md:flex">
                <div className="h-full w-[1px] bg-black/5" />
                <div className="h-full w-[1px] bg-black/5" />
                <div className="h-full w-[1px] bg-black/5" />
            </div>

            {/* Style for Marquee Animation */}
            <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 25s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </main>
    );
}
