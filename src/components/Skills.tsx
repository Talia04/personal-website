import { motion, useInView } from "motion/react";
import { useRef, type CSSProperties, type MouseEvent } from "react";
import "./Skills.css";

const skillGroups = [
  {
    title: "Product engineering",
    description: "Interfaces and product flows that stay thoughtful across web and mobile.",
    items: ["React", "React Native", "TypeScript", "Next.js", "Expo"],
    color: "#a8d500",
  },
  {
    title: "Backend & data",
    description: "APIs, schemas, and data systems designed for reliable product behavior.",
    items: ["Python", "Node.js", "GraphQL", "PostgreSQL", "Supabase"],
    color: "#a78bfa",
  },
  {
    title: "Applied intelligence",
    description: "Practical AI pipelines where model output is only one part of the system.",
    items: ["OpenAI", "LLMs", "Regex", "TensorFlow", "Computer Vision"],
    color: "#d946ef",
  },
  {
    title: "Engineering practice",
    description: "The tooling and habits that make software easier to ship and maintain.",
    items: ["Git", "Testing", "CI/CD", "Docker", "Cloudflare"],
    color: "#c4ef25",
  },
];

const tools = [
  "TypeScript",
  "Python",
  "React Native",
  "GraphQL",
  "PostgreSQL",
  "Supabase",
  "OpenAI",
  "GitHub Actions",
  "Docker",
  "Figma",
];

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });
  const railItems = [...tools, ...tools];

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--skills-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--skills-y", `${event.clientY - rect.top}px`);
  };

  return (
    <section id="skills" ref={ref} className="tech-skills" onMouseMove={handlePointerMove}>
      <div className="tech-skills-texture" aria-hidden="true" />
      <div className="tech-skills-aurora tech-skills-aurora-lime" aria-hidden="true" />
      <div className="tech-skills-aurora tech-skills-aurora-purple" aria-hidden="true" />

      <div className="tech-skills-inner">
        <div className="tech-skills-header">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="editorial-eyebrow">Expertise / Capability map</p>
            <h2 className="tech-skills-title">
              Tools are useful. <span>Judgment</span> is the differentiator.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="tech-skills-copy"
          >
            My stack changes with the problem. These are the areas where I have
            built enough context to make strong implementation decisions and
            move from an idea to a working product.
          </motion.p>
        </div>

        <div className="tech-skills-grid">
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 + index * 0.08 }}
              whileHover={{ y: -10, scale: 1.018 }}
              className="tech-skill-card"
              style={{ "--skill-color": group.color } as CSSProperties}
            >
              <span className="tech-skill-card-glow" aria-hidden="true" />
              <span className="tech-skill-number">0{index + 1}</span>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <div className="tech-skill-list">
                {group.items.map((item, itemIndex) => (
                  <motion.span
                    key={item}
                    className="tech-skill-pill"
                    initial={{ opacity: 0, y: 8 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.35, delay: 0.35 + index * 0.08 + itemIndex * 0.035 }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="tech-tool-rail">
          <motion.div
            className="tech-tool-track"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {railItems.map((tool, index) => (
              <span key={`${tool}-${index}`} className="tech-tool-item">
                <span className="tech-tool-dot" />
                {tool}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
