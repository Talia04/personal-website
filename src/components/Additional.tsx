import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Trophy, Award, Zap, Star } from "lucide-react";

export function Additional() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const achievements = [
    {
      icon: Trophy,
      title: "IEEE SoutheastCon",
      subtitle: "Hardware Competition",
      date: "2025",
      description:
        "Developed autonomous movement logic for a robotics challenge and assembled the robot chassis from scratch.",
      place: "3rd",
      total: "60 schools",
      color: "#a8d500",
    },
    {
      icon: Zap,
      title: "Black Excellence SMART",
      subtitle: "American Airlines Hackathon",
      date: "2024",
      description:
        "Built a digital assistant web prototype in under 24 hours, contributing to user flow design and frontend development.",
      place: "4th",
      total: "47 schools",
      color: "#00d4ff",
    },
    {
      icon: Trophy,
      title: "Jane Street INSIGHT",
      subtitle: "Trading Competition",
      date: "2024",
      description:
        "Built a Python trading bot as part of a simulated trading competition.",
      place: "3rd",
      total: "Overall",
      color: "#ff6b6b",
    },
    {
      icon: Award,
      title: "Generation Google",
      subtitle: "Scholarship Winner",
      date: "2024",
      description:
        "Selected as 1 of 56 recipients out of thousands of applicants for leadership potential and commitment to diversity in tech.",
      place: "Winner",
      total: "North America",
      color: "#c084fc",
    },
  ];

  return (
    <section
      id="achievements"
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
            fontSize: 'clamp(100px, 18vw, 280px)',
            letterSpacing: '-0.02em'
          }}
        >
          ACHIEVEMENTS
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
            Honors — Recognition
          </motion.span>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-black leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Wins &
              <br />
              <span className="text-[#a8d500]">accolades.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/40 text-sm max-w-sm lg:text-right"
            >
              Competitions, scholarships, and recognition that fuel
              my drive to build and innovate.
            </motion.p>
          </div>
        </div>

        {/* Achievement cards - horizontal scroll on mobile, grid on desktop */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              const isHovered = hoveredIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 + index * 0.1 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="group relative"
                >
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative h-full p-6 rounded-3xl border overflow-hidden"
                    style={{
                      background: isHovered
                        ? `linear-gradient(160deg, ${achievement.color}10 0%, transparent 50%)`
                        : 'rgba(255,255,255,0.02)',
                      borderColor: isHovered ? `${achievement.color}40` : 'rgba(255,255,255,0.06)',
                    }}
                  >
                    {/* Glowing orb in corner */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{
                        opacity: isHovered ? 0.6 : 0.2,
                        scale: isHovered ? 1.2 : 1
                      }}
                      transition={{ duration: 0.4 }}
                      className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                      style={{ backgroundColor: achievement.color }}
                    />

                    {/* Place badge - large and bold */}
                    <div className="relative mb-6">
                      <motion.div
                        animate={{
                          scale: isHovered ? 1.1 : 1,
                          color: isHovered ? achievement.color : 'rgba(255,255,255,0.15)'
                        }}
                        className="text-6xl md:text-7xl font-black leading-none transition-colors duration-300"
                      >
                        {achievement.place}
                      </motion.div>
                      <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 mt-1 block">
                        {achievement.total}
                      </span>
                    </div>

                    {/* Icon */}
                    <motion.div
                      animate={{
                        backgroundColor: isHovered ? `${achievement.color}20` : 'rgba(255,255,255,0.05)'
                      }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                    >
                      <Icon
                        size={18}
                        style={{ color: isHovered ? achievement.color : 'rgba(255,255,255,0.4)' }}
                        className="transition-colors duration-300"
                      />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-white font-bold text-lg mb-1 leading-tight">
                      {achievement.title}
                    </h3>
                    <p
                      className="text-sm mb-3 transition-colors duration-300"
                      style={{ color: isHovered ? achievement.color : 'rgba(255,255,255,0.4)' }}
                    >
                      {achievement.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-white/50 text-sm leading-relaxed mb-4">
                      {achievement.description}
                    </p>

                    {/* Year badge */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-xs text-white/30">{achievement.date}</span>
                      <motion.div
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="flex items-center gap-1"
                        style={{ color: achievement.color }}
                      >
                        <Star size={12} fill="currentColor" />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-7xl mx-auto mt-20 flex flex-wrap justify-center gap-12 md:gap-20"
        >
          {[
            { value: "4", label: "Major Awards" },
            { value: "2", label: "Hackathon Wins" },
            { value: "$10K+", label: "In Scholarships" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 + idx * 0.1 }}
              className="text-center"
            >
              <span className="block text-4xl md:text-5xl font-black text-white">
                {stat.value}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                {stat.label}
              </span>
            </motion.div>
          ))}
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
