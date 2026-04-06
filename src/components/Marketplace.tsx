import { motion } from "framer-motion";
import { ArrowRight, Droplets, Battery, Wrench, Car, CircleDot, HardHat, Wheat, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryProductSlider from "./marketplace/CategoryProductSlider";

// Import category images
import categoryLubricants from "@/assets/category-lubricants.jpg";
import categoryTires from "@/assets/category-tires.jpg";
import categoryBatteries from "@/assets/category-batteries.jpg";
import categoryBoots from "@/assets/category-boots.jpg";
import categoryIndustrial from "@/assets/category-industrial.jpg";
import categoryAccessories from "@/assets/category-accessories.jpg";

const Autoshop = () => {
  const categories = [
    {
      icon: Droplets,
      title: "Automotive Lubricants",
      description: "High-performance oils for trucks, buses, cars, and motorbikes",
      productCount: 45,
      color: "from-primary to-pink-600",
      categoryKey: "lubricants",
      image: categoryLubricants,
    },
    {
      icon: Utensils,
      title: "Food Grade Lubricants",
      description: "Safe lubricants for food processing and beverage industries",
      productCount: 15,
      color: "from-green-500 to-green-700",
      categoryKey: "food-grade-lubricants",
      image: categoryLubricants,
    },
    {
      icon: Wheat,
      title: "Agricultural Lubricants",
      description: "Specialized lubricants for farming equipment and machinery",
      productCount: 20,
      color: "from-lime-500 to-green-600",
      categoryKey: "agricultural-lubricants",
      image: categoryLubricants,
    },
    {
      icon: Wrench,
      title: "Industrial Lubricants",
      description: "Precision lubricants for manufacturing and industrial needs",
      productCount: 32,
      color: "from-primary to-pink-700",
      categoryKey: "industrial-lubricants",
      image: categoryIndustrial,
    },
    {
      icon: Car,
      title: "Vehicle Accessories",
      description: "Seat covers, boot organizers, car fridges and more",
      productCount: 56,
      color: "from-pink-400 to-primary",
      categoryKey: "accessories",
      image: categoryAccessories,
    },
    {
      icon: HardHat,
      title: "Safety Shoes",
      description: "Industrial safety footwear for workplace protection",
      productCount: 24,
      color: "from-amber-600 to-amber-800",
      categoryKey: "safety-shoes",
      image: categoryBoots,
    },
    {
      icon: CircleDot,
      title: "Vehicle Tires",
      description: "Quality tires for all vehicle types - cars, trucks, and motorbikes",
      productCount: 38,
      color: "from-gray-600 to-gray-800",
      categoryKey: "tires",
      image: categoryTires,
    },
    {
      icon: Battery,
      title: "Vehicle Batteries",
      description: "Sturdy & trustworthy battery brands for all vehicles",
      productCount: 28,
      color: "from-yellow-500 to-orange-600",
      categoryKey: "batteries",
      image: categoryBatteries,
    },
  ];

  const productSliders = [
    { category: "lubricants", title: "Automotive Lubricants", color: "from-primary to-pink-600" },
    { category: "tires", title: "Vehicle Tires", color: "from-gray-600 to-gray-800" },
    { category: "batteries", title: "Vehicle Batteries", color: "from-yellow-500 to-orange-600" },
    { category: "safety-shoes", title: "Safety Shoes", color: "from-amber-600 to-amber-800" },
    { category: "accessories", title: "Vehicle Accessories", color: "from-pink-400 to-primary" },
  ];

  return (
    <section id="autoshop" className="py-24">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            One-Stop Autoshop
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mapett Autoshop
          </h2>
          <p className="text-muted-foreground text-lg">
            Quality automotive lubricants, batteries, and accessories delivered across Kenya. 
            Free delivery on orders above KES 5,001.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {categories.map((category, index) => (
            <a href={`https://mappetstore.com/products?category=${category.categoryKey}`} target="_blank" rel="noopener noreferrer" key={category.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer border border-border hover:border-primary/30"
              >
                {/* Category Image */}
                <div className="relative h-28 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  {/* Icon overlay */}
                  <div className={`absolute bottom-2 left-3 w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                    <category.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-base font-bold text-foreground mb-1">{category.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary font-medium">{category.productCount} Products</span>
                    <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </a>
          ))}
        </div>

        {/* Category Product Sliders */}
        <div className="space-y-4">
          {productSliders.map((slider) => (
            <CategoryProductSlider
              key={slider.category}
              category={slider.category}
              title={slider.title}
              color={slider.color}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="https://mappetstore.com/products" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="hero-gradient text-primary-foreground shadow-glow hover:opacity-90 group">
            Explore All Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Autoshop;
