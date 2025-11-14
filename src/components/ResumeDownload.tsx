import { motion, AnimatePresence } from "motion/react";
import { Download, X, Eye, ExternalLink } from "lucide-react";
import { useState } from "react";

export function ResumeDownload() {
  const [showPreview, setShowPreview] = useState(false);

  const hasPDF = true;
  const resumeFileName = "src/public/resume/Tanya.Chisepo_Resume_2025 (3).pdf";

  const handleDownload = () => {
    if (hasPDF) {
      // Download the PDF directly
      const link = document.createElement('a');
      link.href = `/${resumeFileName}`;
      link.download = "Tanya.Chisepo_Resume_2025.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleViewResume = () => {
    setShowPreview(true);
  };

  const handleOpenNewTab = () => {
    if (hasPDF) {
      window.open(`/${resumeFileName}`, '_blank');
    } else {
      window.open('/resume.html', '_blank');
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {/* View Resume Button */}
        <motion.button
          onClick={handleViewResume}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass-accent px-6 py-3 rounded-xl flex items-center gap-3 text-[#c4ff00] hover:bg-[#c4ff00]/20 transition-all duration-300 group"
        >
          <Eye size={20} className="group-hover:scale-110 transition-transform" />
          <span>View Resume</span>
        </motion.button>

        {/* Download Resume Button */}
        <motion.button
          onClick={handleDownload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass px-6 py-3 rounded-xl flex items-center gap-3 text-white border border-[#c4ff00]/30 hover:border-[#c4ff00]/60 hover:bg-[#c4ff00]/10 transition-all duration-300 group"
        >
          <Download size={20} className="text-[#c4ff00] group-hover:animate-bounce" />
          <span>Download Resume</span>
        </motion.button>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0d0d0d] rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border-2 border-[#c4ff00]/40"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#c4ff00]/20 bg-[#1a1a1a]">
                <div className="flex items-center gap-3">
                  <div className="bg-[#c4ff00]/20 p-2 rounded-lg border border-[#c4ff00]/30">
                    <Eye className="text-[#c4ff00]" size={20} />
                  </div>
                  <h3 className="text-white text-xl">Resume Preview</h3>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleDownload}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#c4ff00]/20 px-4 py-2 rounded-lg text-[#c4ff00] border border-[#c4ff00]/30 hover:bg-[#c4ff00]/30 transition-all duration-300 flex items-center gap-2"
                  >
                    <Download size={16} />
                    <span className="hidden sm:inline">Download PDF</span>
                  </motion.button>
                  <motion.button
                    onClick={handleOpenNewTab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#0d0d0d] px-4 py-2 rounded-lg text-white border border-white/30 hover:border-[#c4ff00]/50 hover:bg-[#1a1a1a] transition-all duration-300 flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    <span className="hidden sm:inline">Open</span>
                  </motion.button>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="text-white/60 hover:text-white transition-colors p-2 hover:bg-[#c4ff00]/20 rounded-lg"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-100px)] bg-gray-100">
                {hasPDF ? (
                  <iframe
                    src={`/${resumeFileName}#toolbar=0`}
                    className="w-full h-[800px] bg-white"
                    title="Resume Preview"
                  />
                ) : (
                  <iframe
                    src="/resume.html"
                    className="w-full h-[800px] bg-white"
                    title="Resume Preview"
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
