'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatNumber } from '@/lib/utils';

interface PhysicsSliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit: string;
    description: string;
    icon?: React.ReactNode;
    onChange: (value: number) => void;
    color?: 'blue' | 'purple' | 'cyan' | 'pink';
}

export default function PhysicsSlider({
    label,
    value,
    min,
    max,
    step,
    unit,
    description,
    icon,
    onChange,
}: PhysicsSliderProps) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Calculate if value is extreme
    const normalizedValue = (value - min) / (max - min);
    const isExtreme = normalizedValue < 0.2 || normalizedValue > 0.8;

    return (
        <motion.div
            className="weather-card p-5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onHoverStart={() => setShowTooltip(true)}
            onHoverEnd={() => setShowTooltip(false)}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    {icon && <div className="text-2xl">{icon}</div>}
                    <div>
                        <h3 className="text-base font-semibold text-gray-800">{label}</h3>
                        <p className="text-xs text-gray-500">{description}</p>
                    </div>
                </div>

                {/* Value Display */}
                <motion.div
                    className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-100"
                    animate={{
                        scale: isDragging ? 1.05 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 400 }}
                >
                    <span className="text-lg font-bold text-blue-600">
                        {formatNumber(value, 2)} {unit}
                    </span>
                </motion.div>
            </div>

            {/* Slider */}
            <div className="relative mb-3">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                    className="w-full"
                />
            </div>

            {/* Min/Max Labels */}
            <div className="flex justify-between text-xs text-gray-400">
                <span>{min} {unit}</span>
                <span>{max} {unit}</span>
            </div>

            {/* Tooltip */}
            {showTooltip && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="mt-3 px-3 py-2 rounded-lg bg-gray-50 text-xs text-gray-600"
                >
                    {description}
                </motion.div>
            )}

            {/* Extreme Value Warning */}
            {isExtreme && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs flex items-center gap-2"
                >
                    <span>⚠️</span>
                    <span>Extreme value - unusual weather patterns expected</span>
                </motion.div>
            )}
        </motion.div>
    );
}
