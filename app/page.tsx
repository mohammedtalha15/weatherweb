'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Wind, GitCompare, Info, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero Section */}
      <div className="py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight"
        >
          Atmospheric <span className="text-blue-500">Physics</span> Engine
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-neutral-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Explore how fundamental forces shape planetary climates.
          A real-time simulation powered by scientific principles.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4"
        >
          <Link href="/simulation" className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2">
            Start Simulation <ArrowRight size={18} />
          </Link>
          <Link href="/about" className="px-8 py-3 bg-white text-neutral-700 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-colors shadow-sm">
            Learn More
          </Link>
        </motion.div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <FeatureCard
          icon={Wind}
          title="Real-time Simulation"
          description="Adjust gravity, pressure, and sunlight to see immediate atmospheric responses."
          href="/simulation"
          delay={0.3}
        />
        <FeatureCard
          icon={GitCompare}
          title="Comparative Analysis"
          description="Compare Earth's standard conditions against your modified physics models."
          href="/compare"
          delay={0.4}
        />
        <FeatureCard
          icon={Activity}
          title="Live Metrics"
          description="Monitor temperature, precipitation, and storm risks with precision."
          href="/simulation"
          delay={0.5}
        />
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-3xl p-8 md:p-12 border border-neutral-100 shadow-xl shadow-neutral-200/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Scientific Accuracy</h2>
            <p className="text-neutral-500 leading-relaxed mb-6">
              Our engine uses simplified fluid dynamics and thermodynamic equations to approximate real-world weather patterns.
              While optimized for the web, the relationships between gravity, pressure, and temperature follow established physical laws.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge text="Thermodynamics" />
              <Badge text="Fluid Dynamics" />
              <Badge text="Atmospheric Science" />
            </div>
          </div>
          <div className="relative h-64 bg-blue-50 rounded-2xl overflow-hidden flex items-center justify-center border border-blue-100">
            <div className="text-center">
              <Wind size={48} className="text-blue-400 mx-auto mb-4 opacity-50" />
              <p className="text-blue-400 font-medium">Physics Engine Visualization</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, href, delay }: { icon: any, title: string, description: string, href: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Link href={href} className="block h-full p-8 bg-white rounded-2xl border border-neutral-100 shadow-lg shadow-neutral-200/40 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 group">
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-neutral-500 leading-relaxed">{description}</p>
      </Link>
    </motion.div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-sm font-medium">
      {text}
    </span>
  );
}
