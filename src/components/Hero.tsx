import { ArrowDownRight } from "lucide-react";

export function Hero() {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

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
          <p
            className="mx-auto max-w-[34rem] font-normal text-[#a99bd6] lg:mx-0"
            style={{
              fontSize: "clamp(0.98rem, 2.2vw, 1.5rem)",
              lineHeight: 1.55,
              marginTop: "50px",
              marginBottom: "50px",
              marginLeft: "20px",
              width: "50%",

            }}
          >
            I’m a Software Engineer who loves solving everyday problems with technology.
          </p>

          <button
            type="button"
            onClick={scrollToProjects}
            className="inline-flex items-center rounded-full border border-[#a8d500]/35 bg-[#a8d500] text-[#0f0b16] shadow-[0_14px_38px_rgba(168,213,0,0.22)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#b8e510]"
            style={{
              padding: "clamp(0.9rem, 2vw, 1rem) clamp(1.4rem, 3vw, 2rem)",
              fontSize: "clamp(0.95rem, 1.6vw, 1rem)",
              fontWeight: 600,
            }}
          >
            View Projects
            <span className="ml-2 flex h-5 w-5 items-center justify-center sm:h-6 sm:w-6">
              <ArrowDownRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
          </button>
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
