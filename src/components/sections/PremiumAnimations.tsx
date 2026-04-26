import { Sparkles, Star, Diamond, Crown, Gem, Zap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

const ICONS = [Sparkles, Star, Diamond, Crown, Gem, Zap];

const FLOATER_COUNT = 8;
const FLOATERS = Array.from({ length: FLOATER_COUNT }).map((_, i) => {
  const Icon = ICONS[i % ICONS.length];
  const left = (i * 37) % 100;
  const top = (i * 53) % 100;
  const size = 12 + ((i * 7) % 18);
  const duration = 10 + ((i * 3) % 12);
  const delay = (i % 6) * 0.6;
  const opacity = 0.05 + ((i % 5) * 0.03);
  return { Icon, left, top, size, duration, delay, opacity, key: i };
});

const PremiumAnimations = () => {
  const isMobile = useIsMobile();
  const { perfMode } = usePerformanceMode();

  if (isMobile || perfMode) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, hsla(43, 96%, 56%, 0.06) 0%, transparent 60%), radial-gradient(circle at 70% 80%, hsla(36, 100%, 50%, 0.05) 0%, transparent 60%)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full animate-float-slow"
        style={{
          background: "radial-gradient(circle, hsla(43, 96%, 56%, 0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full animate-float"
        style={{
          background: "radial-gradient(circle, hsla(36, 100%, 50%, 0.07) 0%, transparent 70%)",
          animationDuration: "24s",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full animate-float-slow"
        style={{
          background: "radial-gradient(circle, hsla(43, 96%, 56%, 0.06) 0%, transparent 70%)",
          animationDuration: "18s",
        }}
      />

      {FLOATERS.map(({ Icon, left, top, size, duration, delay, opacity, key }) => (
        <div
          key={key}
          className={key % 2 === 0 ? "absolute text-primary animate-float" : "absolute text-primary animate-float-slow"}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            opacity,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        >
          <Icon size={size} />
        </div>
      ))}
    </div>
  );
};

export default PremiumAnimations;
