import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Clock, IndianRupee, Wrench, CheckCircle2, Sparkles, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { services } from "@/data/services";
import heroImg from "@/assets/hero-technician.jpg";

const benefits = [
  { icon: Clock, title: "Same-Day Service", desc: "Book today and our technician reaches your home within hours across Delhi NCR." },
  { icon: IndianRupee, title: "Affordable Pricing", desc: "Transparent rates with no hidden charges. Pay only after the repair is complete." },
  { icon: ShieldCheck, title: "30-Day Warranty", desc: "Every repair is backed by a service warranty and genuine spare parts." },
  { icon: Wrench, title: "Expert Technicians", desc: "10+ years of experience with all major brands of home appliances." },
];

const stats = [
  { value: "50K+", label: "Happy customers" },
  { value: "10+", label: "Years experience" },
  { value: "40+", label: "Certified pros" },
  { value: "4.9", label: "Average rating" },
];

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "FixFast Services",
    description: "Home appliance repair in Delhi — AC, refrigerator, washing machine and microwave repair.",
    url: "https://fixfastservices.in",
    telephone: "+91-11-4000-0000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Connaught Place",
      addressLocality: "New Delhi",
      postalCode: "110001",
      addressCountry: "IN",
    },
    areaServed: "Delhi NCR",
    openingHours: "Mo-Su 08:00-21:00",
  };

  return (
    <>
      <SEO
        title="Home Appliance Repair in Delhi | FixFast Services"
        description="Trusted home appliance repair in Delhi for AC, refrigerator, washing machine & microwave. Same-day service, affordable pricing, expert technicians."
        path="/"
        keywords="home appliance repair in Delhi, AC repair Delhi, refrigerator repair, washing machine repair, microwave repair"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-soft">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-blob" aria-hidden />
        <div className="pointer-events-none absolute top-40 -left-32 h-80 w-80 rounded-full bg-accent/20 blur-3xl animate-blob" style={{ animationDelay: "4s" }} aria-hidden />

        <div className="container relative py-20 md:py-28 grid lg:grid-cols-2 gap-14 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Serving Delhi NCR since 2014
            </span>
            <h1 className="mt-5 font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Home appliance repair,{" "}
              <span className="text-gradient">done right.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Same-day repair for air conditioners, refrigerators, washing
              machines and microwaves across Delhi. Skilled technicians,
              genuine parts, 30-day warranty.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="cta" size="lg">
                <Link to="/contact">Book a Service <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-9 w-9 rounded-full border-2 border-background bg-gradient-hero shadow-sm" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  <span className="font-semibold text-foreground">4.9/5</span> from 12,000+ Delhi customers
                </p>
              </div>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-hero opacity-20 blur-2xl" aria-hidden />
            <img
              src={heroImg}
              alt="FixFast technician repairing a split AC in a Delhi home"
              width={1280}
              height={896}
              loading="eager"
              className="relative rounded-[2rem] shadow-elegant w-full h-auto object-cover"
            />
            {/* Floating cards */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-background shadow-elegant p-4 flex items-center gap-3 border border-border/60 hidden sm:flex">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">30-day warranty</div>
                <div className="text-xs text-muted-foreground">On every repair</div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 rounded-2xl bg-background shadow-elegant p-4 flex items-center gap-3 border border-border/60 hidden sm:flex">
              <div className="h-10 w-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">Same-day visit</div>
                <div className="text-xs text-muted-foreground">Across Delhi NCR</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border/60 bg-background">
        <div className="container py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-foreground">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Services</span>
              <h2 className="mt-2 font-display text-3xl md:text-5xl font-bold tracking-tight">Expert care for every appliance</h2>
              <p className="mt-4 text-lg text-muted-foreground">From quick fixes to complex repairs — one trusted partner for every appliance in your home.</p>
            </div>
            <Link to="/services" className="text-primary font-semibold hover:gap-2 inline-flex items-center gap-1 transition-all">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                to={s.href}
                className="group relative rounded-2xl border border-border/60 bg-card p-7 shadow-card hover:shadow-elegant hover:-translate-y-1 hover:border-primary/30 transition-all duration-300"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-hero text-primary-foreground flex items-center justify-center mb-5 shadow-elegant group-hover:scale-110 transition-transform">
                    <s.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display font-semibold text-lg">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gradient-soft py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Why FixFast</span>
            <h2 className="mt-2 font-display text-3xl md:text-5xl font-bold tracking-tight">Built on trust. Delivered with care.</h2>
            <p className="mt-4 text-lg text-muted-foreground">Speed, transparency and quality — built into every service call.</p>
          </div>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="group rounded-2xl border border-border/60 bg-background p-7 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all">
                <div className="h-12 w-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-semibold text-lg">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">How it works</span>
          <h2 className="mt-2 font-display text-3xl md:text-5xl font-bold tracking-tight">A repair, in three simple steps</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Book online or call", desc: "Tell us what's wrong in under 60 seconds." },
            { step: "02", title: "Technician arrives", desc: "A certified pro reaches your doorstep — same day." },
            { step: "03", title: "Fixed & guaranteed", desc: "Pay after the repair. Backed by a 30-day warranty." },
          ].map((s, i) => (
            <div key={s.step} className="relative rounded-2xl border border-border/60 bg-card p-8 shadow-card">
              <div className="font-display text-5xl font-bold text-primary/15">{s.step}</div>
              <h3 className="mt-3 font-display font-semibold text-xl">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.desc}</p>
              {i < 2 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 h-7 w-7 text-primary/30" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 md:p-16 text-primary-foreground text-center shadow-elegant">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">Need an appliance fixed today?</h2>
            <p className="mt-4 text-primary-foreground/90 text-lg max-w-xl mx-auto">
              Book a same-day visit from a certified FixFast technician anywhere in Delhi.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button asChild variant="cta" size="lg"><Link to="/contact">Book Service Now</Link></Button>
              <Button asChild variant="hero" size="lg"><a href="tel:+911140000000">Call +91 11 4000 0000</a></Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
