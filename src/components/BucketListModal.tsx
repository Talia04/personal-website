import { useEffect, useState } from "react";
import {
  BookOpen,
  Check,
  Code2,
  GraduationCap,
  HeartPulse,
  Languages,
  PartyPopper,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import "./BucketListModal.css";

const categories = [
  {
    id: "career",
    number: "01",
    shortTitle: "Grow.",
    title: "Academic & career",
    subtitle: "Study, lead & contribute",
    icon: GraduationCap,
    items: [
      { title: "Graduate summa cum laude", detail: "Finish my undergraduate chapter with distinction.", complete: true, marker: "Completed" },
      { title: "Build technology that expands access", detail: "Keep creating products for education, careers, and opportunity.", complete: false, marker: "In progress" },
      { title: "Pursue graduate study", detail: "Deepen my research practice at the intersection of people and technology.", complete: false, marker: "Next chapter" },
      { title: "Mentor the next generation of builders", detail: "Make technical careers feel possible and navigable for more students.", complete: false, marker: "Always" },
    ],
  },
  {
    id: "fun",
    number: "02",
    shortTitle: "Live.",
    title: "Fun & adventure",
    subtitle: "Explore, play & remember",
    icon: PartyPopper,
    items: [
      { title: "Visit every continent", detail: "Collect stories, food, friendships, and perspective along the way.", complete: false, marker: "Dreaming" },
      { title: "Learn a new style of dance", detail: "Choose joy, rhythm, and being a beginner again.", complete: false, marker: "Someday soon" },
      { title: "Play chess in a new country", detail: "Share a board with someone whose story is different from mine.", complete: false, marker: "Open invitation" },
      { title: "Create an unforgettable graduation trip", detail: "Celebrate the people and work behind the milestone.", complete: false, marker: "Planning" },
    ],
  },
  {
    id: "technical",
    number: "03",
    shortTitle: "Build.",
    title: "Technical craft",
    subtitle: "Code, ship & share",
    icon: Code2,
    items: [
      { title: "Build and launch Basafy", detail: "Turn a personal workflow problem into a thoughtful product.", complete: true, marker: "Shipped" },
      { title: "Make a meaningful open-source contribution", detail: "Contribute code that becomes genuinely useful to other builders.", complete: false, marker: "On the list" },
      { title: "Build a hardware-software project", detail: "Combine robotics, physical making, and elegant software.", complete: false, marker: "Experiment" },
      { title: "Publish a technical deep dive", detail: "Explain one difficult idea clearly enough that someone else can build from it.", complete: false, marker: "Drafting" },
    ],
  },
  {
    id: "health",
    number: "04",
    shortTitle: "Thrive.",
    title: "Health & wellbeing",
    subtitle: "Move, rest & sustain",
    icon: HeartPulse,
    items: [
      { title: "Build a joyful movement routine", detail: "Choose consistency and energy over perfection.", complete: false, marker: "In progress" },
      { title: "Complete a long-distance walk or hike", detail: "Challenge my endurance somewhere beautiful.", complete: false, marker: "Adventure" },
      { title: "Protect time for rest", detail: "Treat restoration as part of doing ambitious work well.", complete: false, marker: "Always" },
      { title: "Learn to cook five signature meals", detail: "Create comforting meals worth sharing with people I love.", complete: false, marker: "Practicing" },
    ],
  },
  {
    id: "languages",
    number: "05",
    shortTitle: "Connect.",
    title: "Languages & culture",
    subtitle: "Listen, learn & belong",
    icon: Languages,
    items: [
      { title: "Become conversational in a new language", detail: "Connect with more people in the language closest to them.", complete: false, marker: "Learning" },
      { title: "Read a book from ten different countries", detail: "Travel through stories before and after traveling in person.", complete: false, marker: "Reading" },
      { title: "Document stories from Zimbabwe", detail: "Preserve the people, places, and ideas that shaped me.", complete: false, marker: "Living archive" },
      { title: "Attend a global cultural festival", detail: "Experience a tradition with openness, respect, and curiosity.", complete: true, marker: "WYD 2019" },
    ],
  },
  {
    id: "learning",
    number: "06",
    shortTitle: "Discover.",
    title: "Learning & research",
    subtitle: "Question, test & understand",
    icon: BookOpen,
    items: [
      { title: "Publish research with real-world impact", detail: "Investigate a question that can improve how people learn or work.", complete: false, marker: "Future work" },
      { title: "Run a community technology workshop", detail: "Make a technical idea practical, welcoming, and useful.", complete: false, marker: "Designing" },
      { title: "Interview people whose work inspires me", detail: "Learn directly from the choices, failures, and values behind meaningful work.", complete: false, marker: "Collecting names" },
      { title: "Keep a lifelong learning archive", detail: "Capture questions, discoveries, and the ideas that change my mind.", complete: false, marker: "Ongoing" },
    ],
  },
];

interface BucketListModalProps {
  open: boolean;
  onClose: () => void;
}

export function BucketListModal({ open, onClose }: BucketListModalProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const category = categories.find((item) => item.id === activeCategory) ?? categories[0];
  const completed = category.items.filter((item) => item.complete).length;

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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="bucket-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => event.target === event.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="bucket-title"
        >
          <motion.section
            className="bucket-room"
            initial={{ opacity: 0, y: -36, scale: 0.97, filter: "blur(18px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -24, scale: 0.98, filter: "blur(12px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bucket-grain" aria-hidden="true" />
            <div className="bucket-glow bucket-glow-purple" aria-hidden="true" />
            <div className="bucket-glow bucket-glow-lime" aria-hidden="true" />

            <header className="bucket-header">
              <span className="bucket-kicker"><Sparkles size={13} /> A living list</span>
              <h2 id="bucket-title">Checked &amp; <em>unchecked.</em></h2>
              <p>Dreams in motion, experiments worth trying, and promises I am making to my future self.</p>
              <button type="button" className="bucket-close" onClick={onClose}>
                <X size={18} /><span>Close</span>
              </button>
            </header>

            <div className="bucket-category-tabs" aria-label="Bucket list categories">
              {categories.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={activeCategory === item.id ? "is-active" : ""}
                    onClick={() => setActiveCategory(item.id)}
                  >
                    <Icon size={15} />
                    <span>{item.shortTitle}</span>
                  </button>
                );
              })}
            </div>

            <div className="bucket-layout">
              <motion.aside
                key={`${category.id}-aside`}
                className="bucket-chapter"
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
              >
                <span>{category.number}</span>
                <h3>{category.title}</h3>
                <p>{category.subtitle}</p>
                <div className="bucket-progress">
                  <span><strong>{completed}</strong> / {category.items.length} checked</span>
                  <i><b style={{ width: `${(completed / category.items.length) * 100}%` }} /></i>
                </div>
              </motion.aside>

              <AnimatePresence mode="wait">
                <motion.div
                  key={category.id}
                  className="bucket-list"
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  {category.items.map((item, index) => (
                    <motion.article
                      key={item.title}
                      className={item.complete ? "is-complete" : ""}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.055, duration: 0.35 }}
                    >
                      <span className="bucket-check">{item.complete && <Check size={15} />}</span>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.detail}</p>
                      </div>
                      <span className="bucket-marker">{item.marker}</span>
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
