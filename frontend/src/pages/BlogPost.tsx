import { Link, useParams, Navigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { getPost } from "@/data/blog";

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Organization", name: "FixFast Services" },
    publisher: { "@type": "Organization", name: "FixFast Services" },
  };

  return (
    <>
      <SEO
        title={`${post.title} | FixFast Services Blog`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        jsonLd={jsonLd}
      />

      <div className="relative pt-24 pb-16 lg:pt-32 bg-background border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" aria-hidden="true" />
        <div className="container relative z-10 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors bg-secondary/50 px-4 py-2 rounded-full mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to all articles
          </Link>

          <header>
            <span className="inline-flex items-center rounded-full glass border-primary/20 text-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-sm mb-6">
              {post.category}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight text-foreground">{post.title}</h1>
            <div className="mt-8 flex items-center gap-6 text-sm font-medium text-muted-foreground border-t border-border/50 pt-6">
              <span className="inline-flex items-center gap-2"><Calendar className="h-5 w-5 text-primary/70" />{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span className="inline-flex items-center gap-2"><Clock className="h-5 w-5 text-accent/70" />{post.readTime}</span>
            </div>
          </header>
        </div>
      </div>

      <article className="container max-w-4xl py-16">
        <div className="glass-card rounded-[2.5rem] p-8 md:p-14 mb-16">
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary-glow">
            {post.content.map((b, i) => {
              if (b.type === "h2") return <h2 key={i} className="text-3xl md:text-4xl mt-12 mb-6 tracking-tight text-foreground">{b.text}</h2>;
              if (b.type === "h3") return <h3 key={i} className="text-2xl mt-8 mb-4 text-foreground">{b.text}</h3>;
              if (b.type === "ul") return (
                <ul key={i} className="list-none pl-0 space-y-4 my-8">
                  {b.items?.map((it) => (
                    <li key={it} className="flex items-start gap-3">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                      <span className="text-muted-foreground">{it}</span>
                    </li>
                  ))}
                </ul>
              );
              return <p key={i} className="my-6 text-lg">{b.text}</p>;
            })}
          </div>
        </div>

        <aside className="glass-card rounded-[2rem] p-8 md:p-10 mb-16">
          <h2 className="font-display font-bold text-2xl text-foreground mb-6">Services related to this article</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {post.related.map((r) => (
              <Link key={r.slug} to={`/services/${r.slug}`} className="flex items-center justify-between p-5 rounded-2xl bg-secondary/50 hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all group">
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{r.title}</span>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </aside>

        <div className="relative overflow-hidden rounded-[3rem] p-12 md:p-16 text-center glass-card shadow-elegant border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" aria-hidden />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/20 blur-[100px]" aria-hidden />
          
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">Need an expert technician?</h2>
            <p className="text-xl text-muted-foreground mb-10">Book a same-day FixFast service anywhere in Delhi NCR.</p>
            <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full bg-gradient-cta shadow-elegant"><Link to="/contact">Book Service Now</Link></Button>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
