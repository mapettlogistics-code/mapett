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
  link?: string;
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

  // Fallback products per category — each category has unique products
  const getFallbackProducts = (): Product[] => {
    const fallbacks: Record<string, Product[]> = {
      lubricants: [
        {id: "p1", name: "Petsar Long Life Coolant RTU Green", category: "Coolant", price: 250, original_price: 400, rating: 4.6, image_url: "https://mapett.com/cdn/shop/files/GREEN_COOLANT_1_LTRE.jpg?v=1737808776&width=600", is_featured: true, link: "https://mapett.com/products/petsar-long-life-coolant-rtu-green" },
        {id: "d1", name: "Delstar 30D Multigrade 15E40", category: "Engine Oil", price: 650, original_price: 800, rating: 4.7, image_url: "https://mapett.com/cdn/shop/files/DELSTAR_30D_MULTIGRADE_15W40_1L.jpg?v=1746752133&width=600", is_featured: true,link: " https://mapett.com/products/delstar-30d-multigrade-15e40" },
        {id: "d2", name: "Delstar Syn SAE 10W40", category: "Engine Oil", price: 1000, original_price: 1250, rating: 4.8, image_url: "https://mapett.com/cdn/shop/files/DELSTAR_SYN_SAE_10W40_1L.png?v=1766130560&width=600", is_featured: true, link: "https://mapett.com/products/delstar-syn-sae-10w40" },
        {id: "p2", name: "Petsar HP SAE 15W40 API SL/CF", category: "Engine Oil", price: 2500, original_price: 2800, rating: 4.5, image_url: "https://mapett.com/cdn/shop/files/PETSARSUPERMULTIGRADE15W404L.jpg?v=1746752212&width=1100", is_featured: true, link: "https://mapett.com/products/petsar-hp-sae-15w40-api-sl-cf"},
        {id: "l5", name: "Delstar Lithium Complex Grease EP3", category: "Industrial Grease", price: 900, original_price: 1300, rating: 4.7, image_url: "https://mapett.com/cdn/shop/files/DELSTAR_EP3_500G.jpg?v=1746752150&width=600", is_featured: true, link: "https://mapett.com/products/delstar-lithium-complex-grease-ep3" },
        {id: "l6", name: "Delstar Threadsol Grease", category: "Industrial Grease", price: 750, original_price: 1000, rating: 4.5, image_url: "https://mapett.com/cdn/shop/files/DELSTAR_THREADSOL_GREASE.jpg?v=1746752177&width=600", is_featured: true, link: "https://mapett.com/products/delstar-threadsol-grease" },
        {id: "s1", name: "Slusol Brake Clutch Fluid DOT 4", category: "Brake Fluid", price: 550, original_price: 750, rating: 4.6, image_url: "https://mapett.com/cdn/shop/files/BRAKE_CLUTCH_FLUID.jpg?v=1746752258&width=600", is_featured: true, link: "https://mapett.com/products/slusol-brake-clutch-fluid-dot-4" },
      ],
      "food-grade-lubricants": [
        {id: "fg1", name: "Beslux Brugarolas Gear ATOX 320", category: "Gear Oil", price: 65000, original_price: 70000, rating: 4.6, image_url: "https://mapett.com/cdn/shop/files/BESLUXDRUM_b84868b6-df35-4675-a669-2facc502522e.jpg?v=1746752118&width=600", is_featured: true, link: "https://mapett.com/products/beslux-brugarolas-gear-atox-320"},
        {id: "fg2", name: "Beslux ATOX H2-3 Synthetic Food Grade Grease", category: "Industrial Grease", price: 39000, original_price: 40000, rating: 4.7, image_url: "https://mapett.com/cdn/shop/files/BRIGAROLAS18KG.jpg?v=1746752108&width=600", is_featured: true, link: "https://mapett.com/products/beslux-atox-h2-3-synthetic-food-grade-grease-copy"},
        {id: "fg3", name: "Beslux ATOX 46 AW46", category: "Hydraulic Oil", price: 22000, original_price: 28000, rating: 4.5, image_url: "https://mapett.com/cdn/shop/files/BRIGAROLAS_36671571-9bda-4c03-bffb-8ad7ab83ca32.jpg?v=1746752121&width=1100", is_featured: true, link: "https://mapett.com/products/beslux-atox-46-aw46-copy"},
      ],
      "agricultural-lubricants": [
        { id: "ag1", name: "Slusol Hydraulic Oil AW 68", category: "Hydraulic Oil", price: 9000, original_price: 10000, rating: 4.7, image_url: "https://mapett.com/cdn/shop/files/slusol_hydraulic_oil_68.jpg?v=1746752304&width=600", is_featured: true, link: "https://mapett.com/products/slusol-hydraulic-oil-aw-68" },
        { id: "ag2", name: "Slusol Hydraulic Oil AW 46", category: "Hydraulic Oil", price: 8800, original_price: 10800, rating: 4.6, image_url: "https://mapett.com/cdn/shop/files/SLUSOL_HYDRAULIC_OIL_46.jpg?v=1746752304&width=600", is_featured: true, link: "https://mapett.com/products/slusol-hydraulic-oil-aw-46" },
        { id: "ag3", name: "Delstar Molysol Grease EP2", category: "Industrial Grease", price: 24000, original_price: 25000, rating: 4.5, image_url: "https://mapett.com/cdn/shop/files/DELSTARR_MOLYSOL_EP2.jpg?v=1746752161&width=600", is_featured: true, link: "https://mapett.com/products/delstar-molysol-grease-ep2" },
        { id: "ag4", name: "Delstar Tractor Hydraulic and Transmission Fluid API GL-4", category: "Transmission Fluid", price: 14000, original_price: 15000, rating: 4.8, image_url: "https://mapett.com/cdn/shop/files/DELSTAR_TRACTOR_TRANSMISSION_FLUID.jpg?v=1746752183&width=600", is_featured: true, link: "https://mapett.com/products/delstar-tractor-hydraulic-and-transmission-fluid-api-gl-4" },
      ],
      "industrial-lubricants": [
        { id: "ind5", name: "Delstar Gear Oil HDX SAE 80W90", category: "Gear Oil", price: 13000, original_price: 16500, rating: 4.8, image_url: "https://mapett.com/cdn/shop/files/DELSTAR_GEAR_OIL_80W90_HDX_20L_1.jpg?v=1786789492&width=600", is_featured: true, link: "https://mapett.com/products/delstar-gear-oil-hdx-sae-80w90" },
        { id: "ind6", name: "Delstar Threadsol Grease", category: "Industrial Grease", price: 6100, original_price: 7000, rating: 4.5, image_url: "https://mapett.com/cdn/shop/files/DELSTAR_THREADSOL_GREASE.jpg?v=1746752177&width=1100", is_featured: true, link: "https://mapett.com/products/delstar-threadsol-grease" },
        { id: "ind7", name: "Slusol HD Degreaser", category: "Degreaser", price: 500, original_price: 700, rating: 4.6, image_url: "https://mapett.com/cdn/shop/files/SLUSOL_HEAVY_DUTY_DEGREASER_1L.jpg?v=1746752295&width=600", is_featured: true, link: "https://mapett.com/products/slusol-hd-degreaser" },
        { id: "ind8", name: "Slusol Gear Oil MS SAE 80W90 API GL-4", category: "Gear Oil", price: 650, original_price: 850, rating: 4.7, image_url: "https://mapett.com/cdn/shop/files/SLUSOL_GEAR_OIL_EP_80W90_1L.jpg?v=1746752290&width=600", is_featured: true, link: "https://mapett.com/products/slusol-gear-oil-ms-sae-80w90-api-gl-4" },
        { id: "ind9", name: "Slusol Nu-Tec Grease EP2", category: "Industrial Grease", price: 550, original_price: 800, rating: 4.4, image_url: "https://mapett.com/cdn/shop/files/SLUSOL_NU_TEC_EP2_500G.jpg?v=1746752320&width=600", is_featured: true, link: "https://mapett.com/products/slusol-nu-tec-grease-ep2" },
      ],
    };

    const key = category.toLowerCase();
    const sortedEntries = Object.entries(fallbacks).sort(
      (a, b) => b[0].length - a[0].length
    );
    for (const [k, v] of sortedEntries) {
      if (key.includes(k)) return v;
    }
  };

  const deduplicate = (items: Product[]) => {
    const seen = new Set<string>();
    return items.filter((item) => {
      const key = `${item.name}-${item.price}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };
  const displayProducts = deduplicate(products.length > 0 ? products : getFallbackProducts());

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
          <motion.a
            key={product.id}
            href={product.link || "/products-services"}
            target="_blank"
            rel="noopener noreferrer"
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
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default CategoryProductSlider;