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
    color = 'blue',
}: PhysicsSliderProps) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Calculate if value is extreme
    const normalizedValue = (value - min) / (max - min);
    const isExtreme = normalizedValue < 0.2 || normalizedValue > 0.8;

    // Color mapping
    const colorClasses = {
        blue: 'neon-glow-blue',
        purple: 'neon-glow-purple',
        cyan: 'neon-glow-cyan',
        pink: 'neon-glow-pink',
    };

    const borderColors = {
        blue: 'border-[#00D9FF]',
        purple: 'border-[#B026FF]',
        cyan: 'border-[#00FFF0]',
        pink: 'border-[#FF006E]',
    };

    const glowClass = isExtreme ? colorClasses[color] : '';

    return (
        <motion.div
            className="glass-card p-6 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onHoverStart={() => setShowTooltip(true)}
            onHoverEnd={() => setShowTooltip(false)}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    {icon && <div className="text-2xl">{icon}</div>}
                    <div>
                        <h3 className="text-lg font-semibold text-white">{label}</h3>
                        <p className="text-sm text-gray-400">{description}</p>
                    </div>
                </div>

                {/* Value Display */}
                <motion.div
                    className={`px-4 py-2 rounded-lg ${borderColors[color]} border-2 ${glowClass}`}
                    animate={{
                        scale: isDragging ? 1.1 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    <span className="text-xl font-bold gradient-text">
                        {formatNumber(value, 2)} {unit}
                    </span>
                </motion.div>
            </div>

            {/* Slider */}
            <div className="relative">
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

                {/* Progress Bar Background */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-2 bg-white/10 rounded-full pointer-events-none -z-10" />

                {/* Progress Bar Fill */}
                <div
                    className={`absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full pointer-events-none -z-10 ${color === 'blue' ? 'bg-[#00D9FF]' :
                            color === 'purple' ? 'bg-[#B026FF]' :
                                color === 'cyan' ? 'bg-[#00FFF0]' :
                                    'bg-[#FF006E]'
                        }`}
                    style={{ width: `${normalizedValue * 100}%` }}
                />
            </div>

            {/* Min/Max Labels */}
            <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>{min} {unit}</span>
                <span>{max} {unit}</span>
            </div>

            {/* Tooltip */}
            {showTooltip && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-50 px-4 py-2 glass-panel text-sm text-white whitespace-nowrap"
                >
                    {description}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white/20 rotate-45" />
                </motion.div>
            )}

            {/* Extreme Value Warning */}
            {isExtreme && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xs"
                >
                    ⚠️ Extreme value - expect unusual weather patterns
                </motion.div>
            )}
        </motion.div>
    );
}
