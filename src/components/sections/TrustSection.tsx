import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const logos = [
  "TechCorp",
  "StartupX",
  "DigitalFlow",
  "CloudNine",
  "BrandPro",
  "AppForge",
  "DataSync",
  "WebPulse",
  "InnovateCo",
  "ScaleFast",
];

const Counter = ({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center">
      <motion.div
        className="font-display text-4xl font-bold text-gradient-gold md:text-5xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
      >
        {isInView && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {value}
            {suffix}
          </motion.span>
        )}
      </motion.div>
      <p className="mt-2 text-sm uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
};

const TrustSection = () => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center text-sm uppercase tracking-widest text-muted-foreground"
        >
          Trusted by businesses across India
        </motion.p>

        <div className="relative mb-16 overflow-hidden sm:mb-20">
          <div className="flex w-max animate-marquee gap-4 sm:gap-8 md:gap-12">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="flex min-w-[132px] items-center justify-center rounded-xl glass px-5 py-3 sm:min-w-[160px] sm:px-8 sm:py-4"
              >
                <span className="font-semibold tracking-wide text-muted-foreground">{logo}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          <Counter value={53} suffix="+" label="Projects Completed" />
          <Counter value={40} suffix="+" label="Happy Clients" />
          <Counter value={7} suffix=" lakhs+" label="Revenue Generated" />
          <Counter value={99} suffix="%" label="Client Satisfaction" />
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
