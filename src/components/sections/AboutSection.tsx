import { motion } from "framer-motion";
import { Brain, Code, Palette, Rocket, Shield, Zap } from "lucide-react";

const highlights = [
  {
    icon: Code,
    title: "Full Stack Mastery",
    desc: "React, Node, and databases handled end to end.",
  },
  { icon: Palette, title: "Design Focused", desc: "Pixel-perfect UI that converts visitors." },
  { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed and performance." },
  { icon: Brain, title: "AI Powered", desc: "Integrating AI to make apps smarter." },
  { icon: Rocket, title: "Growth Driven", desc: "Built for revenue, not just looks." },
  { icon: Shield, title: "Reliable", desc: "Clean code, on-time delivery, always." },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <div className="flex h-60 w-60 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-accent/20 glow-gold sm:h-64 sm:w-64 md:h-80 md:w-80">
                <div className="flex h-52 w-52 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary sm:h-56 sm:w-56 md:h-72 md:w-72">
                  <span className="text-6xl font-display font-bold text-gradient-gold md:text-7xl">A</span>
                </div>
              </div>

              <motion.div
                className="absolute -right-2 top-2 rounded-xl glass px-3 py-2 text-xs font-semibold text-primary sm:-right-4 sm:-top-4 sm:px-4 sm:text-sm"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                2+ Years Exp
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-2 rounded-xl glass px-3 py-2 text-xs text-foreground sm:-left-4 sm:px-4 sm:text-sm"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                Top Rated
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-2 text-sm uppercase tracking-widest text-primary">About Me</p>
            <h2 className="mb-6 text-3xl font-display font-bold md:text-5xl">
              Hi, I&apos;m <span className="text-gradient-gold">Anandhraj</span>
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              I&apos;m a freelance web and app developer who believes every business deserves a premium digital
              presence. My focus is simple: build websites that do not just look beautiful, but actually
              <span className="font-medium text-primary"> generate revenue</span>.
            </p>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              From fast business websites to larger ecommerce and AI-integrated builds, I&apos;ve helped 40+
              clients improve their online presence and grow with confidence.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group cursor-default rounded-xl glass p-4 transition-all duration-300 hover:glow-gold"
                >
                  <item.icon className="mb-2 h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                  <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
