import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Wrench, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

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
        "sticky top-0 z-50 w-full transition-all duration-400",
        scrolled
          ? "border-b border-border/50 bg-background/60 backdrop-blur-xl shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-xl" aria-label="FixFast Services Home">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-elegant">
            <Wrench className="h-5 w-5" />
          </span>
          <span className="tracking-tight text-foreground">FixFast<span className="text-primary">.</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 rounded-full border border-border/40 bg-background/40 backdrop-blur-md p-1.5 shadow-sm" aria-label="Primary">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-foreground text-background shadow-sm"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a href="tel:+918235445601" className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            <Phone className="h-4 w-4" /> +91 8235445601
          </a>
          <Button asChild variant="default" size="sm" className="rounded-full px-5 shadow-elegant bg-gradient-cta hover:opacity-90 transition-opacity">
            <Link to="/contact">Book Service</Link>
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 rounded-xl hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border/50 bg-background/80 backdrop-blur-xl animate-in slide-in-from-top-2" aria-label="Mobile">
          <div className="container flex flex-col py-6 gap-2">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-xl px-5 py-3.5 text-base font-medium transition-all",
                    isActive ? "bg-primary/10 text-primary font-semibold" : "text-foreground/80 hover:bg-secondary"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button asChild variant="default" className="mt-4 rounded-xl h-12 shadow-elegant bg-gradient-cta">
              <Link to="/contact" onClick={() => setOpen(false)}>Book Service Now</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
