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
    <div className="glass-strong p-4 sm:p-6 lg:p-8 rounded-2xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <Bug className="text-[#c4ff00]" size={32} />
            <h3 className="text-white text-xl sm:text-2xl">Bug Smasher</h3>
          </div>
          <p className="text-white/60 text-sm">
            Click the bugs before they escape! Faster bugs = more points!
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          <div className="glass p-3 rounded-xl border border-[#c4ff00]/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Trophy className="text-[#c4ff00]" size={14} />
              <p className="text-white/60 text-xs">Score</p>
            </div>
            <p className="text-white text-lg sm:text-xl">{score}</p>
          </div>
          <div className="glass p-3 rounded-xl border border-blue-500/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Clock className="text-blue-500" size={14} />
              <p className="text-white/60 text-xs">Time</p>
            </div>
            <p className="text-white text-lg sm:text-xl">{timeLeft}s</p>
          </div>
          <div className="glass p-3 rounded-xl border border-pink-500/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Zap className="text-pink-500" size={14} />
              <p className="text-white/60 text-xs">Combo</p>
            </div>
            <p className="text-white text-lg sm:text-xl">
              {combo > 0 ? `${combo}x` : "-"}
            </p>
          </div>
          <div className="glass p-3 rounded-xl border border-purple-500/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Target className="text-purple-500" size={14} />
              <p className="text-white/60 text-xs">Clicks</p>
            </div>
            <p className="text-white text-lg sm:text-xl">{clicks}</p>
          </div>
          <div className="glass p-3 rounded-xl border border-orange-500/20 text-center col-span-2 sm:col-span-1">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Trophy className="text-orange-500" size={14} />
              <p className="text-white/60 text-xs">Best</p>
            </div>
            <p className="text-white text-lg sm:text-xl">
              {highScore ?? "-"}
            </p>
          </div>
        </div>

        {/* Combo Indicator */}
        <AnimatePresence>
          {combo > 2 && isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="glass-strong p-3 rounded-xl border-2 border-[#c4ff00] text-center"
            >
              <p className="text-[#c4ff00] font-bold">
                🔥 COMBO x{combo}! +{combo * 5} Bonus Points!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Board */}
        <div className="max-w-2xl mx-auto">
          {!isPlaying && !isGameOver ? (
            // Start Screen
            <div className="glass-strong p-12 sm:p-16 rounded-2xl border-2 border-[#c4ff00]/30 text-center space-y-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Bug className="text-[#c4ff00] mx-auto" size={80} />
              </motion.div>
              <div>
                <h4 className="text-white text-xl sm:text-2xl mb-2">
                  Ready to Smash Bugs?
                </h4>
                <p className="text-white/60 text-sm">
                  Click bugs before they disappear! Faster bugs = more points!
                </p>
              </div>
              <div className="glass p-4 rounded-xl space-y-2 text-left max-w-md mx-auto">
                <p className="text-white/80 text-sm">
                  <span className="text-2xl mr-2">🐛</span> Regular Bug - 10 pts
                </p>
                <p className="text-white/80 text-sm">
                  <span className="text-2xl mr-2">🐞</span> Ladybug - 15 pts
                </p>
                <p className="text-white/80 text-sm">
                  <span className="text-2xl mr-2">🦗</span> Cricket - 20 pts
                </p>
                <p className="text-white/80 text-sm">
                  <span className="text-2xl mr-2">🕷️</span> Spider - 25 pts
                </p>
                <p className="text-white/80 text-sm">
                  <span className="text-2xl mr-2">🦟</span> Mosquito - 30 pts
                </p>
              </div>
              <Button
                onClick={startGame}
                className="bg-[#c4ff00] text-black hover:bg-[#b3e600] px-8 py-6 text-base"
              >
                <Play size={20} className="mr-2" />
                Start Game
              </Button>
            </div>
          ) : isGameOver ? (
            // Game Over Screen
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-strong p-8 sm:p-12 rounded-2xl border-2 border-[#c4ff00] text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", duration: 0.6 }}
              >
                <Trophy className="text-[#c4ff00] mx-auto" size={80} />
              </motion.div>
              <h3 className="text-white text-2xl sm:text-3xl">Game Over! 🎉</h3>
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="glass p-4 rounded-xl">
                  <p className="text-white/60 text-sm mb-1">Final Score</p>
                  <p className="text-[#c4ff00] text-3xl sm:text-4xl">{score}</p>
                  {highScore !== null && score >= highScore && (
                    <p className="text-[#c4ff00] text-xs mt-1">🏆 New Record!</p>
                  )}
                </div>
                <div className="glass p-4 rounded-xl">
                  <p className="text-white/60 text-sm mb-1">Max Combo</p>
                  <p className="text-pink-500 text-3xl sm:text-4xl">{maxCombo}x</p>
                </div>
                <div className="glass p-4 rounded-xl">
                  <p className="text-white/60 text-sm mb-1">Total Clicks</p>
                  <p className="text-blue-500 text-2xl sm:text-3xl">{clicks}</p>
                </div>
                <div className="glass p-4 rounded-xl">
                  <p className="text-white/60 text-sm mb-1">Hit Rate</p>
                  <p className="text-purple-500 text-2xl sm:text-3xl">
                    {clicks > 0 ? Math.round((score / clicks)) : 0}%
                  </p>
                </div>
              </div>
              <div className="glass p-4 rounded-xl max-w-md mx-auto">
                <p className="text-white/60 text-sm mb-2">Performance Rating</p>
                <p className="text-white text-lg">
                  {score >= 500
                    ? "🔥 Bug Exterminator!"
                    : score >= 350
                    ? "⚡ Debug Master!"
                    : score >= 200
                    ? "💪 Bug Hunter!"
                    : "🎯 Keep Practicing!"}
                </p>
              </div>
              {highScore !== null && (
                <div className="glass p-3 rounded-xl border border-[#c4ff00]/20">
                  <p className="text-white/60 text-xs mb-1">Your High Score</p>
                  <p className="text-[#c4ff00] text-xl">{highScore}</p>
                </div>
              )}
              <Button
                onClick={startGame}
                className="bg-[#c4ff00] text-black hover:bg-[#b3e600] px-8 py-6 text-base"
              >
                <RefreshCw size={20} className="mr-2" />
                Play Again
              </Button>
            </motion.div>
          ) : (
            // Active Game Board
            <div
              className="glass-strong p-4 rounded-2xl border-2 border-[#c4ff00]/30"
              onClick={handleMissClick}
            >
              <div className="grid grid-cols-3 gap-3 sm:gap-4 aspect-square max-w-lg mx-auto">
                {Array.from({ length: GRID_SIZE }).map((_, index) => {
                  const bug = bugs.find(
                    (b) => b.position === index && b.isVisible
                  );
                  return (
                    <div
                      key={index}
                      className="relative aspect-square glass rounded-xl border border-white/10 flex items-center justify-center cursor-crosshair"
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
                            className="absolute inset-0 flex items-center justify-center text-5xl sm:text-6xl hover:drop-shadow-lg"
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

        {/* Instructions */}
        {isPlaying && (
          <div className="glass p-3 rounded-xl border-[#c4ff00]/20 text-center">
            <p className="text-white/60 text-xs sm:text-sm">
              💡 <strong>Tip:</strong> Build combos by hitting bugs consecutively! Each combo
              adds +5 bonus points per hit!
            </p>
          </div>
        )}

        {/* Quick Stats During Game */}
        {isPlaying && !isGameOver && timeLeft <= 10 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-strong p-4 rounded-xl border-2 border-red-500/50 text-center"
          >
            <p className="text-red-400 font-bold text-lg">
              ⏰ Only {timeLeft} seconds left!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
