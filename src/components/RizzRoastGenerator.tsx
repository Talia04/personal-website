import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Flame, Copy, RefreshCw, Loader2, Check } from "lucide-react";
import { Slider } from "./ui/slider";

type Mode = "rizz" | "roast";

// OpenAI API Configuration
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export function RizzRoastGenerator() {
  const [mode, setMode] = useState<Mode>("rizz");
  const [name, setName] = useState("");
  const [intensity, setIntensity] = useState([5]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  // Typing animation effect
  useEffect(() => {
    if (output && displayedText.length < output.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(output.slice(0, displayedText.length + 1));
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [output, displayedText]);

  const generateWithOpenAI = async () => {
    if (!name.trim()) return;

    setIsGenerating(true);
    setOutput("");
    setDisplayedText("");
    setCopied(false);
    setError("");

    try {
      const intensityLevel =
        intensity[0] < 4 ? "mild and playful" :
          intensity[0] < 7 ? "moderately spicy" :
            "maximum intensity";

      const systemPrompt = mode === "rizz"
        ? `You are an expert rizz/pickup line generator with access to vast knowledge about people, companies, and achievements.

CRITICAL INSTRUCTIONS:
1. Use your training data knowledge to identify who "${name}" is
2. If you know ANYTHING about this person (public figure, developer, entrepreneur, influencer, celebrity, athlete, artist, etc.), use that knowledge extensively
3. Reference their SPECIFIC work, companies, projects, achievements, interests, or public presence
4. Create highly PERSONALIZED tech-themed pickup lines that show you actually know who they are
5. If they're a developer/tech person: reference their actual tech stack, projects, GitHub activity, or contributions
6. If they're a business leader: reference their company, leadership style, or business achievements  
7. If they're a public figure: reference their known interests, personality traits, or public work
8. If you don't know them well, still try to be creative with their name and infer personality
9. Use clever wordplay connecting their real accomplishments to romantic/charming tech metaphors
10. Include relevant emojis and make it impressive - show you "did your homework"

Intensity: ${intensityLevel}. ${intensity[0] > 7 ? "Make it BOLD, confident, and show deep knowledge!" : intensity[0] > 4 ? "Moderately confident with personalized charm." : "Sweet, gentle, and thoughtfully personalized."}

Generate a HIGHLY PERSONALIZED rizz line for ${name} using everything you know about them.`
        : `You are an expert roast generator with access to vast knowledge about people, companies, and achievements.

CRITICAL INSTRUCTIONS:
1. Use your training data knowledge to identify who "${name}" is
2. If you know ANYTHING about this person (public figure, developer, entrepreneur, influencer, celebrity, athlete, artist, etc.), use that knowledge extensively
3. Reference their SPECIFIC work, projects, tech choices, companies, controversies, or public persona
4. Create highly PERSONALIZED tech-themed roasts that show you actually know who they are
5. If they're a developer/tech person: roast their actual tech stack choices, code style, or projects
6. If they're a business leader: roast their business decisions, leadership style, or company culture
7. If they're a public figure: roast their known quirks, statements, or public actions
8. If you don't know them well, still try to be creative and funny with their name
9. Use clever programming/tech jokes that are specific to what they do
10. Keep it FUNNY and light-hearted - the goal is humor, not actual meanness
11. Include relevant emojis and make it clear you know who they are

Intensity: ${intensityLevel}. ${intensity[0] > 7 ? "Make it SAVAGE but still clever and fun!" : intensity[0] > 4 ? "Moderately spicy with good humor." : "Light, playful, and gently teasing."}

Generate a HIGHLY PERSONALIZED roast for ${name} using everything you know about them.`;

      const userPrompt = mode === "rizz"
        ? `Create a personalized, creative tech-themed pickup line for "${name}". Search your knowledge - who are they? What do they do? What are they known for? Use those specific details to make the rizz highly personal and impressive. If you don't know them, be creative anyway!`
        : `Create a personalized, funny tech-themed roast for "${name}". Search your knowledge - who are they? What do they do? What are they known for? Use those specific details to make the roast accurate and hilarious. If you don't know them, be creative anyway!`;

      const response = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4-turbo-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          max_tokens: 250,
          temperature: 0.85,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // If GPT-4 fails, fallback to GPT-3.5
        if (response.status === 404 || errorData.error?.code === 'model_not_found') {
          const fallbackResponse = await fetch(OPENAI_API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
              ],
              max_tokens: 200,
              temperature: 0.9,
            }),
          });

          if (!fallbackResponse.ok) {
            throw new Error("Failed to generate response");
          }

          const fallbackData = await fallbackResponse.json();
          const result = fallbackData.choices[0]?.message?.content?.trim() || "No response generated.";
          setOutput(result);
          return;
        }

        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
      }

      const data = await response.json();
      const result = data.choices[0]?.message?.content?.trim() || "No response generated.";

      setOutput(result);
    } catch (err) {
      console.error("Error generating response:", err);
      setError(err instanceof Error ? err.message : "Failed to generate response.");

      // Enhanced fallback templates
      const fallbackTemplates = mode === "rizz"
        ? [
          `Hey ${name}, are you a perfectly optimized algorithm? Because you're running through my mind at O(1) complexity. ${intensity[0] > 7 ? "🔥 Let's merge our branches and create something beautiful." : "💫"}`,
          `${name}, if you were a framework, you'd be the one everyone wants to learn but nobody can truly master. ${intensity[0] > 6 ? "Lucky for you, I'm willing to read all the documentation." : "💙"}`,
          `I'd refactor my entire codebase for you, ${name}. ${intensity[0] > 7 ? "And trust me, that's saying something because I NEVER refactor. 🚀" : "That's commitment right there. 💖"}`,
        ]
        : [
          `${name}, your code has more technical debt than a startup that pivoted 47 times. ${intensity[0] > 7 ? "Did you learn Git from a fortune cookie? 😂" : "🐛"}`,
          `I've seen AI-generated code with better practices than yours, ${name}. ${intensity[0] > 6 ? "And that's saying something because AI still can't figure out what a semicolon is for. 💀" : "🤔"}`,
          `${name}, your GitHub contributions graph looks like my motivation on a Monday morning. ${intensity[0] > 8 ? "Flat, empty, and desperately needing caffeine. 🌵" : "📊"}`,
        ];

      const fallback = fallbackTemplates[Math.floor(Math.random() * fallbackTemplates.length)];
      setOutput(fallback);

      setTimeout(() => setError(""), 3000);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Pane - Input */}
        <div className="space-y-6">
          {/* Mode Toggle */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMode("rizz")}
              className={`relative p-4 rounded-2xl border transition-all duration-300 ${mode === "rizz"
                ? "border-[#c084fc]/50 bg-[#c084fc]/10"
                : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
            >
              {mode === "rizz" && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#c084fc]" />
              )}
              <MessageCircle className={`mx-auto mb-2 ${mode === "rizz" ? 'text-[#c084fc]' : 'text-white/40'}`} size={24} />
              <span className={`block text-sm font-medium ${mode === "rizz" ? 'text-[#c084fc]' : 'text-white/60'}`}>
                Rizz Mode
              </span>
            </button>
            <button
              onClick={() => setMode("roast")}
              className={`relative p-4 rounded-2xl border transition-all duration-300 ${mode === "roast"
                ? "border-[#ff6b6b]/50 bg-[#ff6b6b]/10"
                : "border-white/10 bg-white/[0.02] hover:border-white/20"
                }`}
            >
              {mode === "roast" && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#ff6b6b]" />
              )}
              <Flame className={`mx-auto mb-2 ${mode === "roast" ? 'text-[#ff6b6b]' : 'text-white/40'}`} size={24} />
              <span className={`block text-sm font-medium ${mode === "roast" ? 'text-[#ff6b6b]' : 'text-white/60'}`}>
                Roast Mode
              </span>
            </button>
          </div>

          {/* Name Input */}
          <div>
            <label className="text-white/40 text-[10px] uppercase tracking-wider block mb-2">
              Enter Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Try: Elon Musk, Taylor Swift, or anyone..."
              className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#c084fc]/50 transition-colors"
              onKeyDown={(e) => {
                if (e.key === "Enter" && name.trim() && !isGenerating) {
                  generateWithOpenAI();
                }
              }}
            />
          </div>

          {/* Intensity Slider */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-white/40 text-[10px] uppercase tracking-wider">
                Intensity
              </label>
              <span className="text-white font-bold">{intensity[0]}/10</span>
            </div>
            <Slider
              value={intensity}
              onValueChange={setIntensity}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-white/30 mt-2">
              <span>Playful</span>
              <span>Moderate</span>
              <span>Savage</span>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateWithOpenAI}
            disabled={!name.trim() || isGenerating}
            className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${mode === "rizz"
              ? "bg-[#c084fc] hover:bg-[#d084fc] text-white"
              : "bg-[#ff6b6b] hover:bg-[#ff7b7b] text-white"
              }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Generating...
              </>
            ) : (
              <>
                {mode === "rizz" ? <MessageCircle size={18} /> : <Flame size={18} />}
                Generate {mode === "rizz" ? "Rizz" : "Roast"}
              </>
            )}
          </button>

          {/* Quick Examples */}
          <div className="flex flex-wrap gap-2">
            {["Elon Musk", "Taylor Swift", "Linus Torvalds"].map((example) => (
              <button
                key={example}
                onClick={() => setName(example)}
                className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm"
            >
              ⚠️ {error}
            </motion.div>
          )}
        </div>

        {/* Right Pane - Output */}
        <div
          className={`min-h-[400px] p-6 rounded-2xl border transition-all duration-300 ${mode === "rizz"
            ? "border-[#c084fc]/20 bg-[#c084fc]/5"
            : "border-[#ff6b6b]/20 bg-[#ff6b6b]/5"
            }`}
        >
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full min-h-[350px] gap-4"
              >
                <Loader2
                  className={`animate-spin ${mode === "rizz" ? "text-[#c084fc]" : "text-[#ff6b6b]"}`}
                  size={40}
                />
                <p className="text-white/40 text-sm">
                  Searching knowledge base for "{name}"...
                </p>
              </motion.div>
            ) : output ? (
              <motion.div
                key="output"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-xs">AI Generated</span>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <button
                      onClick={generateWithOpenAI}
                      disabled={isGenerating}
                      className="flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors"
                    >
                      <RefreshCw size={14} />
                      New
                    </button>
                  </div>
                </div>

                <div className={`text-lg leading-relaxed ${mode === "rizz" ? "text-[#c084fc]" : "text-[#ff6b6b]"}`}>
                  {displayedText}
                  {displayedText.length < output.length && (
                    <span className="animate-pulse ml-1">|</span>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full min-h-[350px] text-center gap-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className={mode === "rizz" ? "text-[#c084fc]/30" : "text-[#ff6b6b]/30"}
                >
                  {mode === "rizz" ? <MessageCircle size={48} /> : <Flame size={48} />}
                </motion.div>
                <p className="text-white/30 text-sm">
                  Enter a name and generate {mode === "rizz" ? "personalized rizz" : "a custom roast 🔥"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Info footer */}
      <div className="text-center">
        <p className="text-white/20 text-xs">
          Powered by AI • Entertainment purposes only
        </p>
      </div>
    </div>
  );
}
