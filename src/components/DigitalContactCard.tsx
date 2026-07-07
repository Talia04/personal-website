import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import "./DigitalContactCard.css";

export function DigitalContactCard() {
  useEffect(() => {
    document.title = "Tanya Chisepo · Private Access";
    return () => { document.title = "Tanya Chisepo | Software Engineer"; };
  }, []);

  return (
    <main className="card-resource-page">
      <a className="card-resource-back" href="/tech" aria-label="Back to Tanya Chisepo's portfolio">
        <ArrowLeft size={15} aria-hidden="true" />
        Portfolio
      </a>
      <iframe
        className="card-resource-frame"
        src="/card-experience.html"
        title="Tanya Chisepo interactive digital contact card"
        allow="clipboard-write"
      />
    </main>
  );
}
