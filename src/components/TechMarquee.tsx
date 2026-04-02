import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import {
  FileCode,
  Coffee,
  Zap,
  Code2,
  Database,
  Network,
  GitBranch,
  Smartphone,
  Cpu,
  Brain,
  Eye,
  Target,
  RefreshCw,
  Box,
  Cloud,
  Flame,
  Globe,
  Server,
  type LucideIcon,
} from "lucide-react";

// Tech stack with categories and icons
interface TechItem {
  name: string;
  icon: LucideIcon;
  category: "language" | "framework" | "tool" | "ai";
}

const techStack: TechItem[] = [
  { name: "Python", icon: FileCode, category: "language" },
  { name: "JavaScript", icon: Zap, category: "language" },
  { name: "React", icon: Zap, category: "framework" },
  { name: "TypeScript", icon: Code2, category: "language" },
  { name: "Java", icon: Coffee, category: "language" },
  { name: "Node.js", icon: Server, category: "framework" },
  { name: "MongoDB", icon: Database, category: "tool" },
  { name: "PostgreSQL", icon: Database, category: "tool" },
  { name: "Git", icon: GitBranch, category: "tool" },
  { name: "TensorFlow", icon: Brain, category: "ai" },
  { name: "OpenCV", icon: Eye, category: "ai" },
  { name: "Android", icon: Smartphone, category: "framework" },
  { name: "GraphQL", icon: Network, category: "tool" },
  { name: "Docker", icon: Box, category: "tool" },
  { name: "AWS", icon: Cloud, category: "tool" },
  { name: "Firebase", icon: Flame, category: "tool" },
  { name: "VS Code", icon: Code2, category: "tool" },
  { name: "PHP", icon: Code2, category: "language" },
  { name: "SQL", icon: Database, category: "language" },
  { name: ".NET", icon: Box, category: "framework" },
  { name: "Arduino", icon: Cpu, category: "tool" },
  { name: "Mediapipe", icon: Target, category: "ai" },
  { name: "CycleGAN", icon: RefreshCw, category: "ai" },
  { name: "Full-Stack", icon: Globe, category: "framework" },
];

const categoryColors = {
  language: "#a8d500",
  framework: "#00d4ff",
  tool: "#ff6b6b",
  ai: "#c084fc",
};

export function TechMarquee() {
  const ref = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-200, 0]);

  // Duplicate for seamless loop
  const duplicatedTech = [...techStack, ...techStack];

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-[#050505]"
    >
      {/* Large backdrop text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.02 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="font-black text-white whitespace-nowrap"
          style={{
            x: x1,
            fontSize: 'clamp(150px, 25vw, 400px)',
            letterSpacing: '-0.02em',
          }}
        >
          TECHNOLOGIES
        </motion.span>
      </div>

      {/* Gradient overlays for fade effect */}
      <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      <div className="relative z-0">
        {/* Section label */}
        <div className="px-6 md:px-12 lg:px-20 mb-12">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.3em] text-[#a8d500]"
          >
            004 — Tech Stack
          </motion.span>
        </div>

        {/* Top row - moving right with scroll */}
        <div className="relative mb-4">
          <motion.div
            className="flex gap-4"
            animate={{
              x: [0, -50 * techStack.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {duplicatedTech.map((tech, index) => {
              const Icon = tech.icon;
              const color = categoryColors[tech.category];
              const isHovered = hoveredIndex === index;

              return (
                <motion.div
                  key={`top-${index}`}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative px-5 py-3 rounded-full border border-white/10 flex items-center gap-3 min-w-fit cursor-default group"
                  style={{
                    background: isHovered
                      ? `linear-gradient(135deg, ${color}15 0%, transparent 50%)`
                      : 'rgba(255,255,255,0.02)',
                    borderColor: isHovered ? `${color}50` : 'rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Glow effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      boxShadow: `0 0 30px ${color}30`,
                    }}
                  />

                  <Icon
                    size={20}
                    style={{ color: isHovered ? color : 'rgba(255,255,255,0.4)' }}
                    className="transition-colors duration-300"
                  />
                  <span
                    className="text-sm font-medium whitespace-nowrap transition-colors duration-300"
                    style={{ color: isHovered ? color : 'rgba(255,255,255,0.6)' }}
                  >
                    {tech.name}
                  </span>

                  {/* Category dot */}
                  <div
                    className="w-1.5 h-1.5 rounded-full opacity-60"
                    style={{ backgroundColor: color }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom row - moving left */}
        <div className="relative">
          <motion.div
            className="flex gap-4"
            animate={{
              x: [-50 * techStack.length, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 45,
                ease: "linear",
              },
            }}
          >
            {[...duplicatedTech].reverse().map((tech, index) => {
              const Icon = tech.icon;
              const color = categoryColors[tech.category];
              const actualIndex = index + 1000; // Offset to avoid collision with top row
              const isHovered = hoveredIndex === actualIndex;

              return (
                <motion.div
                  key={`bottom-${index}`}
                  onHoverStart={() => setHoveredIndex(actualIndex)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative px-5 py-3 rounded-full border border-white/10 flex items-center gap-3 min-w-fit cursor-default group"
                  style={{
                    background: isHovered
                      ? `linear-gradient(135deg, ${color}15 0%, transparent 50%)`
                      : 'rgba(255,255,255,0.02)',
                    borderColor: isHovered ? `${color}50` : 'rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Glow effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      boxShadow: `0 0 30px ${color}30`,
                    }}
                  />

                  <Icon
                    size={20}
                    style={{ color: isHovered ? color : 'rgba(255,255,255,0.4)' }}
                    className="transition-colors duration-300"
                  />
                  <span
                    className="text-sm font-medium whitespace-nowrap transition-colors duration-300"
                    style={{ color: isHovered ? color : 'rgba(255,255,255,0.6)' }}
                  >
                    {tech.name}
                  </span>

                  {/* Category dot */}
                  <div
                    className="w-1.5 h-1.5 rounded-full opacity-60"
                    style={{ backgroundColor: color }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Category legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mt-12 px-6"
        >
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">
                {category}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#a8d500]/50 to-transparent origin-center"
      />
    </section>
  );
}
