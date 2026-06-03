import { motion, useInView } from "motion/react";
import { ArrowDownRight, Blocks, BrainCircuit, UsersRound } from "lucide-react";
import { useRef } from "react";
import bcuLogo from "../assets/bcu-logo.png";
import "./About.css";

const strengths = [
  {
    icon: Blocks,
    title: "Product engineering",
    description:
      "I move across frontend, mobile, backend, and infrastructure to ship complete user-facing experiences.",
  },
  {
    icon: BrainCircuit,
    title: "Systems thinking",
    description:
      "I care about the architecture behind the interface: data flow, maintainability, testing, and operational details.",
  },
  {
    icon: UsersRound,
    title: "Technical leadership",
    description:
      "Teaching and mentoring make me a clearer collaborator. I explain complex ideas and help teams move with context.",
  },
];

const stats = [
  { value: "3×", label: "Meta intern" },
  { value: "10+", label: "Projects built" },
  { value: "15+", label: "Students mentored" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });

  return (
    <section id="about" ref={ref} className="tech-profile">
      <div className="tech-profile-inner">
        <div className="tech-profile-intro">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="editorial-eyebrow">Profile / How I work</p>
            <h2 className="tech-profile-title">
              Engineering with range, <span>clarity,</span> and follow-through.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="tech-profile-copy"
          >
            My best work sits where technical depth meets practical usefulness.
            I enjoy owning a problem end to end, understanding the system around
            it, and turning ambiguity into something people can use.
          </motion.p>
        </div>

        <div className="tech-profile-grid">
          {strengths.map((strength, index) => {
            const Icon = strength.icon;
            return (
              <motion.article
                key={strength.title}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.09 }}
                className="tech-profile-card"
              >
                <div className="tech-profile-icon">
                  <Icon size={18} />
                </div>
                <h3>{strength.title}</h3>
                <p>{strength.description}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="tech-profile-footer">
          <div className="tech-profile-stat-row">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="tech-profile-stat-value">{stat.value}</p>
                <p className="tech-profile-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="tech-profile-education">
            <div className="tech-profile-education-logo">
              <img src={bcuLogo} alt="Bethune-Cookman University" />
            </div>
            <div className="tech-profile-education-copy">
              <p className="text-sm font-semibold text-white">Bethune-Cookman University</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/35">
                B.S. Computer Science / May 2026
              </p>
              <a className="tech-profile-course-link" href="#coursework">
                Explore coursework
                <ArrowDownRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
