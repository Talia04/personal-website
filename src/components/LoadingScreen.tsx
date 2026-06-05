import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import "./LoadingScreen.css";

interface LoadingScreenProps {
  onComplete: () => void;
}

const duration = 4000;
const titles = ["Developer", "Builder", "Product Thinker", "Educator", "Founder"];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [elapsed, setElapsed] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const startTime = Date.now();
    const interval = window.setInterval(() => {
      const nextElapsed = Math.min(Date.now() - startTime, duration);
      setElapsed(nextElapsed);

      if (nextElapsed >= duration) {
        window.clearInterval(interval);
        onCompleteRef.current();
      }
    }, 40);

    return () => window.clearInterval(interval);
  }, []);

  const progress = Math.min(100, Math.round((elapsed / duration) * 100));
  const activeTitle = titles[Math.min(titles.length - 1, Math.floor(elapsed / 760))];

  return (
    <motion.div
      className="loading-screen-dark loading-simple-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="loading-simple-glow" />
      <div className="loading-simple-noise" />

      <motion.main
        className="loading-simple-content"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="loading-simple-mark"
          animate={{ opacity: [0.78, 1, 0.78], scale: [1, 1.035, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          TC
        </motion.div>

        <p className="loading-simple-kicker">Portfolio V2</p>
        <h1>Tanya Chisepo</h1>

        <motion.p
          key={activeTitle}
          className="loading-simple-title"
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.28 }}
        >
          {activeTitle}
        </motion.p>

        <div className="loading-simple-progress" aria-label={`Loading ${progress}%`}>
          <div className="loading-simple-progress-track">
            <motion.div
              className="loading-simple-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="loading-simple-progress-meta">
            <span>Loading</span>
            <span>{progress}%</span>
          </div>
        </div>
      </motion.main>
    </motion.div>
  );
}
