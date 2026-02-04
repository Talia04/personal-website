import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Mail, Linkedin, Github, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const contacts = [
    {
      icon: Mail,
      label: "Email",
      value: "tanyachisepo04@gmail.com",
      href: "mailto:tanyachisepo04@gmail.com",
      color: "#a8d500",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/tanyaradzwa-chisepo",
      href: "https://www.linkedin.com/in/tanyaradzwa-chisepo/",
      color: "#00d4ff",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "@tanyachisepo",
      href: "https://github.com/tanyachisepo",
      color: "#c084fc",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (386) 404-4609",
      href: "tel:+13864044609",
      color: "#ff6b6b",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Open email client with pre-filled info
    const subject = `Portfolio Contact from ${formState.name}`;
    const body = `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`;
    window.location.href = `mailto:tanyachisepo04@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setFormState({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen bg-[#050505] overflow-hidden py-32"
    >
      {/* Large backdrop text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span
          style={{ y: y1, fontSize: 'clamp(120px, 25vw, 400px)', letterSpacing: '-0.02em' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.02 }}
          transition={{ duration: 1.5 }}
          className="font-black text-white whitespace-nowrap"
        >
          CONNECT
        </motion.span>
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[25, 50, 75].map((pos) => (
          <div
            key={pos}
            className="absolute top-0 bottom-0 w-[1px] bg-white/[0.03]"
            style={{ left: `${pos}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#a8d500]">
            008 — Contact
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Contact info */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]"
            >
              Let's create
              <br />
              <span className="text-[#a8d500]">together.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/40 text-base leading-relaxed mb-12 max-w-md"
            >
              I'm always interested in hearing about new opportunities,
              collaborations, or just connecting with fellow creators.
              Don't hesitate to reach out!
            </motion.p>

            {/* Contact cards */}
            <div className="space-y-4">
              {contacts.map((contact, i) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? "_blank" : undefined}
                  rel={contact.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="group flex items-center gap-4 p-4 rounded-2xl border border-white/5 hover:border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300"
                    style={{
                      backgroundColor: `${contact.color}10`,
                      borderColor: `${contact.color}20`,
                    }}
                  >
                    <contact.icon
                      size={20}
                      style={{ color: contact.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">
                      {contact.label}
                    </p>
                    <p className="text-white/80 text-sm group-hover:text-white transition-colors">
                      {contact.value}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-white/20 group-hover:text-white/60 transition-colors"
                  />
                </motion.a>
              ))}
            </div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 flex items-center gap-2 text-white/30"
            >
              <MapPin size={14} />
              <span className="text-xs">Florida, USA • Open to remote</span>
            </motion.div>
          </div>

          {/* Right - Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#a8d500]/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#a8d500]/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/30 block mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#a8d500]/50 transition-colors resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-[#a8d500] hover:bg-[#b8e510] text-black font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Opening email..."
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>

              <p className="text-center text-white/20 text-xs">
                This will open your email client with the message pre-filled
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute bottom-8 left-6 lg:left-16 w-12 h-12 border-l border-b border-[#a8d500]/20" />
      <div className="absolute top-32 right-6 lg:right-16 w-12 h-12 border-r border-t border-white/5" />
    </section>
  );
}
