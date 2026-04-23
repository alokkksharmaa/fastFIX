import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { services } from "@/data/services";

const Services = () => (
  <>
    <SEO
      title="Appliance Repair Services in Delhi | FixFast Services"
      description="Affordable appliance repair services in Delhi — same day AC, refrigerator, washing machine and microwave repair by certified technicians."
      path="/services"
      keywords="appliance repair services, affordable appliance repair, same day appliance repair, Delhi"
    />

    <section className="relative overflow-hidden bg-gradient-soft">
      <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-primary/15 blur-3xl" aria-hidden />
      <div className="container relative py-20 md:py-24 max-w-4xl">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our services</span>
        <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          Appliance repair services <span className="text-gradient">in Delhi</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          From quick same-day fixes to complete part replacements, FixFast offers
          affordable appliance repair across Delhi for every major home appliance.
        </p>
      </div>
    </section>

    <section className="container py-20">
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((s) => (
          <Link
            key={s.slug}
            to={s.href}
            className="group relative rounded-3xl border border-border/60 bg-card p-8 shadow-card hover:shadow-elegant hover:-translate-y-1 hover:border-primary/30 transition-all"
          >
            <div className="flex items-start gap-5">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-gradient-hero text-primary-foreground flex items-center justify-center shadow-elegant group-hover:scale-110 transition-transform">
                <s.icon className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-xl font-semibold">{s.title}</h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">{s.short}</p>
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  {s.problems.slice(0, 4).map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span className="line-clamp-1">{p}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  View details <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-hero p-10 md:p-14 text-primary-foreground text-center shadow-elegant">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
        <h2 className="font-display text-2xl md:text-4xl font-bold">Looking for same-day appliance repair?</h2>
        <p className="mt-3 text-primary-foreground/90 text-lg">Our technicians cover all major Delhi neighbourhoods, 7 days a week.</p>
        <Button asChild variant="cta" size="lg" className="mt-7">
          <Link to="/contact">Book a Technician</Link>
        </Button>
      </div>
    </section>
  </>
);

export default Services;
