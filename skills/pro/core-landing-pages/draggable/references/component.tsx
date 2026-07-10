'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square, Play, SkipForward, Disc, Smile, Star, MousePointer2 } from 'lucide-react';

// --- Local cn utility to avoid import dependencies ---
const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

// --- Draggable Item Wrapper ---
export function DragItem({
    children,
    className,
    initialX = 0,
    initialY = 0,
    constraintsRef
}: {
    children: React.ReactNode,
    className?: string,
    initialX?: number,
    initialY?: number,
    constraintsRef: React.RefObject<HTMLDivElement>
}) {
    const [zIndex, setZIndex] = useState(1);

    return (
        <motion.div
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            dragMomentum={false} // Stops it from sliding like ice
            whileHover={{ scale: 1.05, cursor: 'grab' }}
            whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 100, rotate: Math.random() * 10 - 5 }}
            onDragStart={() => setZIndex(100)}
            onDragEnd={() => setZIndex(Math.floor(Math.random() * 10) + 1)} // Settle back down
            initial={{ x: initialX, y: initialY }}
            className={cn("absolute touch-none", className)}
            style={{ zIndex }}
        >
            {children}
        </motion.div>
    );
}

// --- Sub-Components (The Toys) ---

// 1. Retro OS Window
export function RetroWindow({ title, color, children, rotation = 0 }: any) {
    return (
        <div
            className={cn("w-64 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]", color)}
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            <div className="flex items-center justify-between border-b-2 border-black bg-black px-2 py-1 text-white">
                <span className="font-mono text-xs font-bold uppercase">{title}</span>
                <div className="flex gap-1">
                    <Minus size={12} />
                    <Square size={10} />
                    <X size={12} />
                </div>
            </div>
            <div className="p-4 font-mono text-sm font-bold text-black">
                {children}
            </div>
        </div>
    );
}

// 2. Music Player Widget
export function MusicPlayer() {
    return (
        <div className="flex w-72 flex-col items-center gap-4 border-2 border-black bg-[#FFDC58] p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-3">
            <div className="flex w-full items-center gap-4 border-2 border-black bg-white p-3">
                <div className="animate-[spin_8s_linear_infinite] rounded-full border-2 border-black bg-black p-1 text-white">
                    <Disc size={24} />
                </div>
                <div className="overflow-hidden">
                    <div className="whitespace-nowrap font-mono text-xs font-bold uppercase">
                        Now Playing: Creative_Chaos.mp3
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-between gap-2">
                <button className="flex-1 border-2 border-black bg-white py-2 hover:bg-black hover:text-white"><Play size={16} className="mx-auto" /></button>
                <button className="flex-1 border-2 border-black bg-white py-2 hover:bg-black hover:text-white"><SkipForward size={16} className="mx-auto" /></button>
            </div>
        </div>
    );
}

// 3. Sticker Badge
export function Sticker({ text, color, rotate }: any) {
    return (
        <div
            className={cn("flex h-32 w-32 items-center justify-center rounded-full border-2 border-black p-4 text-center text-sm font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]", color)}
            style={{ transform: `rotate(${rotate}deg)` }}
        >
            {text}
        </div>
    );
}

// 4. Polaroid Photo
export function Polaroid({ src, caption, rotate }: any) {
    return (
        <div
            className="w-56 bg-white p-3 pb-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.2)] transition-shadow hover:shadow-[15px_15px_0px_0px_rgba(0,0,0,0.2)]"
            style={{ transform: `rotate(${rotate}deg)` }}
        >
            <div className="aspect-square w-full bg-gray-200 border-2 border-black mb-2 overflow-hidden">
                <img src={src} alt="Polaroid" className="h-full w-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all" />
            </div>
            <div className="text-center text-xl font-bold text-black" style={{ fontFamily: 'cursive' }}>
                {caption}
            </div>
        </div>
    );
}

// --- Main Page ---
export default function PlaygroundPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <main
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-[#e0e0e0] cursor-crosshair selection:bg-pink-500"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-10"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />

            {/* Static top alert */}
            <div className="absolute top-10 right-10 flex gap-4 pointer-events-none z-0">
                <div className="bg-black text-white px-4 py-2 font-mono text-sm">TRY DRAGGING EVERYTHING</div>
            </div>

            {/* Draggable Logo */}
            <DragItem constraintsRef={containerRef} initialX={40} initialY={40}>
                <div className="flex items-center gap-2 border-2 border-black bg-white px-4 py-2 shadow-[4px_4px_0px_0px_#000]">
                    <div className="h-4 w-4 bg-[#FF00FF]" />
                    <h1 className="font-black tracking-tighter">PLAYGROUND.OS</h1>
                </div>
            </DragItem>

            {/* Main Headline - Broken into draggable words */}
            <DragItem constraintsRef={containerRef} initialX={100} initialY={150}>
                <h1 className="text-9xl font-black text-black drop-shadow-[4px_4px_0px_#fff]">WE</h1>
            </DragItem>
            <DragItem constraintsRef={containerRef} initialX={350} initialY={200}>
                <h1 className="text-9xl font-black text-[#FF00FF] drop-shadow-[4px_4px_0px_#000] rotate-6">BREAK</h1>
            </DragItem>
            <DragItem constraintsRef={containerRef} initialX={200} initialY={350}>
                <h1 className="text-9xl font-black text-white drop-shadow-[4px_4px_0px_#000] -rotate-3 [-webkit-text-stroke:3px_black]">THE</h1>
            </DragItem>
            <DragItem constraintsRef={containerRef} initialX={450} initialY={400}>
                <h1 className="text-9xl font-black text-[#00FFFF] drop-shadow-[4px_4px_0px_#000] rotate-2">INTERNET</h1>
            </DragItem>

            {/* Interaction Windows */}
            <DragItem constraintsRef={containerRef} initialX={800} initialY={100} className="z-10">
                <RetroWindow title="About_Us.txt" color="bg-[#FFF]" rotation={2}>
                    <p>We are a digital agency that hates boring websites.</p>
                    <br />
                    <p>This is not a bug, it's a feature.</p>
                    <button className="mt-4 w-full border-2 border-black bg-[#FF00FF] py-2 text-white hover:bg-black">CONTACT US</button>
                </RetroWindow>
            </DragItem>

            <DragItem constraintsRef={containerRef} initialX={50} initialY={500} className="z-20">
                <MusicPlayer />
            </DragItem>

            {/* Random Photos */}
            <DragItem constraintsRef={containerRef} initialX={900} initialY={400}>
                <Polaroid
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
                    caption="The Team '24"
                    rotate={-5}
                />
            </DragItem>

            {/* Stickers & Badges */}
            <DragItem constraintsRef={containerRef} initialX={700} initialY={600}>
                <Sticker text="SITE OF THE DAY" color="bg-[#00FF00]" rotate={15} />
            </DragItem>

            <DragItem constraintsRef={containerRef} initialX={300} initialY={100}>
                <div className="text-6xl animate-bounce">
                    <Star fill="#FFFF00" size={100} strokeWidth={2} />
                </div>
            </DragItem>

            <DragItem constraintsRef={containerRef} initialX={1000} initialY={600}>
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-black text-white">
                    <Smile size={64} />
                </div>
            </DragItem>

            {/* Call to Action */}
            <DragItem constraintsRef={containerRef} initialX={500} initialY={600}>
                <button className="group relative">
                    <div className="absolute inset-0 translate-x-2 translate-y-2 bg-black transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
                    <div className="relative border-2 border-black bg-[#FF00FF] px-12 py-6 text-2xl font-black uppercase text-white transition-transform group-hover:-translate-y-1">
                        Start A Project
                    </div>
                </button>
            </DragItem>

            {/* Grab Prompt */}
            <DragItem constraintsRef={containerRef} initialX={200} initialY={700}>
                <div className="flex items-center gap-2 rounded-full border border-black/20 bg-white/50 px-4 py-2 backdrop-blur-sm">
                    <MousePointer2 size={16} /> <span className="text-xs font-bold uppercase">Grab anything</span>
                </div>
            </DragItem>

        </main>
    );
}
