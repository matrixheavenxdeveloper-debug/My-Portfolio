import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Dhinesh",
    role: "Content Creator",
    text: "Anandhraj built our ecommerce platform from scratch. Sales increased within the first month and the whole experience felt premium.",
    rating: 5,
    initials: "D",
  },
  {
    name: "Priya Sakthi",
    role: "Founder, StyleHub",
    text: "The website he created for us is stunning. Clients regularly compliment the design and the flow feels built for business.",
    rating: 5,
    initials: "PS",
  },
  {
    name: "Vikram Kumar",
    role: "E-commerce Business Owner",
    text: "Fast delivery, clean code, and a website that actually converts. Anandhraj has become our go-to developer for new projects.",
    rating: 5,
    initials: "VK",
  },
  {
    name: "Ananya",
    role: "Marketing Head",
    text: "We needed an AI-integrated dashboard and he delivered beyond expectations. Communication stayed clear and professional throughout.",
    rating: 5,
    initials: "A",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm uppercase tracking-widest text-primary">Testimonials</p>
          <h2 className="text-3xl font-display font-bold md:text-5xl">
            What Clients <span className="text-gradient-gold">Say</span>
          </h2>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl glass p-6 text-center sm:p-8 md:p-12"
            >
              <div className="mb-6 flex justify-center gap-1">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={20} className="fill-primary text-primary" />
                ))}
              </div>

              <p className="text-base italic leading-relaxed text-foreground sm:text-lg md:text-xl">
                &quot;{testimonials[current].text}&quot;
              </p>

              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-accent/20 font-bold text-primary">
                  {testimonials[current].initials}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{testimonials[current].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={prev}
              className="rounded-full glass p-3 text-foreground transition-colors hover:text-primary"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="rounded-full glass p-3 text-foreground transition-colors hover:text-primary"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
