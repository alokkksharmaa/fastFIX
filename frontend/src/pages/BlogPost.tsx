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

      <div className="bg-gradient-soft">
        <div className="container max-w-3xl pt-16 pb-12">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>

          <header className="mt-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider">{post.category}</span>
            <h1 className="mt-4 font-display text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight">{post.title}</h1>
            <div className="mt-5 flex items-center gap-5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" />{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readTime}</span>
            </div>
          </header>
        </div>
      </div>

      <article className="container max-w-3xl py-12">
        <div className="space-y-5 text-foreground/90 leading-relaxed text-lg">
          {post.content.map((b, i) => {
            if (b.type === "h2") return <h2 key={i} className="font-display text-2xl md:text-3xl font-bold mt-10 tracking-tight">{b.text}</h2>;
            if (b.type === "h3") return <h3 key={i} className="font-display text-xl font-semibold mt-7">{b.text}</h3>;
            if (b.type === "ul") return (
              <ul key={i} className="list-disc pl-6 space-y-2 text-muted-foreground">
                {b.items?.map((it) => <li key={it}>{it}</li>)}
              </ul>
            );
            return <p key={i} className="text-muted-foreground leading-relaxed">{b.text}</p>;
          })}
        </div>

        <aside className="mt-14 rounded-2xl border border-border/60 bg-gradient-soft p-7">
          <h2 className="font-display font-semibold text-lg">Related services</h2>
          <ul className="mt-4 space-y-2.5">
            {post.related.map((r) => (
              <li key={r.slug}>
                <Link to={`/services/${r.slug}`} className="text-primary font-medium hover:gap-2 inline-flex items-center gap-1 transition-all">
                  {r.title} <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className="mt-12 relative overflow-hidden rounded-3xl bg-gradient-hero p-10 text-primary-foreground text-center shadow-elegant">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
          <h2 className="font-display text-2xl md:text-3xl font-bold">Need a technician at your doorstep?</h2>
          <p className="mt-3 text-primary-foreground/90 text-lg">Book a same-day FixFast service in Delhi.</p>
          <Button asChild variant="cta" size="lg" className="mt-6"><Link to="/contact">Book Service</Link></Button>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
