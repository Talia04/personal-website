import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Keyboard, Brain, Bug, Sparkles } from "lucide-react";
import { BugSmasher } from "./BugSmasher";
import { RizzRoastGenerator } from "./RizzRoastGenerator";
import { TypingSpeedTest } from "./TypingSpeedTest";
import { MemoryCardGame } from "./MemoryCardGame";

const tabs = [
  { id: "typing", label: "Typing Test", icon: Keyboard, color: "#a8d500" },
  { id: "memory", label: "Memory Game", icon: Brain, color: "#00d4ff" },
  { id: "bugsmasher", label: "Bug Smasher", icon: Bug, color: "#ff6b6b" },
  { id: "rizzroast", label: "Rizz or Roast", icon: Sparkles, color: "#c084fc" },
];

export function Games() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeTab, setActiveTab] = useState("typing");
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <section
      id="games"
      ref={ref}
      className="relative min-h-screen overflow-hidden py-32"
      style={{ backgroundColor: "#0f0b16" }}
    >
      {/* Large backdrop text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.02 }}
          transition={{ duration: 1.5 }}
          className="font-black leading-none whitespace-nowrap text-white"
          style={{
            y: y1,
            fontSize: 'clamp(120px, 22vw, 350px)',
            letterSpacing: '-0.02em'
          }}
        >
          PLAY
        </motion.span>
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <div className="max-w-7xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.3em] text-[#a8d500] block mb-6"
          >
            007 — Fun Zone
          </motion.span>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-black leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Take a
              <br />
              <span className="text-[#a8d500]">break.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/40 text-sm max-w-sm lg:text-right"
            >
              Test your skills with mini-games, coding challenges,
              and AI-powered entertainment.
            </motion.p>
          </div>
        </div>

        {/* Tab Navigation - Large pill buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isHovered = hoveredTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                  onClick={() => setActiveTab(tab.id)}
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative flex flex-col items-center justify-center gap-3 
                    px-6 py-6 rounded-2xl
                    transition-all duration-300 text-sm font-medium
                    ${isActive
                      ? 'text-[#050505]'
                      : 'text-white/60 hover:text-white border border-white/10'}
                  `}
                  style={{
                    backgroundColor: isActive ? tab.color : 'rgba(255,255,255,0.03)',
                    boxShadow: isActive ? `0 0 40px ${tab.color}50, inset 0 1px 0 rgba(255,255,255,0.2)` : 'none',
                    borderColor: isActive ? 'transparent' : isHovered ? `${tab.color}40` : 'rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Icon container */}
                  <div
                    className={`
                      w-12 h-12 rounded-xl flex items-center justify-center
                      transition-all duration-300
                      ${isActive ? 'bg-black/10' : 'bg-white/5'}
                    `}
                  >
                    <Icon size={24} className={isActive ? 'text-[#050505]' : ''} style={{ color: isActive ? '#050505' : tab.color }} />
                  </div>

                  <span className="font-semibold">{tab.label}</span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.div
                      layoutId="activeGameDot"
                      className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#0f0b16]"
                    />
                  )}

                  {/* Hover glow for inactive */}
                  {!isActive && isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${tab.color}10 0%, transparent 70%)`,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Game container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div
            className="relative rounded-[32px] border overflow-hidden transition-all duration-500"
            style={{
              backgroundColor: 'rgba(255,255,255,0.02)',
              borderColor: `${activeTabData?.color}25`,
              boxShadow: `0 0 80px ${activeTabData?.color}10, inset 0 1px 0 rgba(255,255,255,0.03)`,
            }}
          >
            {/* Top decorative bar */}
            <div
              className="h-1 w-full transition-colors duration-500"
              style={{
                background: `linear-gradient(90deg, transparent, ${activeTabData?.color}60, transparent)`
              }}
            />

            {/* Corner accents - larger and more prominent */}
            <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none">
              <div
                className="absolute top-6 left-6 w-12 h-[2px] transition-colors duration-500"
                style={{ backgroundColor: `${activeTabData?.color}50` }}
              />
              <div
                className="absolute top-6 left-6 h-12 w-[2px] transition-colors duration-500"
                style={{ backgroundColor: `${activeTabData?.color}50` }}
              />
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
              <div
                className="absolute top-6 right-6 w-12 h-[2px] transition-colors duration-500"
                style={{ backgroundColor: `${activeTabData?.color}50` }}
              />
              <div
                className="absolute top-6 right-6 h-12 w-[2px] transition-colors duration-500"
                style={{ backgroundColor: `${activeTabData?.color}50` }}
              />
            </div>
            <div className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none">
              <div
                className="absolute bottom-6 left-6 w-12 h-[2px] transition-colors duration-500"
                style={{ backgroundColor: `${activeTabData?.color}30` }}
              />
              <div
                className="absolute bottom-6 left-6 h-12 w-[2px] transition-colors duration-500"
                style={{ backgroundColor: `${activeTabData?.color}30` }}
              />
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none">
              <div
                className="absolute bottom-6 right-6 w-12 h-[2px] transition-colors duration-500"
                style={{ backgroundColor: `${activeTabData?.color}30` }}
              />
              <div
                className="absolute bottom-6 right-6 h-12 w-[2px] transition-colors duration-500"
                style={{ backgroundColor: `${activeTabData?.color}30` }}
              />
            </div>

            {/* Tab Content */}
            <div className="p-8 md:p-12">
              {activeTab === "typing" && <TypingSpeedTest />}
              {activeTab === "memory" && <MemoryCardGame />}
              {activeTab === "bugsmasher" && <BugSmasher />}
              {activeTab === "rizzroast" && <RizzRoastGenerator />}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#a8d500] via-[#a8d500]/50 to-transparent origin-left"
      />
    </section>
  );
}
