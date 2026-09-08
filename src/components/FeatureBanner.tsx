import { motion } from "framer-motion";
import clockImage from "@/assets/247-re.png";
import shoppingBagImage from "@/assets/fast-response.png";
import headsetImage from "@/assets/delivery.png";
import BadgePercentImage from "@/assets/secure.png";
import TruckImage from "@/assets/quality.png";
import GlobalImage from "@/assets/global.png";


const features = [
  {
    image: clockImage,
    title: "Round-the-Clock Support",
  },
  {
    image: shoppingBagImage,
    title: "Fast Response",
  },
  {
    image: headsetImage,
    title: "Fast Delivery",
  },
  {
    image: BadgePercentImage,
    title: "Trusted &Secure",
  },
  {
    image: TruckImage,
    title: "Premium Quality",
  },
  {
    image: GlobalImage,
    title: "Global Reach",
  },
];

const FeatureBanner = () => {
  return (
    <section className="bg-secondary/50 border-y border-border py-5">
      <div className="container">
        <div className="flex items-center justify-between gap-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center flex-1"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-3">
                {feature.image ? (
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="max-w-full max-h-full w-auto h-auto object-contain" 
                  />
                ) : (
                  feature.image && <img src={feature.image} alt={feature.title} className="h-25 w-25 text-primary drop-shadow-md" />
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