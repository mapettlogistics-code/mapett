import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
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
    content: "Everything importers need to know about the latest customs regulations, documentation requirements, and how to avoid common delays at Mombasa Port.\n\n## Key Requirements\n\n- Import Declaration Form (IDF)\n- Pre-shipment inspection certificate\n- Commercial invoice and packing list\n- Bill of lading\n- Certificate of origin\n\n## Tips for Smooth Clearance\n\n1. Ensure all documents are prepared before cargo arrives\n2. Work with a licensed customs broker\n3. Understand the HS codes for your goods\n4. Pay duties promptly to avoid storage charges\n\nContact Mapett Logistics for professional customs clearance assistance.",
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
    content: "Discover how combining road, rail, and sea transport can significantly reduce your logistics costs while improving delivery reliability.\n\n## Benefits\n\n1. **Cost Savings** - Optimize routes using the most economical transport mode for each leg\n2. **Reliability** - Multiple transport options reduce dependency on a single mode\n3. **Environmental Impact** - Rail and sea produce fewer emissions per ton-km\n4. **Scalability** - Easily adjust capacity based on demand\n5. **Coverage** - Reach remote areas by combining different transport modes\n\nMapett Logistics offers comprehensive intermodal solutions across East Africa.",
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
    content: "Protect your goods in transit with comprehensive marine and air cargo insurance. Learn about coverage options from Britam and Sanlam.\n\n## Types of Coverage\n\n- **All Risk** - Covers all physical loss or damage\n- **Named Perils** - Covers specific listed risks only\n- **Total Loss Only** - Covers complete loss of shipment\n\n## Why You Need It\n\nInternational shipping involves multiple handoffs and transport modes. Without insurance, you bear the full financial risk of:\n- Weather damage\n- Theft or pilferage\n- Handling damage\n- Vessel sinking or grounding\n\nContact Mapett Logistics to get a cargo insurance quote today.",
    excerpt: "Protect your goods in transit with comprehensive marine and air cargo insurance. Learn about coverage options from Britam and Sanlam.",
    image_url: null,
    author: "Mapett Logistics",
    category: "Insurance",
    published_at: "2026-03-15T00:00:00Z",
    created_at: "2026-03-15T00:00:00Z",
  },
];

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (data) {
        setPost(data as BlogPost);
      } else {
        const fallback = defaultPosts.find((p) => p.slug === slug);
        if (fallback) setPost(fallback);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <h1 className="text-2xl font-bold text-foreground">Post not found</h1>
        <Link to="/#blog">
          <Button>Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl py-12">
        <Link to="/#blog">
          <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </Link>

        {post.image_url ? (
          <img src={post.image_url} alt={post.title} className="w-full h-64 object-cover rounded-xl mb-8" />
        ) : (
          <div className="w-full h-48 hero-gradient rounded-xl mb-8 flex items-center justify-center">
            <Tag className="h-16 w-16 text-primary-foreground/60" />
          </div>
        )}

        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
          {post.category && (
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{post.category}</span>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDate(post.published_at || post.created_at)}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" />
            {post.author}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{post.title}</h1>

        <div className="prose prose-lg max-w-none text-foreground/90">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
