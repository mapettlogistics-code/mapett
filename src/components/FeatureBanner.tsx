import { motion } from "framer-motion";
import { Plane, Ship, Truck, FileCheck, Shield, Award } from "lucide-react";

const features = [
  {
    icon: Plane,
    title: "Complete Travel Solutions",
  },
  {
    icon: Ship,
    title: "Global Logistics",
  },
  {
    icon: FileCheck,
    title: "Customs Clearing & Forwarding",
  },
  {
    icon: Shield,
    title: "Comprehensive Insurance",
  },
  {
    icon: Award,
    title: "Trusted Autostore",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureBanner;