import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Code2,
  Github,
  GraduationCap,
  Search,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "./Projects.css";

type ProjectStatus = "live" | "in-progress" | "completed";

type ProjectLink = {
  label: string;
  href: string;
  kind?: "github" | "external";
};

type ProjectVisual = {
  src: string;
  alt: string;
  variant?: "phone" | "desktop" | "wide";
};

export type ProjectShowcaseItem = {
  title: string;
  subtitle: string;
  period: string;
  color: string;
  accent: string;
  description: string;
  highlights: string[];
  tech: string[];
  learned: string;
  muscles: string;
  system: string[];
  links: ProjectLink[];
  icon: LucideIcon;
  status: ProjectStatus;
  visualNote: string;
  mainImage: string;
  mainImageAlt: string;
  visualImages?: string[];
  detailImages: ProjectVisual[];
  slug: string;
};

export const projectShowcaseItems: ProjectShowcaseItem[] = [
  {
    title: "Basafy",
    slug: "basafy",
    subtitle: "Job Search Assistant",
    period: "2026",
    color: "#a8d500",
    accent: "#e589ff",
    icon: Briefcase,
    status: "live",
    visualNote: "Mobile product for job-search clarity",
    mainImage: "/projects/basafy/portfolio-hero.svg",
    mainImageAlt: "Basafy product overview",
    description:
      "Job searching is already stressful. Tracking it shouldn't be. Basafy came from my own frustration managing recruiter emails, interview invitations, portals, and follow-up deadlines, so I built a system that turns scattered Gmail activity into an organized application pipeline.",
    highlights: [
      "Built Gmail synchronization pipelines for application-related emails.",
      "Modeled applications, tasks, reminders, and email associations in PostgreSQL.",
      "Implemented Google OAuth, token management, APNs reminders, and iOS deep links.",
      "Published and maintained a production mobile application.",
    ],
    tech: ["React Native", "Expo", "TypeScript", "Supabase", "PostgreSQL", "Gmail API", "Google OAuth", "APNs"],
    learned:
      "Basafy taught me how much complexity exists behind simple consumer products: authentication, third-party APIs, mobile notifications, database design, state management, production deployments, and App Store distribution.",
    muscles: "Mobile engineering, APIs, databases, notifications, production deployment",
    system: ["Gmail", "OAuth", "Parser", "PostgreSQL", "Tasks", "Push reminders"],
    links: [
      { label: "App Store", href: "https://apps.apple.com/us/app/basafy/id6757215169" },
      { label: "Website", href: "https://basafy.com" },
    ],
    visualImages: [
      "/basafy/16-onboarding-gmail.png",
      "/basafy/01-home-dashboard.png",
      "/basafy/08-pipeline-applied.png",
    ],
    detailImages: [
      { src: "/projects/basafy/portfolio-hero.svg", alt: "Basafy product hero", variant: "wide" },
      { src: "/projects/basafy/dashboard-phone.svg", alt: "Basafy dashboard mobile screen", variant: "phone" },
      { src: "/projects/basafy/pipeline-phone.svg", alt: "Basafy pipeline mobile screen", variant: "phone" },
      { src: "/projects/basafy/applications-phone.svg", alt: "Basafy applications mobile screen", variant: "phone" },
      { src: "/projects/basafy/insights-phone.svg", alt: "Basafy insights mobile screen", variant: "phone" },
    ],
  },
  {
    title: "Flux",
    slug: "flux",
    subtitle: "Developer Collaboration",
    period: "2026",
    color: "#8b5cf6",
    accent: "#a8d500",
    icon: Code2,
    status: "in-progress",
    visualNote: "Visual-first collaboration workspace",
    mainImage: "/projects/flux/web-rich-delta-overview.png",
    mainImageAlt: "Flux rich delta overview",
    description:
      "Inspired by the best developer tooling I've used, Flux explores a visual-first collaboration platform where reviews, discussions, media, decisions, and project history live in one connected engineering workspace.",
    highlights: [
      "Designed a collaboration system centered around rich content instead of flat documents.",
      "Built embedded media support inside project discussions and descriptions.",
      "Created structured review workflows inspired by modern software development practices.",
      "Modeled discussions, decisions, attachments, reviews, and project history as connected data.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Node.js"],
    learned:
      "Flux pushed me beyond implementation and into product thinking. It taught me how engineering systems are shaped by information architecture, workflow design, and the way teams discover and preserve knowledge.",
    muscles: "Product design, collaboration systems, frontend architecture",
    system: ["Delta", "Files", "Threads", "Review queue", "Versions", "History"],
    links: [{ label: "GitHub", href: "https://github.com/Talia04/Flux", kind: "github" }],
    detailImages: [
      { src: "/projects/flux/web-rich-delta-overview.png", alt: "Flux rich delta overview", variant: "desktop" },
      { src: "/projects/flux/web-dashboard.png", alt: "Flux workspace dashboard", variant: "desktop" },
      { src: "/projects/flux/web-files-review.png", alt: "Flux file review interface", variant: "desktop" },
      { src: "/projects/flux/vscode-overview.png", alt: "Flux VS Code overview", variant: "desktop" },
      { src: "/projects/flux/vscode-inline-review.png", alt: "Flux inline review in VS Code", variant: "desktop" },
      { src: "/projects/flux/vscode-version-history.png", alt: "Flux version history in VS Code", variant: "desktop" },
    ],
  },
  {
    title: "Skoutr",
    slug: "skoutr",
    subtitle: "Career Page Automation",
    period: "2026",
    color: "#00d4ff",
    accent: "#a8d500",
    icon: Search,
    status: "completed",
    visualNote: "Automation for large-scale job discovery",
    mainImage: "/projects/skoutr/companies-intelligence-desktop.svg",
    mainImageAlt: "Skoutr company intelligence dashboard",
    description:
      "Because manually checking a thousand career pages is not a good use of anyone's time. Skoutr started as a personal automation project to repeatedly scan company career pages and surface relevant opportunities.",
    highlights: [
      "Automated job discovery directly from company career pages and multiple ATS platforms.",
      "Filtered opportunities by sponsorship, role type, location, and keywords.",
      "Created automated reporting and export pipelines for large company datasets.",
      "Reduced hours of manual searching into a repeatable monitoring workflow.",
    ],
    tech: ["Python", "Playwright", "Selenium", "BeautifulSoup", "Pandas", "OpenPyXL", "AsyncIO"],
    learned:
      "Skoutr taught me how messy real-world data can be. I gained experience with browser automation, scraping, asynchronous processing, data normalization, and reliability around websites I do not control.",
    muscles: "Automation, scraping, large-scale data collection",
    system: ["Company list", "Crawler", "ATS parser", "Filters", "Review", "Exports"],
    links: [{ label: "GitHub", href: "https://github.com/Talia04/Skoutr", kind: "github" }],
    detailImages: [
      { src: "/projects/skoutr/companies-intelligence-desktop.svg", alt: "Skoutr company intelligence dashboard", variant: "desktop" },
      { src: "/projects/skoutr/opportunities-desktop.svg", alt: "Skoutr opportunities dashboard", variant: "desktop" },
      { src: "/projects/skoutr/discovery-review-desktop.svg", alt: "Skoutr discovery review workflow", variant: "desktop" },
      { src: "/projects/skoutr/scan-progress-desktop.svg", alt: "Skoutr scan progress", variant: "desktop" },
      { src: "/projects/skoutr/role-detail-mobile.svg", alt: "Skoutr role detail mobile screen", variant: "phone" },
    ],
  },
  {
    title: "TutorConn",
    slug: "tutorconn",
    subtitle: "Early Android/Firebase Mobile App",
    period: "2020",
    color: "#e589ff",
    accent: "#a8d500",
    icon: GraduationCap,
    status: "completed",
    visualNote: "The project that turned me from a tutor into a builder",
    mainImage: "/projects/tutorconn/portfolio-hero.svg",
    mainImageAlt: "TutorConn product overview",
    description:
      "TutorConn was one of the first applications I built while learning Android development in 2020. During the COVID era, I was actively tutoring and mentoring students and saw how difficult it could be for learners to find academic support when they needed it most.",
    highlights: [
      "One of my first end-to-end mobile applications.",
      "Built user authentication and profile management features.",
      "Designed tutor discovery and student matching workflows.",
      "Implemented cloud-hosted data storage using Firebase.",
      "Applied UI/UX principles while learning Android development fundamentals.",
      "Developed during the COVID period to address a real educational challenge.",
    ],
    tech: ["Java", "Android Studio", "Firebase Auth", "Firebase Firestore", "Firebase Storage", "Material Design"],
    learned:
      "TutorConn was my introduction to building software for real people. It taught me mobile fundamentals, database design, authentication, cloud services, and UX design. More importantly, it showed me that software engineering could solve problems I personally cared about.",
    muscles: "Mobile fundamentals, Firebase, authentication, user-centered product thinking",
    system: ["Student need", "Firebase auth", "Tutor profile", "Discovery", "Matching", "Support"],
    links: [],
    detailImages: [
      { src: "/projects/tutorconn/portfolio-hero.svg", alt: "TutorConn product hero", variant: "wide" },
      { src: "/projects/tutorconn/onboarding-mockup.svg", alt: "TutorConn onboarding flow", variant: "desktop" },
      { src: "/projects/tutorconn/login-mockup.svg", alt: "TutorConn login screen", variant: "phone" },
      { src: "/projects/tutorconn/role-selection-mockup.svg", alt: "TutorConn role selection screen", variant: "desktop" },
      { src: "/projects/tutorconn/tutor-discovery-mockup.svg", alt: "TutorConn tutor discovery screen", variant: "phone" },
    ],
  },
];

const stackGroups = [
  {
    category: "Product surfaces",
    items: ["Mobile apps", "Web dashboards", "VS Code interfaces", "Marketplaces"],
  },
  {
    category: "Systems",
    items: ["OAuth", "APIs", "PostgreSQL", "Automation", "Review workflows"],
  },
  {
    category: "Learning signal",
    items: ["Shipping", "Product thinking", "Reliability", "User-centered design"],
  },
];

export function Projects({ onOpenProjectDetails }: { onOpenProjectDetails: (slug: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const screenStageRef = useRef<HTMLDivElement>(null);
  const showcaseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const isScreenStageInView = useInView(screenStageRef, { amount: 0.55 });
  const showcaseProjects = projectShowcaseItems.slice(1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const featuredProject = projectShowcaseItems[0];
  const activeProject = showcaseProjects[activeProjectIndex] ?? showcaseProjects[0];
  const ActiveIcon = activeProject.icon;

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

  return (
    <section id="projects" ref={ref} className="tech-work">
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
        <div className="tech-work-header">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="tech-work-eyebrow"
          >
            Work - Projects
          </motion.span>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="tech-projects-title text-white font-black leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Selected <span className="text-[#a8d500]">projects.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/40 text-sm max-w-sm lg:text-right"
            >
              Product-style builds that taught me something specific about shipping,
              systems, automation, and designing around real user pain.
            </motion.p>
          </div>
        </div>

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
                    Job searching is already stressful. Tracking it shouldn't be.
                  </p>
                  <p className="tech-case-description">{featuredProject.description}</p>

                  <div className="tech-case-proof">
                    {[
                      { value: "Solo", label: "Product ownership" },
                      { value: "Live", label: "App Store product" },
                      { value: "Gmail", label: "API-driven workflow" },
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
                      {featuredProject.system.map((node, index) => (
                        <span key={node} className="tech-system-segment">
                          <span className="tech-system-node">{node}</span>
                          {index < featuredProject.system.length - 1 && <ArrowRight className="tech-system-arrow" size={13} />}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="tech-case-stack">
                    <p className="editorial-eyebrow">Engineering range</p>
                    <div className="tech-case-stack-groups">
                      {stackGroups.map((group) => (
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
                    <button type="button" className="tech-case-link" onClick={() => onOpenProjectDetails(featuredProject.slug)}>
                      View details <Sparkles size={14} />
                    </button>
                    {featuredProject.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tech-case-link tech-case-link-secondary"
                      >
                        {link.label} <ArrowUpRight size={14} />
                      </a>
                    ))}
                  </div>
                </div>

                <div ref={screenStageRef} className="tech-screen-stage">
                  <div className="tech-screen-stage-copy">
                    <p>A product view first, with the rest of the walkthrough tucked into the case study.</p>
                    <span>Hover to lift</span>
                  </div>
                  <div
                    className={`tech-screen-stack${isScreenStageInView ? " is-scroll-spread" : ""}`}
                    tabIndex={0}
                    aria-label="Basafy product screens"
                  >
                    {featuredProject.visualImages?.map((src, index) => (
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

        <div className="tech-scroll-showcase">
          <div className="tech-scroll-visuals" aria-label="Project visuals">
            {showcaseProjects.map((project, index) => {
              const isActive = index === activeProjectIndex;

              return (
                <motion.article
                  key={project.title}
                  ref={(node) => {
                    showcaseRefs.current[index] = node;
                  }}
                  data-project-index={index}
                  className={`tech-scroll-card ${isActive ? "is-active" : ""}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => onOpenProjectDetails(project.slug)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onOpenProjectDetails(project.slug);
                    }
                  }}
                  initial={{ opacity: 0, y: 44 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.12 * index }}
                  style={{ "--project-color": project.color } as CSSProperties}
                >
                  <div className="tech-scroll-card-header">
                    <span>{String(index + 2).padStart(2, "0")}</span>
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
                      <figure className="tech-scroll-product-shot" aria-hidden="true">
                        <img src={project.mainImage} alt="" />
                      </figure>
                    )}
                  </div>

                  <div className="tech-scroll-card-footer">
                    <div>
                      <h4>{project.title}</h4>
                      <p>{project.subtitle}</p>
                    </div>
                    <span>{project.period}</span>
                  </div>
                  <div className="tech-scroll-card-cta">
                    <span>Open details</span>
                    <ArrowUpRight size={14} />
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
                  <span>{String(activeProjectIndex + 2).padStart(2, "0")}</span>
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
                  {activeProject.highlights.slice(0, 3).map((highlight) => (
                    <span key={highlight}>{highlight}</span>
                  ))}
                </div>

                <div className="tech-scroll-copy-stack" data-ripple>
                  {activeProject.tech.slice(0, 8).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="tech-scroll-copy-actions" data-ripple>
                  <button type="button" onClick={() => onOpenProjectDetails(activeProject.slug)}>
                    Details <Sparkles size={14} />
                  </button>
                  {activeProject.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label} <ArrowUpRight size={14} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </aside>
        </div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#a8d500] via-[#a8d500]/50 to-transparent origin-left"
      />
    </section>
  );
}

export function ProjectDetailsPage({
  projects,
  activeSlug,
  onBack,
  onJumpToProject,
}: {
  projects: ProjectShowcaseItem[];
  activeSlug: string;
  onBack: () => void;
  onJumpToProject: (slug: string) => void;
}) {
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(`project-detail-${activeSlug}`)?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeSlug]);

  return (
    <section id="project-details" className="project-details-page" aria-label="Detailed project case studies">
      <div className="project-details-heading">
        <p className="editorial-eyebrow">Project details</p>
        <h3 className="project-details-title">Full product notes.</h3>
        <p>
          Deeper case-study views for the systems above. Each section keeps the main product story, visual proof,
          engineering decisions, and the specific lesson the project taught me.
        </p>
        <div className="project-details-nav" aria-label="Jump to project detail">
          {projects.map((project) => (
            <button
              key={project.slug}
              type="button"
              className={project.slug === activeSlug ? "is-active" : ""}
              onClick={() => onJumpToProject(project.slug)}
            >
              {project.title}
            </button>
          ))}
        </div>
      </div>

      <div className="project-details-stack">
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.article
              key={project.slug}
              id={`project-detail-${project.slug}`}
              className="project-detail-panel"
              style={{ "--project-color": project.color, "--project-accent": project.accent } as CSSProperties}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.18), ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="project-detail-panel-top">
                <button type="button" className="project-detail-back" onClick={onBack}>
                  Back to selected work
                </button>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>

              <div className="project-detail-panel-hero">
                <div className="project-detail-panel-copy">
                  <span className="project-detail-icon">
                    <Icon size={28} />
                  </span>
                  <p>{project.status} / {project.period}</p>
                  <h4 className="project-detail-panel-title">{project.title}</h4>
                  <strong>{project.description}</strong>
                  {project.links.length > 0 && (
                    <div className="project-detail-actions">
                      {project.links.map((link) => {
                        const LinkIcon = link.kind === "github" ? Github : ArrowUpRight;
                        return (
                          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.label} <LinkIcon size={15} />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
                <figure className="project-detail-panel-image">
                  <img src={project.mainImage} alt={project.mainImageAlt} />
                </figure>
              </div>

              <section className="project-detail-gallery-wrap" aria-label={`${project.title} screenshots`}>
                <div className="project-detail-gallery-heading">
                  <p className="editorial-eyebrow">Product walkthrough</p>
                  <span>Scroll sideways</span>
                </div>
                <div className="project-detail-gallery">
                  {project.detailImages.map((image, imageIndex) => (
                    <motion.figure
                      key={image.src}
                      className={`project-detail-shot is-${image.variant || "desktop"}`}
                      initial={{ opacity: 0, y: 22, scale: 0.985 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{
                        duration: 0.5,
                        delay: Math.min(imageIndex * 0.045, 0.18),
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <img src={image.src} alt={image.alt} />
                      <figcaption>
                        <span>{String(imageIndex + 1).padStart(2, "0")}</span>
                        {image.alt}
                      </figcaption>
                    </motion.figure>
                  ))}
                </div>
              </section>

              <div className="project-detail-columns">
                <section className="project-detail-section">
                  <p className="editorial-eyebrow">Highlights</p>
                  <ul>
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </section>

                <section className="project-detail-section">
                  <p className="editorial-eyebrow">What I learned</p>
                  <p>{project.learned}</p>
                </section>
              </div>

              <div className="project-detail-bottom-grid">
                <section className="project-detail-section">
                  <p className="editorial-eyebrow">System shape</p>
                  <div className="product-system-flow product-system-flow-modal">
                    {project.system.map((step, stepIndex) => (
                      <span key={step} className="product-system-step">
                        <span>{step}</span>
                        {stepIndex < project.system.length - 1 && <ArrowRight size={13} />}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="project-detail-section">
                  <p className="editorial-eyebrow">Tech stack</p>
                  <div className="project-detail-stack">
                    {project.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </section>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
