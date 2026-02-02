import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { ExternalLink, Github, Sparkles, Brain, Briefcase, Mic, Code2, ArrowUpRight } from "lucide-react";

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const projects = [
    {
      title: "Flux",
      subtitle: "Developer Collaboration",
      period: "2025",
      icon: Code2,
      color: "#a8d500",
      description:
        "A locally hosted, offline-first developer collaboration tool inspired by Phabricator, designed for visual code review and structured change tracking.",
      highlights: [
        "VS Code Extension API integration",
        "Desktop-style UI via Electron",
        "Git-powered visual code review",
      ],
      tech: ["TypeScript", "Node.js", "Electron", "Git"],
      github: "#",
      demo: "#",
    },
    {
      title: "Basafy",
      subtitle: "AI Job Search Assistant",
      period: "2025",
      icon: Briefcase,
      color: "#00d4ff",
      description:
        "An AI-powered job search assistant that parses Gmail interview emails, tracks applications, and surfaces insights through a centralized dashboard.",
      highlights: [
        "Gmail scraping & parsing",
        "Calendar API integration",
        "Real-time application tracking",
      ],
      tech: ["React Native", "Python", "Supabase", "Google APIs"],
      github: "#",
      demo: "#",
    },
    {
      title: "InterPace",
      subtitle: "Interview Prep Platform",
      period: "2025",
      icon: Mic,
      color: "#ff6b6b",
      description:
        "A gamified interview preparation platform with real-time feedback on communication skills and structured DSA practice.",
      highlights: [
        "OpenAI Whisper speech analysis",
        "Gamified DSA practice",
        "Cross-platform mobile app",
      ],
      tech: ["React Native", "Python", "OpenAI Whisper"],
      github: "#",
      demo: "#",
    },
    {
      title: "Virtual Makeup",
      subtitle: "AI Beauty Tech",
      period: "2025",
      icon: Sparkles,
      color: "#c084fc",
      description:
        "An AI-driven virtual makeup application with 20+ styles, improving realism through a custom dataset of diverse skin tones.",
      highlights: [
        "Mediapipe face landmarking",
        "CycleGAN style transfer",
        "1,000+ diverse skin tone dataset",
      ],
      tech: ["Python", "Mediapipe", "TensorFlow", "CycleGAN"],
      github: "#",
      demo: "#",
    },
  ];

  return (
    <section
      id="projects"
      ref={ref}
      className="relative min-h-screen bg-[#050505] overflow-hidden py-32"
    >
      {/* Large backdrop text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span
          style={{ y: y1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.02 }}
          transition={{ duration: 1.5 }}
          className="font-black leading-none whitespace-nowrap text-white"
          style={{
            fontSize: 'clamp(120px, 22vw, 350px)',
            letterSpacing: '-0.02em'
          }}
        >
          WORK
        </motion.span>
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <div className="max-w-7xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.3em] text-[#a8d500] block mb-6"
          >
            005 — Projects
          </motion.span>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-black leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Selected
              <br />
              <span className="text-[#a8d500]">works.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/40 text-sm max-w-sm lg:text-right"
            >
              A collection of projects where I've pushed boundaries
              in AI, developer tools, and user experience.
            </motion.p>
          </div>
        </div>

        {/* Oval project cards - horizontal row */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-3 lg:h-[500px]">
            {projects.map((project, index) => {
              const isExpanded = expandedIndex === index;
              const isHovered = hoveredIndex === index;
              const Icon = project.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 + index * 0.1 }}
                  onHoverStart={() => {
                    setHoveredIndex(index);
                    setExpandedIndex(index);
                  }}
                  onHoverEnd={() => {
                    setHoveredIndex(null);
                    setExpandedIndex(null);
                  }}
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className={`
                    relative cursor-pointer overflow-hidden
                    rounded-[60px] lg:rounded-[80px]
                    transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${isExpanded
                      ? 'lg:flex-[3] h-auto lg:h-full'
                      : 'lg:flex-1 h-[120px] lg:h-full'}
                  `}
                  style={{
                    background: isExpanded || isHovered
                      ? `linear-gradient(135deg, ${project.color}08 0%, transparent 60%)`
                      : 'rgba(255,255,255,0.02)',
                  }}
                >
                  {/* Glassy border effect */}
                  <div
                    className="absolute inset-0 rounded-[60px] lg:rounded-[80px] pointer-events-none transition-all duration-500"
                    style={{
                      border: `1px solid ${isExpanded || isHovered ? project.color + '40' : 'rgba(255,255,255,0.08)'}`,
                      boxShadow: isExpanded || isHovered
                        ? `inset 0 1px 0 ${project.color}20, 0 0 60px ${project.color}15`
                        : 'inset 0 1px 0 rgba(255,255,255,0.05)',
                    }}
                  />

                  {/* Reflective shine */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1/3 rounded-t-[60px] lg:rounded-t-[80px] pointer-events-none opacity-50"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)',
                    }}
                  />

                  {/* Content wrapper */}
                  <div className="relative h-full p-6 lg:p-8 flex flex-col">
                    {/* Collapsed state - vertical text */}
                    <AnimatePresence>
                      {!isExpanded && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="hidden lg:flex flex-col items-center justify-center h-full"
                        >
                          <div
                            className="writing-mode-vertical text-center"
                            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                          >
                            <span
                              className="text-2xl font-black tracking-tight transition-colors duration-300"
                              style={{ color: isHovered ? project.color : 'rgba(255,255,255,0.6)' }}
                            >
                              {project.title}
                            </span>
                          </div>

                          {/* Year badge at bottom */}
                          <div className="absolute bottom-8">
                            <span
                              className="text-xs font-medium transition-colors duration-300"
                              style={{ color: isHovered ? project.color : 'rgba(255,255,255,0.3)' }}
                            >
                              {project.period}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Mobile collapsed state */}
                    <div className={`lg:hidden flex items-center justify-between ${isExpanded ? 'mb-6' : ''}`}>
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300"
                          style={{ backgroundColor: project.color + '15' }}
                        >
                          <Icon size={20} style={{ color: project.color }} />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{project.title}</h3>
                          <p className="text-white/40 text-xs">{project.subtitle}</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        className="text-white/40"
                      >
                        <ArrowUpRight size={20} />
                      </motion.div>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="flex flex-col h-full"
                        >
                          {/* Desktop header */}
                          <div className="hidden lg:flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.4, type: "spring" }}
                                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                style={{ backgroundColor: project.color + '15' }}
                              >
                                <Icon size={24} style={{ color: project.color }} />
                              </motion.div>
                              <div>
                                <h3 className="text-white font-black text-2xl">{project.title}</h3>
                                <p className="text-white/40 text-sm">{project.subtitle}</p>
                              </div>
                            </div>
                            <span
                              className="text-sm font-medium px-3 py-1 rounded-full"
                              style={{
                                color: project.color,
                                backgroundColor: project.color + '15'
                              }}
                            >
                              {project.period}
                            </span>
                          </div>

                          {/* Description */}
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                            className="text-white/60 text-sm leading-relaxed mb-6"
                          >
                            {project.description}
                          </motion.p>

                          {/* Highlights */}
                          <div className="space-y-2 mb-6 flex-1">
                            {project.highlights.map((highlight, hIndex) => (
                              <motion.div
                                key={hIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 + hIndex * 0.05 }}
                                className="flex items-center gap-3"
                              >
                                <div
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: project.color }}
                                />
                                <span className="text-white/50 text-sm">{highlight}</span>
                              </motion.div>
                            ))}
                          </div>

                          {/* Tech tags */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="flex flex-wrap gap-2 mb-6"
                          >
                            {project.tech.map((tech, tIndex) => (
                              <span
                                key={tIndex}
                                className="px-3 py-1 rounded-full text-xs border transition-colors duration-300"
                                style={{
                                  borderColor: project.color + '30',
                                  color: project.color,
                                  backgroundColor: project.color + '08'
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </motion.div>

                          {/* Action buttons */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.35 }}
                            className="flex gap-3 mt-auto"
                          >
                            <a
                              href={project.github}
                              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                              style={{
                                backgroundColor: project.color,
                                color: '#050505'
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github size={14} />
                              Code
                            </a>
                            <a
                              href={project.demo}
                              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 hover:scale-105"
                              style={{
                                borderColor: project.color + '40',
                                color: project.color,
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={14} />
                              View
                            </a>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Number indicator */}
                  <div className="absolute top-6 right-6 lg:top-8 lg:right-8">
                    <span
                      className="text-xs font-mono transition-colors duration-300"
                      style={{ color: isExpanded || isHovered ? project.color : 'rgba(255,255,255,0.2)' }}
                    >
                      0{index + 1}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-7xl mx-auto mt-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5"
        >
          <p className="text-white/30 text-sm">
            Hover to explore each project
          </p>

          <div className="flex items-center gap-8">
            {[
              { label: "Projects", value: "4+" },
              { label: "Technologies", value: "20+" },
              { label: "In Progress", value: "3" },
            ].map((stat, idx) => (
              <div key={stat.label} className="text-center">
                <span className="block text-white font-bold text-lg">{stat.value}</span>
                <span className="text-white/30 text-[10px] uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
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
