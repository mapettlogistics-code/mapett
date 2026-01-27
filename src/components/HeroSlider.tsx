import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Warehouse, Thermometer, Container, Network, ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-logistics.jpg";

const slides = [
  {
    icon: Warehouse,
    title: "WAREHOUSING SOLUTIONS",
    subtitle: "Secure storage and distribution",
    description: "Advanced inventory management with strategic locations across East Africa",
    gradient: "from-primary/90 to-accent/70",
  },
  {
    icon: Thermometer,
    title: "REFRIGERATED CARGO",
    subtitle: "Cold chain excellence",
    description: "Temperature-controlled transport for perishable goods with real-time monitoring",
    gradient: "from-accent/90 to-primary/70",
  },
  {
    icon: Container,
    title: "SPECIAL CARGO",
    subtitle: "Expert handling for unique shipments",
    description: "Oversized, heavy-lift, and project cargo with specialized equipment",
    gradient: "from-primary/80 to-pink-600/70",
  },
  {
    icon: Network,
    title: "INTERMODAL SOLUTIONS",
    subtitle: "Seamless multi-modal transport",
    description: "Connecting your cargo across road, rail, and sea networks globally",
    gradient: "from-pink-600/80 to-primary/70",
  },
  {
    icon: ShoppingCart,
    title: "eCOMMERCE SOLUTIONS",
    subtitle: "Digital shipping made simple",
    description: "Quick, convenient tools to save time and streamline your logistics",
    gradient: "from-accent/80 to-primary/80",
  },
  {
    icon: MessageCircle,
    title: "LIVE SUPPORT",
    subtitle: "24/7 expert assistance",
    description: "Quick responses to your shipping queries across various regions",
    gradient: "from-primary/85 to-accent/75",
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
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Mapett Logistics Kenya"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/40" />
      </div>

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
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary via-pink-500 to-accent text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-[0_0_30px_rgba(219,39,119,0.4)] hover:shadow-[0_0_50px_rgba(219,39,119,0.6)] transition-all duration-300"
                >
                  Learn More
                </Button>
              </motion.div>
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
