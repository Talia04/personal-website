import { motion, useInView, useScroll, useSpring } from "motion/react";
import { Image, MapPin, Play, Sparkles } from "lucide-react";
import { useRef } from "react";
import { impactAreas, journeyEvents, type JourneyMedia } from "../data/journey";
import "./Journey.css";

function MediaTile({ media }: { media: JourneyMedia }) {
  if (media.src) {
    return (
      <figure className="journey-media group relative">
        {media.type === "video" ? (
          <video
            src={media.src}
            aria-label={media.alt}
            className="journey-media-image"
            controls
            preload="metadata"
          />
        ) : (
          <img
            src={media.src}
            alt={media.alt}
            className="journey-media-image"
          />
        )}
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f0b16] to-transparent px-4 pb-4 pt-12 text-xs text-white/70">
          {media.caption}
        </figcaption>
      </figure>
    );
  }

  const MediaIcon = media.type === "video" ? Play : Image;

  return (
    <div className="journey-media journey-media-placeholder">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#a8d500]/25 bg-[#a8d500]/10 text-[#a8d500]">
        <MediaIcon size={17} />
      </div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#a8d500]/80">
        Media placeholder
      </p>
      <p className="text-xs text-white/35">{media.caption}</p>
    </div>
  );
}

export function Journey() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.04 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const timelineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
  });

  return (
    <section
      id="journey"
      ref={ref}
      className="journey-section"
    >
      <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.025 }}
          transition={{ duration: 1.5 }}
          className="whitespace-nowrap font-black leading-none text-white"
          style={{ fontSize: "clamp(120px, 24vw, 380px)" }}
        >
          JOURNEY
        </motion.span>
      </div>

      <div className="journey-container relative z-10">
        <div className="journey-intro">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="journey-eyebrow"
          >
            Timeline — My Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="journey-title"
          >
            A story shaped by <span>access and opportunity.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18 }}
            className="journey-copy"
          >
            My path into engineering has never been only about code. It is a
            record of the people, communities, and problems that taught me what
            technology can make possible.
          </motion.p>
        </div>

        <div className="relative">
          <div className="journey-timeline">
            <motion.div
              style={{ scaleY: timelineProgress, originY: 0 }}
              className="h-full w-full bg-gradient-to-b from-[#a8d500] via-[#a8d500]/70 to-[#a8d500]/10"
            />
          </div>

          <div className="journey-events">
            {journeyEvents.map((event, index) => {
              const Icon = event.icon;

              return (
                <motion.article
                  key={`${event.year}-${event.title}`}
                  initial={{ opacity: 0, y: 45 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.7, delay: 0.06 }}
                  className="journey-event"
                >
                  <div className="journey-story">
                    <div className="journey-card">
                      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-4xl font-black tracking-tight text-[#a8d500] md:text-5xl">
                          {event.year}
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-white/35">
                          <MapPin size={12} />
                          {event.location}
                        </span>
                      </div>
                      <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-[#a8d500]/70">
                        {event.chapter}
                      </p>
                      <h3 className="mb-4 text-xl font-bold text-white md:text-2xl">
                        {event.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/50">
                        {event.description}
                      </p>
                      <div className="mt-6 space-y-2.5 border-t border-white/[0.06] pt-5">
                        {event.achievements.map((achievement) => (
                          <div key={achievement} className="flex items-start gap-3 text-xs leading-relaxed text-white/55">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e589ff]" />
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="journey-media-grid">
                    {event.media.map((media) => (
                      <MediaTile key={`${event.year}-${media.caption}`} media={media} />
                    ))}
                  </div>

                  <div className="journey-node">
                    <Icon size={15} />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div id="impact" className="journey-impact">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="journey-eyebrow mb-4 block">
                Impact — Beyond the résumé
              </span>
              <h3 className="journey-impact-title">
                The work matters when it <span>creates a path for someone else.</span>
              </h3>
            </div>
            <Sparkles className="impact-accent hidden md:block" size={28} />
          </div>

          <div className="journey-impact-grid">
            {impactAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="journey-impact-card"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <Icon className="impact-accent" size={20} />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                      {area.title}
                    </span>
                  </div>
                  <p className="text-4xl font-black text-white">{area.metric}</p>
                  <p className="impact-accent mt-1 text-xs uppercase tracking-[0.2em]">
                    {area.label}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-white/45">
                    {area.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#a8d500] via-[#a8d500]/50 to-transparent" />
    </section>
  );
}
