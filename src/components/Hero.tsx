import { ArrowDownRight, BookOpen } from "lucide-react";

interface HeroProps {
  onReadStory?: () => void;
}

export function Hero({ onReadStory }: HeroProps) {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToJourney = () => {
    if (onReadStory) {
      onReadStory();
      return;
    }

    document.querySelector("#journey")?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    "Zimbabwean",
    "Summa Cum Laude",
    "3× Meta Intern",
    "Generation Google Scholar",
    "Educator & Mentor",
    "Founder of Basafy",
  ];

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#0f0b16] px-5 pb-16 pt-40 text-[#eae6f6] sm:px-8 sm:pt-36 md:px-10 md:pt-36 lg:px-16 lg:pt-40 xl:px-24">
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          top: "-14%",
          left: "-10%",
          width: "clamp(18rem, 36vw, 31rem)",
          height: "clamp(18rem, 36vw, 31rem)",
          background: "#8b5cf6",
          filter: "blur(120px)",
          opacity: 0.38,
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          top: "18%",
          right: "-12%",
          width: "clamp(20rem, 42vw, 37rem)",
          height: "clamp(20rem, 42vw, 37rem)",
          background: "#6ee7b7",
          filter: "blur(120px)",
          opacity: 0.14,
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          bottom: "-10%",
          left: "18%",
          width: "clamp(16rem, 28vw, 25rem)",
          height: "clamp(16rem, 28vw, 25rem)",
          background: "#2b2636",
          filter: "blur(120px)",
          opacity: 0.36,
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-10rem)] w-full max-w-[1440px] flex-col-reverse items-center justify-center gap-10 sm:gap-12 lg:min-h-[calc(100svh-9rem)] lg:flex-row lg:items-center lg:justify-between lg:gap-16"
        style={{ padding: "50px 50px 50px" }}>
        <div className="w-full max-w-[42rem] text-center lg:text-left">
          <h1
            className="font-black leading-[0.88] text-[#eae6f6]"
            style={{
              fontSize: "clamp(3.10rem, 9vw, 8.7rem)",
              letterSpacing: "clamp(-1.5px, -0.28vw, -4px)",
              lineHeight: 0.9,
              justifyItems: "left",
            }}
          >
            Tanya
            <span
              className="block font-normal italic text-[#a8d500]"
              style={{
                paddingLeft: "60px",
                fontSize: "clamp(2.8rem, 7vw, 6rem)",
                fontStyle: "italic",
              }}
            >
              Chisepo
            </span>
          </h1>
          {/* <p className="mx-auto max-w-[34rem] font-normal text-[#a99bd6] lg:mx-0"
            style={{
              fontSize: "clamp(0.98rem, 2.2vw, 1.5rem)",
              color: "#a8d500",
              marginLeft: "20px",

            }}
          >
            Hi.
          </p> */}
          <p className="max-w-[39rem] text-left text-xl font-semibold leading-tight text-[#eae6f6] sm:text-2xl lg:text-3xl" style={{ marginTop: "2.5rem" }}>
            Building technology that expands access to education, careers, and opportunity.
          </p>
          <p
            className="max-w-[36rem] text-left font-normal text-[#a99bd6]"
            style={{
              marginTop: "1.25rem",
              fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
              lineHeight: 1.55,
            }}
          >
            Zimbabwean software engineer, educator, mentor, and three-time Meta intern building practical tools for everyday problems.
          </p>

          <div className="flex max-w-[42rem] flex-wrap gap-2" style={{ marginTop: "1.75rem" }}>
            {stats.map((stat) => (
              <span
                key={stat}
                className="rounded-full border border-white/10 bg-white/[0.035] px-3 text-[10px] font-medium uppercase text-white/55"
                style={{ paddingTop: "0.375rem", paddingBottom: "0.375rem", letterSpacing: "0.14em" }}
              >
                {stat}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3" style={{ marginTop: "2.25rem" }}>
            <button
              type="button"
              onClick={scrollToProjects}
              className="inline-flex items-center rounded-full border border-[#a8d500]/35 bg-[#a8d500] text-[#0f0b16] shadow-[0_14px_38px_rgba(168,213,0,0.22)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#b8e510]"
              style={{
                padding: "clamp(0.85rem, 2vw, 1rem) clamp(1.3rem, 3vw, 1.8rem)",
                fontSize: "clamp(0.88rem, 1.6vw, 1rem)",
                fontWeight: 600,
              }}
            >
              View Projects
              <ArrowDownRight className="ml-2 h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollToJourney}
              className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.035] text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#a8d500]/40 hover:text-[#a8d500]"
              style={{
                padding: "clamp(0.85rem, 2vw, 1rem) clamp(1.3rem, 3vw, 1.8rem)",
                fontSize: "clamp(0.88rem, 1.6vw, 1rem)",
                fontWeight: 600,
              }}
            >
              Read My Story
              <BookOpen className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          className="relative flex w-full max-w-[21rem] shrink-0 items-center justify-center sm:max-w-[24rem] lg:max-w-none"
          style={{
            width: "clamp(15.5rem, 36vw, 28rem)",
            height: "clamp(20rem, 48vw, 37.5rem)",
          }}
        >
          <div
            className="h-full w-full overflow-hidden border border-white/[0.08] bg-[#191419] shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
            style={{
              borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
            }}
          >
            <img
              src="/tanya-portrait.jpg"
              alt="Tanya Chisepo"
              className="h-full w-full object-cover object-center"
              style={{ objectPosition: "center top" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
