import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const promos = [
  {
    src: "/promo-circles/26JA_Thumbnail_Top-Sellers.gif",
    alt: "Special Offer",
    title: "Special Offers",
    link: "https://mapett.com/",
  },
  {
    src: "/promo-circles/banger-deals-ii.png",
    alt: "New Arrival",
    title: "New Arrivals",
    link: "https://mapett.com/",
  },
  {
    src: "/promo-circles/extra2.png",
    alt: "Autostore",
    title: "Autostore",
    link: "https://mapett.com/",
  },
  {
    src: "/promo-circles/flash-sale.png",
    alt: "Travel Deal",
    title: "Travel Deals",
    link: "https://mapett.com/",
  },
  {
    src: "/promo-circles/FREELINK1.png",
    alt: "Customs Clearance",
    title: "Customs Clearance",
    link: "https://mapett.com/",
  },
  {
    src: "/promo-circles/newonmapett.png",
    alt: "Insurance",
    title: "Insurance",
    link: "https://mapett.com/",
  },
  {
    src: "/promo-circles/newonmapett.png",
    alt: "Logistics",
    title: "Logistics",
    link: "https://mapett.com/",
  },
  {
    src: "/promo-circles/flash-sale.png",
    alt: "Travel Deal",
    title: "Travel Deals",
    link: "https://mapett.com/",
  },
];

const PromoCircleSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Visible items count based on container width
  const getItemWidth = () => 192; // 160px item + 32px gap (approx)

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const scrollAmount = index * getItemWidth();
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const itemWidth = getItemWidth();
      const currentPosition = scrollRef.current.scrollLeft;
      const maxPosition = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

      let newPosition;
      if (direction === "right") {
        newPosition = Math.min(currentPosition + itemWidth, maxPosition);
      } else {
        newPosition = Math.max(currentPosition - itemWidth, 0);
      }

      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });

      // Calculate new active index
      const newIndex = Math.round(newPosition / itemWidth);
      setActiveIndex(newIndex);
    }
  };

  // Update active index on scroll
  useEffect(() => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    let ticking = false;

    const updateActiveIndex = () => {
      if (!container) return;
      const index = Math.round(container.scrollLeft / getItemWidth());
      setActiveIndex(Math.min(index, promos.length - 1));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveIndex);
        ticking = true;
      }
    };

    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  // Limit visible progress indicators (show first 5 + ...)
  const visibleDots = promos.length <= 6 ? promos.length : 4;
  const showAllDots = promos.length <= 6;

  return (
    <section className="py-12 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Our Promotions
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={activeIndex === 0}
              className="w-9 h-9 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Scroll left"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              onClick={() => scroll("right")}
              disabled={activeIndex >= promos.length - 1}
              className="w-9 h-9 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Scroll right"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-p-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {promos.map((promo, index) => (
            <motion.div
              key={`${promo.alt}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group flex flex-col items-center gap-3 flex-shrink-0"
            >
              <div
                className={`w-40 h-40 rounded-full overflow-hidden border-4 shadow-lg transition-all ${
                  activeIndex === index
                    ? 'border-primary scale-105 shadow-xl'
                    : 'border-muted hover:border-primary hover:scale-105'
                }`}
              >
                <a
                  href={promo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <img
                    src={promo.src}
                    alt={promo.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </a>
              </div>
              <span className="text-sm font-bold text-foreground text-center">
                {promo.title}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom Navigation Dots */}
        <div className="mt-6 flex justify-center gap-3">
          {promos.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`relative transition-all duration-300 ${
                activeIndex === index
                  ? 'w-6 h-3 bg-primary rounded-full'
                  : 'w-3 h-3 bg-muted rounded-full hover:bg-primary/50'
              }`}
              aria-label={`Go to promo ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoCircleSection;