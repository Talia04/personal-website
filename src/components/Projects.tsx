import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, Briefcase, Mic, Code2, Sparkles, Regex, Calendar, Shield } from "lucide-react";
import { SiTypescript, SiPython, SiPostgresql, SiDeno, SiReact, SiExpo, SiNextdotjs, SiCloudflare, SiOpenai, SiSupabase, SiGmail, SiGooglecloud, SiGithubactions } from "react-icons/si";
import { ProjectData } from "./ui/progressive-blur-modal";
import "./Projects.css";

type ProjectShowcaseItem = ProjectData & {
  visualNote: string;
  visualImages?: string[];
};

const basafyStackGroups = [
  {
    category: "Languages & runtime",
    items: ["TypeScript", "Python", "SQL", "Deno"],
  },
  {
    category: "Mobile",
    items: ["React Native 0.81", "Expo SDK 54", "EAS Build"],
  },
  {
    category: "Web",
    items: ["Next.js 14", "Cloudflare Pages"],
  },
  {
    category: "Backend & AI",
    items: ["Supabase", "PostgreSQL RLS", "OpenAI GPT-4o-mini", "Regex Engine"],
  },
  {
    category: "APIs & services",
    items: ["Gmail API", "Google Pub/Sub", "Google Calendar API"],
  },
  {
    category: "DevOps",
    items: ["GitHub Actions"],
  },
];

export function Projects() {
  const ref = useRef<HTMLElement>(null);
  const showcaseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
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
    tech: basafyStackGroups.flatMap((group) => group.items),
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

  const projectShowcase: ProjectShowcaseItem[] = [
    {
      ...featuredProject,
      visualNote: "Live mobile + web product",
      visualImages: [
        "/basafy/16-onboarding-gmail.png",
        "/basafy/01-home-dashboard.png",
        "/basafy/08-pipeline-applied.png",
      ],
    },
    {
      ...projects[0],
      visualNote: "Local-first code review workspace",
    },
    {
      ...projects[1],
      visualNote: "Voice feedback meets interview practice",
    },
    {
      ...projects[2],
      visualNote: "Applied computer vision and style transfer",
    },
  ];

  const activeProject = projectShowcase[activeProjectIndex];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) return;

        const index = Number((visibleEntry.target as HTMLElement).dataset.projectIndex);
        if (!Number.isNaN(index)) {
          setActiveProjectIndex(index);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0.25, 0.45, 0.65],
      }
    );

    showcaseRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const ActiveIcon = activeProject.icon;

  return (
    <section id="projects" ref={ref} className="tech-work">
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

      <div className="tech-work-inner">
        {/* Section header */}
        <div className="mb-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.3em] text-[#a8d500] block mb-6"
          >
            Work — Projects
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
              <span className="text-[#a8d500]">projects.</span>
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

        {/* Featured case study (Basafy) */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <article className="tech-case">
              <div className="tech-case-layout">
                <div className="tech-case-copy">
                  <p className="editorial-eyebrow">Featured build / 01</p>
                  <h3 className="tech-case-title">Basafy</h3>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#a8d500]">
                    AI job search assistant
                  </p>
                  <p className="tech-case-description">
                    I built Basafy after experiencing the problem firsthand:
                    job applications were scattered across inboxes, calendars,
                    and spreadsheets. The result is a live mobile and web product
                    that turns Gmail activity into an organized application pipeline.
                  </p>

                  <div className="tech-case-proof">
                    {[
                      { value: "Solo", label: "Product ownership" },
                      { value: "2", label: "Client platforms" },
                      { value: "Live", label: "App Store product" },
                    ].map((proof) => (
                      <div key={proof.label} className="tech-proof-item">
                        <p className="tech-proof-value">{proof.value}</p>
                        <p className="tech-proof-label">{proof.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="tech-system">
                    <p className="editorial-eyebrow">System flow</p>
                    <div className="tech-system-flow">
                      {["Gmail API", "LLM + regex parser", "Supabase", "Mobile + web"].map((node, index) => (
                        <span key={node} className="tech-system-segment">
                          <span className="tech-system-node">{node}</span>
                          {index < 3 && <ArrowRight className="tech-system-arrow" size={13} />}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="tech-case-stack">
                    <p className="editorial-eyebrow">Full tech stack</p>
                    <div className="tech-case-stack-groups">
                      {basafyStackGroups.map((group) => (
                        <div key={group.category} className="tech-case-stack-group">
                          <p>{group.category}</p>
                          <div>
                            {group.items.map((item) => (
                              <span key={item}>{item}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="tech-case-actions">
                    <a
                      href={featuredProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tech-case-link"
                    >
                      Visit live product <ArrowUpRight size={14} />
                    </a>
                    <a
                      href={featuredProject.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tech-case-link tech-case-link-secondary"
                    >
                      View App Store <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>

                <div className="tech-screen-stage">
                  <div className="tech-screen-stage-copy">
                    <p>Mobile companion for turning scattered job-search activity into an organized pipeline.</p>
                    <span>Hover to spread the screens</span>
                  </div>
                  <div className="tech-screen-stack" tabIndex={0} aria-label="Basafy product screens">
                    {[
                      "/basafy/16-onboarding-gmail.png",
                      "/basafy/01-home-dashboard.png",
                      "/basafy/08-pipeline-applied.png",
                    ].map((src, index) => (
                      <div key={src} className="tech-screen-slot">
                        <motion.figure
                          initial={{ opacity: 0, y: 28 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.7, delay: 0.35 + index * 0.12 }}
                          className="tech-screen"
                        >
                          <img src={src} alt={`Basafy product screen ${index + 1}`} />
                        </motion.figure>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </motion.div>
        </div>

        <div className="tech-index-heading">
          <div>
            <p className="editorial-eyebrow">Project overview / 02</p>
            <h3 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
              Scroll the builds. Keep the context.
            </h3>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/35">
            The left side becomes the visual portfolio. The right side stays fixed
            long enough to explain the engineering decisions, impact, and stack.
          </p>
        </div>

        <div className="tech-scroll-showcase">
          <div className="tech-scroll-visuals" aria-label="Project visuals">
            {projectShowcase.map((project, index) => {
              const Icon = project.icon;
              const isActive = index === activeProjectIndex;

              return (
                <motion.article
                  key={project.title}
                  ref={(node) => {
                    showcaseRefs.current[index] = node;
                  }}
                  data-project-index={index}
                  className={`tech-scroll-card ${isActive ? "is-active" : ""}`}
                  initial={{ opacity: 0, y: 44 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.12 * index }}
                  style={{ "--project-color": project.color } as CSSProperties}
                >
                  <div className="tech-scroll-card-header">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{project.visualNote}</p>
                  </div>

                  <div className="tech-scroll-media">
                    {project.visualImages ? (
                      <div className="tech-scroll-phone-row" aria-hidden="true">
                        {project.visualImages.map((src, imageIndex) => (
                          <figure key={src} className="tech-scroll-phone">
                            <img src={src} alt="" />
                            <span>{imageIndex + 1}</span>
                          </figure>
                        ))}
                      </div>
                    ) : (
                      <div className="tech-scroll-abstract" aria-hidden="true">
                        <div className="tech-scroll-orbit" />
                        <div className="tech-scroll-window">
                          <span />
                          <span />
                          <span />
                        </div>
                        <div className="tech-scroll-lines">
                          <i />
                          <i />
                          <i />
                          <i />
                        </div>
                        {Icon && (
                          <div className="tech-scroll-icon">
                            <Icon size={34} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="tech-scroll-card-footer">
                    <div>
                      <h4>{project.title}</h4>
                      <p>{project.subtitle}</p>
                    </div>
                    <span>{project.period}</span>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <aside className="tech-scroll-copy" aria-live="polite">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeProject.title}
                initial={{ opacity: 0, y: 10, clipPath: "inset(0 0 12% 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                exit={{ opacity: 0, y: -8, clipPath: "inset(10% 0 0 0)" }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="tech-scroll-copy-panel tech-scroll-copy-transition"
                style={{ "--project-color": activeProject.color } as CSSProperties}
              >
                <div className="tech-scroll-copy-topline">
                  <span>{String(activeProjectIndex + 1).padStart(2, "0")}</span>
                  <p>{activeProject.period}</p>
                </div>

                <div className="tech-scroll-copy-title" data-ripple>
                  {ActiveIcon && (
                    <span>
                      <ActiveIcon size={24} />
                    </span>
                  )}
                  <div>
                    <h4>{activeProject.title}</h4>
                    <p>{activeProject.subtitle}</p>
                  </div>
                </div>

                <p className="tech-scroll-copy-description" data-ripple>
                  {activeProject.description}
                </p>

                <div className="tech-scroll-copy-highlights" data-ripple>
                  {activeProject.highlights.map((highlight) => (
                    <span key={highlight}>{highlight}</span>
                  ))}
                </div>

                <div className="tech-scroll-copy-stack" data-ripple>
                  {activeProject.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="tech-scroll-copy-actions" data-ripple>
                  {activeProject.demo && (
                    <a href={activeProject.demo} target="_blank" rel="noopener noreferrer">
                      Live demo <ArrowUpRight size={14} />
                    </a>
                  )}
                  {activeProject.appStore && (
                    <a href={activeProject.appStore} target="_blank" rel="noopener noreferrer">
                      App Store <ArrowUpRight size={14} />
                    </a>
                  )}
                  {activeProject.github && activeProject.github !== "#" && (
                    <a href={activeProject.github} target="_blank" rel="noopener noreferrer">
                      GitHub <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </aside>
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
