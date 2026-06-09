import { motion } from "motion/react";
import { ArrowDownRight, BookOpen } from "lucide-react";
import { InteractiveAvatar } from "./InteractiveAvatar";
import "./Hero.css";

interface HeroProps {
  onReadStory?: () => void;
  onExploreWork?: () => void;
}

export function Hero({ onReadStory, onExploreWork }: HeroProps) {
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

          <p className="tech-hero-position">
            Software engineer building useful systems across product, mobile, and backend.
          </p>
          <p className="tech-hero-description">
            Three-time Meta intern, educator, and founder of Basafy. I turn
            everyday friction into thoughtful software with strong technical
            foundations and a bias toward shipping.
          </p>

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
    </section>
  );
}
