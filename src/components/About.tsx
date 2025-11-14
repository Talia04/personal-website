import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { GraduationCap, MapPin, Award } from "lucide-react";

// @ts-ignore: allow importing image asset without a type declaration
import bcuLogo from "../assets/bcu-logo.png";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen relative py-24 px-6 lg:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-[#a8d500]/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-[#a8d500] mb-12"
            style={{
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              lineHeight: 0.9,
            }}
          >
            ABOUT ME
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-white/80 mb-8">
              I'm a driven software engineer from Zimbabwe, currently pursuing a
              B.S. in Computer Science at Bethune-Cookman University with a
              perfect 4.0 GPA. With proven experience from three internships at
              Meta, I've worked across web, mobile, and backend development,
              making meaningful impacts on features used by millions.
            </p>
            <p className="text-white/80 mb-8">
              My journey has taken me from building full-stack web applications
              to engineering cross-platform mobile features and optimizing
              backend infrastructure. I'm passionate about creating innovative
              solutions that enhance user experiences and drive measurable
              results.
            </p>
            <p className="text-[#c4ff00]">
              Currently seeking opportunities to leverage my skills in
              cross-platform development and continue driving meaningful
              innovations in tech.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {[
              {
                icon: null,
                logo: bcuLogo,
                title: "Education",
                content: (
                  <div className="flex-1">
                    <h3 className="text-white mb-2">Education</h3>
                    <p className="text-white/60">Bethune-Cookman University</p>
                    <p className="text-[#c4ff00]">B.S., Computer Science</p>
                    <p className="text-white/60">Expected Dec 2025</p>
                  </div>
                ),
              },
              {
                icon: Award,
                title: "GPA",
                content: (
                  <div>
                    <h3 className="text-white mb-2">GPA</h3>
                    <p className="text-[#c4ff00] text-4xl font-black">4.0</p>
                    <p className="text-white/60">Perfect Academic Record</p>
                  </div>
                ),
              },
              {
                icon: MapPin,
                title: "Location",
                content: (
                  <div>
                    <h3 className="text-white mb-2">Location</h3>
                    <p className="text-white/80">Daytona Beach, FL</p>
                    <p className="text-white/60">(386) 383-1436</p>
                    <p className="text-white/60">tanyachisepo04@gmail.com</p>
                  </div>
                ),
              },
            ].map((item, idx) => {
              const cardRef = useRef(null);
              const { scrollYProgress } = useScroll({
                target: cardRef,
                offset: ["start end", "end start"],
              });
              const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.9, 1, 1, 0.95]);
              const cardOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);

              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  ref={cardRef}
                  style={{ scale, opacity: cardOpacity }}
                  className="glass glass-hover p-6 rounded-2xl"
                >
                  <div className="flex items-start gap-4">
                    {item.logo ? (
                      <div className="glass-strong p-3 rounded-xl w-16 h-16 flex items-center justify-center overflow-hidden shrink-0">
                        <img
                          src={item.logo}
                          alt="Bethune-Cookman University logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : Icon ? (
                      <div className="glass-accent p-3 rounded-xl">
                        <Icon className="text-[#c4ff00]" size={24} />
                      </div>
                    ) : null}
                    {item.content}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
