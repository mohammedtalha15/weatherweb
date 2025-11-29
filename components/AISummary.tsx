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
        }, 20); // Typing speed

        return () => clearInterval(typeWriter);
    }, [explanation, loading]);

    if (loading) {
        return (
            <div className="glass-panel p-8">
                <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-[#00D9FF] animate-pulse" size={24} />
                    <h2 className="text-2xl font-bold gradient-text">AI Weather Analysis</h2>
                </div>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="shimmer h-20 rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    if (!explanation) {
        return (
            <div className="glass-panel p-8 text-center">
                <Sparkles className="text-[#00D9FF] mx-auto mb-4" size={48} />
                <p className="text-gray-400">
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
            color: '#00D9FF',
            text: displayedText.summary || '',
        },
        {
            key: 'scientific',
            title: 'Scientific Explanation',
            icon: FlaskConical,
            color: '#B026FF',
            text: displayedText.scientific || '',
        },
        {
            key: 'biological',
            title: 'Biological Impact',
            icon: Leaf,
            color: '#50E3C2',
            text: displayedText.biological || '',
        },
        {
            key: 'dayFeeling',
            title: 'What Your Day Feels Like',
            icon: Heart,
            color: '#FF006E',
            text: displayedText.dayFeeling || '',
        },
        {
            key: 'risks',
            title: 'Risks & Anomalies',
            icon: AlertTriangle,
            color: '#F5A623',
            text: displayedText.risks || '',
        },
        {
            key: 'funFact',
            title: 'Fun Fact',
            icon: Lightbulb,
            color: '#FFD700',
            text: displayedText.funFact || '',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-[#00D9FF]" size={24} />
                <h2 className="text-2xl font-bold gradient-text">AI Weather Analysis</h2>
            </div>

            {/* Comfort Index */}
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[#00D9FF]/20 to-[#B026FF]/20 border border-white/10">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Human Comfort Index</span>
                    <span className="text-3xl font-bold gradient-text">
                        {explanation.comfortIndex}/100
                    </span>
                </div>
                <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${explanation.comfortIndex}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-[#00D9FF] to-[#B026FF]"
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
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Section Header */}
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className="p-2 rounded-lg"
                                    style={{
                                        background: `${section.color}20`,
                                        boxShadow: `0 0 15px ${section.color}30`,
                                    }}
                                >
                                    <Icon size={20} style={{ color: section.color }} />
                                </div>
                                <h3 className="text-lg font-semibold" style={{ color: section.color }}>
                                    {section.title}
                                </h3>
                            </div>

                            {/* Section Content */}
                            <div className="pl-11 text-gray-300 leading-relaxed">
                                {section.text}
                                {isTyping && (
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                        className="inline-block w-2 h-5 ml-1 bg-[#00D9FF]"
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
