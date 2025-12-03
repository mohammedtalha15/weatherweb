'use client';

import { Wind, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#FDFBF7] border-t border-[#E5E5E5] mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <div className="w-8 h-8 rounded-full bg-[#264653] flex items-center justify-center text-[#E9C46A] group-hover:scale-105 transition-transform">
                                <Wind size={16} />
                            </div>
                            <span className="font-serif font-bold text-[#2C3333] tracking-tight">Weather<span className="text-[#264653]">Physics</span></span>
                        </Link>
                        <p className="text-[#5C5C5C] text-sm leading-relaxed max-w-xs font-light">
                            An interactive exploration of atmospheric physics.
                            Simulate, compare, and understand the forces that shape our climate.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-serif font-bold text-[#264653] mb-4">Navigation</h3>
                        <ul className="space-y-2 text-sm text-[#5C5C5C]">
                            <li><Link href="/" className="hover:text-[#264653] transition-colors">Home</Link></li>
                            <li><Link href="/simulation" className="hover:text-[#264653] transition-colors">Simulation</Link></li>
                            <li><Link href="/compare" className="hover:text-[#264653] transition-colors">Compare</Link></li>
                            <li><Link href="/about" className="hover:text-[#264653] transition-colors">About</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-serif font-bold text-[#264653] mb-4">Connect</h3>
                        <div className="flex gap-4">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#8C8C8C] hover:text-[#2C3333] transition-colors">
                                <Github size={20} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#8C8C8C] hover:text-[#264653] transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-[#E5E5E5] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#5C5C5C]/80">
                    <p>© {new Date().getFullYear()} WeatherPhysics. All rights reserved.</p>
                    <p>Built with Next.js & Three.js</p>
                </div>
            </div>
        </footer>
    );
}
