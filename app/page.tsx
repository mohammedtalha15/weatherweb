'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, Globe2, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8"
        >
          <Sparkles size={16} className="text-[#00D9FF]" />
          <span className="text-sm text-gray-300">AI-Powered Climate Simulation</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-8xl font-bold mb-6 gradient-text leading-tight"
        >
          Physics-Shift
          <br />
          Weather Simulator
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Manipulate fundamental physics parameters and witness real-time weather transformations.
          Experience climate like never before with AI-powered explanations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/simulation">
            <button className="btn-primary flex items-center gap-2 group">
              Start Simulation
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </Link>

          <Link href="/about">
            <button className="btn-secondary flex items-center gap-2">
              <Info size={20} />
              Learn More
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-6xl mx-auto"
      >
        <FeatureCard
          icon={<Zap className="text-[#00D9FF]" size={32} />}
          title="Real-Time Physics"
          description="Adjust gravity, air density, CO₂, and more to see instant weather changes"
          delay={1.0}
        />
        <FeatureCard
          icon={<Globe2 className="text-[#B026FF]" size={32} />}
          title="3D Visualization"
          description="Interactive 3D Earth with dynamic atmosphere, clouds, and storm effects"
          delay={1.1}
        />
        <FeatureCard
          icon={<Sparkles className="text-[#00FFF0]" size={32} />}
          title="AI Explanations"
          description="Get detailed scientific insights and biological impact analysis"
          delay={1.2}
        />
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 max-w-4xl mx-auto"
      >
        <StatCard number="8" label="Physics Parameters" />
        <StatCard number="10" label="Weather Metrics" />
        <StatCard number="∞" label="Combinations" />
        <StatCard number="100%" label="Futuristic" />
      </motion.div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card p-6 text-center group"
    >
      <div className="mb-4 flex justify-center">
        <div className="p-4 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
        {number}
      </div>
      <div className="text-sm text-gray-400 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}

function Info({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
