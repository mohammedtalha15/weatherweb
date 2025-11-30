"use client";
import { motion } from "framer-motion";
import { Atom, Cloud, Wind, Thermometer, Droplets, Gauge, Sun, Leaf, FlaskConical } from "lucide-react";

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

            {/* Research & Methodology */}
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                    <FlaskConical className="text-purple-500" size={24} />
                    <h2 className="text-xl font-bold text-neutral-900">Methodology</h2>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-lg shadow-neutral-200/20">
                    <p className="text-neutral-600 leading-relaxed mb-6">
                        This simulator uses simplified fluid dynamics equations to approximate real-world weather patterns.
                        While not a full climate model, it respects the proportional relationships between gravity, pressure,
                        and temperature established by the Ideal Gas Law and hydrostatic equilibrium principles.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                            <h3 className="font-semibold text-neutral-900 mb-2">Thermodynamics</h3>
                            <p className="text-xs text-neutral-500">Heat transfer and energy conservation.</p>
                        </div>
                        <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                            <h3 className="font-semibold text-neutral-900 mb-2">Fluid Dynamics</h3>
                            <p className="text-xs text-neutral-500">Air movement and pressure gradients.</p>
                        </div>
                        <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                            <h3 className="font-semibold text-neutral-900 mb-2">Atmospheric Science</h3>
                            <p className="text-xs text-neutral-500">Cloud formation and precipitation cycles.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="pt-12 border-t border-neutral-200">
                <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-6">Built With</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechCard title="Next.js 14" description="App Router & Server Components" />
                    <TechCard title="Three.js" description="3D Rendering Engine" />
                    <TechCard title="React Three Fiber" description="Declarative 3D for React" />
                    <TechCard title="Tailwind CSS" description="Utility-first Styling" />
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

function TechCard({ title, description }: { title: string, description: string }) {
    return (
        <div className="p-4 bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-neutral-900 text-sm mb-1">{title}</h4>
            <p className="text-xs text-neutral-500">{description}</p>
        </div>
    );
}
