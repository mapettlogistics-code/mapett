import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, ArrowRight, Droplets, Battery, Wrench, Car, Loader2, CircleDot, Shield, HardHat, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import useEmblaCarousel from "embla-carousel-react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price: number | null;
  image_url: string | null;
  rating: number | null;
  is_featured: boolean | null;
};

const Marketplace = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  
  // Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .limit(4);

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const categories = [
    {
      icon: Droplets,
      title: "Automotive Lubricants",
      description: "High-performance oils for trucks, buses, cars, and motorbikes",
      productCount: 45,
      color: "from-pink-500 to-rose-600",
    },
    {
      icon: CircleDot,
      title: "Tires",
      description: "Quality tires for all vehicle types - cars, trucks, and motorbikes",
      productCount: 38,
      color: "from-gray-600 to-gray-800",
    },
    {
      icon: Battery,
      title: "Vehicle Batteries",
      description: "Sturdy & trustworthy battery brands for all vehicles",
      productCount: 28,
      color: "from-yellow-500 to-orange-600",
    },
    {
      icon: HardHat,
      title: "Safety Boots",
      description: "Industrial safety footwear for workplace protection",
      productCount: 24,
      color: "from-amber-600 to-amber-800",
    },
    {
      icon: Shield,
      title: "Insurance",
      description: "Life insurance and motor vehicle insurance solutions",
      productCount: 8,
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: Wrench,
      title: "Industrial Lubricants",
      description: "Precision lubricants for manufacturing and industrial needs",
      productCount: 32,
      color: "from-pink-600 to-pink-700",
    },
    {
      icon: Car,
      title: "Vehicle Accessories",
      description: "Seat covers, boot organizers, car fridges and more",
      productCount: 56,
      color: "from-pink-400 to-rose-500",
    },
  ];

  // Fallback products if database is empty
  const fallbackProducts = [
    {
      id: "1",
      name: "DELSTAR SYN SAE 10W40",
      category: "Engine Oil",
      price: 900,
      original_price: 1160,
      rating: 4.8,
      image_url: "https://www.mapettlogistics.com/cdn/shop/files/DELSTAR_30D_MULTIGRADE_15W40_5L.jpg?v=1746752133&width=400",
      is_featured: true,
    },
    {
      id: "2",
      name: "PETSAR SUPER SAE 20W50",
      category: "Engine Oil",
      price: 350,
      original_price: 450,
      rating: 4.9,
      image_url: "https://www.mapettlogistics.com/cdn/shop/files/PETSAR_SUPER_MULTIGRADE_20W50_4L.jpg?v=1746752246&width=400",
      is_featured: true,
    },
    {
      id: "3",
      name: "DELSTAR Long Life Coolant",
      category: "Coolant",
      price: 500,
      original_price: 650,
      rating: 4.7,
      image_url: "https://www.mapettlogistics.com/cdn/shop/files/PETSAR_RTU_LL_COOLANT_5L.jpg?v=1746752229&width=400",
      is_featured: true,
    },
    {
      id: "4",
      name: "SLUSOL Hydraulic Oil AW 68",
      category: "Hydraulic Oil",
      price: 7200,
      original_price: 8750,
      rating: 4.8,
      image_url: "https://www.mapettlogistics.com/cdn/shop/collections/DRUM.jpg?v=1764765982&width=400",
      is_featured: true,
    },
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId);
  };

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

        {/* Featured Products Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">Featured Products</h3>
              <p className="text-muted-foreground text-sm">Top-selling automotive products from Mapett Autostore</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {displayProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex-[0_0_280px] min-w-0 group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border"
                >
                  {/* Image - Full product visible */}
                  <div className="relative aspect-square overflow-hidden bg-secondary/50 p-4">
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.original_price && product.original_price > product.price && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                        Sale
                      </div>
                    )}
                  </div>

                  {/* Content - Compact */}
                  <div className="p-3">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</span>
                    <h4 className="font-semibold text-foreground text-sm mt-0.5 mb-1.5 line-clamp-1">{product.name}</h4>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      <span className="text-xs font-medium text-foreground">{product.rating || 4.5}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-primary">KES {product.price.toLocaleString()}</span>
                        {product.original_price && (
                          <span className="text-xs text-muted-foreground line-through">KES {product.original_price.toLocaleString()}</span>
                        )}
                      </div>
                      <button 
                        onClick={() => handleAddToCart(product.id)}
                        className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
                      >
                        <ShoppingCart className="h-4 w-4 text-primary-foreground" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

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
