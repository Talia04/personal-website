import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Briefcase, Mic, Code2, Sparkles, Brain, Mail, Regex, Database, Smartphone, Calendar, BarChart3, Shield, GitBranch, MessageSquare } from "lucide-react";
import { SiTypescript, SiPython, SiPostgresql, SiDeno, SiReact, SiExpo, SiNextdotjs, SiCloudflare, SiOpenai, SiSupabase, SiGmail, SiGooglecloud, SiGithubactions } from "react-icons/si";
import {
  FeaturedProjectCard,
  ProjectCard,
  ProjectData,
} from "./ui/progressive-blur-modal";

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const featuredProject: ProjectData = {
    title: "Basafy",
    subtitle: "AI Job Search Assistant",
    period: "2025",
    icon: Briefcase,
    color: "#00d4ff",
    description:
      "Born from my own frustration tracking job applications across scattered emails. Conceptualized, designed, and built the entire product solo from scratch — mobile app, web dashboard, AI backend, and cloud infrastructure. Engineered an LLM + regex pipeline to auto-parse Gmail, eliminating manual tracking entirely. Shipped to the App Store and deployed live at basafy.com.",
    highlights: [
      "Solo full-stack build — idea to App Store",
      "OpenAI + regex hybrid parsing pipeline",
      "Gmail API real-time auto-sync",
      "Live product with real users",
    ],
    tech: ["React Native", "Python", "Supabase", "OpenAI", "Google APIs", "Regex"],
    demo: "https://basafy.com",
    techDetails: [
      // Languages & Runtime
      { name: "TypeScript", icon: SiTypescript, desc: "End-to-end type safety", color: "#3178c6", category: "Languages" },
      { name: "Python", icon: SiPython, desc: "AI orchestration", color: "#ffd43b", category: "Languages" },
      { name: "SQL", icon: SiPostgresql, desc: "PostgreSQL + RLS policies", color: "#336791", category: "Languages" },
      { name: "Deno", icon: SiDeno, desc: "Edge Functions runtime", color: "#70ffaf", category: "Languages" },
      // Mobile
      { name: "React Native 0.81", icon: SiReact, desc: "Cross-platform mobile", color: "#61dafb", category: "Mobile" },
      { name: "Expo SDK 54", icon: SiExpo, desc: "Managed workflow", color: "#4630eb", category: "Mobile" },
      { name: "EAS Build", icon: SiExpo, desc: "Cloud builds & OTA", color: "#4630eb", category: "Mobile" },
      // Web
      { name: "Next.js 14", icon: SiNextdotjs, desc: "Dashboard & landing", color: "#ffffff", category: "Web" },
      { name: "Cloudflare Pages", icon: SiCloudflare, desc: "Edge deployment", color: "#f38020", category: "Web" },
      // Backend & AI
      { name: "OpenAI GPT-4o-mini", icon: SiOpenai, desc: "LLM email parsing", color: "#10b981", category: "Backend & AI" },
      { name: "Regex Engine", icon: Regex, desc: "Pattern extraction", color: "#f59e0b", category: "Backend & AI" },
      { name: "Supabase", icon: SiSupabase, desc: "Auth + DB + Edge Functions", color: "#3ecf8e", category: "Backend & AI" },
      { name: "PostgreSQL RLS", icon: Shield, desc: "Row-level security", color: "#336791", category: "Backend & AI" },
      // APIs & Services
      { name: "Gmail API", icon: SiGmail, desc: "Auto-sync job emails", color: "#ea4335", category: "APIs & Services" },
      { name: "Google Pub/Sub", icon: SiGooglecloud, desc: "Real-time push notifications", color: "#4285f4", category: "APIs & Services" },
      { name: "Calendar API", icon: Calendar, desc: "Interview scheduling", color: "#8b5cf6", category: "APIs & Services" },
      // DevOps
      { name: "GitHub Actions", icon: SiGithubactions, desc: "CI/CD pipelines", color: "#2088ff", category: "DevOps" },
    ],
    appStore: "https://apps.apple.com/us/app/basafy/id6757215169",
    status: "live",
    featured: true,
    walkthrough: [
      { src: "/basafy/14-splash.png", label: "Welcome to Basafy" },
      { src: "/basafy/16-onboarding-gmail.png", label: "Connect Gmail" },
      { src: "/basafy/17-onboarding-apps.png", label: "Auto-import applications" },
      { src: "/basafy/18-onboarding-pipeline.png", label: "Organized pipeline" },
      { src: "/basafy/19-onboarding-insights.png", label: "Smart insights" },
      { src: "/basafy/01-home-dashboard.png", label: "Dashboard overview" },
      { src: "/basafy/05-applications-all.png", label: "Application tracker" },
      { src: "/basafy/09-applications-saved.png", label: "Saved applications" },
      { src: "/basafy/08-pipeline-applied.png", label: "Pipeline board" },
      { src: "/basafy/03-calendar.png", label: "Interview calendar" },
      { src: "/basafy/04-calendar-history.png", label: "Event history" },
      { src: "/basafy/11-insights.png", label: "Job search analytics" },
      { src: "/basafy/12-weekly-charts.png", label: "Weekly trends" },
      { src: "/basafy/13-ghosted-apps.png", label: "Ghosted applications" },
    ],
  };

  const projects: ProjectData[] = [
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
      status: "in-progress",
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
      status: "in-progress",
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
      status: "completed",
    },
  ];

  return (
    <section
      id="projects"
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
            fontSize: "clamp(120px, 22vw, 350px)",
            letterSpacing: "-0.02em",
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
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
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
              A collection of projects where I've pushed boundaries in AI,
              developer tools, and user experience.
            </motion.p>
          </div>
        </div>

        {/* Featured project (Basafy) */}
        <div className="max-w-7xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FeaturedProjectCard project={featuredProject} />
          </motion.div>
        </div>

        {/* Other projects grid */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-7xl mx-auto mt-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5"
        >
          <p className="text-white/30 text-sm">
            Click any card to explore the full project
          </p>

          <div className="flex items-center gap-8">
            {[
              { label: "Projects", value: "4+" },
              { label: "Technologies", value: "20+" },
              { label: "Live", value: "1" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="block text-white font-bold text-lg">
                  {stat.value}
                </span>
                <span className="text-white/30 text-[10px] uppercase tracking-wider">
                  {stat.label}
                </span>
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
