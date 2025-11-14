import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Gamepad2 } from "lucide-react";
import { BugSmasher } from "./BugSmasher";
import { RizzRoastGenerator } from "./RizzRoastGenerator";
import { TypingSpeedTest } from "./TypingSpeedTest";
import { MemoryCardGame } from "./MemoryCardGame";

export function Games() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeTab, setActiveTab] = useState("typing");

  return (
    <section
      ref={ref}
      className="min-h-screen relative py-24 px-6 lg:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d]" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#c4ff00]/5 rounded-full blur-3xl animate-pulse" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <Gamepad2 className="text-[#c4ff00]" size={48} />
            <h2
              className="text-[#c4ff00]"
              style={{
                fontFamily: "'Arial Black', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem, 8vw, 5rem)",
                lineHeight: 0.9,
              }}
            >
              FUN ZONE
            </h2>
          </div>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Take a break and play some games! Test your skills with coding challenges,
            memory games, puzzles, and AI-powered entertainment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Custom Tab Navigation */}
          <div className="w-full max-w-4xl mx-auto mb-8">
            <div className="glass-strong rounded-2xl p-2 inline-flex w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
                {[
                  { id: "typing", label: "⌨️ Typing Test" },
                  { id: "memory", label: "🧠 Memory Game" },
                  { id: "bugsmasher", label: "🐛 Bug Smasher" },
                  { id: "rizzroast", label: "✨ Rizz or Roast" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      relative px-4 py-3 rounded-xl text-xs sm:text-sm
                      transition-all duration-300 ease-out
                      ${
                        activeTab === tab.id
                          ? "text-black"
                          : "text-white/70 hover:text-white"
                      }
                    `}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-[#a8d500] rounded-xl"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "typing" && <TypingSpeedTest />}
            {activeTab === "memory" && <MemoryCardGame />}
            {activeTab === "bugsmasher" && <BugSmasher />}
            {activeTab === "rizzroast" && <RizzRoastGenerator />}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
