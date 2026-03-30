import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin, ChevronDown, ShoppingCart, User, LogOut, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import PaymentIcons from "@/components/PaymentIcons";
import mapettLogo from "@/assets/mapett-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const { currency, toggleCurrency } = useCurrency();

  const services = [
    "Customs Clearance",
    "Air Freight",
    "Ocean Freight",
    "Road & Rail Transport",
    "Product Sourcing (China, Turkey)",
    "Refrigerated Cargo Clearance & Transport",
    "Special Cargo Clearance & Transport",
    "Warehousing",
  ];

  const ecommerce = [
    "Social Media Pages Setup",
    "Social Media Cross-posting Setup",
    "Online Shop Setup",
  ];

  const insurance = [
    "Marine Cargo Insurance",
    "Air Cargo Insurance",
    "Inland Transit Insurance",
    "Freight Forwarder Liability",
    "Motor Vehicle Insurance",
    "WIBA (Work Injury Benefit) Insurance",
    "Life Insurance",
    "Personal Accident Insurance",
  ];

  const autoshop = [
    { name: "Automotive Lubricants", category: "lubricants" },
    { name: "Vehicle Tires", category: "tires" },
    { name: "Vehicle Batteries", category: "batteries" },
    { name: "Safety Boots", category: "safety-boots" },
    { name: "Industrial Lubricants", category: "industrial-lubricants" },
    { name: "Vehicle Accessories", category: "accessories" },
  ];

  const TikTokSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );

  const PinterestSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.93s-.35-.71-.35-1.77c0-1.66.96-2.9 2.16-2.9 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-1 3.99-.28 1.2.6 2.17 1.78 2.17 2.14 0 3.79-2.26 3.79-5.52 0-2.88-2.07-4.9-5.03-4.9-3.42 0-5.43 2.57-5.43 5.22 0 1.04.4 2.15.9 2.75.1.12.11.22.08.34l-.34 1.36c-.05.22-.18.27-.41.16-1.52-.71-2.48-2.92-2.48-4.7 0-3.82 2.78-7.33 8.02-7.33 4.21 0 7.48 3 7.48 7.01 0 4.18-2.64 7.55-6.3 7.55-1.23 0-2.39-.64-2.79-1.4l-.76 2.89c-.27 1.06-1.01 2.4-1.5 3.21A12 12 0 1 0 12 0z"/>
    </svg>
  );

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="https://wa.me/254799390133?text=Hello!%20I'm%20interested%20in%20Mapett%20Logistics%20services." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-4 w-4" />
              +254 799 390 133
            </a>
            <span className="text-primary-foreground/60">|</span>
            <a href="tel:+254725649202" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-4 w-4" />
              +254 725 649 202
            </a>
            <a href="mailto:info@mapettlogistics.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="h-4 w-4" />
              info@mapettlogistics.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <PaymentIcons />
            <div className="flex items-center gap-3 border-l border-primary-foreground/30 pl-4">
              <a href="https://web.facebook.com/profile.php?id=61584459897045" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/mapettlogisticsltd/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.youtube.com/@MapettLogisticsLtd" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/company/mapettlogisticsltd/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://www.tiktok.com/@mapettlogisticsltd" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <TikTokSvg />
              </a>
              <a href="https://www.pinterest.com/MapetteLogisticsLtd/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <PinterestSvg />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex flex-col items-center justify-center h-16 md:h-20">
              <img src={mapettLogo} alt="Mapett Logistics" className="h-10 md:h-14 w-auto object-contain" />
              <span className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-primary -mt-1">Logistics</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6">
              <a href="#about" className="font-medium text-foreground hover:text-primary transition-colors">
                About Us
              </a>
              
              {/* Products & Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors">
                  Products & Services <ChevronDown className="h-4 w-4" />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'services' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-72 bg-card rounded-xl shadow-card-hover border border-border overflow-hidden"
                    >
                      <div className="py-1">
                        <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Logistics</p>
                        {services.map((service) => (
                          <a key={service} href="#services" className="block px-4 py-2.5 text-sm hover:bg-secondary transition-colors">
                            {service}
                          </a>
                        ))}
                        <div className="border-t border-border my-1" />
                        <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">E-Commerce Solutions</p>
                        {ecommerce.map((item) => (
                          <a key={item} href="#contact" className="block px-4 py-2.5 text-sm hover:bg-secondary transition-colors">
                            {item}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Insurance Policies Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('insurance')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors">
                  Insurance Policies <ChevronDown className="h-4 w-4" />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'insurance' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-card rounded-xl shadow-card-hover border border-border overflow-hidden"
                    >
                      {insurance.map((item) => (
                        <a key={item} href="#insurance" className="block px-4 py-3 text-sm hover:bg-secondary transition-colors">
                          {item}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Seals & Tags */}
              <a href="https://multistore.simiyu.app/products?category=seals-tags" target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors">
                Seals & Tags
              </a>

              {/* Auto Store Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('autoshop')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a href="https://multistore.simiyu.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors">
                  Auto Store <ChevronDown className="h-4 w-4" />
                </a>
                <AnimatePresence>
                  {activeDropdown === 'autoshop' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-card rounded-xl shadow-card-hover border border-border overflow-hidden"
                    >
                      {autoshop.map((item) => (
                        <a key={item.name} href={`https://multistore.simiyu.app/products?category=${item.category}`} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-sm hover:bg-secondary transition-colors">
                          {item.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>




            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Currency Toggle */}
              <button
                onClick={toggleCurrency}
                className="px-3 py-1.5 rounded-lg bg-secondary text-foreground text-sm font-semibold hover:bg-secondary/80 transition-colors"
                title="Switch currency"
              >
                {currency === "KES" ? "KES 🇰🇪" : "USD 🇺🇸"}
              </button>
              <Link to="/track">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Track Shipment
                </Button>
              </Link>
              
               {/* Cart */}
              <a href="https://multistore.simiyu.app/cart" target="_blank" rel="noopener noreferrer" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </a>

              {/* Auth */}
              {user ? (
                <div 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('user')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                  <AnimatePresence>
                    {activeDropdown === 'user' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-2 w-48 bg-card rounded-xl shadow-card-hover border border-border overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-border">
                          <p className="text-sm text-muted-foreground">Signed in as</p>
                          <p className="text-sm font-medium truncate">{user.email}</p>
                        </div>
                        <a href="https://multistore.simiyu.app/cart" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-sm hover:bg-secondary transition-colors">
                          My Cart
                        </a>
                        <Link to="/track" className="block px-4 py-3 text-sm hover:bg-secondary transition-colors">
                          Track Orders
                        </Link>
                        <button
                          onClick={signOut}
                          className="w-full text-left px-4 py-3 text-sm hover:bg-secondary transition-colors text-destructive flex items-center gap-2"
                        >
                          <LogOut className="h-4 w-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/login">
                  <Button className="hero-gradient text-primary-foreground shadow-glow hover:opacity-90">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <a href="https://multistore.simiyu.app/cart" target="_blank" rel="noopener noreferrer" className="relative p-2">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-card border-t border-border"
            >
              <div className="container py-4 space-y-4">
                <a href="#about" className="block py-2 font-medium" onClick={() => setIsOpen(false)}>About Us</a>
                <a href="#services" className="block py-2 font-medium" onClick={() => setIsOpen(false)}>Products & Services</a>
                <a href="#insurance" className="block py-2 font-medium" onClick={() => setIsOpen(false)}>Insurance Policies</a>
                <a href="https://multistore.simiyu.app/products?category=seals-tags" target="_blank" rel="noopener noreferrer" className="block py-2 font-medium" onClick={() => setIsOpen(false)}>Seals & Tags</a>
                <a href="https://multistore.simiyu.app" target="_blank" rel="noopener noreferrer" className="block py-2 font-medium" onClick={() => setIsOpen(false)}>Auto Store</a>
                <a href="#contact" className="block py-2 font-medium" onClick={() => setIsOpen(false)}>Contact Us</a>
                <a href="https://maps.app.goo.gl/yhs7ojNgfXvw72Y19" target="_blank" rel="noopener noreferrer" className="block py-2 font-medium" onClick={() => setIsOpen(false)}>Directions/Location</a>
                {/* Contact Info */}
                <div className="py-2 space-y-1 text-sm text-muted-foreground">
                  <p>📞 +254 799 390 133 | +254 725 649 202</p>
                  <p>✉️ info@mapettlogistics.com</p>
                </div>
                {/* Social Links */}
                <div className="flex items-center gap-3 py-2">
                  <span className="text-sm text-muted-foreground">Follow us:</span>
                  <a href="https://web.facebook.com/profile.php?id=61584459897045" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a href="https://www.instagram.com/mapettlogisticsltd/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a href="https://www.youtube.com/@MapettLogisticsLtd" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Youtube className="h-4 w-4" />
                  </a>
                  <a href="https://www.linkedin.com/company/mapettlogisticsltd/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a href="https://www.tiktok.com/@mapettlogisticsltd" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <TikTokSvg />
                  </a>
                  <a href="https://www.pinterest.com/MapetteLogisticsLtd/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <PinterestSvg />
                  </a>
                </div>
                <div className="pt-4 space-y-2">
                  <Link to="/track" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full border-primary text-primary">
                      Track Shipment
                    </Button>
                  </Link>
                  {user ? (
                    <Button onClick={signOut} variant="destructive" className="w-full">
                      Sign Out
                    </Button>
                  ) : (
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button className="w-full hero-gradient text-primary-foreground">
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
