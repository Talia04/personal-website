import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Rocket, Calendar, ExternalLink, Github, Sparkles, Brain, Briefcase, Mic, Code2 } from "lucide-react";
import { Button } from "./ui/button";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const projects = [
    {
      title: "Flux",
      period: "2025 - Present",
      icon: Code2,
      description:
        "A locally hosted, offline-first developer collaboration tool inspired by Phabricator, designed for visual code review, structured change tracking, and lightweight project discussions.",
      achievements: [
        "Built with TypeScript and JavaScript using Node.js, the VS Code Extension API, and local file system storage.",
        "Integrated Git support with a desktop-style UI via Electron and WebViews for seamless developer workflow.",
        "Designed for visual code review and structured change tracking inside a VS Code-integrated workflow.",
      ],
      tech: ["TypeScript", "JavaScript", "Node.js", "VS Code API", "Electron", "Git"],
      github: "#",
      demo: "#",
    },
    {
      title: "Basafy",
      period: "Oct 2025 - Present",
      icon: Briefcase,
      description:
        "An AI-powered job search assistant that automatically parses Gmail interview emails, tracks application stages, manages deadlines, and surfaces insights through a centralized dashboard.",
      achievements: [
        "Building a React Native app that scrapes Gmail and parses interview emails using Python and Google APIs to auto-update a dashboard of applications and interview stages.",
        "Added an assistant that uses calendar APIs and custom logic to set reminders, track deadlines, and send simple insights based on new emails.",
        "Designed a clean workflow in React Native, Node, and Supabase that keeps all job search data in one place.",
      ],
      tech: ["React Native", "Node.js", "Python", "Supabase", "Google APIs", "Gmail API"],
      github: "#",
      demo: "#",
    },
    {
      title: "InterPace",
      period: "Nov 2025 - Present",
      icon: Mic,
      description:
        "A gamified interview preparation platform that provides real-time feedback on communication skills while offering structured DSA practice with progress tracking across web and mobile.",
      achievements: [
        "Built a web app using OpenAI Whisper, speech analysis, and custom scoring to give feedback on pacing, filler words, tone, and clarity.",
        "Added gamified DSA and pattern practice with timed rounds, streaks, and progress tracking using React, Node, and Python.",
        "Expanding the platform into a React Native mobile app with the same coaching tools for practice anywhere.",
      ],
      tech: ["React", "React Native", "Node.js", "Python", "OpenAI Whisper", "Speech Analysis"],
      github: "#",
      demo: "#",
    },
    {
      title: "Virtual Makeup Application",
      period: "Feb 2025 - Present",
      icon: Sparkles,
      description:
        "An AI-driven virtual makeup application allowing users to experiment with 20+ makeup styles while improving realism and inclusivity through a custom dataset of diverse skin tones.",
      achievements: [
        "Designed an AI-driven virtual makeup application utilizing Mediapipe landmarking and image style transfer, enabling users to experiment with 20+ different makeup styles.",
        "Curated a dataset of 1,000+ images of diverse skin tones with professional makeup, addressing a gap in existing datasets, and improved makeup application accuracy by 30%.",
      ],
      tech: ["Python", "Mediapipe", "OpenCV", "TensorFlow", "CycleGAN", "Deep Learning"],
      github: "#",
      demo: "#",
    },
  ];

  return (
    <section
      id="projects"
      ref={ref}
      className="min-h-screen relative py-24 px-6 lg:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tl from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d]" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#c4ff00]/5 rounded-full blur-3xl" />
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
            PROJECTS
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const cardRef = useRef(null);
            const { scrollYProgress } = useScroll({
              target: cardRef,
              offset: ["start end", "end start"],
            });
            const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.95]);
            const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);

            return (
              <motion.div
                key={index}
                ref={cardRef}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                style={{ scale, opacity }}
                className="glass-strong glass-hover p-8 rounded-2xl group flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="glass-accent p-3 rounded-xl group-hover:bg-[#c4ff00]/20 transition-all duration-300">
                      <project.icon className="text-[#c4ff00]" size={24} />
                    </div>
                    <h3 className="text-white text-xl lg:text-2xl font-semibold">{project.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-white/60 mb-4">
                  <Calendar size={16} />
                  <span className="text-sm">{project.period}</span>
                </div>

                <p className="text-white/70 mb-6 text-sm lg:text-base">{project.description}</p>

                <div className="space-y-3 mb-6 flex-1">
                  {project.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="text-white/70 flex gap-3 text-sm lg:text-base">
                      <span className="text-[#c4ff00] mt-1">•</span>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.2 + techIndex * 0.05,
                      }}
                      className="glass px-3 py-1 rounded-full border-[#c4ff00]/30 text-[#c4ff00] text-xs lg:text-sm"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  <Button
                    onClick={() => window.open(project.github, "_blank")}
                    className="flex-1 bg-[#c4ff00] hover:bg-[#a8d600] text-black"
                  >
                    <Github size={16} className="mr-2" />
                    GitHub
                  </Button>
                  <Button
                    onClick={() => window.open(project.demo, "_blank")}
                    variant="outline"
                    className="flex-1 border-[#c4ff00]/30 text-[#c4ff00] hover:bg-[#c4ff00]/10"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View More
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
