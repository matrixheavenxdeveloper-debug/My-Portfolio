import { useEffect, useState } from "react";
import { Menu, X, Zap, ZapOff } from "lucide-react";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { perfMode, togglePerfMode } = usePerformanceMode();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    requestAnimationFrame(() => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (href === "#hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen ? "glass-strong shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
            className="text-xl font-bold font-display text-gradient-gold"
        >
          Heaven X
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={togglePerfMode}
            aria-label={perfMode ? "Disable performance mode" : "Enable performance mode"}
            title={perfMode ? "Performance mode on - animations reduced" : "Enable performance mode"}
            className="rounded-full glass p-2 text-muted-foreground transition-colors hover:text-primary"
          >
            {perfMode ? <ZapOff size={16} /> : <Zap size={16} />}
          </button>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_hsla(43,96%,56%,0.4)]"
          >
            Hire Me
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={togglePerfMode}
            aria-label={perfMode ? "Disable performance mode" : "Enable performance mode"}
            className="rounded-full glass p-2 text-muted-foreground"
          >
            {perfMode ? <ZapOff size={16} /> : <Zap size={16} />}
          </button>
          <button
            className="p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="overflow-hidden border-t border-border/40 glass-strong md:hidden">
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="border-b border-border/40 py-3 text-base text-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="mt-3 rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Hire Me
              </a>

              <button
                onClick={togglePerfMode}
                className="mt-2 flex items-center justify-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium text-foreground"
              >
                {perfMode ? <ZapOff size={16} /> : <Zap size={16} />}
                {perfMode ? "Performance Mode: ON" : "Enable Performance Mode"}
              </button>
            </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
