import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

const defaultAnnouncements = [
  "🚚 Free shipping on orders above KES 10,000 — Shop now at our Autoshop!",
  "📦 Track your shipments in real-time with Mapett Logistics",
  "🛡️ Get comprehensive cargo insurance — Request a quote today!",
  "🔧 New arrivals: Automotive Lubricants & Vehicle Accessories now available",
];

const AnnouncementBanner = () => {
  const [announcements, setAnnouncements] = useState<string[]>(defaultAnnouncements);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const { data } = await supabase
        .from("site_content")
        .select("title")
        .eq("section", "announcement")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (data && data.length > 0) {
        setAnnouncements(data.map(d => d.title).filter(Boolean) as string[]);
      }
    };
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  if (!isVisible || announcements.length === 0) return null;

  return (
    <div className="bg-accent text-accent-foreground relative overflow-hidden">
      <div className="container py-2 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-xs sm:text-sm font-medium text-center pr-8"
          >
            {announcements[currentIndex]}
          </motion.p>
        </AnimatePresence>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
          aria-label="Close announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
