'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Sparkles,
    FlaskConical,
    Leaf,
    Heart,
    AlertTriangle,
    Lightbulb
} from 'lucide-react';
import { AIExplanation } from '@/lib/types';

interface AISummaryProps {
    explanation: AIExplanation | null;
    loading?: boolean;
}

export default function AISummary({ explanation, loading = false }: AISummaryProps) {
    const [displayedText, setDisplayedText] = useState<Record<string, string>>({});
    const [currentSection, setCurrentSection] = useState<string>('');

    // Typewriter effect
    useEffect(() => {
        if (!explanation || loading) {
            setDisplayedText({});
            return;
        }

        const sections = [
            { key: 'summary', text: explanation.summary },
            { key: 'scientific', text: explanation.scientific },
            { key: 'biological', text: explanation.biological },
            { key: 'dayFeeling', text: explanation.dayFeeling },
            { key: 'risks', text: explanation.risks },
            { key: 'funFact', text: explanation.funFact },
        ];

        let sectionIndex = 0;
        let charIndex = 0;

        const typeWriter = setInterval(() => {
            if (sectionIndex >= sections.length) {
                clearInterval(typeWriter);
                return;
            }

            const section = sections[sectionIndex];
            setCurrentSection(section.key);

            if (charIndex < section.text.length) {
                setDisplayedText(prev => ({
                    ...prev,
                    [section.key]: section.text.substring(0, charIndex + 1),
                }));
                charIndex++;
            } else {
                sectionIndex++;
                charIndex = 0;
            }
        }, 15); // Faster typing

        return () => clearInterval(typeWriter);
    }, [explanation, loading]);

    if (loading) {
        return (
            <div className="weather-panel p-8">
                <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-blue-500 animate-pulse" size={24} />
                    <h2 className="text-2xl font-bold text-gray-800">AI Weather Analysis</h2>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 rounded-lg bg-gray-100 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (!explanation) {
        return (
            <div className="weather-panel p-8 text-center">
                <Sparkles className="text-blue-500 mx-auto mb-4" size={48} />
                <p className="text-gray-500">
                    Adjust physics parameters to see AI-powered weather analysis
                </p>
            </div>
        );
    }

    const sections = [
        {
            key: 'summary',
            title: 'Simple Summary',
            icon: Sparkles,
            color: '#60a5fa',
            text: displayedText.summary || '',
        },
        {
            key: 'scientific',
            title: 'Scientific Explanation',
            icon: FlaskConical,
            color: '#3b82f6',
            text: displayedText.scientific || '',
        },
        {
            key: 'biological',
            title: 'Biological Impact',
            icon: Leaf,
            color: '#10b981',
            text: displayedText.biological || '',
        },
        {
            key: 'dayFeeling',
            title: 'What Your Day Feels Like',
            icon: Heart,
            color: '#f59e0b',
            text: displayedText.dayFeeling || '',
        },
        {
            key: 'risks',
            title: 'Risks & Anomalies',
            icon: AlertTriangle,
            color: '#ef4444',
            text: displayedText.risks || '',
        },
        {
            key: 'funFact',
            title: 'Fun Fact',
            icon: Lightbulb,
            color: '#fbbf24',
            text: displayedText.funFact || '',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="weather-panel p-8"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-blue-500" size={24} />
                <h2 className="text-2xl font-bold text-gray-800">AI Weather Analysis</h2>
            </div>

            {/* Comfort Index */}
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">Human Comfort Index</span>
                    <span className="text-4xl font-bold text-blue-600">
                        {explanation.comfortIndex}/100
                    </span>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${explanation.comfortIndex}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                    />
                </div>
            </div>

            {/* Sections */}
            <div className="space-y-6">
                {sections.map((section, index) => {
                    const Icon = section.icon;
                    const isTyping = currentSection === section.key;

                    return (
                        <motion.div
                            key={section.key}
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="weather-card p-5"
                        >
                            {/* Section Header */}
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className="p-2.5 rounded-xl"
                                    style={{
                                        backgroundColor: `${section.color}15`,
                                    }}
                                >
                                    <Icon size={20} style={{ color: section.color }} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {section.title}
                                </h3>
                            </div>

                            {/* Section Content */}
                            <div className="text-gray-600 leading-relaxed pl-11">
                                {section.text}
                                {isTyping && (
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                        className="inline-block w-0.5 h-5 ml-1 bg-blue-500"
                                    />
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
