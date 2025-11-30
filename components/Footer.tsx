'use client';

import { Wind, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-neutral-200 mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500/20 transition-colors">
                                <Wind size={18} />
                            </div>
                            <span className="font-semibold text-neutral-800 tracking-tight">Weather<span className="text-blue-500">Physics</span></span>
                        </Link>
                        <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
                            An interactive exploration of atmospheric physics.
                            Simulate, compare, and understand the forces that shape our climate.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-neutral-900 mb-4">Navigation</h3>
                        <ul className="space-y-2 text-sm text-neutral-500">
                            <li><Link href="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
                            <li><Link href="/simulation" className="hover:text-blue-500 transition-colors">Simulation</Link></li>
                            <li><Link href="/compare" className="hover:text-blue-500 transition-colors">Compare</Link></li>
                            <li><Link href="/about" className="hover:text-blue-500 transition-colors">About</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-neutral-900 mb-4">Connect</h3>
                        <div className="flex gap-4">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 transition-colors">
                                <Github size={20} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-blue-400 transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-400">
                    <p>© {new Date().getFullYear()} WeatherPhysics. All rights reserved.</p>
                    <p>Built with Next.js & Three.js</p>
                </div>
            </div>
        </footer>
    );
}
