import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Clock, IndianRupee, Wrench, CheckCircle2, Sparkles, Star, Users, MapPin, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import { services } from "@/data/services";
import heroImg from "@/assets/hero-technician.jpg";

const testimonials = [
  { name: "Rahul Sharma", location: "Delhi", rating: 5, text: "Excellent service. My washing machine was repaired within one hour. The technician was polite and professional. Highly recommended." },
  { name: "Priya Verma", location: "Delhi", rating: 5, text: "Very quick response and affordable pricing. My refrigerator is working perfectly now." },
  { name: "Amit Kumar", location: "Delhi", rating: 4, text: "Good service and friendly staff. The AC cooling issue was fixed the same day." },
  { name: "Neha Singh", location: "Delhi", rating: 5, text: "Professional technicians and reliable service. I will definitely use this service again." },
  { name: "Rakesh Gupta", location: "Delhi", rating: 5, text: "Fast and trustworthy service. Booking was simple and the technician arrived on time." },
  { name: "Sunita Patel", location: "Delhi", rating: 4, text: "Affordable repair and good customer support. Very satisfied with the service." },
];

const faqs = [
  { q: "How quickly can you repair my appliance?", a: "Most repairs are completed within the same day depending on the issue." },
  { q: "Do you provide warranty on repairs?", a: "Yes, we provide a service warranty on most repairs." },
  { q: "What areas do you serve?", a: "We provide appliance repair services across Delhi." },
  { q: "How can I book a service?", a: "You can book a service using the contact form or by calling our support number." },
];

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "FastFixx Services",
    description: "Home appliance repair in Delhi — AC, refrigerator, washing machine and microwave repair.",
    url: "https://fastfixxservices.in",
    telephone: "+91-8235445601",
    address: {
      "@type": "PostalAddress",
      streetAddress: "B-12, Connaught Place",
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
        title="Home Appliance Repair in Delhi | FastFixx Services"
        description="Trusted home appliance repair in Delhi for AC, refrigerator, washing machine & microwave. Same-day service, affordable pricing, expert technicians."
        path="/"
        keywords="home appliance repair in Delhi, AC repair in Delhi, washing machine repair, refrigerator repair service, affordable appliance repair, same day repair, appliance repair near me"
        jsonLd={jsonLd}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
        <div className="absolute inset-0 bg-background" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" aria-hidden="true" />
        <div className="absolute inset-y-0 left-0 w-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05]" aria-hidden="true" />
        
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
            
            <div className="mt-12 flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <span className="text-sm font-semibold mt-1 text-foreground">Rated 4.8/5 by 50,000+ Customers</span>
            </div>
          </div>

          <div className="relative lg:h-[600px] flex items-center justify-center animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[3rem] rotate-3 blur-sm"></div>
            <img
              src={heroImg}
              alt="Technician repairing"
              className="relative z-10 w-full h-[500px] object-cover rounded-[2.5rem] shadow-elegant border border-border/50"
            />
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

      {/* Trust Badge / Social Proof Header */}
      <section className="relative z-20 -mt-12 mb-12">
        <div className="container">
          <div className="glass-card rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-cta text-white flex items-center justify-center shadow-elegant shrink-0">
                <Users className="h-7 w-7" />
              </div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Trusted by 50,000+ homes</h2>
                <div className="text-sm font-medium text-muted-foreground flex items-center gap-1.5 mt-1">
                  <MapPin className="h-4 w-4" /> Serving customers across Delhi
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:flex gap-4 md:gap-8">
              {[
                "Certified technicians",
                "Same-day service",
                "Affordable pricing",
                "24/7 customer support"
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm font-semibold text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Visuals Grid Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-soft border-b border-border/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">Trusted by 50,000+ Homes Across Delhi</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We bring smiles to homes every day with our fast, professional, and reliable appliance repair services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Image 1: Happy Customer / Family */}
            <div className="group relative overflow-hidden rounded-[2rem] aspect-square shadow-elegant">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop" 
                alt="Happy family in their modern home" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="font-display text-2xl font-bold text-white mb-2">Happy Customers</h3>
                <p className="text-white/80 font-medium">Restoring comfort to your home.</p>
              </div>
            </div>

            {/* Image 2: Technician at work */}
            <div className="group relative overflow-hidden rounded-[2rem] aspect-square shadow-elegant md:translate-y-8">
              <img 
                src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1000&auto=format&fit=crop" 
                alt="Professional technician repairing appliance" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="font-display text-2xl font-bold text-white mb-2">Professional Technicians</h3>
                <p className="text-white/80 font-medium">Certified experts for every brand.</p>
              </div>
            </div>

            {/* Image 3: Reliable Service / Home */}
            <div className="group relative overflow-hidden rounded-[2rem] aspect-square shadow-elegant">
              <img 
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1000&auto=format&fit=crop" 
                alt="Modern kitchen appliances functioning perfectly" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="font-display text-2xl font-bold text-white mb-2">Reliable Service</h3>
                <p className="text-white/80 font-medium">Genuine parts and lasting repairs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">Premium care for every device</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We specialize in fixing modern home appliances using advanced diagnostics and genuine manufacturer parts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {services.map((s) => (
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

      {/* Organic Traffic Section (Why Customers Trust Us) */}
      <section className="py-24 bg-gradient-soft border-y border-border/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">Why Customers Trust FastFixx Services</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We deliver more than just repairs; we deliver peace of mind.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Experienced technicians", desc: "Our team consists of highly trained experts with years of hands-on experience.", icon: Wrench },
              { title: "Fast response time", desc: "We understand urgency. Expect a technician at your door within hours.", icon: Clock },
              { title: "Transparent pricing", desc: "No hidden fees. You get a clear, upfront quote before any work begins.", icon: IndianRupee },
              { title: "Genuine spare parts", desc: "We only use original, manufacturer-approved parts for all replacements.", icon: ShieldCheck },
              { title: "Reliable customer support", desc: "Our support team is available around the clock to assist you.", icon: MessageCircle },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-[2rem] flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials & Google Business Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" aria-hidden />
        <div className="container relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-12 items-end justify-between mb-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">Real feedback from real customers</h2>
              
              <div className="flex items-center gap-6 mt-8">
                <div>
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Average Rating</div>
                  <div className="flex items-end gap-3">
                    <span className="font-display text-5xl font-bold text-foreground">4.8</span>
                    <span className="text-muted-foreground mb-1 pb-1">out of 5 stars</span>
                  </div>
                </div>
                <div className="w-px h-16 bg-border/50" />
                <div>
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Customer Satisfaction</div>
                  <div className="font-display text-3xl font-bold text-primary">98% <span className="text-lg font-medium text-muted-foreground">positive feedback</span></div>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-3xl flex items-center gap-6 shrink-0 shadow-elegant">
              <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <div className="font-semibold text-foreground">4.8 / 5 rating</div>
                <div className="text-sm text-muted-foreground">Based on 1,200+ reviews</div>
                <Button variant="link" className="px-0 h-auto text-primary font-semibold mt-1">View Google Reviews <ArrowRight className="ml-1 h-3 w-3" /></Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card p-8 rounded-[2rem] flex flex-col hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-cta flex items-center justify-center text-white font-bold shadow-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{t.name}</h3>
                    <div className="text-xs text-muted-foreground">{t.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className={`h-4 w-4 ${idx < t.rating ? "fill-current" : "text-muted stroke-muted-foreground"}`} />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed italic">"{t.text}"</p>
              </div>
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
                  <div key={i} className="flex gap-6">
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

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Everything you need to know about our repair services.</p>
          </div>
          
          <div className="glass-card rounded-[2rem] p-6 md:p-10">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border/50 px-2">
                  <AccordionTrigger className="text-lg font-semibold hover:text-primary transition-colors text-left py-6">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Social Media Plugins */}
      <section className="py-16 bg-gradient-soft border-y border-border/50">
        <div className="container text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">Connect with us</h2>
          <p className="text-muted-foreground mb-8">Follow us on social media for updates and service tips.</p>
          
          <div className="flex items-center justify-center gap-6">
            {[
              { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/aloksharma1097" },
              { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/apnaudyog1/" },
              { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/918235445601" },
              { icon: Youtube, label: "YouTube", href: "https://youtube.com/@alokk_sharma?si=QfOgtdr1r8gU3HfC" },
            ].map((social) => (
              <a 
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="h-14 w-14 rounded-2xl glass-card flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-elegant"
                aria-label={social.label}
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
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
                Join thousands of Delhi residents who trust FastFixx for their premium appliance repair needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full bg-gradient-cta shadow-elegant hover:opacity-90 transition-opacity">
                  <Link to="/contact">Schedule a Visit</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full glass hover:bg-secondary/50">
                  <a href="tel:+918235445601">Call Support</a>
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
