'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Minus } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    MeshDistortMaterial,
    Environment,
    Float,
    ContactShadows,
    Lightformer
} from '@react-three/drei';
import * as THREE from 'three';

// --- 3D Component: The Living Stone ---
function MarbleStone() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Slow, heavy rotation to simulate mass
        meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    });

    return (
        <Float floatIntensity={1} rotationIntensity={0.2} speed={1.5}>
            <mesh ref={meshRef} scale={1.8}>
                {/* Icosahedron gives us a nice geometric base that gets smoothed out */}
                <icosahedronGeometry args={[1, 64]} />

                {/* 
           THE MARBLE SHADER LOGIC:
           - Color: Almost black (#080808)
           - Roughness: 0.1 (Very polished, like wet stone)
           - Metalness: 0.8 (Gives it that deep, reflective obsidian look)
           - Distort: 0.3 (Makes it ripple like liquid stone)
        */}
                <MeshDistortMaterial
                    color="#080808"
                    roughness={0.15}
                    metalness={0.9}
                    distort={0.3}
                    speed={1.5}
                    bumpScale={0.01}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </mesh>
        </Float>
    );
}

// --- 3D Scene Wrapper ---
export function Scene() {
    return (
        <Canvas camera={{ position: [0, 0, 6], fov: 35 }} gl={{ antialias: true }}>
            <color attach="background" args={['#050505']} />

            {/* 
        Lighting is CRITICAL for the marble look.
        We need sharp white reflections to simulate "veins".
      */}
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#fff" />

            {/* Environment map acts as the reflection source */}
            <Environment resolution={512}>
                <group rotation={[-Math.PI / 4, -0.3, 0]}>
                    <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                    <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
                    <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[10, 2, 1]} />
                    <Lightformer intensity={4} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 10, 1]} />
                </group>
            </Environment>

            <MarbleStone />

            <ContactShadows resolution={512} scale={20} blur={2} opacity={0.5} far={10} color="#000" />
        </Canvas>
    );
}

// --- Main Hero Component ---
export default function Marble() {

    useEffect(() => {
        const tl = gsap.timeline();

        // 1. Reveal Horizontal Lines
        tl.to('.grid-line', {
            scaleX: 1,
            duration: 1.5,
            ease: 'expo.inOut',
            stagger: 0.2
        });

        // 2. Reveal Typography
        tl.fromTo('.hero-char',
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.05, ease: 'power3.out' },
            '-=1'
        );

        // 3. Reveal Details
        tl.fromTo('.fade-up',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 },
            '-=0.5'
        );
    }, []);

    return (
        <main className="relative h-screen w-full overflow-hidden bg-[#050505] text-[#e5e5e5]">

            {/* Load Fonts */}
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Manrope:wght@200;400;600&display=swap');
        .font-stone { font-family: 'Cinzel', serif; }
        .font-sans { font-family: 'Manrope', sans-serif; }
      `}</style>

            {/* 3D Canvas Layer */}
            <div className="absolute inset-0 z-0 opacity-80">
                <Scene />
            </div>

            {/* Grain Overlay (Texture) */}
            <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.07]"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

            {/* Grid Lines */}
            <div className="absolute top-24 left-0 w-full px-12 z-20 hidden md:block">
                <div className="grid-line h-[1px] w-full origin-left scale-x-0 bg-white/10" />
            </div>
            <div className="absolute bottom-24 left-0 w-full px-12 z-20 hidden md:block">
                <div className="grid-line h-[1px] w-full origin-right scale-x-0 bg-white/10" />
            </div>

            {/* Main Content */}
            <div className="relative z-30 flex h-full w-full flex-col justify-between px-6 py-8 md:px-12 md:py-12">

                {/* Navbar */}
                <nav className="flex items-center justify-between fade-up">
                    <div className="text-lg sm:text-xl md:text-2xl font-stone tracking-widest text-white">LITHOS.</div>
                    <div className="hidden gap-6 sm:gap-8 md:gap-12 font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 sm:flex">
                        <a href="#" className="hover:text-white transition-colors">Sculptures</a>
                        <a href="#" className="hover:text-white transition-colors">Interiors</a>
                        <a href="#" className="hover:text-white transition-colors">Legacy</a>
                    </div>
                    <button className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                        <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    </button>
                </nav>

                {/* Hero Title - Centered & Massive */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center mix-blend-exclusion pointer-events-none">
                    <h1 className="font-stone text-6xl md:text-8xl lg:text-9xl text-white leading-none">
                        {/* Split text for GSAP animation */}
                        <div className="overflow-hidden inline-flex">
                            {"ETERNAL".split('').map((char, i) => (
                                <span key={i} className="hero-char block">{char}</span>
                            ))}
                        </div>
                        <br />
                        <div className="overflow-hidden inline-flex">
                            {"FORM".split('').map((char, i) => (
                                <span key={`l-${i}`} className="hero-char block text-transparent" style={{ WebkitTextStroke: '1px white' }}>{char}</span>
                            ))}
                        </div>
                    </h1>
                </div>

                {/* Footer Details */}
                <div className="flex items-end justify-between fade-up">

                    <div className="hidden max-w-xs flex-col gap-4 md:flex">
                        <span className="font-sans text-[10px] uppercase tracking-widest text-white/40">Materiality</span>
                        <p className="font-sans text-sm font-light leading-relaxed text-neutral-400">
                            Sourced from the deepest quarries of Northern Italy.
                            Polished to a mirror finish, reflecting the passage of time.
                        </p>
                    </div>

                    <div className="hidden max-w-xs flex-col items-end gap-2 text-right md:flex">
                        <span className="font-stone text-4xl">1984</span>
                        <span className="font-sans text-[10px] uppercase tracking-widest text-white/40">Establishment</span>
                    </div>
                </div>

            </div>
        </main>
    );
}
