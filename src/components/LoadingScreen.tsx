import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const name = "TANYA";

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 400);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#050505] flex items-center justify-center"
        >
          {/* Grid lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[25, 50, 75].map((pos) => (
              <motion.div
                key={pos}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: pos * 0.005 }}
                className="absolute top-0 bottom-0 w-[1px] origin-top bg-white/[0.03]"
                style={{ left: `${pos}%` }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Animated name letters */}
            <div className="flex overflow-hidden mb-12">
              {name.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="text-6xl md:text-8xl font-black text-white"
                  style={{ letterSpacing: '0.15em' }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-48 md:w-64">
              <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#a8d500]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <div className="flex justify-between mt-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                  Loading
                </span>
                <span className="text-[10px] font-mono text-[#a8d500]">
                  {progress}%
                </span>
              </div>
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/5" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-[#a8d500]/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
