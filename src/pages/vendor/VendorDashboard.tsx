import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingCart, TrendingUp, Eye, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import VendorLayout from "@/components/vendor/VendorLayout";

const VendorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });
  const [vendorId, setVendorId] = useState<string | null>(null);

  useEffect(() => {
    if (user) fetchStats();
  }, [user]);

  const fetchStats = async () => {
    const { data: vendor } = await supabase
      .from("vendors")
      .select("id")
      .eq("user_id", user!.id)
      .maybeSingle();

    if (!vendor) return;
    setVendorId(vendor.id);

    const { count: productCount } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("vendor_id", vendor.id);

    // Get vendor product IDs first
    const { data: vendorProducts } = await supabase
      .from("products")
      .select("id")
      .eq("vendor_id", vendor.id);

    const productIds = vendorProducts?.map(p => p.id) || [];

    // Get order items for vendor's products
    const { data: orderItems } = productIds.length > 0
      ? await supabase.from("order_items").select("*").in("product_id", productIds)
      : { data: [] as any[] };

    const itemsArr = orderItems || [];
    const orderCount = new Set(itemsArr.map(i => i.order_id)).size;
    const revenue = itemsArr.reduce((sum, i) => sum + (i.quantity * i.unit_price), 0);

    setStats({
      products: productCount || 0,
      orders: orderCount,
      revenue,
    });
  };

  const statCards = [
    { title: "Products", value: stats.products, icon: Package, color: "text-primary" },
    { title: "Orders", value: stats.orders, icon: ShoppingCart, color: "text-accent" },
    { title: "Revenue", value: `KES ${stats.revenue.toLocaleString()}`, icon: TrendingUp, color: "text-green-600" },
  ];

  return (
    <VendorLayout title="Dashboard" subtitle="Overview of your shop">
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {statCards.map(card => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/vendor/products">
          <Card className="hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 hero-gradient rounded-xl flex items-center justify-center">
                <Plus className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Add Products</p>
                <p className="text-sm text-muted-foreground">List new items in your shop</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/vendor/orders">
          <Card className="hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">View Orders</p>
                <p className="text-sm text-muted-foreground">Manage incoming orders</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/vendor/setup">
          <Card className="hover:border-primary/30 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
                <Settings className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Shop Settings</p>
                <p className="text-sm text-muted-foreground">Update branding & policies</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {vendorId && (
        <div className="mt-8">
          <Link to={`/shop/${vendorId}`} target="_blank">
            <Button variant="outline" className="gap-2">
              <Eye className="h-4 w-4" /> View My Public Shop
            </Button>
          </Link>
        </div>
      )}
    </VendorLayout>
  );
};

export default VendorDashboard;
