import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Work", href: "#projects" },
  { label: "Expertise", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-6 md:px-10 md:py-7 lg:px-16 lg:py-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-extrabold tracking-[-0.04em] text-[#eae6f6]"
          style={{ letterSpacing: "-1px" }}
        >
          TC.
        </button>

        <div className="hidden items-center gap-8 rounded-full border border-white/[0.08] bg-[#141018]/88 px-8 py-3 backdrop-blur-[12px] md:flex">
          {navItems.map((item, index) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className={`text-sm font-medium ${index === 0 ? "text-[#eae6f6]" : "text-[#a99bd6]"
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsOpen((open) => !open)}
          className="rounded-full border border-white/[0.08] bg-[#141018]/88 p-3 text-[#eae6f6] backdrop-blur-[12px] md:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="mx-6 mt-2 rounded-[1.5rem] border border-white/[0.08] bg-[#141018]/94 p-4 backdrop-blur-[12px] md:hidden">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="block w-full rounded-xl px-3 py-3 text-left text-[15px] font-medium text-[#a99bd6] hover:bg-white/[0.03] hover:text-[#eae6f6]"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
