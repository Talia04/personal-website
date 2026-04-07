import { useEffect, useState } from "react";

const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "Expertise", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;

    const updateActiveItem = () => {
      const targetLine = window.innerHeight * 0.28;
      let nextActive: string | null = null;

      for (const item of navItems) {
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
  }, []);

  const scrollToSection = (href: string) => {
    setActiveItem(href);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed left-1/2 z-[100] -translate-x-1/2"
        style={{
          top: "clamp(1rem, 3vw, 3rem)",
          width: "min(27.8rem, calc(100vw - 1.25rem))",
        }}
      >
        <div
          className="relative flex w-full items-center justify-center overflow-hidden rounded-full border"
          style={{
            background:
              "linear-gradient(180deg, rgba(52,52,56,0.78) 0%, rgba(33,33,37,0.84) 100%)",
            borderColor: "rgba(255,255,255,0.1)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(255,255,255,0.04), 0 12px 30px rgba(0,0,0,0.24), 0 0 0 1px rgba(255,255,255,0.04)",
            backdropFilter: "blur(28px) saturate(155%)",
            WebkitBackdropFilter: "blur(28px) saturate(155%)",
            gap: "clamp(0.09rem, 0.36vw, 0.45rem)",
            padding: "clamp(0.18rem, 0.45vw, 0.4rem)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03) 42%, rgba(255,255,255,0.01) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute left-8 top-[4px] h-[4px] w-14 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.95), rgba(255,255,255,0.08))",
              filter: "blur(0.6px)",
            }}
          />

          {navItems.map((item) => {
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
                className="relative z-10 min-w-0 flex-1 cursor-pointer rounded-full border font-medium tracking-[-0.02em] whitespace-nowrap"
                style={{
                  borderColor: isActive ? "rgba(255, 255, 255, 0.08)" : "transparent",
                  background: isActive
                    ? "linear-gradient(180deg, rgba(96,96,102,0.96) 0%, rgba(76,76,82,0.92) 100%)"
                    : "transparent",
                  color: isActive ? "#f5f4f7" : "rgba(245,244,247,0.78)",
                  boxShadow: isActive
                    ? "inset 0 1px 0 rgba(255,255,255,0.16), 0 8px 18px rgba(0,0,0,0.18)"
                    : "none",
                  transform: isActive ? "translateY(-1px)" : "translateY(0)",
                  fontSize: "clamp(0.76rem, 0.15vw, 0.15rem)",
                  padding: "clamp(0.32rem, 0.45vw, 0.45rem) clamp(0.29rem, 0.8vw, 0.9rem)",
                  transition:
                    "transform 220ms ease, background 220ms ease, color 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
