import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Track from "./pages/Track";
import Products from "./pages/Products";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminShipments from "./pages/admin/AdminShipments";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminInsurance from "./pages/admin/AdminInsurance";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminVendors from "./pages/admin/AdminVendors";
import AdminContent from "./pages/admin/AdminContent";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminMarketing from "./pages/admin/AdminMarketing";
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <CurrencyProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/track" element={<Track />} />
                <Route path="/products" element={<Products />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/content" element={<AdminContent />} />
                <Route path="/admin/blog" element={<AdminBlog />} />
                <Route path="/admin/marketing" element={<AdminMarketing />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/shipments" element={<AdminShipments />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/insurance" element={<AdminInsurance />} />
                <Route path="/admin/vendors" element={<AdminVendors />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CurrencyProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
