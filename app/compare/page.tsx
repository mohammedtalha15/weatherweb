"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import Globe from "@/components/Globe";
import { PhysicsParameters } from "@/lib/types";
import { DEFAULT_PARAMS, PARAM_RANGES } from "@/lib/constants";
import { simulateWeather } from "@/lib/physicsEngine";

export default function ComparePage() {
    const [modifiedParams, setModifiedParams] = useState<PhysicsParameters>(DEFAULT_PARAMS);

    const earthWeather = simulateWeather(DEFAULT_PARAMS);
    const modifiedWeather = simulateWeather(modifiedParams);

    const handleParameterChange = (key: keyof PhysicsParameters, value: number) => {
        setModifiedParams(prev => ({ ...prev, [key]: value }));
    };

    const getDifference = (earth: number, modified: number, unit: string = '') => {
        const diff = modified - earth;
        const absDiff = Math.abs(diff);
        if (absDiff < 0.1) return <span className="text-neutral-400 flex items-center gap-1"><Minus size={14} /> 0{unit}</span>;

        const isPositive = diff > 0;
        const Icon = isPositive ? ArrowUp : ArrowDown;

        return (
            <span className="flex items-center gap-1">
                <Icon size={14} />
                {absDiff.toFixed(1)}{unit}
            </span>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-serif font-bold text-[#264653]">Compare Physics</h1>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-sm text-[#5C5C5C]">
                        <span className="w-2 h-2 rounded-full bg-[#2A9D8F]"></span> Earth
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#5C5C5C]">
                        <span className="w-2 h-2 rounded-full bg-[#E76F51]"></span> Modified
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                {/* Earth */}
                <div className="relative rounded-3xl overflow-hidden border border-[#E5E5E5] shadow-lg shadow-[#264653]/5 bg-[#FDFBF7] group h-[400px]">
                    <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#E5E5E5] shadow-sm">
                        <span className="text-xs font-medium text-[#2A9D8F]">Earth Normal</span>
                    </div>
                    <Globe parameters={DEFAULT_PARAMS} weather={earthWeather} />

                    {/* Earth Metrics Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-[#5C5C5C] bg-white/90 backdrop-blur-md p-3 rounded-xl border border-[#E5E5E5] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <div>Temp: {earthWeather.temperature.toFixed(1)}°C</div>
                        <div>Rain: {earthWeather.precipitationChance.toFixed(0)}%</div>
                        <div>Wind: {earthWeather.windSpeed.toFixed(1)} km/h</div>
                    </div>
                </div>

                {/* Modified */}
                <div className="relative rounded-3xl overflow-hidden border border-[#E76F51]/20 shadow-lg shadow-[#E76F51]/10 bg-[#FDFBF7] group h-[400px]">
                    <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#E76F51]/30 shadow-sm">
                        <span className="text-xs font-medium text-[#E76F51]">Modified Physics</span>
                    </div>
                    <Globe parameters={modifiedParams} weather={modifiedWeather} />

                    {/* Modified Metrics Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-[#5C5C5C] bg-white/90 backdrop-blur-md p-3 rounded-xl border border-[#E5E5E5] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <div>Temp: {modifiedWeather.temperature.toFixed(1)}°C</div>
                        <div>Rain: {modifiedWeather.precipitationChance.toFixed(0)}%</div>
                        <div>Wind: {modifiedWeather.windSpeed.toFixed(1)} km/h</div>
                    </div>
                </div>
            </div>

            {/* Controls & Impact */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-2 natural-card bg-[#FFFFFF] p-6 border-[#E5E5E5]">
                    <h3 className="text-sm font-serif font-bold text-[#264653] mb-4">Modify Parameters</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <MinimalSlider
                            label="Gravity"
                            value={modifiedParams.gravity}
                            min={PARAM_RANGES.gravity.min}
                            max={PARAM_RANGES.gravity.max}
                            onChange={(v) => handleParameterChange('gravity', v)}
                        />
                        <MinimalSlider
                            label="Sunlight"
                            value={modifiedParams.sunlight}
                            min={PARAM_RANGES.sunlight.min}
                            max={PARAM_RANGES.sunlight.max}
                            onChange={(v) => handleParameterChange('sunlight', v)}
                        />
                        <MinimalSlider
                            label="CO₂"
                            value={modifiedParams.co2}
                            min={PARAM_RANGES.co2.min}
                            max={PARAM_RANGES.co2.max}
                            onChange={(v) => handleParameterChange('co2', v)}
                        />
                        <MinimalSlider
                            label="Humidity"
                            value={modifiedParams.humidity}
                            min={PARAM_RANGES.humidity.min}
                            max={PARAM_RANGES.humidity.max}
                            onChange={(v) => handleParameterChange('humidity', v)}
                        />
                    </div>
                </div>

                {/* Impact Summary */}
                <div className="natural-card bg-[#FFFFFF] p-6 border-[#E5E5E5] flex flex-col justify-center">
                    <h3 className="text-sm font-serif font-bold text-[#264653] mb-4 text-center">Impact Analysis</h3>
                    <div className="flex items-center justify-between">
                        <div className="text-center flex flex-col items-center">
                            <div className="text-xs text-[#8C8C8C] uppercase mb-1">Temp Diff</div>
                            <div className={`text-lg font-mono font-bold ${modifiedWeather.temperature > earthWeather.temperature ? 'text-[#E76F51]' : modifiedWeather.temperature < earthWeather.temperature ? 'text-[#2A9D8F]' : 'text-[#5C5C5C]'}`}>
                                {getDifference(earthWeather.temperature, modifiedWeather.temperature, '°')}
                            </div>
                        </div>
                        <div className="w-px h-8 bg-[#E5E5E5]"></div>
                        <div className="text-center flex flex-col items-center">
                            <div className="text-xs text-[#8C8C8C] uppercase mb-1">Storm Risk</div>
                            <div className={`text-lg font-mono font-bold ${modifiedWeather.stormProbability > earthWeather.stormProbability ? 'text-[#E76F51]' : modifiedWeather.stormProbability < earthWeather.stormProbability ? 'text-[#2A9D8F]' : 'text-[#5C5C5C]'}`}>
                                {getDifference(earthWeather.stormProbability, modifiedWeather.stormProbability, '%')}
                            </div>
                        </div>
                        <div className="w-px h-8 bg-[#E5E5E5]"></div>
                        <div className="text-center flex flex-col items-center">
                            <div className="text-xs text-[#8C8C8C] uppercase mb-1">Comfort</div>
                            <div className={`text-lg font-mono font-bold ${modifiedWeather.comfortIndex > earthWeather.comfortIndex ? 'text-[#2A9D8F]' : modifiedWeather.comfortIndex < earthWeather.comfortIndex ? 'text-[#E9C46A]' : 'text-[#5C5C5C]'}`}>
                                {getDifference(earthWeather.comfortIndex, modifiedWeather.comfortIndex)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MinimalSlider({ label, value, min, max, onChange }: { label: string, value: number, min: number, max: number, onChange: (v: number) => void }) {
    return (
        <div className="bg-[#F0EEE6] rounded-xl p-3 border border-[#E5E5E5] hover:border-[#264653]/20 transition-all duration-300">
            <div className="flex justify-between text-xs mb-2">
                <span className="text-[#5C5C5C] font-medium">{label}</span>
                <span className="text-[#2C3333] font-mono font-medium">{value.toFixed(1)}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={(max - min) / 100}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#D1D5DB] rounded-lg appearance-none cursor-pointer accent-[#E76F51] hover:accent-[#D65F41] transition-all"
            />
        </div>
    );
}
