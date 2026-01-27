import { motion } from "framer-motion";
import { ShoppingCart, Star, ArrowRight, Droplets, Battery, Wrench, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

const Marketplace = () => {
  const categories = [
    {
      icon: Droplets,
      title: "Automotive Lubricants",
      description: "High-performance oils for trucks, buses, cars, and motorbikes",
      productCount: 45,
      color: "from-pink-500 to-rose-600",
    },
    {
      icon: Wrench,
      title: "Industrial Lubricants",
      description: "Precision lubricants for manufacturing and industrial needs",
      productCount: 32,
      color: "from-pink-600 to-pink-700",
    },
    {
      icon: Battery,
      title: "Vehicle Batteries",
      description: "Sturdy & trustworthy battery brands for all vehicles",
      productCount: 28,
      color: "from-rose-500 to-pink-600",
    },
    {
      icon: Car,
      title: "Vehicle Accessories",
      description: "Seat covers, boot organizers, car fridges and more",
      productCount: 56,
      color: "from-pink-400 to-rose-500",
    },
  ];

  const featuredProducts = [
    {
      name: "DELSTAR SYN SAE 10W40",
      category: "Engine Oil",
      price: 900,
      originalPrice: 1160,
      rating: 4.8,
      image: "https://www.mapettlogistics.com/cdn/shop/files/DELSTAR_30D_MULTIGRADE_15W40_5L.jpg?v=1746752133&width=400",
    },
    {
      name: "PETSAR SUPER SAE 20W50",
      category: "Engine Oil",
      price: 350,
      originalPrice: 450,
      rating: 4.9,
      image: "https://www.mapettlogistics.com/cdn/shop/files/PETSAR_SUPER_MULTIGRADE_20W50_4L.jpg?v=1746752246&width=400",
    },
    {
      name: "DELSTAR Long Life Coolant",
      category: "Coolant",
      price: 500,
      originalPrice: 650,
      rating: 4.7,
      image: "https://www.mapettlogistics.com/cdn/shop/files/PETSAR_RTU_LL_COOLANT_5L.jpg?v=1746752229&width=400",
    },
    {
      name: "SLUSOL Hydraulic Oil AW 68",
      category: "Hydraulic Oil",
      price: 7200,
      originalPrice: 8750,
      rating: 4.8,
      image: "https://www.mapettlogistics.com/cdn/shop/collections/DRUM.jpg?v=1764765982&width=400",
    },
  ];

  return (
    <section id="marketplace" className="py-24">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
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

        {/* Categories */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer border border-border hover:border-primary/30"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{category.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary font-medium">{category.productCount} Products</span>
                <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-foreground mb-2">Featured Products</h3>
          <p className="text-muted-foreground">Top-selling automotive products from Mapett Autostore</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  Sale
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</span>
                <h4 className="font-semibold text-foreground mt-1 mb-2 line-clamp-2">{product.name}</h4>
                
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium text-foreground">{product.rating}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-primary">KES {product.price.toLocaleString()}</span>
                    <span className="ml-2 text-sm text-muted-foreground line-through">KES {product.originalPrice.toLocaleString()}</span>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
                    <ShoppingCart className="h-5 w-5 text-primary-foreground" />
                  </button>
                </div>
              </div>
            </motion.div>
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
