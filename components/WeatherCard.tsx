"use client";
import { motion } from "framer-motion";
import { Thermometer, Cloud, Droplets, Wind, Zap, Eye, Gauge } from "lucide-react";

interface WeatherCardProps {
    title: string;
    value: number;
    unit: string;
    icon: string;
    severity: 'safe' | 'caution' | 'warning' | 'danger';
    delay: number;
}

const iconMap: Record<string, any> = {
    temp: Thermometer,
    cloud: Cloud,
    rain: Droplets,
    wind: Wind,
    storm: Zap,
    visibility: Eye,
    pressure: Gauge,
};

export default function WeatherCard({ title, value, unit, icon, severity, delay }: WeatherCardProps) {
    const Icon = iconMap[icon] || Cloud;

    // Severity colors for the little indicator dot only - keep the rest clean
    const severityColor = {
        safe: "bg-green-400",
        caution: "bg-yellow-400",
        warning: "bg-orange-400",
        danger: "bg-red-400",
    }[severity];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            className="weather-card p-6 flex items-center justify-between group"
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-neutral-500 mb-1">{title}</h3>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-semibold text-neutral-800 tracking-tight">
                            {value.toFixed(1)}
                        </span>
                        <span className="text-sm text-neutral-400 font-medium">{unit}</span>
                    </div>
                </div>
            </div>

            <div className={`w-2 h-2 rounded-full ${severityColor} opacity-50`} />
        </motion.div>
    );
}
