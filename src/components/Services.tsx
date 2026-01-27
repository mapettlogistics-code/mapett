import { motion } from "framer-motion";
import { Plane, Ship, Truck, Warehouse, FileCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import airFreight from "@/assets/air-freight.jpg";
import oceanFreight from "@/assets/ocean-freight.jpg";
import roadTransport from "@/assets/road-transport.jpg";
import warehouseImg from "@/assets/warehouse.jpg";

const Services = () => {
  const services = [
    {
      icon: Plane,
      title: "Air Freight",
      description: "Fast, reliable air cargo services for time-sensitive shipments across global destinations.",
      image: airFreight,
      features: ["Express Delivery", "Cargo Tracking", "Custom Clearance"],
    },
    {
      icon: Ship,
      title: "Ocean Freight",
      description: "Cost-effective sea freight solutions for bulk cargo and containerized shipments worldwide.",
      image: oceanFreight,
      features: ["FCL & LCL", "Port to Port", "Door to Door"],
    },
    {
      icon: Truck,
      title: "Road Transport",
      description: "Efficient ground transportation network covering East Africa with reliable delivery schedules.",
      image: roadTransport,
      features: ["Cross-Border", "Last Mile", "Fleet Management"],
    },
    {
      icon: Warehouse,
      title: "Warehousing",
      description: "Secure storage and distribution facilities with advanced inventory management systems.",
      image: warehouseImg,
      features: ["Inventory Control", "Pick & Pack", "Distribution"],
    },
  ];

  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Logistics Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            From air freight to warehousing, we provide end-to-end logistics solutions tailored to your business needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center">
                      <service.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-background">{service.title}</h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-muted-foreground mb-4">{service.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Button 
                  variant="ghost" 
                  className="text-primary hover:text-primary hover:bg-primary/10 p-0 group/btn"
                >
                  Get Quote
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Service */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-card rounded-2xl p-8 shadow-card border border-border"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center shrink-0">
              <FileCheck className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-foreground mb-2">Customs Clearance</h3>
              <p className="text-muted-foreground">
                Expert customs clearance services ensuring smooth import and export processes at Mombasa Port, 
                JKIA, and all Kenyan border points.
              </p>
            </div>
            <Button className="hero-gradient text-primary-foreground shadow-glow hover:opacity-90">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
