import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Github, Zap, Shield, Cpu, Layers } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Lenis from 'lenis';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// --- Animated Sphere (R3F) ---
const AnimatedSphere = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        meshRef.current.rotation.x = t * 0.1;
        meshRef.current.rotation.y = t * 0.15;
        const mouseX = state.mouse.x * 0.5;
        const mouseY = state.mouse.y * 0.5;
        meshRef.current.rotation.x += (mouseY - meshRef.current.rotation.x) * 0.05;
        meshRef.current.rotation.y += (mouseX - meshRef.current.rotation.y) * 0.05;
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <Sphere args={[1, 100, 100]} scale={1.8} ref={meshRef}>
                <MeshDistortMaterial
                    color="#1a1a1a"
                    attach="material"
                    distort={0.5}
                    speed={2}
                    roughness={0.2}
                    metalness={0.9}
                />
            </Sphere>
        </Float>
    );
};

export function Scene() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full opacity-60">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#6366f1" />
                <AnimatedSphere />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}

function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        gsap.set([titleRef.current, subRef.current, btnRef.current], {
            y: 50,
            opacity: 0,
        });

        tl.to(titleRef.current, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: 0.2,
        })
            .to(subRef.current, { y: 0, opacity: 1, duration: 1, }, '-=0.8')
            .to(btnRef.current, { y: 0, opacity: 1, duration: 1, }, '-=0.8');
    }, []);

    return (
        <section ref={containerRef} className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505] text-white">
            <Scene />
            <div className="relative z-10 flex max-w-5xl flex-col items-center px-6 text-center">
                <div className="mb-8 overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                    <span className="inline-block px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-indigo-400">
                        v2.0 Now Available
                    </span>
                </div>
                <h1 ref={titleRef} className="text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl mix-blend-difference opacity-0">
                    RESHAPE <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">REALITY</span>
                </h1>
                <p ref={subRef} className="mt-8 max-w-xl text-lg text-neutral-400 md:text-xl font-light opacity-0">
                    A curated collection of 25 production-ready hero sections.
                    Crafted with Next.js, Three.js, and pure obsession.
                </p>
                <div ref={btnRef} className="mt-10 flex flex-col gap-4 sm:flex-row opacity-0">
                    <button className="group relative flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-black transition-all hover:bg-neutral-200 active:scale-95">
                        <span className="font-semibold">Get Access</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <button className="group flex items-center justify-center gap-2 rounded-full border border-white/10 bg-transparent px-8 py-4 text-white transition-all hover:bg-white/5 active:scale-95">
                        <Github className="h-4 w-4 text-neutral-400 group-hover:text-white" />
                        <span className="font-medium">Star on Repo</span>
                    </button>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
        </section>
    );
}

// --- Glass Navbar ---
function GlassNavbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[90%] max-w-4xl rounded-full border border-white/10 bg-black/20 px-6 py-4 backdrop-blur-xl supports-[backdrop-filter]:bg-white/5"
        >
            <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-sm font-bold tracking-widest text-white uppercase">Void</span>
            </div>
            <div className="hidden md:flex gap-8 text-xs font-medium uppercase tracking-widest text-neutral-400">
                <a href="#" className="hover:text-white transition-colors">Vision</a>
                <a href="#" className="hover:text-white transition-colors">Ecosystem</a>
                <a href="#" className="hover:text-white transition-colors">Metrics</a>
            </div>
            <button className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
                Enter Void
            </button>
        </motion.nav>
    );
}

// --- Animated Text Reveal ---
function TextRevealSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20%" });

    return (
        <section className="relative flex min-h-screen items-center justify-center bg-[#050505] py-24 px-6">
            <div className="max-w-4xl text-center" ref={ref}>
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-6xl font-light leading-tight tracking-tight text-white"
                >
                    <span className="text-neutral-500">We forge interfaces that don't just sit there.</span> <br />
                    They breathe. They react. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-bold">They remember you.</span>
                </motion.h2>
            </div>
        </section>
    );
}

// --- Bento Grid Features ---
function FeaturesBento() {
    const features = [
        { title: "Kinetic Engines", span: "col-span-1 md:col-span-2", icon: <Cpu className="h-6 w-6 text-indigo-400" /> },
        { title: "Neural Links", span: "col-span-1", icon: <Zap className="h-6 w-6 text-purple-400" /> },
        { title: "Zero Latency", span: "col-span-1", icon: <Shield className="h-6 w-6 text-emerald-400" /> },
        { title: "Quantum States", span: "col-span-1 md:col-span-2", icon: <Layers className="h-6 w-6 text-blue-400" /> },
    ];

    return (
        <section className="py-32 px-6 bg-[#050505]">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Core Architecture.</h2>
                    <p className="text-neutral-400 max-w-xl text-lg">Built on a foundation of unstable matter and high-performance WebGL.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-all ${f.span}`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <div className="mb-6 p-3 bg-white/5 rounded-2xl inline-block backdrop-blur-sm border border-white/10">
                                    {f.icon}
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-2">{f.title}</h3>
                                <p className="text-neutral-400">Harnessing the raw power of the browser to deliver 60fps cinematic experiences.</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Parallax Metrics ---
function MetricsParallax() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    return (
        <section ref={ref} className="relative py-48 bg-[#050505] overflow-hidden border-y border-white/5">
            {/* Background noise/grid */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                <motion.div style={{ y: y1 }} className="space-y-12">
                    <div>
                        <div className="text-7xl md:text-8xl font-black text-white mix-blend-difference tracking-tighter">1.2ms</div>
                        <div className="text-indigo-400 font-mono text-sm uppercase tracking-widest mt-2 border-l border-indigo-400 pl-4">Average Paint Time</div>
                    </div>
                    <div>
                        <div className="text-7xl md:text-8xl font-black text-white mix-blend-difference tracking-tighter">60fps</div>
                        <div className="text-purple-400 font-mono text-sm uppercase tracking-widest mt-2 border-l border-purple-400 pl-4">Frame Rate Lock</div>
                    </div>
                </motion.div>

                <motion.div style={{ y: y2 }} className="hidden md:flex justify-end">
                    <div className="w-72 h-72 rounded-full border border-white/10 flex items-center justify-center relative shadow-[0_0_100px_rgba(99,102,241,0.1)]">
                        <div className="absolute inset-0 rounded-full border border-indigo-500/30 animate-ping [animation-duration:3s]" />
                        <div className="w-48 h-48 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/5">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 blur-xl opacity-50" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// --- Infinite Marquee ---
function InfiniteMarquee() {
    return (
        <section className="py-24 bg-[#050505] overflow-hidden border-b border-white/5">
            <div className="flex whitespace-nowrap opacity-10">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                    className="flex gap-16 px-8 text-8xl font-black uppercase tracking-tighter text-white"
                >
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-16">
                            <span>LIMITLESS</span>
                            <span>•</span>
                            <span className="text-transparent text-stroke-white text-stroke-1 text-white">PERFORMANCE</span>
                            <span>•</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// --- Premium Footer ---
function PremiumFooter() {
    return (
        <footer className="bg-[#050505] pt-32 pb-12 px-6 overflow-hidden relative border-t border-white/10">
            {/* Massive background text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none">
                <span className="text-[20vw] font-black uppercase tracking-tighter text-white/[0.02]">KINETIC</span>
            </div>

            <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
                <div className="w-full h-px bg-white/10 my-24" />

                <div className="w-full flex flex-col md:flex-row justify-between items-center text-sm font-medium text-neutral-500 tracking-wider uppercase">
                    <p>© 2026 Uilora Kinetic Systems.</p>
                    <div className="flex gap-8 mt-6 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">GitHub</a>
                        <a href="#" className="hover:text-white transition-colors">Discord</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// --- MAIN WRAPPER COMPONENT ---
export default function KineticVoidPage() {
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
        <div className="min-h-screen bg-[#050505] selection:bg-indigo-500/30 selection:text-white antialiased">
            <GlassNavbar />
            <main>
                <Hero />
                <TextRevealSection />
                <FeaturesBento />
                <MetricsParallax />
                <InfiniteMarquee />
            </main>
            <PremiumFooter />
        </div>
    );
}
