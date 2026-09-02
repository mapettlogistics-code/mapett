import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const promos = [
  {
    src: "/public/promo-circles/suitcase2.jpg",
    alt: "Special Offer",
    link: "/products-services",
  },
  {
    src: "/promo-circles/new-arrival.jpg",
    alt: "New Arrival",
    link: "/autostore",
  },
  {
    src: "/promo-circles/autostore.jpg",
    alt: "Autostore",
    link: "https://mapett.com/",
  },
  {
    src: "/promo-circles/travel-deal.jpg",
    alt: "Travel Deal",
    link: "/flight-booking",
  },
  {
    src: "/promo-circles/customs-clearance.jpg",
    alt: "Customs Clearance",
    link: "/customs-clearing-forwarding",
  },
  {
    src: "/promo-circles/insurance.jpg",
    alt: "Insurance",
    link: "/insurance",
  },
  {
    src: "/promo-circles/logistics.jpg",
    alt: "Logistics",
    link: "/road-rail-transport",
  },
];

const PromoCircleSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!isHovered) {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= container.scrollWidth - container.clientWidth) {
          scrollPosition = 0;
        }
        container.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
              className="w-9 h-9 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {promos.map((promo, index) => (
            <motion.a
              key={promo.alt}
              href={promo.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex-shrink-0 w-40 h-40 rounded-full overflow-hidden border-4 border-primary shadow-lg hover:shadow-xl transition-all"
            >
              <img
                src={promo.src}
                alt={promo.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoCircleSection;