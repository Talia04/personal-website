import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { TechMarquee } from "./components/TechMarquee";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Additional } from "./components/Additional";
import { Games } from "./components/Games";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { ThemeProvider } from "./utils/theme";
import { useEffect, useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <ThemeProvider>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div className="min-h-screen theme-main-bg">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <TechMarquee />
        <Experience />
        <Projects />
        <Additional />
        <Games />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
