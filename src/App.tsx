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
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <motion.div
        className="min-h-screen theme-main-bg"
        initial={{ filter: "blur(10px)", scale: 1.02 }}
        animate={{
          filter: isLoading ? "blur(10px)" : "blur(0px)",
          scale: isLoading ? 1.02 : 1
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
