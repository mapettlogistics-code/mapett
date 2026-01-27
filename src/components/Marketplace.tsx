import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Droplets, Battery, Wrench, Car, CircleDot, Shield, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryProductSlider from "./marketplace/CategoryProductSlider";

const Marketplace = () => {
  const categories = [
    {
      icon: Droplets,
      title: "Automotive Lubricants",
      description: "High-performance oils for trucks, buses, cars, and motorbikes",
      productCount: 45,
      color: "from-primary to-pink-600",
      categoryKey: "lubricants",
    },
    {
      icon: CircleDot,
      title: "Tires",
      description: "Quality tires for all vehicle types - cars, trucks, and motorbikes",
      productCount: 38,
      color: "from-gray-600 to-gray-800",
      categoryKey: "tires",
    },
    {
      icon: Battery,
      title: "Vehicle Batteries",
      description: "Sturdy & trustworthy battery brands for all vehicles",
      productCount: 28,
      color: "from-yellow-500 to-orange-600",
      categoryKey: "batteries",
    },
    {
      icon: HardHat,
      title: "Safety Boots",
      description: "Industrial safety footwear for workplace protection",
      productCount: 24,
      color: "from-amber-600 to-amber-800",
      categoryKey: "boots",
    },
    {
      icon: Shield,
      title: "Insurance",
      description: "Life insurance and motor vehicle insurance solutions",
      productCount: 8,
      color: "from-accent to-accent/80",
      categoryKey: "insurance",
    },
    {
      icon: Wrench,
      title: "Industrial Lubricants",
      description: "Precision lubricants for manufacturing and industrial needs",
      productCount: 32,
      color: "from-primary to-pink-700",
      categoryKey: "industrial",
    },
    {
      icon: Car,
      title: "Vehicle Accessories",
      description: "Seat covers, boot organizers, car fridges and more",
      productCount: 56,
      color: "from-pink-400 to-primary",
      categoryKey: "accessories",
    },
  ];

  const productSliders = [
    { category: "lubricants", title: "Automotive Lubricants", color: "from-primary to-pink-600" },
    { category: "tires", title: "Tires & Wheels", color: "from-gray-600 to-gray-800" },
    { category: "batteries", title: "Vehicle Batteries", color: "from-yellow-500 to-orange-600" },
    { category: "boots", title: "Safety Boots & Footwear", color: "from-amber-600 to-amber-800" },
    { category: "accessories", title: "Vehicle Accessories", color: "from-pink-400 to-primary" },
  ];

  return (
    <section id="marketplace" className="py-24">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            One-Stop Auto Store
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mapett Marketplace
          </h2>
          <p className="text-muted-foreground text-lg">
            Quality automotive lubricants, batteries, and accessories delivered across Kenya. 
            Free delivery on orders above KES 5,001.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-card rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer border border-border hover:border-primary/30"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <category.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-1">{category.title}</h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary font-medium">{category.productCount} Products</span>
                <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
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
          <Button size="lg" className="hero-gradient text-primary-foreground shadow-glow hover:opacity-90 group">
            Explore All Products
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Marketplace;