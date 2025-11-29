'use client';

import { motion } from 'framer-motion';
import { Atom, Cloud, Wind, Thermometer, Droplets, Gauge, Sun, Leaf } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen px-4 py-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
                        About the Physics
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Understanding how fundamental physics parameters shape our weather and climate
                    </p>
                </motion.div>

                {/* Introduction */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-8 mb-12"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        This simulator uses real physics equations to calculate how weather would change if we could modify
                        fundamental properties of our planet and atmosphere. Each parameter affects multiple weather outcomes
                        in interconnected ways, just like in real atmospheric science.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                        The AI-powered explanations help you understand not just <em>what</em> changes, but <em>why</em> it happens,
                        making complex climate science accessible and interactive.
                    </p>
                </motion.div>

                {/* Physics Parameters */}
                <div className="space-y-6 mb-12">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Physics Parameters Explained</h2>

                    <ParameterCard
                        icon={<Atom className="text-[#00D9FF]" size={32} />}
                        title="Gravity"
                        description="The force that pulls everything toward Earth's center"
                        effects={[
                            'Lower gravity → Clouds rise higher, rain falls slower',
                            'Higher gravity → Denser atmosphere, stronger winds',
                            'Affects how water vapor rises and condenses',
                        ]}
                        realWorld="On Mars (0.38g), clouds can reach much higher altitudes than on Earth"
                        delay={0.1}
                    />

                    <ParameterCard
                        icon={<Wind className="text-[#B026FF]" size={32} />}
                        title="Air Density"
                        description="How tightly packed air molecules are"
                        effects={[
                            'Lower density → Faster winds, less heat retention',
                            'Higher density → Slower winds, better heat distribution',
                            'Affects sound travel and breathing difficulty',
                        ]}
                        realWorld="At high altitudes, air density is lower, making it harder to breathe"
                        delay={0.2}
                    />

                    <ParameterCard
                        icon={<Gauge className="text-[#00FFF0]" size={32} />}
                        title="Atmospheric Pressure"
                        description="The weight of air pressing down on the surface"
                        effects={[
                            'Low pressure → Storm formation, rising air',
                            'High pressure → Clear skies, sinking air',
                            'Affects boiling point of water and cloud formation',
                        ]}
                        realWorld="Hurricanes form in areas of extremely low pressure"
                        delay={0.3}
                    />

                    <ParameterCard
                        icon={<Leaf className="text-[#50E3C2]" size={32} />}
                        title="CO₂ Concentration"
                        description="Amount of carbon dioxide in the atmosphere"
                        effects={[
                            'Higher CO₂ → Greenhouse effect, warmer temperatures',
                            'Affects plant growth (they need CO₂ for photosynthesis)',
                            'Too high → Harmful to human health',
                        ]}
                        realWorld="Earth's CO₂ has risen from 280ppm (pre-industrial) to 420ppm today"
                        delay={0.4}
                    />

                    <ParameterCard
                        icon={<Sun className="text-[#F5A623]" size={32} />}
                        title="Sunlight Intensity"
                        description="Amount of solar radiation reaching the surface"
                        effects={[
                            'More sunlight → Higher temperatures, more evaporation',
                            'Less sunlight → Cooler climate, ice ages',
                            'Drives all weather through uneven heating',
                        ]}
                        realWorld="Venus receives 2x more sunlight than Earth, contributing to its extreme heat"
                        delay={0.5}
                    />

                    <ParameterCard
                        icon={<Droplets className="text-[#00D9FF]" size={32} />}
                        title="Humidity"
                        description="Amount of water vapor in the air"
                        effects={[
                            'High humidity → Feels hotter, more rain potential',
                            'Low humidity → Dry air, better evaporation',
                            'Affects cloud formation and precipitation',
                        ]}
                        realWorld="Tropical rainforests maintain 80-90% humidity year-round"
                        delay={0.6}
                    />

                    <ParameterCard
                        icon={<Wind className="text-[#B026FF]" size={32} />}
                        title="Wind Drag"
                        description="Air resistance affecting wind movement"
                        effects={[
                            'Higher drag → Slower winds, more turbulence',
                            'Lower drag → Faster, smoother air flow',
                            'Affects energy transfer in the atmosphere',
                        ]}
                        realWorld="Wind turbines work best in areas with consistent, moderate wind drag"
                        delay={0.7}
                    />

                    <ParameterCard
                        icon={<Cloud className="text-[#00FFF0]" size={32} />}
                        title="Cloud Condensation"
                        description="How quickly water vapor forms clouds"
                        effects={[
                            'Faster condensation → More clouds, more rain',
                            'Slower condensation → Clearer skies, less precipitation',
                            'Affects albedo (reflection of sunlight)',
                        ]}
                        realWorld="Pollution particles can act as condensation nuclei, affecting cloud formation"
                        delay={0.8}
                    />
                </div>

                {/* Weather Outputs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="glass-panel p-8 mb-12"
                >
                    <h2 className="text-3xl font-bold text-white mb-6">Weather Outputs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <OutputExplanation
                            title="Temperature"
                            description="Calculated from CO₂ greenhouse effect, air density heat retention, sunlight intensity, and pressure effects"
                        />
                        <OutputExplanation
                            title="Cloud Altitude"
                            description="Based on temperature-dewpoint spread and gravity's effect on rising air parcels"
                        />
                        <OutputExplanation
                            title="Precipitation Chance"
                            description="Determined by gravity, pressure, humidity, and cloud condensation rate"
                        />
                        <OutputExplanation
                            title="Wind Speed"
                            description="Affected by air density, wind drag coefficient, and pressure gradients"
                        />
                        <OutputExplanation
                            title="Storm Probability"
                            description="Calculated from humidity, pressure, temperature extremes, and wind speed"
                        />
                        <OutputExplanation
                            title="Comfort Index"
                            description="Combines temperature, humidity, wind, and pressure into a 0-100 livability score"
                        />
                    </div>
                </motion.div>

                {/* Technology */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="glass-panel p-8"
                >
                    <h2 className="text-3xl font-bold text-white mb-6">Technology Stack</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <TechBadge name="Next.js 14" />
                        <TechBadge name="Three.js" />
                        <TechBadge name="Framer Motion" />
                        <TechBadge name="Gemini AI" />
                        <TechBadge name="TypeScript" />
                        <TechBadge name="Tailwind CSS" />
                        <TechBadge name="React Three Fiber" />
                        <TechBadge name="Physics Engine" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function ParameterCard({
    icon,
    title,
    description,
    effects,
    realWorld,
    delay
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    effects: string[];
    realWorld: string;
    delay: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className="glass-card p-6 hover:scale-[1.02] transition-transform"
        >
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 flex-shrink-0">
                    {icon}
                </div>
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-gray-300 mb-4">{description}</p>

                    <div className="space-y-2 mb-4">
                        <p className="text-sm font-semibold text-[#00D9FF]">Effects:</p>
                        {effects.map((effect, i) => (
                            <p key={i} className="text-sm text-gray-400 pl-4 border-l-2 border-white/10">
                                • {effect}
                            </p>
                        ))}
                    </div>

                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <p className="text-sm text-purple-200">
                            <span className="font-semibold">Real World:</span> {realWorld}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function OutputExplanation({ title, description }: { title: string; description: string }) {
    return (
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
    );
}

function TechBadge({ name }: { name: string }) {
    return (
        <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00D9FF]/20 to-[#B026FF]/20 border border-white/10 text-center">
            <span className="text-sm font-medium text-white">{name}</span>
        </div>
    );
}
