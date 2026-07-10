import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Box, Layers, Zap, Maximize2, MoveDownRight, Aperture, Fingerprint } from "lucide-react";
import { cn } from "@/src/lib/utils";

// --- CONFIG ---
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- UTILS ---
export const SplitTextReveal = ({ text, className = "" }: { text: string; className?: string }) => {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = elRef.current;
        if (!el) return;
        const chars = el.querySelectorAll('.split-char');
        gsap.fromTo(chars,
            { opacity: 0, y: 100, rotateX: -90 },
            {
                opacity: 1, y: 0, rotateX: 0,
                duration: 1.2, stagger: 0.02, ease: "power4.out",
                scrollTrigger: { trigger: el, start: "top 85%" }
            }
        );
    }, []);

    return (
        <div ref={elRef} className={cn("inline-block", className)} style={{ perspective: "1000px", overflow: 'hidden' }}>
            {text.split('').map((char, i) => (
                <span key={i} className="split-char opacity-0 inline-block transform-origin-bottom">
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </div>
    );
};

// --- COMPONENTS ---

// 1. INTRO / HERO
function DimensionsHero({ title = "SPATIAL", subtitle = "RE-ENGINEERING" }) {
    const containerRef = useRef(null);
    const bgRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(bgRef.current, {
                yPercent: 50,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center pt-24">
            <div ref={bgRef} className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900 via-black to-black"></div>
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
            </div>

            <div className="z-10 flex flex-col items-center text-center px-4">
                <div className="mb-8 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-2 backdrop-blur-md">
                    <span className="text-sm font-mono tracking-widest text-cyan-400 uppercase">Uilora System Initialized</span>
                </div>

                <h1 className="text-7xl md:text-[12rem] font-black uppercase leading-[0.85] tracking-tighter text-white">
                    <SplitTextReveal text={title} />
                </h1>
                <h1 className="text-7xl md:text-[10rem] font-black uppercase leading-[0.85] tracking-tighter text-transparent mt-4" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.8)" }}>
                    <SplitTextReveal text={subtitle} />
                </h1>

                <p className="mt-12 max-w-lg text-lg text-gray-400 font-light">
                    Breaking the traditional constraints of web design. Enter a multidimensional canvas where geometry dictates logic in the Uilora library.
                </p>

                <div className="mt-16 animate-bounce">
                    <MoveDownRight size={48} className="text-cyan-400" strokeWidth={1} />
                </div>
            </div>
        </section>
    );
}

// 2. VERTICAL PARALLAX MASONRY
function ParallaxMasonry({ images }: { images: string[] }) {
    const container = useRef(null);
    const col1 = useRef(null);
    const col2 = useRef(null);
    const col3 = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(col1.current, {
                y: -150, ease: "none",
                scrollTrigger: { trigger: container.current, start: "top bottom", end: "bottom top", scrub: true }
            });
            gsap.to(col2.current, {
                y: 100, ease: "none",
                scrollTrigger: { trigger: container.current, start: "top bottom", end: "bottom top", scrub: true }
            });
            gsap.to(col3.current, {
                y: -250, ease: "none",
                scrollTrigger: { trigger: container.current, start: "top bottom", end: "bottom top", scrub: true }
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="relative z-10 min-h-[150vh] bg-[#050505] px-4 py-32 md:px-12 border-t border-white/10">
            <div className="mb-24 flex flex-col items-start gap-4">
                <div className="rounded-full border border-white/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                    <Aperture size={14} /> 01 — Structural Shift
                </div>
                <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-tighter text-white md:text-8xl">
                    Vertical <br /> <span className="text-cyan-500">Parallax</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mx-auto max-w-7xl">
                <div ref={col1} className="flex flex-col gap-8 pt-24">
                    <img src={images[0]} className="h-[600px] w-full rounded-[2rem] object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-[1.02]" />
                    <img src={images[1]} className="h-[400px] w-full rounded-[2rem] object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-[1.02]" />
                </div>
                <div ref={col2} className="flex flex-col gap-8">
                    <img src={images[2]} className="h-[500px] w-full rounded-[2rem] object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-[1.02]" />
                    <div className="flex h-[400px] flex-col justify-between rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8">
                        <Fingerprint size={32} className="text-cyan-500" />
                        <p className="font-mono text-xl text-white tracking-widest uppercase">
                            "Structure is not geometry.<br /> It is music frozen in space."
                        </p>
                    </div>
                </div>
                <div ref={col3} className="flex flex-col gap-8 pt-48">
                    <img src={images[3]} className="h-[450px] w-full rounded-[2rem] object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-[1.02]" />
                    <img src={images[4]} className="h-[550px] w-full rounded-[2rem] object-cover grayscale transition-all duration-700 hover:grayscale-0 hover:scale-[1.02]" />
                </div>
            </div>
        </section>
    );
}

// 3. DIMENSION SHIFTER (Vertical -> Horizontal Scroll)
function DimensionShifter({ statement }: { statement: string }) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray(".h-item");
            const scrollTween = gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (sections.length - 1),
                    end: () => "+=" + (sectionRef.current as unknown as HTMLElement).offsetWidth
                }
            });

            gsap.from(".slide-2-text", {
                opacity: 0,
                y: 100,
                filter: "blur(10px)",
                duration: 1,
                scrollTrigger: {
                    trigger: ".slide-2",
                    containerAnimation: scrollTween,
                    start: "left 70%",
                    toggleActions: "play none none reverse",
                }
            });

            gsap.from(".slide-3-el", {
                opacity: 0,
                x: 100,
                stagger: 0.2,
                duration: 1,
                scrollTrigger: {
                    trigger: ".slide-3",
                    containerAnimation: scrollTween,
                    start: "left 70%",
                    toggleActions: "play none none reverse",
                }
            });

            gsap.from(".slide-4-text", {
                scale: 0.5,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.5)",
                scrollTrigger: {
                    trigger: ".slide-4",
                    containerAnimation: scrollTween,
                    start: "left 70%",
                    toggleActions: "play none none reverse",
                }
            });
        }, triggerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={triggerRef} className="overflow-hidden bg-white text-black">
            <div ref={sectionRef} className="flex h-screen w-[400vw]">
                {/* Panel 1 */}
                <div className="h-item flex h-screen w-screen flex-col items-center justify-center bg-white px-12 border-r border-black/10 text-black">
                    <div className="bg-black text-white px-4 py-1 rounded-full font-mono text-sm uppercase mb-12 animate-pulse">Axis Shift Detected</div>
                    <h2 className="text-[15vw] font-black leading-none tracking-tighter">
                        HORIZON <span className="italic text-cyan-500">X</span>
                    </h2>
                </div>

                {/* Panel 2 */}
                <div className="h-item slide-2 flex h-screen w-screen items-center justify-center bg-zinc-100 p-12 md:p-24 border-r border-black/10">
                    <h3 className="slide-2-text text-4xl md:text-7xl font-bold uppercase leading-tight max-w-4xl tracking-tighter text-black">
                        {statement}
                    </h3>
                </div>

                {/* Panel 3 */}
                <div className="h-item slide-3 flex h-screen w-screen items-center justify-center bg-black text-white p-12 md:p-24 border-r border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24 w-full max-w-7xl">
                        <div className="slide-3-el text-8xl md:text-[10rem] font-black uppercase leading-[0.8] tracking-tighter text-white">
                            New <br /> <span className="text-cyan-500">Logic</span>
                        </div>
                        <div className="slide-3-el flex flex-col justify-end text-xl text-gray-400 font-light border-l border-white/20 pl-12">
                            <p>
                                By hijacking the vertical scroll and mapping it to the X-axis, we force the user to slow down and consume the narrative exactly as we intended holding true to Uilora's ideals.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Panel 4 */}
                <div className="h-item slide-4 flex h-screen w-screen items-center justify-center bg-cyan-500 text-black">
                    <h2 className="slide-4-text text-[12vw] font-black uppercase tracking-tighter text-white mix-blend-overlay">
                        Re-Assemble
                    </h2>
                </div>
            </div>
        </section>
    )
}

// 4. EXPLODING BENTO GRID 
function ExplodingBento({ images }: { images: string[] }) {
    const container = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".bento-item", {
                y: 150,
                scale: 0.8,
                rotationX: 45,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 75%",
                }
            });
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={container} className="min-h-screen bg-[#050505] px-6 py-32 md:px-12 perspective-1000">
            <div className="mb-24 flex items-center justify-between mx-auto max-w-7xl">
                <h2 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter">Component<br />Geometry</h2>
                <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-2">
                    <span className="text-sm font-mono tracking-widest text-cyan-400 uppercase">Modular</span>
                </div>
            </div>

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-4 md:grid-rows-3 lg:h-[800px]">
                {/* Large Card */}
                <div className="bento-item md:col-span-2 md:row-span-2 relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111] group">
                    <img src={images[5]} className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8">
                        <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Main Module</h3>
                    </div>
                </div>

                {/* Info Card */}
                <div className="bento-item md:col-span-1 md:row-span-1 rounded-[2rem] border border-white/10 bg-cyan-500 p-8 text-black flex flex-col justify-between hover:bg-cyan-400 transition-colors">
                    <Zap size={40} className="stroke-[1.5]" />
                    <div className="font-black text-3xl uppercase tracking-tighter">Energy</div>
                </div>

                {/* Tall Card */}
                <div className="bento-item md:col-span-1 md:row-span-2 rounded-[2rem] border border-white/10 bg-[#1a1a1a] p-8 text-white flex flex-col justify-between group overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between relative z-10">
                        <Maximize2 size={32} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
                        <span className="text-sm font-mono tracking-widest text-cyan-500">AXIS Z</span>
                    </div>
                    <p className="text-xl text-gray-300 font-light relative z-10 leading-relaxed">Vertical integration of modular design systems across spatial planes.</p>
                </div>

                {/* Filler Card to Fix Empty Grid Gap */}
                <div className="bento-item md:col-span-1 md:row-span-1 border border-cyan-500/30 rounded-[2rem] bg-cyan-500/5 p-6 flex flex-col items-center justify-center text-center hover:bg-cyan-500/10 transition-colors">
                    <div className="text-cyan-500 font-mono text-sm tracking-widest uppercase mb-2">Uilora Asset</div>
                    <div className="text-white font-black text-2xl">CORE.UI</div>
                </div>

                {/* Wide Card */}
                <div className="bento-item md:col-span-2 md:row-span-1 rounded-[2rem] border border-white/10 bg-[#111] p-8 flex items-center gap-8 hover:bg-[#151515] transition-colors cursor-pointer">
                    <div className="h-20 w-20 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0">
                        <Layers className="text-cyan-500" size={32} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Stacked Layers</h3>
                        <p className="text-gray-500 mt-2">Depth perception through aggressive Z-index manipulation.</p>
                    </div>
                </div>

                {/* Fillers */}
                <div className="bento-item md:col-span-1 md:row-span-1 rounded-[2rem] border border-white/10 bg-[#0a0a0a] flex items-center justify-center">
                    <Box size={48} className="text-white/10 animate-spin-slow" strokeWidth={1} />
                </div>

                <div className="bento-item md:col-span-1 md:row-span-1 relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111] group">
                    <img src={images[0]} className="absolute inset-0 h-full w-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                </div>
            </div>
        </section>
    )
}

// 6. CONTINUOUS CAROUSEL
function InfiniteCards({ images }: { images: string[] }) {
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    return (
        <section className="py-32 bg-[#050505] overflow-hidden">
            <h2 className="text-4xl md:text-6xl font-black uppercase text-white/20 text-center mb-16 tracking-widest">Endless Loop</h2>
            <div className={cn("flex gap-8 w-max flex-nowrap animate-marquee", selectedImg && "[animation-play-state:paused]")}>
                {[...images, ...images].map((img, i) => (
                    <div
                        key={i}
                        onClick={() => setSelectedImg(img)}
                        className="w-[300px] md:w-[450px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 relative group flex-shrink-0 cursor-pointer"
                    >
                        <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
                            <span className="text-white font-mono uppercase tracking-widest text-sm">ARCHIVE_{i.toString().padStart(3, '0')}</span>
                        </div>
                        <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <span className="text-white font-bold tracking-widest bg-black/50 px-6 py-3 rounded-full uppercase">View Data</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedImg && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl" onClick={() => setSelectedImg(null)}>
                    <div className="bg-[#111] p-8 rounded-[2rem] max-w-4xl w-full border border-white/10 flex flex-col md:flex-row gap-8 items-center relative" onClick={e => e.stopPropagation()}>
                        <button className="absolute top-6 right-6 text-white/50 hover:text-white uppercase font-bold tracking-widest text-xs" onClick={() => setSelectedImg(null)}>
                            Close X
                        </button>
                        <img src={selectedImg} className="w-full md:w-1/2 h-auto rounded-3xl object-cover aspect-square" />
                        <div className="text-white md:w-1/2 mt-4 md:mt-0">
                            <h3 className="text-4xl font-black uppercase tracking-tighter text-cyan-500 mb-4">Classified Asset</h3>
                            <p className="text-gray-400 mb-8 font-light leading-relaxed">
                                This asset has been pulled from the Uilora Component Library archives. It represents the structural integrity of our design system.
                            </p>
                            <div className="flex flex-col gap-2 font-mono text-sm text-cyan-500/70">
                                <span>DIMENSIONS: 4000x3000</span>
                                <span>RENDER: 8K NATIVE</span>
                                <span>STATUS: SECURE</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

// 7. FOOTER
export function EnhancedFooter() {
    return (
        <footer className="h-[80vh] bg-cyan-950 flex flex-col items-center justify-between text-center py-24 border-t border-cyan-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-800/20 via-transparent to-transparent"></div>

            <div className="relative z-10 flex flex-col items-center">
                <Box size={48} className="text-cyan-500 mb-8" />
                <p className="text-cyan-400 font-mono tracking-widest uppercase mb-4">Transmission Ended</p>
                <h2 className="text-[12vw] font-black uppercase leading-[0.8] text-white tracking-tighter">
                    Return <br /> <span className="text-cyan-500">Home</span>
                </h2>
            </div>

            <div className="relative z-10 flex gap-8 font-mono text-sm text-cyan-500/50 uppercase">
                <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">System Log</a>
            </div>
        </footer>
    );
}

// --- MAIN PAGE EXPORT ---
export interface DimensionsProps {
    heroTitle?: string;
    heroSubtitle?: string;
    shifterStatement?: string;
    images?: string[];
}

export default function DimensionsPage({
    heroTitle = "SPATIAL",
    heroSubtitle = "RE-ENGINEERING",
    shifterStatement = "We abandon the static vertical scroll to explore narrative through physical space and controlled pacing.",
    images = [
        "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1000&auto=format&fit=crop",
    ]
}: DimensionsProps = {}) {

    // Smooth Scrolling Setup inside the component
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, []);

    return (
        <div className="bg-[#050505] font-sans selection:bg-cyan-500 selection:text-black">
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between px-8 py-6 mix-blend-difference pointer-events-none">
                <span className="text-white font-bold tracking-widest text-xl">DIMENSIONS</span>
                <span className="text-white font-mono text-xs border border-white/20 px-3 py-1 rounded-full backdrop-blur-sm">SYS.V1</span>
            </nav>

            <main>
                <DimensionsHero title={heroTitle} subtitle={heroSubtitle} />
                <ParallaxMasonry images={images} />
                <DimensionShifter statement={shifterStatement} />
                <ExplodingBento images={images} />
                <InfiniteCards images={images} />
            </main>

            <EnhancedFooter />

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-50% - 1rem)); } 
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .transform-origin-bottom {
                    transform-origin: bottom center;
                }
            `}} />
        </div>
    );
}
