"use client";

import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
    ArrowRight,
    MoveUpRight,
    Circle,
    Hexagon,
    Triangle,
    Zap,
    Layers,
    Box,
    Menu,
    X,
    Plus,
    Minus,
    Star,
    Check,
    Send,
    Instagram,
    Github,
    Twitter
} from "lucide-react";
import { cn } from "@/src/lib/utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function MagneticButton({ children, className, ...props }: any) {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = e.clientX - (left + width / 2);
            const y = e.clientY - (top + height / 2);

            gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power3.out" });
            gsap.to(el.children, { x: x * 0.1, y: y * 0.1, duration: 0.5, ease: "power3.out" });
        };

        const handleMouseLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
            gsap.to(el.children, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <button ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
            <div className="relative z-10 pointer-events-none">{children}</div>
        </button>
    );
};

export function ParallaxImage({ src, speed = 1, className }: { src: string, speed?: number, className?: string }) {
    const container = useRef(null);
    const img = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(img.current,
                { y: "-20%" },
                {
                    y: "20%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                }
            );

            ScrollTrigger.create({
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                onUpdate: (self) => {
                    const skew = self.getVelocity() / 300;
                    gsap.to(container.current, { skewY: skew, duration: 0.5, ease: "power3.out", overwrite: true });
                }
            });

        }, container);
        return () => ctx.revert();
    }, [speed]);

    return (
        <div ref={container} className={cn("overflow-hidden relative will-change-transform", className)}>
            <img
                ref={img}
                src={src}
                alt="Parallax"
                className="w-full h-[140%] object-cover absolute top-[-20%] left-0 will-change-transform grayscale hover:grayscale-0 transition-all duration-500"
            />
        </div>
    );
};

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 mix-blend-difference text-white">
            <div className="font-bold text-2xl tracking-tighter uppercase font-mono">
                KINETIC<span className="text-lime-400">.VOID</span>
            </div>
            <MagneticButton className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black transition-colors uppercase font-mono text-sm font-bold">
                Menu <Menu className="w-4 h-4" />
            </MagneticButton>
        </nav>
    );
};

export function Hero() {
    const container = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".layer-bg", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            gsap.to(".layer-text", {
                yPercent: 50,
                opacity: 0,
                scale: 0.9,
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            gsap.to(".layer-shape", {
                yPercent: -50,
                rotate: 90,
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
        <section ref={container} className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">

            <div className="layer-bg absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px]"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-lime-400 opacity-20 blur-[100px]"></div>
                <div className="absolute right-0 bottom-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-blue-600 opacity-20 blur-[120px]"></div>
            </div>

            <div className="layer-shape absolute top-[20%] left-[15%] text-zinc-800 opacity-50">
                <Circle size={120} strokeWidth={1} />
            </div>
            <div className="layer-shape absolute bottom-[20%] right-[15%] text-zinc-800 opacity-50">
                <Hexagon size={180} strokeWidth={1} />
            </div>

            <div className="layer-text relative z-10 text-center mix-blend-difference px-4">
                <h1 className="text-[12vw] md:text-[10vw] font-black uppercase leading-[0.85] tracking-tighter text-white">
                    Reality <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">Distortion</span>
                </h1>
                <p className="mt-8 text-xl md:text-2xl font-mono text-zinc-400 max-w-xl mx-auto">
                    The agency that bends pixels. <br />
                    We build immersive digital gravity wells.
                </p>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-xs font-mono animate-bounce">
                [ SCROLL TO ENTER VOID ]
            </div>
        </section>
    );
};

export function ParallaxGallery() {
    const container = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".col-1", {
                y: -150,
                ease: "none",
                scrollTrigger: { trigger: container.current, scrub: true }
            });
            gsap.fromTo(".col-2",
                { y: -150 },
                { y: 150, ease: "none", scrollTrigger: { trigger: container.current, scrub: true } }
            );
            gsap.to(".col-3", {
                y: -100,
                ease: "none",
                scrollTrigger: { trigger: container.current, scrub: true }
            });
        }, container);
        return () => ctx.revert();
    }, []);

    const images = [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop"
    ];

    return (
        <section ref={container} className="min-h-screen bg-zinc-950 py-32 px-4 overflow-hidden">
            <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 h-[120vh]">

                <div className="col-1 flex flex-col gap-8 pt-20">
                    <div className="p-8 border-t border-white/20 text-white font-mono">
                        <h3 className="text-4xl font-bold uppercase mb-4">Depth.</h3>
                        <p className="text-zinc-500">We create layers of meaning in a flat world.</p>
                    </div>
                    <ParallaxImage src={images[0]} className="h-[60vh] w-full" />
                    <ParallaxImage src={images[1]} className="h-[40vh] w-full" />
                </div>

                <div className="col-2 flex flex-col gap-8 -mt-20">
                    <ParallaxImage src={images[2]} className="h-[50vh] w-full" />
                    <div className="p-8 bg-zinc-900 text-white border border-white/10 text-center flex flex-col justify-center h-[30vh]">
                        <Zap className="w-12 h-12 text-lime-400 mx-auto mb-4" />
                        <h3 className="text-3xl font-bold uppercase">Energy.</h3>
                    </div>
                    <ParallaxImage src={images[3]} className="h-[60vh] w-full" />
                </div>

                <div className="col-3 flex flex-col gap-8 pt-40">
                    <ParallaxImage src={images[4]} className="h-[40vh] w-full" />
                    <div className="p-8 border-b border-white/20 text-right text-white font-mono">
                        <h3 className="text-4xl font-bold uppercase mb-4">Motion.</h3>
                        <p className="text-zinc-500">Static websites are dead. Long live kinetic UI.</p>
                    </div>
                    <ParallaxImage src={images[5]} className="h-[50vh] w-full" />
                </div>
            </div>
        </section>
    );
};

export function CrazyMarquee() {
    return (
        <div className="relative py-32 bg-lime-400 overflow-hidden -skew-y-3 origin-center z-10">
            <div className="animate-marquee whitespace-nowrap flex gap-20 font-black text-[15vh] text-black uppercase leading-none">
                {Array(6).fill("NO LIMITS • PURE CHAOS • ").map((t, i) => (
                    <span key={i}>{t}</span>
                ))}
            </div>
            <style jsx>{`
                .animate-marquee { animation: marquee 20s linear infinite; }
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            `}</style>
        </div>
    );
};

export function KineticPricing() {
    const plans = [
        { name: "Draft", price: "$0", color: "bg-zinc-900" },
        { name: "Velocity", price: "$49", color: "bg-blue-600", popular: true },
        { name: "Void", price: "$99", color: "bg-white text-black" },
    ];

    return (
        <section className="py-40 px-6 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-[10vw] font-black uppercase leading-none mb-32 mix-blend-difference text-white">
                    COST<span className="text-lime-400">.VOID</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1 w-full border border-white/10">
                    {plans.map((p, i) => (
                        <div key={i} className={cn(
                            "group relative p-16 flex flex-col justify-between aspect-[3/4] transition-all duration-700 hover:bg-lime-400 hover:text-black",
                            p.color,
                            i !== 2 ? "border-r border-white/10" : ""
                        )}>
                            <div>
                                <h3 className="text-4xl font-black uppercase mb-4 tracking-tighter">{p.name}</h3>
                                <div className="text-6xl font-black mb-12">{p.price}</div>
                                <ul className="space-y-4 font-mono text-sm uppercase opacity-60 group-hover:opacity-100">
                                    <li className="flex items-center gap-2">/ Kinetic Support</li>
                                    <li className="flex items-center gap-2">/ Void Access</li>
                                    <li className="flex items-center gap-2">/ Priority Motion</li>
                                </ul>
                            </div>
                            <MagneticButton className="w-full py-6 border border-current font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                                Select Plan
                            </MagneticButton>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function VoidProcess() {
    const steps = [
        { title: "Distortion", desc: "We map the existing digital landscape and find the cracks." },
        { title: "Kinetics", desc: "Motion prototypes that define the physics of the brand." },
        { title: "Materialization", desc: "High-fidelity build with edge-optimized performance." },
    ];

    return (
        <section className="py-40 px-6 bg-black text-white relative">
            <div className="max-w-5xl mx-auto">
                <div className="space-y-40">
                    {steps.map((s, i) => (
                        <div key={i} className="group relative flex flex-col md:flex-row gap-20 items-end">
                            <div className="text-[15vw] font-black leading-none opacity-10 group-hover:opacity-100 transition-opacity duration-700">0{i+1}</div>
                            <div className="pb-10 border-b border-white/20 flex-1">
                                <h3 className="text-6xl md:text-8xl font-black uppercase mb-8 tracking-tighter">{s.title}</h3>
                                <p className="max-w-md font-mono text-zinc-500 uppercase leading-relaxed">{s.desc}</p>
                            </div>
                            <div className="hidden md:block w-32 h-32 bg-lime-400 rounded-full group-hover:scale-150 transition-transform duration-700 mix-blend-difference" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function TeamVoid() {
    const team = [
        { name: "K. Alpha", role: "Void Architect", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Alpha" },
        { name: "K. Beta", role: "Motion Designer", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Beta" },
        { name: "K. Gamma", role: "Dev Gravity", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Gamma" },
    ];

    return (
        <section className="py-40 px-6 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-8">
                    <h2 className="text-7xl md:text-9xl font-black uppercase leading-none text-white">TEAM<span className="text-zinc-800">.VOID</span></h2>
                    <p className="max-w-xs font-mono text-zinc-500 text-sm uppercase">[ COLLECTIVE OF PIXEL BENDERS ]</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
                    {team.map((t, i) => (
                        <div key={i} className="group relative aspect-[3/4] bg-black overflow-hidden hover:bg-zinc-900 transition-colors">
                            <img src={t.img} className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt={t.name} />
                            <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black to-transparent">
                                <h3 className="text-4xl font-black text-white uppercase">{t.name}</h3>
                                <p className="text-lime-400 font-mono text-sm uppercase mt-2">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function StaticFAQ() {
    const [open, setOpen] = useState(0);
    const faqs = [
        { q: "WHY KINETIC?", a: "Static is forgettable. We believe motion is the primary driver of emotional connection in digital products." },
        { q: "WHAT IS THE VOID?", a: "The Void is our internal design laboratory where we test physics-based UI and reality distortion effects." },
        { q: "HOW FAST?", a: "Sub-second load times. We use edge-delivery and highly optimized canvas/webgl layers." }
    ];

    return (
        <section className="py-40 px-6 bg-black">
            <div className="max-w-4xl mx-auto">
                <div className="space-y-2">
                    {faqs.map((f, i) => (
                        <div key={i} className="border-b border-white/10">
                            <button 
                                onClick={() => setOpen(open === i ? -1 : i)}
                                className="w-full py-12 flex justify-between items-center text-left group"
                            >
                                <span className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter group-hover:text-lime-400 transition-colors">
                                    {f.q}
                                </span>
                                {open === i ? <Minus className="text-lime-400" /> : <Plus className="text-white" />}
                            </button>
                            <div className={cn(
                                "overflow-hidden transition-all duration-500 ease-in-out",
                                open === i ? "max-h-64 pb-12" : "max-h-0"
                            )}>
                                <p className="text-xl font-mono text-zinc-500 uppercase leading-relaxed max-w-2xl italic">
                                    {f.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function KineticMetrics() {
    const metrics = [
        { val: "120", label: "FPS RANGE" },
        { val: "0.0", label: "FRICTION" },
        { val: "30+", label: "AWARDS" }
    ];

    return (
        <section className="py-40 bg-zinc-950 border-y border-white/10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-20">
                {metrics.map((m, i) => (
                    <div key={i} className="flex flex-col items-center group">
                        <div className="text-9xl font-black text-white mb-4 group-hover:skew-x-12 transition-transform duration-500">{m.val}</div>
                        <div className="font-mono text-lime-400 text-sm tracking-[0.5em] font-bold uppercase">{m.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function StickyFeatures() {
    const container = useRef(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, i) => {
                gsap.fromTo(card,
                    { scale: 0.8, y: 100 * (i + 1), opacity: 0 },
                    {
                        scale: 1 - (i * 0.05),
                        y: 0,
                        opacity: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom-=100",
                            end: "top center",
                            scrub: 1
                        }
                    }
                );
            });
        }, container);
        return () => ctx.revert();
    }, []);

    const features = [
        { title: "Velocity", icon: MoveUpRight, color: "bg-blue-600" },
        { title: "Gravity", icon: Box, color: "bg-zinc-800" },
        { title: "Friction", icon: Layers, color: "bg-white text-black" },
    ];

    return (
        <section ref={container} className="py-40 bg-black text-white px-6">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-6xl md:text-8xl font-black mb-32 text-center text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-blue-500">
                    THE STACK
                </h2>

                <div className="relative space-y-32">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            ref={el => { if (el) cardsRef.current[i] = el }}
                            className={cn(
                                "sticky top-32 w-full aspect-video rounded-3xl p-12 flex flex-col justify-between shadow-2xl border border-white/10",
                                f.color
                            )}
                        >
                            <div className="flex justify-between items-start">
                                <f.icon className="w-20 h-20 opacity-50" />
                                <span className="text-9xl font-black opacity-20">{i + 1}</span>
                            </div>
                            <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">{f.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export function KineticClients() {
    const clients = ["NEXUS", "AETHER", "CORE", "SYNX", "VOID", "GRAVITY"];
    return (
        <section className="py-20 bg-black border-y border-white/5 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-20 mx-10">
                        {clients.map(c => (
                            <span key={c} className="text-4xl md:text-6xl font-black text-white/20 hover:text-white transition-colors cursor-default uppercase font-mono tracking-widest">{c}</span>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}

export function KineticNewsletter() {
    return (
        <section className="py-40 px-6 bg-zinc-950 flex items-center justify-center">
            <div className="max-w-4xl w-full text-center">
                 <h2 className="text-5xl md:text-8xl font-black uppercase mb-12 tracking-tighter">Enter The <span className="text-lime-400">Stream.</span></h2>
                 <div className="relative group max-w-2xl mx-auto">
                    <input type="email" placeholder="EMAIL@VOID.SH" className="w-full bg-black border-b-2 border-white/20 p-8 font-mono text-2xl text-white focus:outline-none focus:border-lime-400 transition-colors placeholder:text-zinc-800" />
                    <button className="absolute right-0 bottom-0 p-8 text-lime-400 hover:text-white transition-colors">
                        <Send size={32} />
                    </button>
                 </div>
                 <div className="flex justify-center gap-12 mt-20 text-zinc-600">
                    <a href="#" className="hover:text-white transition-colors"><Instagram /></a>
                    <a href="#" className="hover:text-white transition-colors"><Github /></a>
                    <a href="#" className="hover:text-white transition-colors"><Twitter /></a>
                 </div>
            </div>
        </section>
    );
}

export function Footer() {
    return (
        <div className="relative h-[80vh]" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
            <div className="fixed bottom-0 h-[80vh] w-full bg-zinc-900 flex flex-col justify-center items-center -z-10">
                <h2 className="text-[15vw] font-black text-zinc-800 leading-none">END.</h2>
                <div className="flex gap-8 mt-10">
                    <MagneticButton className="px-8 py-4 bg-lime-400 text-black font-bold rounded-full hover:bg-white transition-colors">
                        START PROJECT
                    </MagneticButton>
                </div>
                <div className="absolute bottom-10 text-zinc-600 font-mono text-xs">
                    © 2024 KINETIC VOID INC.
                </div>
            </div>
        </div>
    );
};

export default function KineticPage() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    const cursor = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    return (
        <main className="bg-black min-h-screen text-white selection:bg-lime-400 selection:text-black cursor-none">

            <div ref={cursor} className="fixed top-0 left-0 w-8 h-8 border-2 border-lime-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center mix-blend-difference">
                <div className="w-1 h-1 bg-lime-400 rounded-full" />
            </div>

            <Navbar />
            <Hero />
            <KineticMetrics />
            <ParallaxGallery />
            <VoidProcess />
            <CrazyMarquee />
            <StickyFeatures />
            <TeamVoid />
            <KineticPricing />
            <StaticFAQ />
            <KineticClients />
            <KineticNewsletter />
            <Footer />
        </main>
    );
}
