"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, FlaskConical, Leaf, Heart, AlertTriangle, Lightbulb } from "lucide-react";
import { AIExplanation, PhysicsParameters, WeatherOutput } from "@/lib/types";

interface AISummaryProps {
    weather: WeatherOutput;
    parameters: PhysicsParameters;
}

export default function AISummary({ weather, parameters }: AISummaryProps) {
    const [explanation, setExplanation] = useState<AIExplanation | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAIExplanation = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/ai-summary', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ parameters, weatherOutput: weather }),
                });
                const data = await response.json();
                setExplanation(data);
            } catch (error) {
                console.error('Failed to fetch AI explanation:', error);
            } finally {
                setLoading(false);
            }
        };

        const timeout = setTimeout(fetchAIExplanation, 1000);
        return () => clearTimeout(timeout);
    }, [weather, parameters]);

    if (loading || !explanation) {
        return (
            <div className="natural-card bg-[#FFFFFF] p-6 border-[#E5E5E5] h-full min-h-[300px]">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-6 h-6 rounded-full bg-[#F0EEE6] animate-pulse opacity-50"></div>
                    <div className="h-4 w-32 bg-[#F0EEE6] rounded animate-pulse opacity-50"></div>
                </div>
                <div className="space-y-4">
                    <div className="h-4 w-full bg-[#F0EEE6] rounded animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-[#F0EEE6] rounded animate-pulse"></div>
                    <div className="h-4 w-4/6 bg-[#F0EEE6] rounded animate-pulse"></div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="h-24 bg-[#F0EEE6] rounded-xl animate-pulse"></div>
                    <div className="h-24 bg-[#F0EEE6] rounded-xl animate-pulse"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-2">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-[#264653]/5 rounded-lg">
                    <Sparkles className="text-[#264653]" size={20} />
                </div>
                <h3 className="font-serif font-bold text-[#2C3333] text-lg">AI Analysis</h3>
            </div>

            <div className="space-y-6">
                <SummarySection
                    icon={Sparkles}
                    title="Summary"
                    content={explanation.summary}
                    color="text-[#264653]"
                    bgColor="bg-[#264653]/5"
                />
                <SummarySection
                    icon={FlaskConical}
                    title="Scientific"
                    content={explanation.scientific}
                    color="text-[#2A9D8F]"
                    bgColor="bg-[#2A9D8F]/5"
                />
                <SummarySection
                    icon={Leaf}
                    title="Biological"
                    content={explanation.biological}
                    color="text-[#E9C46A]"
                    bgColor="bg-[#E9C46A]/5"
                />
                <SummarySection
                    icon={AlertTriangle}
                    title="Risks"
                    content={explanation.risks}
                    color="text-[#E76F51]"
                    bgColor="bg-[#E76F51]/5"
                />
            </div>
        </div>
    );
}

function SummarySection({ icon: Icon, title, content, color, bgColor }: { icon: any, title: string, content: string, color: string, bgColor: string }) {
    return (
        <div className="flex gap-4">
            <div className={`w-8 h-8 rounded-lg ${bgColor} flex items-center justify-center flex-shrink-0 mt-1`}>
                <Icon size={16} className={color} />
            </div>
            <div>
                <h4 className={`text-sm font-serif font-semibold mb-1 ${color}`}>{title}</h4>
                <p className="text-sm text-[#5C5C5C] leading-relaxed">{content}</p>
            </div>
        </div>
    );
}
