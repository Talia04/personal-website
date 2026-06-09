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
import { InterestsModal } from "./components/InterestsModal";
import { BucketListModal } from "./components/BucketListModal";
import { ThemeProvider } from "./utils/theme";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { parsePortfolioRoute, portfolioRouteHref, type PortfolioRoute } from "./utils/routes";
import "./styles/editorial-system.css";

export default function App() {
  const [route, setRoute] = useState<PortfolioRoute>(() => parsePortfolioRoute());
  const [isLoading, setIsLoading] = useState(() => route.path === null);
  const portfolioPath = route.path;
  const [isInterestsOpen, setIsInterestsOpen] = useState(false);
  const [isBucketListOpen, setIsBucketListOpen] = useState(false);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    if (new URLSearchParams(window.location.search).has("route") && route.path) {
      window.history.replaceState({}, "", portfolioRouteHref(route.path, route.section, route.paper));
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => setRoute(parsePortfolioRoute());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (isLoading || !portfolioPath) return;

    const timer = window.setTimeout(() => {
      if (route.section) {
        document.getElementById(route.section)?.scrollIntoView({ behavior: "auto" });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    }, 120);

    return () => window.clearTimeout(timer);
  }, [isLoading, portfolioPath, route.section]);

  const navigate = (path: PortfolioPath | null, section: string | null = null, paper = false) => {
    const href = path ? portfolioRouteHref(path, section, paper) : "/";
    window.history.pushState({}, "", href);
    setRoute({ path, section, paper });
  };

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {!isLoading && !portfolioPath && (
          <PortfolioFork key="portfolio-fork" onSelect={(path) => navigate(path)} />
        )}
      </AnimatePresence>

      {!isLoading && portfolioPath && (
        <>
          <Navigation
            path={portfolioPath}
            onNavigate={(section) => navigate(portfolioPath, section)}
            onOpenInterests={() => {
              setIsBucketListOpen(false);
              setIsInterestsOpen(true);
            }}
            onOpenBucketList={() => {
              setIsInterestsOpen(false);
              setIsBucketListOpen(true);
            }}
            onSwitch={() => {
              setIsInterestsOpen(false);
              setIsBucketListOpen(false);
              navigate(portfolioPath === "tech" ? "impact" : "tech");
            }}
          />
          <InterestsModal
            open={portfolioPath === "impact" && isInterestsOpen}
            onClose={() => setIsInterestsOpen(false)}
          />
          <BucketListModal
            open={portfolioPath === "impact" && isBucketListOpen}
            onClose={() => setIsBucketListOpen(false)}
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
                  <Hero
                    onExploreWork={() => navigate("tech", "projects")}
                    onReadStory={() => navigate("impact")}
                  />
                  <About onExploreFoundation={() => navigate("tech", "coursework")} />
                  <Coursework onViewResearch={() => navigate("impact", "research", true)} />
                  <Projects />
                  <Skills />
                  <Experience />
                  <Additional />
                  <Contact path="tech" />
                </>
              ) : (
                <>
                  <ImpactPortfolio onBeginStory={() => navigate("impact", "gallery")} />
                  <Journey />
                  <ResearchSpotlight
                    openPaper={route.paper}
                    onPaperOpen={() => navigate("impact", "research", true)}
                    onPaperClose={() => navigate("impact", "research")}
                  />
                  <Additional />
                  <Contact path="impact" />
                </>
              )}
              <Footer
                path={portfolioPath}
                onNavigate={(section) => navigate(portfolioPath, section)}
                onNavigateTop={() => navigate(portfolioPath)}
              />
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </ThemeProvider>
  );
}
