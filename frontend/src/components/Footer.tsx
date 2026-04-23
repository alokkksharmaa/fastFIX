import { Link } from "react-router-dom";
import { Wrench, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 bg-foreground text-background/75">
      <div className="container py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-xl text-background">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero shadow-elegant">
              <Wrench className="h-5 w-5" />
            </span>
            FixFast<span className="text-primary">.</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed max-w-sm">
            Trusted home appliance repair in Delhi. Fast, affordable and reliable
            service for AC, refrigerator, washing machine and microwave.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-background/15 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-sm font-display font-semibold text-background mb-4">Services</h2>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/services/ac-repair-delhi" className="hover:text-primary transition-colors">AC Repair</Link></li>
            <li><Link to="/services/refrigerator-repair-delhi" className="hover:text-primary transition-colors">Refrigerator Repair</Link></li>
            <li><Link to="/services/washing-machine-repair-delhi" className="hover:text-primary transition-colors">Washing Machine</Link></li>
            <li><Link to="/services/microwave-repair-delhi" className="hover:text-primary transition-colors">Microwave Repair</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-sm font-display font-semibold text-background mb-4">Company</h2>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">All Services</Link></li>
            <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h2 className="text-sm font-display font-semibold text-background mb-4">Get in touch</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" /> Connaught Place, New Delhi 110001</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> <a href="tel:+911140000000" className="hover:text-background">+91 11 4000 0000</a></li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> <a href="mailto:hello@fixfastservices.in" className="hover:text-background">hello@fixfastservices.in</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container py-6 text-xs flex flex-col sm:flex-row gap-2 justify-between items-center text-background/55">
          <span>© {year} FixFast Services — Home Appliance Repair in Delhi.</span>
          <span>Crafted with care in New Delhi.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
