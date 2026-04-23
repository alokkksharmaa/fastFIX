import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { posts } from "@/data/blog";

const gradients = [
  "from-primary/80 to-accent/80",
  "from-accent/80 to-primary/80",
  "from-primary/60 to-primary/80",
];

const Blog = () => (
  <>
    <SEO
      title="Appliance Care Blog | Tips & Guides | FixFast Services"
      description="Read expert tips on AC, refrigerator and washing machine maintenance. Practical guides to keep your home appliances running longer."
      path="/blog"
      keywords="appliance care blog, AC maintenance tips, washing machine tips, refrigerator tips"
    />

    {/* Header Section */}
    <section className="relative overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28">
      <div className="absolute inset-0 bg-background" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" aria-hidden="true" />
      
      <div className="container relative z-10 max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/20 text-sm font-medium text-primary mb-6 shadow-sm mx-auto animate-fade-up">
          Insights & Guides
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1] animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Appliance care, <br className="hidden md:block" />
          <span className="text-gradient">made simple.</span>
        </h1>
        <p className="mt-8 max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Expert tips and how-to guides designed to help you keep your home appliances running efficiently for years.
        </p>
      </div>
    </section>

    {/* Blog Grid */}
    <section className="container pb-32">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <article 
            key={post.slug} 
            className="group glass-card rounded-[2.5rem] overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:shadow-glow hover:border-primary/30 flex flex-col animate-fade-up"
            style={{ animationDelay: `${(i % 3) * 0.1 + 0.3}s` }}
          >
            <Link to={`/blog/${post.slug}`} className={`relative aspect-[16/10] bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center overflow-hidden`}>
              {/* Overlay pattern */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]" />
              
              <span className="relative z-10 font-display text-7xl font-bold text-white/40 group-hover:scale-110 group-hover:text-white/60 transition-transform duration-500">
                {post.category.charAt(0)}
              </span>
              
              <span className="absolute top-5 left-5 z-20 inline-flex items-center rounded-full glass border-border/20 px-4 py-1.5 text-xs font-bold text-white shadow-sm">
                {post.category}
              </span>
            </Link>
            
            <div className="p-8 flex flex-col flex-1 bg-card/40 backdrop-blur-sm">
              <h2 className="font-display text-xl font-bold leading-snug mb-4">
                <Link to={`/blog/${post.slug}`} className="text-foreground hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-6 flex-1">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>
              </div>
              
              <Link to={`/blog/${post.slug}`} className="mt-6 inline-flex items-center justify-center w-full rounded-xl py-3 text-sm font-bold text-primary bg-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                Read Article <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  </>
);

export default Blog;
