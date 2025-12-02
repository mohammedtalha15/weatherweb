"use client";
import { motion } from "framer-motion";
import { Thermometer, Cloud, Droplets, Wind, Zap, Eye, Gauge } from "lucide-react";
import { Card } from "@/components/ui/card";

/**
 * Props for the WeatherCard component.
 */
interface WeatherCardProps {
    /** Title of the metric (e.g., "Temperature") */
    title: string;
    /** Numeric value to display */
    value: number;
    /** Unit string (e.g., "°C") */
    unit: string;
    /** Icon key to map to Lucide icon */
    icon: string;
    /** Severity level determining the indicator color */
    severity: 'safe' | 'caution' | 'warning' | 'danger';
    /** Animation delay in seconds */
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

/**
 * Card component displaying a single weather metric.
 * Features animated entry, hover effects, and severity color indicators.
 */
export default function WeatherCard({ title, value, unit, icon, severity, delay }: WeatherCardProps) {
    const Icon = iconMap[icon] || Cloud;

    // Natural palette for severity
    const severityColor = {
        safe: "bg-[#2A9D8F]", // Teal
        caution: "bg-[#E9C46A]", // Gold
        warning: "bg-[#F4A261]", // Orange
        danger: "bg-[#E76F51]", // Terracotta
    }[severity];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
        >
            <div className="natural-card p-6 flex items-center justify-between group bg-[#FDFBF7] border-[#E5E5E5] hover:border-[#264653]/30">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#264653]/5 flex items-center justify-center text-[#264653] group-hover:bg-[#264653] group-hover:text-[#FDFBF7] transition-all duration-300">
                        <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="text-sm font-serif font-medium text-[#5C5C5C] mb-1 italic">{title}</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-[#2C3333] tracking-tight font-serif">
                                {value.toFixed(1)}
                            </span>
                            <span className="text-sm text-[#8C8C8C] font-medium">{unit}</span>
                        </div>
                    </div>
                </div>

                <div className={`w-2 h-2 rounded-full ${severityColor} opacity-60`} />
            </div>
        </motion.div>
    );
}
