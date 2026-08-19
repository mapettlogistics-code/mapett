import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart, Star, Filter, X, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import ProductShareButtons from "@/components/marketplace/ProductShareButtons";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price: number | null;
  image_url: string | null;
  rating: number | null;
  description: string | null;
  is_featured: boolean | null;
};

const categories = [
  { value: "all", label: "All Categories" },
  { value: "lubricants", label: "Automotive Lubricants" },
  { value: "tires", label: "Tires" },
  { value: "batteries", label: "Vehicle Batteries" },
  { value: "accessories", label: "Vehicle Accessories" },
  { value: "industrial", label: "Industrial Lubricants" },
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let query = supabase.from("products").select("*");

      // Apply category filter
      if (selectedCategory !== "all") {
        query = query.ilike("category", `%${selectedCategory}%`);
      }

      // Apply featured filter
      if (showFeaturedOnly) {
        query = query.eq("is_featured", true);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } else {
        let filtered = (data || []).filter((product) => !/boot|shoe/i.test(`${product.name} ${product.category}`));

        // Apply search filter
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filtered = filtered.filter(
            (p) =>
              p.name.toLowerCase().includes(term) ||
              p.category.toLowerCase().includes(term) ||
              p.description?.toLowerCase().includes(term)
          );
        }

        // Apply price filter
        if (priceRange.min) {
          filtered = filtered.filter((p) => p.price >= Number(priceRange.min));
        }
        if (priceRange.max) {
          filtered = filtered.filter((p) => p.price <= Number(priceRange.max));
        }

        // Apply sorting
        switch (sortBy) {
          case "price-asc":
            filtered.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            filtered.sort((a, b) => b.price - a.price);
            break;
          case "rating":
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
          case "newest":
            filtered.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
            break;
          case "featured":
          default:
            filtered.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
        }

        setProducts(filtered);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory, sortBy, searchTerm, priceRange, showFeaturedOnly]);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSortBy("featured");
    setPriceRange({ min: "", max: "" });
    setShowFeaturedOnly(false);
    setSearchTerm("");
    setSearchParams({});
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="font-semibold mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === cat.value
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold mb-3">Price Range (KES)</h4>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            className="w-full"
          />
          <Input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            className="w-full"
          />
        </div>
      </div>

      {/* Featured Only */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="featured"
          checked={showFeaturedOnly}
          onCheckedChange={(checked) => setShowFeaturedOnly(checked as boolean)}
        />
        <Label htmlFor="featured" className="text-sm cursor-pointer">
          Featured products only
        </Label>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" onClick={clearFilters} className="w-full">
        <X className="h-4 w-4 mr-2" />
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/#autoshop"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold">
              {selectedCategory === "all"
                ? "All Products"
                : categories.find((c) => c.value === selectedCategory)?.label || "Products"}
            </h1>
            <p className="text-muted-foreground mt-1">{products.length} products found</p>
          </div>
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8 bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-primary" />
                <h3 className="font-bold">Filters</h3>
              </div>
              <FilterSidebar />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-muted animate-pulse rounded-xl h-80" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl font-semibold mb-2">No products found</p>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search term</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border"
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-secondary/50 p-4">
                      <img
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.original_price && product.original_price > product.price && (
                        <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                          {Math.round((1 - product.price / product.original_price) * 100)}% OFF
                        </div>
                      )}
                      {product.is_featured && (
                        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">
                          {product.category}
                        </span>
                        <ProductShareButtons
                          productName={product.name}
                          productUrl={`${window.location.origin}/products?id=${product.id}`}
                        />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h4>

                      <div className="flex items-center gap-1 mb-3">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-sm font-medium">{product.rating || 4.5}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-primary">
                            KES {product.price.toLocaleString()}
                          </span>
                          {product.original_price && (
                            <span className="text-sm text-muted-foreground line-through">
                              KES {product.original_price.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <Button
                          size="icon"
                          onClick={() => addToCart(product.id)}
                          className="rounded-full bg-primary hover:bg-primary/90"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
