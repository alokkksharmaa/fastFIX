import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { services } from "@/data/services";

const Services = () => (
  <>
    <SEO
      title="Appliance Repair Services in Delhi | FastFixx Services"
      description="Affordable appliance repair services in Delhi — same day AC, refrigerator, washing machine and microwave repair by certified technicians."
      path="/services"
      keywords="appliance repair services, affordable appliance repair, same day appliance repair, Delhi"
    />

    {/* Header Section */}
    <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
      <div className="absolute inset-0 bg-background" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05]" aria-hidden="true" />
      
      <div className="container relative z-10 max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-sm font-medium text-primary mb-6 shadow-sm mx-auto animate-fade-up">
          Our Expertise
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1] animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Appliance repair services <br className="hidden md:block" />
          <span className="text-gradient">reimagined.</span>
        </h1>
        <p className="mt-8 max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
          From quick same-day fixes to complete part replacements, FastFixx offers
          premium, guaranteed appliance repair across Delhi NCR.
        </p>
      </div>
    </section>

    {/* Services Grid */}
    <section className="container pb-32">
      <div className="grid lg:grid-cols-2 gap-8">
        {services.map((s, index) => (
          <Link
            key={s.slug}
            to={s.href}
            className="group relative glass-card p-10 rounded-[2.5rem] hover:-translate-y-2 transition-all duration-500 hover:shadow-glow hover:border-primary/30 overflow-hidden animate-fade-up"
            style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="h-20 w-20 shrink-0 rounded-[1.5rem] bg-gradient-hero text-white flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform duration-500">
                <s.icon className="h-10 w-10" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-2xl font-bold text-foreground mb-3">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{s.short}</p>
                <div className="space-y-3 mb-8">
                  {s.problems.slice(0, 3).map((p) => (
                    <div key={p} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <span className="line-clamp-1">{p}</span>
                    </div>
                  ))}
                </div>
                <div className="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                  View full details <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA Banner */}
      <div className="mt-24 relative overflow-hidden rounded-[3rem] p-12 md:p-20 text-center glass-card shadow-elegant animate-fade-up" style={{ animationDelay: '0.8s' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">Need a repair today?</h2>
          <p className="text-xl text-muted-foreground mb-10">Our certified technicians cover all major Delhi neighbourhoods, 7 days a week.</p>
          <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full bg-gradient-cta shadow-elegant">
            <Link to="/contact">Book a Technician Now</Link>
          </Button>
        </div>
      </div>
    </section>
  </>
);

export default Services;
