import {
  BookOpen,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Lightbulb,
  Rocket,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface JourneyMedia {
  type: "image" | "video";
  src?: string;
  alt: string;
  caption: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  location: string;
  chapter: string;
  description: string;
  achievements: string[];
  media: JourneyMedia[];
  icon: LucideIcon;
}

export const journeyEvents: TimelineEvent[] = [
  {
    year: "2016",
    title: "The first spark",
    location: "Johannesburg, South Africa",
    chapter: "Taungana Africa STEM Exposition",
    description:
      "A STEM exposition became my first real encounter with coding, women building in technology, and the possibility of using ideas to solve everyday problems.",
    achievements: [
      "Selected to attend the exposition in Johannesburg",
      "Won recognition for an entrepreneurial project",
      "Discovered a path into technology",
    ],
    media: [
      {
        type: "image",
        alt: "Tanya at the Taungana Africa STEM Exposition",
        caption: "Add an exposition photo",
      },
    ],
    icon: Lightbulb,
  },
  {
    year: "2019",
    title: "Learning beyond borders",
    location: "Panama City, Panama",
    chapter: "World Youth Day",
    description:
      "Being selected for an international youth gathering expanded my view of leadership. It made curiosity, community, and cultural exchange central to the way I approach new spaces.",
    achievements: [
      "Selected for an international leadership experience",
      "Built relationships across cultures",
      "Strengthened a service-first view of leadership",
    ],
    media: [
      {
        type: "image",
        alt: "Tanya at World Youth Day in Panama",
        caption: "Add a Panama photo",
      },
    ],
    icon: Users,
  },
  {
    year: "2020",
    title: "Turning disruption into access",
    location: "Zimbabwe",
    chapter: "COVID-19, community tutoring & TutorConn",
    description:
      "When COVID disrupted school, I helped create a WhatsApp learning community and built TutorConn. Technology stopped being an abstract interest and became a practical way to widen access.",
    achievements: [
      "Supported a WhatsApp learning community of 200+ students",
      "Built TutorConn to connect students with academic support",
      "Earned a Google Africa Developer Scholarship",
    ],
    media: [
      {
        type: "image",
        alt: "TutorConn product screenshot",
        caption: "Add a TutorConn screenshot",
      },
      {
        type: "video",
        alt: "TutorConn walkthrough video",
        caption: "Optional: add a short walkthrough",
      },
    ],
    icon: Code2,
  },
  {
    year: "2020–22",
    title: "Growing through service",
    location: "USAP Community School, Zimbabwe",
    chapter: "Teaching, mentoring & community",
    description:
      "At USAP, I learned that technical skill compounds when it is shared. Teaching biology, supporting residents, and mentoring younger students shaped the kind of engineer I want to be.",
    achievements: [
      "Served as a Biology Teaching Assistant",
      "Supported students as a Resident Assistant",
      "Mentored through chess, coding, and everyday campus life",
    ],
    media: [
      {
        type: "image",
        alt: "Tanya with students at USAP Community School",
        caption: "Add a USAP community photo",
      },
    ],
    icon: BookOpen,
  },
  {
    year: "2022–26",
    title: "Building an engineering foundation",
    location: "Daytona Beach, Florida",
    chapter: "Bethune-Cookman University",
    description:
      "At Bethune-Cookman, I combined a rigorous computer science education with robotics, tutoring, and campus leadership while continuing to build products outside the classroom.",
    achievements: [
      "Earned a Presidential Scholarship",
      "Graduated Summa Cum Laude in Computer Science",
      "Completed senior design research in reinforcement learning and robotic navigation",
      "Contributed through robotics, EcoCAR, math tutoring, and CS teaching",
    ],
    media: [
      {
        type: "image",
        alt: "Tanya at Bethune-Cookman University graduation",
        caption: "Add a graduation or robotics photo",
      },
    ],
    icon: GraduationCap,
  },
  {
    year: "2023–25",
    title: "Engineering at scale",
    location: "Meta",
    chapter: "Three summers, three perspectives",
    description:
      "Across Meta University and two software engineering internships, I grew from shipping a full-stack prototype to delivering mobile and backend systems used at significant scale.",
    achievements: [
      "Completed three Meta internships",
      "Worked across full-stack, backend infrastructure, and mobile",
      "Built features, reusable systems, and stronger test coverage",
    ],
    media: [
      {
        type: "image",
        alt: "Tanya during a Meta internship",
        caption: "Add a Meta internship photo",
      },
    ],
    icon: BriefcaseBusiness,
  },
  {
    year: "2026+",
    title: "Building what comes next",
    location: "Everywhere",
    chapter: "Basafy, Flux & the next chapter",
    description:
      "The next chapter connects everything that came before it: building thoughtful technology that expands access to education, careers, and opportunity.",
    achievements: [
      "Shipped Basafy, an AI-powered job search assistant",
      "Building Flux for more thoughtful developer collaboration",
      "Continuing to mentor and create tools with practical impact",
    ],
    media: [
      {
        type: "image",
        src: "/basafy/01-home-dashboard.png",
        alt: "Basafy dashboard",
        caption: "Basafy: helping people navigate the job search",
      },
    ],
    icon: Rocket,
  },
];

export const impactAreas = [
  {
    title: "Education",
    metric: "200+",
    label: "students reached",
    description:
      "TutorConn, a WhatsApp learning community, classroom teaching, and one-on-one tutoring.",
    icon: BookOpen,
  },
  {
    title: "Mentorship",
    metric: "15+",
    label: "students mentored",
    description:
      "Coding guidance, internship advice, scholarship support, and practical encouragement.",
    icon: Users,
  },
  {
    title: "Leadership",
    metric: "3×",
    label: "Meta intern",
    description:
      "A service-centered approach carried into robotics, technical teams, and product building.",
    icon: Rocket,
  },
];
