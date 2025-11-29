'use client';

import { motion } from 'framer-motion';
import { Atom, Cloud, Wind, Thermometer, Droplets, Gauge, Sun, Leaf } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#1a1a1a] flex flex-col pt-32 pb-16 px-6">
            <div className="max-w-3xl mx-auto w-full">

                {/* Header */}
                <div className="mb-16">
                    <h1 className="text-3xl font-bold text-white mb-4">Physics Engine</h1>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        A real-time simulation of atmospheric dynamics based on fundamental physics parameters.
                        Explore how gravity, pressure, and solar intensity shape planetary climates.
                    </p>
                </div>

                {/* Parameters Section */}
                <div className="mb-16">
                    <h2 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-8">Core Parameters</h2>
                    <div className="space-y-8">
                        <ParameterItem
                            title="Gravity"
                            description="Determines atmospheric scale height and cloud formation altitude."
                            detail="Lower gravity allows clouds to form higher and rain to fall slower."
                        />
                        <ParameterItem
                            title="Air Density"
                            description="Affects wind speed, heat retention, and sound propagation."
                            detail="Denser air retains more heat and creates stronger wind forces."
                        />
                        <ParameterItem
                            title="Atmospheric Pressure"
                            description="Influences storm formation and boiling points."
                            detail="Low pressure systems are associated with storms and rising air."
                        />
                        <ParameterItem
                            title="CO₂ Concentration"
                            description="Primary driver of the greenhouse effect."
                            detail="Higher concentrations trap infrared radiation, warming the planet."
                        />
                        <ParameterItem
                            title="Sunlight Intensity"
                            description="The energy source driving all weather systems."
                            detail="Uneven heating from sunlight creates pressure gradients and wind."
                        />
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="pt-8 border-t border-white/5">
                    <div className="flex flex-wrap gap-4 text-xs text-neutral-500 font-mono">
                        <span>Next.js 14</span>
                        <span>•</span>
                        <span>Three.js</span>
                        <span>•</span>
                        <span>React Three Fiber</span>
                        <span>•</span>
                        <span>D3.js</span>
                        <span>•</span>
                        <span>Tailwind CSS</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

function ParameterItem({ title, description, detail }: { title: string, description: string, detail: string }) {
    return (
        <div className="group">
            <h3 className="text-white font-medium mb-1 group-hover:text-blue-400 transition-colors">{title}</h3>
            <p className="text-gray-400 text-sm mb-1">{description}</p>
            <p className="text-neutral-600 text-xs">{detail}</p>
        </div>
    );
}
