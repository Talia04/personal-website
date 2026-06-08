import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Image, Images } from "lucide-react";
import { useRef } from "react";
import "./ImpactPortfolio.css";

const galleryItems = [
  {
    src: "/tanya-story-profile.png",
    eyebrow: "Portrait 01",
    title: "Rooted in Zimbabwe",
    type: "photo",
  },
  {
    src: "/basafy/14-splash.png",
    eyebrow: "Building 02",
    title: "Basafy in motion",
    type: "product",
  },
  {
    eyebrow: "Archive 03",
    title: "USAP community",
    type: "archive",
  },
  {
    eyebrow: "Archive 04",
    title: "Robotics and EcoCAR",
    type: "archive",
  },
  {
    src: "/basafy/01-home-dashboard.png",
    eyebrow: "Product 05",
    title: "Technology for opportunity",
    type: "product",
  },
  {
    eyebrow: "Archive 06",
    title: "Graduation and Meta",
    type: "archive",
  },
  {
    src: "/basafy/16-onboarding-gmail.png",
    eyebrow: "Product 07",
    title: "Turning inbox chaos into signal",
    type: "product",
  },
  {
    src: "/tanya-portrait-cutout-cropped.png",
    eyebrow: "Portrait 08",
    title: "Engineer with a story",
    type: "photo",
  },
  {
    eyebrow: "Archive 09",
    title: "Zimbabwe beginnings",
    type: "archive",
  },
  {
    src: "/basafy/11-insights.png",
    eyebrow: "Product 10",
    title: "Patterns, progress, reflection",
    type: "product",
  },
  {
    eyebrow: "Archive 11",
    title: "Conferences and community",
    type: "archive",
  },
  {
    src: "/basafy/08-pipeline-applied.png",
    eyebrow: "Product 12",
    title: "Building for career access",
    type: "product",
  },
];

export function ImpactPortfolio() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 75]);
  const galleryFloatY = useTransform(scrollYProgress, [0, 1], [35, -35]);

  const scrollToGallery = () => {
    document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" });
  };

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
              onClick={scrollToGallery}
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
                className={`impact-gallery-tile impact-gallery-${item.type} ${item.src ? "" : "impact-gallery-placeholder"}`}
              >
                {item.src ? (
                  <>
                    <div className="impact-photo-layers" aria-hidden="true">
                      <span />
                      <span />
                    </div>
                    <img src={item.src} alt={item.title} />
                    <div className="impact-gallery-caption">
                      <p className="impact-accent text-[9px] uppercase tracking-[0.24em]">
                        {item.eyebrow}
                      </p>
                      <h3 className="mt-1 text-base font-bold text-white">{item.title}</h3>
                    </div>
                  </>
                ) : (
                  <div>
                    <Images size={18} className="impact-accent mb-3" />
                    <p className="impact-accent text-[9px] uppercase tracking-[0.24em]">
                      {item.eyebrow}
                    </p>
                    <h3 className="mt-1 max-w-xs text-base font-bold text-white/75">{item.title}</h3>
                    <p className="impact-placeholder-copy">Drop a real photo here later.</p>
                  </div>
                )}
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
