import { motion, useInView } from "motion/react";
import { CheckCircle2, Layers3, Search, Smartphone } from "lucide-react";
import { useRef } from "react";
import { IphoneMockup } from "./ui/iphone-mockup";
import metaLogo from "../assets/meta-color.svg";
import "./NotableWork.css";

const savedCollectionScreens = [
  {
    src: "/meta-saved/collection-details.png",
    alt: "Facebook Saved collection details screen",
    label: "Collection details",
  },
  {
    src: "/meta-saved/manage-collection.png",
    alt: "Facebook manage collection bottom sheet with Add to collection action",
    label: "New entry point",
  },
  {
    src: "/meta-saved/add-from-saved-three.png",
    alt: "Facebook Add from saved screen with three selected items",
    label: "Bulk selection",
  },
];

const impactStats = [
  { value: "Production", label: "Shipped inside Facebook" },
  { value: "Billions", label: "Available on a global-scale surface" },
  { value: "Bulk add", label: "New collection-management workflow" },
];

const workflow = [
  { icon: Layers3, label: "Collection details" },
  { icon: Smartphone, label: "Manage collection" },
  { icon: Search, label: "Search saved items" },
  { icon: CheckCircle2, label: "Add multiple items" },
];

export function NotableWork() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });

  return (
    <section id="notable-work" ref={ref} className="notable-work">
      <div className="notable-work-inner">
        <motion.div
          className="notable-work-copy"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="notable-brand-header" aria-label="Meta Facebook production work">
            <img src={metaLogo} alt="Meta" className="notable-meta-logo" />
            <span className="notable-facebook-mark" aria-hidden="true">
              <svg viewBox="0 0 48 48" role="img">
                <path
                  fill="#0866ff"
                  d="M48 24.147C48 10.813 37.255 0 24 0S0 10.813 0 24.147C0 36.2 8.776 46.19 20.25 48V31.127h-6.094v-6.98h6.094v-5.32c0-6.052 3.583-9.395 9.066-9.395 2.626 0 5.372.472 5.372.472v5.941h-3.028c-2.982 0-3.91 1.861-3.91 3.772v4.53h6.656l-1.064 6.98H27.75V48C39.224 46.19 48 36.2 48 24.147Z"
                />
              </svg>
            </span>
          </div>
          <p className="editorial-eyebrow">Notable work / Meta production / Facebook app</p>
          <h2 className="notable-work-title">
            Saved Collections, upgraded from the collection itself.
          </h2>
          <p>
            I worked on Facebook's Saved Collections experience at Meta, adding the
            “Add to collection” entry point directly from the collection details screen.
            Before this, people could add an item to a collection while saving content
            elsewhere on Facebook, but they could not bulk-add saved items from inside
            the collection they were organizing.
          </p>
          <p>
            The shipped workflow lets people open a collection, choose “Add to
            collection,” search their saved content, select multiple saved posts,
            reels, links, or products, and add them in one action. Global Saved search
            work was completed separately but did not launch.
          </p>

          <div className="notable-work-stats">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + index * 0.08 }}
              >
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="notable-work-flow" aria-label="Saved Collections workflow">
            {workflow.map((step, index) => {
              const Icon = step.icon;
              return (
                <span key={step.label} className="notable-work-step">
                  <Icon size={15} />
                  {step.label}
                  {index < workflow.length - 1 && <i aria-hidden="true" />}
                </span>
              );
            })}
          </div>
        </motion.div>

        <div className="notable-phone-stage" aria-label="Saved Collections screenshots">
          {savedCollectionScreens.map((screen, index) => (
            <motion.figure
              key={screen.src}
              className={`notable-phone notable-phone-${index + 1}`}
              initial={{ opacity: 0, y: 54, rotate: index === 0 ? -5 : index === 2 ? 5 : 0 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: [0, index === 1 ? -14 : -8, 0],
                      rotate: index === 0 ? -4 : index === 2 ? 4 : 0,
                    }
                  : {}
              }
              transition={{
                opacity: { duration: 0.55, delay: 0.12 + index * 0.1 },
                y: {
                  duration: 4.2 + index * 0.35,
                  delay: 0.35 + index * 0.16,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: { duration: 0.75, delay: 0.16 + index * 0.1, ease: [0.16, 1, 0.3, 1] },
              }}
              whileHover={{ y: -22, rotate: 0, scale: 1.035 }}
            >
              <IphoneMockup src={screen.src} aria-label={screen.alt} />
              <figcaption>{screen.label}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
