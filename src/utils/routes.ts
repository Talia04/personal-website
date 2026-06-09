import type { PortfolioPath } from "../components/PortfolioFork";

export type PortfolioRoute = {
  path: PortfolioPath | null;
  section: string | null;
  paper: boolean;
};

const sectionRoutes: Record<PortfolioPath, Record<string, string>> = {
  tech: {
    about: "about",
    education: "coursework",
    work: "projects",
    expertise: "skills",
    experience: "experience",
    honors: "achievements",
    contact: "contact",
  },
  impact: {
    gallery: "gallery",
    journey: "journey",
    research: "research",
    impact: "impact",
    honors: "achievements",
    contact: "contact",
  },
};

const sectionSlugs: Record<PortfolioPath, Record<string, string>> = {
  tech: Object.fromEntries(Object.entries(sectionRoutes.tech).map(([slug, id]) => [id, slug])),
  impact: Object.fromEntries(Object.entries(sectionRoutes.impact).map(([slug, id]) => [id, slug])),
};

export function parsePortfolioRoute(pathname = window.location.pathname): PortfolioRoute {
  const recoveredPath = pathname === "/"
    ? new URLSearchParams(window.location.search).get("route")
    : null;
  const segments = (recoveredPath ?? pathname).split("/").filter(Boolean);
  const path = segments[0] === "tech" ? "tech" : segments[0] === "story" ? "impact" : null;

  if (!path) return { path: null, section: null, paper: false };

  return {
    path,
    section: sectionRoutes[path][segments[1]] ?? null,
    paper: path === "impact" && segments[1] === "research" && segments[2] === "paper",
  };
}

export function portfolioRouteHref(path: PortfolioPath, section?: string | null, paper = false) {
  const base = path === "tech" ? "/tech" : "/story";
  if (!section) return base;

  const slug = sectionSlugs[path][section] ?? section;
  return `${base}/${slug}${paper ? "/paper" : ""}`;
}
