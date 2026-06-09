import { motion, useInView } from "motion/react";
import {
  Binary,
  BookOpenCheck,
  Braces,
  CircuitBoard,
  GraduationCap,
  Sigma,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import bcuLogo from "../assets/bcu-logo.png";
import { SeniorDesignHighlight } from "./SeniorDesign";
import "./Coursework.css";

const courseGroups = [
  {
    icon: Braces,
    label: "Software / Product",
    description: "Building complete, maintainable products from requirements to delivery.",
    courses: [
      "Software Engineering",
      "Object Oriented Design",
      "Mobile Applications Development",
      "Databases",
      "Senior Design I & II",
    ],
  },
  {
    icon: CircuitBoard,
    label: "Systems / Security",
    description: "Understanding what happens below the interface and across the network.",
    courses: [
      "Operating Systems",
      "Computer Architecture",
      "Computer Networks & Communication",
      "Network Security",
      "Digital Circuits",
    ],
  },
  {
    icon: Binary,
    label: "Core Computing",
    description: "The foundations for reasoning about efficient, dependable software.",
    courses: [
      "Data Structures",
      "Computer Programming I & II",
      "Computer Organization & Assembly",
      "Computability",
      "Scientific Computing",
    ],
  },
  {
    icon: Sigma,
    label: "Math / Applied",
    description: "Quantitative tools for systems thinking, modeling, and robotics work.",
    courses: [
      "Discrete Mathematics",
      "Linear Algebra",
      "Probability & Statistics",
      "Calculus I & II",
      "Differential Equations",
      "Networked Autonomous Robotics",
    ],
  },
];

export function Coursework({ onViewResearch }: { onViewResearch?: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  const [isDiplomaOpen, setIsDiplomaOpen] = useState(false);

  return (
    <section id="coursework" ref={ref} className="coursework">
      <div className="coursework-glow" />
      <div className="coursework-inner">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="coursework-header"
        >
          <div>
            <p className="editorial-eyebrow">Education / Academic foundation</p>
            <h2 className="coursework-title">
              The theory behind the <span>build.</span>
            </h2>
          </div>
          <p className="coursework-intro">
            A selected view of the technical and quantitative coursework that
            shaped how I approach product engineering, systems, and applied
            problem-solving.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="coursework-degree"
        >
          <div className="coursework-degree-logo">
            <img src={bcuLogo} alt="" />
          </div>
          <div>
            <p className="coursework-degree-label">Bethune-Cookman University</p>
            <p className="coursework-degree-detail">
              B.S. Computer Science / Summa Cum Laude / Class of 2026
            </p>
          </div>
          <div className="coursework-degree-mark">
            <BookOpenCheck size={16} />
            Selected coursework
          </div>
          <div
            className={`coursework-diploma${isDiplomaOpen ? " is-open" : ""}`}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setIsDiplomaOpen(false);
              }
            }}
          >
            <button
              type="button"
              className="coursework-diploma-trigger"
              aria-expanded={isDiplomaOpen}
              aria-controls="diploma-preview"
              onClick={() => setIsDiplomaOpen((isOpen) => !isOpen)}
            >
              <GraduationCap size={15} />
              View diploma
            </button>

            <div
              id="diploma-preview"
              className="coursework-diploma-popover"
            >
              <div className="coursework-diploma-topline">
                <div>
                  <p className="coursework-diploma-kicker">Credential / 2026</p>
                  <p className="coursework-diploma-title">
                    Bachelor of Science in Computer Science
                  </p>
                </div>
                <button
                  type="button"
                  className="coursework-diploma-close"
                  aria-label="Close diploma preview"
                  onClick={(event) => {
                    event.currentTarget.blur();
                    setIsDiplomaOpen(false);
                  }}
                >
                  <X size={14} />
                </button>
              </div>

              <div className="coursework-diploma-frame">
                <img
                  src="/documents/tanya-chisepo-diploma-preview.jpg"
                  alt="Bethune-Cookman University Bachelor of Science diploma awarded to Tanyaradzwa Julia Chisepo"
                />
                <span>
                  Portfolio preview only
                </span>
              </div>

              <p className="coursework-diploma-note">
                Conferred May 5, 2026 / Original credential available on request
              </p>
            </div>
          </div>
        </motion.div>

        <div className="coursework-grid">
          {courseGroups.map((group, index) => {
            const Icon = group.icon;

            return (
              <motion.article
                key={group.label}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.58, delay: 0.2 + index * 0.08 }}
                className="coursework-card"
              >
                <div className="coursework-card-topline">
                  <div className="coursework-card-icon">
                    <Icon size={17} />
                  </div>
                  <p>{String(index + 1).padStart(2, "0")}</p>
                </div>
                <h3>{group.label}</h3>
                <p className="coursework-card-description">{group.description}</p>
                <ul>
                  {group.courses.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        <SeniorDesignHighlight onViewResearch={onViewResearch} />
      </div>
    </section>
  );
}
