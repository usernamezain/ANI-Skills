"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowUpRight, Star, Hexagon, Zap, Box, Smile } from "lucide-react";
import { cn } from "@/src/lib/utils"
import { motion } from "framer-motion";

// --- CONFIG ---
gsap.registerPlugin(ScrollTrigger);

export const COLORS = {
    bg: "bg-[#E0E0E0]", // Light concrete
    primary: "bg-[#FF4D00]", // International Orange
    secondary: "bg-[#0047FF]", // Hyper Blue
    accent: "bg-[#CCFF00]", // Acid Lime
    text: "text-[#1A1A1A]", // Off-black
    border: "border-black",
};

// --- COMPONENTS ---

// 1. MAGNETIC BUTTON (Physics-based interaction)
export function MagneticBtn({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const mouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * 0.3);
            yTo(y * 0.3);
        };

        const mouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        el.addEventListener("mousemove", mouseMove);
        el.addEventListener("mouseleave", mouseLeave);
        return () => {
            el.removeEventListener("mousemove", mouseMove);
            el.removeEventListener("mouseleave", mouseLeave);
        };
    }, []);

    return (
        <button
            ref={ref}
            className={cn(
                "relative inline-flex items-center justify-center rounded-full border-2 border-black px-8 py-4 text-lg font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_#000] transition-all hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-y-[4px] active:shadow-none",
                className
            )}
        >
            {children}
        </button>
    );
};

// 2. SCROLL MARQUEE
export function Marquee({ text, direction = 1, className }: { text: string; direction?: number, className?: string }) {
    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);
    let xPercent = 0;

    useLayoutEffect(() => {
        let animationFrameId: number;

        const animate = () => {
            if (xPercent <= -100) {
                xPercent = 0;
            }
            if (xPercent > 0) {
                xPercent = -100;
            }

            gsap.set(firstText.current, { xPercent: xPercent });
            gsap.set(secondText.current, { xPercent: xPercent });
            xPercent += 0.1 * direction;
            animationFrameId = requestAnimationFrame(animate);
        };

        // Speed up on scroll
        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                scrub: 0.25,
                start: 0,
                end: window.innerHeight,
                onUpdate: e => (direction = e.direction * -1)
            },
            x: "-500px",
        });

        animate();
        return () => cancelAnimationFrame(animationFrameId);
    }, [direction]);

    return (
        <div className={cn("relative flex overflow-hidden border-y-4 border-black bg-white py-6", className)}>
            <div ref={slider} className="relative whitespace-nowrap">
                <p ref={firstText} className="m-0 pr-12 text-8xl font-black uppercase text-black">
                    {text} • {text} • {text} •
                </p>
                <p ref={secondText} className="absolute left-[100%] top-0 m-0 pr-12 text-8xl font-black uppercase text-black">
                    {text} • {text} • {text} •
                </p>
            </div>
        </div>
    );
};

// 3. PARALLAX IMAGE CARD
export function BrutalCard({ title, img, color, i }: { title: string; img: string; color: string, i: number }) {
    const cardRef = useRef(null);

    useLayoutEffect(() => {
        gsap.fromTo(cardRef.current,
            { rotation: Math.random() * 10 - 5, y: 100 },
            {
                rotation: 0,
                y: 0,
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top bottom-=100",
                    end: "top center",
                    scrub: 1
                }
            }
        )
    }, []);

    return (
        <div ref={cardRef} className={cn("group relative aspect-[3/4] w-full border-4 border-black p-4 transition-transform hover:-translate-y-2", color, "shadow-[8px_8px_0px_0px_#000]")}>
            <div className="relative h-full w-full overflow-hidden border-2 border-black bg-white">
                <img src={img} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                <div className="absolute bottom-0 left-0 w-full border-t-2 border-black bg-white p-2 text-center font-bold uppercase">
                    {title}
                </div>
            </div>
            {/* Decorative Pin */}
            <div className="absolute -top-6 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000]" />
        </div>
    )
}

// --- SECTIONS ---

export function Navbar() {
    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <div className="flex items-center gap-8 rounded-full border-4 border-black bg-white px-8 py-4 shadow-[4px_4px_0px_0px_#000]">
                <Hexagon className="fill-black" size={32} />
                <div className="hidden md:flex gap-6 text-sm font-bold uppercase tracking-widest">
                    {['Work', 'Agency', 'Pricing'].map(item => (
                        <a key={item} href="#" className="hover:text-[#FF4D00] transition-colors">{item}</a>
                    ))}
                </div>
                <button className="rounded-full bg-[#CCFF00] px-6 py-2 font-black uppercase border-2 border-black hover:bg-[#FF4D00] transition-colors">
                    Let's Talk
                </button>
            </div>
        </nav>
    );
}

export function Hero() {
    const container = useRef(null);
    const textRef = useRef(null);
    const shapeRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Text Stagger
            gsap.from(".hero-text", {
                y: 200,
                skewY: 10,
                stagger: 0.1,
                duration: 1.5,
                ease: "power4.out"
            });

            // Spinning Shape
            gsap.to(shapeRef.current, {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: "linear"
            });

            // Scroll Parallax
            gsap.to(container.current, {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#E0E0E0] pt-32">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div ref={shapeRef} className="absolute right-[10%] top-[15%] hidden md:block">
                <Star size={180} strokeWidth={1} className="fill-[#CCFF00] text-black drop-shadow-[8px_8px_0px_#000]" />
            </div>

            <div ref={textRef} className="relative z-10 text-center mix-blend-hard-light">
                <div className="overflow-hidden">
                    <h1 className="hero-text text-[15vw] font-black leading-[0.8] tracking-tighter text-[#1A1A1A]">
                        DIGITAL
                    </h1>
                </div>
                <div className="overflow-hidden">
                    <h1 className="hero-text text-[15vw] font-black leading-[0.8] tracking-tighter text-[#FF4D00] stroke-black" style={{ WebkitTextStroke: "4px black", color: "#FF4D00" }}>
                        CHAOS
                    </h1>
                </div>
                <div className="overflow-hidden">
                    <h1 className="hero-text text-[15vw] font-black leading-[0.8] tracking-tighter text-[#1A1A1A]">
                        THEORY
                    </h1>
                </div>
            </div>

            <div className="mt-12 flex gap-4">
                <MagneticBtn className="bg-[#0047FF] text-white">View Projects</MagneticBtn>
                <MagneticBtn className="bg-white hover:bg-[#CCFF00]">Showreel <ArrowUpRight className="ml-2" /></MagneticBtn>
            </div>

            <div className="absolute bottom-12 left-12 hidden md:block">
                <div className="w-32 animate-spin-slow text-black fill-black">
                    <svg viewBox="0 0 100 100" width="100" height="100">
                        <defs>
                            <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                        </defs>
                        <text fontSize="14" fontWeight="bold">
                            <textPath xlinkHref="#circle">
                                SCROLL DOWN • SCROLL DOWN •
                            </textPath>
                        </text>
                    </svg>
                </div>
            </div>
        </section>
    )
}

export function GridSection() {
    return (
        <section className="bg-black py-24">
            <div className="container mx-auto px-4">
                <div className="mb-16 flex flex-col md:flex-row items-end justify-between gap-8 border-b-4 border-white pb-8">
                    <h2 className="text-6xl md:text-8xl font-black uppercase text-white">
                        Selected <br /> <span className="text-[#CCFF00]">Works</span>
                    </h2>
                    <p className="max-w-md text-xl font-bold text-gray-400">
                        We build brands that scream instead of whisper. Anti-boring websites for modern companies.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                    <BrutalCard
                        i={0}
                        title="Hyper Nike"
                        img="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
                        color="bg-[#FF4D00]"
                    />
                    <BrutalCard
                        i={1}
                        title="Acid Coffee"
                        img="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop"
                        color="bg-[#CCFF00]"
                    />
                    <BrutalCard
                        i={2}
                        title="Retro Tech"
                        img="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop"
                        color="bg-[#0047FF]"
                    />
                </div>
            </div>
        </section>
    )
}

export function Services() {
    const services = [
        { title: "Web Design", icon: <Box size={40} />, desc: "Layouts that break the grid." },
        { title: "Motion", icon: <Zap size={40} />, desc: "Animation that feels like physics." },
        { title: "Branding", icon: <Smile size={40} />, desc: "Identities that hurt feelings." },
    ];

    return (
        <section className="relative z-10 bg-[#E0E0E0] py-32">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {services.map((s, i) => (
                        <div key={i} className="group relative border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_#000] transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-none">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-black bg-[#CCFF00]">
                                {s.icon}
                            </div>
                            <h3 className="mb-4 text-4xl font-black uppercase italic">{s.title}</h3>
                            <p className="text-xl font-medium text-gray-700">{s.desc}</p>
                            <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
                                <ArrowUpRight size={32} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export function Footer() {
    const triggerRef = useRef(null);
    const textRef = useRef(null);

    useLayoutEffect(() => {
        gsap.fromTo(textRef.current,
            { yPercent: 50 },
            {
                yPercent: 0,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true
                }
            }
        )
    }, []);

    return (
        <footer ref={triggerRef} className="relative min-h-[80vh] bg-[#FF4D00] px-6 pt-32 pb-12 flex flex-col justify-between overflow-hidden border-t-8 border-black">
            <div className="container mx-auto">
                <div className="mb-12">
                    <p className="text-2xl font-bold uppercase tracking-widest text-black">Have an idea?</p>
                </div>

                <div ref={textRef}>
                    <h2 className="text-[12vw] font-black leading-[0.8] tracking-tighter text-black">
                        LET'S MAKE <br />
                        <span className="text-white" style={{ WebkitTextStroke: "4px black" }}>NOISE</span>
                    </h2>
                </div>

                <div className="mt-24 flex flex-col md:flex-row justify-between items-end border-t-4 border-black pt-8">
                    <div className="flex gap-4">
                        {['Instagram', 'Twitter', 'LinkedIn'].map(link => (
                            <a key={link} href="#" className="border-2 border-black bg-white px-4 py-2 font-bold uppercase shadow-[4px_4px_0px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all">
                                {link}
                            </a>
                        ))}
                    </div>
                    <p className="mt-8 md:mt-0 font-bold uppercase text-black">© 2024 Chaos Theory Inc.</p>
                </div>
            </div>
        </footer>
    )
}

// 7. CHUNKY BENTO GRID (Masonry-style reveal)
export function BentoGrid() {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".bento-item", {
                scale: 0.5,
                opacity: 0,
                y: 100,
                stagger: 0.1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: 1,
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-white py-32 border-y-8 border-black">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-black">
                    <h2 className="text-7xl font-black uppercase leading-none tracking-tighter">
                        The <br /> <span className="text-[#0047FF]">Toolkit</span>
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[800px]">
                    <div className="bento-item md:col-span-2 md:row-span-2 border-4 border-black bg-[#CCFF00] p-12 flex flex-col justify-between shadow-[12px_12px_0px_0px_#000]">
                        <h3 className="text-6xl font-black uppercase text-black">Visual <br /> Engine</h3>
                        <p className="text-2xl font-bold uppercase italic text-black">Raw Power • Total Control</p>
                    </div>
                    <div className="bento-item md:col-span-1 border-4 border-black bg-[#FF4D00] p-8 shadow-[12px_12px_0px_0px_#000]">
                        <div className="h-full flex items-center justify-center">
                            <Zap size={80} strokeWidth={3} className="text-black" />
                        </div>
                    </div>
                    <div className="bento-item md:col-span-1 border-4 border-black bg-white p-8 shadow-[12px_12px_0px_0px_#000]">
                         <h4 className="text-3xl font-black uppercase text-black">Speed</h4>
                         <p className="mt-4 font-bold text-black text-sm">Turbo-charged deployment workflows.</p>
                    </div>
                    <div className="bento-item md:col-span-2 border-4 border-black bg-[#0047FF] text-white p-8 shadow-[12px_12px_0px_0px_#000]">
                        <div className="flex justify-between items-end h-full">
                            <h4 className="text-4xl font-black uppercase italic">Future Proof</h4>
                            <Hexagon size={48} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// 8. TICKER TAPE (Multi-Layered Marquees)
export function TickerTape() {
    return (
        <section className="bg-black py-12 overflow-hidden flex flex-col gap-6">
            <Marquee text="LOUD DESIGN ONLY" direction={1} className="bg-[#FF4D00] rotate-2 scale-110" />
            <Marquee text="SYSTEM OVERRIDE" direction={-1} className="bg-[#CCFF00] -rotate-1 scale-105" />
            <Marquee text="CHAOS IS ORDER" direction={1} className="bg-[#0047FF] rotate-1 text-white border-y-0" />
        </section>
    );
}

// 9. SPLIT INTERACTIVE (Sticky Stats)
export function SplitInteractive() {
    const container = useRef<HTMLElement>(null);
    const leftSide = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: container.current,
                start: "top top",
                end: "bottom bottom",
                pin: leftSide.current,
                pinSpacing: false
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="bg-[#E0E0E0] border-b-8 border-black">
            <div className="flex flex-col md:flex-row">
                <div ref={leftSide} className="w-full md:w-1/2 h-screen flex items-center justify-center bg-[#FF4D00] p-12 border-r-8 border-black z-10">
                    <h2 className="text-[15vw] md:text-[8vw] font-black uppercase leading-none text-black text-center">
                        WHY <br /> <span className="text-white" style={{ WebkitTextStroke: "3px black" }}>US?</span>
                    </h2>
                </div>
                <div className="w-full md:w-1/2 px-6 py-32 space-y-32">
                    {[
                        { title: "No Boring Grids", desc: "We break every rule in the book to ensure your brand stands out in the digital noise." },
                        { title: "Toxic Vibrancy", desc: "Colors that grab your attention and don't let go. Designed for the bold." },
                        { title: "Motion First", desc: "Every interaction is carefully choreographed to feel alive and physical." },
                        { title: "Brutal Honesty", desc: "We don't hide behind corporate jargon. We build things that work and look good." }
                    ].map((item, i) => (
                        <div key={i} className="border-4 border-black bg-white p-12 shadow-[12px_12px_0px_0px_#000]">
                            <span className="text-6xl font-black text-[#FF4D00]">0{i + 1}</span>
                            <h3 className="text-4xl font-black uppercase mt-4 mb-6 text-black">{item.title}</h3>
                            <p className="text-xl font-bold text-gray-700">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 10. FLOATING STICKERS (Parallax Decor)
export function FloatingStickers() {
    return (
        <section className="relative h-[60vh] bg-white border-y-8 border-black flex items-center justify-center overflow-hidden">
             <div className="text-center z-10 px-6">
                <h2 className="text-6xl md:text-9xl font-black uppercase leading-tight italic text-black">
                    Sticker <span className="bg-[#CCFF00] px-4">Market</span>
                </h2>
             </div>
             {/* Floating elements */}
             {[
                { icon: <Star size={100} className="fill-[#FF4D00] text-black" />, pos: "top-10 left-[10%]" },
                { icon: <Zap size={100} className="fill-[#0047FF] text-white" />, pos: "bottom-20 right-[15%]" },
                { icon: <Smile size={100} className="fill-[#CCFF00] text-black" />, pos: "top-[20%] right-[10%]" },
                { icon: <Hexagon size={100} className="fill-black text-black" />, pos: "bottom-[10%] left-[20%]" },
             ].map((s, i) => (
                <div key={i} className={cn("absolute scale-[0.5] md:scale-1 pointer-events-none", s.pos)}>
                    <div className="animate-bounce" style={{ animationDuration: `${(i+2)*0.5}s` }}>
                        {s.icon}
                    </div>
                </div>
             ))}
        </section>
    );
}

// 11. BRUTALIST PRICING (High Voltage)
export function Pricing() {
    return (
        <section className="bg-black py-48">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { plan: "Starter", price: "$499", color: "bg-white" },
                        { plan: "Agency", price: "$1,499", color: "bg-[#FF4D00]" },
                        { plan: "Custom", price: "Varies", color: "bg-[#CCFF00]" }
                    ].map((p, i) => (
                        <div key={i} className={cn("relative border-4 border-black p-12 flex flex-col justify-between shadow-[16px_16px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none transition-all hover:translate-x-4 hover:translate-y-4", p.color)}>
                            <div>
                                <h3 className="text-4xl font-black uppercase mb-2 text-black">{p.plan}</h3>
                                <div className="h-2 w-16 bg-black mb-8" />
                                <p className="text-7xl font-black tracking-tighter text-black">{p.price}</p>
                            </div>
                            <ul className="mt-12 mb-12 space-y-4 font-bold uppercase text-sm text-black">
                                <li>• Concept Strategy</li>
                                <li>• High-Voltage Design</li>
                                <li>• Turbo Development</li>
                            </ul>
                            <button className="w-full border-4 border-black bg-white py-4 text-xl font-black uppercase shadow-[8px_8px_0px_0px_#000] hover:bg-black hover:text-white transition-colors text-black hover:text-white">
                                Select Plan
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 12. CHARACTER REVEAL (Testimonial Big Block)
export function CharacterReveal() {
    const textRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        const text = textRef.current;
        if (!text) return;
        
        const content = text.innerText;
        const split = content.split("");
        text.innerHTML = "";
        split.forEach((char: string) => {
            const span = document.createElement("span");
            span.innerText = char;
            span.className = "char opacity-20 inline-block text-black";
            text.appendChild(span);
        });

        gsap.to(".char", {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
                trigger: text,
                start: "top 80%",
                end: "bottom 20%",
                scrub: true,
            }
        });
    }, []);

    return (
        <section className="bg-white py-48 border-b-8 border-black overflow-hidden text-black">
            <div className="container mx-auto px-6">
                <p ref={textRef} className="text-[5vw] font-black uppercase leading-none tracking-tighter text-black">
                   "CHAOS THEORY REDEFINED OUR ENTIRE DIGITAL PRESENCE. THEY DON'T JUST BUILD WEBSITES, THEY BUILD WEAPONS FOR THE ATTENTION ECONOMY."
                </p>
                <div className="mt-12 flex items-center gap-6">
                    <div className="h-16 w-16 rounded-full border-4 border-black bg-[#FF4D00]" />
                    <div>
                        <p className="text-2xl font-black uppercase text-black">Vince Carter</p>
                        <p className="font-bold text-gray-500 uppercase text-black">CEO, HyperDrive Inc.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

// 13. 3D TILT RECAP (Interactive Services)
export function TiltRecap() {
    return (
        <section className="bg-[#CCFF00] py-32 border-b-8 border-black overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#000_2px,transparent_2px)] bg-[size:20px_20px]" />
            <div className="container mx-auto px-6 relative z-10 text-black">
                <div className="flex flex-wrap gap-8 justify-center">
                    {[
                        { title: "Fast", color: "bg-[#FF4D00]" },
                        { title: "Brutalist", color: "bg-[#0047FF]" },
                        { title: "Direct", color: "bg-white" },
                        { title: "Vibrant", color: "bg-black" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.1, rotateY: 10, rotateX: 10 }}
                            className={cn("w-64 h-64 border-4 border-black p-12 flex items-center justify-center text-center shadow-[12px_12px_0px_0px_#000] cursor-pointer", item.color)}
                        >
                            <h3 className={cn("text-4xl font-black uppercase", item.title === 'Vibrant' ? 'text-white' : 'text-black')}>{item.title}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 14. BOLD NEWSLETTER (CTA Push)
export function Newsletter() {
    return (
        <section className="bg-[#0047FF] py-48 border-b-8 border-black text-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-[8vw] font-black leading-none uppercase mb-12">
                   JOIN THE <br /> <span className="bg-[#CCFF00] text-black px-4 italic">RESISTANCE</span>
                </h2>
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
                    <input 
                        type="text" 
                        placeholder="EMAIL ADDRESS"
                        className="flex-1 bg-white p-8 text-black text-3xl font-black border-4 border-black placeholder:text-gray-300 focus:outline-none"
                    />
                    <button className="bg-[#FF4D00] text-black p-8 text-3xl font-black border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:translate-y-2 hover:shadow-none transition-all uppercase whitespace-nowrap">
                        Sign Me Up!
                    </button>
                </div>
            </div>
        </section>
    );
}

// --- MAIN PAGE ---
export default function BrutalPage() {
    // Initialize Lenis Smooth Scroll
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        });

        // Synchronize Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return (
        <div className="bg-[#E0E0E0] text-[#1A1A1A] font-sans selection:bg-[#CCFF00] selection:text-black overflow-hidden">
            <Navbar />

            <main>
                {/* Initial Hero & Grid */}
                <Hero />
                <Marquee text="BREAK THE GRID" className="bg-[#CCFF00] -rotate-2 scale-105 z-20 border-black" direction={1} />
                <GridSection />
                
                {/* New Dynamic Sections */}
                <BentoGrid />
                <TickerTape />
                
                <Marquee text="PIXEL PERFECT" className="bg-[#0047FF] rotate-2 scale-105 z-20 border-black text-white" direction={-1} />
                <Services />
                
                <SplitInteractive />
                <FloatingStickers />
                
                <Pricing />
                <CharacterReveal />
                
                <TiltRecap />
                <Newsletter />
                
                <Footer />
            </main>
        </div>
    );
}
