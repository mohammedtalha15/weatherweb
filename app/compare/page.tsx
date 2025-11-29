'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Globe from '@/components/Globe';
import WeatherCard from '@/components/WeatherCard';
import PhysicsSlider from '@/components/PhysicsSlider';
import { PhysicsParameters, WeatherOutput } from '@/lib/types';
import { DEFAULT_PARAMS, PARAM_RANGES } from '@/lib/constants';
import { simulateWeather } from '@/lib/physicsEngine';

export default function ComparePage() {
    const [modifiedParams, setModifiedParams] = useState<PhysicsParameters>(DEFAULT_PARAMS);

    const earthWeather = simulateWeather(DEFAULT_PARAMS);
    const modifiedWeather = simulateWeather(modifiedParams);

    const handleParameterChange = (key: keyof PhysicsParameters, value: number) => {
        setModifiedParams(prev => ({ ...prev, [key]: value }));
    };

    const getDifference = (earth: number, modified: number): string => {
        const diff = modified - earth;
        const sign = diff > 0 ? '+' : '';
        return `${sign}${diff.toFixed(1)}`;
    };

    const getDifferencePercent = (earth: number, modified: number): string => {
        if (earth === 0) return '0%';
        const percent = ((modified - earth) / earth) * 100;
        const sign = percent > 0 ? '+' : '';
        return `${sign}${percent.toFixed(0)}%`;
    };

    return (
        <div className="min-h-screen px-4 py-8">
            <div className="max-w-[1800px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                        Earth vs Modified Physics
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Compare normal Earth conditions with your custom physics parameters
                    </p>
                </motion.div>

                {/* Quick Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <PhysicsSlider
                        label="Gravity"
                        value={modifiedParams.gravity}
                        min={PARAM_RANGES.gravity.min}
                        max={PARAM_RANGES.gravity.max}
                        step={PARAM_RANGES.gravity.step}
                        unit="g"
                        description="Gravitational force"
                        onChange={(v) => handleParameterChange('gravity', v)}
                        color="blue"
                    />
                    <PhysicsSlider
                        label="Sunlight"
                        value={modifiedParams.sunlight}
                        min={PARAM_RANGES.sunlight.min}
                        max={PARAM_RANGES.sunlight.max}
                        step={PARAM_RANGES.sunlight.step}
                        unit="x"
                        description="Solar intensity"
                        onChange={(v) => handleParameterChange('sunlight', v)}
                        color="purple"
                    />
                    <PhysicsSlider
                        label="CO₂"
                        value={modifiedParams.co2}
                        min={PARAM_RANGES.co2.min}
                        max={PARAM_RANGES.co2.max}
                        step={PARAM_RANGES.co2.step}
                        unit="ppm"
                        description="Carbon dioxide"
                        onChange={(v) => handleParameterChange('co2', v)}
                        color="pink"
                    />
                    <PhysicsSlider
                        label="Humidity"
                        value={modifiedParams.humidity}
                        min={PARAM_RANGES.humidity.min}
                        max={PARAM_RANGES.humidity.max}
                        step={PARAM_RANGES.humidity.step}
                        unit="%"
                        description="Moisture level"
                        onChange={(v) => handleParameterChange('humidity', v)}
                        color="cyan"
                    />
                </div>

                {/* Globe Comparison */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Earth Normal */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-panel p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-white">🌍 Earth Normal</h2>
                            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
                                Baseline
                            </span>
                        </div>
                        <Globe parameters={DEFAULT_PARAMS} weather={earthWeather} />
                    </motion.div>

                    {/* Modified Physics */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-panel p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-white">🔬 Modified Physics</h2>
                            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                                Custom
                            </span>
                        </div>
                        <Globe parameters={modifiedParams} weather={modifiedWeather} />
                    </motion.div>
                </div>

                {/* Comparison Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-panel p-8"
                >
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="text-[#00D9FF]">📊</span>
                        Weather Comparison
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Metric</th>
                                    <th className="text-center py-4 px-4 text-green-300 font-medium">Earth Normal</th>
                                    <th className="text-center py-4 px-4 text-purple-300 font-medium">Modified</th>
                                    <th className="text-center py-4 px-4 text-[#00D9FF] font-medium">Difference</th>
                                </tr>
                            </thead>
                            <tbody>
                                <ComparisonRow
                                    metric="Temperature"
                                    unit="°C"
                                    earthValue={earthWeather.temperature}
                                    modifiedValue={modifiedWeather.temperature}
                                />
                                <ComparisonRow
                                    metric="Cloud Altitude"
                                    unit="m"
                                    earthValue={earthWeather.cloudAltitude}
                                    modifiedValue={modifiedWeather.cloudAltitude}
                                />
                                <ComparisonRow
                                    metric="Rain Chance"
                                    unit="%"
                                    earthValue={earthWeather.precipitationChance}
                                    modifiedValue={modifiedWeather.precipitationChance}
                                />
                                <ComparisonRow
                                    metric="Wind Speed"
                                    unit="km/h"
                                    earthValue={earthWeather.windSpeed}
                                    modifiedValue={modifiedWeather.windSpeed}
                                />
                                <ComparisonRow
                                    metric="Storm Risk"
                                    unit="%"
                                    earthValue={earthWeather.stormProbability}
                                    modifiedValue={modifiedWeather.stormProbability}
                                />
                                <ComparisonRow
                                    metric="Evaporation"
                                    unit="mm/day"
                                    earthValue={earthWeather.evaporationRate}
                                    modifiedValue={modifiedWeather.evaporationRate}
                                />
                                <ComparisonRow
                                    metric="Visibility"
                                    unit="km"
                                    earthValue={earthWeather.visibility}
                                    modifiedValue={modifiedWeather.visibility}
                                />
                                <ComparisonRow
                                    metric="Comfort Index"
                                    unit="/100"
                                    earthValue={earthWeather.comfortIndex}
                                    modifiedValue={modifiedWeather.comfortIndex}
                                />
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Impact Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 glass-panel p-8"
                >
                    <h2 className="text-2xl font-bold text-white mb-4">Impact Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ImpactCard
                            title="Temperature Change"
                            value={getDifference(earthWeather.temperature, modifiedWeather.temperature)}
                            description={modifiedWeather.temperature > earthWeather.temperature ? 'Warmer climate' : 'Cooler climate'}
                            color="#FF006E"
                        />
                        <ImpactCard
                            title="Storm Risk Change"
                            value={getDifferencePercent(earthWeather.stormProbability, modifiedWeather.stormProbability)}
                            description={modifiedWeather.stormProbability > earthWeather.stormProbability ? 'More storms' : 'Fewer storms'}
                            color="#B026FF"
                        />
                        <ImpactCard
                            title="Comfort Change"
                            value={getDifference(earthWeather.comfortIndex, modifiedWeather.comfortIndex)}
                            description={modifiedWeather.comfortIndex > earthWeather.comfortIndex ? 'More comfortable' : 'Less comfortable'}
                            color="#00D9FF"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function ComparisonRow({
    metric,
    unit,
    earthValue,
    modifiedValue
}: {
    metric: string;
    unit: string;
    earthValue: number;
    modifiedValue: number;
}) {
    const diff = modifiedValue - earthValue;
    const diffColor = diff > 0 ? 'text-red-400' : diff < 0 ? 'text-blue-400' : 'text-gray-400';
    const diffSign = diff > 0 ? '+' : '';

    return (
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
            <td className="py-4 px-4 text-white font-medium">{metric}</td>
            <td className="py-4 px-4 text-center text-green-300">
                {earthValue.toFixed(1)} {unit}
            </td>
            <td className="py-4 px-4 text-center text-purple-300">
                {modifiedValue.toFixed(1)} {unit}
            </td>
            <td className={`py-4 px-4 text-center font-bold ${diffColor}`}>
                {diffSign}{diff.toFixed(1)} {unit}
            </td>
        </tr>
    );
}

function ImpactCard({
    title,
    value,
    description,
    color
}: {
    title: string;
    value: string;
    description: string;
    color: string;
}) {
    return (
        <div className="glass-card p-6 text-center">
            <h3 className="text-sm text-gray-400 mb-2 uppercase tracking-wide">{title}</h3>
            <div className="text-4xl font-bold mb-2" style={{ color }}>
                {value}
            </div>
            <p className="text-gray-300 text-sm">{description}</p>
        </div>
    );
}
