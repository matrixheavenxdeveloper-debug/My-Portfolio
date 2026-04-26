import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Zap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

const UrgencyPopup = () => {
  const [show, setShow] = useState(false);
  const isMobile = useIsMobile();
  const { perfMode } = usePerformanceMode();

  useEffect(() => {
    if (perfMode || isMobile) return;
    const timer = window.setTimeout(() => setShow(true), 12000);
    return () => window.clearTimeout(timer);
  }, [isMobile, perfMode]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-24 left-4 right-4 z-40 sm:left-6 sm:right-auto sm:max-w-sm"
        >
          <div className="relative rounded-2xl glass-strong p-6 glow-gold">
            <button
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close popup"
            >
              <X size={16} />
            </button>

            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-primary/10 p-2">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Make a Premium Website</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Crafted with luxury design, smart animations, and conversion-focused strategy. Let&apos;s build yours.
                </p>
                <a
                  href="#contact"
                  onClick={() => setShow(false)}
                  className="mt-3 inline-block rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:shadow-[0_0_20px_hsla(43,96%,56%,0.3)]"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UrgencyPopup;
