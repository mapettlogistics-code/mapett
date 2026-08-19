import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  image_url: string | null;
  author: string | null;
  category: string | null;
  published_at: string | null;
  created_at: string;
}

const defaultPosts: BlogPost[] = [
  {
    id: "1",
    title: "Navigating Customs Clearance at Mombasa Port: A 2026 Guide",
    slug: "customs-clearance-mombasa-2026",
    excerpt: "Everything importers need to know about the latest customs regulations, documentation requirements, and how to avoid common delays at Mombasa Port.",
    image_url: null,
    author: "Mapett Logistics",
    category: "Customs",
    published_at: "2026-03-25T00:00:00Z",
    created_at: "2026-03-25T00:00:00Z",
  },
  {
    id: "2",
    title: "Top 5 Benefits of Intermodal Freight for East African Businesses",
    slug: "intermodal-freight-east-africa",
    excerpt: "Discover how combining road, rail, and sea transport can significantly reduce your logistics costs while improving delivery reliability.",
    image_url: null,
    author: "Mapett Logistics",
    category: "Logistics",
    published_at: "2026-03-20T00:00:00Z",
    created_at: "2026-03-20T00:00:00Z",
  },
  {
    id: "3",
    title: "Why Cargo Insurance Is Essential for International Shipments",
    slug: "cargo-insurance-essentials",
    excerpt: "Protect your goods in transit with comprehensive marine and air cargo insurance. Learn about coverage options from Britam and Sanlam.",
    image_url: null,
    author: "Mapett Logistics",
    category: "Insurance",
    published_at: "2026-03-15T00:00:00Z",
    created_at: "2026-03-15T00:00:00Z",
  },
];

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>(defaultPosts);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts" as any)
        .select("id, title, slug, excerpt, image_url, author, category, published_at, created_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(3);
      if (data && (data as any[]).length > 0) {
        const livePosts = data as BlogPost[];
        const liveSlugs = new Set(livePosts.map((post) => post.slug));
        const fallbackPosts = defaultPosts.filter((post) => !liveSlugs.has(post.slug));

        // Keep the homepage grid complete while real posts are still being added.
        setPosts([...livePosts, ...fallbackPosts].slice(0, 3));
      }
    };
    fetchPosts();
  }, []);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section id="blog" className="py-20 bg-secondary/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Latest News
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Logistics Insights & Updates
          </h2>
          <p className="text-muted-foreground text-lg">
            Stay informed with the latest industry news, shipping updates, and logistics tips.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              {post.image_url ? (
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-48 hero-gradient flex items-center justify-center">
                  <Tag className="h-12 w-12 text-primary-foreground/60" />
                </div>
              )}

              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  {post.category && (
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {post.category}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.published_at || post.created_at)}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    {post.author}
                  </span>
                  <Link to={`/blog/${post.slug}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto text-sm group/btn"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
