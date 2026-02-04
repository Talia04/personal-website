import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Keyboard, RefreshCw, Trophy, Clock, Zap, Target } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

const CODE_SNIPPETS = [
  "const developer = { skills: ['React', 'TypeScript', 'Node.js'], passion: 'coding' };",
  "function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }",
  "import { useState, useEffect } from 'react'; // React hooks are awesome!",
  "const sortArray = (arr) => arr.sort((a, b) => a - b); // Simple but effective",
  "class Component extends React.Component { render() { return <div>Hello World</div>; } }",
  "async function fetchData() { const response = await fetch(url); return response.json(); }",
  "const filterUsers = users.filter(user => user.active && user.role === 'admin');",
  "let [count, setCount] = useState(0); // State management in React hooks",
  "export default function App() { return <h1>Welcome to my portfolio!</h1>; }",
  "const multiply = (a, b) => a * b; // Arrow functions are concise and elegant",
];

export function TypingSpeedTest() {
  const [currentSnippet, setCurrentSnippet] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStarted && !isFinished) {
      interval = setInterval(() => {
        if (startTime) {
          setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isStarted, isFinished, startTime]);

  useEffect(() => {
    if (userInput.length > 0 && currentSnippet.length > 0) {
      const correctChars = userInput.split("").filter((char, i) => char === currentSnippet[i]).length;
      const acc = Math.round((correctChars / userInput.length) * 100);
      setAccuracy(acc);

      if (userInput === currentSnippet) {
        finishTest();
      }
    }
  }, [userInput, currentSnippet]);

  const resetGame = () => {
    const randomSnippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
    setCurrentSnippet(randomSnippet);
    setUserInput("");
    setIsStarted(false);
    setIsFinished(false);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setTimeElapsed(0);
  };

  const startTest = () => {
    setIsStarted(true);
    setStartTime(Date.now());
    inputRef.current?.focus();
  };

  const finishTest = () => {
    setIsFinished(true);
    if (startTime) {
      const timeInMinutes = (Date.now() - startTime) / 1000 / 60;
      const words = currentSnippet.split(" ").length;
      const calculatedWpm = Math.round(words / timeInMinutes);
      setWpm(calculatedWpm);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isStarted) {
      startTest();
    }
    setUserInput(e.target.value);
  };

  const getCharacterColor = (index: number) => {
    if (index >= userInput.length) return "text-white/40";
    if (userInput[index] === currentSnippet[index]) return "text-[#c4ff00]";
    return "text-red-500";
  };

  const progress = (userInput.length / currentSnippet.length) * 100;

  return (
    <div className="space-y-8">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Zap, label: "WPM", value: wpm, color: "#a8d500" },
          { icon: Target, label: "Accuracy", value: `${accuracy}%`, color: "#ff6b6b" },
          { icon: Clock, label: "Time", value: `${timeElapsed}s`, color: "#00d4ff" },
          { icon: Trophy, label: "Progress", value: `${Math.round(progress)}%`, color: "#c084fc" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="relative p-4 rounded-2xl border border-white/5 bg-white/[0.02] text-center overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ backgroundColor: stat.color + '40' }}
            />
            <div className="flex items-center justify-center gap-2 mb-2">
              <stat.icon size={14} style={{ color: stat.color }} />
              <p className="text-white/40 text-[10px] uppercase tracking-wider">{stat.label}</p>
            </div>
            <p className="text-white text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#a8d500] to-[#c4ff00] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Code Display */}
      <div className="relative p-6 rounded-2xl border border-[#a8d500]/20 bg-black/30 min-h-[120px] flex items-center">
        <div className="absolute top-3 left-4 flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <div className="font-mono text-base sm:text-lg leading-relaxed break-all mt-4">
          {currentSnippet.split("").map((char, index) => (
            <span key={index} className={getCharacterColor(index)}>
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <div>
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={isFinished}
          placeholder={isStarted ? "Keep typing..." : "Click here to start typing..."}
          className="w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 text-base font-mono focus:outline-none focus:border-[#a8d500]/50 focus:bg-white/[0.05] transition-all disabled:opacity-50"
          autoComplete="off"
          spellCheck="false"
        />
      </div>

      {/* Results Modal */}
      <AnimatePresence>
        {isFinished && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-8 rounded-2xl border border-[#a8d500]/30 bg-[#a8d500]/5 text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-[#a8d500]/10 flex items-center justify-center mx-auto"
            >
              <Trophy className="text-[#a8d500]" size={40} />
            </motion.div>

            <div>
              <h3 className="text-white text-2xl font-bold mb-2">Test Complete!</h3>
              <p className="text-white/40 text-sm">
                {wpm >= 80 && accuracy >= 95
                  ? "Lightning fast! You're a coding machine 🔥"
                  : wpm >= 60 && accuracy >= 90
                    ? "Great job! Keep up the momentum ⚡"
                    : wpm >= 40 && accuracy >= 85
                      ? "Good work! Practice makes perfect 💪"
                      : "Keep practicing, you've got this! 🎯"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-[#a8d500] text-3xl font-black">{wpm}</p>
                <p className="text-white/30 text-xs uppercase tracking-wider">WPM</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-[#ff6b6b] text-3xl font-black">{accuracy}%</p>
                <p className="text-white/30 text-xs uppercase tracking-wider">Accuracy</p>
              </div>
            </div>

            <button
              onClick={resetGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#a8d500] text-[#050505] font-semibold hover:bg-[#b8e500] transition-colors"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions / Reset */}
      {!isFinished && (
        <div className="flex items-center justify-between">
          <p className="text-white/30 text-xs">
            {!isStarted ? "Start typing to begin the test" : "Type the code exactly as shown above"}
          </p>
          {isStarted && (
            <button
              onClick={resetGame}
              className="flex items-center gap-2 text-white/40 hover:text-white text-xs transition-colors"
            >
              <RefreshCw size={14} />
              Reset
            </button>
          )}
        </div>
      )}
    </div>
  );
}
