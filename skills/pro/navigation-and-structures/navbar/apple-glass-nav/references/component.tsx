"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";

type NavItem = {
    name: string;
    href: string;
};

interface NavProps {
    items: NavItem[];
    className?: string;
    activeTab?: string;
}

export const AppleGlassNav = ({ items, className }: NavProps) => {
    const [active, setActive] = useState(items[0].name);

    return (
        <nav className={cn("flex p-1.5 gap-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full shadow-lg ring-1 ring-black/5", className)}>
            {items.map((item) => (
                <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); setActive(item.name); }}
                    className={cn(
                        "relative px-4 py-1.5 text-sm font-medium transition-colors duration-300",
                        active === item.name ? "text-black" : "text-black/60 hover:text-black"
                    )}
                >
                    {active === item.name && (
                        <motion.div
                            layoutId="glass-active"
                            className="absolute inset-0 bg-white/80 shadow-sm rounded-full backdrop-blur-md"
                            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{item.name}</span>
                </a>
            ))}
        </nav>
    );
};

const NAV_LINKS = [
    { name: "Product", href: "#" },
    { name: "Solutions", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Company", href: "#" },
];

export default function AppleGlassNavPreview() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-white/20" />
            <div className="relative">
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <AppleGlassNav items={NAV_LINKS} />
            </div>
        </div>
    );
}
