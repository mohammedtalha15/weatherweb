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
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <div className="navbar-glass">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo/Title */}
                        <Link href="/">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="flex items-center gap-3"
                            >
                                <div className="text-3xl">🌤️</div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-800">Weather Physics</h1>
                                    <p className="text-xs text-gray-500">Climate Simulator</p>
                                </div>
                            </motion.div>
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center gap-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;

                                return (
                                    <Link key={item.href} href={item.href}>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`
                        px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300
                        ${isActive
                                                    ? 'bg-blue-500 text-white shadow-md'
                                                    : 'text-gray-700 hover:bg-white/60'
                                                }
                      `}
                                        >
                                            <Icon size={18} />
                                            <span className="font-medium text-sm">{item.label}</span>
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button className="p-2 rounded-lg hover:bg-white/60 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden mt-4 space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link key={item.href} href={item.href}>
                                    <div
                                        className={`
                      px-4 py-3 rounded-xl flex items-center gap-3 transition-all
                      ${isActive
                                                ? 'bg-blue-500 text-white'
                                                : 'text-gray-700 hover:bg-white/60'
                                            }
                    `}
                                    >
                                        <Icon size={20} />
                                        <span className="font-medium">{item.label}</span>
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
