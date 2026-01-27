import { motion } from "framer-motion";
import { Warehouse, Thermometer, Container, Network, ShoppingCart, MessageCircle, FileCheck, ArrowRight, Shield, Plane, Ship, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      icon: Plane,
      title: "Air Freight",
      description: "Fast and reliable air cargo services for time-sensitive shipments worldwide.",
      features: ["Express Delivery", "Global Network", "Door to Door"],
    },
    {
      icon: Ship,
      title: "Ocean Freight",
      description: "Cost-effective sea freight solutions for large volume shipments.",
      features: ["FCL & LCL", "Port to Port", "Container Tracking"],
    },
    {
      icon: Truck,
      title: "Road Transport",
      description: "Efficient road logistics across East Africa with real-time tracking.",
      features: ["Cross Border", "Last Mile", "Fleet Management"],
    },
    {
      icon: Warehouse,
      title: "Warehousing",
      description: "Secure storage and distribution facilities with inventory management.",
      features: ["Inventory Control", "Pick & Pack", "Distribution"],
    },
    {
      icon: FileCheck,
      title: "Customs Clearance",
      description: "Expert customs services at Mombasa Port, JKIA, and border points.",
      features: ["Documentation", "Compliance", "Fast Clearance"],
    },
    {
      icon: Thermometer,
      title: "Refrigerated Cargo",
      description: "Temperature-controlled transport for perishable goods.",
      features: ["Cold Chain", "Monitoring", "Perishables"],
    },
    {
      icon: Container,
      title: "Special Cargo",
      description: "Expert handling of oversized and heavy-lift cargo.",
      features: ["Heavy Lift", "Out of Gauge", "Project Cargo"],
    },
    {
      icon: Network,
      title: "Intermodal Solutions",
      description: "Seamless multi-modal transport across road, rail, and sea.",
      features: ["Multi-Modal", "Door to Door", "Network"],
    },
    {
      icon: ShoppingCart,
      title: "eCommerce Solutions",
      description: "Digital shipping tools for quick and convenient logistics.",
      features: ["Online Booking", "Instant Quotes", "Digital Docs"],
    },
    {
      icon: Shield,
      title: "Insurance Services",
      description: "Comprehensive cargo insurance to protect your shipments.",
      features: ["All Risk Cover", "Marine Insurance", "Claims Support"],
    },
    {
      icon: MessageCircle,
      title: "Live Support",
      description: "24/7 dedicated support teams across various regions.",
      features: ["24/7 Support", "Real-time Chat", "Expert Advice"],
    },
  ];

  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Logistics Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            End-to-end logistics solutions tailored to your business needs.
          </p>
        </motion.div>

        {/* Services Grid - 4 columns on desktop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center mb-3">
                <service.icon className="h-5 w-5 text-primary-foreground" />
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-foreground mb-2">{service.title}</h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{service.description}</p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-1 mb-3">
                {service.features.slice(0, 2).map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <Button 
                variant="ghost" 
                size="sm"
                className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto text-sm group/btn"
              >
                Learn More
                <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
