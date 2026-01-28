import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Warehouse, Thermometer, Container, Network, ShoppingCart, MessageCircle, Plane, Ship, Truck, FileCheck, Shield, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

// New slider images with popular cargo brands
import sliderAirFreight from "@/assets/slider-air-freight.jpg";
import sliderOceanFreight from "@/assets/slider-ocean-freight.jpg";
import sliderRoadTransport from "@/assets/slider-road-transport.jpg";
import sliderWarehouse from "@/assets/slider-warehouse.jpg";
import sliderCustoms from "@/assets/slider-customs.jpg";
import sliderRefrigerated from "@/assets/slider-refrigerated.jpg";
import sliderSpecialCargo from "@/assets/slider-special-cargo.jpg";
import sliderIntermodal from "@/assets/slider-intermodal.jpg";
import sliderEcommerce from "@/assets/slider-ecommerce.jpg";
import sliderInsurance from "@/assets/slider-insurance.jpg";
import sliderSupport from "@/assets/slider-support.jpg";
import sliderMarketplace from "@/assets/slider-marketplace.jpg";

const slides = [
  {
    icon: Plane,
    title: "AIR FREIGHT",
    subtitle: "Fast global delivery",
    description: "Time-sensitive shipments delivered worldwide with our extensive airline network",
    gradient: "from-primary/90 to-accent/70",
    image: sliderAirFreight,
    link: "#services",
  },
  {
    icon: Ship,
    title: "OCEAN FREIGHT",
    subtitle: "Cost-effective sea solutions",
    description: "FCL and LCL services connecting Mombasa to major ports globally",
    gradient: "from-accent/90 to-primary/70",
    image: sliderOceanFreight,
    link: "#services",
  },
  {
    icon: Truck,
    title: "ROAD TRANSPORT",
    subtitle: "East Africa coverage",
    description: "Reliable road logistics across Kenya, Uganda, Tanzania, and beyond",
    gradient: "from-primary/80 to-pink-600/70",
    image: sliderRoadTransport,
    link: "#services",
  },
  {
    icon: Warehouse,
    title: "WAREHOUSING",
    subtitle: "Secure storage solutions",
    description: "Advanced inventory management with strategic locations across East Africa",
    gradient: "from-pink-600/80 to-primary/70",
    image: sliderWarehouse,
    link: "#services",
  },
  {
    icon: FileCheck,
    title: "CUSTOMS CLEARANCE",
    subtitle: "Smooth import & export",
    description: "Expert customs services at Mombasa Port, JKIA, and all border points",
    gradient: "from-accent/80 to-primary/80",
    image: sliderCustoms,
    link: "#services",
  },
  {
    icon: Thermometer,
    title: "REFRIGERATED CARGO",
    subtitle: "Cold chain excellence",
    description: "Temperature-controlled transport for perishable goods with real-time monitoring",
    gradient: "from-primary/85 to-accent/75",
    image: sliderRefrigerated,
    link: "#services",
  },
  {
    icon: Container,
    title: "SPECIAL CARGO",
    subtitle: "Expert handling",
    description: "Oversized, heavy-lift, and project cargo with specialized equipment",
    gradient: "from-primary/90 to-accent/70",
    image: sliderSpecialCargo,
    link: "#services",
  },
  {
    icon: Network,
    title: "INTERMODAL SOLUTIONS",
    subtitle: "Multi-modal transport",
    description: "Connecting your cargo across road, rail, and sea networks globally",
    gradient: "from-accent/90 to-primary/70",
    image: sliderIntermodal,
    link: "#services",
  },
  {
    icon: ShoppingCart,
    title: "eCOMMERCE SOLUTIONS",
    subtitle: "Digital shipping",
    description: "Quick, convenient tools to save time and streamline your logistics",
    gradient: "from-primary/80 to-pink-600/70",
    image: sliderEcommerce,
    link: "#services",
  },
  {
    icon: Shield,
    title: "INSURANCE SERVICES",
    subtitle: "Protect your cargo",
    description: "Comprehensive cargo insurance covering all risk, marine, and transit protection",
    gradient: "from-pink-600/80 to-primary/70",
    image: sliderInsurance,
    link: "#insurance",
  },
  {
    icon: MessageCircle,
    title: "LIVE SUPPORT",
    subtitle: "24/7 assistance",
    description: "Quick responses to your shipping queries across various regions",
    gradient: "from-accent/80 to-primary/80",
    image: sliderSupport,
    link: "#contact",
  },
  {
    icon: Store,
    title: "AUTOSHOP",
    subtitle: "Quality auto products",
    description: "Shop tires, batteries, lubricants, safety boots and more for your fleet",
    gradient: "from-primary/85 to-accent/75",
    image: sliderMarketplace,
    link: "#autoshop",
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
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
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
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${slide.gradient} mb-4 shadow-xl`}
              >
                <IconComponent className="w-8 h-8 text-white" />
              </motion.div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-primary font-semibold mb-3">
                {slide.subtitle}
              </p>

              {/* Description */}
              <p className="text-base text-background/80 mb-6 max-w-xl">
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
                  className="bg-gradient-to-r from-primary via-pink-500 to-accent text-primary-foreground px-6 py-5 text-base font-semibold rounded-xl shadow-[0_0_30px_rgba(219,39,119,0.4)] hover:shadow-[0_0_50px_rgba(219,39,119,0.6)] transition-all duration-300"
                >
                  Learn More
                </Button>
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-6 left-0 right-0">
          <div className="container flex items-center justify-between">
            {/* Dots Navigation */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? "bg-primary w-6" 
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSlider;
