import { motion, useInView } from "motion/react";
import { ArrowDownRight, Download, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import graduationPhoto from "../assets/about-graduation.jpg";
import metaPhoto from "../assets/about-meta.jpg";
import universalPhoto from "../assets/about-universal.jpg";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { ResumeModal, resumePath } from "./ResumeModal";
import "./About.css";

const moments = [
  {
    src: graduationPhoto,
    alt: "Tanya Chisepo celebrating her college graduation",
    caption: "Recent summa cum laude computer science graduate",
    position: "center center",
  },
  {
    src: metaPhoto,
    alt: "Tanya Chisepo at Meta Hacker Way",
    caption: "Three-time software engineer intern at Meta",
    position: "52% 62%",
  },
  {
    src: universalPhoto,
    alt: "Tanya Chisepo visiting Universal Studios",
    caption: "I love traveling and trying new experiences",
    position: "center center",
  },
];

export function About({ onExploreFoundation }: { onExploreFoundation?: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });
  const [activeMoment, setActiveMoment] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveMoment((current) => (current + 1) % moments.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [activeMoment]);

  const momentPosition = (index: number) => {
    const offset = (index - activeMoment + moments.length) % moments.length;
    if (offset === 0) return "is-main";
    if (offset === 1) return "is-right";
    return "is-left";
  };

  return (
    <section id="about" ref={ref} className="tech-profile">
      <span className="tech-profile-glow" aria-hidden="true" />
      <div className="tech-profile-inner">
        <motion.div
          className="tech-profile-copy-column"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="editorial-eyebrow">About</p>
          <h2 className="tech-profile-title">
            I&apos;m Tanya, a product-focused <span>engineer.</span>
          </h2>

          <div className="tech-profile-story">
            <p>
              Ever since I discovered technology, I have loved using it to solve
              problems I care about. I build with a user-first mindset, combining
              empathy and engineering to create products that feel thoughtful,
              useful, and worth returning to.
            </p>
            <p>
              I am always turning over new ideas. Not every idea becomes a
              product, but that curiosity keeps me asking better questions,
              exploring possibilities, and finding practical ways to make an
              impact.
            </p>
            <p>
              Across three Meta internships on different teams, I learned to
              navigate complex systems, ramp up quickly, and deliver with
              context. As a recent summa cum laude computer science graduate, I
              bring that range into every end-to-end product I build.
            </p>
          </div>

          <div className="tech-profile-footer">
            <div className="tech-profile-socials" aria-label="Tanya's professional profiles and resume">
              <a
                className="tech-profile-social tech-profile-social-linkedin"
                href="https://www.linkedin.com/in/tanyaradzwa-chisepo/"
                target="_blank"
                rel="noreferrer"
                aria-label="Open Tanya Chisepo's LinkedIn profile"
              >
                <FaLinkedinIn aria-hidden="true" />
              </a>
              <a
                className="tech-profile-social tech-profile-social-github"
                href="https://github.com/Talia04"
                target="_blank"
                rel="noreferrer"
                aria-label="Open Tanya Chisepo's GitHub profile"
              >
                <FaGithub aria-hidden="true" />
              </a>
              <button
                type="button"
                className="tech-profile-social tech-profile-social-resume"
                onClick={() => setIsResumeOpen(true)}
                aria-label="View Tanya Chisepo's resume"
              >
                <FileText aria-hidden="true" />
              </button>
              <a
                className="tech-profile-social tech-profile-social-download"
                href={resumePath}
                download
                aria-label="Download Tanya Chisepo's resume"
              >
                <Download aria-hidden="true" />
              </a>
            </div>

            <a
              className="tech-profile-course-link"
              href="/tech/education"
              onClick={(event) => {
                if (!onExploreFoundation) return;
                event.preventDefault();
                onExploreFoundation();
              }}
            >
              Explore my foundation
              <ArrowDownRight size={13} />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="tech-profile-visual"
          initial={{ opacity: 0, x: 35, scale: 0.97 }}
          animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {moments.map((moment, index) => (
            <button
              key={moment.caption}
              type="button"
              className={`tech-profile-photo ${momentPosition(index)}`}
              onClick={() => setActiveMoment(index)}
              aria-label={`Show: ${moment.caption}`}
              aria-current={activeMoment === index}
            >
              <img
                src={moment.src}
                alt={activeMoment === index ? moment.alt : ""}
                style={{ objectPosition: moment.position }}
              />
            </button>
          ))}
          <div className="tech-profile-moment-copy" aria-live="polite">
            <span>{String(activeMoment + 1).padStart(2, "0")} / 03</span>
            <p>{moments[activeMoment].caption}</p>
          </div>
          <div className="tech-profile-moment-dots" aria-label="Choose a moment">
            {moments.map((moment, index) => (
              <button
                key={moment.caption}
                type="button"
                className={activeMoment === index ? "is-active" : ""}
                onClick={() => setActiveMoment(index)}
                aria-label={`Show ${moment.caption}`}
              />
            ))}
          </div>
          <span className="tech-profile-visual-orbit" aria-hidden="true" />
          <span className="tech-profile-visual-note" aria-hidden="true">
            Empathy → clarity → useful software
          </span>
        </motion.div>
      </div>
      <ResumeModal open={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
}
