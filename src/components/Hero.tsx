import { motion } from "motion/react";
import {
  ArrowDownRight,
  BookOpen,
  CircleCheck,
  Clock3,
  Layers3,
  Rocket,
  Terminal,
} from "lucide-react";
import "./Hero.css";

interface HeroProps {
  onReadStory?: () => void;
}

const proofPoints = [
  { value: "3×", label: "Meta internships" },
  { value: "4.0", label: "Computer science GPA" },
  { value: "Live", label: "Founder-built product" },
];

const workSignals = [
  {
    icon: Rocket,
    title: "I ship end-to-end",
    description: "From product idea and UI to backend, deployment, and release details.",
  },
  {
    icon: Layers3,
    title: "I think in systems",
    description: "Architecture, data flow, testing, and maintainability stay part of the build.",
  },
  {
    icon: Clock3,
    title: "I ramp fast",
    description: "Three Meta internships taught me to learn context quickly and deliver with clarity.",
  },
];

export function Hero({ onReadStory }: HeroProps) {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="tech-hero">
      <div className="tech-hero-grid editorial-grid" />

      <div className="tech-hero-inner">
        <motion.div
          className="tech-hero-intro"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="tech-availability">
            <span className="tech-availability-dot" />
            Open to software engineering opportunities
          </span>

          <h1 className="tech-hero-name">
            Tanya
            <span>Chisepo</span>
          </h1>

          <p className="tech-hero-position">
            Software engineer building useful systems across product, mobile, and backend.
          </p>
          <p className="tech-hero-description">
            Three-time Meta intern, educator, and founder of Basafy. I turn
            everyday friction into thoughtful software with strong technical
            foundations and a bias toward shipping.
          </p>

          <div className="tech-hero-actions">
            <button type="button" onClick={scrollToProjects} className="tech-hero-action">
              Explore selected work <ArrowDownRight size={15} />
            </button>
            <button
              type="button"
              onClick={onReadStory}
              className="tech-hero-action tech-hero-action-secondary"
            >
              Read the story <BookOpen size={14} />
            </button>
          </div>

          <div className="tech-hero-proof">
            {proofPoints.map((proof) => (
              <div key={proof.label} className="tech-hero-proof-item">
                <p className="tech-hero-proof-value">{proof.value}</p>
                <p className="tech-hero-proof-label">{proof.label}</p>
              </div>
            ))}
          </div>

          <div className="tech-hero-signals" aria-label="Engineering strengths">
            {workSignals.map((signal) => {
              const Icon = signal.icon;

              return (
                <motion.article
                  key={signal.title}
                  className="tech-hero-signal-card"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.45 }}
                >
                  <Icon size={16} />
                  <div>
                    <h2>{signal.title}</h2>
                    <p>{signal.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="tech-hero-visual"
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="tech-hero-portrait">
            <img src="/tanya-portrait.jpg" alt="Portrait of Tanya Chisepo" />
            <span className="tech-hero-portrait-label">Tanya Chisepo</span>
          </div>

          <motion.div
            className="tech-hero-console"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.65 }}
          >
            <div className="mb-3 flex items-center gap-2 border-b border-white/[0.08] pb-3">
              <Terminal size={13} className="text-[#a8d500]" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                Engineer profile
              </span>
            </div>
            <p className="tech-hero-console-row">
              <CircleCheck size={12} className="text-[#a8d500]" />
              <span><span className="tech-hero-console-key">focus:</span> product-minded SWE</span>
            </p>
            <p className="tech-hero-console-row">
              <CircleCheck size={12} className="text-[#a8d500]" />
              <span><span className="tech-hero-console-key">stack:</span> TypeScript, Python, mobile</span>
            </p>
            <p className="tech-hero-console-row">
              <CircleCheck size={12} className="text-[#a8d500]" />
              <span><span className="tech-hero-console-key">mode:</span> building with intent</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
