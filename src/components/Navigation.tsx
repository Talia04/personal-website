import { useEffect, useRef, useState } from "react";
import { ArrowLeftRight, Award, ChevronDown, Images, Microscope } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { PortfolioPath } from "./PortfolioFork";
import "./Navigation.css";

const navItems: Record<PortfolioPath, { label: string; href: string }[]> = {
  tech: [
    { label: "Profile", href: "#about" },
    { label: "Education", href: "#coursework" },
    { label: "Work", href: "#projects" },
    { label: "Expertise", href: "#skills" },
    { label: "Experience", href: "#experience" },
  ],
  impact: [
    { label: "Gallery", href: "#gallery" },
    { label: "Journey", href: "#journey" },
    { label: "Research", href: "#research" },
    { label: "Impact", href: "#impact" },
    { label: "Honors", href: "#achievements" },
  ],
};

interface NavigationProps {
  path: PortfolioPath;
  onSwitch: () => void;
  onOpenInterests: () => void;
  onOpenBucketList: () => void;
}

export function Navigation({ path, onSwitch, onOpenInterests, onOpenBucketList }: NavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const moreCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentItems = navItems[path];

  const cancelMoreClose = () => {
    if (moreCloseTimer.current) {
      window.clearTimeout(moreCloseTimer.current);
      moreCloseTimer.current = null;
    }
  };

  const openMore = () => {
    cancelMoreClose();
    setIsMoreOpen(true);
  };

  const scheduleMoreClose = () => {
    cancelMoreClose();
    moreCloseTimer.current = window.setTimeout(() => setIsMoreOpen(false), 180);
  };

  useEffect(() => {
    setIsMoreOpen(false);
  }, [path]);

  useEffect(() => () => cancelMoreClose(), []);

  useEffect(() => {
    if (!isMoreOpen) {
      return;
    }

    const closeMore = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeMore);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", closeMore);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMoreOpen]);

  useEffect(() => {
    let ticking = false;

    const updateActiveItem = () => {
      const targetLine = window.innerHeight * 0.28;
      let nextActive: string | null = null;

      for (const item of currentItems) {
        const section = document.querySelector<HTMLElement>(item.href);
        if (!section) {
          continue;
        }

        const rect = section.getBoundingClientRect();

        if (rect.top <= targetLine && rect.bottom >= targetLine) {
          nextActive = item.href;
          break;
        }
      }

      setActiveItem(nextActive);
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateActiveItem);
    };

    updateActiveItem();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [currentItems]);

  const scrollToSection = (href: string) => {
    setActiveItem(href);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="liquid-nav"
        aria-label={`${path === "tech" ? "Tech" : "Story"} portfolio navigation`}
      >
        <div className="liquid-nav-shell">
          <span className="liquid-nav-glow liquid-nav-glow-lime" aria-hidden="true" />
          <span className="liquid-nav-glow liquid-nav-glow-purple" aria-hidden="true" />
          <span className="liquid-nav-shine" aria-hidden="true" />

          {currentItems.map((item) => {
            const isActive = hoveredItem === item.href || activeItem === item.href;

            return (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollToSection(item.href)}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
                onFocus={() => setHoveredItem(item.href)}
                onBlur={() => setHoveredItem(null)}
                className={`liquid-nav-item ${isActive ? "is-active" : ""}`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}

          {path === "impact" && (
            <button
              type="button"
              className={`liquid-nav-item liquid-nav-more-trigger ${isMoreOpen ? "is-active" : ""}`}
              aria-expanded={isMoreOpen}
              aria-controls="story-more-menu"
              onClick={() => setIsMoreOpen((current) => !current)}
              onMouseEnter={openMore}
              onMouseLeave={scheduleMoreClose}
              onFocus={openMore}
            >
              <span>More</span>
              <ChevronDown size={12} aria-hidden="true" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {path === "impact" && isMoreOpen && (
            <motion.div
              id="story-more-menu"
              className="liquid-more-panel"
              initial={{ opacity: 0, x: "-50%", y: -12, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: "-50%", y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: "-50%", y: -8, scale: 0.97, filter: "blur(8px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={openMore}
              onMouseLeave={scheduleMoreClose}
            >
              <span className="liquid-more-glow" aria-hidden="true" />
              <div className="liquid-more-heading">
                <span>More of my world</span>
                <small>Hidden rooms beyond the main story</small>
              </div>
              <div className="liquid-more-layout">
                <div className="liquid-more-features">
                  <button
                    type="button"
                    className="liquid-more-feature"
                    onClick={() => {
                      setIsMoreOpen(false);
                      onOpenInterests();
                    }}
                  >
                    <img src="/more-rooms/interests-room.webp" alt="" />
                    <span className="liquid-more-feature-shade" aria-hidden="true" />
                    <span className="liquid-more-feature-copy">
                      <small>Enter the room</small>
                      <strong>Interests & curiosities</strong>
                      <span>Chess, culture, making, mentorship, and more</span>
                    </span>
                    <span className="liquid-more-feature-arrow" aria-hidden="true">↗</span>
                  </button>

                  <button
                    type="button"
                    className="liquid-more-feature liquid-more-feature-bucket"
                    onClick={() => {
                      setIsMoreOpen(false);
                      onOpenBucketList();
                    }}
                  >
                    <img src="/more-rooms/bucket-list-room.webp" alt="" />
                    <span className="liquid-more-feature-shade" aria-hidden="true" />
                    <span className="liquid-more-feature-copy">
                      <small>Checked & unchecked</small>
                      <strong>Bucket list</strong>
                      <span>Ambitions, adventures, skills, and promises to my future self</span>
                    </span>
                    <span className="liquid-more-feature-arrow" aria-hidden="true">↗</span>
                  </button>
                </div>

                <div className="liquid-more-shortcuts">
                  <button type="button" onClick={() => { setIsMoreOpen(false); scrollToSection("#gallery"); }}>
                    <span><Images size={17} /></span>
                    <span><strong>Gallery</strong><small>See moments from the journey</small></span>
                    <i>↗</i>
                  </button>
                  <button type="button" onClick={() => { setIsMoreOpen(false); scrollToSection("#research"); }}>
                    <span><Microscope size={17} /></span>
                    <span><strong>Research</strong><small>Explore how I think and investigate</small></span>
                    <i>↗</i>
                  </button>
                  <button type="button" onClick={() => { setIsMoreOpen(false); scrollToSection("#achievements"); }}>
                    <span><Award size={17} /></span>
                    <span><strong>Recognition</strong><small>Milestones along the way</small></span>
                    <i>↗</i>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <button
        type="button"
        onClick={onSwitch}
        className="mode-switch"
        aria-label={`Switch to ${path === "tech" ? "story" : "tech"} portfolio path`}
      >
        <ArrowLeftRight size={12} />
        {path === "tech" ? "Story path" : "Tech path"}
      </button>
    </>
  );
}
