import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Banner {
  id: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  link: string | null;
}

const defaultBanners: Banner[] = [
  {
    id: "1",
    title: "🚢 Import Clearance Special",
    subtitle: "Get 10% off customs clearance for first-time clients",
    description: "Valid for all imports through Mombasa Port. Contact us today!",
    image_url: null,
    link: "#contact",
  },
  {
    id: "2",
    title: "🛢️ Automotive Lubricants Sale",
    subtitle: "Premium lubricants at wholesale prices",
    description: "Free delivery on orders above KES 5,001 across Kenya.",
    image_url: null,
    link: "https://mapett.com/collections/automotive-lubricants",
  },
  {
    id: "3",
    title: "🛡️ Insure Your Cargo Today",
    subtitle: "Comprehensive marine & air cargo insurance",
    description: "Get a quote in minutes. Partnering with Britam & Sanlam.",
    image_url: null,
    link: "/insurance",
  },
];

const PromoBanners = () => {
  const [banners, setBanners] = useState<Banner[]>(defaultBanners);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      const { data } = await supabase
        .from("site_content")
        .select("*")
        .eq("section", "promo_banner")
        .eq("is_active", true)
        .order("display_order");
      if (data && data.length > 0) {
        setBanners(data.map(d => ({
          id: d.id,
          title: d.title,
          subtitle: d.subtitle,
          description: d.description,
          image_url: d.image_url,
          link: d.link,
        })));
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const banner = banners[current];
  const isExternal = banner.link?.startsWith("http");

  return (
    <section className="py-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
      <div className="container">
        <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-card">
          <div className="flex items-center justify-between">
            {banners.length > 1 && (
              <button
                onClick={() => setCurrent(prev => (prev - 1 + banners.length) % banners.length)}
                className="p-3 hover:bg-secondary/50 transition-colors shrink-0"
              >
                <ChevronLeft className="h-5 w-5 text-muted-foreground" />
              </button>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 py-6 px-4 text-center"
              >
                {banner.image_url ? (
                  <img src={banner.image_url} alt={banner.title || "Promotion"} className="max-h-32 mx-auto mb-3 rounded-lg object-contain" />
                ) : null}
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">
                  {banner.title}
                </h3>
                {banner.subtitle && (
                  <p className="text-primary font-semibold text-sm md:text-base mb-1">{banner.subtitle}</p>
                )}
                {banner.description && (
                  <p className="text-muted-foreground text-sm">{banner.description}</p>
                )}
                {banner.link && (
                  <a
                    href={banner.link}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-primary hover:underline"
                  >
                    Learn More
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </motion.div>
            </AnimatePresence>

            {banners.length > 1 && (
              <button
                onClick={() => setCurrent(prev => (prev + 1) % banners.length)}
                className="p-3 hover:bg-secondary/50 transition-colors shrink-0"
              >
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Dots */}
          {banners.length > 1 && (
            <div className="flex justify-center gap-2 pb-4">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-border"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
