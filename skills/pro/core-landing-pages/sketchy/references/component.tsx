'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Github } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Edges } from '@react-three/drei';
import * as THREE from 'three';

// --- Component: SVG Scribble Underline ---
export function ScribbleLine() {
    return (
    <svg className="absolute -bottom-4 left-0 w-full h-6 overflow-visible" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            id="scribble-path"
            d="M2.00025 7.00001C35.9185 3.3283 103.882 -1.4878 197.001 3.50001"
            stroke="#4f46e5"
            strokeWidth="3"
            strokeLinecap="round"
            className="opacity-0"
        />
    </svg>
);
}

// --- 3D Component: The Sketchy Shapes ---
function SketchyShape({ position, rotation, type }: { position: [number, number, number], rotation: [number, number, number], type: 'box' | 'cone' | 'sphere' }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        // Jittery animation to simulate "boiling" lines in hand-drawn animation
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef} position={position} rotation={rotation} scale={1.2}>
                {type === 'box' && <boxGeometry />}
                {type === 'cone' && <coneGeometry args={[1, 1.5, 4]} />}
                {type === 'sphere' && <icosahedronGeometry args={[0.8, 1]} />}

                {/* The "Paper" Material */}
                <meshStandardMaterial color="#ffffff" roughness={1} toneMapped={false} polygonOffset polygonOffsetFactor={1} />

                {/* The "Pencil" Outline */}
                <Edges
                    scale={1}
                    threshold={15} // Angle threshold to draw lines
                    color="#2d2d2d"
                >
                    <meshBasicMaterial transparent opacity={1} side={THREE.DoubleSide} />
                </Edges>
            </mesh>
        </Float>
    );
}

// --- 3D Scene Wrapper ---
export function Scene() {
    return (
        <Canvas orthographic camera={{ zoom: 50, position: [0, 0, 10] }}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            {/* Floating Sketch Objects */}
            <SketchyShape type="box" position={[-4, 2, 0]} rotation={[0.5, 0.5, 0]} />
            <SketchyShape type="cone" position={[5, -1, 0]} rotation={[0, 0, 0.5]} />
            <SketchyShape type="sphere" position={[-3, -3, -2]} rotation={[0, 0, 0]} />

        </Canvas>
    );
}

// --- Main Hero Component ---
export default function Sketchy2() {
    useEffect(() => {
        const tl = gsap.timeline();

        // 1. Text Typewriter / Fade
        tl.from('.hand-text', {
            y: 50,
            opacity: 0,
            rotate: 5,
            duration: 1,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        });

        // 2. Draw the squiggle line
        const path = document.querySelector('#scribble-path') as SVGPathElement;
        if (path) {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
            tl.to(path, {
                strokeDashoffset: 0,
                duration: 0.8,
                ease: 'power2.inOut'
            }, "-=0.5");
        }

        // 3. Pop in buttons
        tl.from('.sketch-btn', {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'elastic.out(1, 0.5)'
        });

    }, []);

    return (
        <main className="relative h-screen w-full overflow-hidden bg-[#f3f0e8] text-[#2d2d2d] selection:bg-yellow-200">

            {/* Load Google Fonts for that sketchy look */}
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Permanent+Marker&display=swap');
        
        .font-marker { font-family: 'Permanent Marker', cursive; }
        .font-hand { font-family: 'Patrick Hand', cursive; }
        
        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
        }
      `}</style>

            {/* Background Texture */}
            <div className="absolute inset-0 z-0 paper-texture pointer-events-none" />

            {/* Grid Pattern (Notebook style) */}
            <div className="absolute inset-0 z-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(#2d2d2d 1px, transparent 1px)', backgroundSize: '30px 30px' }}
            />

            {/* 3D Scene Background */}
            <div className="absolute inset-0 z-10">
                <Scene />
            </div>

            {/* UI Content */}
            <div className="relative z-20 flex h-full w-full flex-col items-center justify-center p-6">

                {/* Navigation */}
                <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-4 sm:p-6 md:p-8 font-hand text-base sm:text-lg md:text-xl">
                    <div className="flex gap-1.5 sm:gap-2 items-center">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-black rounded-full text-white flex items-center justify-center font-bold text-sm sm:text-base">D</div>
                        <span className="text-sm sm:text-base md:text-lg">doodle.io</span>
                    </div>
                    <div className="hidden sm:flex gap-4 md:gap-6 lg:gap-8 text-sm sm:text-base md:text-lg">
                        <a href="#" className="hover:underline decoration-wavy decoration-indigo-500">Work</a>
                        <a href="#" className="hover:underline decoration-wavy decoration-indigo-500">Process</a>
                        <a href="#" className="hover:underline decoration-wavy decoration-indigo-500">Pricing</a>
                    </div>
                    <button className="border-2 border-black px-3 py-0.5 sm:px-4 sm:py-1 text-xs sm:text-sm md:text-base rounded-full hover:bg-black hover:text-white transition-colors">
                        Log In
                    </button>
                </nav>

                {/* Main Hero Text */}
                <div className="text-center flex flex-col items-center max-w-4xl">
                    <div className="hand-text mb-4 inline-block -rotate-2 rounded-sm bg-yellow-300 px-4 py-1 font-hand text-xl font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)] border border-black">
                        ✏️ Hand-crafted in Code
                    </div>

                    <h1 className="font-marker text-6xl md:text-8xl lg:text-9xl leading-tight">
                        <span className="hand-text block">Rough Ideas.</span>
                        <span className="relative hand-text block mt-2">
                            <span className="relative z-10 text-indigo-600">Real Impact</span>
                            <ScribbleLine />
                        </span>
                    </h1>

                    <p className="hand-text font-hand mt-8 max-w-lg text-2xl text-neutral-600">
                        We turn back-of-the-napkin sketches into production-ready software.
                        No magic, just hard work and good ink.
                    </p>

                    {/* Action Area */}
                    <div className="mt-12 flex flex-wrap justify-center gap-6">
                        <button className="sketch-btn group relative px-8 py-4 font-hand text-2xl font-bold text-white transition-transform active:scale-95">
                            {/* Imperfect CSS Blob Button */}
                            <div className="absolute inset-0 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-2 border-black bg-black shadow-[4px_4px_0px_rgba(0,0,0,0.2)] transition-all group-hover:shadow-[8px_8px_0px_rgba(0,0,0,0.2)] group-hover:-translate-y-1"></div>
                            <span className="relative">Start Sketching</span>
                        </button>

                        <button className="sketch-btn group relative px-8 py-4 font-hand text-2xl font-bold text-black transition-transform active:scale-95">
                            <div className="absolute inset-0 rounded-[15px_225px_15px_255px/255px_15px_225px_15px] border-2 border-black bg-white shadow-[4px_4px_0px_rgba(0,0,0,0.1)] transition-all group-hover:bg-yellow-100"></div>
                            <span className="relative flex items-center gap-2">
                                <Github className="w-5 h-5" />
                                <span>Source Code</span>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Bottom Doodle Arrow */}
                <div className="absolute bottom-10 animate-bounce">
                    <ArrowDown className="w-8 h-8 text-black" />
                </div>
            </div>
        </main>
    );
}
