"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
    MotionValue,
} from "framer-motion";
import Lenis from "lenis";
import { ArrowUpRight, Plus, Minus, Search } from "lucide-react";
import { cn } from "@/src/lib/utils"

// --- DATA ---
export const COLUMN_1 = [
    { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop", title: "Raw Portrait", height: "h-[400px]" },
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop", title: "Yosemite Mist", height: "h-[600px]" },
    { src: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1000&auto=format&fit=crop", title: "Warm Knit", height: "h-[450px]" },
];
export const COLUMN_2 = [
    { src: "https://images.unsplash.com/photo-1605517021366-1b0393fdb50a?q=80&w=764&auto=format&fit=crop", title: "Dark Nebula", height: "h-[500px]" },
    { src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop", title: "Open Fields", height: "h-[400px]" },
    { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop", title: "Ocean Calm", height: "h-[600px]" },
];
export const COLUMN_3 = [
    { src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1000&auto=format&fit=crop", title: "Alpine Lake", height: "h-[450px]" },
    { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop", title: "Night Sky", height: "h-[550px]" },
    { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1000&auto=format&fit=crop", title: "Forest Path", height: "h-[400px]" },
];

// --- COMPONENTS ---

// 1. Lenis Wrapper (Smooth Scroll)
export function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            lerp: 0.1,
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return <>{children}</>;
}

// 2. Navigation
export function Header() {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference text-white"
        >
            <div className="font-serif text-2xl tracking-widest text-white">ARCHIVE.</div>
            <div className="hidden items-center gap-8 md:flex">
                {["Index", "Curated", "About"].map((item) => (
                    <a key={item} href="#" className="text-sm uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item}
                    </a>
                ))}
            </div>
            <div className="flex items-center gap-4">
                <Search size={20} className="cursor-pointer" />
                <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
            </div>
        </motion.header>
    );
}

// 3. Magnetic Button
export function MagneticButton({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.2);
        y.set((clientY - centerY) * 0.2);
    }

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            className="group relative flex items-center justify-center rounded-full border border-white/20 px-8 py-4 uppercase tracking-widest text-white transition-colors hover:border-white/50 hover:bg-white/5"
        >
            {children}
        </motion.button>
    )
}

// 4. Parallax Image Card
export function ImageCard({ data, i }: { data: any; i: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className={cn("group relative w-full overflow-hidden mb-8 grayscale hover:grayscale-0 transition-all duration-700 ease-in-out cursor-none", data.height)}
        >
            <motion.img
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7 }}
                src={data.src}
                alt={data.title}
                className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 w-full p-6 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                <div className="flex items-center justify-between border-t border-white/50 pt-4">
                    <span className="font-serif text-xl italic text-white">{data.title}</span>
                    <ArrowUpRight className="text-white" size={20} />
                </div>
            </div>
        </motion.div>
    );
};

// 5. Hero Section
export function Hero() {
    return (
        <section className="relative flex h-[80vh] flex-col justify-end px-8 pb-20 pt-32">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="max-w-[90vw]"
            >
                <h1 className="font-serif text-[clamp(4rem,10vw,12rem)] leading-[0.85] text-white">
                    VISUAL <br />
                    <span className="ml-[10vw] italic text-neutral-500">POETRY</span>
                </h1>
            </motion.div>

            <div className="mt-12 flex w-full items-end justify-between border-b border-white/20 pb-8">
                <p className="max-w-md text-sm uppercase leading-relaxed tracking-widest text-neutral-400">
                    A curated collection of moments frozen in time. Exploring the relationship between nature, light, and the human condition.
                </p>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                    <div className="h-24 w-24 rounded-full border border-dashed border-white/30 p-2">
                        <div className="h-full w-full rounded-full bg-neutral-800" />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

// 6. The Masonry Grid (Main Feature)
export function MasonryGrid() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section ref={container} className="min-h-screen px-4 md:px-8">
            <div className="flex flex-col gap-8 md:flex-row">
                <motion.div style={{ y: y1 }} className="flex w-full flex-col gap-8 md:w-1/3">
                    <div className="mb-8 border-b border-neutral-800 pb-2 text-xs uppercase tracking-widest text-neutral-500">01 — Nature</div>
                    {COLUMN_1.map((img, i) => <ImageCard key={i} data={img} i={i} />)}
                </motion.div>

                <motion.div style={{ y: y2 }} className="flex w-full flex-col gap-8 md:-mt-24 md:w-1/3">
                    <div className="mb-8 border-b border-neutral-800 pb-2 text-xs uppercase tracking-widest text-neutral-500">02 — Abstract</div>
                    {COLUMN_2.map((img, i) => <ImageCard key={i} data={img} i={i} />)}
                    <div className="flex h-[400px] items-center justify-center bg-neutral-900 text-center">
                        <div>
                            <h3 className="font-serif text-3xl text-neutral-400">"Form follows <br /> <span className="text-white italic">Motion</span>"</h3>
                        </div>
                    </div>
                </motion.div>

                <motion.div style={{ y: y3 }} className="flex w-full flex-col gap-8 md:w-1/3">
                    <div className="mb-8 border-b border-neutral-800 pb-2 text-xs uppercase tracking-widest text-neutral-500">03 — Life</div>
                    {COLUMN_3.map((img, i) => <ImageCard key={i} data={img} i={i} />)}
                </motion.div>
            </div>
        </section>
    )
}

// 7. Expandable Footer (Accordion Style)
export function Footer() {
    const [open, setOpen] = useState(false);

    return (
        <footer className="relative z-10 bg-white text-black transition-colors duration-500">
            <div
                onClick={() => setOpen(!open)}
                className="flex cursor-pointer items-center justify-between border-b border-black/10 px-8 py-12 hover:bg-neutral-100"
            >
                <h2 className="font-serif text-6xl md:text-8xl">Contact</h2>
                <div className="rounded-full border border-black/20 p-4 transition-transform duration-300" style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>
                    <Plus size={32} />
                </div>
            </div>

            <motion.div
                initial={false}
                animate={{ height: open ? "auto" : 0 }}
                className="overflow-hidden bg-black text-white"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-8 py-24">
                    <div>
                        <p className="mb-8 text-2xl font-light text-neutral-400">Available for freelance work and collaborations. Let's create something timeless.</p>
                        <MagneticButton>Send Email</MagneticButton>
                    </div>
                    <div className="flex flex-col gap-4 text-sm uppercase tracking-widest text-neutral-500">
                        <a href="#" className="hover:text-white">Instagram</a>
                        <a href="#" className="hover:text-white">Twitter / X</a>
                        <a href="#" className="hover:text-white">Awwwards</a>
                        <a href="#" className="hover:text-white">LinkedIn</a>
                    </div>
                </div>
                <div className="px-8 pb-8">
                    <span className="text-[12rem] font-bold leading-none text-neutral-900">END.</span>
                </div>
            </motion.div>
        </footer>
    );
}

// 8. Horizontal Scroll Section (Curated Collections)
export function HorizontalScroll() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

    const projects = [
        { name: "Nordic Winter", category: "Nature", src: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80" },
        { name: "Urban Decay", category: "Architecture", src: "https://images.unsplash.com/photo-1453989799106-bbad8d7b5191?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXJiYW4lMjBkZWNheXxlbnwwfHwwfHx8MA%3D%3D" },
        { name: "Ethereal Bloom", category: "Macro", src: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80" },
        { name: "Shadow Play", category: "Abstract", src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80" },
    ];

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-black">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-12 px-8">
                    {projects.map((project, i) => (
                        <div key={i} className="group relative h-[60vh] w-[400px] flex-shrink-0 md:w-[600px]">
                            <img src={project.src} className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" alt="" />
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black from-0% to-transparent to-50% p-12 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                <span className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-neutral-400">{project.category}</span>
                                <h3 className="font-serif text-5xl italic text-white">{project.name}</h3>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// 9. Philosophy Section (Uilora Focus)
export function Philosophy() {
    return (
        <section className="bg-white py-48 text-black">
            <div className="container mx-auto px-8">
                <div className="mb-24 flex items-center justify-between border-b border-black/10 pb-8">
                    <span className="font-mono text-xs uppercase tracking-widest">Philosophy</span>
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">/// ARCHIVE_04</span>
                </div>
                <div className="max-w-6xl">
                    <h2 className="font-serif text-[clamp(2.5rem,6vw,8rem)] font-light leading-[1.1] tracking-tighter">
                        We believe in <span className="italic text-black">Uilora</span> — the pursuit of digital resonance. Where <span className="text-neutral-400">minimalism</span> meets <span className="italic">extraordinary</span> detail.
                    </h2>
                </div>
                <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-24">
                    <div className="flex flex-col justify-center">
                        <p className="max-w-md text-xl font-light leading-relaxed text-neutral-600">
                            Our architecture is designed to breathe. We prioritize the white space as much as the content, ensuring every interaction feels deliberate and weighted.
                        </p>
                    </div>
                    <div className="relative">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="aspect-[4/5] overflow-hidden rounded-sm"
                        >
                            <img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80" className="h-full w-full object-cover" alt="" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// 10. Sticky Reveal Section
export function StickyReveal() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.5]);

    return (
        <section ref={container} className="relative h-[200vh]">
            <div className="sticky top-0 h-screen overflow-hidden">
                <motion.div style={{ scale, opacity }} className="absolute inset-0">
                    <img src="https://plus.unsplash.com/premium_photo-1678189496886-0e568e51601b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmVvJTIwYnJ1dGFsaXNtfGVufDB8fDB8fHww" className="h-full w-full object-cover grayscale brightness-50" alt="" />
                </motion.div>
                <div className="relative z-10 flex h-full items-center justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <span className="mb-4 block font-mono text-sm uppercase tracking-[0.5em] text-white">Curated Collection</span>
                        <h2 className="font-serif text-8xl italic text-white md:text-[12rem]">ESSENCE</h2>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// 11. Interactive Stats
export function Stats() {
    const stats = [
        { label: "Refined Projects", value: "140+" },
        { label: "Global Partners", value: "24" },
        { label: "Years of Craft", value: "08" },
        { label: "Uilora Credits", value: "99.9" },
    ];

    return (
        <section className="bg-neutral-950 py-32 text-white">
            <div className="container mx-auto px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="border-l border-white/10 pl-8"
                        >
                            <h4 className="font-serif text-5xl font-light md:text-7xl">{stat.value}</h4>
                            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-neutral-500">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 12. Interactive Archive List
export function Archive() {
    const projects = [
        { id: "01", title: "Kinetic Void", year: "2024" },
        { id: "02", title: "Silent Echo", year: "2023" },
        { id: "03", title: "Mineral Flow", year: "2023" },
        { id: "04", title: "Uilora Systems", year: "2022" },
    ];

    return (
        <section className="bg-white py-48 text-black border-b border-black/10">
            <div className="container mx-auto px-8">
                <div className="mb-16">
                    <h2 className="font-serif text-6xl">THE ARCHIVE</h2>
                </div>
                <div className="flex flex-col">
                    {projects.map((project, i) => (
                        <div key={i} className="group relative flex cursor-pointer items-center justify-between border-t border-black/10 py-12 transition-all hover:px-8">
                            <div className="flex items-baseline gap-8">
                                <span className="font-mono text-xs text-neutral-400">{project.id}</span>
                                <h3 className="font-serif text-4xl uppercase tracking-tighter transition-all group-hover:italic md:text-7xl">{project.title}</h3>
                            </div>
                            <span className="font-serif text-xl italic text-neutral-400">{project.year}</span>

                            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                                <ArrowUpRight size={40} strokeWidth={1} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- MAIN PAGE ---
export default function MasonryPage() {
    return (
        <SmoothScroll>
            <div className="min-h-screen bg-[#050505] text-neutral-200 selection:bg-white selection:text-black">
                {/* Grain Overlay */}
                <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.04] mix-blend-overlay"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
                </div>

                <Header />

                <main>
                    <Hero />
                    <MasonryGrid />
                    <HorizontalScroll />
                    <Philosophy />
                    <StickyReveal />
                    <Stats />
                    <Archive />
                </main>

                <Footer />
            </div>
        </SmoothScroll>
    );
}
