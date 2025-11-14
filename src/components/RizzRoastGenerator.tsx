import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Flame, Copy, RefreshCw, Loader2, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";

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
            `${name}, if you were a framework, you'd be the one everyone wants to learn but nobody can truly master. ${intensity[0] > 6 ? "Lucky for you, I'm willing to read all the documentation. ✨" : "💙"}`,
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
    <div className="glass-strong p-4 sm:p-6 lg:p-8 rounded-2xl">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Pane - Input */}
        <div className="space-y-6">
          <div>
            <h3 className="text-white text-xl sm:text-2xl mb-2">AI Rizz or Roast Generator</h3>
            <p className="text-white/60 text-sm">Just enter a name - AI does the research 🧠</p>
          </div>

          {/* Mode Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMode("rizz")}
              className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
                mode === "rizz"
                  ? "border-pink-500 glass-strong text-pink-400 shadow-lg shadow-pink-500/20"
                  : "glass border-white/20 text-white/60 hover:border-[#c4ff00]/30"
              }`}
            >
              <Sparkles className="inline mr-2" size={20} />
              Rizz Mode
            </button>
            <button
              onClick={() => setMode("roast")}
              className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
                mode === "roast"
                  ? "border-red-500 glass-strong text-red-400 shadow-lg shadow-red-500/20"
                  : "glass border-white/20 text-white/60 hover:border-[#c4ff00]/30"
              }`}
            >
              <Flame className="inline mr-2" size={20} />
              Roast Mode
            </button>
          </div>

          {/* Name Input */}
          <div>
            <Label htmlFor="name" className="text-white mb-2 block">
              Full Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Try: Elon Musk, Mark Zuckerberg, or anyone..."
              className="glass border-[#c4ff00]/30 text-white placeholder:text-white/40 text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter" && name.trim() && !isGenerating) {
                  generateWithOpenAI();
                }
              }}
            />
            <p className="text-white/40 text-xs mt-2">
              💡 <strong>Pro tip:</strong> Works great with famous people, developers, tech CEOs, influencers, or anyone!
            </p>
          </div>

          {/* Intensity Slider */}
          <div>
            <Label className="text-white mb-3 block">
              Intensity Level: <span className="text-[#c4ff00]">{intensity[0]}/10</span>
            </Label>
            <Slider
              value={intensity}
              onValueChange={setIntensity}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/60 mt-2">
              <span>😊 Playful</span>
              <span>🌶️ Moderate</span>
              <span>🔥 Savage</span>
            </div>
            <p className="text-white/60 text-sm mt-3 text-center">
              {intensity[0] < 4
                ? "Mild and sweet"
                : intensity[0] < 7
                ? "Moderately spicy"
                : "Maximum chaos"}
            </p>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generateWithOpenAI}
            disabled={!name.trim() || isGenerating}
            className={`w-full text-base py-6 ${
              mode === "rizz"
                ? "bg-pink-500 hover:bg-pink-600"
                : "bg-red-500 hover:bg-red-600"
            } text-white transition-all duration-300`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                AI is researching {name}...
              </>
            ) : (
              <>
                {mode === "rizz" ? (
                  <Sparkles className="mr-2" size={20} />
                ) : (
                  <Flame className="mr-2" size={20} />
                )}
                Generate {mode === "rizz" ? "Personalized Rizz" : "Custom Roast"}
              </>
            )}
          </Button>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-4 rounded-xl border-red-500/30 border-2"
            >
              <p className="text-red-400 text-sm">
                ⚠️ {error}
              </p>
              <p className="text-white/60 text-xs mt-2">
                Using creative fallback instead.
              </p>
            </motion.div>
          )}

          {/* Info Box */}
          <div className="glass p-4 rounded-xl border-[#c4ff00]/20 space-y-2">
            <p className="text-[#c4ff00] text-sm">
              ✨ <strong>Powered by OpenAI GPT-4</strong>
            </p>
            <p className="text-white/60 text-xs">
              🧠 AI searches its knowledge base to find info about the person - just like asking ChatGPT!
            </p>
            <p className="text-white/60 text-xs">
              🎯 Works best with public figures, but creative with anyone!
            </p>
            <p className="text-white/60 text-xs">
              ⚠️ Entertainment only - all outputs are AI-generated satire.
            </p>
          </div>

          {/* Examples */}
          <div className="glass p-4 rounded-xl border-white/10">
            <p className="text-white text-sm mb-2">🔥 Try these names:</p>
            <div className="flex flex-wrap gap-2">
              {["Elon Musk", "Taylor Swift", "Linus Torvalds", "Dwayne Johnson"].map((example) => (
                <button
                  key={example}
                  onClick={() => setName(example)}
                  className="text-xs px-3 py-1.5 rounded-lg glass-strong border border-[#c4ff00]/30 text-[#c4ff00] hover:bg-[#c4ff00]/10 transition-all"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane - Output */}
        <div>
          <div
            className={`h-full min-h-[400px] lg:min-h-[600px] glass-strong p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 ${
              mode === "rizz"
                ? "border-pink-500/30"
                : "border-red-500/30"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white">
                {output ? "✨ AI Generated" : "Output"}
              </h4>
              {output && (
                <div className="flex gap-2">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="border-[#c4ff00]/30 text-[#c4ff00] hover:bg-[#c4ff00]/10"
                  >
                    {copied ? (
                      <>
                        <Check size={16} className="mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} className="mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={generateWithOpenAI}
                    variant="outline"
                    size="sm"
                    className="border-[#c4ff00]/30 text-[#c4ff00] hover:bg-[#c4ff00]/10"
                    disabled={isGenerating}
                  >
                    <RefreshCw size={16} className="mr-1" />
                    New
                  </Button>
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-[300px] lg:h-[450px] gap-4"
                >
                  <Loader2
                    className={`animate-spin ${
                      mode === "rizz" ? "text-pink-500" : "text-red-500"
                    }`}
                    size={56}
                  />
                  <div className="text-white/60 text-center space-y-2">
                    <motion.p
                      className="text-base"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🔍 Searching knowledge base for "{name}"...
                    </motion.p>
                    <p className="text-sm">Analyzing public information...</p>
                    <p className="text-sm">Crafting personalized response...</p>
                  </div>
                </motion.div>
              ) : output ? (
                <motion.div
                  key="output"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div
                    className={`${
                      mode === "rizz" ? "text-pink-300" : "text-red-300"
                    } text-base sm:text-lg leading-relaxed`}
                  >
                    {displayedText}
                    {displayedText.length < output.length && (
                      <span className="animate-pulse ml-1">|</span>
                    )}
                  </div>
                  
                  {displayedText.length === output.length && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="glass p-4 rounded-lg border-[#c4ff00]/20"
                    >
                      <p className="text-white/60 text-xs mb-2">
                        💡 <strong>Want different results?</strong>
                      </p>
                      <p className="text-white/60 text-xs">
                        • Adjust the intensity slider
                      </p>
                      <p className="text-white/60 text-xs">
                        • Click "New" to regenerate
                      </p>
                      <p className="text-white/60 text-xs">
                        • Try switching between Rizz & Roast modes
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full min-h-[300px] lg:min-h-[450px] text-center px-4 gap-6"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={mode === "rizz" ? "text-pink-500/30" : "text-red-500/30"}
                  >
                    {mode === "rizz" ? (
                      <Sparkles size={72} strokeWidth={1.5} />
                    ) : (
                      <Flame size={72} strokeWidth={1.5} />
                    )}
                  </motion.div>
                  <div className="space-y-3">
                    <p className="text-white/60 text-lg">
                      Ready to generate {mode === "rizz" ? "personalized rizz" : "a custom roast"}!
                    </p>
                    <p className="text-white/40 text-sm max-w-md">
                      Enter any name above and let AI search its knowledge base to create 
                      {mode === "rizz" ? " charming pickup lines ✨" : " savage roasts 🔥"}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
