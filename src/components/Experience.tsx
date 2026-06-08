import { motion, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import bcuLogo from "../assets/bcu-logo.png";
import metaLogo from "../assets/meta-color.svg";
import "./Experience.css";

const metaRoles = [
  {
    year: "2025",
    scope: "Mobile / iOS + Android",
    title: "Software Engineer Intern",
    highlights: [
      "Built a Facebook feature for bulk-adding saved content to collections.",
      "Created 15+ reusable cross-platform UI components.",
      "Raised test coverage and reduced the development-to-launch timeline.",
    ],
    impact: "40% increase in content saves",
  },
  {
    year: "2024",
    scope: "Backend infrastructure",
    title: "Software Engineer Intern",
    highlights: [
      "Led an automation feature migration to new infrastructure.",
      "Engineered a tree-based GraphQL schema for FAQ management.",
      "Delivered stronger test coverage across the migration.",
    ],
    impact: "10% increase in leads retention",
  },
  {
    year: "2023",
    scope: "Full-stack web",
    title: "Meta University Intern",
    highlights: [
      "Shipped a functional web app prototype in five weeks.",
      "Implemented search flows and responsive product behavior.",
      "Built my first production-minded engineering foundation.",
    ],
    impact: "First engineering internship",
  },
];

const bcuRoles = [
  {
    dates: "September 2024–December 2025",
    title: "CS Teaching Assistant",
    description:
      "Mentored students through programming fundamentals, weekly coding challenges, and the confidence required to keep learning.",
    highlights: [
      "Supported 15+ students through weekly technical guidance",
      "Provided one-on-one explanations for complex CS concepts",
      "Developed a teaching practice grounded in patience and clarity",
    ],
  },
  {
    dates: "February 2022–May 2024",
    title: "Math ATP Tutor",
    description:
      "Helped Bethune-Cookman students strengthen their understanding of mathematics concepts ranging from Algebra to Calculus.",
    highlights: [
      "Adapted explanations to different learning styles and skill levels",
      "Guided students through problem-solving strategies and practice",
      "Built students' confidence with foundational and advanced concepts",
    ],
  },
];

const summary = [
  { value: "3×", label: "Meta internships" },
  { value: "3", label: "Engineering domains" },
  { value: "15+", label: "Students mentored" },
];

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.14 });

  return (
    <section id="experience" ref={ref} className="tech-experience">
      <div className="tech-experience-inner">
        <div className="tech-experience-header">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="editorial-eyebrow">Track record / Selected experience</p>
            <h2 className="tech-experience-title">
              Three summers. <span>Wider scope</span> each time.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="tech-experience-copy"
          >
            My internship progression moved from full-stack product work to backend
            infrastructure and then cross-platform mobile engineering. Alongside
            that work, teaching and tutoring have made me a stronger technical
            communicator.
          </motion.p>
        </div>

        <div className="tech-experience-layout">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="tech-meta-panel"
          >
            <div className="tech-meta-panel-header">
              <div className="tech-company">
                <div className="tech-company-logo">
                  <img src={metaLogo} alt="Meta" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Meta</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/35">
                    Engineering progression / 2023–2025
                  </p>
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#a8d500]">
                Three internships
              </span>
            </div>

            <div className="tech-meta-roles">
              {metaRoles.map((role) => (
                <article key={role.year} className="tech-meta-role">
                  <div>
                    <p className="tech-meta-year">{role.year}</p>
                    <p className="tech-meta-scope">{role.scope}</p>
                  </div>
                  <div>
                    <h3>{role.title}</h3>
                    <ul>
                      {role.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                    <p className="tech-impact-badge">
                      Impact <ArrowUpRight size={12} /> {role.impact}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="tech-mentor-panel"
          >
            <div className="tech-company">
              <div className="tech-company-logo">
                <img src={bcuLogo} alt="Bethune-Cookman University" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Bethune-Cookman</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/35">
                  Academic support / 2022–2025
                </p>
              </div>
            </div>
            <div className="tech-mentor-roles">
              {bcuRoles.map((role) => (
                <article key={role.title} className="tech-mentor-role">
                  <p className="tech-mentor-dates">{role.dates}</p>
                  <h3>{role.title}</h3>
                  <p>{role.description}</p>
                  <ul className="tech-mentor-list">
                    {role.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </motion.aside>
        </div>

        <div className="tech-experience-summary">
          {summary.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 + index * 0.08 }}
              className="tech-experience-stat"
            >
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
