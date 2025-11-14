import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { 
  Code2, 
  Database, 
  Brain, 
  Wrench,
  Coffee,
  FileCode,
  GitBranch,
  Network,
  Smartphone,
  Cpu,
  Eye,
  Target,
  RefreshCw,
  Palette,
  Camera,
  Globe,
  Sparkles,
  Bot,
  Box,
  Zap
} from "lucide-react";

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const skillCategories = [
    {
      icon: Code2,
      title: "Languages & Tools",
      skills: [
        { name: "Python", icon: FileCode },
        { name: "Java", icon: Coffee },
        { name: "JavaScript", icon: Zap },
        { name: "PHP", icon: Code2 },
        { name: "OCaml", icon: FileCode },
        { name: "SQL", icon: Database },
        { name: "GraphQL", icon: Network },
        { name: "Git", icon: GitBranch },
        { name: "VS Code", icon: Code2 },
      ],
    },
    {
      icon: Database,
      title: "Frameworks & Platforms",
      skills: [
        { name: "React.js", icon: Zap },
        { name: "Android", icon: Smartphone },
        { name: "PostgreSQL", icon: Database },
        { name: "MongoDB", icon: Database },
        { name: "Arduino", icon: Cpu },
        { name: ".NET", icon: Box },
        { name: "VB.NET", icon: Box },
      ],
    },
    {
      icon: Brain,
      title: "AI/ML & Libraries",
      skills: [
        { name: "TensorFlow", icon: Brain },
        { name: "OpenCV", icon: Eye },
        { name: "Mediapipe", icon: Target },
        { name: "CycleGAN", icon: RefreshCw },
        { name: "GANs", icon: Palette },
        { name: "Computer Vision", icon: Camera },
        { name: "Deep Learning", icon: Brain },
      ],
    },
    {
      icon: Wrench,
      title: "Concepts",
      skills: [
        { name: "Full-Stack Web Development", icon: Globe },
        { name: "Cross-Platform Mobile Devevelopment", icon: Smartphone },
        { name: "UI/UX Design", icon: Sparkles },
        { name: "UiPath RPA Development", icon: Bot },
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className="min-h-screen relative py-24 px-6 lg:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d]" />
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-[#c4ff00]/5 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-[#c4ff00] mb-12"
            style={{
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              lineHeight: 0.9,
            }}
          >
            SKILLS
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            const cardRef = useRef(null);
            const { scrollYProgress } = useScroll({
              target: cardRef,
              offset: ["start end", "end start"],
            });
            const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.9, 1, 1, 0.95]);
            const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);

            return (
              <motion.div
                key={category.title}
                ref={cardRef}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                style={{ scale, opacity }}
                className="glass-strong glass-hover p-8 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="glass-accent p-3 rounded-xl">
                    <Icon className="text-[#c4ff00]" size={28} />
                  </div>
                  <h3 className="text-white text-xl">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => {
                    const SkillIcon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                        whileHover={{ scale: 1.05 }}
                        className="glass px-4 py-2 rounded-full border-[#c4ff00]/30 text-white hover:bg-[#c4ff00]/10 transition-all duration-300 cursor-default flex items-center gap-2 group"
                      >
                        <SkillIcon 
                          size={18} 
                          className="text-[#c4ff00] group-hover:scale-110 transition-transform duration-300"
                        />
                        <span className="text-[#c4ff00]">{skill.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
