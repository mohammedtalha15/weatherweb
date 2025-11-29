import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
}

export function formatNumber(value: number, decimals: number = 1): string {
    return value.toFixed(decimals);
}

export function getColorForValue(
    value: number,
    min: number,
    max: number,
    colors: string[]
): string {
    const normalized = (value - min) / (max - min);
    const index = Math.floor(normalized * (colors.length - 1));
    return colors[Math.max(0, Math.min(index, colors.length - 1))];
}

export function getSeverityColor(value: number, thresholds: number[]): string {
    const colors = ['#50E3C2', '#F5A623', '#FF6B35', '#FF006E'];
    for (let i = 0; i < thresholds.length; i++) {
        if (value < thresholds[i]) return colors[i];
    }
    return colors[colors.length - 1];
}
