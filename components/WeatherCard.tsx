'use client';

import { motion } from 'framer-motion';
import {
    Cloud,
    CloudRain,
    Wind,
    Thermometer,
    Eye,
    Droplets,
    CloudLightning,
    Gauge,
    LucideIcon
} from 'lucide-react';
import { formatNumber, getSeverityColor } from '@/lib/utils';

interface WeatherCardProps {
    title: string;
    value: number;
    unit: string;
    icon: 'cloud' | 'rain' | 'wind' | 'temp' | 'visibility' | 'humidity' | 'storm' | 'pressure';
    trend?: 'up' | 'down' | 'neutral';
    severity?: 'safe' | 'caution' | 'warning' | 'danger';
    delay?: number;
}

const iconMap: Record<string, LucideIcon> = {
    cloud: Cloud,
    rain: CloudRain,
    wind: Wind,
    temp: Thermometer,
    visibility: Eye,
    humidity: Droplets,
    storm: CloudLightning,
    pressure: Gauge,
};

const severityColors = {
    safe: '#50E3C2',
    caution: '#F5A623',
    warning: '#FF6B35',
    danger: '#FF006E',
};

export default function WeatherCard({
    title,
    value,
    unit,
    icon,
    trend = 'neutral',
    severity = 'safe',
    delay = 0,
}: WeatherCardProps) {
    const Icon = iconMap[icon];
    const severityColor = severityColors[severity];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay,
                type: 'spring',
                stiffness: 200
            }}
            whileHover={{
                scale: 1.05,
                y: -5,
            }}
            className="glass-card p-6 relative overflow-hidden group cursor-pointer"
            style={{
                borderColor: severityColor + '40',
            }}
        >
            {/* Background Glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                style={{
                    background: `radial-gradient(circle at center, ${severityColor}, transparent)`,
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div
                        className="p-3 rounded-xl"
                        style={{
                            background: `${severityColor}20`,
                            boxShadow: `0 0 20px ${severityColor}30`,
                        }}
                    >
                        <Icon
                            size={28}
                            style={{ color: severityColor }}
                            className="group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>

                    {/* Trend Indicator */}
                    {trend !== 'neutral' && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`text-2xl ${trend === 'up' ? 'text-red-400' : 'text-blue-400'
                                }`}
                        >
                            {trend === 'up' ? '↑' : '↓'}
                        </motion.div>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">
                    {title}
                </h3>

                {/* Value */}
                <div className="flex items-baseline gap-2">
                    <motion.span
                        key={value}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl font-bold"
                        style={{ color: severityColor }}
                    >
                        {formatNumber(value, 1)}
                    </motion.span>
                    <span className="text-xl text-gray-400 font-medium">
                        {unit}
                    </span>
                </div>

                {/* Severity Indicator */}
                <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${getSeverityLevel(severity)}%` }}
                            transition={{ duration: 0.8, delay: delay + 0.2 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: severityColor }}
                        />
                    </div>
                    <span className="text-xs text-gray-500 capitalize">{severity}</span>
                </div>
            </div>

            {/* Animated Border */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                    border: `2px solid ${severityColor}`,
                    opacity: 0,
                }}
                whileHover={{
                    opacity: 0.6,
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
}

function getSeverityLevel(severity: string): number {
    switch (severity) {
        case 'safe': return 25;
        case 'caution': return 50;
        case 'warning': return 75;
        case 'danger': return 100;
        default: return 25;
    }
}
