import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle2, Phone, ShieldCheck, Clock, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { Service } from "@/data/services";

interface Props {
  service: Service;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  intro: string;
  detail: string;
}

const trust = [
  { Icon: Clock, label: "Same-day visits" },
  { Icon: ShieldCheck, label: "30-day warranty" },
  { Icon: IndianRupee, label: "Transparent pricing" },
];

const ServiceDetail = ({ service, seoTitle, seoDescription, keywords, intro, detail }: Props) => {
  const Icon = service.icon;
  return (
    <>
      <SEO title={seoTitle} description={seoDescription} path={service.href} keywords={keywords} />

      <section className="relative overflow-hidden bg-gradient-soft">
        <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-primary/15 blur-3xl" aria-hidden />
        <div className="container relative py-16 md:py-20 max-w-5xl">
          <Link to="/services" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to services
          </Link>
          <div className="mt-6 flex items-start gap-5 flex-wrap">
            <div className="h-16 w-16 rounded-2xl bg-gradient-hero text-primary-foreground flex items-center justify-center shadow-elegant shrink-0">
              <Icon className="h-8 w-8" />
            </div>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              {service.title} <span className="text-gradient">in Delhi</span>
            </h1>
          </div>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl leading-relaxed">{intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {trust.map(({ Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 backdrop-blur px-4 py-2 text-sm font-medium">
                <Icon className="h-4 w-4 text-primary" /> {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">About this service</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-lg">{detail}</p>

            <h2 className="mt-12 font-display text-2xl md:text-3xl font-bold tracking-tight">Common problems we fix</h2>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {service.problems.map((p) => (
                <li key={p} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-card hover:shadow-elegant hover:border-primary/30 transition-all">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-24 self-start">
            <div className="rounded-3xl border border-border/60 bg-card p-7 shadow-card">
              <h3 className="font-display text-lg font-semibold">Book a technician</h3>
              <p className="mt-2 text-sm text-muted-foreground">Same-day visits across Delhi NCR. Pay only after the repair.</p>
              <div className="mt-5 space-y-2.5">
                <Button asChild variant="cta" size="lg" className="w-full"><Link to="/contact">Request callback</Link></Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a href="tel:+911140000000"><Phone className="h-4 w-4" /> Call us now</a>
                </Button>
              </div>
              <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm">
                {trust.map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-primary" /> <span className="text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-hero p-10 md:p-14 text-primary-foreground text-center shadow-elegant">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
          <h2 className="font-display text-2xl md:text-4xl font-bold">Book {service.title} in Delhi today</h2>
          <p className="mt-3 text-primary-foreground/90 text-lg">Same-day visits, transparent pricing, 30-day warranty.</p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Button asChild variant="cta" size="lg"><Link to="/contact">Request a Callback</Link></Button>
            <Button asChild variant="hero" size="lg">
              <a href="tel:+911140000000"><Phone className="h-4 w-4" /> +91 11 4000 0000</a>
            </Button>
          </div>
        </div>

        <p className="mt-10 text-sm text-muted-foreground text-center">
          Explore more <Link to="/services" className="text-primary hover:underline inline-flex items-center gap-1">repair services <ArrowRight className="h-3.5 w-3.5" /></Link>
          {" "}or read our <Link to="/blog" className="text-primary hover:underline">appliance care blog</Link>.
        </p>
      </section>
    </>
  );
};

export default ServiceDetail;
