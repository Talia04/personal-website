import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, BookOpen, FileText, MapPin } from "lucide-react";
import { useState } from "react";
import { InteractiveAvatar } from "./InteractiveAvatar";
import { ResumeModal } from "./ResumeModal";
import "./Hero.css";

interface HeroProps {
  onReadStory?: () => void;
  onExploreWork?: () => void;
}

export function Hero({ onReadStory, onExploreWork }: HeroProps) {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

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
          <h1 className="tech-hero-name">
            Tanya
            <span>Chisepo</span>
          </h1>

          <motion.p
            className="tech-hero-location"
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.34 }}
          >
            <MapPin size={13} aria-hidden="true" />
            Houston, TX, USA
          </motion.p>

          <p className="tech-hero-position">
            Software engineer building useful systems across product, mobile, and backend.
          </p>
          <p className="tech-hero-description">
            Three-time Meta intern, educator, and founder of Basafy. I turn
            everyday friction into thoughtful software with strong technical
            foundations and a bias toward shipping.
          </p>

          <motion.button
            type="button"
            className="tech-hero-resume-cta"
            onClick={() => setIsResumeOpen(true)}
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="tech-hero-resume-icon" aria-hidden="true">
              <FileText size={18} />
            </span>
            <span className="tech-hero-resume-copy">
              <span><i aria-hidden="true" /> Resume 2026</span>
              <strong>View my resume</strong>
            </span>
            <ArrowUpRight className="tech-hero-resume-arrow" size={19} aria-hidden="true" />
          </motion.button>

          <div className="tech-hero-actions">
            <button type="button" onClick={onExploreWork} className="tech-hero-action">
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
        </motion.div>

        <motion.div
          className="tech-hero-visual"
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <InteractiveAvatar />
        </motion.div>
      </div>
      <ResumeModal open={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
}
