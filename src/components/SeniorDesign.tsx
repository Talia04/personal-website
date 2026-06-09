import { AnimatePresence, motion, useInView, useScroll, useTransform } from "motion/react";
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  CircleDot,
  Download,
  ExternalLink,
  FileText,
  FlaskConical,
  Network,
  Route,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { seniorDesign } from "../data/seniorDesign";
import "./SeniorDesign.css";

const gridCells = Array.from({ length: 25 }, (_, index) => index);
const routeCells = new Set([20, 15, 16, 11, 12, 7, 8, 3, 4]);
const reportPath = "/documents/q-learning-report/tanya-chisepo-q-learning-report.pdf";

function GridWorldVisual({ expressive = false }: { expressive?: boolean }) {
  return (
    <div className={`senior-grid-world${expressive ? " is-expressive" : ""}`}>
      <div className="senior-grid-label">
        <span>Policy simulation</span>
        <span>5 x 5 abstraction</span>
      </div>
      <div className="senior-grid">
        {gridCells.map((cell) => {
          const isGoal = cell === 4;
          const isRobot = cell === 20;
          const isObstacle = cell === 13;
          const isRoute = routeCells.has(cell);

          return (
            <div
              key={cell}
              className={[
                "senior-grid-cell",
                isRoute ? "is-route" : "",
                isGoal ? "is-goal" : "",
                isRobot ? "is-robot" : "",
                isObstacle ? "is-obstacle" : "",
              ].join(" ")}
            >
              {isRobot && <Bot size={16} />}
              {isGoal && <CircleDot size={14} />}
            </div>
          );
        })}
      </div>
      <div className="senior-grid-legend">
        <span><i className="is-agent" /> Agent</span>
        <span><i className="is-path" /> Learned path</span>
        <span><i className="is-block" /> Obstacle</span>
      </div>
    </div>
  );
}

function ResearchPaperModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="research-paper-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="research-paper-title"
        >
          <motion.section
            className="research-paper-modal"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className="research-paper-modal-header">
              <div>
                <span>Senior design report</span>
                <h2 id="research-paper-title">Q-Learning for Robotic Grid-World Navigation</h2>
              </div>
              <div className="research-paper-modal-actions">
                <a href={reportPath} target="_blank" rel="noreferrer" aria-label="Open paper in a new tab">
                  <ExternalLink size={16} />
                </a>
                <a href={reportPath} download aria-label="Download the PDF report">
                  <Download size={16} />
                </a>
                <button type="button" className="research-paper-exit" onClick={onClose}>
                  <X size={17} />
                  <span>Exit</span>
                </button>
              </div>
            </header>
            <div className="research-paper-frame">
              <object data={reportPath} type="application/pdf" aria-label="Q-learning senior design report">
                <p>
                  This browser cannot display the PDF.
                  <a href={reportPath} target="_blank" rel="noreferrer">Open the report in a new tab.</a>
                </p>
              </object>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export function SeniorDesignHighlight({ onViewResearch }: { onViewResearch?: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 58%"],
  });
  const drawerY = useTransform(scrollYProgress, [0, 1], [58, 0]);
  const drawerOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.28, 0.72, 1]);
  const drawerScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  return (
    <section ref={ref} className="senior-design-compact">
      <motion.div
        style={{ y: drawerY, opacity: drawerOpacity, scale: drawerScale }}
        className="senior-design-compact-inner"
      >
        <div className="senior-design-drawer-handle">
          <span />
          <p>Senior design research</p>
          <span />
        </div>
        <div className="senior-design-compact-copy">
          <p className="editorial-eyebrow">Senior design / Research project</p>
          <h2>{seniorDesign.title}</h2>
          <p>{seniorDesign.techSummary}</p>
          <div className="senior-design-compact-tags">
            <span>Reinforcement learning</span>
            <span>Robotics</span>
            <span>Python</span>
            <span>CoppeliaSim</span>
          </div>
          <a
            href="/story/research/paper"
            className="senior-design-report-link"
            onClick={(event) => {
              if (!onViewResearch) return;
              event.preventDefault();
              onViewResearch();
            }}
          >
            View the full report on the story side
            <ArrowUpRight size={14} />
          </a>
        </div>

        <GridWorldVisual />

        <div className="senior-design-compact-notes">
          <div className="senior-design-action-list">
            <strong>What I did</strong>
            <ul>
              {seniorDesign.techActions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </div>
          <div>
            <BrainCircuit size={17} />
            <p>
              <strong>Core contribution</strong>
              {seniorDesign.contribution}
            </p>
          </div>
          <div>
            <Bot size={17} />
            <p>
              <strong>Applied outcome</strong>
              {seniorDesign.application}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function ResearchSpotlight({
  openPaper = false,
  onPaperOpen,
  onPaperClose,
}: {
  openPaper?: boolean;
  onPaperOpen?: () => void;
  onPaperClose?: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  const [isPaperOpen, setIsPaperOpen] = useState(false);

  useEffect(() => {
    setIsPaperOpen(openPaper);
  }, [openPaper]);

  return (
    <section id="research" ref={ref} className="research-spotlight">
      <div className="research-spotlight-orb" />
      <div className="research-spotlight-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="research-spotlight-header"
        >
          <div>
            <p className="research-eyebrow">Research notebook / Senior design</p>
            <h2>
              Asking where an algorithm <span>stops being enough.</span>
            </h2>
          </div>
          <div className="research-spotlight-intro">
            <FlaskConical size={19} />
            <p>
              My senior design project became an entry point into research:
              building experiments, studying failure modes, and treating limits
              as directions for the next question.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.72, delay: 0.1 }}
          className="research-question"
        >
          <p className="research-eyebrow">The question</p>
          <p>{seniorDesign.question}</p>
        </motion.div>

        <motion.a
          href="/story/research/paper"
          className="research-paper-card"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.14 }}
          onClick={(event) => {
            event.preventDefault();
            setIsPaperOpen(true);
            onPaperOpen?.();
          }}
        >
          <span className="research-paper-card-icon"><FileText size={19} /></span>
          <span>
            <strong>View the report here</strong>
            <small>Open a scrollable report preview with page controls</small>
          </span>
          <ArrowUpRight size={17} />
        </motion.a>

        <div className="research-feature-grid">
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="research-feature-visual"
          >
            <GridWorldVisual expressive />
            <div className="research-feature-caption">
              <Route size={17} />
              <p>
                A learned policy moves from an abstract grid into a physics-based
                robot simulation.
              </p>
            </div>
          </motion.div>

          <div className="research-phase-list">
            {seniorDesign.phases.map((phase, index) => (
              <motion.article
                key={phase.number}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.08 }}
                className="research-phase"
              >
                <span>{phase.number}</span>
                <div>
                  <h3>{phase.title}</h3>
                  <p>{phase.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="research-metrics">
          {seniorDesign.metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.32 + index * 0.07 }}
            >
              <p>{metric.value}</p>
              <span>{metric.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="research-conclusion-grid">
          <div>
            <p className="research-eyebrow">What the experiments revealed</p>
            <ul>
              {seniorDesign.findings.map((finding) => (
                <li key={finding}>{finding}</li>
              ))}
            </ul>
          </div>
          <div className="research-next">
            <Network size={19} />
            <p className="research-eyebrow">Where the question leads next</p>
            <p>{seniorDesign.future}</p>
            <span>
              Research interests
              <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </div>
      <ResearchPaperModal
        open={isPaperOpen}
        onClose={() => {
          setIsPaperOpen(false);
          onPaperClose?.();
        }}
      />
    </section>
  );
}
