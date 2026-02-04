import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { ResumeDownload } from "./ResumeDownload";
import { useEffect, useRef, useState } from "react";

// Letter animation component for theatrical name reveal
const AnimatedLetter = ({
  letter,
  index,
  color = "white",
  className = ""
}: {
  letter: string;
  index: number;
  color?: "white" | "lime";
  className?: string;
}) => {
  return (
    <motion.span
      initial={{ y: 120, opacity: 0, rotateX: -90 }}
      animate={{ y: 0, opacity: 1, rotateX: 0 }}
      whileHover={{
        scale: 1.05,
        textShadow: color === "lime"
          ? "0 0 40px rgba(168, 213, 0, 0.6)"
          : "0 0 40px rgba(255, 255, 255, 0.3)"
      }}
      transition={{
        duration: 1.2,
        delay: 0.3 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`inline-block cursor-default ${className}`}
      style={{
        transformOrigin: "bottom",
        color: color === "lime" ? "#a8d500" : "white",
      }}
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  );
};

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Parallax transforms for different layers
  const layer1X = useTransform(x, [-500, 500], [30, -30]);
  const layer1Y = useTransform(y, [-500, 500], [15, -15]);
  const layer2X = useTransform(x, [-500, 500], [-20, 20]);
  const layer2Y = useTransform(y, [-500, 500], [-10, 10]);
  const glowX = useTransform(x, [-500, 500], [-50, 50]);
  const glowY = useTransform(y, [-500, 500], [-50, 50]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/New_York'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  const firstName = "TANYA";
  const lastName = "CHISEPO";

  const marqueeItems = [
    "SOFTWARE ENGINEER",
    "•",
    "CREATIVE TECHNOLOGIST",
    "•",
    "PRODUCT BUILDER",
    "•",
    "3× META INTERN",
    "•",
  ];

  return (
    <section
      ref={containerRef}
      className="min-h-screen relative bg-[#050505] overflow-hidden cursor-default"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Mouse-following glow */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 0.15 : 0.08 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-full bg-[#a8d500] blur-[150px]" />
      </motion.div>

      {/* Vertical lines - editorial grid */}
      <div className="absolute inset-0 pointer-events-none">
        {[20, 40, 60, 80].map((pos) => (
          <motion.div
            key={pos}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, delay: 0.5 + pos * 0.01, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 bottom-0 w-[1px] origin-top"
            style={{
              left: `${pos}%`,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)'
            }}
          />
        ))}
      </div>

      {/* Main content - split into name display and info */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Top navigation bar */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 lg:px-16 pt-8"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[#a8d500]"
              />
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#a8d500]">Available for work</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Florida, USA</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono">{currentTime} EST</span>
            </div>
          </div>
        </motion.header>

        {/* Giant name - Colin Moy style with letter spacing */}
        <div className="flex-1 flex flex-col justify-center items-center relative px-4">

          {/* First name row */}
          <motion.div
            style={{ x: layer1X, y: layer1Y }}
            className="relative"
          >
            {/* Decorative bracket */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 text-[#a8d500]/30 text-4xl md:text-6xl font-light"
            >
              [
            </motion.span>
            <h1 className="flex justify-center overflow-hidden hero-name">
              {firstName.split("").map((letter, i) => (
                <AnimatedLetter
                  key={i}
                  letter={letter}
                  index={i}
                  color="white"
                  className="font-black"
                />
              ))}
            </h1>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 text-[#a8d500]/30 text-4xl md:text-6xl font-light"
            >
              ]
            </motion.span>
          </motion.div>

          {/* Marquee row - sandwiched between names */}
          <div className="w-full overflow-hidden py-6 md:py-10 relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex"
            >
              <motion.div
                animate={{ x: [0, -1920] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="flex shrink-0"
              >
                {[...Array(3)].map((_, setIndex) => (
                  <div key={setIndex} className="flex items-center">
                    {marqueeItems.map((item, i) => (
                      <span
                        key={i}
                        className={`mx-4 md:mx-8 whitespace-nowrap text-sm md:text-base tracking-[0.2em] ${item === "•"
                          ? "text-[#a8d500]"
                          : "text-white/40"
                          }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ))}
              </motion.div>
              <motion.div
                animate={{ x: [0, -1920] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="flex shrink-0"
              >
                {[...Array(3)].map((_, setIndex) => (
                  <div key={setIndex} className="flex items-center">
                    {marqueeItems.map((item, i) => (
                      <span
                        key={i}
                        className={`mx-4 md:mx-8 whitespace-nowrap text-sm md:text-base tracking-[0.2em] ${item === "•"
                          ? "text-[#a8d500]"
                          : "text-white/40"
                          }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Gradient masks for marquee */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />
          </div>

          {/* Last name row - LIME GREEN FILL */}
          <motion.div
            style={{ x: layer2X, y: layer2Y }}
            className="relative"
          >
            <h1 className="flex justify-center overflow-hidden hero-name hero-name-lime">
              {lastName.split("").map((letter, i) => (
                <AnimatedLetter
                  key={i}
                  letter={letter}
                  index={i + firstName.length}
                  color="lime"
                  className="font-black"
                />
              ))}
            </h1>
          </motion.div>

          {/* Shared styles for hero names */}
          <style>{`
            .hero-name span {
              font-size: clamp(4rem, 18vw, 14rem);
              letter-spacing: 0.15em;
              line-height: 1;
              transition: text-shadow 0.3s ease;
            }
          `}</style>

        </div>

        {/* Bottom section - info and CTAs */}
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="px-6 md:px-12 lg:px-16 pb-8 md:pb-12"
        >
          {/* Gradient divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] mb-8 origin-left"
            style={{
              background: 'linear-gradient(90deg, #a8d500 0%, rgba(168, 213, 0, 0.3) 30%, transparent 100%)'
            }}
          />

          <div className="grid md:grid-cols-12 gap-8 items-end">

            {/* Left - Stats (more theatrical) */}
            <div className="md:col-span-3 lg:col-span-3 hidden md:block">
              <div className="space-y-4">
                {[
                  { value: "3×", label: "Meta Intern" },
                  { value: "10+", label: "Projects" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 + i * 0.15 }}
                    className="group flex items-baseline gap-3"
                  >
                    <span className="text-3xl md:text-4xl font-black text-[#a8d500] group-hover:text-white transition-colors duration-300">
                      {stat.value}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Center - Bio text */}
            <div className="md:col-span-5 lg:col-span-5">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-white/50 text-sm md:text-base leading-relaxed mb-6"
              >
                I build products that matter — crafting digital experiences across
                mobile and web with obsessive attention to detail. Currently
                pursuing CS at Bethune-Cookman University.
              </motion.p>

              <div className="flex flex-wrap gap-3">
                <ResumeDownload />
                <motion.a
                  href="mailto:tanyachisepo04@gmail.com"
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(168, 213, 0, 0.6)",
                    boxShadow: "0 0 30px rgba(168, 213, 0, 0.15)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 text-sm text-white/60 hover:text-[#a8d500] border border-white/10 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  Let's talk →
                </motion.a>
              </div>
            </div>

            {/* Right - Social + Scroll */}
            <div className="md:col-span-4 lg:col-span-4 flex items-center justify-end gap-6">
              <div className="flex items-center gap-2">
                {[
                  { icon: Github, href: "https://github.com/tanyachisepo", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com/in/tanyachisepo", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:tanyachisepo04@gmail.com", label: "Email" },
                ].map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2 + i * 0.1 }}
                    whileHover={{
                      scale: 1.15,
                      backgroundColor: "rgba(168, 213, 0, 0.15)",
                      borderColor: "rgba(168, 213, 0, 0.3)",
                      y: -3
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center w-11 h-11 text-white/40 hover:text-[#a8d500] rounded-full border border-white/10 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={17} strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>

              <div className="w-[1px] h-8 bg-white/10" />

              <motion.button
                onClick={scrollToAbout}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4 }}
                whileHover={{ scale: 1.1, x: 5 }}
                className="group flex items-center gap-3 text-white/30 hover:text-[#a8d500] transition-colors duration-500"
              >
                <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <ArrowDown size={14} />
                  <motion.div
                    animate={{ opacity: [0, 0.5, 0], y: [0, 8, 16] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <ArrowDown size={14} className="text-[#a8d500]/50" />
                  </motion.div>
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.footer>
      </div>

      {/* Corner accents */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 2.5 }}
        className="absolute bottom-8 left-6 md:left-12 lg:left-16 w-8 h-8 border-l border-b border-[#a8d500]/30"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 2.6 }}
        className="absolute top-24 right-6 md:right-12 lg:right-16 w-8 h-8 border-r border-t border-white/10"
      />
    </section>
  );
}