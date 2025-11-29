'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Wind, GitCompare, Info } from 'lucide-react';

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/simulation", label: "Simulation", icon: Wind },
    { href: "/compare", label: "Compare", icon: GitCompare },
    { href: "/about", label: "About", icon: Info },
];

export default function NavBar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200/50 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500/20 transition-colors">
                        <Wind size={18} />
                    </div>
                    <span className="font-semibold text-neutral-800 tracking-tight">Weather<span className="text-blue-500">Physics</span></span>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-8">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} className="relative py-5">
                                <div className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-neutral-500 hover:text-neutral-800'}`}>
                                    {item.label}
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-underline"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-t-full"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Placeholder for right side (e.g. settings or nothing) */}
                <div className="w-24 hidden md:block"></div>
            </div>
        </nav>
    );
}
