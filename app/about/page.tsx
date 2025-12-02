"use client";
import { motion } from "framer-motion";
import { Atom, Cloud, Wind, Thermometer, Droplets, Gauge, Sun, Leaf, FlaskConical } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-16 text-center">
                <h1 className="text-4xl font-serif font-bold text-[#264653] mb-6">Physics Engine</h1>
                <p className="text-xl text-[#5C5C5C] leading-relaxed max-w-2xl mx-auto font-light">
                    A real-time simulation of atmospheric dynamics based on fundamental physics parameters.
                    Explore how gravity, pressure, and solar intensity shape planetary climates.
                </p>
            </div>

            {/* Parameters Section */}
            <div className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                    <Atom className="text-[#E76F51]" size={24} />
                    <h2 className="text-xl font-serif font-bold text-[#2C3333]">Core Parameters</h2>
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
                    <FlaskConical className="text-[#E9C46A]" size={24} />
                    <h2 className="text-xl font-serif font-bold text-[#2C3333]">Methodology</h2>
                </div>
                <div className="natural-card bg-[#FFFFFF] p-8 border-[#E5E5E5]">
                    <p className="text-[#5C5C5C] leading-relaxed mb-6">
                        This simulator uses simplified fluid dynamics equations to approximate real-world weather patterns.
                        While not a full climate model, it respects the proportional relationships between gravity, pressure,
                        and temperature established by the Ideal Gas Law and hydrostatic equilibrium principles.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-[#F0EEE6] rounded-xl border border-[#E5E5E5]">
                            <h3 className="font-serif font-semibold text-[#264653] mb-2">Thermodynamics</h3>
                            <p className="text-xs text-[#5C5C5C]">Heat transfer and energy conservation.</p>
                        </div>
                        <div className="p-4 bg-[#F0EEE6] rounded-xl border border-[#E5E5E5]">
                            <h3 className="font-serif font-semibold text-[#264653] mb-2">Fluid Dynamics</h3>
                            <p className="text-xs text-[#5C5C5C]">Air movement and pressure gradients.</p>
                        </div>
                        <div className="p-4 bg-[#F0EEE6] rounded-xl border border-[#E5E5E5]">
                            <h3 className="font-serif font-semibold text-[#264653] mb-2">Atmospheric Science</h3>
                            <p className="text-xs text-[#5C5C5C]">Cloud formation and precipitation cycles.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tech Stack */}
            <div className="pt-12 border-t border-[#E5E5E5]">
                <h3 className="text-sm font-bold text-[#8C8C8C] uppercase tracking-wider mb-6">Built With</h3>
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
        <div className="natural-card bg-[#FFFFFF] p-6 border-[#E5E5E5] hover:border-[#264653]/30 group">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#264653]/5 flex items-center justify-center text-[#264653] flex-shrink-0 group-hover:bg-[#264653] group-hover:text-[#FDFBF7] transition-all duration-300">
                    <Icon size={20} />
                </div>
                <div>
                    <h3 className="text-lg font-serif font-bold text-[#2C3333] mb-2 group-hover:text-[#264653] transition-colors">{title}</h3>
                    <p className="text-[#5C5C5C] text-sm mb-3 leading-relaxed">{description}</p>
                    <div className="text-xs text-[#8C8C8C] bg-[#F0EEE6] p-3 rounded-lg border border-[#E5E5E5]">
                        <span className="font-semibold text-[#264653]">Impact:</span> {detail}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TechCard({ title, description }: { title: string, description: string }) {
    return (
        <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#E5E5E5] shadow-sm hover:shadow-md transition-shadow">
            <h4 className="font-bold text-[#2C3333] text-sm mb-1">{title}</h4>
            <p className="text-xs text-[#8C8C8C]">{description}</p>
        </div>
    );
}
