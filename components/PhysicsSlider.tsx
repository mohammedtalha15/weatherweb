"use client";
import { Info } from "lucide-react";

/**
 * Props for the PhysicsSlider component.
 */
interface PhysicsSliderProps {
    /** Label displayed above the slider */
    label: string;
    /** Current numeric value */
    value: number;
    /** Minimum allowed value */
    min: number;
    /** Maximum allowed value */
    max: number;
    /** Step increment size */
    step: number;
    /** Unit string (e.g., "kg/m³") */
    unit: string;
    /** Tooltip description explaining the physics parameter */
    description: string;
    /** Callback when value changes */
    onChange: (value: number) => void;
}

/**
 * Interactive slider component for adjusting physics parameters.
 * Features a custom design with tooltips, value display, and accessibility attributes.
 */
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
        <div className="group p-4 -mx-4 rounded-2xl hover:bg-[#F0EEE6] transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-serif font-medium text-[#2C3333] italic">{label}</span>
                    <div className="relative group/tooltip">
                        <Info size={14} className="text-[#8C8C8C] cursor-help hover:text-[#264653] transition-colors" />
                        <div className="absolute left-0 bottom-full mb-2 w-48 p-3 bg-[#2C3333] text-[#FDFBF7] text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                            {description}
                            <div className="absolute bottom-[-4px] left-3 w-2 h-2 bg-[#2C3333] rotate-45"></div>
                        </div>
                    </div>
                </div>
                <div className="px-3 py-1 rounded-md bg-[#FDFBF7] text-[#264653] text-xs font-mono font-bold min-w-[70px] text-center border border-[#E5E5E5] shadow-sm">
                    {value.toFixed(1)}{unit}
                </div>
            </div>

            <div className="relative h-8 flex items-center">
                {/* Track */}
                <div className="absolute w-full h-2 bg-[#E5E5E5] rounded-full overflow-hidden border border-[#D4D4D4]">
                    <div
                        className="h-full bg-[#264653] opacity-20"
                        style={{ width: `${((value - min) / (max - min)) * 100}%` }}
                    />
                </div>

                {/* Native Input (Invisible but functional) */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                    aria-label={label}
                    aria-valuemin={min}
                    aria-valuemax={max}
                    aria-valuenow={value}
                    aria-valuetext={`${value.toFixed(1)} ${unit}`}
                />

                {/* Custom Thumb */}
                <div
                    className="absolute h-5 w-5 bg-[#264653] rounded-full shadow-md border-2 border-[#FDFBF7] pointer-events-none z-10 transition-transform duration-75 ease-out group-hover:scale-110"
                    style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 10px)` }}
                />
            </div>
        </div>
    );
}
