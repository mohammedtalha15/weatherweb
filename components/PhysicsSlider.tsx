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
        <div className="group p-3 -mx-3 rounded-xl hover:bg-neutral-50 transition-colors duration-200">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">{label}</span>
                    <div className="relative group/tooltip">
                        <Info size={14} className="text-neutral-400 cursor-help hover:text-blue-500 transition-colors" />
                        <div className="absolute left-0 bottom-full mb-2 w-48 p-3 bg-neutral-900/90 backdrop-blur-sm text-white text-xs rounded-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl border border-white/10">
                            {description}
                            <div className="absolute bottom-[-4px] left-3 w-2 h-2 bg-neutral-900/90 rotate-45"></div>
                        </div>
                    </div>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-mono font-bold min-w-[60px] text-center border border-blue-100 group-hover:border-blue-200 transition-colors">
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
