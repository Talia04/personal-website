import { motion, useScroll, useSpring } from "motion/react";
import { Linkedin, Mail, Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { openEmail, openPhone, openLinkedIn } from "../utils/contact";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const navItems = [
    { label: "ABOUT", href: "#about" },
    { label: "EXPERTISE", href: "#skills" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CONTACT", href: "#contact" },
  ];

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(`#${section}`);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#050505]/70 border-b border-white/[0.05]"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#a8d500] to-[#c4ff00] origin-left z-10"
      />

      {/* Subtle glow on scroll */}
      <motion.div
        style={{ opacity: scrollYProgress }}
        className="absolute inset-0 bg-gradient-to-b from-[#a8d500]/[0.02] to-transparent pointer-events-none"
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cursor-pointer"
          >
            <img
              src="/tc-logo.png"
              alt="TC"
              className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-110"
            />
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ y: -2 }}
                className={`relative text-sm tracking-wide transition-colors duration-300 py-2 px-1 ${activeSection === item.href
                  ? 'text-white'
                  : 'text-white/50 hover:text-white'
                  }`}
              >
                {item.label}
                {activeSection === item.href && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#a8d500] to-[#a8d500]/50 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <motion.span
                  className="absolute inset-0 bg-[#a8d500]/0 hover:bg-[#a8d500]/5 rounded-lg transition-colors duration-300"
                />
              </motion.button>
            ))}
          </div>

          {/* Social Icons & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <ThemeToggle />
            </motion.div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={openLinkedIn}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-white/40 hover:text-[#a8d500] transition-colors duration-300 p-2 hover:bg-[#a8d500]/10 rounded-lg"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={openEmail}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-white/40 hover:text-[#a8d500] transition-colors duration-300 p-2 hover:bg-[#a8d500]/10 rounded-lg"
              aria-label="Email"
            >
              <Mail size={18} />
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={openPhone}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-white/40 hover:text-[#a8d500] transition-colors duration-300 p-2 hover:bg-[#a8d500]/10 rounded-lg"
              aria-label="Phone"
            >
              <Phone size={18} />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#a8d500]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-6"
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-3 text-[#a8d500] hover:text-white transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
            <div className="flex gap-4 mt-4 items-center">
              <ThemeToggle />
              <button
                onClick={openLinkedIn}
                className="text-[#a8d500] hover:text-white transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </button>
              <button
                onClick={openEmail}
                className="text-[#a8d500] hover:text-white transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </button>
              <button
                onClick={openPhone}
                className="text-[#a8d500] hover:text-white transition-colors duration-300"
                aria-label="Phone"
              >
                <Phone size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
