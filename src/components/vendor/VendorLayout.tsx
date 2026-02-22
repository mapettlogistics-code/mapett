import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Store, Package, ShoppingCart, BarChart3, Settings, LogOut, Menu, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const menuItems = [
  { icon: BarChart3, label: "Dashboard", href: "/vendor/dashboard" },
  { icon: Package, label: "Products", href: "/vendor/products" },
  { icon: ShoppingCart, label: "Orders", href: "/vendor/orders" },
  { icon: Settings, label: "Shop Settings", href: "/vendor/setup" },
];

interface VendorLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const VendorLayout = ({ children, title, subtitle }: VendorLayoutProps) => {
  const { user, loading: authLoading } = useAuth();
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/vendor/login");
      return;
    }
    if (user) checkVendor();
  }, [user, authLoading]);

  const checkVendor = async () => {
    const { data } = await supabase
      .from("vendors")
      .select("id, business_name, status, logo_url")
      .eq("user_id", user!.id)
      .maybeSingle();

    if (!data) {
      navigate("/vendor/register");
      return;
    }
    if (data.status === "suspended") {
      toast.error("Your vendor account is suspended");
      await supabase.auth.signOut();
      navigate("/vendor/login");
      return;
    }
    setVendor(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
    navigate("/vendor/login");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!vendor) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-20"} bg-card border-r border-border flex flex-col transition-all duration-300 fixed h-full z-30`}>
        <div className="p-4 border-b border-border flex items-center gap-3">
          {vendor.logo_url ? (
            <img src={vendor.logo_url} alt="Logo" className="w-10 h-10 rounded-lg object-cover" />
          ) : (
            <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center">
              <Store className="h-5 w-5 text-primary-foreground" />
            </div>
          )}
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm truncate">{vendor.business_name}</p>
              <p className="text-xs text-muted-foreground">Vendor</p>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto">
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map(item => {
            const isActive = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href}>
                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border space-y-1">
          <Link to="/" target="_blank">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Store className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">View Store</span>}
            </div>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300`}>
        <header className="bg-card border-b border-border px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default VendorLayout;
