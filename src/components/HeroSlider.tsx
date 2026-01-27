import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Warehouse, Thermometer, Container, Network, ShoppingCart, MessageCircle, Plane, Ship, Truck, FileCheck, Shield, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

// Service images
import airFreightImg from "@/assets/service-air-freight.jpg";
import oceanFreightImg from "@/assets/service-ocean-freight.jpg";
import roadTransportImg from "@/assets/service-road-transport.jpg";
import warehouseImg from "@/assets/service-warehouse.jpg";
import customsImg from "@/assets/service-customs.jpg";
import refrigeratedImg from "@/assets/service-refrigerated.jpg";
import specialCargoImg from "@/assets/service-special-cargo.jpg";
import intermodalImg from "@/assets/service-intermodal.jpg";
import ecommerceImg from "@/assets/service-ecommerce.jpg";
import insuranceImg from "@/assets/service-insurance.jpg";
import supportImg from "@/assets/service-support.jpg";
import marketplaceImg from "@/assets/service-marketplace.jpg";

const slides = [
  {
    icon: Plane,
    title: "AIR FREIGHT",
    subtitle: "Fast global delivery",
    description: "Time-sensitive shipments delivered worldwide with our extensive airline network",
    gradient: "from-primary/90 to-accent/70",
    image: airFreightImg,
    link: "#services",
  },
  {
    icon: Ship,
    title: "OCEAN FREIGHT",
    subtitle: "Cost-effective sea solutions",
    description: "FCL and LCL services connecting Mombasa to major ports globally",
    gradient: "from-accent/90 to-primary/70",
    image: oceanFreightImg,
    link: "#services",
  },
  {
    icon: Truck,
    title: "ROAD TRANSPORT",
    subtitle: "East Africa coverage",
    description: "Reliable road logistics across Kenya, Uganda, Tanzania, and beyond",
    gradient: "from-primary/80 to-pink-600/70",
    image: roadTransportImg,
    link: "#services",
  },
  {
    icon: Warehouse,
    title: "WAREHOUSING",
    subtitle: "Secure storage solutions",
    description: "Advanced inventory management with strategic locations across East Africa",
    gradient: "from-pink-600/80 to-primary/70",
    image: warehouseImg,
    link: "#services",
  },
  {
    icon: FileCheck,
    title: "CUSTOMS CLEARANCE",
    subtitle: "Smooth import & export",
    description: "Expert customs services at Mombasa Port, JKIA, and all border points",
    gradient: "from-accent/80 to-primary/80",
    image: customsImg,
    link: "#services",
  },
  {
    icon: Thermometer,
    title: "REFRIGERATED CARGO",
    subtitle: "Cold chain excellence",
    description: "Temperature-controlled transport for perishable goods with real-time monitoring",
    gradient: "from-primary/85 to-accent/75",
    image: refrigeratedImg,
    link: "#services",
  },
  {
    icon: Container,
    title: "SPECIAL CARGO",
    subtitle: "Expert handling",
    description: "Oversized, heavy-lift, and project cargo with specialized equipment",
    gradient: "from-primary/90 to-accent/70",
    image: specialCargoImg,
    link: "#services",
  },
  {
    icon: Network,
    title: "INTERMODAL SOLUTIONS",
    subtitle: "Multi-modal transport",
    description: "Connecting your cargo across road, rail, and sea networks globally",
    gradient: "from-accent/90 to-primary/70",
    image: intermodalImg,
    link: "#services",
  },
  {
    icon: ShoppingCart,
    title: "eCOMMERCE SOLUTIONS",
    subtitle: "Digital shipping",
    description: "Quick, convenient tools to save time and streamline your logistics",
    gradient: "from-primary/80 to-pink-600/70",
    image: ecommerceImg,
    link: "#services",
  },
  {
    icon: Shield,
    title: "INSURANCE SERVICES",
    subtitle: "Protect your cargo",
    description: "Comprehensive cargo insurance covering all risk, marine, and transit protection",
    gradient: "from-pink-600/80 to-primary/70",
    image: insuranceImg,
    link: "#insurance",
  },
  {
    icon: MessageCircle,
    title: "LIVE SUPPORT",
    subtitle: "24/7 assistance",
    description: "Quick responses to your shipping queries across various regions",
    gradient: "from-accent/80 to-primary/80",
    image: supportImg,
    link: "#contact",
  },
  {
    icon: Store,
    title: "MARKETPLACE",
    subtitle: "Quality auto products",
    description: "Shop tires, batteries, lubricants, safety boots and more for your fleet",
    gradient: "from-primary/85 to-accent/75",
    image: marketplaceImg,
    link: "#marketplace",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const slide = slides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image - Changes with each slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="text-background"
            >
              {/* Icon Badge */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${slide.gradient} mb-6 shadow-xl`}
              >
                <IconComponent className="w-10 h-10 text-white" />
              </motion.div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-primary font-semibold mb-4">
                {slide.subtitle}
              </p>

              {/* Description */}
              <p className="text-lg text-background/80 mb-8 max-w-xl">
                {slide.description}
              </p>

              {/* CTA Button */}
              <motion.a
                href={slide.link}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary via-pink-500 to-accent text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-[0_0_30px_rgba(219,39,119,0.4)] hover:shadow-[0_0_50px_rgba(219,39,119,0.6)] transition-all duration-300"
                >
                  Learn More
                </Button>
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container flex items-center justify-between">
            {/* Dots Navigation */}
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? "bg-primary w-8" 
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow Navigation */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="w-12 h-12 rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="w-12 h-12 rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSlider;
