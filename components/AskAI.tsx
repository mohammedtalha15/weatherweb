"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhysicsParameters, WeatherOutput } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

interface AskAIProps {
    parameters: PhysicsParameters;
    weather: WeatherOutput;
}

interface Message {
    role: 'user' | 'ai';
    content: string;
}

export default function AskAI({ parameters, weather }: AskAIProps) {
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleAsk = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!query.trim() || loading) return;

        const userMessage = query.trim();
        setQuery("");
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const response = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMessage,
                    parameters,
                    weatherOutput: weather
                }),
            });

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'ai', content: data.response }]);
        } catch (error) {
            console.error("Failed to ask AI:", error);
            setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I couldn't process that request. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="natural-card bg-[#FFFFFF] border-[#E5E5E5] flex flex-col h-[500px]">
            <div className="p-4 border-b border-[#E5E5E5] flex items-center gap-2 bg-[#FDFBF7]/50">
                <div className="p-2 bg-[#264653]/10 rounded-lg">
                    <Bot className="text-[#264653]" size={20} />
                </div>
                <div>
                    <h3 className="font-serif font-bold text-[#2C3333]">Ask the Physicist</h3>
                    <p className="text-xs text-[#5C5C5C]">Ask about the current simulation</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-[#8C8C8C] mt-10 px-6">
                        <Bot size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="text-sm">
                            I'm analyzing your simulation in real-time. Ask me anything about the current weather conditions, physics parameters, or potential anomalies!
                        </p>
                    </div>
                )}

                <AnimatePresence initial={false}>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-[#E9C46A]/20 text-[#2C3333]' : 'bg-[#264653]/10 text-[#264653]'}`}>
                                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                            </div>
                            <div className={`p-3 rounded-2xl text-sm max-w-[80%] ${msg.role === 'user'
                                    ? 'bg-[#264653] text-[#FDFBF7] rounded-tr-none'
                                    : 'bg-[#F0EEE6] text-[#2C3333] rounded-tl-none'
                                }`}>
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-[#264653]/10 flex items-center justify-center flex-shrink-0 text-[#264653]">
                            <Bot size={14} />
                        </div>
                        <div className="bg-[#F0EEE6] p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                            <div className="w-2 h-2 bg-[#8C8C8C] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-[#8C8C8C] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-[#8C8C8C] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleAsk} className="p-4 border-t border-[#E5E5E5] bg-[#FDFBF7]/50">
                <div className="flex gap-2">
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask about gravity, temperature..."
                        className="flex-1 bg-white border-[#E5E5E5] focus-visible:ring-[#264653]"
                        disabled={loading}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={loading || !query.trim()}
                        className="bg-[#264653] hover:bg-[#2C5263] text-white"
                    >
                        <Send size={18} />
                    </Button>
                </div>
            </form>
        </div>
    );
}
