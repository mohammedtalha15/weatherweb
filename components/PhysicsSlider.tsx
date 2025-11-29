"use client";
import { Info } from "lucide-react";

interface PhysicsSliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit: string;
    description: string;
    onChange: (value: number) => void;
}

export default function PhysicsSlider({
    label,
    value,
    min,
    max,
    step,
    unit,
    description,
    onChange,
}: PhysicsSliderProps) {
    return (
        <div className="group">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-neutral-700">{label}</span>
                    <div className="relative group/tooltip">
                        <Info size={14} className="text-neutral-400 cursor-help hover:text-blue-500 transition-colors" />
                        <div className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-neutral-800 text-white text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                            {description}
                        </div>
                    </div>
                </div>
                <div className="px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-xs font-mono font-medium min-w-[60px] text-center">
                    {value.toFixed(1)}{unit}
                </div>
            </div>

            <div className="relative h-6 flex items-center">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
            </div>
        </div>
    );
}
