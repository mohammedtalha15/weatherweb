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
            <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-blue-500 animate-pulse" size={20} />
                    <h3 className="font-semibold text-neutral-700">AI Analysis</h3>
                </div>
                <div className="space-y-3">
                    <div className="h-4 bg-neutral-100 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-neutral-100 rounded w-full animate-pulse" />
                    <div className="h-4 bg-neutral-100 rounded w-5/6 animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div className="p-2">
            <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                    <Sparkles className="text-blue-500" size={20} />
                </div>
                <h3 className="font-bold text-neutral-800 text-lg">AI Analysis</h3>
            </div>

            <div className="space-y-6">
                <SummarySection
                    icon={Sparkles}
                    title="Summary"
                    content={explanation.summary}
                    color="text-blue-500"
                    bgColor="bg-blue-50"
                />
                <SummarySection
                    icon={FlaskConical}
                    title="Scientific"
                    content={explanation.scientific}
                    color="text-purple-500"
                    bgColor="bg-purple-50"
                />
                <SummarySection
                    icon={Leaf}
                    title="Biological"
                    content={explanation.biological}
                    color="text-green-500"
                    bgColor="bg-green-50"
                />
                <SummarySection
                    icon={AlertTriangle}
                    title="Risks"
                    content={explanation.risks}
                    color="text-orange-500"
                    bgColor="bg-orange-50"
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
                <h4 className={`text-sm font-semibold mb-1 ${color}`}>{title}</h4>
                <p className="text-sm text-neutral-600 leading-relaxed">{content}</p>
            </div>
        </div>
    );
}
