import { motion, useScroll, useTransform } from "motion/react";
import { Linkedin, Mail, Github, ArrowUp, Phone } from "lucide-react";
import { useRef } from "react";
import type { PortfolioPath } from "./PortfolioFork";

interface FooterProps {
  path: PortfolioPath;
}

export function Footer({ path }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const links = path === "tech"
    ? [
        { label: "About", href: "#about" },
        { label: "Education", href: "#coursework" },
        { label: "Work", href: "#projects" },
        { label: "Experience", href: "#experience" },
      ]
    : [
        { label: "Gallery", href: "#gallery" },
        { label: "My Journey", href: "#journey" },
        { label: "Research", href: "#research" },
        { label: "Impact", href: "#impact" },
      ];

  const socials = [
    { icon: Github, href: "https://github.com/tanyachisepo", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/tanyaradzwa-chisepo/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:tanyachisepo04@gmail.com", label: "Email" },
    { icon: Phone, href: "tel:+13864044609", label: "Phone" },
  ];

  return (
    <footer ref={footerRef} className="relative overflow-hidden" style={{ backgroundColor: "#0f0b16" }}>
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#a8d500]/40 to-transparent" />

      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <motion.span
          style={{ y, fontSize: 'clamp(100px, 20vw, 300px)', letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.02)' }}
          className="font-black whitespace-nowrap"
        >
          LET'S CONNECT
        </motion.span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-20">
        {/* Main footer content */}
        <motion.div style={{ opacity }} className="grid md:grid-cols-12 gap-12 mb-16">
          {/* Left - Brand & CTA */}
          <div className="md:col-span-5">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white mb-4"
            >
              Let's build
              <br />
              <motion.span
                className="text-[#a8d500] inline-block"
                whileHover={{
                  textShadow: "0 0 30px rgba(168, 213, 0, 0.5)",
                  scale: 1.02
                }}
              >
                something great.
              </motion.span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-white/40 text-sm leading-relaxed mb-6 max-w-md"
            >
              Open to full-time opportunities, collaborations, and exciting projects.
              Let's create impactful digital experiences together.
            </motion.p>
            <motion.a
              href="mailto:tanyachisepo04@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#a8d500",
                boxShadow: "0 0 40px rgba(168, 213, 0, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#a8d500]/10 border border-[#a8d500]/30 rounded-full text-[#a8d500] hover:text-black transition-all duration-300"
            >
              <Mail size={16} />
              Get in touch
            </motion.a>
          </div>

          {/* Middle - Quick Links */}
          <div className="md:col-span-3 md:col-start-7">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4"
            >
              Quick Links
            </motion.p>
            <ul className="space-y-3">
              {links.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-[#a8d500] transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right - Socials */}
          <div className="md:col-span-3">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4"
            >
              Connect
            </motion.p>
            <div className="flex flex-wrap gap-3">
              {socials.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? "_blank" : undefined}
                  rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.15,
                    y: -3,
                    backgroundColor: "rgba(168, 213, 0, 0.15)",
                    borderColor: "rgba(168, 213, 0, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-11 h-11 rounded-full border border-white/10 text-white/40 hover:text-[#a8d500] transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/30 text-xs"
            >
              © {new Date().getFullYear()} Tanya Chisepo. Crafted with precision.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/20 text-xs font-mono"
            >
              {"</portfolio>"}
            </motion.p>

            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, y: -3, color: "#a8d500" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-white/30 hover:text-[#a8d500] transition-all duration-300 text-xs px-3 py-2 rounded-full hover:bg-[#a8d500]/10"
            >
              Back to top
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowUp size={14} />
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute bottom-8 left-6 lg:left-16 w-12 h-12 border-l border-b border-[#a8d500]/20" />
      <div className="absolute bottom-8 right-6 lg:right-16 w-12 h-12 border-r border-b border-white/5" />
    </footer>
  );
}
