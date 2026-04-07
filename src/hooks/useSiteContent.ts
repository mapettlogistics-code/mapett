import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SiteContentItem = {
  id: string;
  section: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  link: string | null;
  icon: string | null;
  extra_data: Record<string, unknown> | null;
  display_order: number;
  is_active: boolean;
};

export const useSiteContent = (section: string, fallback: Partial<SiteContentItem>[] = []) => {
  const [items, setItems] = useState<SiteContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("site_content")
        .select("*")
        .eq("section", section)
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (data && data.length > 0) {
        setItems(data as SiteContentItem[]);
      } else {
        setItems(fallback as SiteContentItem[]);
      }
      setLoading(false);
    };
    fetch();
  }, [section]);

  return { items, loading };
};

/** Fetch a single content item for a section (e.g. about_main) */
export const useSiteContentSingle = (section: string) => {
  const { items, loading } = useSiteContent(section);
  return { item: items[0] || null, loading };
};
