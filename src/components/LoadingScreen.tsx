import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showName, setShowName] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Minimum 3 seconds loading
  useEffect(() => {
    // Show name after brief intro
    const nameTimer = setTimeout(() => setShowName(true), 400);

    // Progress animation over 3 seconds
    const startTime = Date.now();
    const duration = 3000;

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 800);
        }, 400);
      }
    }, 30);

    return () => {
      clearTimeout(nameTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(40px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-[#050505]/99"
          />

          {/* Single subtle gradient orb */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.2, 0.15],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[600px] h-[600px] bg-[#a8d500]/20 rounded-full blur-[150px]"
          />

          {/* Main content - centered and clean */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">

            {/* Name section */}
            <div className="relative mb-8">
              <div className="flex items-baseline justify-center">
                {/* Main name - lowercase, smooth */}
                {"tanya".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 60, opacity: 0 }}
                    animate={showName ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.08,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className={`text-6xl md:text-8xl font-bold inline-block ${letter === 'a' && i === 1 ? 'text-[#a8d500]' : 'text-white'
                      }`}
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}

                {/* Blinking cursor */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={showName ? { opacity: cursorVisible ? 1 : 0 } : {}}
                  transition={{ delay: 0.5 }}
                  className="text-6xl md:text-8xl font-light text-[#a8d500] ml-1"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  _
                </motion.span>
              </div>

              {/* Underline accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={showName ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#a8d500] via-[#a8d500]/50 to-transparent origin-left rounded-full"
              />
            </div>

            {/* Tagline with code syntax */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={showName ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-sm md:text-base text-white/40 tracking-wide font-light mb-12"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              <span className="text-[#a8d500]">{'<'}</span>
              software engineer
              <span className="text-[#a8d500]">{' />'}</span>
            </motion.p>

            {/* Progress bar - minimal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-48 md:w-64"
            >
              <div className="relative h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#a8d500] rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="text-[10px] text-white/30 font-mono">
                  loading
                </span>
                <span className="text-xs font-mono text-[#a8d500] tabular-nums">
                  {progress}%
                </span>
              </div>
            </motion.div>
          </div>

          {/* Minimal corner accents */}
          <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-white/10 rounded-tl" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-[#a8d500]/20 rounded-br" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
