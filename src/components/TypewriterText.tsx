import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  cursor?: boolean;
}

export function TypewriterText({
  text,
  delay = 0,
  speed = 50,
  className = "",
  cursor = true,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Initial delay before starting
    const delayTimeout = setTimeout(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, speed);

        return () => clearTimeout(timeout);
      }
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [currentIndex, text, speed, delay]);

  // Cursor blink effect
  useEffect(() => {
    if (!cursor) return;
    
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [cursor]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && currentIndex < text.length && (
        <span
          className="inline-block ml-0.5"
          style={{
            opacity: showCursor ? 1 : 0,
            transition: "opacity 0.1s",
          }}
        >
          |
        </span>
      )}
    </span>
  );
}
