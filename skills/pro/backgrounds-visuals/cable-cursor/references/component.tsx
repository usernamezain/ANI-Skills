'use client';

import React, { useEffect, useRef } from 'react';

export default function HarmonicStreamPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // --- Configuration ---
        const STRAND_COUNT = 12;      // Number of lines in the cable
        const HISTORY_LENGTH = 40;    // How long the tail is
        const BASE_RADIUS = 30;       // How wide the cable spreads

        // --- State ---
        let width = 0;
        let height = 0;
        let frame = 0;

        // Mouse state
        const mouse = { x: 0, y: 0, vX: 0, vY: 0 };
        const target = { x: 0, y: 0 };

        // --- Class Definition ---
        class Strand {
            index: number;
            x: number;
            y: number;
            history: { x: number; y: number }[];
            lag: number;       // Physics drag
            phaseOffset: number; // For the sine wave math

            constructor(index: number) {
                this.index = index;
                this.x = width / 2;
                this.y = height / 2;
                this.history = [];
                // Higher index = slightly more lag (creates the whip effect)
                this.lag = 0.1 + (index / STRAND_COUNT) * 0.05;
                this.phaseOffset = (index / STRAND_COUNT) * Math.PI * 2;
            }

            update() {
                // 1. Calculate the ideal position around the mouse cursor
                // We use Sin/Cos to make the point orbit the actual mouse position
                const orbitRadius = BASE_RADIUS + Math.sin(frame * 0.05 + this.phaseOffset) * 10;

                const orbitX = target.x + Math.cos(frame * 0.02 + this.phaseOffset) * orbitRadius;
                const orbitY = target.y + Math.sin(frame * 0.02 + this.phaseOffset) * orbitRadius;

                // 2. Physics: Move current x/y towards orbit x/y with lerp
                this.x += (orbitX - this.x) * this.lag;
                this.y += (orbitY - this.y) * this.lag;

                // 3. Update History for the tail
                this.history.push({ x: this.x, y: this.y });
                if (this.history.length > HISTORY_LENGTH) {
                    this.history.shift();
                }
            }

            draw(context: CanvasRenderingContext2D) {
                if (this.history.length < 2) return;

                context.beginPath();

                // Start from the oldest point
                context.moveTo(this.history[0].x, this.history[0].y);

                // Draw a smooth curve through the history
                for (let i = 1; i < this.history.length; i++) {
                    const p = this.history[i];
                    context.lineTo(p.x, p.y);
                }

                // --- Dynamic Coloring ---
                const speed = Math.abs(mouse.vX) + Math.abs(mouse.vY);
                const hue = (frame * 2 + this.index * (360 / STRAND_COUNT)) % 360;

                // When moving fast, lighten the color (energy surge)
                const lightness = 50 + Math.min(speed, 40);

                context.strokeStyle = `hsl(${hue}, 80%, ${lightness}%)`;
                context.lineWidth = 2;
                context.lineCap = 'round';
                context.lineJoin = 'round';

                // Add a glow effect
                context.shadowBlur = 10;
                context.shadowColor = `hsl(${hue}, 80%, 50%)`;

                context.stroke();

                // Reset shadow for performance
                context.shadowBlur = 0;
            }
        }

        // Initialize Strands
        let strands: Strand[] = [];

        const initStrands = () => {
            strands = [];
            for (let i = 0; i < STRAND_COUNT; i++) {
                strands.push(new Strand(i));
            }
        };

        // --- Main Loop ---
        const animate = () => {
            // 1. Smoothly interpolate mouse movement (easing)
            mouse.vX = (target.x - mouse.x) * 0.1;
            mouse.vY = (target.y - mouse.y) * 0.1;
            mouse.x += mouse.vX;
            mouse.y += mouse.vY;

            frame++;

            // 2. Fade background (Creates the "trail" ghosting effect)
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, width, height);

            // 3. Draw Strands with additive blending
            ctx.globalCompositeOperation = 'lighter';

            strands.forEach(strand => {
                strand.update();
                strand.draw(ctx);
            });

            requestAnimationFrame(animate);
        };

        // --- Events ---
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            // Reset position to center if first load
            if (mouse.x === 0 && mouse.y === 0) {
                mouse.x = width / 2;
                mouse.y = height / 2;
                target.x = width / 2;
                target.y = height / 2;
                initStrands();
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            target.x = e.clientX;
            target.y = e.clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            target.x = e.touches[0].clientX;
            target.y = e.touches[0].clientY;
            if (!(e.target as HTMLElement).closest('a')) {
                e.preventDefault();
            }
        };

        // --- Setup ---
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        handleResize(); // Trigger initial size
        animate();      // Start loop

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full bg-black overflow-hidden m-0 p-0">
            <div className="absolute top-5 left-5 text-white/30 pointer-events-none select-none font-sans text-sm z-10">
                <p>Interactive Harmonic Stream</p>
                <p className="text-xs">Move your cursor</p>
            </div>
            <canvas
                ref={canvasRef}
                className="block w-full h-full cursor-none touch-none"
            />
        </div>
    );
}
