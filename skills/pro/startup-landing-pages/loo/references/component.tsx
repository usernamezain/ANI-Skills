"use client";

import { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowUpRight, Terminal, Box, Hexagon, Zap, Layers, Activity, Plus, Quote, Cpu, Network, Database, Shield, Globe, Send } from "lucide-react";
import { cn } from "@/src/lib/utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- Components ---

// 1. Custom Cursor
export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: "power2.out",
            });
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        />
    );
};

// 2. Background Grid & Goo
export function BrutalistBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-zinc-950">
            {/* Dynamic Goo */}
            <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-lime-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-600/20 rounded-full blur-[120px]" />

            {/* Hard Grid Overlay */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-transparent to-zinc-950/90" />
        </div>
    );
};

// 3. Navbar
export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
            <div className="flex justify-between items-center px-6 py-4 max-w-[1920px] mx-auto">
                <div className="font-mono text-xl font-bold tracking-tighter text-white flex items-center gap-2">
                    <Hexagon className="fill-lime-400 text-black w-6 h-6" />
                    NEXUS_OS
                </div>
                <div className="hidden md:flex gap-8 font-mono text-sm text-zinc-400">
                    {["MODULES", "PROTOCOL", "PRICING", "MANIFESTO"].map((item) => (
                        <a key={item} href="#" className="hover:text-lime-400 transition-colors uppercase tracking-widest">
                            {item}
                        </a>
                    ))}
                </div>
                <button className="bg-white text-black px-6 py-2 font-mono font-bold hover:bg-lime-400 transition-colors text-sm uppercase">
                    Deploy [v2]
                </button>
            </div>
        </nav>
    );
};

// 4. Hero with GSAP Split Text
export function Hero() {
    const container = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(".hero-line", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out"
            })
                .from(".hero-sub", {
                    opacity: 0,
                    y: 20,
                    duration: 0.8
                }, "-=0.5")
                .from(".hero-btn", {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                }, "-=0.5");

        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="min-h-screen flex flex-col justify-center px-6 pt-24 relative overflow-hidden border-b border-white/10 text-white">
            <div className="max-w-[1920px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                <div className="lg:col-span-8 z-10">
                    <div className="overflow-hidden mb-2">
                        <h1 className="hero-line text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter leading-[0.9] uppercase">
                            Brutal<span className="text-lime-400">.</span>
                        </h1>
                    </div>
                    <div className="overflow-hidden mb-2">
                        <h1 className="hero-line text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600 leading-[0.9] uppercase">
                            Efficiency<span className="text-indigo-500">.</span>
                        </h1>
                    </div>
                    <div className="overflow-hidden mb-8">
                        <h1 className="hero-line text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter leading-[0.9] uppercase">
                            Scale Now<span className="text-pink-500">.</span>
                        </h1>
                    </div>

                    <p className="hero-sub text-zinc-400 font-mono text-lg max-w-xl mb-10 border-l-2 border-lime-400 pl-4">
            // The UI kit for engineers who hate UI kits. <br />
            // High performance, zero bloat, brutal aesthetics.
                    </p>

                    <div className="flex gap-4">
                        <button className="hero-btn group relative px-8 py-4 bg-lime-400 text-black font-bold font-mono uppercase overflow-hidden">
                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                            <span className="relative z-10 flex items-center gap-2">
                                Start Project <ArrowUpRight className="w-5 h-5" />
                            </span>
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-4 h-[400px] flex items-center justify-center perspective-1000">
                    <div className="cube-spinner relative w-40 h-40 transform-style-3d animate-[spin_10s_linear_infinite]">
                        <div className="absolute inset-0 bg-lime-400/20 border-2 border-lime-400 translate-z-[80px] backdrop-blur-sm flex items-center justify-center font-mono text-4xl font-bold text-lime-400">FE</div>
                        <div className="absolute inset-0 bg-indigo-500/20 border-2 border-indigo-500 -translate-z-[80px] backdrop-blur-sm" />
                        <div className="absolute inset-0 bg-pink-500/20 border-2 border-pink-500 rotate-y-90 translate-z-[80px] backdrop-blur-sm" />
                        <div className="absolute inset-0 bg-zinc-800/20 border-2 border-zinc-100 -rotate-y-90 translate-z-[80px] backdrop-blur-sm" />
                        <div className="absolute inset-0 bg-white/10 border-2 border-white rotate-x-90 translate-z-[80px] backdrop-blur-sm" />
                        <div className="absolute inset-0 bg-white/10 border-2 border-white -rotate-x-90 translate-z-[80px] backdrop-blur-sm" />
                    </div>
                </div>

            </div>
        </section>
    );
};

// 5. Infinite Marquee
export function Marquee() {
    const marqueeRef = useRef(null);

    useLayoutEffect(() => {
        gsap.to(marqueeRef.current, {
            xPercent: -50,
            ease: "none",
            duration: 10,
            repeat: -1,
        });
    }, []);

    return (
        <div className="w-full bg-lime-400 text-black overflow-hidden py-4 border-y border-black relative z-10">
            <div ref={marqueeRef} className="flex whitespace-nowrap gap-8 font-mono text-3xl font-bold uppercase tracking-tight">
                {Array(10).fill("SHIP FASTER • BREAK NOTHING • ").map((text, i) => (
                    <span key={i}>{text}</span>
                ))}
            </div>
        </div>
    );
};

// 6. Brutalist Bento Grid
export function BentoGrid() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".bento-item", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 px-6 max-w-[1920px] mx-auto text-white">
            <div className="mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end">
                <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">
                    System <span className="text-zinc-600">Modules</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[300px]">
                <div className="bento-item col-span-1 md:col-span-2 row-span-2 border border-white/20 bg-zinc-900/50 p-8 group hover:border-lime-400 transition-colors duration-300 relative overflow-hidden">
                    <Activity className="w-12 h-12 text-white mb-6" />
                    <h3 className="text-4xl font-bold mb-4 uppercase">Realtime Data</h3>
                    <p className="text-zinc-400 font-mono text-sm max-w-sm">Watch your metrics update in milliseconds.</p>
                </div>

                <div className="bento-item col-span-1 row-span-2 border border-white/20 bg-zinc-900/50 p-8 group hover:border-pink-500 transition-colors duration-300 relative overflow-hidden flex flex-col justify-between">
                    <Layers className="w-12 h-12 text-white" />
                    <div>
                        <h3 className="text-3xl font-bold mb-4 uppercase">Full Stack</h3>
                        <ul className="space-y-2 font-mono text-sm text-zinc-400">
                             <li className="py-2 border-b border-white/5">Next.js 14</li>
                             <li className="py-2 border-b border-white/5">React Server Components</li>
                             <li className="py-2 border-b border-white/5">Postgres</li>
                        </ul>
                    </div>
                </div>

                <div className="bento-item border border-white/20 bg-zinc-900/50 p-8 group hover:border-indigo-500 transition-colors duration-300 relative overflow-hidden">
                    <Zap className="w-8 h-8 text-white mb-4" />
                    <h3 className="text-xl font-bold uppercase">Lightning</h3>
                </div>

                <div className="bento-item border border-white/20 bg-zinc-900/50 p-8 group hover:border-orange-500 transition-colors duration-300 relative overflow-hidden">
                    <Terminal className="w-8 h-8 text-white mb-4" />
                    <h3 className="text-xl font-bold uppercase">CLI First</h3>
                </div>
            </div>
        </section>
    );
};

// 7. Workflow
export function Workflow() {
    const container = useRef<HTMLElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!container.current || !wrapper.current) return;
        const ctx = gsap.context(() => {
            gsap.set(wrapper.current, { x: 0 });
            const steps = gsap.utils.toArray<HTMLElement>(".process-step");
            if (steps.length === 0) return;
            const getScrollDistance = () => {
                if (!wrapper.current) return 0;
                return Math.max(0, wrapper.current.scrollWidth - window.innerWidth + (wrapper.current.offsetLeft || 0));
            };
            requestAnimationFrame(() => {
                gsap.to(wrapper.current, {
                    x: () => -getScrollDistance(),
                    ease: "none",
                    scrollTrigger: {
                        trigger: container.current,
                        pin: true,
                        scrub: 1,
                        snap: { snapTo: 1 / (steps.length - 1), duration: { min: 0.2, max: 0.6 }, delay: 0, inertia: false },
                        end: () => `+=${getScrollDistance() * 2}`,
                        invalidateOnRefresh: true,
                    }
                });
            });
        }, container);
        return () => ctx.revert();
    }, []);

    const steps = [
        { num: "01", title: "Initialize", desc: "Clone the repo." },
        { num: "02", title: "Configure", desc: "Set environment variables." },
        { num: "03", title: "Build", desc: "Run production build." },
        { num: "04", title: "Deploy", desc: "Push to main." },
    ];

    return (
        <section ref={container} className="h-screen bg-lime-400 text-black overflow-hidden relative">
            <div className="absolute top-10 left-10 font-mono text-xl font-bold uppercase z-10">[ Workflow Pipeline ]</div>
            <div ref={wrapper} className="flex h-full items-center pl-[10vw]">
                {steps.map((step, i) => (
                    <div key={i} className="process-step min-w-[80vw] md:min-w-[40vw] px-10 border-l border-black/20 flex-shrink-0">
                        <div className="text-[10rem] font-bold leading-none opacity-20">{step.num}</div>
                        <h3 className="text-6xl font-bold uppercase mb-6">{step.title}</h3>
                        <p className="font-mono text-xl max-w-md border-l-4 border-black pl-4">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// 8. Loo Pricing
export function LooPricing() {
    const tiers = [
        { name: "Node", price: "$0", desc: "For solo hackers.", features: ["1 Local instance", "Standard API", "Community forums"], color: "border-white/20" },
        { name: "Cluster", price: "$99", desc: "For growing teams.", features: ["Unlimited nodes", "Priority support", "Live metrics"], color: "border-lime-400/50 shadow-[0_0_20px_rgba(163,230,53,0.1)]", popular: true },
        { name: "Mainframe", price: "$499", desc: "For the elite.", features: ["Dedicated infra", "Custom protocol", "24/7 uplink"], color: "border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.1)]" },
    ];

    return (
        <section id="pricing" className="py-40 px-6 bg-zinc-950 text-white relative border-y border-white/10">
            <div className="max-w-[1920px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-32 border-b border-white/10 pb-12">
                     <h2 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter">Plan <span className="text-zinc-600">Select</span></h2>
                     <p className="font-mono text-zinc-500 mb-4">[ ACCESS_TIERS: 03 ]</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((t, i) => (
                        <div key={i} className={cn("p-12 bg-zinc-900/50 border flex flex-col group transition-all duration-500 hover:bg-zinc-900", t.color)}>
                            <div className="flex justify-between items-start mb-8">
                                <h3 className="text-3xl font-bold uppercase">{t.name}</h3>
                                {t.popular && <div className="bg-lime-400 text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Recommended</div>}
                            </div>
                            <div className="text-7xl font-bold mb-4 tracking-tighter">{t.price}</div>
                            <p className="font-mono text-zinc-500 text-sm mb-12 border-l-2 border-zinc-800 pl-4">{t.desc}</p>
                            <ul className="space-y-6 mb-16 flex-1">
                                {t.features.map(f => (
                                    <li key={f} className="font-mono text-sm flex items-center gap-3 text-zinc-400 group-hover:text-white transition-colors">
                                        <div className="w-1 h-1 bg-lime-400 group-hover:w-4 transition-all" /> {f}
                                    </li>
                                ))}
                            </ul>
                            <button className={cn("w-full py-6 font-mono font-bold uppercase transition-all", t.popular ? "bg-lime-400 text-black hover:bg-white" : "border border-zinc-700 hover:border-white")}>Initialize Tier</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 9. Loo Team
export function LooTeam() {
    const staff = [
        { name: "A. V0id", role: "Core Architect", img: "https://api.dicebear.com/7.x/pixel-art/svg?seed=v0id" },
        { name: "S. Sync", role: "Protocol Lead", img: "https://api.dicebear.com/7.x/pixel-art/svg?seed=sync" },
        { name: "M. Mesh", role: "Security Eng", img: "https://api.dicebear.com/7.x/pixel-art/svg?seed=mesh" },
        { name: "K. Kernel", role: "UX Strategist", img: "https://api.dicebear.com/7.x/pixel-art/svg?seed=kernel" },
    ];

    return (
        <section className="py-40 bg-zinc-950 border-b border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,_rgba(163,230,53,0.05)_0%,_transparent_50%)]" />
            <div className="max-w-[1920px] mx-auto px-6">
                <h2 className="text-center text-4xl md:text-6xl font-black uppercase mb-32 tracking-tight text-white">[ THE_COUNCIL ]</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {staff.map((s, i) => (
                        <div key={i} className="group relative aspect-[4/5] border border-white/10 bg-zinc-900/30 overflow-hidden">
                            <img src={s.img} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <h3 className="text-xl font-bold text-white uppercase group-hover:text-lime-400 transition-colors">{s.name}</h3>
                                <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em] mt-1">{s.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 10. Loo Stats
export function LooStats() {
    const stats = [
        { label: "Uptime", val: "99.99%", desc: "Downtime is a myth." },
        { label: "Latenci", val: " < 12ms", desc: "Faster than thought." },
        { label: "Assets", val: "2.8TB", desc: "Data in motion." },
        { label: "Nodes", val: "14.2k", color: "text-lime-400" }
    ];

    return (
        <section className="py-20 bg-zinc-900/50 border-b border-white/10">
            <div className="max-w-[1920px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/10 overflow-hidden">
                {stats.map((s, i) => (
                    <div key={i} className="bg-zinc-950 p-12 flex flex-col items-center text-center group transition-colors hover:bg-zinc-900/80">
                         <div className={cn("text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-white", s.color)}>{s.val}</div>
                         <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">_{s.label}</div>
                         <p className="text-[10px] font-mono text-zinc-700 opacity-0 group-hover:opacity-100 transition-all">{s.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

// 11. Loo FAQ
export function LooFAQ() {
    const [open, setOpen] = useState(0);
    const items = [
        { q: "Is Nexus scalable?", a: "Horizontal autoscaling comes built-in. Your app grows, we spawn nodes. Simple as that." },
        { q: "Security protocol?", a: "E2E encryption across all internal modules. SOC2 Type II by default. Secure by design." },
        { q: "Migration support?", a: "We have scripts for almost every legacy framework. Type 'nexus migrate' to begin." }
    ];

    return (
        <section className="py-40 px-6 bg-zinc-950 text-white">
             <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-20">
                     <div className="w-12 h-1 px-1 bg-lime-400" />
                     <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">Query <span className="text-zinc-600">Console</span></h2>
                </div>
                <div className="space-y-4">
                    {items.map((it, i) => (
                        <div key={i} className="border border-white/10 bg-zinc-900/30 overflow-hidden group">
                            <button 
                                onClick={() => setOpen(open === i ? -1 : i)}
                                className={cn("w-full p-8 flex justify-between items-center text-left transition-colors", open === i ? "bg-white/5" : "hover:bg-white/2")}
                            >
                                <span className={cn("text-xl font-bold uppercase tracking-tight", open === i ? "text-lime-400" : "text-zinc-300")}>[ {it.q} ]</span>
                                <Plus className={cn("w-6 h-6 transition-transform duration-500", open === i ? "rotate-45 text-lime-400" : "rotate-0 text-zinc-500")} />
                            </button>
                            {open === i && (
                                <div className="p-8 border-t border-white/5 animate-in slide-in-from-top-2 duration-300">
                                    <p className="font-mono text-zinc-400 text-lg leading-relaxed"><span className="text-lime-400 font-bold mr-2">&gt;</span> {it.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
             </div>
        </section>
    );
}

// 12. Loo Integrations
export function LooIntegrations() {
    const tools = [
        { name: "CORE_I", icon: Cpu },
        { label: "MESH_N", icon: Network },
        { label: "DATA_D", icon: Database },
        { label: "PROT_S", icon: Shield },
        { label: "GLOB_G", icon: Globe }
    ];
    return (
        <section className="py-32 bg-zinc-950 border-t border-white/10 overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="flex items-center gap-12 mx-12 text-zinc-600 group cursor-default">
                        <Terminal size={16} className="text-lime-400 group-hover:scale-125 transition-transform" />
                        <span className="text-2xl font-mono font-bold group-hover:text-white transition-colors">{tools[i % tools.length].name || tools[i % tools.length].label || "PROC_X"}</span>
                        <div className="w-24 h-px bg-white/10 group-hover:bg-lime-400/50 transition-colors" />
                    </div>
                ))}
            </div>
            <style jsx>{`
                .animate-marquee { animation: scroll 30s linear infinite; }
                @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            `}</style>
        </section>
    );
}

// 13. Loo Testimonials
export function LooTestimonials() {
    const logs = [
        { user: "dev.user_01", text: "Nexus changed our deployment time from minutes to milliseconds. Unreal.", time: "12:04:11" },
        { user: "cto.admin", text: "Finally, a system that doesn't feel like a black box. Pure transparency.", time: "09:44:28" },
        { user: "senior.eng_99", text: " The bento grid implementation is the best I've ever used. Clean code.", time: "23:11:59" },
    ];

    return (
        <section className="py-40 bg-zinc-950 border-t border-white/10 px-6">
            <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {logs.map((log, i) => (
                    <div key={i} className="p-8 bg-zinc-900/50 border border-white/10 relative group hover:border-lime-400/50 transition-all">
                        <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/5">
                             <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{log.user}</div>
                             <div className="text-[10px] font-mono text-zinc-700">{log.time}</div>
                        </div>
                        <Quote className="w-12 h-12 text-zinc-800 absolute top-12 right-8 group-hover:text-lime-400/10 transition-colors" />
                        <p className="text-2xl font-bold text-white uppercase tracking-tight leading-snug mb-8">"{log.text}"</p>
                        <div className="flex gap-1">
                             {[...Array(5)].map((_, j) => <div key={j} className="w-1 h-1 bg-lime-400" />)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// 14. Loo Newsletter
export function LooNewsletter() {
    return (
        <section className="py-40 px-6 bg-lime-400 text-black overflow-hidden relative border-y border-black">
            <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <div>
                     <h2 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-[0.8] mb-8">Access<br />Request.</h2>
                     <p className="font-mono text-xl max-w-md border-l-4 border-black pl-6">Initialize subscription to receive system updates and alpha modules directly in your console.</p>
                </div>
                <div className="relative group">
                    <div className="absolute inset-0 bg-black/5 -translate-x-2 translate-y-2 group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform pb-2 pr-2" />
                    <div className="relative bg-zinc-950 p-8 md:p-12 flex flex-col gap-6 border-2 border-black">
                        <div className="font-mono text-xs text-zinc-600 mb-4 tracking-widest uppercase">Input Email Address_</div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input type="email" placeholder="USER@NEXUS_OS.SH" className="flex-1 bg-zinc-900 border border-white/10 p-5 font-mono text-white focus:outline-none focus:border-lime-400 placeholder:text-zinc-700" />
                            <button className="bg-lime-400 text-black px-10 py-5 font-bold uppercase text-sm hover:bg-white transition-colors flex items-center justify-center gap-2">
                                SUBMIT <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// 15. Footer
export function Footer() {
    return (
        <footer className="bg-zinc-950 pt-20 pb-10 px-6 border-t border-white/10 text-white">
            <div className="max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
                    <h2 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-[0.8]">
                        Let's <br /> <span className="text-lime-400">Build.</span>
                    </h2>
                    <div className="flex flex-col justify-end items-start md:items-end font-mono text-zinc-400">
                        <a href="#" className="text-xl hover:text-white hover:underline decoration-lime-400 underline-offset-4">hello@nexus-os.com</a>
                        <p className="mt-4">San Francisco, CA</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-8 font-mono text-xs text-zinc-600 uppercase">
                    <div className="flex gap-4 mb-4 md:mb-0">
                        <a href="#" className="hover:text-white">Github</a>
                        <a href="#" className="hover:text-white">Twitter</a>
                        <a href="#" className="hover:text-white">Discord</a>
                    </div>
                    <div>© 2024 Nexus OS. Brutally efficient.</div>
                </div>
            </div>
        </footer>
    );
}

export default function LooPage() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        }
    }, []);

    return (
        <main className="bg-zinc-950 min-h-screen text-zinc-100 selection:bg-lime-400 selection:text-black cursor-none">
            <CustomCursor />
            <BrutalistBackground />
            <Navbar />

            <Hero />
            <Marquee />
            <BentoGrid />
            <Workflow />
            
            <LooStats />
            <LooPricing />
            <LooTeam />
            <LooIntegrations />
            <LooFAQ />
            <LooTestimonials />
            <LooNewsletter />
            
            <Footer />
        </main>
    );
}
