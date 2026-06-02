import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Image, Sparkles } from "lucide-react";
import { useRef } from "react";
import "./ImpactPortfolio.css";

const galleryItems = [
  {
    src: "/tanya-portrait.jpg",
    eyebrow: "Portrait 01",
    title: "Rooted in Zimbabwe",
  },
  {
    src: "/basafy/14-splash.png",
    eyebrow: "Building 02",
    title: "Basafy in motion",
  },
  {
    eyebrow: "Archive 03",
    title: "Add a USAP community photograph",
  },
  {
    eyebrow: "Archive 04",
    title: "Add a robotics or EcoCAR moment",
  },
  {
    src: "/basafy/01-home-dashboard.png",
    eyebrow: "Product 05",
    title: "Technology for opportunity",
  },
  {
    eyebrow: "Archive 06",
    title: "Add a graduation or Meta photograph",
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
            <img src="/tanya-portrait.jpg" alt="Portrait of Tanya Chisepo" />
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
            <p className="impact-copy-muted max-w-xs text-xs leading-relaxed">
              This gallery is intentionally ready for your real archive. Add
              photographs over time without changing the layout.
            </p>
          </div>

          <div className="impact-gallery-grid">
            {galleryItems.map((item, index) => (
              <motion.article
                key={`${item.eyebrow}-${item.title}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.65, delay: index * 0.06 }}
                className={`impact-gallery-tile ${item.src ? "" : "impact-gallery-placeholder"}`}
              >
                {item.src ? (
                  <>
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
                    <Image size={18} className="impact-accent mb-3" />
                    <p className="impact-accent text-[9px] uppercase tracking-[0.24em]">
                      {item.eyebrow}
                    </p>
                    <h3 className="mt-1 max-w-xs text-base font-bold text-white/75">{item.title}</h3>
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
              <Sparkles size={20} />
              <p className="mt-5">Build things. Open doors. Leave the path wider.</p>
            </motion.article>
          </div>
        </div>
      </section>
    </>
  );
}
