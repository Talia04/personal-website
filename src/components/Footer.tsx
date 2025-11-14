import { motion } from "motion/react";
import { Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative py-12 px-6 lg:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-[#1a1a1a]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c4ff00]/30 to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-white/60 flex items-center gap-2">
              Built with{" "}
              <Heart className="text-[#c4ff00] fill-[#c4ff00]" size={16} /> by
              Tanya Chisepo
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-6"
          >
            <a
              href="https://www.linkedin.com/in/tanyaradzwa-chisepo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c4ff00] hover:text-white transition-colors duration-300"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:tanyachisepo04@gmail.com"
              className="text-[#c4ff00] hover:text-white transition-colors duration-300"
            >
              <Mail size={24} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-white/60">© 2025 Tanya Chisepo</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-[#c4ff00]/60 text-sm">{"</html>"}</p>
        </motion.div>
      </div>
    </footer>
  );
}
