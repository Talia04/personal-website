import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

const skills = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "Go", "Java", "Kotlin", "SQL"],
    color: "#a8d500"
  },
  {
    category: "Frontend",
    items: ["React", "React Native", "Next.js", "Tailwind", "Framer Motion"],
    color: "#61DAFB"
  },
  {
    category: "Backend",
    items: ["Node.js", "GraphQL", "PostgreSQL", "MongoDB", "Redis"],
    color: "#68A063"
  },
  {
    category: "AI/ML",
    items: ["TensorFlow", "PyTorch", "OpenCV", "Computer Vision", "LLMs"],
    color: "#FF6F61"
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "AWS", "Figma", "Linux"],
    color: "#F05032"
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative min-h-screen overflow-hidden py-32"
      style={{ backgroundColor: "#0f0b16" }}
    >
      {/* Large backdrop text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 1.5 }}
          className="font-black leading-none whitespace-nowrap text-white"
          style={{
            y: y1,
            fontSize: 'clamp(150px, 25vw, 400px)',
            letterSpacing: '-0.02em'
          }}
        >
          SKILLS
        </motion.span>
      </div>

      {/* Floating elements */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
        className="absolute top-20 right-[15%] w-32 h-32 border border-[#a8d500]/10 rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
        className="absolute bottom-40 left-[10%] w-20 h-20 border border-white/5 rotate-45 pointer-events-none"
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <div className="max-w-7xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.3em] text-[#a8d500] block mb-6"
          >
            Toolbox — Skills
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-white font-black leading-[0.95] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Tools of the
            <br />
            <span className="text-[#a8d500]">trade.</span>
          </motion.h2>
        </div>

        {/* Skills grid - Bento style */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skillGroup, i) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                onHoverStart={() => setActiveCategory(skillGroup.category)}
                onHoverEnd={() => setActiveCategory(null)}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className={`
                  group relative p-8 rounded-3xl border cursor-default
                  backdrop-blur-sm overflow-hidden
                  transition-all duration-500
                  ${i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}
                  ${activeCategory === skillGroup.category
                    ? 'border-[#a8d500]/40 bg-white/[0.04] shadow-[0_0_50px_rgba(168,213,0,0.08)]'
                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/10'}
                `}
              >
                {/* Glow effect on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeCategory === skillGroup.category ? 1 : 0 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${skillGroup.color}10 0%, transparent 70%)`,
                  }}
                />

                {/* Category header */}
                <div className="relative mb-6">
                  <motion.span
                    className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-2"
                  >
                    0{i + 1}
                  </motion.span>
                  <h3
                    className="text-xl md:text-2xl font-bold text-white group-hover:text-[#a8d500] transition-colors duration-300"
                  >
                    {skillGroup.category}
                  </h3>

                  {/* Accent line */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: activeCategory === skillGroup.category ? '40px' : '20px' }}
                    transition={{ duration: 0.3 }}
                    className="h-[2px] mt-3"
                    style={{ backgroundColor: skillGroup.color }}
                  />
                </div>

                {/* Skills list */}
                <div className="relative flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, idx) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.1 + idx * 0.05 }}
                      whileHover={{
                        scale: 1.08,
                        backgroundColor: `${skillGroup.color}25`,
                        borderColor: skillGroup.color,
                        color: skillGroup.color,
                        y: -2,
                        boxShadow: `0 8px 25px ${skillGroup.color}15`
                      }}
                      className="px-4 py-2 bg-white/[0.04] border border-white/10 rounded-full text-white/70 text-sm font-medium transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Large category initial - decorative */}
                {i === 0 && (
                  <div className="absolute bottom-4 right-4 pointer-events-none select-none hidden lg:block">
                    <span
                      className="text-[120px] font-black leading-none"
                      style={{ color: `${skillGroup.color}08` }}
                    >
                      {skillGroup.category[0]}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 pt-8 border-t border-white/5"
          >
            <div className="flex flex-wrap justify-between items-center gap-8">
              <p className="text-white/40 text-sm max-w-md">
                Constantly learning and adapting to new technologies.
                Currently exploring Rust and advanced system design patterns.
              </p>

              <div className="flex gap-12">
                {[
                  { value: "5+", label: "Languages" },
                  { value: "20+", label: "Technologies" },
                  { value: "3+", label: "Years" },
                ].map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.9 + idx * 0.1 }}
                    className="text-center"
                  >
                    <span className="block text-2xl md:text-3xl font-black text-[#a8d500]">
                      {stat.value}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
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
