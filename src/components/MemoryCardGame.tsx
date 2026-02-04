import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, RefreshCw, Trophy, Timer, Star, Zap } from "lucide-react";
import { Button } from "./ui/button";

// Tech icons/emojis for cards
const CARD_ICONS = [
  { id: 1, icon: "⚛️", name: "React" },
  { id: 2, icon: "📘", name: "TypeScript" },
  { id: 3, icon: "🟢", name: "Node.js" },
  { id: 4, icon: "🎨", name: "CSS" },
  { id: 5, icon: "⚡", name: "Vite" },
  { id: 6, icon: "🔥", name: "Firebase" },
  { id: 7, icon: "🐍", name: "Python" },
  { id: 8, icon: "☕", name: "Java" },
];

interface Card {
  id: number;
  icon: string;
  name: string;
  uniqueId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryCardGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [bestMoves, setBestMoves] = useState<number | null>(null);

  // Initialize game
  useEffect(() => {
    initializeGame();
    // Load best scores from localStorage
    const savedBestTime = localStorage.getItem("memoryGameBestTime");
    const savedBestMoves = localStorage.getItem("memoryGameBestMoves");
    if (savedBestTime) setBestTime(parseInt(savedBestTime));
    if (savedBestMoves) setBestMoves(parseInt(savedBestMoves));
  }, []);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isGameWon) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isGameWon]);

  const initializeGame = () => {
    // Create pairs of cards
    const cardPairs = CARD_ICONS.map((icon) => [
      { ...icon, uniqueId: `${icon.id}-a`, isFlipped: false, isMatched: false },
      { ...icon, uniqueId: `${icon.id}-b`, isFlipped: false, isMatched: false },
    ]).flat();

    // Shuffle cards
    const shuffled = cardPairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setIsGameWon(false);
    setTimer(0);
    setIsPlaying(false);
  };

  const handleCardClick = (uniqueId: string) => {
    // Start game on first click
    if (!isPlaying) {
      setIsPlaying(true);
    }

    // Prevent clicking if two cards are already flipped or card is already matched
    const card = cards.find((c) => c.uniqueId === uniqueId);
    if (!card || flippedCards.length === 2 || card.isMatched || flippedCards.includes(uniqueId)) {
      return;
    }

    // Flip the card
    const newFlippedCards = [...flippedCards, uniqueId];
    setFlippedCards(newFlippedCards);

    // Update card state
    setCards((prevCards) =>
      prevCards.map((c) =>
        c.uniqueId === uniqueId ? { ...c, isFlipped: true } : c
      )
    );

    // Check for match when two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find((c) => c.uniqueId === firstId);
      const secondCard = cards.find((c) => c.uniqueId === secondId);

      if (firstCard && secondCard && firstCard.id === secondCard.id) {
        // Match found!
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.uniqueId === firstId || c.uniqueId === secondId
                ? { ...c, isMatched: true }
                : c
            )
          );
          setMatchedPairs((prev) => prev + 1);
          setFlippedCards([]);

          // Check if game is won
          if (matchedPairs + 1 === CARD_ICONS.length) {
            setIsGameWon(true);
            setIsPlaying(false);
            checkAndSaveBestScores();
          }
        }, 500);
      } else {
        // No match - flip cards back
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.uniqueId === firstId || c.uniqueId === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const checkAndSaveBestScores = () => {
    // Check and save best time
    if (bestTime === null || timer < bestTime) {
      setBestTime(timer);
      localStorage.setItem("memoryGameBestTime", timer.toString());
    }

    // Check and save best moves
    if (bestMoves === null || moves + 1 < bestMoves) {
      setBestMoves(moves + 1);
      localStorage.setItem("memoryGameBestMoves", (moves + 1).toString());
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-8">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Timer, label: "Time", value: formatTime(timer), color: "#00d4ff" },
          { icon: Zap, label: "Moves", value: moves, color: "#ff6b6b" },
          { icon: Star, label: "Pairs", value: `${matchedPairs}/${CARD_ICONS.length}`, color: "#c084fc" },
          { icon: Trophy, label: "Best", value: bestMoves ? `${bestMoves}m` : "-", color: "#a8d500" },
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

      {/* Game Board */}
      <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto">
        {cards.map((card) => (
          <motion.button
            key={card.uniqueId}
            onClick={() => handleCardClick(card.uniqueId)}
            disabled={card.isMatched || isGameWon}
            className="relative aspect-square"
            whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
            whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
          >
            <motion.div
              className="w-full h-full rounded-xl relative preserve-3d cursor-pointer"
              animate={{
                rotateY: card.isFlipped || card.isMatched ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card Back */}
              <div
                className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center backface-hidden hover:border-[#00d4ff]/30 transition-colors"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="text-2xl sm:text-3xl opacity-30">?</div>
              </div>

              {/* Card Front */}
              <div
                className={`absolute inset-0 rounded-xl flex items-center justify-center backface-hidden transition-all ${card.isMatched
                    ? "border-2 border-[#a8d500]/50 bg-[#a8d500]/10"
                    : "border border-[#00d4ff]/30 bg-[#00d4ff]/5"
                  }`}
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="text-2xl sm:text-3xl">{card.icon}</div>
              </div>
            </motion.div>
          </motion.button>
        ))}
      </div>

      {/* Win Modal */}
      <AnimatePresence>
        {isGameWon && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-8 rounded-2xl border border-[#00d4ff]/30 bg-[#00d4ff]/5 text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-[#00d4ff]/10 flex items-center justify-center mx-auto"
            >
              <Trophy className="text-[#00d4ff]" size={40} />
            </motion.div>

            <div>
              <h3 className="text-white text-2xl font-bold mb-2">You Won!</h3>
              <p className="text-white/40 text-sm">
                {moves <= 12
                  ? "Genius memory! That was incredible 🧠"
                  : moves <= 16
                    ? "Excellent performance! ⚡"
                    : moves <= 20
                      ? "Great job completing the game! 💪"
                      : "Good effort, keep practicing! 🎯"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-[#00d4ff] text-3xl font-black">{formatTime(timer)}</p>
                <p className="text-white/30 text-xs uppercase tracking-wider">Time</p>
                {bestTime !== null && timer <= bestTime && (
                  <p className="text-[#a8d500] text-[10px] mt-1">New Record!</p>
                )}
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-[#ff6b6b] text-3xl font-black">{moves}</p>
                <p className="text-white/30 text-xs uppercase tracking-wider">Moves</p>
                {bestMoves !== null && moves <= bestMoves && (
                  <p className="text-[#a8d500] text-[10px] mt-1">New Record!</p>
                )}
              </div>
            </div>

            <button
              onClick={initializeGame}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00d4ff] text-[#050505] font-semibold hover:bg-[#20e4ff] transition-colors"
            >
              <RefreshCw size={18} />
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions / Reset */}
      {!isGameWon && (
        <div className="flex items-center justify-between">
          <p className="text-white/30 text-xs">
            {!isPlaying ? "Click any card to start" : "Find all matching pairs"}
          </p>
          {isPlaying && (
            <button
              onClick={initializeGame}
              className="flex items-center gap-2 text-white/40 hover:text-white text-xs transition-colors"
            >
              <RefreshCw size={14} />
              Restart
            </button>
          )}
        </div>
      )}
    </div>
  );
}
