import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

// @ts-ignore: allow importing image asset without a type declaration
import bcuLogo from "../assets/bcu-logo.png";
// @ts-ignore: allow importing image asset without a type declaration
import metaLogo from "../assets/meta-color.svg";

const experiences = [
  {
    company: "Meta",
    logo: metaLogo,
    role: "Software Engineer Intern",
    team: "Mobile, Cross-Platform (iOS/Android)",
    period: "May 2025 - Aug 2025",
    year: "2025",
    highlights: [
      "Built Facebook feature for bulk-adding saved content to collections",
      "Created 15+ reusable UI components for cross-platform framework",
      "Increased test coverage by 15% through comprehensive testing",
      "Reduced development-to-launch timeline by 30%",
    ],
    impact: "40% increase in content saves",
  },
  {
    company: "Meta",
    logo: metaLogo,
    role: "Software Engineer Intern",
    team: "Backend Infrastructure",
    period: "May 2024 - Aug 2024",
    year: "2024",
    highlights: [
      "Led automation feature migration to new infrastructure",
      "Built multi-tier FAQ system for chatbot interactions",
      "Engineered tree-based GraphQL schema for FAQ management",
      "Delivered 30% boost in test coverage",
    ],
    impact: "10% increase in leads retention",
  },
  {
    company: "Meta",
    logo: metaLogo,
    role: "Meta University Intern",
    team: "Full-stack Web Development",
    period: "Jun 2023 - Aug 2023",
    year: "2023",
    highlights: [
      "Delivered fully functional web app prototype in 5 weeks",
      "Implemented advanced search features and responsive design",
      "Self-taught JavaScript during the internship",
    ],
    impact: "First engineering internship",
  },
  {
    company: "Bethune-Cookman University",
    logo: bcuLogo,
    role: "CS Teaching Assistant",
    team: "Computer Science Department",
    period: "Feb 2024 - Present",
    year: "Current",
    highlights: [
      "Mentoring students on programming fundamentals",
      "Guiding 15+ students through weekly coding challenges",
      "Clarifying complex CS concepts one-on-one",
    ],
    impact: "15+ students mentored",
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative min-h-screen bg-[#050505] overflow-hidden py-32"
    >
      {/* Large backdrop text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span
          style={{
            y: y1,
            fontSize: 'clamp(100px, 20vw, 300px)',
            letterSpacing: '-0.02em'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 1.5 }}
          className="font-black leading-none whitespace-nowrap text-white"
        >
          EXPERIENCE
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
            003 — Experience
          </motion.span>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-black leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Where I've
              <br />
              <span className="text-[#a8d500]">made impact.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/40 text-sm max-w-sm lg:text-right"
            >
              Three years of building at scale — from mobile apps serving millions
              to backend systems powering real-time features.
            </motion.p>
          </div>
        </div>

        {/* Timeline - Staggered zigzag layout */}
        <div className="max-w-6xl mx-auto relative">

          {/* Central timeline path */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 hidden lg:block">
            {/* Main line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/5">
              <motion.div
                style={{ height: lineHeight }}
                className="w-full bg-gradient-to-b from-[#a8d500] via-[#a8d500]/60 to-transparent"
              />
            </div>
          </div>

          {/* Experience cards - staggered */}
          <div className="space-y-16 lg:space-y-0">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className={`
                    relative lg:w-[45%] 
                    ${isEven ? 'lg:mr-auto lg:pr-16' : 'lg:ml-auto lg:pl-16'}
                    ${index > 0 ? 'lg:-mt-8' : ''}
                  `}
                >
                  {/* Timeline connector - Desktop */}
                  <div className={`
                    hidden lg:block absolute top-8
                    ${isEven ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'}
                  `}>
                    {/* Horizontal line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
                      className={`
                        w-16 h-[1px] bg-gradient-to-r 
                        ${isEven
                          ? 'from-[#a8d500]/50 to-[#a8d500] origin-left'
                          : 'from-[#a8d500] to-[#a8d500]/50 origin-right'}
                      `}
                    />

                    {/* Center node */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.15, type: "spring" }}
                      className={`
                        absolute top-1/2 -translate-y-1/2
                        ${isEven ? 'right-0 translate-x-[calc(100%+64px-6px)]' : 'left-0 -translate-x-[calc(100%+64px-6px)]'}
                      `}
                    >
                      <motion.div
                        animate={{
                          scale: hoveredIndex === index ? 1.3 : 1,
                          boxShadow: hoveredIndex === index
                            ? '0 0 20px rgba(168, 213, 0, 0.5)'
                            : '0 0 0px rgba(168, 213, 0, 0)'
                        }}
                        className="w-3 h-3 rounded-full bg-[#a8d500] border-2 border-[#050505]"
                      />
                    </motion.div>
                  </div>

                  {/* Year badge - positioned differently based on side */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                    className={`
                      mb-4 flex items-center gap-3
                      ${isEven ? 'lg:justify-end' : 'lg:justify-start'}
                    `}
                  >
                    <div className={`flex items-center gap-2 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                      <motion.span
                        animate={{
                          color: hoveredIndex === index ? '#a8d500' : 'rgba(255,255,255,0.3)'
                        }}
                        className="text-3xl md:text-4xl font-black tracking-tight"
                      >
                        {exp.year}
                      </motion.span>
                      <div className={`hidden sm:block w-12 h-[1px] ${hoveredIndex === index ? 'bg-[#a8d500]' : 'bg-white/10'
                        } transition-colors duration-300`} />
                    </div>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className={`
                      relative p-6 md:p-8 rounded-3xl border transition-all duration-500
                      ${hoveredIndex === index
                        ? 'bg-white/[0.04] border-[#a8d500]/40 shadow-[0_20px_50px_rgba(168,213,0,0.08)]'
                        : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10'}
                    `}
                  >
                    {/* Corner accent */}
                    <div className={`
                      absolute top-0 w-16 h-16 pointer-events-none
                      ${isEven ? 'right-0' : 'left-0'}
                    `}>
                      <div className={`
                        absolute top-4 w-8 h-[1px] bg-gradient-to-r 
                        ${isEven
                          ? 'right-4 from-transparent to-[#a8d500]/30'
                          : 'left-4 from-[#a8d500]/30 to-transparent'}
                      `} />
                      <div className={`
                        absolute top-4 h-8 w-[1px] bg-gradient-to-b from-[#a8d500]/30 to-transparent
                        ${isEven ? 'right-4' : 'left-4'}
                      `} />
                    </div>

                    {/* Glow effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background: isEven
                          ? 'radial-gradient(circle at 100% 0%, rgba(168, 213, 0, 0.1) 0%, transparent 50%)'
                          : 'radial-gradient(circle at 0% 0%, rgba(168, 213, 0, 0.1) 0%, transparent 50%)',
                      }}
                    />

                    {/* Header */}
                    <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                      <div className="flex items-start gap-4">
                        {/* Logo */}
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 p-2.5 flex-shrink-0 overflow-hidden cursor-pointer hover:border-[#a8d500]/30 transition-colors duration-300"
                        >
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="w-full h-full object-contain"
                          />
                        </motion.div>

                        <div>
                          <h3 className="text-white font-bold text-lg md:text-xl mb-1">
                            {exp.role}
                          </h3>
                          <p className="text-[#a8d500] text-sm font-medium">{exp.company}</p>
                          <p className="text-white/40 text-xs mt-1">{exp.team}</p>
                        </div>
                      </div>

                      <span className="text-white/30 text-xs whitespace-nowrap bg-white/5 px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>

                    {/* Highlights */}
                    <div className="relative space-y-3 mb-6">
                      {exp.highlights.map((highlight, hIndex) => (
                        <motion.div
                          key={hIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 + hIndex * 0.05 }}
                          className="flex items-start gap-3 group"
                        >
                          <span className="text-[#a8d500] mt-1.5 text-xs">▸</span>
                          <span className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
                            {highlight}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Impact badge */}
                    <div className="relative flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Impact</span>
                        <span className="text-sm font-semibold text-[#a8d500]">{exp.impact}</span>
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        className="text-[#a8d500]"
                      >
                        <ArrowUpRight size={16} />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5"
        >
          <div className="flex flex-wrap justify-center md:justify-start gap-12 md:gap-20">
            {[
              { value: "3×", label: "Meta Internships" },
              { value: "2+", label: "Years Experience" },
              { value: "100%", label: "Return Offer Rate" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + idx * 0.1 }}
                whileHover={{ y: -3, scale: 1.05 }}
                className="text-center md:text-left cursor-default group"
              >
                <span className="block text-3xl md:text-4xl font-black text-white group-hover:text-[#a8d500] transition-colors duration-300">
                  {stat.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 group-hover:text-white/50 transition-colors duration-300">
                  {stat.label}
                </span>
              </motion.div>
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
