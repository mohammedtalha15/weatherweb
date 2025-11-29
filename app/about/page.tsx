"use client";
import { motion } from "framer-motion";
import { Atom, Cloud, Wind, Thermometer, Droplets, Gauge, Sun, Leaf } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-16 text-center">
                <h1 className="text-4xl font-bold text-neutral-900 mb-6">Physics Engine</h1>
                <p className="text-xl text-neutral-500 leading-relaxed max-w-2xl mx-auto">
                    A real-time simulation of atmospheric dynamics based on fundamental physics parameters.
                    Explore how gravity, pressure, and solar intensity shape planetary climates.
                </p>
            </div>

            {/* Parameters Section */}
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                    <Atom className="text-blue-500" size={24} />
                    <h2 className="text-xl font-bold text-neutral-900">Core Parameters</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ParameterCard
                        icon={Gauge}
                        title="Gravity"
                        description="Determines atmospheric scale height and cloud formation altitude."
                        detail="Lower gravity allows clouds to form higher and rain to fall slower."
                    />
                    <ParameterCard
                        icon={Wind}
                        title="Air Density"
                        description="Affects wind speed, heat retention, and sound propagation."
                        detail="Denser air retains more heat and creates stronger wind forces."
                    />
                    <ParameterCard
                        icon={Cloud}
                        title="Atmospheric Pressure"
                        description="Influences storm formation and boiling points."
                        detail="Low pressure systems are associated with storms and rising air."
                    />
                    <ParameterCard
                        icon={Leaf}
                        title="CO₂ Concentration"
                        description="Primary driver of the greenhouse effect."
                        detail="Higher concentrations trap infrared radiation, warming the planet."
                    />
                    <ParameterCard
                        icon={Sun}
                        title="Sunlight Intensity"
                        description="The energy source driving all weather systems."
                        detail="Uneven heating from sunlight creates pressure gradients and wind."
                    />
                </div>
            </div>

            {/* Tech Stack */}
            <div className="pt-12 border-t border-neutral-200">
                <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-6">Built With</h3>
                <div className="flex flex-wrap gap-3">
                    <TechBadge text="Next.js 14" />
                    <TechBadge text="Three.js" />
                    <TechBadge text="React Three Fiber" />
                    <TechBadge text="D3.js" />
                    <TechBadge text="Tailwind CSS" />
                    <TechBadge text="Framer Motion" />
                </div>
            </div>
        </div>
    );
}

function ParameterCard({ icon: Icon, title, description, detail }: { icon: any, title: string, description: string, detail: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-lg shadow-neutral-200/20 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
                    <p className="text-neutral-600 text-sm mb-3 leading-relaxed">{description}</p>
                    <div className="text-xs text-neutral-400 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                        <span className="font-semibold text-neutral-500">Impact:</span> {detail}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TechBadge({ text }: { text: string }) {
    return (
        <span className="px-3 py-1.5 bg-neutral-100 text-neutral-600 rounded-lg text-sm font-medium border border-neutral-200">
            {text}
        </span>
    );
}
