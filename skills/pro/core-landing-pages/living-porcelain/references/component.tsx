'use client';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, ContactShadows, Environment, Float } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Mesh } from 'three';

// 3D Sculpture Component
export function MorphingBlob() {
    const materialRef = useRef<Mesh>(null);
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHover] = useState(false);
    const mousePos = useRef({ x: 0, y: 0 });
    const targetDistort = useRef(0.4);

    useFrame(({ mouse, clock }) => {
        const velocityX = Math.abs(mouse.x - mousePos.current.x);
        const velocityY = Math.abs(mouse.y - mousePos.current.y);
        const speed = Math.min(velocityX + velocityY, 1);

        mousePos.current = { x: mouse.x, y: mouse.y };

        const target = hovered ? 1.0 : 0.4 + (speed * 5);
        targetDistort.current = THREE.MathUtils.lerp(targetDistort.current, target, 0.05);

        if (materialRef.current) {
            (materialRef.current as any).distort = targetDistort.current;
            (materialRef.current as any).speed = 2 + (speed * 10);
        }

        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() / 4);
            meshRef.current.rotation.y = Math.cos(clock.getElapsedTime() / 4);
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere
                ref={meshRef}
                args={[1, 64, 64]}
                scale={2.2}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <MeshDistortMaterial
                    ref={materialRef as any}
                    color="#d1cdbc"
                    roughness={0.2}
                    metalness={0.1}
                    radius={1}
                    distort={0.4}
                />
            </Sphere>
        </Float>
    );
};

// Noise Overlay Component
export function NoiseOverlay() {
    return (
        <div className="fixed inset-0 pointer-events-none z-30 opacity-[0.04] mix-blend-overlay">
            <svg className="w-full h-full">
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    );
};

// Main Combined Component
export default function LivingPorcelain() {
    const reveal = {
        hidden: { y: "100%", opacity: 0 },
        show: { y: "0%", opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
    };

    const lineDraw = {
        hidden: { scaleX: 0 },
        show: { scaleX: 1, transition: { duration: 1.5, delay: 0.5, ease: "easeInOut" } }
    };

    return (
        <div className="relative w-full h-screen bg-[#E8E6D9]">
            {/* 3D Sculpture Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
                    <directionalLight position={[-10, -10, -5]} intensity={1} color="#ffecd1" />

                    <MorphingBlob />

                    <ContactShadows
                        resolution={512}
                        scale={20}
                        blur={2.5}
                        opacity={0.4}
                        far={10}
                        color="#5c5c50"
                    />

                    <Environment preset="city" />
                </Canvas>
            </div>

            {/* Noise Overlay */}
            <NoiseOverlay />

            {/* Editorial Overlay UI */}
            <main className="relative z-10 w-full h-screen p-8 md:p-12 flex flex-col justify-between pointer-events-none mix-blend-multiply text-[#1a1a1a]">
                {/* Top Section */}
                <div className="flex justify-between items-start w-full">
                    <div className="overflow-hidden">
                        <motion.h2 variants={reveal as any} initial="hidden" animate="show" className="font-serif text-3xl italic">
                            Volume .02
                        </motion.h2>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 } as any} className="h-[1px] w-24 bg-black/20" />
                        <span className="font-mono text-xs uppercase tracking-widest opacity-60">Sculptural UI</span>
                    </div>
                </div>

                {/* Center - Left Floating Text */}
                <div className="absolute top-1/2 left-12 -translate-y-1/2 hidden md:block">
                    <div className="overflow-hidden h-20">
                        <motion.h1
                            variants={reveal as any}
                            initial="hidden"
                            animate="show"
                            className="font-serif text-8xl md:text-9xl leading-[0.8]"
                        >
                            Raw
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden h-20">
                        <motion.h1
                            variants={reveal as any}
                            initial="hidden"
                            animate="show"
                            transition={{ delay: 0.1 }}
                            className="font-serif text-8xl md:text-9xl leading-[0.8] ml-16 italic"
                        >
                            Matter
                        </motion.h1>
                    </div>
                </div>

                {/* Decorative Horizontal Line */}
                <motion.div
                    variants={lineDraw as any}
                    initial="hidden"
                    animate="show"
                    className="absolute top-1/2 left-0 w-full h-[1px] bg-black/10 -z-10 origin-left"
                />

                {/* Bottom Section */}
                <div className="flex justify-between items-end w-full">
                    <div className="max-w-xs space-y-4">
                        <p className="font-mono text-xs leading-relaxed opacity-70">
                            / DESIGN PHILOSOPHY<br />
                            We explore the boundary between digital perfection and organic chaos.
                            Interact to disturb the equilibrium.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="pointer-events-auto px-6 py-3 border border-black/20 rounded-none bg-transparent font-serif text-sm uppercase tracking-wider hover:bg-[#1a1a1a] hover:text-[#E8E6D9] transition-all duration-300"
                        >
                            View Collection
                        </motion.button>
                    </div>

                    <div className="text-right overflow-hidden">
                        <motion.h3
                            variants={reveal as any}
                            initial="hidden"
                            animate="show"
                            transition={{ delay: 0.2 }}
                            className="font-serif text-5xl md:text-7xl"
                        >
                            2024
                        </motion.h3>
                    </div>
                </div>
            </main>
        </div>
    );
}
