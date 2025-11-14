import { motion } from "motion/react";
import { ChevronDown, Home } from "lucide-react";
import { ResumeDownload } from "./ResumeDownload";
import { TypewriterText } from "./TypewriterText";
import { useState } from "react";

// Toggle to show/hide profile photo
const SHOW_PROFILE_PHOTO = false;

const profileImage = "/assets/profile_photo.jpg";
const helloWorldImage = "/assets/hello_world.png";

export function Hero() {
  const [isFlipped, setIsFlipped] = useState(false);

  const scrollToAbout = () => {
    document
      .querySelector("#about")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center px-6 lg:px-12 pt-20 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#1a1a1a]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#a8d500]/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#a8d500]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>
      <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side - Name */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-[#a8d500] mb-6 whitespace-nowrap"
            style={{
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 10vw, 6rem)",
              lineHeight: 1,
              letterSpacing: "-0.05em",
            }}
          >
            TANYA CHISEPO
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="text-white text-base sm:text-lg mb-8">
              <span className="text-white">
                A Zimbabwean computer science student with a
                passion for building from scratch.
              </span>{" "}
              <span className="text-[#a8d500]">
                I'm on a mission to become a software wizard,
                crafting Android and web projects while adding a
                touch of creativity to everything I do.
              </span>
            </p>
            <ResumeDownload />
          </motion.div>
        </motion.div>

        {/* Right Side - Profile Image */}
        {SHOW_PROFILE_PHOTO && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div
              className="relative"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
              >
                <div className="absolute inset-0 bg-[#a8d500]/20 blur-3xl rounded-full" />

                {/* Card container for flip effect */}
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                  className="relative w-64 h-64 lg:w-96 lg:h-96"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front side - Profile */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={profileImage}
                      alt="Tanya Chisepo"
                      className="rounded-full object-cover border-4 border-[#a8d500]/50 shadow-2xl cursor-pointer"
                      style={{
                        objectPosition: "center 40%",
                        width: "85%",
                        height: "85%",
                      }}
                    />
                  </div>

                  {/* Back side - Hello World */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <img
                      src={helloWorldImage}
                      alt="Hello World"
                      className="w-full h-full rounded-full object-cover border-4 border-[#a8d500]/50 shadow-2xl cursor-pointer"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 right-12 flex gap-6"
      >
        <motion.button
          onClick={scrollToAbout}
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-[#a8d500] hover:text-white transition-colors"
        >
          <ChevronDown size={48} strokeWidth={3} />
        </motion.button>
        <motion.button
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="text-[#a8d500] hover:text-white transition-colors"
        >
          <Home size={48} strokeWidth={3} />
        </motion.button>
      </motion.div>
    </section>
  );
}