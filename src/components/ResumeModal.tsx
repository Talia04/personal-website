import { AnimatePresence, motion } from "motion/react";
import { Download, ExternalLink, X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./ResumeModal.css";

export const resumePath = "/documents/tanya-chisepo-resume-2026.pdf";

export function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="resume-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
        >
          <motion.section
            className="resume-modal"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className="resume-modal-header">
              <div>
                <span>Resume / 2026</span>
                <h2 id="resume-modal-title">Tanya Chisepo</h2>
              </div>
              <div className="resume-modal-actions">
                <a href={resumePath} target="_blank" rel="noreferrer" aria-label="Open resume in a new tab">
                  <ExternalLink size={16} />
                </a>
                <a href={resumePath} download aria-label="Download Tanya Chisepo's resume">
                  <Download size={16} />
                </a>
                <button type="button" className="resume-modal-exit" onClick={onClose}>
                  <X size={17} />
                  <span>Exit</span>
                </button>
              </div>
            </header>
            <div className="resume-frame">
              <iframe
                src={`${resumePath}#view=FitH&toolbar=1&navpanes=0`}
                title="Tanya Chisepo's resume"
                loading="eager"
              />
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
