import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Truck, ShoppingCart, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminDashboard = () => {
  const { isAdmin } = useAdminAuth();
  const [stats, setStats] = useState({ products: 0, orders: 0, shipments: 0, insurance: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [productsRes, ordersRes, shipmentsRes, insuranceRes] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("shipments").select("id", { count: "exact", head: true }),
        supabase.from("insurance_applications").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        products: productsRes.count || 0,
        orders: ordersRes.count || 0,
        shipments: shipmentsRes.count || 0,
        insurance: insuranceRes.count || 0,
      });
    };
    if (isAdmin) fetchStats();
  }, [isAdmin]);

  const statCards = [
    { label: "Total Products", value: stats.products, icon: Package, color: "from-primary to-pink-600" },
    { label: "Total Orders", value: stats.orders, icon: ShoppingCart, color: "from-accent to-accent/80" },
    { label: "Active Shipments", value: stats.shipments, icon: Truck, color: "from-yellow-500 to-orange-600" },
    { label: "Insurance Apps", value: stats.insurance, icon: Shield, color: "from-green-500 to-emerald-600" },
  ];

  return (
    <AdminLayout title="Dashboard" subtitle="Welcome back, Admin">
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl p-6 border border-border shadow-card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/admin/products"><Button variant="outline" className="w-full justify-start gap-2"><Package className="h-4 w-4" />Manage Products</Button></Link>
          <Link to="/admin/shipments"><Button variant="outline" className="w-full justify-start gap-2"><Truck className="h-4 w-4" />Track Shipments</Button></Link>
          <Link to="/admin/orders"><Button variant="outline" className="w-full justify-start gap-2"><ShoppingCart className="h-4 w-4" />View Orders</Button></Link>
          <Link to="/admin/insurance"><Button variant="outline" className="w-full justify-start gap-2"><Shield className="h-4 w-4" />Insurance Apps</Button></Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
