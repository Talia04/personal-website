import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bug, Trophy, Target, Clock, Zap, RefreshCw, Play } from "lucide-react";
import { Button } from "./ui/button";

interface BugType {
  id: number;
  position: number;
  isVisible: boolean;
  emoji: string;
  points: number;
  speed: number;
}

const BUG_EMOJIS = [
  { emoji: "🐛", points: 10, speed: 1000 },  // Regular bug - easy
  { emoji: "🐞", points: 15, speed: 800 },   // Ladybug - medium
  { emoji: "🦗", points: 20, speed: 600 },   // Cricket - fast
  { emoji: "🕷️", points: 25, speed: 500 },   // Spider - very fast
  { emoji: "🦟", points: 30, speed: 400 },   // Mosquito - super fast
];

const GAME_DURATION = 30; // 30 seconds
const GRID_SIZE = 9; // 3x3 grid

export function BugSmasher() {
  const [bugs, setBugs] = useState<BugType[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [highScore, setHighScore] = useState<number | null>(null);
  const bugIdRef = useRef(0);

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bugSmasherHighScore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // Game timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  // Spawn bugs during gameplay
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const spawnBug = () => {
      const randomBugType = BUG_EMOJIS[Math.floor(Math.random() * BUG_EMOJIS.length)];
      const availablePositions = Array.from({ length: GRID_SIZE }, (_, i) => i).filter(
        (pos) => !bugs.some((bug) => bug.position === pos && bug.isVisible)
      );

      if (availablePositions.length === 0) return;

      const position = availablePositions[Math.floor(Math.random() * availablePositions.length)];
      const newBug: BugType = {
        id: bugIdRef.current++,
        position,
        isVisible: true,
        emoji: randomBugType.emoji,
        points: randomBugType.points,
        speed: randomBugType.speed,
      };

      setBugs((prev) => [...prev, newBug]);

      // Auto-hide bug after its speed duration
      setTimeout(() => {
        setBugs((prev) =>
          prev.map((bug) =>
            bug.id === newBug.id ? { ...bug, isVisible: false } : bug
          )
        );
        // Reset combo if bug escapes
        setCombo(0);
      }, randomBugType.speed);
    };

    // Spawn bugs at varying intervals (faster as time goes on)
    const difficulty = Math.max(400, 1000 - (GAME_DURATION - timeLeft) * 20);
    const interval = setInterval(spawnBug, difficulty);

    return () => clearInterval(interval);
  }, [isPlaying, bugs, timeLeft, isGameOver]);

  const startGame = () => {
    setBugs([]);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setIsPlaying(true);
    setIsGameOver(false);
    setClicks(0);
    setAccuracy(100);
    setCombo(0);
    setMaxCombo(0);
    bugIdRef.current = 0;
  };

  const endGame = () => {
    setIsPlaying(false);
    setIsGameOver(true);

    // Save high score
    if (highScore === null || score > highScore) {
      setHighScore(score);
      localStorage.setItem("bugSmasherHighScore", score.toString());
    }
  };

  const handleBugClick = (bugId: number) => {
    const bug = bugs.find((b) => b.id === bugId && b.isVisible);
    if (!bug) {
      // Missed click
      setClicks((prev) => prev + 1);
      setCombo(0);
      return;
    }

    // Successful hit
    setScore((prev) => prev + bug.points + combo * 5); // Bonus points for combo
    setClicks((prev) => prev + 1);
    setCombo((prev) => prev + 1);
    setMaxCombo((prev) => Math.max(prev, combo + 1));

    // Remove the bug
    setBugs((prev) => prev.filter((b) => b.id !== bugId));

    // Update accuracy
    setTimeout(() => {
      setAccuracy(Math.round((score / Math.max(1, clicks)) * 100));
    }, 10);
  };

  const handleMissClick = () => {
    if (!isPlaying) return;
    setClicks((prev) => prev + 1);
    setCombo(0);
  };

  return (
    <div className="space-y-8">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { icon: Trophy, label: "Score", value: score, color: "#ff6b6b" },
          { icon: Clock, label: "Time", value: `${timeLeft}s`, color: "#00d4ff" },
          { icon: Zap, label: "Combo", value: combo > 0 ? `${combo}x` : "-", color: "#c084fc" },
          { icon: Target, label: "Clicks", value: clicks, color: "#a8d500" },
          { icon: Trophy, label: "Best", value: highScore ?? "-", color: "#ff9f43", span: true },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`relative p-4 rounded-2xl border border-white/5 bg-white/[0.02] text-center overflow-hidden ${stat.span ? 'col-span-2 sm:col-span-1' : ''}`}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ backgroundColor: stat.color + '40' }}
            />
            <div className="flex items-center justify-center gap-2 mb-2">
              <stat.icon size={14} style={{ color: stat.color }} />
              <p className="text-white/40 text-[10px] uppercase tracking-wider">{stat.label}</p>
            </div>
            <p className="text-white text-xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Combo Indicator */}
      <AnimatePresence>
        {combo > 2 && isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 rounded-xl border border-[#c084fc]/30 bg-[#c084fc]/10 text-center"
          >
            <p className="text-[#c084fc] font-bold text-sm">
              🔥 COMBO x{combo}! +{combo * 5} Bonus Points!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Board */}
      <div className="max-w-lg mx-auto">
        {!isPlaying && !isGameOver ? (
          // Start Screen
          <div className="p-10 rounded-2xl border border-[#ff6b6b]/20 bg-[#ff6b6b]/5 text-center space-y-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 rounded-full bg-[#ff6b6b]/10 flex items-center justify-center mx-auto"
            >
              <Bug className="text-[#ff6b6b]" size={40} />
            </motion.div>

            <div>
              <h4 className="text-white text-xl font-bold mb-2">Ready to Smash Bugs?</h4>
              <p className="text-white/40 text-sm">
                Click bugs before they escape! Faster bugs = more points!
              </p>
            </div>

            <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto">
              {BUG_EMOJIS.map((bug, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl mb-1">{bug.emoji}</div>
                  <div className="text-[10px] text-white/30">{bug.points}pt</div>
                </div>
              ))}
            </div>

            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff6b6b] text-white font-semibold hover:bg-[#ff7b7b] transition-colors"
            >
              <Play size={18} />
              Start Game
            </button>
          </div>
        ) : isGameOver ? (
          // Game Over Screen
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-2xl border border-[#ff6b6b]/30 bg-[#ff6b6b]/5 text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="w-20 h-20 rounded-full bg-[#ff6b6b]/10 flex items-center justify-center mx-auto"
            >
              <Trophy className="text-[#ff6b6b]" size={40} />
            </motion.div>

            <div>
              <h3 className="text-white text-2xl font-bold mb-2">Game Over!</h3>
              <p className="text-white/40 text-sm">
                {score >= 500
                  ? "Incredible! You're a bug exterminator! 🔥"
                  : score >= 350
                    ? "Great reflexes, debug master! ⚡"
                    : score >= 200
                      ? "Nice hunting skills! 💪"
                      : "Keep practicing, you'll get better! 🎯"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-[#ff6b6b] text-3xl font-black">{score}</p>
                <p className="text-white/30 text-xs uppercase tracking-wider">Score</p>
                {highScore !== null && score >= highScore && (
                  <p className="text-[#a8d500] text-[10px] mt-1">New Record!</p>
                )}
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-[#c084fc] text-3xl font-black">{maxCombo}x</p>
                <p className="text-white/30 text-xs uppercase tracking-wider">Max Combo</p>
              </div>
            </div>

            <button
              onClick={startGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff6b6b] text-white font-semibold hover:bg-[#ff7b7b] transition-colors"
            >
              <RefreshCw size={18} />
              Play Again
            </button>
          </motion.div>
        ) : (
          // Active Game Board
          <div
            className="p-4 rounded-2xl border border-[#ff6b6b]/20 bg-black/30"
            onClick={handleMissClick}
          >
            <div className="grid grid-cols-3 gap-3 aspect-square">
              {Array.from({ length: GRID_SIZE }).map((_, index) => {
                const bug = bugs.find(
                  (b) => b.position === index && b.isVisible
                );
                return (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center cursor-crosshair"
                  >
                    <AnimatePresence>
                      {bug && (
                        <motion.button
                          key={bug.id}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ duration: 0.2 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBugClick(bug.id);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl"
                        >
                          {bug.emoji}
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Time Warning */}
      {isPlaying && !isGameOver && timeLeft <= 10 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-center"
        >
          <p className="text-red-400 font-bold text-sm">
            ⏰ Only {timeLeft} seconds left!
          </p>
        </motion.div>
      )}

      {/* Instructions / Reset */}
      {!isGameOver && (
        <div className="flex items-center justify-between">
          <p className="text-white/30 text-xs">
            {!isPlaying ? "Click Start to begin" : "Build combos for bonus points!"}
          </p>
        </div>
      )}
    </div>
  );
}
