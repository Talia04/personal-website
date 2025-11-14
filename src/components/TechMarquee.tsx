import { motion } from "motion/react";
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

// Tech stack with actual icons
interface TechItem {
  name: string;
  icon: LucideIcon;
}

const techStack: TechItem[] = [
  { name: "Python", icon: FileCode },
  { name: "JavaScript", icon: Zap },
  { name: "React", icon: Zap },
  { name: "TypeScript", icon: Code2 },
  { name: "Java", icon: Coffee },
  { name: "Node.js", icon: Server },
  { name: "MongoDB", icon: Database },
  { name: "PostgreSQL", icon: Database },
  { name: "Git", icon: GitBranch },
  { name: "TensorFlow", icon: Brain },
  { name: "OpenCV", icon: Eye },
  { name: "Android", icon: Smartphone },
  { name: "GraphQL", icon: Network },
  { name: "Docker", icon: Box },
  { name: "AWS", icon: Cloud },
  { name: "Firebase", icon: Flame },
  { name: "VS Code", icon: Code2 },
  { name: "PHP", icon: Code2 },
  { name: "SQL", icon: Database },
  { name: ".NET", icon: Box },
  { name: "Arduino", icon: Cpu },
  { name: "Mediapipe", icon: Target },
  { name: "CycleGAN", icon: RefreshCw },
  { name: "Full-Stack", icon: Globe },
];

export function TechMarquee() {
  // Duplicate the array for seamless loop
  const duplicatedTech = [...techStack, ...techStack];

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d]">
      {/* Gradient overlays for fade effect */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10 pointer-events-none" />

      {/* Animated background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#c4ff00]/3 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-0">
        {/* Title */}
        <div className="text-center mb-8 px-6">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white/40 tracking-[0.2em] text-xs sm:text-sm mb-2"
          >
            TECH STACK
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-16 h-1 bg-[#c4ff00] mx-auto rounded-full"
          />
        </div>

        {/* Top row - moving right */}
        <div className="relative mb-6">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -50 * techStack.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              },
            }}
          >
            {duplicatedTech.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={`top-${index}`}
                  className="glass-strong px-6 py-4 rounded-2xl border border-[#c4ff00]/20 flex items-center gap-3 min-w-fit hover:border-[#c4ff00]/50 hover:scale-105 transition-all duration-300 group cursor-default"
                >
                  <Icon 
                    size={28}
                    className="text-[#c4ff00] group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="text-white/80 text-sm sm:text-base whitespace-nowrap group-hover:text-[#c4ff00] transition-colors duration-300">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom row - moving left */}
        <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [-50 * techStack.length, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              },
            }}
          >
            {duplicatedTech.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={`bottom-${index}`}
                  className="glass-strong px-6 py-4 rounded-2xl border border-pink-500/20 flex items-center gap-3 min-w-fit hover:border-pink-500/50 hover:scale-105 transition-all duration-300 group cursor-default"
                >
                  <Icon 
                    size={28}
                    className="text-pink-400 group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="text-white/80 text-sm sm:text-base whitespace-nowrap group-hover:text-pink-400 transition-colors duration-300">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
