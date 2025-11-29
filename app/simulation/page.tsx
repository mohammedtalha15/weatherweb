'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Download } from 'lucide-react';
import PhysicsSlider from '@/components/PhysicsSlider';
import WeatherCard from '@/components/WeatherCard';
import Globe from '@/components/Globe';
import AISummary from '@/components/AISummary';
import { PhysicsParameters, WeatherOutput, AIExplanation } from '@/lib/types';
import { DEFAULT_PARAMS, PARAM_RANGES } from '@/lib/constants';
import { simulateWeather } from '@/lib/physicsEngine';

export default function SimulationPage() {
    const [parameters, setParameters] = useState<PhysicsParameters>(DEFAULT_PARAMS);
    const [weather, setWeather] = useState<WeatherOutput | null>(null);
    const [aiExplanation, setAiExplanation] = useState<AIExplanation | null>(null);
    const [isLoadingAI, setIsLoadingAI] = useState(false);

    // Update weather when parameters change
    useEffect(() => {
        const newWeather = simulateWeather(parameters);
        setWeather(newWeather);
    }, [parameters]);

    // Fetch AI explanation when weather changes
    useEffect(() => {
        if (!weather) return;

        const fetchAIExplanation = async () => {
            setIsLoadingAI(true);
            try {
                const response = await fetch('/api/ai-summary', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ parameters, weatherOutput: weather }),
                });
                const data = await response.json();
                setAiExplanation(data);
            } catch (error) {
                console.error('Failed to fetch AI explanation:', error);
            } finally {
                setIsLoadingAI(false);
            }
        };

        // Debounce AI requests
        const timeout = setTimeout(fetchAIExplanation, 1000);
        return () => clearTimeout(timeout);
    }, [weather, parameters]);

    const handleParameterChange = (key: keyof PhysicsParameters, value: number) => {
        setParameters(prev => ({ ...prev, [key]: value }));
    };

    const handleReset = () => {
        setParameters(DEFAULT_PARAMS);
    };

    return (
        <div className="min-h-screen bg-[#1a1a1a] flex flex-col pt-24 pb-8 px-6">
            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col lg:flex-row gap-8">

                {/* Left: Controls */}
                <div className="w-full lg:w-80 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold text-white">Simulation</h1>
                        <button
                            onClick={handleReset}
                            className="text-xs text-neutral-500 hover:text-white transition-colors flex items-center gap-1"
                        >
                            <RotateCcw size={12} /> Reset
                        </button>
                    </div>

                    <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar max-h-[calc(100vh-200px)]">
                        <PhysicsSlider
                            label="Gravity"
                            value={parameters.gravity}
                            min={PARAM_RANGES.gravity.min}
                            max={PARAM_RANGES.gravity.max}
                            step={PARAM_RANGES.gravity.step}
                            unit="g"
                            description="Earth gravity = 1.0"
                            onChange={(v) => handleParameterChange('gravity', v)}
                        />
                        <PhysicsSlider
                            label="Air Density"
                            value={parameters.airDensity}
                            min={PARAM_RANGES.airDensity.min}
                            max={PARAM_RANGES.airDensity.max}
                            step={PARAM_RANGES.airDensity.step}
                            unit="kg/m³"
                            description="Atmospheric density"
                            onChange={(v) => handleParameterChange('airDensity', v)}
                        />
                        <PhysicsSlider
                            label="Pressure"
                            value={parameters.pressure}
                            min={PARAM_RANGES.pressure.min}
                            max={PARAM_RANGES.pressure.max}
                            step={PARAM_RANGES.pressure.step}
                            unit="mb"
                            description="Atmospheric pressure"
                            onChange={(v) => handleParameterChange('pressure', v)}
                        />
                        <PhysicsSlider
                            label="CO₂ Level"
                            value={parameters.co2}
                            min={PARAM_RANGES.co2.min}
                            max={PARAM_RANGES.co2.max}
                            step={PARAM_RANGES.co2.step}
                            unit="ppm"
                            description="Greenhouse gas"
                            onChange={(v) => handleParameterChange('co2', v)}
                        />
                        <PhysicsSlider
                            label="Sunlight"
                            value={parameters.sunlight}
                            min={PARAM_RANGES.sunlight.min}
                            max={PARAM_RANGES.sunlight.max}
                            step={PARAM_RANGES.sunlight.step}
                            unit="x"
                            description="Solar intensity"
                            onChange={(v) => handleParameterChange('sunlight', v)}
                        />
                        <PhysicsSlider
                            label="Humidity"
                            value={parameters.humidity}
                            min={PARAM_RANGES.humidity.min}
                            max={PARAM_RANGES.humidity.max}
                            step={PARAM_RANGES.humidity.step}
                            unit="%"
                            description="Moisture"
                            onChange={(v) => handleParameterChange('humidity', v)}
                        />
                        <PhysicsSlider
                            label="Wind Drag"
                            value={parameters.windDrag}
                            min={PARAM_RANGES.windDrag.min}
                            max={PARAM_RANGES.windDrag.max}
                            step={PARAM_RANGES.windDrag.step}
                            unit="x"
                            description="Air resistance"
                            onChange={(v) => handleParameterChange('windDrag', v)}
                        />
                        <PhysicsSlider
                            label="Cloud Formation"
                            value={parameters.cloudCondensation}
                            min={PARAM_RANGES.cloudCondensation.min}
                            max={PARAM_RANGES.cloudCondensation.max}
                            step={PARAM_RANGES.cloudCondensation.step}
                            unit="x"
                            description="Condensation rate"
                            onChange={(v) => handleParameterChange('cloudCondensation', v)}
                        />
                    </div>
                </div>

                {/* Right: Globe & Metrics */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Globe Container */}
                    <div className="flex-1 min-h-[500px] bg-black/20 rounded-2xl border border-white/5 overflow-hidden relative">
                        {weather && (
                            <Globe parameters={parameters} weather={weather} />
                        )}

                        {/* Overlay Metrics */}
                        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4 pointer-events-none">
                            {weather && (
                                <>
                                    <MetricBadge label="Temp" value={`${weather.temperature.toFixed(1)}°C`} />
                                    <MetricBadge label="Wind" value={`${weather.windSpeed.toFixed(1)} km/h`} />
                                    <MetricBadge label="Rain" value={`${weather.precipitationChance.toFixed(0)}%`} />
                                    <MetricBadge label="Comfort" value={`${weather.comfortIndex.toFixed(0)}/100`} />
                                </>
                            )}
                        </div>
                    </div>

                    {/* AI Summary (Minimal) */}
                    {aiExplanation && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-neutral-900/30 border border-white/5 rounded-xl p-4"
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-1 text-blue-400">✨</div>
                                <div>
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        {aiExplanation.summary}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

function MetricBadge({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg text-white pointer-events-auto">
            <span className="text-xs text-gray-400 uppercase tracking-wider mr-2">{label}</span>
            <span className="font-mono font-medium">{value}</span>
        </div>
    );
}
