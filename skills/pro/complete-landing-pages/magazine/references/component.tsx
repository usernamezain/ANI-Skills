import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowDownRight, ArrowRight, Menu, Search } from "lucide-react";
import { cn } from "@/src/lib/utils";

// --- ARTICLES DATA ---
export const articles = [
    { title: "The Silicon Void", category: "Architecture", color: "bg-stone-500" },
    { title: "Digital Skin", category: "Fashion", color: "bg-red-700" },
    { title: "Neo-Tokyo Drift", category: "Culture", color: "bg-indigo-900" },
    { title: "Memory Lanes", category: "Photography", color: "bg-emerald-800" },
];

// --- 1. SUB-COMPONENTS ---

// Infinite Scrolling Marquee
export function Marquee({ text }: { text: string }) {
    return (
        <div className="relative flex overflow-hidden border-b border-black py-4 bg-neutral-100">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: ["0%", "-100%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            >
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="mx-4 text-xs font-bold uppercase tracking-widest text-black">
                        {text} —
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

// The Floating Image Modal (The "Wow" Factor)
export function FloatingImage({ activeIndex, x, y, articles }: any) {
    // We use spring physics to make the image drag slightly behind the mouse (fluidity)
    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    return (
        <motion.div
            style={{ left: springX, top: springY }}
            className="pointer-events-none fixed z-20 h-[300px] w-[220px] overflow-hidden hidden md:block"
        >
            {/* We stack images and fade them in/out based on active index */}
            <div
                className="relative h-full w-full -translate-x-1/2 -translate-y-1/2" // Center on cursor
            >
                {articles.map((article: any, index: number) => {
                    const isActive = index === activeIndex;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: isActive ? 1 : 0,
                                scale: isActive ? 1 : 0.8
                            }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 h-full w-full bg-neutral-800"
                        >
                            {/* Fallback Color / Image Placeholder */}
                            <div
                                className={cn("h-full w-full object-cover opacity-80", article.color)}
                            />

                            {/* Image Overlay Text */}
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="flex justify-between items-end text-white mix-blend-difference">
                                    <span className="text-[10px] font-mono uppercase">Fig. 0{index + 1}</span>
                                    <ArrowDownRight size={16} />
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    );
}

// Article List Item
export function ArticleRow({ index, title, category, setIndex }: any) {
    return (
        <motion.div
            onMouseEnter={(e) => {
                setIndex(index);
            }}
            className="group relative flex cursor-pointer items-center justify-between border-t border-black py-12 transition-colors hover:bg-neutral-50 px-4 md:px-0"
        >
            <div className="flex items-baseline gap-6 md:gap-12">
                <span className="font-mono text-xs text-neutral-400">0{index + 1}</span>
                <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-neutral-900 group-hover:italic transition-all duration-300">
                    {title}
                </h2>
            </div>
            <div className="flex items-center gap-4">
                <span className="hidden md:block font-mono text-xs uppercase tracking-widest text-neutral-500 group-hover:text-black">
                    {category}
                </span>
                <ArrowRight className="h-6 w-6 -rotate-45 text-neutral-300 transition-transform duration-300 group-hover:rotate-0 group-hover:text-black" />
            </div>
        </motion.div>
    );
}

// Editor's Note Section
export function EditorsNote() {
    return (
        <section className="border-t border-black bg-[#f4f4f0] py-24 px-6 md:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden bg-neutral-200">
                        <img
                            src="https://images.unsplash.com/photo-1631036119874-f338a1f8160b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGVkaXRvcmlhbCUyMGZhc2hpb24lMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"
                            alt="Editor"
                            className="h-full w-full object-cover grayscale transition-transform hover:scale-105 duration-700"
                        />
                        <div className="absolute -left-4 -bottom-4 italic font-serif text-6xl text-white mix-blend-difference">
                            Anna.
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-8">From the Editor</span>
                        <h2 className="font-serif text-5xl md:text-7xl font-light mb-8 leading-tight">
                            The Death of <br /> <span className="italic text-neutral-400">Minimalism.</span>
                        </h2>
                        <div className="space-y-6 text-lg max-w-lg leading-relaxed text-neutral-700">
                            <p>We spent the last decade stripping away character in the name of usability. We tore down the brutalist monuments and hand-drawn chaos to build sterile, white-walled digital hospitals.</p>
                            <p>This issue explores the resurgence of texture, noise, and unapologetic opinion in design.</p>
                        </div>
                        <div className="mt-12 w-32 border-t border-black" />
                    </div>
                </div>
            </div>
        </section>
    );
}

// The Visual Index (Asymmetric Gallery)
export function VisualIndex() {
    const images = [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512418490979-92798cec1380?q=80&w=800&auto=format&fit=crop"
    ];

    return (
        <section className="border-t border-black bg-white px-6 py-24 md:px-12">
            <div className="mb-16 flex justify-between items-end">
                <h2 className="font-serif text-4xl md:text-6xl uppercase tracking-tighter">The Index</h2>
                <span className="font-mono text-xs uppercase tracking-widest hidden md:block">03 Selected Works</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
                {images.map((src, i) => (
                    <motion.div
                        key={i}
                        className={cn("relative group overflow-hidden bg-neutral-100", i === 1 ? "md:mt-24" : "md:mb-24")}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2, duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="aspect-[4/5] overflow-hidden">
                            <img src={src} className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" alt="Gallery item" />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                            <div className="font-mono text-xs uppercase tracking-widest mb-2">Fig {i + 1}</div>
                            <div className="font-serif text-2xl">Editorial Artifact {i + 1}</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// Typographic Table of Contents
export function CategoryList() {
    const categories = ["Fashion", "Architecture", "Technology", "Culture", "Archive"];
    return (
        <section className="bg-black text-white px-6 py-24 md:px-12">
            <div className="mx-auto max-w-5xl">
                <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-12 block">Directory</span>
                <div className="flex flex-col border-t border-white/20">
                    {categories.map((cat, i) => (
                        <motion.a
                            key={cat}
                            href="#"
                            initial="rest"
                            whileHover="hover"
                            className="group flex items-center justify-between border-b border-white/20 py-8 relative overflow-hidden"
                        >
                            <motion.div
                                variants={{ hover: { x: 20 } }}
                                transition={{ ease: "easeOut", duration: 0.3 }}
                                className="font-serif text-4xl md:text-7xl font-light uppercase tracking-tighter group-hover:italic"
                            >
                                {cat}
                            </motion.div>
                            <div className="font-mono text-sm opacity-50 group-hover:opacity-100 transition-opacity">
                                0{i + 1}.
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Parallax Subscription Banner
export function PremiumBanner() {
    return (
        <section className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center justify-center">
            {/* Very simple generic parallax wrap without external libs */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000&auto=format&fit=crop"
                    alt="Premium Banner"
                    className="h-full w-full object-cover object-center grayscale opacity-80"
                />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 mix-blend-difference text-white">
                <h2 className="font-serif text-7xl md:text-[10vw] leading-none uppercase tracking-tighter mb-8">
                    The Inner <span className="italic">Circle</span>
                </h2>
                <button className="rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-black hover:bg-neutral-200 transition-colors shadow-2xl">
                    Request Access
                </button>
            </div>
        </section>
    );
}

// Minimal Pull Quote
export function MinimalQuote() {
    return (
        <section className="bg-[#f4f4f0] px-6 py-32 md:py-48 flex items-center justify-center border-t border-black">
            <div className="max-w-4xl text-center">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-12 block">Thought Process</span>
                <h2 className="font-serif text-4xl md:text-7xl font-light leading-tight text-black">
                    "Simplicity is not the absence of clutter, that's a consequence of simplicity. Simplicity is somehow essentially describing the purpose and place of an object and product."
                </h2>
                <div className="mt-12 text-sm italic font-serif text-neutral-500">
                    — Dieter Rams
                </div>
            </div>
        </section>
    );
}

// Editorial Spotlight (Featured Item)
export function EditorialSpotlight() {
    return (
        <section className="bg-white px-6 py-24 md:px-12 border-t border-black">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <h2 className="font-serif text-5xl md:text-8xl lowercase tracking-tighter">
                    obj. 001
                </h2>
                <div className="font-mono text-xs uppercase tracking-widest text-right max-w-xs leading-relaxed hidden md:block">
                    The intersection of brutalism and utility. Designed for those who appreciate the raw truth of materials.
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 lg:gap-8 items-center">
                <div className="md:col-span-3 flex flex-col justify-end h-full font-mono text-xs uppercase tracking-widest text-neutral-500 gap-8 pb-12">
                    <div>
                        <strong className="text-black block mb-2">Material</strong>
                        Anodized Aluminum
                    </div>
                    <div>
                        <strong className="text-black block mb-2">Weight</strong>
                        450g
                    </div>
                    <div>
                        <strong className="text-black block mb-2">Origin</strong>
                        Kyoto, Japan
                    </div>
                </div>

                <div className="md:col-span-6 relative aspect-[3/4] md:aspect-square bg-neutral-100 group overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
                        alt="Product"
                        className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0 mix-blend-multiply"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 mix-blend-overlay"></div>
                </div>

                <div className="md:col-span-3 flex justify-center md:justify-end">
                    <button className="h-32 w-32 rounded-full border border-black flex items-center justify-center font-serif text-xl italic hover:bg-black hover:text-white transition-colors">
                        Shop
                    </button>
                </div>
            </div>
        </section>
    );
}

// The Archive
export function TheArchive() {
    const archiveImages = [
        "https://images.unsplash.com/photo-1613339027986-b94d85708995?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1699378999301-8c88a6a237d9?q=80&w=764&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=800&auto=format&fit=crop"
    ];

    return (
        <section className="bg-black text-white px-6 py-24 md:px-12 border-t border-black">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <h2 className="font-serif text-5xl md:text-8xl lowercase tracking-tighter">
                    the archive.
                </h2>
                <button className="uppercase font-mono text-xs tracking-widest border-b border-white pb-1 hover:text-neutral-400 transition-colors self-start md:self-end">
                    View All Past Issues
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {archiveImages.map((src, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        className="group cursor-pointer"
                    >
                        <div className="aspect-[3/4] overflow-hidden bg-neutral-900 mb-6 relative">
                            <img
                                src={src}
                                alt={`Archive ${i + 1}`}
                                className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                        </div>
                        <div className="flex justify-between items-center font-mono text-xs uppercase tracking-widest border-t border-white/20 pt-4">
                            <span>Issue 0{i + 1}</span>
                            <span className="text-neutral-500">202{i}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// --- 2. MAIN PAGE EXPORT ---
export default function MagazineLanding() {
    const [activeIndex, setActiveIndex] = useState(-1); // -1 means nothing hovered
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        // Update Framer Motion values directly for performance
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <main
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setActiveIndex(-1)}
            className="min-h-screen w-full bg-[#f4f4f0] text-black selection:bg-black selection:text-white"
        >
            {/* Floating Image Component */}
            <FloatingImage
                activeIndex={activeIndex}
                x={mouseX}
                y={mouseY}
                articles={articles}
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 mix-blend-difference text-black md:px-12">
                <div className="text-xl font-bold tracking-tighter uppercase">Vogue.2125</div>
                <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest">
                    <a href="#" className="hover:underline underline-offset-4">Issues</a>
                    <a href="#" className="hover:underline underline-offset-4">Shop</a>
                    <a href="#" className="hover:underline underline-offset-4">Membership</a>
                </div>
                <div className="flex items-center gap-4">
                    <Search className="h-5 w-5" />
                    <Menu className="h-5 w-5 md:hidden" />
                </div>
            </nav>

            {/* Premium Editorial Hero Section */}
            <section className="relative w-full min-h-screen flex flex-col justify-between p-6 md:p-12 border-b border-black bg-[#f4f4f0] overflow-hidden pt-32">
                {/* Background Editorial Image */}
                <div className="absolute top-4 right-4 bottom-4 w-full md:w-[70%] z-0 rounded-sm overflow-hidden hidden md:block">
                    <motion.div
                        className="w-full h-full"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1679163096018-3f75b9c07246?q=80&w=1171&auto=format&fit=crop"
                            className="w-full h-full object-cover grayscale opacity-80"
                            alt="Hero Editorial"
                        />
                    </motion.div>
                </div>

                {/* Mobile Background Image */}
                <div className="absolute inset-x-4 top-24 bottom-4 z-0 rounded-sm overflow-hidden md:hidden">
                    <img
                        src="https://images.unsplash.com/photo-1600164319491-155822361099?q=80&w=1600&auto=format&fit=crop"
                        className="w-full h-full object-cover grayscale opacity-60"
                        alt="Hero Editorial"
                    />
                    {/* Gradient completely covers right side text for readability on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f4f4f0] via-[#f4f4f0]/80 to-transparent"></div>
                </div>

                {/* Top Nav/Meta area inside Hero */}
                <div className="relative z-10 flex justify-between items-start md:items-end w-full max-w-7xl">
                    <div className="flex flex-col gap-2">
                        <span className="font-mono text-xs uppercase tracking-widest text-black/70">Issue No. 14</span>
                        <span className="font-mono text-xs uppercase tracking-widest text-black border-b border-black pb-1">The Earth Edition</span>
                    </div>
                    <span className="font-mono text-xs uppercase tracking-widest text-black/70 right-0">MMXXIV</span>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 w-full max-w-7xl flex flex-col justify-end mt-24 md:mt-0">
                    <h1 className="font-serif text-[22vw] md:text-[14vw] leading-[0.75] tracking-tighter text-black uppercase mix-blend-normal">
                        <motion.span
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="block overflow-hidden"
                        >
                            AVANT
                        </motion.span>
                        <motion.span
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="block italic md:ml-[15vw] overflow-hidden text-black md:text-white md:mix-blend-difference"
                        >
                            GARDE.
                        </motion.span>
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-16 md:mt-24">
                        <div className="md:col-span-4 font-mono text-xs leading-relaxed uppercase tracking-wide text-black md:text-white md:mix-blend-difference max-w-sm">
                            <strong className="text-black md:text-white">Editorial Brief —</strong><br /><br />
                            A deep dive into the intersection of brutalist web architecture and high-end editorial layouts. Exploring the limits of digital space as a canvas for raw expression.
                        </div>
                        <div className="md:col-span-8 flex justify-start md:justify-end items-end md:mix-blend-difference">
                            <button className="group rounded-full border border-black md:border-white px-8 py-4 text-black md:text-white hover:bg-black md:hover:bg-white hover:text-white md:hover:text-black transition-all duration-300 flex items-center gap-4">
                                <span className="uppercase text-xs font-bold tracking-widest">Read Issue</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Marquee text="Latest Stories &bull; Breaking News &bull; Visual Essays &bull; " />

            {/* Interactive Article List */}
            <section className="px-6 md:px-12 py-24 min-h-[50vh]">
                <div className="mb-12 flex items-center gap-2">
                    <span className="h-2 w-2 bg-red-600 rounded-full animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Featured Stories</span>
                </div>

                <div className="flex flex-col">
                    {articles.map((article, index) => (
                        <ArticleRow
                            key={index}
                            index={index}
                            {...article}
                            setIndex={setActiveIndex}
                        />
                    ))}
                </div>
            </section>

            {/* Extra Editorial Sections */}
            <EditorialSpotlight />
            <EditorsNote />
            <MinimalQuote />
            <VisualIndex />
            <CategoryList />
            <PremiumBanner />
            <TheArchive />

            {/* Footer */}
            <footer className="bg-black text-[#f4f4f0] px-6 py-24 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="font-serif text-6xl md:text-8xl">Sub.</h2>
                        <p className="mt-4 max-w-sm text-neutral-400">
                            Subscribe to our weekly dispatch of digital artifacts and design critique.
                        </p>
                        <div className="mt-8 flex border-b border-white/20 pb-2">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-transparent outline-none placeholder:text-neutral-600 font-mono uppercase"
                            />
                            <button className="uppercase text-xs font-bold tracking-widest hover:text-white/70">Submit</button>
                        </div>
                    </div>
                    <div className="flex flex-col justify-end text-right">
                        <div className="flex justify-end gap-4 mb-8">
                            {['Instagram', 'Twitter', 'Are.na'].map(social => (
                                <a key={social} href="#" className="font-mono text-xs uppercase hover:underline">{social}</a>
                            ))}
                        </div>
                        <p className="font-mono text-[10px] text-neutral-600 uppercase">
                            © 2125 The Agency. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
