"use client";

import React, { useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useScroll,
} from "framer-motion";
import {
    ArrowUpRight,
    Zap,
    Box,
    Layers,
    Menu,
    X,
} from "lucide-react";
import { cn } from "@/src/lib/utils"

// --- CONFIG ---
export const COLORS = {
    bg: "bg-[#f0f0f0]",
    dark: "bg-[#1a1a1a]",
    accent: "bg-[#B8FF28]", // Acid Lime
    purple: "bg-[#9F7AEA]", // Soft Purple
    orange: "bg-[#FF9F43]", // Chunky Orange
    border: "border-black",
};

// --- COMPONENTS ---

// 1. 3D TILT CARD COMPONENT
export function TiltCard({
    children,
    className,
    noTilt = false
}: {
    children: React.ReactNode;
    className?: string;
    noTilt?: boolean;
}) {

    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (noTilt || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: noTilt ? 0 : rotateX,
                rotateY: noTilt ? 0 : rotateY,
                transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative h-full w-full overflow-hidden rounded-[2rem] border-4 border-black bg-white text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-colors hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
                className
            )}
        >
            <div
                style={{ transform: "translateZ(50px)" }}
                className="h-full w-full"
            >
                {children}
            </div>
        </motion.div>
    );
};

// 2. Animated Navbar
export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed left-0 right-0 top-8 z-50 px-6">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
                <motion.div
                    initial={{ y: -100 }} animate={{ y: 0 }}
                    className="flex items-center gap-2 rounded-full border-4 border-black bg-white px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                    <div className="h-6 w-6 rounded-md bg-black" />
                    <span className="font-sans text-xl font-black tracking-tighter">CHUNKY.</span>
                </motion.div>

                <motion.nav
                    initial={{ y: -100 }} animate={{ y: 0 }} transition={{ delay: 0.1 }}
                    className="hidden items-center gap-4 rounded-full border-4 border-black bg-white px-2 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:flex"
                >
                    {["Work", "Studio", "Pricing", "Book Call"].map((item, i) => (
                        <a
                            key={item}
                            href="#"
                            className={cn(
                                "rounded-full px-6 py-2 text-sm font-bold uppercase transition-colors hover:bg-black hover:text-white",
                                i === 3 && "bg-[#B8FF28] hover:text-black"
                            )}
                        >
                            {item}
                        </a>
                    ))}
                </motion.nav>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-black bg-[#FF9F43] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:hidden"
                >
                    {isOpen ? <X strokeWidth={3} /> : <Menu strokeWidth={3} />}
                </button>
            </div>
        </header>
    );
};

// 3. Hero Section
export function Hero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);

    return (
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 pt-32 text-center">
            <div className="absolute inset-0 -z-10 opacity-20"
                style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}
            />

            <motion.div
                style={{ y }}
                className="relative z-10 max-w-4xl"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="mb-6 inline-block rotate-[-2deg] rounded-xl border-4 border-black bg-[#B8FF28] px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                    <span className="font-bold uppercase tracking-wide">Agency of the Future</span>
                </motion.div>

                <h1 className="font-sans text-6xl font-black uppercase leading-[0.9] tracking-tighter text-black md:text-9xl">
                    Digital <br />
                    <span className="text-transparent" style={{ WebkitTextStroke: "3px black" }}>Solids</span>
                </h1>

                <p className="mx-auto mt-8 max-w-lg text-xl font-medium leading-relaxed text-neutral-800">
                    We build heavy, tactile, and unforgettable digital experiences that stick in your mind like bubblegum.
                </p>
            </motion.div>
        </section>
    );
}

// 4. The "Bento" Grid
export function BentoGrid() {
    return (
        <section className="bg-black px-6 py-24 text-white">
            <div className="mx-auto grid max-w-6xl auto-rows-[300px] grid-cols-1 gap-8 md:grid-cols-3 md:auto-rows-[350px]">
                <div className="md:col-span-2">
                    <TiltCard className="bg-[#f0f0f0]">
                        <div className="relative h-full w-full">
                            <img
                                src="https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2576&auto=format&fit=crop"
                                alt="Project"
                                className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                            />
                            <div className="absolute bottom-6 left-6 rounded-xl border-4 border-black bg-white px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <h3 className="text-2xl font-black uppercase text-black">Project Alpha</h3>
                            </div>
                        </div>
                    </TiltCard>
                </div>

                <div className="md:col-span-1">
                    <TiltCard className="bg-[#B8FF28] p-8 flex flex-col justify-between">
                        <div className="flex justify-between">
                            <Zap className="h-10 w-10 fill-black" />
                            <span className="text-xl font-bold">2024</span>
                        </div>
                        <div>
                            <h2 className="text-7xl font-black tracking-tighter">98<span className="text-4xl">%</span></h2>
                            <p className="mt-2 font-bold uppercase">Client Satisfaction</p>
                        </div>
                    </TiltCard>
                </div>

                <div className="md:col-span-1">
                    <TiltCard className="bg-[#9F7AEA] p-8 text-white">
                        <Layers className="h-10 w-10 mb-6 text-black" />
                        <ul className="space-y-3">
                            {["UI/UX Design", "Web Development", "3D Motion", "Branding"].map(item => (
                                <li key={item} className="flex items-center gap-2 border-b-2 border-black/20 pb-2 text-lg font-bold text-black">
                                    <ArrowUpRight className="h-5 w-5" /> {item}
                                </li>
                            ))}
                        </ul>
                    </TiltCard>
                </div>

                <div className="md:col-span-2">
                    <TiltCard className="bg-[#FF9F43] p-10 flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-4 border-black bg-white/20 transition-transform duration-500 group-hover:scale-150" />
                        <div className="relative z-10 text-center">
                            <h3 className="text-4xl font-black uppercase text-black md:text-5xl">Ready to scale?</h3>
                            <button className="mt-6 flex items-center gap-2 rounded-full border-4 border-black bg-black px-8 py-4 text-xl font-bold text-white transition-transform hover:-translate-y-1 hover:bg-[#1a1a1a]">
                                Book A Call <ArrowUpRight />
                            </button>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </section>
    );
};

// 5. Infinite Marquee
export function Marquee() {
    return (
        <div className="relative z-20 -mt-10 rotate-[-2deg] overflow-hidden border-y-4 border-black bg-[#B8FF28] py-4 shadow-[0px_4px_10px_rgba(0,0,0,0.2)]">
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="flex whitespace-nowrap"
            >
                {Array(10).fill("STRATEGY • DESIGN • DEVELOPMENT • MOTION • ").map((text, i) => (
                    <span key={i} className="text-3xl font-black text-black">{text}</span>
                ))}
            </motion.div>
        </div>
    );
}

// 6. Interactive Feature List
export function Process() {
    const steps = [
        { num: "01", title: "Discovery", desc: "We dig deep into your brand DNA." },
        { num: "02", title: "Sketch", desc: "Rough concepts, raw ideas, pencil to paper." },
        { num: "03", title: "Build", desc: "Converting pixels into interactive solids." },
        { num: "04", title: "Launch", desc: "Ship it to the world with a bang." },
    ]

    return (
        <section className="bg-white py-24 px-6">
            <div className="mx-auto max-w-4xl">
                <h2 className="mb-16 text-5xl font-black uppercase tracking-tighter text-black md:text-7xl">
                    The <span className="text-[#9F7AEA]">Process</span>
                </h2>

                <div className="flex flex-col gap-6">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex flex-col md:flex-row items-start md:items-center gap-6 rounded-[2rem] border-4 border-black bg-[#f0f0f0] p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-black bg-black text-2xl font-bold text-white group-hover:bg-[#B8FF28] group-hover:text-black">
                                {step.num}
                            </div>
                            <div>
                                <h3 className="text-2xl font-black uppercase">{step.title}</h3>
                                <p className="text-lg font-medium text-gray-600">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// 7. Footer
export function Footer() {
    return (
        <footer className="bg-black px-6 py-20 text-white">
            <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
                <Box className="mb-8 h-20 w-20 animate-bounce text-[#B8FF28]" />
                <h2 className="mb-6 font-sans text-5xl font-black uppercase md:text-8xl">
                    Let's get <span className="text-[#B8FF28]">Chunky</span>
                </h2>
                <p className="max-w-xl text-xl text-neutral-400">
                    Stop blending in. It's time to take up space.
                </p>
                <div className="mt-12 flex flex-col gap-4 md:flex-row">
                    <button className="rounded-full border-4 border-white bg-white px-8 py-4 text-xl font-black uppercase text-black transition-transform hover:scale-105">
                        Start Project
                    </button>
                    <button className="rounded-full border-4 border-white px-8 py-4 text-xl font-black uppercase text-white transition-colors hover:bg-white hover:text-black">
                        hello@chunky.studio
                    </button>
                </div>

                <div className="mt-24 flex w-full justify-between border-t border-neutral-800 pt-8 text-sm font-bold uppercase text-neutral-500">
                    <span>© 2024 Chunky Studio</span>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white">Twitter</a>
                        <a href="#" className="hover:text-white">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

// 8. RevealText
export function RevealText({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) {
    return (
        <div className={cn("inline-flex flex-wrap overflow-hidden", className)}>
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ y: "120%", rotateX: -90 }}
                    whileInView={{ y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        delay: delay + (i * 0.02),
                        duration: 0.8,
                        ease: [0.215, 0.61, 0.355, 1]
                    }}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </div>
    );
}

// 9. Showcase Masonry
export function ShowcaseMasonry() {
    return (
        <section className="bg-white py-24 px-6">
            <div className="mx-auto max-w-6xl">
                <div className="mb-20 flex flex-col md:flex-row items-baseline gap-4 border-b-8 border-black pb-8">
                    <h2 className="text-7xl font-black uppercase tracking-tighter md:text-9xl">GALLERY</h2>
                    <span className="text-2xl font-black uppercase text-[#FF9F43]">/// VISUAL CHAOS</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-8">
                        <TiltCard className="bg-[#B8FF28] aspect-video">
                            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80" alt="Art" className="h-full w-full object-cover" />
                        </TiltCard>
                    </div>
                    <div className="md:col-span-4 md:translate-y-20">
                        <TiltCard className="bg-[#9F7AEA] aspect-[3/4]">
                            <img src="https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80" alt="Art" className="h-full w-full object-cover grayscale" />
                        </TiltCard>
                    </div>
                    <div className="md:col-span-12">
                        <div className="flex h-32 items-center justify-center border-4 border-black bg-black text-white rounded-[2rem] shadow-[8px_8px_0px_0px_#B8FF28]">
                            <span className="text-4xl font-black uppercase tracking-widest italic">Always Different. Always Loud.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// 10. Pricing Grid
export function PricingGrid() {
    const plans = [
        { name: "Starter", price: "$49", color: "bg-white", features: ["1 Project", "Basic Support", "Standard Assets"] },
        { name: "Pro", price: "$149", color: "bg-[#B8FF28]", features: ["5 Projects", "Priority Support", "Premium Assets", "Source Files"] },
        { name: "Expert", price: "$299", color: "bg-[#9F7AEA]", features: ["Unlimited", "24/7 Support", "Custom Strategy", "White Label"] },
    ];

    return (
        <section className="bg-black py-24 px-6 text-white">
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-16 text-center text-6xl font-black uppercase tracking-widest">Pricing Plans</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <TiltCard key={i} className={cn("p-10 flex flex-col items-center text-center", plan.color)}>
                            <h3 className="text-3xl font-black uppercase text-black">{plan.name}</h3>
                            <div className="my-8 text-7xl font-black text-black">{plan.price}</div>
                            <ul className="mb-10 space-y-4 text-left w-full">
                                {plan.features.map(f => (
                                    <li key={f} className="flex items-center gap-2 font-bold text-black border-b-2 border-black/10 pb-2">
                                        <Zap className="h-4 w-4 fill-black" /> {f}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full rounded-full border-4 border-black bg-black py-4 font-black uppercase text-white hover:bg-neutral-800">Choose Plan</button>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 11. FAQ Section
export function FAQSection() {
    const faqs = [
        { question: "Why so chunky?", answer: "Because flat design is for cowards. We believe in visual weight and tactile presence." },
        { question: "Is this responsive?", answer: "Absolutely. Every block stacks and scales perfectly across mobile and desktop." },
        { question: "Can I customize the acid colors?", answer: "Yes, our system is built with design tokens. Swap the HSL values to fit your vibe." }
    ];

    return (
        <section className="bg-white py-24 px-6">
            <div className="mx-auto max-w-4xl">
                <div className="mb-16 flex items-center gap-4">
                    <div className="h-16 w-16 rotate-12 bg-[#FF9F43] border-4 border-black rounded-lg shadow-[4px_4px_0px_0px_#000]" />
                    <h2 className="text-6xl font-black uppercase tracking-tighter">Everything Else</h2>
                </div>
                <div className="space-y-6">
                    {faqs.map((faq, i) => (
                        <TiltCard key={i} className="bg-[#f0f0f0] p-8" noTilt>
                            <h4 className="text-2xl font-black uppercase mb-4">{faq.question}</h4>
                            <p className="text-lg font-bold text-neutral-600 leading-relaxed">{faq.answer}</p>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 12. Split Section
export function SplitSection() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 border-y-8 border-black">
            <div className="flex items-center justify-center bg-[#B8FF28] p-24 md:border-r-8 md:border-black">
                <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="relative aspect-square w-full max-w-sm border-8 border-black bg-white shadow-[20px_20px_0px_0px_#000] flex items-center justify-center overflow-hidden"
                >
                    <Box size={200} strokeWidth={3} className="text-black" />
                </motion.div>
            </div>
            <div className="flex flex-col justify-center bg-[#f0f0f0] p-16 md:p-32">
                <h2 className="text-7xl font-black uppercase leading-[0.85] tracking-tighter md:text-9xl mb-12">
                    WE <br /> BUILD <br /> <span className="bg-[#9F7AEA] px-4 text-white">HEAVY.</span>
                </h2>
                <p className="text-2xl font-bold leading-tight uppercase border-l-8 border-black pl-8">
                    Stop building websites that float away. Give your brand the structural integrity it deserves.
                </p>
            </div>
        </section>
    );
}

// 13. Newsletter
export function Newsletter() {
    return (
        <section className="bg-[#FF9F43] py-32 px-6 border-b-8 border-black">
            <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-6xl font-black uppercase tracking-tighter mb-12">Join the Chunk Club</h2>
                <div className="flex flex-col md:flex-row gap-6">
                    <input
                        placeholder="ENTER YOUR EMAIL"
                        className="h-20 flex-1 border-4 border-black bg-white px-8 text-2xl font-black outline-none focus:bg-[#B8FF28]"
                    />
                    <button className="h-20 border-4 border-black bg-black px-12 text-2xl font-black uppercase text-white shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all">
                        SIGN UP
                    </button>
                </div>
            </div>
        </section>
    );
}

// --- PAGE WRAPPER ---
export default function NeoBrutalistPage() {
    return (
        <div className={cn("min-h-screen bg-[#f0f0f0] font-sans text-black selection:bg-black selection:text-[#B8FF28]")}>
            <Navbar />
            <main className="overflow-hidden">
                <Hero />
                <Marquee />
                <SplitSection />
                <BentoGrid />
                <ShowcaseMasonry />
                <Process />
                <PricingGrid />
                <FAQSection />
                <Newsletter />
            </main>
            <Footer />
        </div>
    );
}
