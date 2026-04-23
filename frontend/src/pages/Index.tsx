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
  { value: "50K+", label: "Happy Customers" },
  { value: "10+", label: "Years Experience" },
  { value: "40+", label: "Certified Pros" },
  { value: "4.9", label: "Average Rating" },
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

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
        <div className="absolute inset-0 bg-background" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" aria-hidden="true" />
        <div className="absolute inset-y-0 left-0 w-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05]" aria-hidden="true" />
        
        {/* Animated glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[128px] animate-blob" aria-hidden="true" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-blob animation-delay-2000" aria-hidden="true" />

        <div className="container relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-sm font-medium text-primary mb-6 shadow-sm">
              <Sparkles className="h-4 w-4" /> <span>Premium Appliance Care in Delhi NCR</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-foreground">
              Smart repair for your <br />
              <span className="text-gradient">modern home.</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              Experience hassle-free, same-day repairs for your AC, refrigerator, washing machine, and microwave. Delivered by certified experts with a 30-day guarantee.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-base rounded-full bg-gradient-cta shadow-elegant hover:opacity-90 transition-opacity">
                <Link to="/contact">Book an Expert <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base rounded-full glass border-border/50 hover:bg-secondary/50">
                <Link to="/services">View Services</Link>
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-6 p-4 rounded-2xl glass-card inline-flex">
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                ].map((src, i) => (
                  <img key={i} src={src} alt="Customer" className="h-12 w-12 rounded-full border-2 border-background object-cover shadow-sm" />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <span className="text-sm font-medium mt-1">Trusted by 50,000+ homes</span>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[600px] flex items-center justify-center animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[3rem] rotate-3 blur-sm"></div>
            <img
              src={heroImg}
              alt="Technician repairing"
              className="relative z-10 w-full h-[500px] object-cover rounded-[2.5rem] shadow-elegant border border-border/50"
            />
            {/* Floating Glass Cards */}
            <div className="absolute top-10 -left-8 z-20 glass-card p-4 rounded-2xl flex items-center gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-foreground">Under 2 Hours</p>
                <p className="text-xs text-muted-foreground">Response time</p>
              </div>
            </div>
            <div className="absolute bottom-12 -right-8 z-20 glass-card p-4 rounded-2xl flex items-center gap-4 animate-fade-up" style={{ animationDelay: '0.6s' }}>
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-foreground">100% Guaranteed</p>
                <p className="text-xs text-muted-foreground">30-day warranty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="relative z-20 -mt-12">
        <div className="container">
          <div className="glass-card rounded-[2rem] p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/50">
            {stats.map((s, i) => (
              <div key={s.label} className={`text-center ${i % 2 === 0 ? 'border-none md:border-solid' : 'border-none'} ${i === 0 ? 'border-none' : ''}`}>
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">{s.value}</div>
                <div className="text-sm font-medium text-muted-foreground tracking-wide uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 md:py-32 relative">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">Premium care for every device</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We specialize in fixing modern home appliances using advanced diagnostics and genuine manufacturer parts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <Link
                key={s.slug}
                to={s.href}
                className="group glass-card p-8 rounded-[2rem] hover:-translate-y-2 transition-all duration-400 hover:shadow-glow hover:border-primary/30 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-hero text-white flex items-center justify-center mb-8 shadow-elegant group-hover:scale-110 transition-transform duration-500">
                    <s.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">{s.short}</p>
                  <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                    Explore Service <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-secondary/30 border-y border-border/50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">A seamless experience from start to finish</h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                We've reimagined appliance repair to be as effortless as ordering a ride. No waiting, no hidden fees.
              </p>
              
              <div className="space-y-8">
                {[
                  { step: "01", title: "Book in 60 seconds", desc: "Select your appliance and preferred time slot online or over the phone." },
                  { step: "02", title: "Real-time tracking", desc: "Know exactly when your certified technician will arrive at your doorstep." },
                  { step: "03", title: "Transparent repair", desc: "Approve the upfront quote before any work begins. Pay only when satisfied." },
                ].map((s, i) => (
                  <div key={s.step} className="flex gap-6">
                    <div className="h-14 w-14 shrink-0 rounded-2xl bg-background shadow-sm border border-border/50 flex items-center justify-center font-display font-bold text-xl text-primary">
                      {s.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{s.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-[3rem] blur-2xl" />
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" 
                alt="Modern appliance repair" 
                className="relative w-full h-[600px] object-cover rounded-[2.5rem] shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5" />
        <div className="container relative z-10">
          <div className="glass-card rounded-[3rem] p-12 md:p-20 text-center max-w-5xl mx-auto overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
            
            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
                Ready to restore your home?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Join thousands of Delhi residents who trust FixFast for their premium appliance repair needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full bg-gradient-cta shadow-elegant">
                  <Link to="/contact">Schedule a Visit</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full glass hover:bg-secondary/50">
                  <a href="tel:+911140000000">Call Support</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
