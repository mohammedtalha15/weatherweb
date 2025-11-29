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

    const getSeverity = (value: number, thresholds: number[]): 'safe' | 'caution' | 'warning' | 'danger' => {
        if (value < thresholds[0]) return 'safe';
        if (value < thresholds[1]) return 'caution';
        if (value < thresholds[2]) return 'warning';
        return 'danger';
    };

    return (
        <div className="min-h-screen px-4 py-24 bg-[#1a1a1a]">
            <div className="max-w-[1800px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
                >
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                            Weather Simulation Dashboard
                        </h1>
                        <p className="text-gray-400">
                            Adjust physics parameters and observe real-time weather changes
                        </p>
                    </div>

                    <button
                        onClick={handleReset}
                        className="btn-secondary flex items-center gap-2 bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700"
                    >
                        <RotateCcw size={18} />
                        Reset to Earth Normal
                    </button>
                </motion.div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    {/* Left Column - Physics Controls */}
                    <div className="xl:col-span-3 space-y-4">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span>⚙️</span>
                            Physics Controls
                        </h2>

                        <PhysicsSlider
                            label="Gravity"
                            value={parameters.gravity}
                            min={PARAM_RANGES.gravity.min}
                            max={PARAM_RANGES.gravity.max}
                            step={PARAM_RANGES.gravity.step}
                            unit="g"
                            description="Earth gravity = 1.0"
                            icon="🌍"
                            onChange={(v) => handleParameterChange('gravity', v)}
                            color="blue"
                        />

                        <PhysicsSlider
                            label="Air Density"
                            value={parameters.airDensity}
                            min={PARAM_RANGES.airDensity.min}
                            max={PARAM_RANGES.airDensity.max}
                            step={PARAM_RANGES.airDensity.step}
                            unit="kg/m³"
                            description="Affects wind and heat"
                            icon="💨"
                            onChange={(v) => handleParameterChange('airDensity', v)}
                            color="cyan"
                        />

                        <PhysicsSlider
                            label="Pressure"
                            value={parameters.pressure}
                            min={PARAM_RANGES.pressure.min}
                            max={PARAM_RANGES.pressure.max}
                            step={PARAM_RANGES.pressure.step}
                            unit="mb"
                            description="Atmospheric pressure"
                            icon="📊"
                            onChange={(v) => handleParameterChange('pressure', v)}
                            color="purple"
                        />

                        <PhysicsSlider
                            label="CO₂ Level"
                            value={parameters.co2}
                            min={PARAM_RANGES.co2.min}
                            max={PARAM_RANGES.co2.max}
                            step={PARAM_RANGES.co2.step}
                            unit="ppm"
                            description="Greenhouse gas concentration"
                            icon="🏭"
                            onChange={(v) => handleParameterChange('co2', v)}
                            color="pink"
                        />

                        <PhysicsSlider
                            label="Sunlight"
                            value={parameters.sunlight}
                            min={PARAM_RANGES.sunlight.min}
                            max={PARAM_RANGES.sunlight.max}
                            step={PARAM_RANGES.sunlight.step}
                            unit="x"
                            description="Solar radiation intensity"
                            icon="☀️"
                            onChange={(v) => handleParameterChange('sunlight', v)}
                            color="blue"
                        />

                        <PhysicsSlider
                            label="Humidity"
                            value={parameters.humidity}
                            min={PARAM_RANGES.humidity.min}
                            max={PARAM_RANGES.humidity.max}
                            step={PARAM_RANGES.humidity.step}
                            unit="%"
                            description="Atmospheric moisture"
                            icon="💧"
                            onChange={(v) => handleParameterChange('humidity', v)}
                            color="cyan"
                        />

                        <PhysicsSlider
                            label="Wind Drag"
                            value={parameters.windDrag}
                            min={PARAM_RANGES.windDrag.min}
                            max={PARAM_RANGES.windDrag.max}
                            step={PARAM_RANGES.windDrag.step}
                            unit="x"
                            description="Air resistance factor"
                            icon="🌪️"
                            onChange={(v) => handleParameterChange('windDrag', v)}
                            color="purple"
                        />

                        <PhysicsSlider
                            label="Cloud Formation"
                            value={parameters.cloudCondensation}
                            min={PARAM_RANGES.cloudCondensation.min}
                            max={PARAM_RANGES.cloudCondensation.max}
                            step={PARAM_RANGES.cloudCondensation.step}
                            unit="x"
                            description="Condensation rate"
                            icon="☁️"
                            onChange={(v) => handleParameterChange('cloudCondensation', v)}
                            color="pink"
                        />
                    </div>

                    {/* Center Column - 3D Globe */}
                    <div className="xl:col-span-5">
                        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 h-full min-h-[600px] flex flex-col">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <span>🌐</span>
                                Live Simulation
                            </h2>
                            <div className="flex-1 bg-black/20 rounded-xl border border-white/5 overflow-hidden relative">
                                {weather && (
                                    <Globe parameters={parameters} weather={weather} />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Weather Outputs */}
                    <div className="xl:col-span-4 space-y-4">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span>📈</span>
                            Weather Metrics
                        </h2>

                        {weather && (
                            <>
                                <WeatherCard
                                    title="Temperature"
                                    value={weather.temperature}
                                    unit="°C"
                                    icon="temp"
                                    severity={getSeverity(Math.abs(weather.temperature - 20), [10, 20, 30])}
                                    delay={0}
                                />

                                <WeatherCard
                                    title="Cloud Altitude"
                                    value={weather.cloudAltitude}
                                    unit="m"
                                    icon="cloud"
                                    severity="safe"
                                    delay={0.05}
                                />

                                <WeatherCard
                                    title="Rain Chance"
                                    value={weather.precipitationChance}
                                    unit="%"
                                    icon="rain"
                                    severity={getSeverity(weather.precipitationChance, [30, 60, 80])}
                                    delay={0.1}
                                />

                                <WeatherCard
                                    title="Wind Speed"
                                    value={weather.windSpeed}
                                    unit="km/h"
                                    icon="wind"
                                    severity={getSeverity(weather.windSpeed, [20, 40, 60])}
                                    delay={0.15}
                                />

                                <WeatherCard
                                    title="Storm Risk"
                                    value={weather.stormProbability}
                                    unit="%"
                                    icon="storm"
                                    severity={getSeverity(weather.stormProbability, [30, 60, 80])}
                                    delay={0.2}
                                />

                                <WeatherCard
                                    title="Visibility"
                                    value={weather.visibility}
                                    unit="km"
                                    icon="visibility"
                                    severity={getSeverity(10 - weather.visibility, [2, 5, 7])}
                                    delay={0.25}
                                />

                                <WeatherCard
                                    title="Comfort Index"
                                    value={weather.comfortIndex}
                                    unit="/100"
                                    icon="pressure"
                                    severity={getSeverity(100 - weather.comfortIndex, [30, 50, 70])}
                                    delay={0.3}
                                />
                            </>
                        )}
                    </div>
                </div>

                {/* AI Explanation Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8"
                >
                    <AISummary explanation={aiExplanation} loading={isLoadingAI} />
                </motion.div>
            </div>
        </div>
    );
}
