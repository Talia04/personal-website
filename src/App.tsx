import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Coursework } from "./components/Coursework";
import { ResearchSpotlight } from "./components/SeniorDesign";
import { Journey } from "./components/Journey";
import { ImpactPortfolio } from "./components/ImpactPortfolio";
import { PortfolioFork, type PortfolioPath } from "./components/PortfolioFork";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Additional } from "./components/Additional";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { ThemeProvider } from "./utils/theme";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./styles/editorial-system.css";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioPath, setPortfolioPath] = useState<PortfolioPath | null>(null);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {!isLoading && !portfolioPath && (
          <PortfolioFork key="portfolio-fork" onSelect={setPortfolioPath} />
        )}
      </AnimatePresence>

      {!isLoading && portfolioPath && (
        <>
          <Navigation
            path={portfolioPath}
            onSwitch={() => setPortfolioPath(portfolioPath === "tech" ? "impact" : "tech")}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={portfolioPath}
              className={`portfolio-shell portfolio-shell-${portfolioPath} min-h-screen theme-main-bg`}
              initial={{ opacity: 0, filter: "blur(18px)", scale: 1.015 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(14px)", scale: 0.99 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              {portfolioPath === "tech" ? (
                <>
                  <Hero onReadStory={() => setPortfolioPath("impact")} />
                  <About />
                  <Coursework />
                  <Projects />
                  <Skills />
                  <Experience />
                  <Additional />
                  <Contact path="tech" />
                </>
              ) : (
                <>
                  <ImpactPortfolio />
                  <Journey />
                  <ResearchSpotlight />
                  <Additional />
                  <Contact path="impact" />
                </>
              )}
              <Footer path={portfolioPath} />
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </ThemeProvider>
  );
}
