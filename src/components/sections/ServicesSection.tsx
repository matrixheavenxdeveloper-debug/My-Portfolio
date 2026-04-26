import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Basic Plan",
    price: "Rs. 8,000 -\nRs. 15,000",
    description: "Perfect for small businesses getting started online.",
    features: [
      "Static Website",
      "3-5 Pages",
      "Fast Loading Speed",
      "Mobile Responsive",
      "SEO Basics",
      "1-2 Week Delivery",
    ],
    popular: false,
  },
  {
    name: "Pro Plan",
    price: "Rs. 16,000 -\nRs. 35,000",
    description: "For businesses ready to scale with advanced features.",
    features: [
      "Admin Panel",
      "Booking System",
      "Blog Integration",
      "Automation Features",
      "Priority Support",
      "2-3 Weeks Delivery",
    ],
    popular: true,
  },
  {
    name: "Advanced Plan",
    price: "Starting at Rs. 30,000",
    description: "Enterprise-grade solution for maximum growth.",
    features: [
      "Full Ecommerce Store",
      "Payment Integration",
      "User Login System",
      "AI Chatbot",
      "Marketing Tools",
      "Analytics Dashboard",
      "Ongoing Support",
      "4-6 Weeks Delivery",
    ],
    popular: false,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-2 text-sm uppercase tracking-widest text-primary">Services & Pricing</p>
          <h2 className="text-3xl font-display font-bold md:text-5xl">
            Choose Your <span className="text-gradient-gold">Growth Plan</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Every plan is crafted to deliver maximum ROI for your business.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className={`relative flex cursor-default flex-col rounded-2xl glass p-6 transition-all duration-500 sm:p-8 ${
                plan.popular ? "border-primary/40 glow-gold-strong" : "hover:glow-gold"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">
                  <Star size={12} /> Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="mt-3 whitespace-pre-line text-2xl font-display font-bold leading-tight text-gradient-gold">
                {plan.price}
              </p>
              <p className="mt-2 mb-6 text-sm text-muted-foreground">{plan.description}</p>

              <ul className="flex-1 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={`${plan.name}-${idx}`} className="flex items-start gap-2 text-sm text-foreground">
                    <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsla(43,96%,56%,0.4)]"
                    : "glass text-foreground hover:border-primary/40"
                }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
