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

      {/* Header Section */}
      <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute inset-0 bg-background" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-background to-background" aria-hidden="true" />
        
        <div className="container relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-sm font-medium text-primary mb-6 shadow-sm mx-auto animate-fade-up">
            Get in Touch
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1] animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Let's get your appliance <br className="hidden md:block" />
            <span className="text-gradient">working again.</span>
          </h1>
          <p className="mt-8 max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Book a service, ask a question or request a callback — our support team usually responds within 15 minutes.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Grid */}
      <section className="container pb-32">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* Form */}
          <div className="lg:col-span-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="glass-card rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
              
              <div className="relative z-10">
                <h2 className="font-display text-3xl font-bold text-foreground mb-2">Send us a message</h2>
                <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you immediately.</p>
                
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground/80 font-medium">Full Name</Label>
                      <Input id="name" name="name" required placeholder="John Doe" className="h-14 rounded-2xl bg-background/50 border-border/50 focus-visible:ring-primary/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground/80 font-medium">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" required placeholder="+91 98765 43210" className="h-14 rounded-2xl bg-background/50 border-border/50 focus-visible:ring-primary/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground/80 font-medium">Email Address</Label>
                    <Input id="email" name="email" type="email" required placeholder="john@example.com" className="h-14 rounded-2xl bg-background/50 border-border/50 focus-visible:ring-primary/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-foreground/80 font-medium">Service Required</Label>
                    <Input id="service" name="service" placeholder="e.g. AC not cooling, Washing machine leaking" className="h-14 rounded-2xl bg-background/50 border-border/50 focus-visible:ring-primary/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground/80 font-medium">Describe the Issue</Label>
                    <Textarea id="message" name="message" rows={5} placeholder="Tell us exactly what's wrong..." className="rounded-2xl bg-background/50 border-border/50 focus-visible:ring-primary/50 resize-none pt-4" />
                  </div>
                  
                  <Button type="submit" size="lg" disabled={submitting} className="w-full h-14 rounded-xl bg-gradient-cta text-lg shadow-elegant hover:opacity-90 transition-opacity">
                    {submitting ? "Sending Request..." : (<>Request Immediate Callback <Send className="ml-2 h-5 w-5" /></>)}
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Details Sidebar */}
          <aside className="lg:col-span-2 space-y-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="glass-card rounded-[2rem] p-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">Contact Info</h2>
              <ul className="space-y-8">
                {[
                  { Icon: Phone, label: "Phone Support", value: "+91 11 4000 0000", href: "tel:+911140000000" },
                  { Icon: Mail, label: "Email Address", value: "hello@fixfastservices.in", href: "mailto:hello@fixfastservices.in" },
                  { Icon: MapPin, label: "Office Address", value: "B-12, Connaught Place, New Delhi 110001" },
                  { Icon: Clock, label: "Working Hours", value: "Mon – Sun: 8:00 AM to 9:00 PM" },
                ].map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-5 group">
                    <div className="h-12 w-12 shrink-0 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">{label}</div>
                      {href ? (
                        <a href={href} className="text-lg font-semibold text-foreground hover:text-primary transition-colors">{value}</a>
                      ) : (
                        <div className="text-lg font-semibold text-foreground">{value}</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map Placeholder */}
            <div className="glass-card rounded-[2rem] overflow-hidden aspect-[4/3] relative flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 group-hover:scale-105 transition-transform duration-700" />
              <div className="relative z-10 text-center px-6">
                <div className="h-16 w-16 rounded-2xl bg-background/80 backdrop-blur shadow-sm text-primary mx-auto flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8" />
                </div>
                <p className="font-display text-xl font-bold text-foreground mb-2">Locate Us</p>
                <p className="text-muted-foreground">Find our headquarters in the heart of New Delhi</p>
                <Button variant="outline" className="mt-6 rounded-full glass border-border/50">Open in Maps</Button>
              </div>
            </div>
          </aside>

        </div>
      </section>
    </>
  );
};

export default Contact;
