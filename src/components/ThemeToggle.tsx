import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../utils/theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-14 h-7 rounded-full theme-toggle-bg flex items-center cursor-pointer transition-all duration-300 border theme-toggle-border"
      aria-label="Toggle theme"
    >
      {/* Toggle Circle */}
      <motion.div
        className="absolute w-5 h-5 rounded-full theme-toggle-circle flex items-center justify-center"
        initial={false}
        animate={{
          x: theme === 'dark' ? 2 : 30,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {theme === 'dark' ? (
          <Moon size={12} className="text-white" />
        ) : (
          <Sun size={12} className="text-black" />
        )}
      </motion.div>

      {/* Background Icons */}
      <div className="w-full flex items-center justify-between px-2">
        <Sun size={14} className="text-yellow-500 opacity-50" />
        <Moon size={14} className="text-blue-400 opacity-50" />
      </div>
    </motion.button>
  );
}
