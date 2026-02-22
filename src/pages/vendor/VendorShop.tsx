import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Store, MapPin, Phone, Mail, Facebook, Instagram, ShoppingCart, Star, ArrowLeft, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Vendor {
  id: string;
  business_name: string;
  description: string | null;
  shop_location: string | null;
  phone: string | null;
  email: string | null;
  logo_url: string | null;
  banner_url: string | null;
  categories: string[];
  facebook_url: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  return_policy: string | null;
  delivery_period: string | null;
}

interface Product {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image_url: string | null;
  category: string;
  rating: number | null;
  description: string | null;
}

const VendorShop = () => {
  const { vendorId } = useParams();
  const { addToCart } = useCart();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (vendorId) fetchShop();
  }, [vendorId]);

  const fetchShop = async () => {
    const [vendorRes, productsRes] = await Promise.all([
      supabase.from("vendors").select("*").eq("id", vendorId!).maybeSingle(),
      supabase.from("products").select("*").eq("vendor_id", vendorId!).order("created_at", { ascending: false }),
    ]);

    if (vendorRes.data) setVendor(vendorRes.data);
    if (productsRes.data) setProducts(productsRes.data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-muted-foreground mb-4">Shop not found</p>
        <Link to="/"><Button variant="outline">Back to Home</Button></Link>
      </div>
    );
  }

  const displayProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Banner */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          {vendor.banner_url ? (
            <img src={vendor.banner_url} alt="Banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full hero-gradient" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="container -mt-16 relative z-10">
          {/* Shop Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row items-start gap-6 mb-8">
            <div className="flex-shrink-0">
              {vendor.logo_url ? (
                <img src={vendor.logo_url} alt={vendor.business_name} className="w-24 h-24 rounded-2xl object-cover border-4 border-background shadow-lg" />
              ) : (
                <div className="w-24 h-24 hero-gradient rounded-2xl flex items-center justify-center border-4 border-background shadow-lg">
                  <Store className="h-10 w-10 text-primary-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">{vendor.business_name}</h1>
              {vendor.description && <p className="text-muted-foreground mt-1">{vendor.description}</p>}
              <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                {vendor.shop_location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{vendor.shop_location}</span>}
                {vendor.phone && <span className="flex items-center gap-1"><Phone className="h-4 w-4" />{vendor.phone}</span>}
                {vendor.email && <span className="flex items-center gap-1"><Mail className="h-4 w-4" />{vendor.email}</span>}
              </div>
              <div className="flex gap-2 mt-3">
                {vendor.facebook_url && <a href={vendor.facebook_url} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="icon"><Facebook className="h-4 w-4" /></Button></a>}
                {vendor.instagram_url && <a href={vendor.instagram_url} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="icon"><Instagram className="h-4 w-4" /></Button></a>}
                {vendor.tiktok_url && <a href={vendor.tiktok_url} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="icon"><span className="text-xs font-bold">TT</span></Button></a>}
              </div>
            </div>
          </motion.div>

          {/* Policies */}
          {(vendor.delivery_period || vendor.return_policy) && (
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {vendor.delivery_period && (
                <div className="bg-card rounded-xl border border-border p-4 flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary mt-0.5" />
                  <div><p className="font-medium text-foreground text-sm">Delivery</p><p className="text-sm text-muted-foreground">{vendor.delivery_period}</p></div>
                </div>
              )}
              {vendor.return_policy && (
                <div className="bg-card rounded-xl border border-border p-4 flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
                  <div><p className="font-medium text-foreground text-sm">Returns Policy</p><p className="text-sm text-muted-foreground">{vendor.return_policy}</p></div>
                </div>
              )}
            </div>
          )}

          {/* Category Filter */}
          {vendor.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant={!selectedCategory ? "default" : "outline"} className={`cursor-pointer ${!selectedCategory ? "bg-primary text-primary-foreground" : ""}`} onClick={() => setSelectedCategory(null)}>
                All ({products.length})
              </Badge>
              {vendor.categories.map(cat => (
                <Badge key={cat} variant={selectedCategory === cat ? "default" : "outline"} className={`cursor-pointer capitalize ${selectedCategory === cat ? "bg-primary text-primary-foreground" : ""}`} onClick={() => setSelectedCategory(cat)}>
                  {cat.replace("-", " ")}
                </Badge>
              ))}
            </div>
          )}

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-16">
            {displayProducts.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-card rounded-xl border border-border overflow-hidden group hover:shadow-md transition-shadow"
              >
                <div className="relative h-40 overflow-hidden">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center"><Store className="h-8 w-8 text-muted-foreground" /></div>
                  )}
                  {p.original_price && p.original_price > p.price && (
                    <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs">
                      -{Math.round(((p.original_price - p.price) / p.original_price) * 100)}%
                    </Badge>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-medium text-foreground text-sm line-clamp-2">{p.name}</p>
                  <div className="flex items-center gap-1 my-1">
                    {p.rating && <><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /><span className="text-xs text-muted-foreground">{p.rating}</span></>}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <span className="font-bold text-foreground">KES {p.price.toLocaleString()}</span>
                      {p.original_price && p.original_price > p.price && (
                        <span className="text-xs text-muted-foreground line-through ml-1">KES {p.original_price.toLocaleString()}</span>
                      )}
                    </div>
                    <Button size="sm" variant="outline" onClick={() => addToCart(p.id)} className="h-8">
                      <ShoppingCart className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
            {displayProducts.length === 0 && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No products in this category yet
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default VendorShop;
