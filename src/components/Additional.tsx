import { motion, useInView } from "motion/react";
import { Award, Sparkles } from "lucide-react";
import { useRef } from "react";
import "./Additional.css";

const recognitionItems = [
  {
    place: "3rd",
    title: "IEEE SoutheastCon",
    subtitle: "Hardware competition / 60 schools",
    date: "2025",
    description:
      "Developed autonomous movement logic and assembled the robotics chassis from scratch.",
  },
  {
    place: "4th",
    title: "Black Excellence SMART",
    subtitle: "American Airlines hackathon / 47 schools",
    date: "2024",
    description:
      "Built a digital assistant web prototype in under 24 hours with a focus on frontend flow.",
  },
  {
    place: "3rd",
    title: "Jane Street INSIGHT",
    subtitle: "Trading competition",
    date: "2024",
    description:
      "Built a Python trading bot as part of a simulated market competition.",
  },
];

const summary = [
  { value: "4", label: "Major awards" },
  { value: "2", label: "Competition placements" },
  { value: "$10K+", label: "Scholarships" },
];

export function Additional() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.16 });

  return (
    <section id="achievements" ref={ref} className="recognition">
      <div className="recognition-inner">
        <div className="recognition-header">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="editorial-eyebrow">Recognition / Selected honors</p>
            <h2 className="recognition-title">
              Moments of <span>recognition.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="recognition-copy"
          >
            A few external signals across scholarship, robotics, hackathons, and
            technical competitions. Each one marks a different kind of growth.
          </motion.p>
        </div>

        <div className="recognition-layout">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="recognition-feature"
          >
            <span className="recognition-feature-badge">
              <Award size={15} /> Scholarship spotlight
            </span>
            <h3>Generation Google Scholar</h3>
            <p>
              Selected as one of 56 North American recipients from thousands of
              applicants for leadership potential and a commitment to expanding
              representation in technology.
            </p>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="recognition-list"
          >
            {recognitionItems.map((item) => (
              <article key={item.title} className="recognition-item">
                <p className="recognition-place">{item.place}</p>
                <div>
                  <h3>{item.title}</h3>
                  <p className="text-white/35">{item.subtitle}</p>
                  <p>{item.description}</p>
                </div>
                <span className="recognition-year">{item.date}</span>
              </article>
            ))}
          </motion.div>
        </div>

        <div className="recognition-summary">
          {summary.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.42 + index * 0.08 }}
              className="recognition-stat"
            >
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </motion.div>
          ))}
          <Sparkles className="ml-auto hidden self-center text-[color:var(--portfolio-accent)] md:block" size={18} />
        </div>
      </div>
    </section>
  );
}
