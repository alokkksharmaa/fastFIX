import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast({ title: "Request received", description: "Our team will call you back shortly." });
    }, 700);
  };

  return (
    <>
      <SEO
        title="Contact FixFast Services | Book Appliance Repair in Delhi"
        description="Contact FixFast Services for fast appliance repair in Delhi. Call, email or fill in the form to book a same-day technician visit."
        path="/contact"
        keywords="contact appliance repair Delhi, book appliance technician"
      />

      <section className="relative overflow-hidden bg-gradient-soft">
        <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl" aria-hidden />
        <div className="container relative py-20 md:py-24 max-w-4xl">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Get in touch</span>
          <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold tracking-tight">
            Let's get your appliance <span className="text-gradient">working again.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Book a service, ask a question or request a callback — we usually respond within 30 minutes.
          </p>
        </div>
      </section>

      <section className="container py-20 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <div className="rounded-3xl border border-border/60 bg-card p-8 md:p-10 shadow-card">
            <h2 className="font-display text-2xl font-bold">Send us a message</h2>
            <p className="mt-1 text-muted-foreground text-sm">All fields marked are required.</p>
            <form onSubmit={onSubmit} className="mt-7 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" name="name" required placeholder="Your full name" className="mt-1.5 h-11 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="+91 ..." className="mt-1.5 h-11 rounded-xl" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input id="email" name="email" type="email" required placeholder="you@example.com" className="mt-1.5 h-11 rounded-xl" />
              </div>
              <div>
                <Label htmlFor="service">Service needed</Label>
                <Input id="service" name="service" placeholder="e.g. AC repair, refrigerator not cooling" className="mt-1.5 h-11 rounded-xl" />
              </div>
              <div>
                <Label htmlFor="message">Describe the problem</Label>
                <Textarea id="message" name="message" rows={5} placeholder="Tell us a bit about the issue..." className="mt-1.5 rounded-xl" />
              </div>
              <Button type="submit" variant="cta" size="lg" disabled={submitting} className="w-full sm:w-auto">
                {submitting ? "Sending..." : (<>Request Callback <Send className="h-4 w-4" /></>)}
              </Button>
            </form>
          </div>
        </div>

        <aside className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-border/60 bg-card p-7 shadow-card">
            <h2 className="font-display text-lg font-semibold">Contact details</h2>
            <ul className="mt-5 space-y-5 text-sm">
              {[
                { Icon: Phone, label: "Phone", value: "+91 11 4000 0000", href: "tel:+911140000000" },
                { Icon: Mail, label: "Email", value: "hello@fixfastservices.in", href: "mailto:hello@fixfastservices.in" },
                { Icon: MapPin, label: "Address", value: "B-12, Connaught Place, New Delhi 110001" },
                { Icon: Clock, label: "Working hours", value: "Mon – Sun: 8:00 AM to 9:00 PM" },
              ].map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{label}</div>
                    {href ? (
                      <a href={href} className="text-muted-foreground hover:text-primary transition-colors">{value}</a>
                    ) : (
                      <div className="text-muted-foreground">{value}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl overflow-hidden border border-border/60 shadow-card aspect-video bg-gradient-soft flex items-center justify-center">
            <div className="text-center px-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
                <MapPin className="h-6 w-6" />
              </div>
              <p className="mt-3 font-display font-semibold">Find us on Google Maps</p>
              <p className="text-sm text-muted-foreground">Connaught Place, New Delhi</p>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
};

export default Contact;
