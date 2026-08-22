import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import ProductShareButtons from "./ProductShareButtons";


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

type CategoryProductSliderProps = {
  category: string;
  title: string;
  color: string;
};

const CategoryProductSlider = ({ category, title, color }: CategoryProductSliderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .ilike("category", `%${category}%`)
        .limit(10);

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  // Auto-scroll animation
  useEffect(() => {
    if (!scrollRef.current || isHovered || products.length === 0) return;

    const container = scrollRef.current;
    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset when reaching the end
      if (scrollPosition >= container.scrollWidth - container.clientWidth) {
        scrollPosition = 0;
      }
      
      container.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered, products]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Fallback products per category
  const getFallbackProducts = (): Product[] => {
    const fallbacks: Record<string, Product[]> = {
      lubricants: [
        { id: "1", name: "DELSTAR 30D MULTIGRADE 15W40", category: "Engine Oil", price: 650, original_price: 900, rating: 4.8, image_url: "public/products/DELSTAR_30D_MULTIGRADE_15W40_1L.webp", is_featured: true },
        { id: "2", name: "DELSTAR DIFFERENTIAL OIL HDX SAE 85W140", category: "Gear Box Oil", price: 14500, original_price: 18000, rating: 4.9, image_url: "public/products/DELSTAR_DIFF_OIL_85W140_HDX_20L_1.webp", is_featured: true },
        { id: "3", name: "DELSTAR GEAR OIL HDX SAE 80W90", category: "Gear Box Oil", price: 13000, original_price: 16500, rating: 4.8, image_url: "public/products/DELSTAR_GEAR_OIL_80W90_HDX_20L_1.webp", is_featured: true },
        { id: "4", name: "DELSTAR LITHIUM COMPLEX GREASE EP3", category: "Industrial Grease", price: 900, original_price: 1500, rating: 4.8, image_url: "https://github.com/mapettlogistics-code/mapett/blob/main/public/products/DELSTAR_EP3_500G.webp", is_featured: true },
        { id: "5", name: "DELSTAR GEAR OIL HDX SAE 80W90", category: "Hydraulic Oil", price: 13000, original_price: 16500, rating: 4.8, image_url: "public/products/DELSTAR_GEAR_OIL_80W90_HDX_20L_1.webp", is_featured: true },
        { id: "6", name: "DELSTAR GEAR OIL HDX SAE 80W90", category: "Hydraulic Oil", price: 13000, original_price: 16500, rating: 4.8, image_url: "public/products/DELSTAR_GEAR_OIL_80W90_HDX_20L_1.webp", is_featured: true },
      ],
      tires: [
        { id: "t1", name: "Heavy Duty Truck Tire 315/80R22.5", category: "Tires", price: 32000, original_price: 38000, rating: 4.7, image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400", is_featured: true },
        { id: "t2", name: "All-Terrain SUV Tire 265/70R17", category: "Tires", price: 18500, original_price: 22000, rating: 4.6, image_url: "https://images.unsplash.com/photo-1605235186583-a8272b61f9fe?w=400", is_featured: true },
      ],
      batteries: [
        { id: "b1", name: "Chloride Exide N70 Battery", category: "Batteries", price: 14500, original_price: 17000, rating: 4.8, image_url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400", is_featured: true },
        { id: "b2", name: "Rocket SMF Battery 100AH", category: "Batteries", price: 18000, original_price: 21500, rating: 4.7, image_url: "https://images.unsplash.com/photo-1609126529789-422abe5b8db1?w=400", is_featured: true },
      ],
      boots: [
        { id: "s1", name: "Steel Toe Safety Boot", category: "Safety Boots", price: 4500, original_price: 5500, rating: 4.5, image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", is_featured: true },
        { id: "s2", name: "High-Cut Industrial Boot", category: "Safety Boots", price: 5200, original_price: 6200, rating: 4.6, image_url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400", is_featured: true },
      ],
      accessories: [
        { id: "a1", name: "Premium Seat Cover Set", category: "Accessories", price: 8500, original_price: 10000, rating: 4.4, image_url: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400", is_featured: true },
        { id: "a2", name: "Car Boot Organizer", category: "Accessories", price: 2800, original_price: 3500, rating: 4.3, image_url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400", is_featured: true },
      ],
    };

    const key = category.toLowerCase();
    for (const [k, v] of Object.entries(fallbacks)) {
      if (key.includes(k)) return v;
    }
    return fallbacks.lubricants;
  };

  const displayProducts = products.length > 0 ? products : getFallbackProducts();

  if (loading) {
    return (
      <div className="py-6">
        <div className="h-8 w-48 bg-muted animate-pulse rounded mb-4" />
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-64 h-72 bg-muted animate-pulse rounded-xl flex-shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  if (displayProducts.length === 0) return null;

  return (
    <div className="py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${color}`} />
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          <span className="text-sm text-muted-foreground">({displayProducts.length} items)</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Products Slider */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {displayProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex-shrink-0 w-56 group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-secondary/50 p-3">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              {product.original_price && product.original_price > product.price && (
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  {Math.round((1 - product.price / product.original_price) * 100)}% OFF
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-3">
              <div className="flex items-start justify-between mb-1">
                <span className="text-xs text-muted-foreground uppercase tracking-wide line-clamp-1">{product.category}</span>
                <ProductShareButtons
                  productName={product.name}
                  productUrl={`${window.location.origin}/#autoshop`}
                />
              </div>
              <h4 className="font-semibold text-foreground text-sm mt-0.5 mb-1 line-clamp-1">{product.name}</h4>

              <div className="flex items-center gap-1 mb-2">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span className="text-xs font-medium text-foreground">{product.rating || 4.5}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-primary">KES {product.price.toLocaleString()}</span>
                  {product.original_price && (
                    <span className="text-xs text-muted-foreground line-through">KES {product.original_price.toLocaleString()}</span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(product.id)}
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  <ShoppingCart className="h-3.5 w-3.5 text-primary-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProductSlider;