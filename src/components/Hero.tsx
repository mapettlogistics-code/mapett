import { motion } from "framer-motion";
import { ArrowRight, Play, Truck, Package, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-logistics.jpg";

const Hero = () => {
  const stats = [
    { icon: Truck, value: "10+", label: "Years Experience" },
    { icon: Package, value: "50K+", label: "Deliveries" },
    { icon: Globe, value: "15+", label: "Countries" },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Mapett Logistics Kenya"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-background"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary-foreground">Kenya's Trusted Logistics Partner</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Delivering Excellence{" "}
              <span className="text-primary">Across Africa</span>
            </h1>

            <p className="text-lg text-background/80 mb-8 max-w-xl">
              From Mombasa Port to your doorstep, we provide comprehensive logistics solutions including air freight, ocean freight, road transport, and warehousing services.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Button 
                size="lg" 
                className="hero-gradient text-primary-foreground shadow-glow hover:opacity-90 group"
              >
                Get a Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground/50 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 backdrop-blur-sm"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Video
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-3xl font-bold text-background">{stat.value}</div>
                  <div className="text-sm text-background/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Quote Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-2">Request a Quote</h3>
              <p className="text-muted-foreground text-sm mb-6">Get instant pricing for your shipment</p>
              
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">From</label>
                    <input
                      type="text"
                      placeholder="Origin City"
                      className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">To</label>
                    <input
                      type="text"
                      placeholder="Destination"
                      className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground">Service Type</label>
                  <select className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option>Air Freight</option>
                    <option>Ocean Freight</option>
                    <option>Road Transport</option>
                    <option>Warehousing</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Weight (kg)</label>
                  <input
                    type="number"
                    placeholder="Enter weight"
                    className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <Button className="w-full hero-gradient text-primary-foreground shadow-glow hover:opacity-90">
                  Get Instant Quote
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
