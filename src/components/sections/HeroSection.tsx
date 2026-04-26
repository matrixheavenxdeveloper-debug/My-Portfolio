import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformanceMode } from "@/hooks/use-performance-mode";
import DeviceShowcase from "./DeviceShowcase";

const roles = [
  "Full Stack Developer",
  "UI/UX Designer",
  "AI Integration Expert",
  "React Specialist",
];

const HeroSection = () => {
  const isMobile = useIsMobile();
  const { perfMode } = usePerformanceMode();
  const [roleIndex, setRoleIndex] = useState(0);
  const enableAmbientFx = !isMobile && !perfMode;

  useEffect(() => {
    const timeout = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2200);

    return () => window.clearInterval(timeout);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(43,96%,56%,0.06)_0%,transparent_70%)]" />

      {enableAmbientFx && (
        <>
          <div className="absolute right-[12%] top-24 hidden h-20 w-20 rounded-2xl border border-primary/20 glass animate-float lg:block" />
          <div className="absolute bottom-32 left-[10%] hidden h-14 w-14 rounded-full border border-primary/20 glass animate-float-slow lg:block" />
          <div className="absolute left-[20%] top-40 hidden h-3 w-3 rounded-full bg-primary/40 animate-float lg:block" />
        </>
      )}

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-10">
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-3 py-2 text-xs text-muted-foreground sm:mb-8 sm:px-4 sm:text-sm">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          Available for freelance projects
            </div>

            <h1 className="mx-auto max-w-5xl text-balance text-4xl font-display font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:mx-0 lg:text-7xl xl:text-[5.25rem]">
          I Build Websites That
          <br />
          <span className="text-gradient-gold">Generate Revenue</span>
            </h1>

            <div className="mx-auto mt-5 max-w-3xl px-2 text-base text-muted-foreground sm:mt-6 sm:text-lg md:text-xl lg:mx-0 lg:px-0">
              <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                {roles.map((role, index) => (
                  <span
                    key={role}
                    className={`rounded-full px-3 py-1 text-sm transition-colors sm:text-base ${
                      index === roleIndex ? "bg-primary text-primary-foreground" : "bg-secondary/60 text-muted-foreground"
                    }`}
                  >
                    {role}
                  </span>
                ))}
              </div>
              <p className="mt-4 leading-relaxed">
            Premium websites and digital products built to load fast, feel polished, and turn visitors into customers.
          </p>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row lg:justify-start">
          <a
            href="#contact"
            className="group flex min-w-[220px] items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_40px_hsla(43,96%,56%,0.4)] sm:px-8 sm:py-4 sm:text-lg"
          >
            Hire Me
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className="flex min-w-[220px] items-center justify-center rounded-full border border-border bg-secondary/40 px-7 py-3.5 text-base font-semibold text-foreground transition-colors duration-300 hover:border-primary/40 hover:text-primary sm:px-8 sm:py-4"
          >
            View Services
          </a>
            </div>

            <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-4 text-sm text-muted-foreground sm:mt-16 sm:grid-cols-3 sm:gap-6 lg:mx-0">
          {[
            { value: "53+", label: "Projects" },
            { value: "40+", label: "Clients" },
            { value: "Rs. 7 lakhs+", label: "Revenue Generated" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/70 bg-secondary/30 px-5 py-4 text-center"
            >
              <div className="text-xl font-bold text-foreground sm:text-2xl">{stat.value}</div>
              <div className="text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[560px]">
            <DeviceShowcase />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
