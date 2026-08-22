import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Warehouse, Thermometer, Container, Network, FileCheck, ArrowRight, Plane, Ship, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServicePageLink } from "@/data/serviceRoutes";

// Import service images
import airFreightImg from "@/assets/service-air-freight.jpg";
import oceanFreightImg from "@/assets/service-ocean-freight.jpg";
import roadTransportImg from "@/assets/service-road-transport.jpg";
import warehouseImg from "@/assets/service-warehouse.jpg";
import customsImg from "@/assets/service-customs.jpg";
import refrigeratedImg from "@/assets/service-refrigerated.jpg";
import specialCargoImg from "@/assets/service-special-cargo.jpg";
import intermodalImg from "@/assets/service-intermodal.jpg";

const Services = ({ showAll = false }: { showAll?: boolean }) => {
  const services = [
    {
      icon: FileCheck,
      title: "Customs Clearance",
      description: "Expert customs services at Mombasa Port, JKIA, and border points.",
      features: ["Documentation", "Compliance", "Fast Clearance"],
      image: customsImg,
    },
    {
      icon: Plane,
      title: "Air Freight",
      description: "Fast and reliable air cargo services for time-sensitive shipments worldwide.",
      features: ["Express Delivery", "Global Network", "Door to Door"],
      image: airFreightImg,
    },
    {
      icon: Ship,
      title: "Ocean Freight",
      description: "Cost-effective sea freight solutions for large volume shipments.",
      features: ["FCL & LCL", "Port to Port", "Container Tracking"],
      image: oceanFreightImg,
    },
    {
      icon: Truck,
      title: "Road & Rail Transport",
      description: "Efficient road logistics across East Africa with real-time tracking.",
      features: ["Cross Border", "Last Mile", "Fleet Management"],
      image: roadTransportImg,
    },
    {
      icon: Warehouse,
      title: "Warehousing",
      description: "Secure storage and distribution facilities with inventory management.",
      features: ["Inventory Control", "Pick & Pack", "Distribution"],
      image: warehouseImg,
    },
    {
      icon: Thermometer,
      title: "Refrigerated Cargo",
      description: "Temperature-controlled transport for perishable goods.",
      features: ["Cold Chain", "Monitoring", "Perishables"],
      image: refrigeratedImg,
    },
    {
      icon: Container,
      title: "Special Cargo",
      description: "Expert handling of oversized and heavy-lift cargo.",
      features: ["Heavy Lift", "Out of Gauge", "Project Cargo"],
      image: specialCargoImg,
    },
    {
      icon: Network,
      title: "Intermodal Solutions",
      description: "Seamless multi-modal transport across road, rail, and sea.",
      features: ["Multi-Modal", "Door to Door", "Network"],
      image: intermodalImg,
    },
  ];

  const displayServices = services;

  return (
    <section id="services" className={showAll ? "pt-8 pb-20 bg-secondary/30" : "py-20 bg-secondary/30"}>
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
          {displayServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              {/* Service Image */}
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                {/* Icon overlay */}
                <div className="absolute bottom-2 left-3 w-10 h-10 rounded-lg hero-gradient flex items-center justify-center shadow-lg">
                  <service.icon className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
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
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto text-sm group/btn"
                >
                  <Link to={getServicePageLink(service.title)}>
                    Learn More
                    <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
