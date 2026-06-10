import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Image } from "lucide-react";
import { useRef } from "react";
import "./ImpactPortfolio.css";

const galleryItems = [
  {
    src: "/gallery/graduation-beach.jpg",
    eyebrow: "Milestone 01",
    title: "Closing one chapter, ready for the next",
    type: "photo",
    position: "center center",
  },
  {
    src: "/gallery/meta-hacker-way.jpg",
    eyebrow: "Internship 02",
    title: "Building at Meta",
    type: "archive",
    position: "center center",
  },
  {
    src: "/gallery/robotics-build.jpg",
    eyebrow: "Building 03",
    title: "Hands-on robotics",
    type: "archive",
    position: "center center",
  },
  {
    src: "/gallery/hackathon-team.jpg",
    eyebrow: "Teamwork 04",
    title: "Ideas become stronger together",
    type: "archive",
    position: "center center",
  },
  {
    src: "/gallery/machine-learning-presentation.jpg",
    eyebrow: "Teaching 05",
    title: "Making machine learning approachable",
    type: "archive",
    position: "center center",
  },
  {
    src: "/gallery/meta-ai-event.jpg",
    eyebrow: "Community 06",
    title: "Exploring AI with the Meta community",
    type: "archive",
    position: "center center",
  },
  {
    src: "/gallery/coding-workshop.jpg",
    eyebrow: "Focus 07",
    title: "Deep in the build",
    type: "archive",
    position: "center center",
  },
  {
    src: "/gallery/conference-portrait.jpg",
    eyebrow: "Journey 08",
    title: "Learning beyond the classroom",
    type: "photo",
    position: "center center",
  },
  {
    src: "/gallery/bcu-hackathon.jpg",
    eyebrow: "Hackathon 09",
    title: "Representing Bethune-Cookman",
    type: "archive",
    position: "center center",
  },
  {
    src: "/gallery/meta-summer.jpg",
    eyebrow: "Internship 10",
    title: "Another summer at Hacker Way",
    type: "archive",
    position: "center center",
  },
  {
    src: "/gallery/hackathon-focus.jpg",
    eyebrow: "Hackathon 11",
    title: "Shipping under pressure",
    type: "archive",
    position: "center center",
  },
  {
    src: "/gallery/hello-world.jpg",
    eyebrow: "Creative 12",
    title: "Hello, world",
    type: "art",
    position: "center center",
  },
];

export function ImpactPortfolio({ onBeginStory }: { onBeginStory?: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 75]);
  const galleryFloatY = useTransform(scrollYProgress, [0, 1], [35, -35]);

  return (
    <>
      <section id="impact-home" ref={ref} className="impact-hero">
        <div className="impact-grain" />
        <div className="impact-hero-inner">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="impact-accent text-[10px] uppercase tracking-[0.34em]"
          >
            The expressive portfolio / 01
          </motion.p>
          <motion.h1
            style={{ y: titleY }}
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="impact-display"
          >
            A life in <span>progress.</span>
          </motion.h1>

          <div className="impact-intro">
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="max-w-xl text-sm leading-relaxed text-white/55 md:text-base"
            >
              Before the résumé, there were classrooms, communities, long flights,
              brave experiments, and people who made opportunity feel possible.
              This is the visual archive behind the engineer.
            </motion.p>
            <motion.button
              type="button"
              onClick={onBeginStory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#a8d500]"
            >
              Begin the story <ArrowDown size={14} />
            </motion.button>
          </div>
        </div>

        <motion.div style={{ y: portraitY }} className="impact-portrait-stack">
          <motion.div
            className="impact-portrait-card"
            initial={{ opacity: 0, rotate: 4, x: 45 }}
            animate={{ opacity: 1, rotate: 2, x: 0 }}
            transition={{ duration: 1, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src="/tanya-story-profile.png" alt="Portrait of Tanya Chisepo" />
          </motion.div>
        </motion.div>
      </section>

      <section id="gallery" className="impact-gallery">
        <div className="impact-gallery-inner">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="impact-accent text-[10px] uppercase tracking-[0.34em]">
                Visual archive / 02
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black leading-[0.94] tracking-tight text-white md:text-6xl">
                Fragments of a story still being written.
              </h2>
            </div>
            <div className="max-w-xs">
              <p className="impact-copy-muted text-xs leading-relaxed">
                A living collection of the places, products, and people that
                shaped the work, ready to grow as more images are added.
              </p>
              <p className="impact-gallery-note mt-4">
                <Image size={13} /> Gallery-first story archive
              </p>
            </div>
          </div>

          <motion.div style={{ y: galleryFloatY }} className="impact-gallery-grid">
            {galleryItems.map((item, index) => (
              <motion.article
                key={`${item.eyebrow}-${item.title}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.65, delay: index * 0.045 }}
                whileHover={{ y: -8, rotate: index % 2 === 0 ? -1.4 : 1.4 }}
                className={`impact-gallery-tile impact-gallery-${item.type}`}
              >
                <div className="impact-photo-layers" aria-hidden="true">
                  <span />
                  <span />
                </div>
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  style={{ objectPosition: item.position }}
                />
                <div className="impact-gallery-caption">
                  <p className="impact-accent text-[9px] uppercase tracking-[0.24em]">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-white">{item.title}</h3>
                </div>
              </motion.article>
            ))}

            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="impact-gallery-tile impact-statement"
            >
              <p className="mt-5">Build things. Open doors. Leave the path wider.</p>
            </motion.article>
          </motion.div>
        </div>
      </section>

      <section className="impact-interlude">
        <div className="impact-grain" />
        <div className="impact-interlude-inner">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75 }}
            className="impact-interlude-quote"
          >
            The résumé shows the milestones. <span>The story shows what they changed.</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.12 }}
          >
            <p className="impact-interlude-copy">
              Every chapter added another layer: exposure became curiosity,
              curiosity became service, and service became the reason to build.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
