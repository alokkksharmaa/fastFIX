import { Link } from "react-router-dom";
import { Award, Target, Users, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import heroImg from "@/assets/hero-technician.jpg";

const About = () => (
  <>
    <SEO
      title="About FastFixx Services | Appliance Repair Experts in Delhi"
      description="Learn about FastFixx Services — Delhi's trusted home appliance repair company with 10+ years of experience, certified technicians and 50,000+ happy customers."
      path="/about"
      keywords="about FastFixx, appliance repair company Delhi"
    />

    <section className="relative overflow-hidden bg-gradient-soft">
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" aria-hidden />
      <div className="container relative py-20 md:py-24 max-w-4xl">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">About us</span>
        <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold tracking-tight">
          Delhi's trusted name for <span className="text-gradient">appliance repair.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
          Fast. Reliable. Affordable. We've been keeping Delhi homes running smoothly since 2014.
        </p>
      </div>
    </section>

    <section className="container py-20">
      {/* Two-column story */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-hero opacity-15 blur-2xl" aria-hidden />
          <img
            src={heroImg}
            alt="FastFixx technicians at work in Delhi"
            className="relative rounded-[2rem] shadow-elegant w-full h-auto object-cover"
          />
        </div>
        <div>
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our story</span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">A decade of doorstep repairs.</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            FastFixx Services was founded in 2014 with one simple goal — make
            appliance repair in Delhi easy, transparent and dependable. What started
            as a small two-person team has grown into a network of 40+ certified
            technicians serving thousands of homes and offices across Delhi NCR.
            Today we are proud to have completed over 50,000 successful repairs.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "10+ years of hands-on appliance experience",
              "40+ background-verified technicians",
              "50,000+ successful repairs across Delhi NCR",
              "Genuine spare parts & 30-day service warranty",
            ].map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-foreground/85">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mission/Vision/Experience/Area */}
      <div className="mt-20 grid md:grid-cols-2 gap-6">
        {[
          { Icon: Target, title: "Our Mission", color: "primary", text: "To deliver honest, on-time appliance repair that customers can trust — with clear pricing, genuine parts and a service warranty on every job." },
          { Icon: Award, title: "Our Vision", color: "primary", text: "To become the most trusted home services brand in India by combining skilled craftsmanship with a customer-first experience." },
          { Icon: Users, title: "Experience & Reliability", color: "accent", text: "Over a decade of hands-on experience repairing every major brand of AC, refrigerator, washing machine and microwave. Each technician is background-verified and trained on the latest models." },
          { Icon: MapPin, title: "Service Area", color: "accent", text: "We serve all of Delhi — South, North, East, West and Central — and neighbouring NCR areas including Noida, Gurugram, Ghaziabad and Faridabad." },
        ].map(({ Icon, title, color, text }) => (
          <div key={title} className="rounded-2xl border border-border/60 bg-card p-7 shadow-card hover:shadow-elegant transition-all">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-hero p-10 md:p-14 text-primary-foreground text-center shadow-elegant">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
        <h2 className="font-display text-2xl md:text-4xl font-bold">Ready to experience hassle-free repair?</h2>
        <p className="mt-3 text-primary-foreground/90 text-lg">Browse our <Link to="/services" className="underline underline-offset-4">services</Link> or get in touch with our team.</p>
        <Button asChild variant="cta" size="lg" className="mt-7"><Link to="/contact">Contact Us</Link></Button>
      </div>
    </section>
  </>
);

export default About;
