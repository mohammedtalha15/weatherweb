'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Gauge, GitCompare, Info } from 'lucide-react';

const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/simulation', label: 'Simulation', icon: Gauge },
    { href: '/compare', label: 'Compare', icon: GitCompare },
    { href: '/about', label: 'About', icon: Info },
];

export default function NavBar() {
    const pathname = usePathname();

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-6 left-0 right-0 z-50 pointer-events-none"
        >
            <div className="max-w-3xl mx-auto px-6">
                <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl pointer-events-auto">
                    {/* Logo */}
                    <Link href="/">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2"
                        >
                            <div className="text-xl">🌍</div>
                            <span className="font-semibold text-white text-sm tracking-wide">Weather<span className="text-neutral-500">Physics</span></span>
                        </motion.div>
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.href} href={item.href}>
                                    <div
                                        className={`
                      px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300
                      ${isActive
                                                ? 'bg-white text-black'
                                                : 'text-neutral-400 hover:text-white hover:bg-white/5'
                                            }
                    `}
                                    >
                                        {item.label}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
