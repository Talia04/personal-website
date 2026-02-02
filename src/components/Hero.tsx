import { motion } from "motion/react";
import { ArrowDownRight, Github, Linkedin, Mail } from "lucide-react";
import { ResumeDownload } from "./ResumeDownload";

export function Hero() {
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen relative bg-[#0a0a0a] overflow-hidden">
      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.02 }}
          transition={{ duration: 2 }}
          className="text-white whitespace-nowrap"
          style={{
            fontSize: "clamp(200px, 30vw, 500px)",
            fontWeight: 900,
            letterSpacing: "-0.05em",
          }}
        >
          TANYA
        </motion.span>
      </div>

      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top section with location */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-32 px-8 md:px-16 lg:px-24"
        >
          <div className="flex items-center gap-3 text-white/40 text-sm">
            <span className="w-2 h-2 rounded-full bg-[#a8d500] animate-pulse" />
            <span>Based in Florida, USA</span>
          </div>
        </motion.div>

        {/* Center content */}
        <div className="flex-1 flex items-center px-8 md:px-16 lg:px-24 py-16">
          <div className="w-full max-w-6xl">
            {/* Name and title row */}
            <div className="space-y-4 mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-white font-bold tracking-tight leading-[1.1]"
                style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
              >
                Tanya Chisepo
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-4 text-lg md:text-xl"
              >
                <span className="text-[#a8d500] font-medium">Software Engineer</span>
                <span className="text-white/20">•</span>
                <span className="text-white/60">3× Meta Intern</span>
                <span className="text-white/20">•</span>
                <span className="text-white/60">BCU '26</span>
              </motion.div>
            </div>

            {/* Description and CTA grid */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-end">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-white/50 text-lg leading-relaxed max-w-md"
              >
                I build products that matter. Currently studying Computer Science
                and crafting experiences across mobile and web platforms.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-wrap gap-4">
                  <ResumeDownload />
                  <motion.button
                    onClick={scrollToAbout}
                    whileHover={{ gap: "12px" }}
                    className="group flex items-center gap-2 text-white/70 hover:text-[#a8d500] transition-colors duration-300"
                  >
                    <span>Explore my work</span>
                    <ArrowDownRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="px-8 md:px-16 lg:px-24 pb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-white/5">
            {/* Social links */}
            <div className="flex items-center gap-6">
              {[
                { icon: Github, href: "https://github.com/tanyachisepo", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/tanyachisepo", label: "LinkedIn" },
                { icon: Mail, href: "mailto:tanyachisepo04@gmail.com", label: "Email" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="text-white/30 hover:text-[#a8d500] transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={20} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>

            {/* Email */}
            <a
              href="mailto:tanyachisepo04@gmail.com"
              className="text-white/30 hover:text-white/60 text-sm transition-colors duration-300"
            >
              tanyachisepo04@gmail.com
            </a>

            {/* Scroll indicator */}
            <motion.button
              onClick={scrollToAbout}
              className="hidden md:flex items-center gap-3 text-white/30 hover:text-[#a8d500] transition-colors duration-300"
            >
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDownRight size={14} />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#a8d500]/30 to-transparent origin-left"
      />
    </section>
  );
}