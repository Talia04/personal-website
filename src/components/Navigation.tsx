import { useEffect, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
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
}

export function Navigation({ path, onSwitch }: NavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const currentItems = navItems[path];

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
        </div>
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
