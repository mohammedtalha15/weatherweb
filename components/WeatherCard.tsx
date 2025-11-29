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
import { formatNumber } from '@/lib/utils';

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
    safe: '#60a5fa',
    caution: '#fbbf24',
    warning: '#f59e0b',
    danger: '#ef4444',
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                delay,
                ease: [0.4, 0, 0.2, 1]
            }}
            whileHover={{
                y: -4,
                transition: { duration: 0.2 }
            }}
            className="weather-card p-6 cursor-pointer hover-lift bg-neutral-900/50 border-neutral-800"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div
                    className="p-3 rounded-2xl icon-glow"
                    style={{
                        backgroundColor: `${severityColor}15`,
                    }}
                >
                    <Icon
                        size={24}
                        style={{ color: severityColor }}
                        strokeWidth={2}
                    />
                </div>

                {/* Trend Indicator */}
                {trend !== 'neutral' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-xl"
                        style={{ color: trend === 'up' ? '#ef4444' : '#60a5fa' }}
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
            <div className="flex items-baseline gap-2 mb-3">
                <motion.span
                    key={value}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="metric-value font-bold text-3xl"
                    style={{ color: severityColor }}
                >
                    {formatNumber(value, 1)}
                </motion.span>
                <span className="text-lg text-gray-500 font-medium">
                    {unit}
                </span>
            </div>

            {/* Status Bar */}
            <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${getSeverityLevel(severity)}%` }}
                    transition={{ duration: 0.6, delay: delay + 0.2, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: severityColor }}
                />
            </div>

            {/* Status Label */}
            <div className="mt-2 text-xs font-medium capitalize" style={{ color: severityColor }}>
                {severity === 'safe' ? 'Normal' : severity}
            </div>
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
