import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Wrench, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-card"
          : "bg-background/0 border-b border-transparent"
      )}
    >
      <div className="container flex h-16 md:h-18 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg" aria-label="FixFast Services Home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-elegant">
            <Wrench className="h-5 w-5" />
          </span>
          <span className="tracking-tight">FixFast<span className="text-primary">.</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 rounded-full border border-border/60 bg-background/60 backdrop-blur p-1" aria-label="Primary">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-foreground text-background shadow-sm"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+911140000000" className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            <Phone className="h-4 w-4" /> +91 11 4000 0000
          </a>
          <Button asChild variant="cta" size="sm">
            <Link to="/contact">Book Service</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-secondary"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-in" aria-label="Mobile">
          <div className="container flex flex-col py-4 gap-1">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-xl px-4 py-3 text-base font-medium",
                    isActive ? "bg-secondary text-primary" : "text-foreground/80"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button asChild variant="cta" className="mt-3">
              <Link to="/contact" onClick={() => setOpen(false)}>Book Service</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
