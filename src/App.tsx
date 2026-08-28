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
import CookiePolicy from "./pages/CookiePolicy";
import ShippingReturnsPolicy from "./pages/ShippingReturnsPolicy";
import TermsConditions from "./pages/TermsConditions";
import AboutUs from "./pages/AboutUs";
import ProductsServices from "./pages/ProductsServices";
import AirFreight from "./pages/AirFreight";
import CustomsClearance from "./pages/CustomsClearance";
import OceanFreight from "./pages/OceanFreight";
import RoadRailTransport from "./pages/RoadRailTransport";
import RefrigeratedCargo from "./pages/RefrigeratedCargo";
import SpecialCargo from "./pages/SpecialCargo";
import Warehousing from "./pages/Warehousing";
import Insurance from "./pages/Insurance";
import MarineCargoInsurance from "./pages/MarineCargoInsurance";
import AirCargoInsurance from "./pages/AirCargoInsurance";
import InlandTransitInsurance from "./pages/InlandTransitInsurance";
import FreightForwarderLiability from "./pages/FreightForwarderLiability";
import WIBAEmployeesCoverage from "./pages/WIBAEmployeesCoverage";
import LifeInsurance from "./pages/LifeInsurance";
import WarehouseInsurance from "./pages/WarehouseInsurance";
import AirportTransfers from "./pages/AirportTransfers";
import TravelServicePage from "./pages/TravelServicePage";
import Team from "./pages/Team";
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
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
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
                <Route path="/about" element={<AboutUs />} />
                <Route path="/products-services" element={<ProductsServices />} />
                <Route path="/air-freight" element={<AirFreight />} />
                <Route path="/customs-clearance" element={<CustomsClearance />} />
                <Route path="/ocean-freight" element={<OceanFreight />} />
                <Route path="/road-rail-transport" element={<RoadRailTransport />} />
                <Route path="/refrigerated-cargo" element={<RefrigeratedCargo />} />
                <Route path="/special-cargo" element={<SpecialCargo />} />
                <Route path="/warehousing" element={<Warehousing />} />
                <Route path="/insurance" element={<Insurance />} />
                <Route path="/marine-cargo-insurance" element={<MarineCargoInsurance />} />
                <Route path="/air-cargo-insurance" element={<AirCargoInsurance />} />
                <Route path="/inland-transit-insurance" element={<InlandTransitInsurance />} />
                <Route path="/freight-forwarder-liability" element={<FreightForwarderLiability />} />
                <Route path="/wiba-employees-coverage" element={<WIBAEmployeesCoverage />} />
                <Route path="/life-insurance" element={<LifeInsurance />} />
                <Route path="/warehouse-insurance" element={<WarehouseInsurance />} />
                <Route path="/airport-transfers" element={<AirportTransfers />} />
                <Route path="/flight-booking" element={<TravelServicePage service="flight-booking" />} />
                <Route path="/visa-processing" element={<TravelServicePage service="visa-processing" />} />
                <Route path="/hotel-booking" element={<TravelServicePage service="hotel-booking" />} />
                <Route path="/travel-insurance" element={<TravelServicePage service="travel-insurance" />} />
                <Route path="/travel-essentials" element={<TravelServicePage service="travel-essentials" />} />
                <Route path="/tours-safaris" element={<TravelServicePage service="tours-safaris" />} />
                <Route path="/team" element={<Team />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/shipping-returns-policy" element={<ShippingReturnsPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />

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
