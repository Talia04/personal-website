import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Github,
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import type { PortfolioPath } from "./PortfolioFork";
import { contactInfo, getMailtoLink } from "../utils/contact";
import "./Contact.css";

interface ContactProps {
  path: PortfolioPath;
}

const contactModes = {
  tech: {
    eyebrow: "Connect / Next build",
    backdrop: "BUILD",
    title: "Let's talk about the work.",
    accent: "the work.",
    description:
      "Reach out for software engineering roles, product-minded teams, research-aligned work, or collaborations where thoughtful systems matter.",
    formTitle: "Start with context",
    formPrompt: "What are you building, hiring for, or exploring?",
    button: "Open email draft",
    note: "Best for SWE roles, internships, product engineering, research, and technical collaboration.",
    signal: "Open to full-time software engineering opportunities",
    chips: ["SWE roles", "Product engineering", "Research", "Mentorship"],
  },
  impact: {
    eyebrow: "Connect / Open doors",
    backdrop: "REACH OUT",
    title: "Send a note from wherever the story meets yours.",
    accent: "meets yours.",
    description:
      "I like conversations with people building access, education, community, research, and opportunity. A good note can become a collaboration, a mentorship thread, or a new chapter.",
    formTitle: "Leave a thoughtful note",
    formPrompt: "What part of the story connected, and what should we explore?",
    button: "Send the note",
    note: "Best for mentorship, scholarships, graduate school conversations, education work, and community ideas.",
    signal: "Interested in access-focused collaborations",
    chips: ["Mentorship", "Education", "Scholarships", "Community"],
  },
};

export function Contact({ path }: ContactProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mode = contactModes[path];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  const contacts = [
    {
      icon: Mail,
      label: "Inbox",
      value: contactInfo.email,
      href: getMailtoLink(),
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: contactInfo.linkedInDisplay,
      href: contactInfo.linkedIn,
    },
    {
      icon: Github,
      label: "GitHub",
      value: contactInfo.githubDisplay,
      href: contactInfo.github,
    },
    {
      icon: Phone,
      label: "Phone",
      value: contactInfo.phoneDisplay,
      href: `tel:${contactInfo.phone}`,
    },
    {
      icon: Globe2,
      label: "Website",
      value: contactInfo.websiteDisplay,
      href: contactInfo.website,
    },
    {
      icon: MapPin,
      label: "Location",
      value: `${contactInfo.location} / Remote`,
      href: contactInfo.locationHref,
    },
  ];

  const emailSubject = formState.name.trim()
    ? `Portfolio Contact from ${formState.name.trim()}`
    : "Portfolio Contact";
  const emailBody = [
    `Name: ${formState.name || ""}`,
    `Email: ${formState.email || ""}`,
    "",
    "Message:",
    formState.message || "",
  ].join("\n");
  const draftHref = getMailtoLink(emailSubject, emailBody);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    window.location.assign(draftHref);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`contact-section contact-section-${path}`}
    >
      <div className="contact-backdrop">
        <motion.span
          style={{ y: y1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.02 }}
          transition={{ duration: 1.5 }}
        >
          {mode.backdrop}
        </motion.span>
      </div>

      <div className="contact-grid-lines">
        {[25, 50, 75].map((pos) => (
          <div
            key={pos}
            style={{ left: `${pos}%` }}
          />
        ))}
      </div>

      <div className="contact-inner">
        <div className="contact-layout">
          <div className="contact-copy">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="contact-eyebrow"
            >
              {mode.eyebrow}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="contact-title"
            >
              {mode.title.replace(mode.accent, "")}
              <span>{mode.accent}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="contact-description"
            >
              {mode.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="contact-chip-row"
            >
              {mode.chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </motion.div>

            <div className="contact-link-grid">
              {contacts.map((contact, i) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="contact-link-card"
                  aria-label={`Open ${contact.label}: ${contact.value}`}
                >
                  <div className="contact-link-icon">
                    <contact.icon size={18} />
                  </div>
                  <div>
                    <p>{contact.label}</p>
                    <span>{contact.value}</span>
                  </div>
                  <ArrowUpRight size={15} />
                </motion.a>
              ))}
            </div>

            <motion.a
              href={contactInfo.locationHref}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="contact-location"
              aria-label={`Open location: ${contactInfo.location}`}
            >
              <MapPin size={14} />
              <span>{contactInfo.location} / Open to remote</span>
              <ArrowUpRight size={12} />
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="contact-card-shell"
          >
            <motion.a
              href={getMailtoLink("Portfolio inquiry")}
              style={{ rotate }}
              className="contact-art-card"
              aria-label="Open email for portfolio inquiry"
            >
              <p>{mode.signal}</p>
              <span>{path === "tech" ? "Recruiter-friendly route" : "Story-forward route"} / Open email</span>
            </motion.a>

            <form onSubmit={handleSubmit} className="contact-form" action={draftHref}>
              <div className="contact-form-heading">
                <MessageCircle size={18} />
                <div>
                  <p>{mode.formTitle}</p>
                  <span>{mode.formPrompt}</span>
                </div>
              </div>

              <div>
                <label>
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label>
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder={mode.formPrompt}
                  aria-label="Message"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="contact-submit"
              >
                {isSubmitting ? (
                  "Opening email..."
                ) : (
                  <>
                    <Send size={18} />
                    {mode.button}
                  </>
                )}
              </motion.button>

              <p className="contact-form-note">
                {mode.note} <a href={draftHref}>Open this draft directly.</a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
