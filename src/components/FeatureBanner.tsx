import { motion } from "framer-motion";
import { ShoppingBag, Headset, BadgePercent, Truck } from "lucide-react";
import clockImage from "@/assets/24-hours_548954.png";

const features = [
  {
    image: clockImage,
    title: "Round-the-Clock Support",
  },
  {
    icon: ShoppingBag,
    title: "Shop Online Anytime, Anywhere",
  },
  {
    icon: Headset,
    title: "Dedicated Customer Care You Can Trust",
  },
  {
    icon: BadgePercent,
    title: "Unbeatable Value for Money",
  },
  {
    icon: Truck,
    title: "Fast Country-Wide Delivery",
  },
];

const FeatureBanner = () => {
  return (
      <section className="bg-secondary/50 border-y border-border py-6">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                {feature.image ? (
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                ) : (
                  feature.icon && <feature.icon className="h-6 w-6" />
                )}
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