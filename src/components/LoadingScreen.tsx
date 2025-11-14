import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const lines = [
    "> Initializing portfolio...",
    "> Loading components...",
    "> Compiling experiences...",
    "> Rendering projects...",
    "> Portfolio ready!",
  ];

  const symbols = ["{", "}", "<", ">", "[", "]", "(", ")"];

  useEffect(() => {
    const lineInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev < lines.length - 1) {
          return prev + 1;
        } else {
          clearInterval(lineInterval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 500);
          }, 800);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(lineInterval);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-[#0d0d0d] flex items-center justify-center"
        >
          {/* Animated background symbols */}
          <div className="absolute inset-0 overflow-hidden">
            {symbols.map((symbol, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  x: Math.random() * window.innerWidth,
                  y: -50,
                }}
                animate={{
                  opacity: [0, 0.3, 0],
                  y: window.innerHeight + 50,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear",
                }}
                className="absolute text-[#a8d500]/20 text-4xl"
                style={{
                  left: `${Math.random() * 100}%`,
                }}
              >
                {symbol}
              </motion.div>
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 max-w-2xl w-full px-6">
            {/* Terminal-style container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl border border-[#a8d500]/20 p-8 shadow-2xl"
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#a8d500]/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-white/40 text-sm ml-4">terminal</span>
              </div>

              {/* Command lines */}
              <div className="space-y-3 font-mono text-sm">
                {lines.slice(0, currentLine + 1).map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-[#a8d500]">{line}</span>
                    {index === currentLine && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="inline-block w-2 h-4 bg-[#a8d500]"
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-8 h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#a8d500]/20">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${((currentLine + 1) / lines.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#a8d500] to-[#c4ff00]"
                />
              </div>
            </motion.div>

            {/* Floating programming symbols */}
            <div className="absolute inset-0 pointer-events-none">
              {["{}", "<>", "[]", "()"].map((pair, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 1],
                    y: [-20, -60],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeOut",
                  }}
                  className="absolute text-[#a8d500] text-6xl"
                  style={{
                    left: `${20 + index * 20}%`,
                    top: "50%",
                  }}
                >
                  <div className="bg-[#1a1a1a] border-2 border-[#a8d500]/30 rounded-2xl w-20 h-20 flex items-center justify-center shadow-lg">
                    {pair}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
