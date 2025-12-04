'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Wind, GitCompare, Info, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero Section */}
      <div className="relative py-24 text-center">
        {/* Subtle Paper Texture Background */}
        <div className="absolute inset-0 bg-paper opacity-50 -z-10 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#E9C46A]/10 text-[#264653] text-sm font-medium border border-[#E9C46A]/20"
        >
          🌿 Discover the Nature of Weather
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-serif font-bold text-[#264653] mb-8 tracking-tight"
        >
          Atmospheric <span className="text-[#E76F51] italic">Physics</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-[#5C5C5C] max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Explore how fundamental forces shape planetary climates.
          A real-time simulation powered by scientific principles.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4"
        >
          <Link href="/simulation" className="px-8 py-4 bg-[#264653] text-[#FDFBF7] rounded-full font-medium hover:bg-[#2C5263] transition-all shadow-lg shadow-[#264653]/20 hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
            Start Simulation <ArrowRight size={18} />
          </Link>
          <Link href="/about" className="px-8 py-4 bg-[#FDFBF7] text-[#264653] border border-[#E5E5E5] rounded-full font-medium hover:bg-[#F0EEE6] transition-all shadow-sm hover:shadow-md">
            Learn More
          </Link>
        </motion.div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <FeatureCard
          icon={Wind}
          title="Real-time Simulation"
          description="Adjust gravity, pressure, and sunlight to see immediate atmospheric responses."
          href="/simulation"
          delay={0.4}
        />
        <FeatureCard
          icon={GitCompare}
          title="Comparative Analysis"
          description="Compare Earth's standard conditions against your modified physics models."
          href="/compare"
          delay={0.5}
        />
        <FeatureCard
          icon={Activity}
          title="Live Metrics"
          description="Monitor temperature, precipitation, and storm risks with precision."
          href="/simulation"
          delay={0.6}
        />
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="natural-card p-10 md:p-16 bg-[#FFFFFF] mb-20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E9C46A]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#264653] mb-6">Scientific Accuracy</h2>
            <p className="text-[#5C5C5C] leading-relaxed mb-8 text-lg">
              Our engine uses simplified fluid dynamics and thermodynamic equations to approximate real-world weather patterns.
              While optimized for the web, the relationships between gravity, pressure, and temperature follow established physical laws.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge text="Thermodynamics" />
              <Badge text="Fluid Dynamics" />
              <Badge text="Atmospheric Science" />
            </div>
          </div>
          <div className="relative h-80 bg-[#F0EEE6] rounded-2xl overflow-hidden flex items-center justify-center border border-[#E5E5E5]">
            <div className="text-center">
              <Wind size={64} className="text-[#264653] mx-auto mb-6 opacity-20" />
              <p className="text-[#264653] font-serif italic text-lg">Physics Engine Visualization</p>
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
      <Link href={href} className="block h-full p-8 bg-[#FFFFFF] rounded-2xl border border-[#E5E5E5] shadow-sm hover:shadow-xl hover:shadow-[#264653]/5 hover:border-[#264653]/20 hover:-translate-y-1 transition-all duration-300 group">
        <div className="w-14 h-14 rounded-full bg-[#264653]/5 flex items-center justify-center text-[#264653] mb-6 group-hover:bg-[#264653] group-hover:text-[#FDFBF7] transition-all duration-300">
          <Icon size={28} strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-serif font-bold text-[#2C3333] mb-3 group-hover:text-[#264653] transition-colors">{title}</h3>
        <p className="text-[#5C5C5C] leading-relaxed">{description}</p>
      </Link>
    </motion.div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="px-4 py-1.5 bg-[#F0EEE6] text-[#2C3333] rounded-full text-sm font-medium border border-[#E5E5E5]">
      {text}
    </span>
  );
}
