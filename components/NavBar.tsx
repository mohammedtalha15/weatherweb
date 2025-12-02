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
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <div className="natural-card bg-[#FDFBF7] px-6 py-3 flex items-center gap-8 shadow-lg shadow-stone-900/5 border-stone-200">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group mr-4">
                    <div className="w-8 h-8 rounded-full bg-[#264653] flex items-center justify-center text-[#E9C46A] group-hover:scale-105 transition-transform">
                        <Wind size={16} />
                    </div>
                    <span className="font-serif font-bold text-[#2C3333] tracking-tight">Weather<span className="text-[#264653]">Physics</span></span>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} className="relative px-4 py-2 rounded-full transition-colors hover:bg-stone-100">
                                <div className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${isActive ? 'text-[#264653]' : 'text-[#5C5C5C]'}`}>
                                    {item.label}
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-pill"
                                        className="absolute inset-0 bg-[#E9C46A]/20 rounded-full -z-10"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
