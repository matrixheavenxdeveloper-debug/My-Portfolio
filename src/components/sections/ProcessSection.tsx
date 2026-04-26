import { motion } from "framer-motion";
import { Code, MessageSquare, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Discussion",
    desc: "We understand your goals, audience, and requirements in detail.",
  },
  {
    icon: PenTool,
    title: "Design",
    desc: "Crafting wireframes and visual designs that match your brand identity.",
  },
  {
    icon: Code,
    title: "Development",
    desc: "Building with clean code, optimized for speed and scalability.",
  },
  {
    icon: Rocket,
    title: "Delivery",
    desc: "Testing, deployment, and handover with support for launch.",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="relative py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm uppercase tracking-widest text-primary">How I Work</p>
          <h2 className="text-3xl font-display font-bold md:text-5xl">
            My <span className="text-gradient-gold">Process</span>
          </h2>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute top-0 bottom-0 left-1/2 hidden w-px bg-border md:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`relative mb-8 flex flex-col items-center gap-4 last:mb-0 sm:mb-12 md:gap-8 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                <div className="rounded-2xl glass p-5 transition-all duration-300 hover:glow-gold sm:p-6">
                  <step.icon className="mb-3 h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">
                    Step {i + 1}: {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>

              <div className="z-10 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground md:flex">
                {i + 1}
              </div>

              <div className="hidden flex-1 md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
