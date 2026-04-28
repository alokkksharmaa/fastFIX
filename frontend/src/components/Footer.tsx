import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Wrench } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-2xl text-background">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-elegant">
                <Wrench className="h-5 w-5" />
              </span>
              <span>FastFixx<span className="text-primary">.</span></span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed max-w-xs">
              Delhi's most trusted home appliance repair service. Fast, reliable, and affordable solutions for all your appliance problems.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/aloksharma1097" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-sm" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/apnaudyog1/" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-sm" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://youtube.com/@alokk_sharma?si=QfOgtdr1r8gU3HfC" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-sm" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6 text-background">Services</h3>
            <ul className="space-y-4 text-sm text-background/70">
              <li><Link to="/services/ac-repair-delhi" className="hover:text-primary transition-colors">AC Repair</Link></li>
              <li><Link to="/services/refrigerator-repair-delhi" className="hover:text-primary transition-colors">Refrigerator Repair</Link></li>
              <li><Link to="/services/washing-machine-repair-delhi" className="hover:text-primary transition-colors">Washing Machine Repair</Link></li>
              <li><Link to="/services/microwave-repair-delhi" className="hover:text-primary transition-colors">Microwave Repair</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6 text-background">Company</h3>
            <ul className="space-y-4 text-sm text-background/70">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6 text-background">Contact Us</h3>
            <ul className="space-y-4 text-sm text-background/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>B-12, Connaught Place,<br />New Delhi 110001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href="tel:+918235445601" className="hover:text-primary transition-colors">+91 8235445601</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:aloksharma1097@gmail.com" className="hover:text-primary transition-colors">aloksharma1097@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/50">
          <p>© {new Date().getFullYear()} FastFixx Services. All rights reserved.</p>
          <p>Designed for excellence in Delhi NCR.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
