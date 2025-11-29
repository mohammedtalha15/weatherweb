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
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
        >
            <div className="glass-panel px-6 py-3 flex items-center gap-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link key={item.href} href={item.href}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`
                  relative px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300
                  ${isActive
                                        ? 'bg-gradient-to-r from-[#00D9FF]/30 to-[#B026FF]/30 text-white'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                `}
                            >
                                <Icon size={18} />
                                <span className="font-medium">{item.label}</span>

                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 rounded-lg neon-border-blue -z-10"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </motion.nav>
    );
}
