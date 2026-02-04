import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [phase, setPhase] = useState<'intro' | 'name' | 'tagline' | 'complete'>('intro');

  const name = "TANYA";
  const tagline = "SOFTWARE ENGINEER";

  // Minimum 3.5 seconds loading with phased animations
  useEffect(() => {
    // Phase 1: Intro animation (0-1s)
    const introTimer = setTimeout(() => setPhase('name'), 500);

    // Phase 2: Name reveal (1-2s)
    const nameTimer = setTimeout(() => setPhase('tagline'), 1500);

    // Phase 3: Tagline (2-3s)
    const taglineTimer = setTimeout(() => setPhase('complete'), 2800);

    // Progress animation over 3.5 seconds
    const startTime = Date.now();
    const duration = 3500;

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 600);
        }, 400);
      }
    }, 30);

    return () => {
      clearTimeout(introTimer);
      clearTimeout(nameTimer);
      clearTimeout(taglineTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop blur layer */}
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(20px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-[#050505]/95"
          />

          {/* Animated gradient orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#a8d500]/20 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00d4ff]/10 rounded-full blur-[100px]"
            />
            <motion.div
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-[#c084fc]/10 rounded-full blur-[80px]"
            />
          </div>

          {/* Animated grid pattern */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Vertical lines with staggered animation */}
            {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((pos, i) => (
              <motion.div
                key={`v-${pos}`}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.03 }}
                transition={{ duration: 1.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 bottom-0 w-[1px] origin-top bg-white"
                style={{ left: `${pos}%` }}
              />
            ))}
            {/* Horizontal lines */}
            {[20, 40, 60, 80].map((pos, i) => (
              <motion.div
                key={`h-${pos}`}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.02 }}
                transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 right-0 h-[1px] origin-left bg-white"
                style={{ top: `${pos}%` }}
              />
            ))}
          </div>

          {/* Rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px]"
          >
            <div className="w-full h-full border border-white/[0.03] rounded-full" />
            {/* Accent dots on ring */}
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#a8d500] rounded-full"
            />
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#00d4ff] rounded-full"
            />
          </motion.div>

          {/* Second rotating ring (opposite direction) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px]"
          >
            <div className="w-full h-full border border-[#a8d500]/10 rounded-full" />
          </motion.div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">

            {/* Pre-loader dot animation */}
            <AnimatePresence>
              {phase === 'intro' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.5, 1] }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(168, 213, 0, 0.4)",
                        "0 0 0 30px rgba(168, 213, 0, 0)",
                      ]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-4 h-4 bg-[#a8d500] rounded-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Animated name letters with glitch effect */}
            <div className="relative mb-4 overflow-hidden">
              <div className="flex">
                {name.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 120, opacity: 0, rotateX: -90 }}
                    animate={phase !== 'intro' ? {
                      y: 0,
                      opacity: 1,
                      rotateX: 0,
                    } : {}}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="text-7xl md:text-9xl font-black text-white inline-block"
                    style={{
                      letterSpacing: '0.08em',
                      textShadow: phase === 'complete' ? '0 0 40px rgba(168, 213, 0, 0.3)' : 'none',
                      transformOrigin: 'bottom'
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Glitch overlay effect */}
              <motion.div
                animate={phase !== 'intro' ? {
                  x: [-2, 2, -2, 0],
                  opacity: [0, 0.8, 0],
                } : {}}
                transition={{ duration: 0.3, delay: 0.8, times: [0, 0.5, 0.8, 1] }}
                className="absolute inset-0 flex"
                style={{ clipPath: 'inset(40% 0 40% 0)' }}
              >
                {name.split("").map((letter, i) => (
                  <span
                    key={`glitch-${i}`}
                    className="text-7xl md:text-9xl font-black text-[#a8d500] inline-block"
                    style={{ letterSpacing: '0.08em' }}
                  >
                    {letter}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Tagline with typewriter effect */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={phase === 'tagline' || phase === 'complete' ? {
                opacity: 1,
                width: 'auto'
              } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mb-12"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={phase === 'tagline' || phase === 'complete' ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#a8d500] whitespace-nowrap"
              >
                {tagline.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={phase === 'tagline' || phase === 'complete' ? { opacity: 1 } : {}}
                    transition={{ duration: 0.05, delay: 0.3 + i * 0.03 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>

            {/* Progress section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-64 md:w-80"
            >
              {/* Progress bar container */}
              <div className="relative h-[2px] bg-white/10 rounded-full overflow-hidden">
                {/* Animated shimmer */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                {/* Progress fill */}
                <motion.div
                  className="h-full bg-gradient-to-r from-[#a8d500] to-[#c4ff00]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

              {/* Progress info */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-[#a8d500] rounded-full"
                  />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                    Initializing
                  </span>
                </div>
                <motion.span
                  className="text-sm font-mono text-[#a8d500] tabular-nums"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {progress}%
                </motion.span>
              </div>
            </motion.div>
          </div>

          {/* Corner accents with animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-8 left-8"
          >
            <div className="w-16 h-16 border-l-2 border-t-2 border-white/10" />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 left-0 w-2 h-2 bg-white/20"
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-8 right-8"
          >
            <div className="w-16 h-16 border-r-2 border-t-2 border-white/5" />
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-8 left-8"
          >
            <div className="w-16 h-16 border-l-2 border-b-2 border-white/5" />
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-8 right-8"
          >
            <div className="w-16 h-16 border-r-2 border-b-2 border-[#a8d500]/30" />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute bottom-0 right-0 w-2 h-2 bg-[#a8d500]/50"
            />
          </motion.div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  opacity: 0
                }}
                animate={{
                  y: [null, Math.random() * -200 - 100],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: i % 3 === 0 ? '#a8d500' : i % 3 === 1 ? '#00d4ff' : '#c084fc',
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Version badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <span className="text-[10px] font-mono text-white/20 tracking-wider">
              v2.0 • PORTFOLIO
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
