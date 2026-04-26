import { motion } from "framer-motion";
import { ArrowUp, GitBranch, Globe, Mail } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com", icon: GitBranch },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Globe },
  { label: "Instagram", href: "https://instagram.com", icon: Mail },
];

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-12 grid gap-10 md:grid-cols-3 md:gap-12">
          <div>
            <h3 className="mb-4 text-2xl font-display font-bold text-gradient-gold">Heaven X</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Premium mobile and web app development for businesses that want to stand out and grow fast.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["About", "Services", "Process", "Testimonials", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Follow Me</h4>
            <div className="flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  aria-label={social.label}
                  className="rounded-xl glass p-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            Copyright 2026 Heaven X Mobile and Web Apps Developer. All rights reserved.
          </p>
          <button
            onClick={scrollTop}
            className="rounded-full glass p-3 text-primary transition-all hover:glow-gold"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
