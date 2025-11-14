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
    <div className="glass-strong p-4 sm:p-6 lg:p-8 rounded-2xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <Keyboard className="text-[#c4ff00]" size={32} />
            <h3 className="text-white text-xl sm:text-2xl">Typing Speed Test</h3>
          </div>
          <p className="text-white/60 text-sm">
            Type the code snippet as fast and accurately as you can!
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="glass p-3 sm:p-4 rounded-xl border border-[#c4ff00]/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Zap className="text-[#c4ff00]" size={16} />
              <p className="text-white/60 text-xs">WPM</p>
            </div>
            <p className="text-white text-xl sm:text-2xl">{wpm}</p>
          </div>
          <div className="glass p-3 sm:p-4 rounded-xl border border-pink-500/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Target className="text-pink-500" size={16} />
              <p className="text-white/60 text-xs">Accuracy</p>
            </div>
            <p className="text-white text-xl sm:text-2xl">{accuracy}%</p>
          </div>
          <div className="glass p-3 sm:p-4 rounded-xl border border-blue-500/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Clock className="text-blue-500" size={16} />
              <p className="text-white/60 text-xs">Time</p>
            </div>
            <p className="text-white text-xl sm:text-2xl">{timeElapsed}s</p>
          </div>
          <div className="glass p-3 sm:p-4 rounded-xl border border-purple-500/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Trophy className="text-purple-500" size={16} />
              <p className="text-white/60 text-xs">Progress</p>
            </div>
            <p className="text-white text-xl sm:text-2xl">{Math.round(progress)}%</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Code Display */}
        <div className="glass-strong p-4 sm:p-6 rounded-xl border-2 border-[#c4ff00]/30 min-h-[120px] sm:min-h-[150px] flex items-center">
          <div className="font-mono text-base sm:text-lg leading-relaxed break-all">
            {currentSnippet.split("").map((char, index) => (
              <span key={index} className={getCharacterColor(index)}>
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Input Field */}
        <div className="space-y-3">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            disabled={isFinished}
            placeholder={isStarted ? "Keep typing..." : "Click here or start typing to begin..."}
            className="w-full px-4 py-3 sm:py-4 rounded-xl glass border-2 border-[#c4ff00]/30 text-white placeholder:text-white/40 text-base sm:text-lg font-mono focus:outline-none focus:border-[#c4ff00] transition-all disabled:opacity-50"
            autoComplete="off"
            spellCheck="false"
          />
        </div>

        {/* Results Modal */}
        <AnimatePresence>
          {isFinished && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-strong p-6 sm:p-8 rounded-2xl border-2 border-[#c4ff00] text-center space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
              >
                <Trophy className="text-[#c4ff00] mx-auto" size={64} />
              </motion.div>
              <h3 className="text-white text-2xl sm:text-3xl">Test Complete! 🎉</h3>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="glass p-4 rounded-xl">
                  <p className="text-white/60 text-sm mb-1">Speed</p>
                  <p className="text-[#c4ff00] text-3xl">{wpm}</p>
                  <p className="text-white/60 text-xs">WPM</p>
                </div>
                <div className="glass p-4 rounded-xl">
                  <p className="text-white/60 text-sm mb-1">Accuracy</p>
                  <p className="text-pink-500 text-3xl">{accuracy}%</p>
                  <p className="text-white/60 text-xs">Correct</p>
                </div>
              </div>
              <div className="glass p-4 rounded-xl max-w-md mx-auto">
                <p className="text-white/60 text-sm mb-2">Performance Rating</p>
                <p className="text-white text-lg">
                  {wpm >= 80 && accuracy >= 95
                    ? "🔥 Lightning Fast!"
                    : wpm >= 60 && accuracy >= 90
                    ? "⚡ Great Job!"
                    : wpm >= 40 && accuracy >= 85
                    ? "💪 Good Work!"
                    : "🎯 Keep Practicing!"}
                </p>
              </div>
              <Button
                onClick={resetGame}
                className="bg-[#c4ff00] text-black hover:bg-[#b3e600] px-8 py-6 text-base"
              >
                <RefreshCw size={20} className="mr-2" />
                Try Again
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        {!isStarted && !isFinished && (
          <div className="glass p-4 rounded-xl border-[#c4ff00]/20">
            <p className="text-white/60 text-sm text-center">
              💡 <strong>Tip:</strong> Focus on accuracy first, then speed. The snippet
              includes real code with proper syntax!
            </p>
          </div>
        )}

        {/* Reset Button (when started) */}
        {(isStarted || isFinished) && !isFinished && (
          <Button
            onClick={resetGame}
            variant="outline"
            className="w-full border-[#c4ff00]/30 text-[#c4ff00] hover:bg-[#c4ff00]/10"
          >
            <RefreshCw size={20} className="mr-2" />
            New Snippet
          </Button>
        )}
      </div>
    </div>
  );
}
