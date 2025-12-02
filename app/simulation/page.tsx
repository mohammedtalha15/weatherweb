"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import Globe from "@/components/Globe";
import PhysicsSlider from "@/components/PhysicsSlider";
import WeatherCard from "@/components/WeatherCard";
import AISummary from "@/components/AISummary";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { simulateWeather } from "@/lib/physicsEngine";
import { DEFAULT_PARAMS, PARAM_RANGES } from "@/lib/constants";
import { PhysicsParameters } from "@/lib/types";

export default function SimulationPage() {
    const [params, setParams] = useState<PhysicsParameters>(DEFAULT_PARAMS);
    const [weather, setWeather] = useState(simulateWeather(DEFAULT_PARAMS));
    const [isClient, setIsClient] = useState(false);

    const { showToast } = useToast();

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        setWeather(simulateWeather(params));
    }, [params]);

    const handleParamChange = (key: keyof PhysicsParameters, value: number) => {
        setParams((prev: PhysicsParameters) => ({ ...prev, [key]: value }));
    };

    const resetParams = () => {
        setParams(DEFAULT_PARAMS);
    };

    if (!isClient) return null;

    return (
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column: Controls */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="natural-card p-6 bg-[#FFFFFF] border-[#E5E5E5]">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-serif font-bold text-[#264653]">Physics Parameters</h2>
                            <button
                                onClick={resetParams}
                                className="p-2 rounded-full hover:bg-[#F0EEE6] text-[#8C8C8C] hover:text-[#264653] transition-colors"
                                title="Reset to Earth defaults"
                            >
                                <RotateCcw size={18} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <PhysicsSlider
                                label="Gravity"
                                value={params.gravity}
                                min={PARAM_RANGES.gravity.min}
                                max={PARAM_RANGES.gravity.max}
                                step={PARAM_RANGES.gravity.step}
                                unit="g"
                                description="Planetary gravitational force"
                                onChange={(v) => handleParamChange('gravity', v)}
                            />
                            <PhysicsSlider
                                label="Atmospheric Pressure"
                                value={params.pressure}
                                min={PARAM_RANGES.pressure.min}
                                max={PARAM_RANGES.pressure.max}
                                step={PARAM_RANGES.pressure.step}
                                unit="atm"
                                description="Surface air pressure"
                                onChange={(v) => handleParamChange('pressure', v)}
                            />
                            <PhysicsSlider
                                label="Sunlight Intensity"
                                value={params.sunlight}
                                min={PARAM_RANGES.sunlight.min}
                                max={PARAM_RANGES.sunlight.max}
                                step={PARAM_RANGES.sunlight.step}
                                unit="x"
                                description="Solar radiation strength"
                                onChange={(v) => handleParamChange('sunlight', v)}
                            />
                            <PhysicsSlider
                                label="CO₂ Concentration"
                                value={params.co2}
                                min={PARAM_RANGES.co2.min}
                                max={PARAM_RANGES.co2.max}
                                step={PARAM_RANGES.co2.step}
                                unit="ppm"
                                description="Greenhouse gas level"
                                onChange={(v) => handleParamChange('co2', v)}
                            />
                            <PhysicsSlider
                                label="Humidity"
                                value={params.humidity}
                                min={PARAM_RANGES.humidity.min}
                                max={PARAM_RANGES.humidity.max}
                                step={PARAM_RANGES.humidity.step}
                                unit="%"
                                description="Water vapor content"
                                onChange={(v) => handleParamChange('humidity', v)}
                            />
                            <PhysicsSlider
                                label="Air Density"
                                value={params.airDensity}
                                min={PARAM_RANGES.airDensity.min}
                                max={PARAM_RANGES.airDensity.max}
                                step={PARAM_RANGES.airDensity.step}
                                unit="kg/m³"
                                description="Mass per unit volume"
                                onChange={(v) => handleParamChange('airDensity', v)}
                            />
                        </div>
                    </div>

                    {/* AI Summary (Compact) */}
                    <div className="natural-card p-6 bg-[#FFFFFF] border-[#E5E5E5]">
                        <AISummary weather={weather} parameters={params} />
                    </div>
                </div>

                {/* Right Column: Visualization & Metrics */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Globe Visualization */}
                    <div className="natural-card overflow-hidden border-[#E5E5E5] h-[500px] relative bg-[#FDFBF7]">
                        <div className="absolute top-4 left-6 z-10">
                            <h2 className="text-lg font-serif font-bold text-[#264653]">Global Simulation</h2>
                            <p className="text-sm text-[#5C5C5C] italic">Real-time atmospheric rendering</p>
                        </div>
                        <Globe parameters={params} weather={weather} />
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <WeatherCard
                            title="Temperature"
                            value={weather.temperature}
                            unit="°C"
                            icon="temp"
                            severity={weather.temperature > 45 || weather.temperature < -20 ? 'danger' : weather.temperature > 35 || weather.temperature < 0 ? 'warning' : 'safe'}
                            delay={0}
                        />
                        <WeatherCard
                            title="Precipitation"
                            value={weather.precipitationChance}
                            unit="%"
                            icon="rain"
                            severity={weather.precipitationChance > 80 ? 'warning' : 'safe'}
                            delay={0.1}
                        />
                        <WeatherCard
                            title="Wind Speed"
                            value={weather.windSpeed}
                            unit="km/h"
                            icon="wind"
                            severity={weather.windSpeed > 100 ? 'danger' : weather.windSpeed > 60 ? 'warning' : 'safe'}
                            delay={0.2}
                        />
                        <WeatherCard
                            title="Storm Risk"
                            value={weather.stormProbability}
                            unit="%"
                            icon="storm"
                            severity={weather.stormProbability > 70 ? 'danger' : weather.stormProbability > 40 ? 'warning' : 'safe'}
                            delay={0.3}
                        />
                        <WeatherCard
                            title="Pressure"
                            value={1013 * params.pressure}
                            unit="hPa"
                            icon="pressure"
                            severity={params.pressure > 2 || params.pressure < 0.5 ? 'warning' : 'safe'}
                            delay={0.4}
                        />
                        <WeatherCard
                            title="Visibility"
                            value={weather.visibility}
                            unit="km"
                            icon="visibility"
                            severity={weather.visibility < 2 ? 'danger' : weather.visibility < 5 ? 'warning' : 'safe'}
                            delay={0.5}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
