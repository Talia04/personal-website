import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// @ts-ignore: allow importing image asset without a type declaration
import bcuLogo from "../assets/bcu-logo.png";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const stats = [
    { value: "3×", label: "Meta Intern", sublabel: "Mobile '25 • Backend '24 • Full-stack '23" },
    { value: "4.0", label: "GPA", sublabel: "Computer Science" },
    { value: "10+", label: "Projects", sublabel: "Shipped to production" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen bg-[#050505] overflow-hidden"
    >
      {/* Large "ABOUT" text backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span
          style={{ y: y1, fontSize: 'clamp(180px, 30vw, 500px)', letterSpacing: '-0.02em' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 1.5 }}
          className="font-black leading-none whitespace-nowrap text-white"
        >
          ABOUT
        </motion.span>
      </div>

      {/* Floating accent shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Circle - top right */}
        <motion.div
          style={{ y: y1 }}
          className="absolute -top-20 -right-20 w-64 h-64 md:w-96 md:h-96"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="w-full h-full border border-[#a8d500]/10 rounded-full"
          />
        </motion.div>

        {/* Square - bottom left */}
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-32 -left-10 w-32 h-32 md:w-48 md:h-48"
        >
          <motion.div
            animate={{ rotate: -45 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
            className="w-full h-full border border-white/5"
          />
        </motion.div>

        {/* Small dot - mid right */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute top-1/3 right-[15%] hidden lg:block"
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 bg-[#a8d500] rounded-full"
          />
        </motion.div>

        {/* Cross shape - bottom right */}
        <motion.div
          style={{ y: y1 }}
          className="absolute bottom-[20%] right-[10%] hidden md:block"
        >
          <div className="relative w-8 h-8">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2" />
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/10 -translate-x-1/2" />
          </div>
        </motion.div>
      </div>

      {/* Content grid */}
      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">

        {/* Left column - Statement */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-32 lg:py-0">

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#a8d500]">
              001 — About
            </span>
          </motion.div>

          {/* Main headline */}
          <div className="mb-12 overflow-hidden">
            <motion.h2
              initial={{ y: 100 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-black leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              I build things
              <br />
              <motion.span
                className="text-[#a8d500] inline-block cursor-default"
                whileHover={{
                  textShadow: "0 0 30px rgba(168, 213, 0, 0.5), 0 0 60px rgba(168, 213, 0, 0.3)",
                  scale: 1.02
                }}
                animate={{
                  textShadow: [
                    "0 0 20px rgba(168, 213, 0, 0)",
                    "0 0 30px rgba(168, 213, 0, 0.2)",
                    "0 0 20px rgba(168, 213, 0, 0)"
                  ]
                }}
                transition={{
                  textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 0.3 }
                }}
              >
                at scale.
              </motion.span>
            </motion.h2>
          </div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-md space-y-4"
          >
            <p className="text-white/60 text-base md:text-lg leading-relaxed">
              Three-time Meta intern with experience across the full stack —
              from mobile apps serving millions to backend systems that power
              real-time features.
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              Currently finishing my CS degree at Bethune-Cookman University
              while shipping products that actually matter.
            </p>
          </motion.div>

          {/* Education badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 inline-flex items-center gap-4 group"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 p-2 flex-shrink-0 overflow-hidden"
            >
              <img src={bcuLogo} alt="BCU" className="w-full h-full object-contain" />
            </motion.div>
            <div>
              <p className="text-white font-semibold">Bethune-Cookman University</p>
              <p className="text-white/40 text-sm">B.S. Computer Science • May 2026</p>
            </div>
          </motion.div>
        </div>

        {/* Right column - Stats */}
        <div className="relative flex items-center justify-center px-8 md:px-16 lg:px-20 py-20 lg:py-0">

          {/* Decorative vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-[10%] bottom-[10%] w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent origin-top hidden lg:block"
          />

          {/* Stats grid */}
          <div className="w-full max-w-md">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
                style={{ y: y2 }}
                className="group relative"
              >
                {/* Stat row */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="py-8 border-b border-white/5 cursor-default"
                >
                  <div className="flex items-baseline gap-6">
                    {/* Big number */}
                    <motion.span
                      className="text-6xl md:text-7xl lg:text-8xl font-black text-white group-hover:text-[#a8d500] transition-colors duration-500"
                      whileHover={{ scale: 1.05 }}
                    >
                      {stat.value}
                    </motion.span>

                    {/* Label stack */}
                    <div className="flex-1">
                      <p className="text-white/80 text-sm md:text-base font-medium mb-1">
                        {stat.label}
                      </p>
                      <p className="text-white/30 text-xs md:text-sm">
                        {stat.sublabel}
                      </p>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    className="absolute bottom-0 left-0 h-[2px] bg-[#a8d500]"
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))}

            {/* Tech stack row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-10"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">
                Core Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Go", "Python", "Kotlin", "Node.js"].map((tech, idx) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.9 + idx * 0.05 }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(168, 213, 0, 0.15)",
                      borderColor: "#a8d500",
                      color: "#a8d500"
                    }}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/60 text-xs font-medium cursor-default transition-all duration-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
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
