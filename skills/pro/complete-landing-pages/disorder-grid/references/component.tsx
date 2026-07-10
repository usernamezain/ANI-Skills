import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowDownRight, ArrowRight, Minus, Plus, MoveUpRight, Zap } from 'lucide-react';
import { cn } from "@/src/lib/utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- UTILS ---
export const SplitTextReveal = ({ text, className = "", delay = 0, trigger = true }: { text: string; className?: string, delay?: number, trigger?: boolean }) => {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = elRef.current;
        if (!el || !trigger) return;

        const chars = el.querySelectorAll('.split-char');
        gsap.fromTo(chars,
            { opacity: 0, y: 150, rotateZ: 15, scale: 0.8 },
            {
                opacity: 1, y: 0, rotateZ: 0, scale: 1,
                duration: 1.2, stagger: 0.04, ease: "power4.out", delay,
                scrollTrigger: { trigger: el, start: "top 90%" }
            }
        );
    }, [trigger, delay]);

    return (
        <div ref={elRef} className={cn("inline-block", className)} style={{ perspective: "1000px", overflow: 'hidden' }}>
            {text.split('').map((char, i) => (
                <span key={i} className="split-char opacity-0 inline-block transform-origin-bottom-left">
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </div>
    );
};

// --- COMPONENTS ---

// 1. GRID BACKGROUND (Visual base that we intentionally break)
export function DisorderedGridLines() {
    return (
        <div className="fixed inset-0 z-0 flex w-full justify-between px-4 opacity-[0.03] pointer-events-none mix-blend-difference">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="h-full w-px bg-black md:bg-white" />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,black_1px,transparent_1px)] md:bg-[linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:100%_10vh] opacity-50" />
        </div>
    );
}

// Framer Parallax Wrapper
export function ParallaxBlock({ children, className, speed = 1, scrollYProgress }: { children: React.ReactNode, className?: string, speed?: number, scrollYProgress: MotionValue<number> }) {
    const y = useTransform(scrollYProgress, [0, 1], [0, speed * 300]);
    const ySmooth = useSpring(y, { stiffness: 70, damping: 20 });

    return (
        <motion.div style={{ y: ySmooth }} className={className}>
            {children}
        </motion.div>
    );
}

// 2. DISPLACED HERO
function DisorderedHero({ title = "DISORDER", subtitle = "THE UILORA STANDARD", images, scrollYProgress }: { title?: string, subtitle?: string, images: string[], scrollYProgress: MotionValue<number> }) {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".hero-float", {
                y: -100,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
            gsap.from(".hero-line", {
                width: 0,
                duration: 1.5,
                ease: "power4.out",
                delay: 0.5
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full bg-[#EBE9E4] pt-32 px-4 md:px-12 overflow-hidden text-black z-10">
            
            {/* Background Parallax Images to fill the emptiness */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center gap-8 md:gap-24 opacity-60">
                <ParallaxBlock scrollYProgress={scrollYProgress} speed={-0.4} className="mt-[-20vh]">
                    <img src={images[4]} className="w-48 md:w-72 aspect-[3/4] object-cover grayscale blur-[1px]" />
                </ParallaxBlock>
                <ParallaxBlock scrollYProgress={scrollYProgress} speed={0.5} className="mt-[40vh]">
                    <img src={images[5]} className="w-56 md:w-96 aspect-square object-cover grayscale blur-[2px]" />
                </ParallaxBlock>
                <ParallaxBlock scrollYProgress={scrollYProgress} speed={-0.2} className="mt-[10vh] hidden md:block">
                    <img src={images[6]} className="w-64 aspect-video object-cover grayscale" />
                </ParallaxBlock>
            </div>

            <div className="absolute top-[30%] left-4 md:left-[10%] z-10 hero-float">
                <div className="text-sm font-bold tracking-widest uppercase mb-4 opacity-50 flex items-center gap-2">
                    <ArrowDownRight size={16} /> Welcome to the Anomaly
                </div>
                <h1 className="text-[18vw] md:text-[14vw] font-black leading-[0.75] tracking-tighter uppercase">
                    <SplitTextReveal text={title} delay={0.2} />
                </h1>
            </div>

            <div className="absolute top-[60%] right-4 md:right-[15%] z-20 text-right hero-float">
                <h2 className="text-[8vw] md:text-[6vw] font-black leading-[0.8] tracking-tighter mix-blend-difference text-black uppercase">
                    <SplitTextReveal text={subtitle} delay={0.8} />
                </h2>
                <div className="hero-line h-px bg-black w-full mt-4 origin-right"></div>
                <p className="mt-8 max-w-sm ml-auto text-sm md:text-base font-medium leading-relaxed uppercase tracking-widest opacity-60">
                    We intentionally shatter the grid to invoke raw emotion. A systematic rebellion built for the modern web.
                </p>
            </div>

            {/* Random floating elements */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute bottom-[20%] right-[10%] opacity-20 hero-float">
                <Zap size={120} strokeWidth={0.5} />
            </motion.div>
        </section>
    );
}

// 3. SCATTERED GALLERY
function ScatteredGallery({ images, scrollYProgress }: { images: string[], scrollYProgress: MotionValue<number> }) {
    return (
        <section className="relative z-20 mx-auto max-w-[1800px] px-4 py-32 bg-[#EBE9E4] text-black">
            <div className="mb-32 flex flex-col md:flex-row items-end border-b border-black pb-8">
                <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter">
                    Visual <br /> Entropy.
                </h2>
                <p className="md:ml-auto max-w-md font-medium text-lg uppercase tracking-widest opacity-50 mt-8 md:mt-0">
                    Uilora component logic dictates that structure arises from tension.
                </p>
            </div>

            <div className="grid grid-cols-12 gap-y-32 md:gap-x-8 mt-24">
                {/* Item 1 */}
                <div className="col-span-12 md:col-span-5 md:col-start-2 relative group cursor-pointer z-10">
                    <ParallaxBlock scrollYProgress={scrollYProgress} speed={0.4}>
                        <div className="mb-4 text-xs font-bold uppercase tracking-widest flex items-center justify-between border-b border-black/20 pb-2">
                            <span>Ref. 01 / Distortion</span>
                            <MoveUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                        </div>
                        <div className="overflow-hidden">
                            <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} src={images[0]} className="aspect-[4/5] object-cover w-full grayscale group-hover:grayscale-0 transition-all duration-700" />
                        </div>
                    </ParallaxBlock>
                </div>

                {/* Item 2 */}
                <div className="col-span-12 md:col-span-4 md:col-start-8 md:-mt-48 relative group cursor-pointer z-20">
                    <ParallaxBlock scrollYProgress={scrollYProgress} speed={-0.3}>
                        <div className="overflow-hidden p-4 bg-white shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-500">
                            <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} src={images[1]} className="aspect-square object-cover w-full" />
                            <div className="mt-4 text-[0.65rem] font-bold uppercase tracking-widest text-center">Uilora Asset Library</div>
                        </div>
                    </ParallaxBlock>
                </div>

                {/* Text Block Mid */}
                <div className="col-span-12 md:col-span-6 md:col-start-4 py-32 text-center mix-blend-difference text-[#EBE9E4] z-30 pointer-events-none">
                    <ParallaxBlock scrollYProgress={scrollYProgress} speed={0.6}>
                        <h3 className="text-5xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter">
                            Break <br/> Alignments
                        </h3>
                    </ParallaxBlock>
                </div>

                {/* Item 3 */}
                <div className="col-span-12 md:col-span-6 md:col-start-1 md:-mt-32 relative group cursor-pointer z-10">
                    <ParallaxBlock scrollYProgress={scrollYProgress} speed={0.2}>
                         <div className="overflow-hidden">
                            <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} src={images[2]} className="aspect-video object-cover w-full filter contrast-125 saturate-0 group-hover:saturate-100 transition-all duration-700" />
                        </div>
                        <div className="mt-4 text-xs font-bold uppercase tracking-widest">Ref. 03 / The Void</div>
                    </ParallaxBlock>
                </div>

                {/* Item 4 */}
                <div className="col-span-12 md:col-span-4 md:col-start-8 relative group cursor-pointer z-0">
                    <ParallaxBlock scrollYProgress={scrollYProgress} speed={0.8}>
                         <div className="overflow-hidden border border-black p-2">
                            <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} src={images[3]} className="aspect-[3/4] object-cover w-full opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </ParallaxBlock>
                </div>
            </div>
        </section>
    );
}

// 4. KINETIC MARQUEE
function TensionMarquee() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".marquee-inner", {
                xPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2,
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-black overflow-hidden flex items-center border-y-2 border-white/20 z-20 relative">
            <div className="marquee-inner flex whitespace-nowrap text-white">
                {[...Array(3)].map((_, i) => (
                    <h2 key={i} className="text-[12vw] font-black uppercase tracking-tighter px-12 opacity-80 hover:opacity-100 transition-opacity cursor-default">
                        Tension <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>Creates</span> Focus <span className="text-xl align-top">&copy;</span>
                    </h2>
                ))}
            </div>
        </section>
    );
}

// 5. MANIFESTO (Staggered Scroll Text)
function TheManifesto({ statement }: { statement: string }) {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const words = (textRef.current as unknown as HTMLElement).querySelectorAll('.word');
            gsap.fromTo(words, 
                { opacity: 0.1, y: 20 },
                {
                    opacity: 1, y: 0,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: true
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen bg-[#EBE9E4] text-black px-4 md:px-24 flex items-center justify-center relative z-20">
            <div className="absolute top-24 left-12 text-xs font-bold uppercase tracking-widest border border-black px-4 py-1 rounded-full">
                Uilora Manifesto
            </div>

            <h3 ref={textRef} className="text-5xl md:text-8xl font-black uppercase leading-[1.1] tracking-tighter max-w-6xl">
                {statement.split(' ').map((word, i) => (
                    <span key={i} className="word inline-block mr-4 md:mr-8 mb-4">
                        {word}
                    </span>
                ))}
            </h3>
        </section>
    );
}

// 6. GRID BREAKER FOOTER
function GridBreakerFooter() {
    return (
        <footer className="relative min-h-screen bg-[#111] text-white overflow-hidden p-8 md:p-12 z-30 flex flex-col justify-between">
            <div className="absolute inset-0 bg-[#0a0a0a] z-0" style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0% 100%)' }}></div>
            
            <div className="relative z-10 flex justify-between items-start mt-32 md:mt-24">
                <div className="font-mono text-sm tracking-widest uppercase opacity-50 flex flex-col gap-2">
                    <span>[ END OF GRID ]</span>
                    <span>SYS.UILORA</span>
                </div>
                <div className="flex gap-4">
                    <div className="h-6 w-6 bg-white rounded-full animate-bounce" />
                    <div className="h-6 w-6 border border-white rounded-full" />
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 mt-auto pb-12">
                <div className="md:col-span-8">
                    <h2 className="text-[15vw] md:text-[8vw] leading-[0.8] font-black tracking-tighter uppercase whitespace-nowrap hover:italic transition-all duration-300">
                        NEXT <br /> PROJECT
                    </h2>
                </div>
                
                <div className="md:col-span-4 flex flex-col justify-end items-start md:items-end gap-6 border-t md:border-t-0 border-white/20 pt-8 md:pt-0">
                    <p className="text-sm font-light uppercase tracking-widest text-white/60 max-w-xs md:text-right mb-4">
                        We build components that refuse to be ignored. Join the rebellion.
                    </p>
                    <button className="group relative flex items-center justify-center gap-4 text-xl font-bold uppercase px-8 py-4 bg-white text-black hover:bg-transparent hover:text-white border border-white transition-all duration-500 rounded-full w-full md:w-auto">
                        <span className="relative z-10">Initiate Sequence</span> 
                        <ArrowRight className="transition-transform group-hover:translate-x-2 relative z-10" />
                    </button>
                    <div className="flex gap-8 text-sm font-bold uppercase tracking-widest mt-4 underline decoration-white/20 underline-offset-8">
                        <a href="#" className="hover:text-white/50">Instagram</a>
                        <a href="#" className="hover:text-white/50">Twitter</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}


// --- MAIN PAGE EXPORT ---
export interface DisorderedGridProps {
    heroTitle?: string;
    heroSubtitle?: string;
    manifestoStatement?: string;
    images?: string[];
}

export default function DisorderedGridPage({
    heroTitle = "DISORDER",
    heroSubtitle = "THE UILORA STANDARD",
    manifestoStatement = "We reject the twelve column safety net. We embrace the erratic error. We build components for brutal impact.",
    images = [
        "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1000&auto=format&fit=crop"
    ]
}: DisorderedGridProps = {}) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

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
        <div ref={containerRef} className="bg-[#EBE9E4] font-sans selection:bg-black selection:text-[#EBE9E4] relative min-h-screen">
            <DisorderedGridLines />
            
            <main className="relative z-10 w-full overflow-hidden">
                <DisorderedHero title={heroTitle} subtitle={heroSubtitle} images={images} scrollYProgress={scrollYProgress} />
                <ScatteredGallery images={images} scrollYProgress={scrollYProgress} />
                <TensionMarquee />
                <TheManifesto statement={manifestoStatement} />
            </main>

            <GridBreakerFooter />
        </div>
    );
}
