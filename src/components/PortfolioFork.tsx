import { motion } from "motion/react";
import { ArrowUpRight, Binary, BookOpen } from "lucide-react";
import "./PortfolioFork.css";

export type PortfolioPath = "tech" | "impact";

interface PortfolioForkProps {
  onSelect: (path: PortfolioPath) => void;
}

const paths = [
  {
    id: "tech" as const,
    eyebrow: "For recruiters & engineering teams",
    title: "The Engineer",
    description:
      "Products, systems, internships, and the technical decisions behind the work. A concise route through the evidence.",
    icon: Binary,
  },
  {
    id: "impact" as const,
    eyebrow: "For the curious & the future-facing",
    title: "The Story",
    description:
      "A visual archive of the places, people, and turning points behind the engineer. An expressive route through the why.",
    icon: BookOpen,
  },
];

export function PortfolioFork({ onSelect }: PortfolioForkProps) {
  return (
    <motion.section
      className="portfolio-fork"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.035, filter: "blur(16px)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Choose a portfolio experience"
    >
      <div className="fork-brand">
        <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-white/45">
          Tanya Chisepo <span className="text-[#a8d500]">/</span> Portfolio 02
        </p>
      </div>

      {paths.map((path, index) => {
        const Icon = path.icon;
        return (
          <motion.button
            key={path.id}
            type="button"
            onClick={() => onSelect(path.id)}
            className={`fork-panel fork-panel-${path.id}`}
            initial={{ opacity: 0, x: index === 0 ? -35 : 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.012 }}
          >
            <div className="fork-grid" />
            <motion.div
              className="fork-orb"
              animate={{ scale: [1, 1.18, 1], opacity: [0.16, 0.28, 0.16] }}
              transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="fork-panel-number">0{index + 1}</span>
            <div className="fork-content">
              <Icon size={20} className={path.id === "tech" ? "text-[#a8d500]" : "fork-impact-accent"} />
              <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-white/45">
                {path.eyebrow}
              </p>
              <h1 className="fork-title">{path.title}</h1>
              <p className="fork-description">{path.description}</p>
              <span className="fork-enter">
                Enter experience <ArrowUpRight size={15} />
              </span>
            </div>
          </motion.button>
        );
      })}

      <div className="fork-divider">OR</div>
    </motion.section>
  );
}
