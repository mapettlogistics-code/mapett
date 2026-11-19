import { supabase } from "@/integrations/supabase/client";
import { summarizeCopy } from "./contentKeywords";
import type { SearchItem } from "./types";

interface ProductRow {
  id: string;
  name: string | null;
  category: string | null;
  price: number | null;
  description: string | null;
}

interface BlogRow {
  id: string;
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  category: string | null;
  author: string | null;
}

/** Safety caps so a growing catalogue can never bloat the search index. */
export const MAX_PRODUCT_ITEMS = 300;
export const MAX_BLOG_ITEMS = 100;

/** Products that are intentionally hidden from the storefront. */
const HIDDEN_PRODUCT_PATTERN = /boot|shoe/i;

const formatPrice = (price: number | null): string | undefined => {
  if (typeof price !== "number" || !Number.isFinite(price)) return undefined;
  return `KES ${price.toLocaleString("en-KE")}`;
};

const isHiddenProduct = (row: ProductRow) =>
  HIDDEN_PRODUCT_PATTERN.test(`${row.name ?? ""} ${row.category ?? ""}`);

/** Links straight to the filtered catalogue so the clicked product is visible. */
const buildProductPath = (name: string): string =>
  `/products?q=${encodeURIComponent(name)}`;

export const fetchProductSearchItems = async (): Promise<SearchItem[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, category, price, description")
    .limit(MAX_PRODUCT_ITEMS);

  if (error || !data) return [];

  return (data as unknown as ProductRow[])
    .filter((row) => Boolean(row.name) && !isHiddenProduct(row))
    .map((row) => {
      const name = row.name ?? "Product";
      const category = row.category?.trim() ?? "";

      return {
        id: `product:${row.id}`,
        title: name,
        description: summarizeCopy(
          row.description?.trim() || `${category || "Product"} available from the Mapett catalogue.`,
        ),
        categoryId: "products",
        path: buildProductPath(name),
        badge: formatPrice(row.price),
        keywords: [category, name, "product", "buy", "price", "catalogue", "autostore"].filter(Boolean),
      };
    });
};

/**
 * Mirrors the fallback articles used by the blog section so that the three
 * default posts are still findable before any live post is published.
 */
const DEFAULT_BLOG_ITEMS: SearchItem[] = [
  {
    id: "blog:default:customs-clearance-mombasa-2026",
    title: "Navigating Customs Clearance at Mombasa Port: A 2026 Guide",
    description:
      "Everything importers need to know about the latest customs regulations, documentation requirements and how to avoid common delays at Mombasa Port.",
    categoryId: "blog",
    path: "/blog/customs-clearance-mombasa-2026",
    badge: "Customs",
    keywords: ["customs", "mombasa port", "import", "clearance", "guide", "blog"],
  },
  {
    id: "blog:default:intermodal-freight-east-africa",
    title: "Top 5 Benefits of Intermodal Freight for East African Businesses",
    description:
      "How combining road, rail and sea transport can reduce logistics costs while improving delivery reliability.",
    categoryId: "blog",
    path: "/blog/intermodal-freight-east-africa",
    badge: "Logistics",
    keywords: ["intermodal", "multimodal", "cost saving", "east africa", "blog"],
  },
  {
    id: "blog:default:cargo-insurance-essentials",
    title: "Why Cargo Insurance Is Essential for International Shipments",
    description:
      "Protect your goods in transit with comprehensive marine and air cargo insurance cover.",
    categoryId: "blog",
    path: "/blog/cargo-insurance-essentials",
    badge: "Insurance",
    keywords: ["cargo insurance", "marine insurance", "transit", "shipping", "blog"],
  },
];

/**
 * The generated database types do not include `blog_posts` yet, so the blog
 * table is accessed through a minimal shape describing exactly the calls used
 * here. This avoids an `any` while staying resilient to schema additions.
 */
interface UntypedBlogQuery extends PromiseLike<{ data: BlogRow[] | null; error: unknown }> {
  select: (columns: string) => UntypedBlogQuery;
  eq: (column: string, value: unknown) => UntypedBlogQuery;
  limit: (count: number) => UntypedBlogQuery;
}

const fromBlogTable = (): UntypedBlogQuery =>
  (supabase as unknown as { from: (table: string) => UntypedBlogQuery }).from("blog_posts");

export const fetchBlogSearchItems = async (): Promise<SearchItem[]> => {
  const { data, error } = await fromBlogTable()
    .select("id, title, slug, excerpt, category, author")
    .eq("is_published", true)
    .limit(MAX_BLOG_ITEMS);

  const rows: BlogRow[] = error || !data ? [] : (data as unknown as BlogRow[]);

  const liveItems: SearchItem[] = rows
    .filter((row) => Boolean(row.title) && Boolean(row.slug))
    .map((row) => ({
      id: `blog:${row.id}`,
      title: row.title ?? "Article",
      description: summarizeCopy(row.excerpt?.trim() || "Article from the Mapett Logistics & Travel blog."),
      categoryId: "blog",
      path: `/blog/${row.slug}`,
      badge: row.category?.trim() || "Article",
      keywords: [row.category ?? "", row.author ?? "", "blog", "article", "news", "insight"].filter(Boolean),
    }));

  if (liveItems.length > 0) return liveItems;

  // No live posts yet — fall back to the same three articles the site displays.
  return DEFAULT_BLOG_ITEMS;
};

/**
 * Fetches every runtime-searchable record. Failures are swallowed on purpose:
 * the static index alone still gives a complete, working search experience.
 */
export const fetchRemoteSearchItems = async (): Promise<SearchItem[]> => {
  const [products, blogItems] = await Promise.all([
    fetchProductSearchItems().catch(() => [] as SearchItem[]),
    fetchBlogSearchItems().catch(() => [] as SearchItem[]),
  ]);

  return [...products, ...blogItems];
};
