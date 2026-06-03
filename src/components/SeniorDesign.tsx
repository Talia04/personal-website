import { motion, useInView, useScroll, useTransform } from "motion/react";
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  CircleDot,
  FlaskConical,
  Network,
  Route,
} from "lucide-react";
import { useRef } from "react";
import { seniorDesign } from "../data/seniorDesign";
import "./SeniorDesign.css";

const gridCells = Array.from({ length: 25 }, (_, index) => index);
const routeCells = new Set([20, 15, 16, 11, 12, 7, 8, 3, 4]);

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

export function SeniorDesignHighlight() {
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

export function ResearchSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

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
    </section>
  );
}
