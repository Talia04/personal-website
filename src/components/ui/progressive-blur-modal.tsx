import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react";
import { ExternalLink, Github, Apple, ChevronRight, X, Layers, Smartphone, Brain, Mail, Regex, Database, Smartphone as MobileIcon, Calendar, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { IphoneMockup } from "./iphone-mockup";

export interface ProjectData {
  title: string;
  subtitle: string;
  period: string;
  color: string;
  description: string;
  highlights: string[];
  tech: string[];
  github?: string;
  demo?: string;
  appStore?: string;
  image?: string;
  gif?: string;
  video?: string;
  walkthrough?: { src: string; label: string }[];
  techDetails?: { name: string; icon: LucideIcon | IconType; desc: string; color?: string; category?: string }[];
  status?: "live" | "in-progress" | "completed";
  icon?: LucideIcon | IconType;
  featured?: boolean;
}

/* ── Liquid Glass Card (Featured - e.g. Basafy) ── */
export const FeaturedProjectCard = ({ project }: { project: ProjectData }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = project.walkthrough || [];
  const hasWalkthrough = slides.length > 0;

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 200, damping: 30 });
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 30 });
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 30 });

  // Auto-advance walkthrough
  useEffect(() => {
    if (!hasWalkthrough || isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [hasWalkthrough, isPaused, slides.length]);

  const goToSlide = useCallback((idx: number) => {
    setCurrentSlide(idx);
    setIsPaused(true);
    // Resume auto-play after 8 seconds of inactivity
    setTimeout(() => setIsPaused(false), 8000);
  }, []);

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="relative group"
    >
      {/* Liquid glass container */}
      <div className="relative overflow-hidden rounded-[32px] border border-white/[0.12] bg-white/[0.03] backdrop-blur-2xl">
        {/* Prismatic refraction overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(600px circle at ${x}% ${y}%, rgba(255,255,255,0.08), transparent 50%)`
            ),
          }}
        />

        {/* Iridescent border glow */}
        <div
          className="absolute -inset-[1px] rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"
          style={{
            background: `linear-gradient(135deg, ${project.color}40, transparent 40%, transparent 60%, ${project.color}30)`,
          }}
        />

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-0">
          {/* Left - iPhone Mockup with walkthrough */}
          <div className="relative py-10 px-6 md:px-10 flex flex-col items-center justify-center min-h-[380px] lg:min-h-[520px]">
            {/* Background ambient glow */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                background: `radial-gradient(ellipse at 50% 50%, ${project.color}25, transparent 70%)`,
              }}
            />

            {/* iPhone with animated screenshots */}
            <div className="relative z-10">
              {hasWalkthrough ? (
                <div className="relative">
                  <IphoneMockup
                    width={220}
                    height={448}
                    src={slides[currentSlide]?.src}
                    className="drop-shadow-2xl"
                    style={{
                      filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.5)) drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
                    }}
                  />

                  {/* Ambient glow beneath phone */}
                  <div
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[60%] h-8 rounded-full blur-2xl opacity-30"
                    style={{ backgroundColor: project.color }}
                  />
                </div>
              ) : (
                <IphoneMockup
                  width={220}
                  height={448}
                  videoSrc={project.video}
                  src={!project.video ? (project.gif || project.image) : undefined}
                  className="drop-shadow-2xl"
                  style={{
                    filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.5)) drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
                  }}
                />
              )}
            </div>

            {/* Walkthrough controls */}
            {hasWalkthrough && (
              <div className="relative z-10 mt-6 flex flex-col items-center gap-3">
                {/* Current screen label */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentSlide}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="text-[11px] font-medium text-white/50 tracking-wide"
                  >
                    {slides[currentSlide]?.label}
                  </motion.span>
                </AnimatePresence>

                {/* Dot indicators */}
                <div className="flex items-center gap-1.5">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToSlide(idx);
                      }}
                      className="p-0.5"
                    >
                      <div
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: idx === currentSlide ? 18 : 5,
                          height: 5,
                          backgroundColor: idx === currentSlide ? project.color : "rgba(255,255,255,0.2)",
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Floating status badge */}
            {project.status === "live" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.1] bg-white/[0.05] backdrop-blur-xl"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: project.color }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2.5 w-2.5"
                    style={{ backgroundColor: project.color }}
                  />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/80">
                  Live
                </span>
              </motion.div>
            )}
          </div>

          {/* Right - Info */}
          <div className="relative p-8 md:p-12 flex flex-col justify-center border-l border-white/[0.06]">
            {/* Subtle glass layer */}
            <div className="absolute inset-0 bg-white/[0.015]" />

            <div className="relative z-10">
              {/* Category label */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="h-[1px] w-8"
                  style={{ backgroundColor: project.color }}
                />
                <span
                  className="text-[10px] uppercase tracking-[0.3em] font-semibold"
                  style={{ color: project.color }}
                >
                  Featured Project
                </span>
              </div>

              {/* Title */}
              <h3 className="text-4xl md:text-5xl font-black text-white leading-[1.05] tracking-tight">
                {project.title}
              </h3>
              <p className="text-white/50 text-base mt-3 leading-relaxed max-w-md">
                {project.description}
              </p>

              {/* Tech & capabilities grid */}
              {project.techDetails && project.techDetails.length > 0 ? (
                <div className="mt-8 space-y-4 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
                  {(() => {
                    const categories = new Map<string, typeof project.techDetails>();
                    for (const td of project.techDetails!) {
                      const cat = td.category || "Core";
                      if (!categories.has(cat)) categories.set(cat, []);
                      categories.get(cat)!.push(td);
                    }
                    return Array.from(categories.entries()).map(([category, items]) => (
                      <div key={category}>
                        <span className="text-[9px] uppercase tracking-[0.25em] text-white/25 font-semibold block mb-2">
                          {category}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {items!.map((td) => {
                            const TdIcon = td.icon;
                            return (
                              <div
                                key={td.name}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all hover:border-white/[0.15] hover:bg-white/[0.05] group/tech"
                              >
                                <TdIcon
                                  size={13}
                                  className="shrink-0 transition-transform group-hover/tech:scale-110"
                                  style={{ color: td.color || project.color }}
                                />
                                <span className="text-white/70 text-[11px] font-medium whitespace-nowrap">
                                  {td.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              ) : (
                <>
                  {/* Highlights as liquid glass pills */}
                  <div className="flex flex-wrap gap-2 mt-8">
                    {project.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-4 py-2 rounded-full text-[11px] font-medium tracking-wide border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm text-white/60 transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white/80"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="mt-8 flex items-center gap-3">
                    <Layers size={14} className="text-white/30" />
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-10">
                {project.appStore && (
                  <a
                    href={project.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="group/btn flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/[0.12] bg-white/[0.05] backdrop-blur-xl text-white/90 transition-all hover:bg-white/[0.1] hover:border-white/25 hover:shadow-lg hover:shadow-black/20"
                  >
                    <Apple size={18} />
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 leading-none">
                        Download on the
                      </span>
                      <span className="text-sm font-semibold leading-tight">App Store</span>
                    </div>
                  </a>
                )}

                {project.github && project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] text-white/60 transition-all hover:bg-white/[0.08] hover:text-white/80 hover:border-white/15"
                  >
                    <Github size={16} />
                    <span className="text-xs font-medium">Source</span>
                  </a>
                )}

                {project.demo && project.demo !== "#" && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="group/web relative flex items-center gap-3 px-6 py-3 rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:shadow-black/20 overflow-hidden"
                    style={{
                      borderColor: `${project.color}30`,
                      background: `linear-gradient(135deg, ${project.color}12, ${project.color}06)`,
                    }}
                  >
                    {/* Shine sweep on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover/web:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(105deg, transparent 40%, ${project.color}15 45%, ${project.color}25 50%, ${project.color}15 55%, transparent 60%)`,
                      }}
                    />
                    {/* Pulsing dot */}
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
                        style={{ backgroundColor: project.color }}
                      />
                      <span
                        className="relative inline-flex rounded-full h-2 w-2"
                        style={{ backgroundColor: project.color }}
                      />
                    </span>
                    <div className="relative flex flex-col">
                      <span className="text-[9px] uppercase tracking-[0.15em] text-white/40 leading-none">
                        Visit web app
                      </span>
                      <span className="text-sm font-semibold leading-tight text-white/90">
                        basafy.com
                      </span>
                    </div>
                    <ExternalLink
                      size={14}
                      className="relative text-white/30 group-hover/web:text-white/70 group-hover/web:translate-x-0.5 group-hover/web:-translate-y-0.5 transition-all duration-300"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Liquid Glass Card (Standard projects) ── */
export const ProjectCard = ({ project, index }: { project: ProjectData; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 30 });
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 30 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const Icon = project.icon;

  return (
    <>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative group cursor-pointer h-full"
        onClick={() => setIsExpanded(true)}
        whileHover={{ y: -6, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Liquid glass card */}
        <div className="relative h-full overflow-hidden rounded-[28px] border border-white/[0.1] bg-white/[0.03] backdrop-blur-2xl transition-all duration-500 group-hover:border-white/[0.18] group-hover:bg-white/[0.05]">
          {/* Glare effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([x, y]) =>
                  `radial-gradient(400px circle at ${x}% ${y}%, rgba(255,255,255,0.06), transparent 50%)`
              ),
            }}
          />

          {/* Iridescent top accent */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)`,
            }}
          />

          {/* Preview area */}
          <div className="relative h-[200px] overflow-hidden">
            {/* Gradient background */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${project.color}18, transparent 70%), linear-gradient(180deg, ${project.color}08 0%, transparent 100%)`,
              }}
            />

            {/* Icon centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              {Icon && (
                <div
                  className="flex items-center justify-center w-20 h-20 rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-white/[0.15]"
                  style={{
                    boxShadow: `0 8px 32px ${project.color}15`,
                  }}
                >
                  <Icon size={32} className="text-white/60 group-hover:text-white/80 transition-colors" />
                </div>
              )}
            </div>

            {/* Status badge */}
            {project.status && (
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.1em] border backdrop-blur-sm ${
                    project.status === "live"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : project.status === "in-progress"
                      ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                      : "border-white/10 bg-white/5 text-white/50"
                  }`}
                >
                  {project.status === "in-progress" ? "In Progress" : project.status}
                </span>
              </div>
            )}

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#070707] to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 pt-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-xl font-bold text-white tracking-tight">{project.title}</h4>
                <p className="text-white/40 text-sm mt-1">{project.subtitle}</p>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-1 shrink-0">
                {project.period}
              </span>
            </div>

            <p className="text-white/35 text-sm mt-4 leading-relaxed line-clamp-2">
              {project.description}
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5 mt-5">
              {project.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-medium tracking-wide border border-white/[0.06] bg-white/[0.03] text-white/40"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* View project link */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-3">
                {project.github && project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-white/30 hover:text-white/60 transition-colors"
                  >
                    <Github size={15} />
                  </a>
                )}
                {project.demo && project.demo !== "#" && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-white/30 hover:text-white/60 transition-colors"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
              <span className="flex items-center gap-1.5 text-white/30 text-xs group-hover:text-white/60 transition-colors">
                Details
                <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <ProjectModal
        project={project}
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
      />
    </>
  );
};

/* ── Project Detail Modal (Liquid Glass) ── */
const ProjectModal = ({
  project,
  isOpen,
  onClose,
}: {
  project: ProjectData;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const Icon = project.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-[32px] border border-white/[0.12] bg-[#0a0a0a]/95 backdrop-blur-3xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.05] text-white/50 hover:text-white hover:bg-white/[0.1] transition-all"
            >
              <X size={16} />
            </button>

            {/* Header with ambient glow */}
            <div className="relative p-8 md:p-10 pb-0">
              <div
                className="absolute top-0 left-0 right-0 h-[200px] opacity-30 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${project.color}25, transparent 70%)`,
                }}
              />

              <div className="relative z-10 flex items-start gap-5">
                {Icon && (
                  <div
                    className="flex items-center justify-center w-16 h-16 rounded-2xl border border-white/[0.1] bg-white/[0.04] shrink-0"
                    style={{ boxShadow: `0 4px 24px ${project.color}15` }}
                  >
                    <Icon size={28} className="text-white/70" />
                  </div>
                )}
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-white/40 mt-1">{project.subtitle}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                      {project.period}
                    </span>
                    {project.status && (
                      <>
                        <span className="h-1 w-1 rounded-full bg-white/20" />
                        <span
                          className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${
                            project.status === "live"
                              ? "text-emerald-400"
                              : project.status === "in-progress"
                              ? "text-amber-400"
                              : "text-white/40"
                          }`}
                        >
                          {project.status === "in-progress" ? "In Progress" : project.status}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-8 md:p-10 space-y-8">
              {/* Description */}
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3">
                  About
                </h5>
                <p className="text-white/60 leading-relaxed">{project.description}</p>
              </div>

              {/* Highlights */}
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">
                  Key Features
                </h5>
                <div className="grid gap-3">
                  {project.highlights.map((h, i) => (
                    <div
                      key={h}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                    >
                      <span
                        className="flex items-center justify-center w-8 h-8 rounded-xl text-xs font-bold shrink-0"
                        style={{
                          color: project.color,
                          backgroundColor: project.color + "15",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-white/70 text-sm font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">
                  Tech Stack
                </h5>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-4 py-2 rounded-xl text-xs font-medium border border-white/[0.08] bg-white/[0.03] text-white/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/[0.06]">
                {project.appStore && (
                  <a
                    href={project.appStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/[0.12] bg-white/[0.05] text-white/80 transition-all hover:bg-white/[0.1] hover:border-white/20"
                  >
                    <Apple size={18} />
                    <div className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-[0.12em] text-white/35 leading-none">
                        Download on the
                      </span>
                      <span className="text-sm font-semibold leading-tight">App Store</span>
                    </div>
                  </a>
                )}
                {project.github && project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] text-white/50 hover:text-white/80 hover:bg-white/[0.08] transition-all"
                  >
                    <Github size={16} />
                    <span className="text-xs font-medium">View Source</span>
                  </a>
                )}
                {project.demo && project.demo !== "#" && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] text-white/50 hover:text-white/80 hover:bg-white/[0.08] transition-all"
                  >
                    <ExternalLink size={16} />
                    <span className="text-xs font-medium">Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
