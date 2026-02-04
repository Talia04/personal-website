import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { TechMarquee } from "./components/TechMarquee";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Additional } from "./components/Additional";
import { Games } from "./components/Games";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { ThemeProvider } from "./utils/theme";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <motion.div
        className="min-h-screen theme-main-bg"
        initial={{ opacity: 0, filter: "blur(20px)", scale: 1.02 }}
        animate={{
          opacity: isLoading ? 0 : 1,
          filter: isLoading ? "blur(20px)" : "blur(0px)",
          scale: isLoading ? 1.02 : 1
        }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8, delay: isLoading ? 0 : 0.3 },
          filter: { duration: 1.4, ease: "easeOut" },
          scale: { duration: 1.2 }
        }}
      >
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <TechMarquee />
        <Experience />
        <Projects />
        <Additional />
        <Games />
        <Contact />
        <Footer />
      </motion.div>
    </ThemeProvider>
  );
}
