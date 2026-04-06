import { ArrowDownRight, Sparkles } from "lucide-react";

export function Hero() {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        height: "100vh",
        padding: "80px 80px 80px",
        background: "#0f0b16",
        color: "#eae6f6",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Orb 1 — purple top-left */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          left: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "#8b5cf6",
          filter: "blur(120px)",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />
      {/* Orb 2 — mint right */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "-200px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "#6ee7b7",
          filter: "blur(120px)",
          opacity: 0.16,
          pointerEvents: "none",
        }}
      />
      {/* Orb 3 — dark bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "20%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "#2b2636",
          filter: "blur(120px)",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      {/* Hero Content */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          // margin: "0 auto",
          position: "relative",
          padding: "0 180px",
          zIndex: 10,
        }}
      >
        {/* Text Container */}
        <div style={{ flex: 1, width: "20%", paddingLeft: "100px" }}>
          <h1
            style={{
              fontSize: "140px",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-4px",
              marginBottom: "40px",
              color: "#eae6f6",
            }}
          >
            Tanya
            <br />
            <span
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "#a8d500",
                paddingLeft: "80px",
              }}
            >
              Chisepo
            </span>
          </h1>

          <p
            style={{
              fontSize: "24px",
              lineHeight: 1.5,
              color: "#a99bd6",
              marginBottom: "56px",
              maxWidth: "500px",
              fontWeight: 400,
            }}
          >
            Creative Developer crafting digital experiences with motion, liquid
            precision, and immersive textures.
          </p>

          <button
            onClick={scrollToProjects}
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "#8b5cf6",
              color: "#0f0b16",
              padding: "16px 32px",
              borderRadius: "100px",
              fontSize: "16px",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
            }}
          >
            View Projects
            <span
              style={{
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "8px",
              }}
            >
              <ArrowDownRight style={{ width: 20, height: 20 }} />
            </span>
          </button>
        </div>

        {/* Visuals */}
        <div
          style={{
            position: "relative",
            width: "450px",
            height: "600px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          {/* Liquid Frame */}
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              boxShadow: "0 40px 80px rgba(0, 0, 0, 0.4)",
              background: "#191419",
            }}
          >
            <img
              src="/tanya-portrait.jpg"
              alt="Tanya Chisepo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </div>

          {/* Floating Badge */}
          <div
            style={{
              position: "absolute",
              bottom: "80px",
              left: "-60px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px 24px",
              borderRadius: "12px",
              background: "rgba(20, 16, 24, 0.4)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkles style={{ width: 24, height: 24, color: "#6ee7b7" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#eae6f6",
                }}
              >
                Software
              </div>
              <div style={{ fontSize: "12px", color: "#a99bd6" }}>
                Engineer
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1023px) {
          section > div:last-of-type {
            flex-direction: column !important;
            gap: 48px;
          }
          section > div:last-of-type h1 {
            font-size: 92px !important;
            letter-spacing: -3px !important;
          }
          section > div:last-of-type h1 span {
            padding-left: 40px !important;
          }
          section > div:last-of-type p {
            font-size: 18px !important;
          }
          section > div:last-of-type > div:last-child {
            width: 360px !important;
            height: 480px !important;
          }
        }

        @media (max-width: 639px) {
          section {
            padding: 60px 24px 80px !important;
          }
          section > div:last-of-type h1 {
            font-size: 56px !important;
            letter-spacing: -2px !important;
          }
          section > div:last-of-type h1 span {
            padding-left: 16px !important;
          }
          section > div:last-of-type p {
            font-size: 16px !important;
            max-width: 320px !important;
          }
          section > div:last-of-type > div:last-child {
            width: 280px !important;
            height: 370px !important;
          }
          section > div:last-of-type > div:last-child > div:last-child {
            left: -20px !important;
            bottom: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
