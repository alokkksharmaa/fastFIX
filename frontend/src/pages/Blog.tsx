import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { posts } from "@/data/blog";

const gradients = [
  "from-primary to-primary-glow",
  "from-accent to-primary",
  "from-primary-glow to-accent",
];

const Blog = () => (
  <>
    <SEO
      title="Appliance Care Blog | Tips & Guides | FixFast Services"
      description="Read expert tips on AC, refrigerator and washing machine maintenance. Practical guides to keep your home appliances running longer."
      path="/blog"
      keywords="appliance care blog, AC maintenance tips, washing machine tips, refrigerator tips"
    />

    <section className="relative overflow-hidden bg-gradient-soft">
      <div className="pointer-events-none absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-primary/15 blur-3xl" aria-hidden />
      <div className="container relative py-20 md:py-24 max-w-4xl">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Insights</span>
        <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold tracking-tight">
          Appliance care, <span className="text-gradient">made simple.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
          Expert tips and how-to guides to keep your home appliances running longer.
        </p>
      </div>
    </section>

    <section className="container py-20">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {posts.map((post, i) => (
          <article key={post.slug} className="group rounded-3xl border border-border/60 bg-card shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all overflow-hidden flex flex-col">
            <Link to={`/blog/${post.slug}`} className={`relative aspect-[16/10] bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center overflow-hidden`}>
              <span className="font-display text-6xl font-bold text-white/30 group-hover:scale-110 transition-transform">
                {post.category.charAt(0)}
              </span>
              <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold text-primary">
                {post.category}
              </span>
            </Link>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="font-display text-lg font-semibold leading-snug">
                <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
              </h2>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed">{post.excerpt}</p>
              <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
              </div>
              <Link to={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Read article <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  </>
);

export default Blog;
