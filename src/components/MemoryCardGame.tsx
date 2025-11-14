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
    <div className="glass-strong p-4 sm:p-6 lg:p-8 rounded-2xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <Brain className="text-[#c4ff00]" size={32} />
            <h3 className="text-white text-xl sm:text-2xl">Memory Card Game</h3>
          </div>
          <p className="text-white/60 text-sm">
            Match all the tech icons to win! Test your memory skills.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="glass p-3 rounded-xl border border-blue-500/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Timer className="text-blue-500" size={16} />
              <p className="text-white/60 text-xs">Time</p>
            </div>
            <p className="text-white text-lg sm:text-xl">{formatTime(timer)}</p>
          </div>
          <div className="glass p-3 rounded-xl border border-pink-500/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Zap className="text-pink-500" size={16} />
              <p className="text-white/60 text-xs">Moves</p>
            </div>
            <p className="text-white text-lg sm:text-xl">{moves}</p>
          </div>
          <div className="glass p-3 rounded-xl border border-purple-500/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Star className="text-purple-500" size={16} />
              <p className="text-white/60 text-xs">Pairs</p>
            </div>
            <p className="text-white text-lg sm:text-xl">
              {matchedPairs}/{CARD_ICONS.length}
            </p>
          </div>
          <div className="glass p-3 rounded-xl border border-[#c4ff00]/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Trophy className="text-[#c4ff00]" size={16} />
              <p className="text-white/60 text-xs">Best</p>
            </div>
            <p className="text-white text-lg sm:text-xl">
              {bestMoves ? `${bestMoves}m` : "-"}
            </p>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto">
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
                  className="absolute inset-0 glass-strong border-2 border-[#c4ff00]/30 rounded-xl flex items-center justify-center backface-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="text-3xl sm:text-4xl">❓</div>
                </div>

                {/* Card Front */}
                <div
                  className={`absolute inset-0 rounded-xl flex items-center justify-center backface-hidden ${
                    card.isMatched
                      ? "glass-strong border-2 border-[#c4ff00]"
                      : "glass border-2 border-pink-500/30"
                  }`}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="text-3xl sm:text-4xl">{card.icon}</div>
                </div>
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Win Modal */}
        <AnimatePresence>
          {isGameWon && (
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
              <h3 className="text-white text-2xl sm:text-3xl">You Won! 🎉</h3>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="glass p-4 rounded-xl">
                  <p className="text-white/60 text-sm mb-1">Time</p>
                  <p className="text-blue-500 text-2xl">{formatTime(timer)}</p>
                  {bestTime !== null && timer <= bestTime && (
                    <p className="text-[#c4ff00] text-xs mt-1">🏆 New Record!</p>
                  )}
                </div>
                <div className="glass p-4 rounded-xl">
                  <p className="text-white/60 text-sm mb-1">Moves</p>
                  <p className="text-pink-500 text-2xl">{moves}</p>
                  {bestMoves !== null && moves <= bestMoves && (
                    <p className="text-[#c4ff00] text-xs mt-1">🏆 New Record!</p>
                  )}
                </div>
              </div>
              <div className="glass p-4 rounded-xl max-w-md mx-auto">
                <p className="text-white/60 text-sm mb-2">Performance Rating</p>
                <p className="text-white text-lg">
                  {moves <= 12
                    ? "🧠 Genius Memory!"
                    : moves <= 16
                    ? "⚡ Excellent!"
                    : moves <= 20
                    ? "💪 Great Job!"
                    : "🎯 Good Effort!"}
                </p>
              </div>
              {(bestTime !== null || bestMoves !== null) && (
                <div className="glass p-3 rounded-xl border border-[#c4ff00]/20">
                  <p className="text-white/60 text-xs mb-1">Personal Best</p>
                  <p className="text-[#c4ff00] text-sm">
                    {bestTime !== null && `${formatTime(bestTime)}`}
                    {bestTime !== null && bestMoves !== null && " • "}
                    {bestMoves !== null && `${bestMoves} moves`}
                  </p>
                </div>
              )}
              <Button
                onClick={initializeGame}
                className="bg-[#c4ff00] text-black hover:bg-[#b3e600] px-8 py-6 text-base"
              >
                <RefreshCw size={20} className="mr-2" />
                Play Again
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        {!isPlaying && !isGameWon && (
          <div className="glass p-4 rounded-xl border-[#c4ff00]/20">
            <p className="text-white/60 text-sm text-center">
              💡 <strong>How to play:</strong> Click cards to flip them. Match pairs
              of identical tech icons. Complete with minimum moves to get the best score!
            </p>
          </div>
        )}

        {/* Reset Button */}
        {isPlaying && !isGameWon && (
          <Button
            onClick={initializeGame}
            variant="outline"
            className="w-full border-[#c4ff00]/30 text-[#c4ff00] hover:bg-[#c4ff00]/10"
          >
            <RefreshCw size={20} className="mr-2" />
            Restart Game
          </Button>
        )}
      </div>
    </div>
  );
}
