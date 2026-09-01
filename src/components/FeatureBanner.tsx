import { motion } from "framer-motion";
import { Plane, Ship, Truck, FileCheck, Shield, Award } from "lucide-react";

const features = [
  {
    icon: Plane,
    title: "Complete Travel Solutions",
    description: "Air tickets, hotel booking, visas, tours & safaris, airport transfers, and travel essentials in one place.",
  },
  {
    icon: Ship,
    title: "Global Logistics",
    description: "Air freight, ocean freight, road & rail transport, and warehousing across Kenya and beyond.",
  },
  {
    icon: FileCheck,
    title: "Customs Clearance",
    description: "Smooth import and export clearance at Mombasa Port, JKIA, and all border points.",
  },
  {
    icon: Shield,
    title: "Comprehensive Insurance",
    description: "Marine cargo, air cargo, inland transit, life, and warehouse insurance coverage.",
  },
  {
    icon: Award,
    title: "Trusted Autostore",
    description: "Genuine automotive lubricants, batteries, tires, and accessories from authorized distributors.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description: "Next-day countrywide delivery and real-time shipment tracking you can count on.",
  },
];

const FeatureBanner = () => {
  return (
      <section className="bg-secondary/50 border-y border-border py-6">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <div className="w-full">
                <h3 className="font-semibold text-foreground text-sm">{feature.title}</h3>
                <p className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureBanner;