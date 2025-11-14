import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Calendar } from "lucide-react";

// @ts-ignore: allow importing image asset without a type declaration
import bcuLogo from "../assets/bcu-logo.png";
// @ts-ignore: allow importing image asset without a type declaration
import metaLogo from "../assets/meta-color.svg";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const experiences = [
    {
      company: "Meta",
      logo: metaLogo,
      role: "Software Engineering Intern – Mobile, Cross-Platform (iOS/Android)",
      period: "May 2025 - Aug 2025",
      achievements: [
        "Engineered E2E a Facebook mobile app feature enabling users to search and bulk-add saved content to collections, incorporating global search functionality, resulting in a 40% increase in content saves.",
        "Designed and deployed 15+ reusable UI components for the relatively new framework, accelerating development and ensuring consistent UI/UX across mobile platforms, saving 300+ hours for development.",
        "Increased test coverage by 15% through unit and end-to-end testing, supporting faster iteration.",
        "Recommended and implemented a streamlined feature QA testing process in parallel with development, decreasing the feature development-to-launch timeline by 30%, resulting in two weeks faster releases.",
      ],
    },
    {
      company: "Meta",
      logo: metaLogo,
      role: "Software Engineering Intern – Backend Infrastructure",
      period: "May 2024 - Aug 2024",
      achievements: [
        "Led the migration of an automation feature to a new infrastructure platform, completing the project within 3 weeks and ensuring seamless functionality while maintaining key product metrics.",
        "Conceptualized and constructed a novel infrastructure system for multi-tier FAQs, which streamlined chatbot interactions and increased leads retention by 10%.",
        "Engineered a tree-based graph schema utilizing GraphQL endpoints to streamline the creation and retrieval of FAQ objects, estimating a 40% improvement in business page message response time.",
        "Delivered 30% boost in test coverage through writing comprehensive unit testing and refactoring code.",
      ],
    },
    {
      company: "Meta",
      logo: metaLogo,
      role: "Meta University Engineering Intern – Full-stack Web",
      period: "Jun 2023 - Aug 2023",
      achievements: [
        "Initiated and delivered a fully functional web app prototype within 5 weeks—despite no prior JavaScript experience—by implementing advanced search features, responsive design, and maintaining consistent communication to exceed project goals.",
      ],
    },
    {
      company: "Bethune-Cookman University",
      logo: bcuLogo,
      role: "Computer Science Teaching Assistant",
      period: "Feb 2024 - Present",
      achievements: [
        "Offered personalized guidance to students struggling with programming assignments, clarifying confusing concepts and improving coding skills, providing hands-on coding support, resulting in 15+ students completing 5+ practice coding challenges weekly.",
      ],
    },
  ];

  return (
    <section
      id="experience"
      ref={ref}
      className="min-h-screen relative py-24 px-6 lg:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-bl from-[#1a1a1a] via-[#0d0d0d] to-[#1a1a1a]" />
      <div className="absolute top-20 left-1/2 w-96 h-96 bg-[#c4ff00]/5 rounded-full blur-3xl" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-[#c4ff00] mb-16 text-center lg:text-left"
            style={{
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              lineHeight: 0.9,
            }}
          >
            EXPERIENCE
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#c4ff00]/20 via-[#c4ff00]/50 to-[#c4ff00]/20" />

          <div className="space-y-12 lg:space-y-16">
            {experiences.map((exp, index) => {
              const cardRef = useRef(null);
              const { scrollYProgress } = useScroll({
                target: cardRef,
                offset: ["start end", "end start"],
              });
              const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.85, 1, 1, 0.9]);
              const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.7]);

              return (
                <motion.div
                  key={index}
                  ref={cardRef}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  style={{ scale, opacity }}
                  className="relative"
                >
                  {/* Timeline Dot - Desktop */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                    className="hidden lg:block absolute left-8 top-8 -translate-x-1/2 z-20"
                  >
                    <div className="relative">
                      {/* Glowing pulse effect */}
                      <motion.div
                        className="absolute inset-0 bg-[#c4ff00] rounded-full blur-md"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.7, 0.3, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      {/* Solid dot */}
                      <div className="relative w-4 h-4 bg-[#c4ff00] rounded-full border-4 border-[#1a1a1a] shadow-lg shadow-[#c4ff00]/50" />
                    </div>
                  </motion.div>

                  {/* Experience Card */}
                  <div className="lg:ml-24">
                    <div className="glass-strong glass-hover p-6 lg:p-8 rounded-2xl">
                      {/* Header with Logo */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                        <div className="flex items-start gap-4 flex-1">
                          {/* Timeline Dot - Mobile (inside card) */}
                          <div className="lg:hidden">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={isInView ? { scale: 1 } : {}}
                              transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                              className="relative"
                            >
                              <motion.div
                                className="absolute inset-0 bg-[#c4ff00] rounded-full blur-md"
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [0.7, 0.3, 0.7],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              />
                              <div className="relative w-3 h-3 bg-[#c4ff00] rounded-full border-2 border-[#1a1a1a] shadow-lg shadow-[#c4ff00]/50 mt-2" />
                            </motion.div>
                          </div>

                          {exp.logo && (
                            <div className="glass-strong p-2 rounded-xl w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center overflow-hidden shrink-0">
                              <img
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white text-base sm:text-lg lg:text-xl mb-1 break-words">
                              {exp.role}
                            </h3>
                            <p className="text-[#c4ff00] text-sm sm:text-base">{exp.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-sm sm:text-base shrink-0">
                          <Calendar size={16} />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      {/* Achievements */}
                      <ul className="space-y-3 sm:space-y-4">
                        {exp.achievements.map((achievement, achIndex) => (
                          <motion.li
                            key={achIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.15 + achIndex * 0.05,
                            }}
                            className="text-white/70 flex gap-3 text-sm sm:text-base"
                          >
                            <span className="text-[#c4ff00] mt-1 shrink-0">•</span>
                            <span className="break-words">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
