import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Trophy, Award, Zap } from "lucide-react";

export function Additional() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const achievements = [
    {
      icon: Trophy,
      title: "IEEE SoutheastCon Hardware Competition",
      date: "April 2025",
      description:
        "Developed autonomous movement logic for a robotics challenge and assembled the robot chassis from scratch; placed 3rd out of 60 schools.",
      place: "3rd Place",
    },
    {
      icon: Zap,
      title: "Black Excellence SMART Hackathon (American Airlines)",
      date: "November 2024",
      description:
        "Built a digital assistant web prototype in under 24 hours, contributing to user flow design and frontend development in a team of 4 and placed 4th out of 47 schools.",
      place: "4th Place",
    },
    {
      icon: Trophy,
      title: "Jane Street INSIGHT Program",
      date: "January 2024",
      description:
        "Built a Python trading bot as part of a simulated trading competition; placed 3rd overall.",
      place: "3rd Place",
    },
    {
      icon: Award,
      title: "Generation Google Scholarship Winner (North America)",
      date: "June 2024",
      description:
        "Selected as 1 of 56 recipients out of thousands of applicants, for leadership potential and commitment to diversity and inclusion in tech.",
      place: "Winner",
    },
  ];

  return (
    <section
      ref={ref}
      className="min-h-screen relative py-24 px-6 lg:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#1a1a1a]" />
      <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-[#c4ff00]/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-[#c4ff00] mb-12"
            style={{
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              lineHeight: 0.9,
            }}
          >
            ACHIEVEMENTS
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            const cardRef = useRef(null);
            const { scrollYProgress } = useScroll({
              target: cardRef,
              offset: ["start end", "end start"],
            });
            const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.9, 1, 1, 0.95]);
            const cardOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);

            return (
              <motion.div
                key={index}
                ref={cardRef}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ scale, opacity: cardOpacity }}
                className="glass-strong glass-hover p-8 rounded-2xl group relative overflow-hidden"
              >
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-[#c4ff00]/5 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="glass-accent p-3 rounded-xl group-hover:bg-[#c4ff00]/20 transition-all duration-300">
                      <Icon className="text-[#c4ff00]" size={28} />
                    </div>
                    <span className="glass-accent text-[#c4ff00] px-3 py-1 rounded-full">
                      {achievement.place}
                    </span>
                  </div>

                  <h3 className="text-white text-xl mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-white/60 mb-4">{achievement.date}</p>
                  <p className="text-white/70">{achievement.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
