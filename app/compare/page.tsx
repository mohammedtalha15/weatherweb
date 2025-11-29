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

    const getDifference = (earth: number, modified: number, unit: string = '') => {
        const diff = modified - earth;
        const sign = diff > 0 ? '+' : '';
        return `${sign}${diff.toFixed(1)}${unit}`;
    };

    return (
        <div className="min-h-screen bg-[#1a1a1a] flex flex-col pt-24 pb-8 px-6">
            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-xl font-bold text-white">Compare Physics</h1>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> Earth
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span> Modified
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                    {/* Earth */}
                    <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-black/20 group">
                        <div className="absolute top-4 left-4 z-10 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                            <span className="text-xs font-medium text-green-400">Earth Normal</span>
                        </div>
                        <Globe parameters={DEFAULT_PARAMS} weather={earthWeather} />

                        {/* Earth Metrics Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-gray-400 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div>Temp: {earthWeather.temperature.toFixed(1)}°C</div>
                            <div>Rain: {earthWeather.precipitationChance.toFixed(0)}%</div>
                            <div>Wind: {earthWeather.windSpeed.toFixed(1)} km/h</div>
                        </div>
                    </div>

                    {/* Modified */}
                    <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 bg-black/20 group">
                        <div className="absolute top-4 left-4 z-10 bg-purple-900/20 backdrop-blur-md px-3 py-1 rounded-full border border-purple-500/30">
                            <span className="text-xs font-medium text-purple-300">Modified Physics</span>
                        </div>
                        <Globe parameters={modifiedParams} weather={modifiedWeather} />

                        {/* Modified Metrics Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-gray-400 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div>Temp: {modifiedWeather.temperature.toFixed(1)}°C</div>
                            <div>Rain: {modifiedWeather.precipitationChance.toFixed(0)}%</div>
                            <div>Wind: {modifiedWeather.windSpeed.toFixed(1)} km/h</div>
                        </div>
                    </div>
                </div>

                {/* Controls & Impact */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
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

                    {/* Impact Summary */}
                    <div className="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/5">
                        <div className="text-center">
                            <div className="text-xs text-gray-500 uppercase">Temp Diff</div>
                            <div className={`text-lg font-mono font-bold ${modifiedWeather.temperature > earthWeather.temperature ? 'text-red-400' : 'text-blue-400'}`}>
                                {getDifference(earthWeather.temperature, modifiedWeather.temperature, '°')}
                            </div>
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        <div className="text-center">
                            <div className="text-xs text-gray-500 uppercase">Storm Risk</div>
                            <div className={`text-lg font-mono font-bold ${modifiedWeather.stormProbability > earthWeather.stormProbability ? 'text-purple-400' : 'text-green-400'}`}>
                                {getDifference(earthWeather.stormProbability, modifiedWeather.stormProbability, '%')}
                            </div>
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        <div className="text-center">
                            <div className="text-xs text-gray-500 uppercase">Comfort</div>
                            <div className={`text-lg font-mono font-bold ${modifiedWeather.comfortIndex > earthWeather.comfortIndex ? 'text-blue-400' : 'text-orange-400'}`}>
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
        <div className="bg-white/5 rounded-lg p-3 border border-white/5">
            <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-400">{label}</span>
                <span className="text-white font-mono">{value.toFixed(1)}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={(max - min) / 100}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
            />
        </div>
    );
}
