import { useEffect } from "react";
import {
  Bot,
  Brain,
  Globe2,
  GraduationCap,
  Microscope,
  Palette,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import "./InterestsModal.css";

const interests = [
  {
    icon: Brain,
    number: "01",
    title: "Chess & strategy",
    description:
      "I love the quiet intensity of chess: noticing patterns, thinking ahead, and finding an unexpected path through a difficult position.",
    tags: ["Pattern recognition", "Strategy", "Community"],
    color: "lime",
    image: "/interests/chess.webp",
    shape: "tall",
  },
  {
    icon: GraduationCap,
    number: "02",
    title: "Teaching & mentorship",
    description:
      "Helping someone move from uncertainty to confidence is one of my favorite things. Teaching keeps me curious, patient, and grounded.",
    tags: ["Tutoring", "Access", "Growth"],
    color: "purple",
    image: "/interests/mentorship.webp",
    shape: "wide",
  },
  {
    icon: Bot,
    number: "03",
    title: "Robotics & making",
    description:
      "I enjoy ideas most when they become tangible. Robotics gives me space to build, test, break, adapt, and learn with my hands.",
    tags: ["Robotics", "Prototyping", "Teamwork"],
    color: "lime",
    image: "/interests/robotics.webp",
    shape: "standard",
  },
  {
    icon: Globe2,
    number: "04",
    title: "Travel & culture",
    description:
      "New places expand how I see people and possibility. I collect stories, perspectives, and small details from every community I encounter.",
    tags: ["Zimbabwe", "Culture", "Connection"],
    color: "purple",
    image: "/interests/travel.webp",
    shape: "wide",
  },
  {
    icon: Palette,
    number: "05",
    title: "Design & storytelling",
    description:
      "I care about how ideas feel, not only how they function. Visual storytelling lets technology become warmer, clearer, and more human.",
    tags: ["Visual design", "Products", "Stories"],
    color: "purple",
    image: "/interests/design.webp",
    shape: "standard",
  },
  {
    icon: Microscope,
    number: "06",
    title: "Research & discovery",
    description:
      "I am drawn to unanswered questions, especially where responsible technology can widen access to education and opportunity.",
    tags: ["Responsible AI", "Education", "Exploration"],
    color: "lime",
    image: "/interests/research.webp",
    shape: "tall",
  },
];

interface InterestsModalProps {
  open: boolean;
  onClose: () => void;
}

export function InterestsModal({ open, onClose }: InterestsModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="interests-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="interests-title"
        >
          <motion.section
            className="interests-room"
            initial={{ opacity: 0, y: -40, scale: 0.97, filter: "blur(18px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -28, scale: 0.98, filter: "blur(12px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="interests-aurora interests-aurora-lime" aria-hidden="true" />
            <div className="interests-aurora interests-aurora-purple" aria-hidden="true" />
            <div className="interests-grain" aria-hidden="true" />

            <header className="interests-header">
              <div>
                <span className="interests-kicker">
                  Beyond the resume
                </span>
                <h2 id="interests-title">
                  The things that keep me <em>curious.</em>
                </h2>
                <p>
                  A living collection of the interests, questions, and communities that
                  shape how I build and move through the world.
                </p>
              </div>
              <button type="button" className="interests-close" onClick={onClose}>
                <X size={18} />
                <span>Close</span>
              </button>
            </header>

            <div className="interests-marquee" aria-hidden="true">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 24, ease: "linear", repeat: Infinity }}
              >
                <span>Curiosity</span><i />
                <span>Culture</span><i />
                <span>Making</span><i />
                <span>Mentorship</span><i />
                <span>Discovery</span><i />
                <span>Curiosity</span><i />
                <span>Culture</span><i />
                <span>Making</span><i />
                <span>Mentorship</span><i />
                <span>Discovery</span><i />
              </motion.div>
            </div>

            <div className="interests-journal-label">
              <span>Visual journal</span>
              <small>A glimpse into the things I return to</small>
            </div>

            <div className="interests-grid">
              {interests.map((interest, index) => {
                const Icon = interest.icon;

                return (
                  <motion.article
                    key={interest.title}
                    className={`interest-card interest-card-${interest.color} interest-card-${interest.shape}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.12 + index * 0.055,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <motion.img
                      src={interest.image}
                      alt=""
                      animate={{ scale: [1.03, 1.09, 1.03], x: ["0%", "-1.5%", "0%"] }}
                      transition={{ duration: 12 + index, ease: "easeInOut", repeat: Infinity }}
                    />
                    <span className="interest-card-shade" aria-hidden="true" />
                    <div className="interest-card-top">
                      <span className="interest-icon"><Icon size={20} /></span>
                      <span className="interest-number">{interest.number}</span>
                    </div>
                    <h3>{interest.title}</h3>
                    <p>{interest.description}</p>
                    <div className="interest-tags">
                      {interest.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
