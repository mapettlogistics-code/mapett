import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin, ChevronDown, ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import mapettLogo from "@/assets/mapett-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();

  const services = [
    "Air Freight",
    "Ocean Freight",
    "Road Transport",
    "Warehousing",
    "Customs Clearance",
  ];

  const marketplace = [
    "Automotive Lubricants",
    "Industrial Lubricants",
    "Vehicle Batteries",
    "Vehicle Accessories",
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+254799390133" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-4 w-4" />
              +254 799 390 133
            </a>
            <a href="mailto:info@mapettlogistics.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="h-4 w-4" />
              info@mapettlogistics.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Mombasa, Kenya</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={mapettLogo} alt="Mapett Logistics" className="h-28 w-auto" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <Link to="/" className="font-medium text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              
              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors">
                  Services <ChevronDown className="h-4 w-4" />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'services' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-card rounded-xl shadow-card-hover border border-border overflow-hidden"
                    >
                      {services.map((service) => (
                        <a
                          key={service}
                          href="#services"
                          className="block px-4 py-3 text-sm hover:bg-secondary transition-colors"
                        >
                          {service}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Marketplace Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('marketplace')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors">
                  Marketplace <ChevronDown className="h-4 w-4" />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'marketplace' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-card rounded-xl shadow-card-hover border border-border overflow-hidden"
                    >
                      {marketplace.map((item) => (
                        <a
                          key={item}
                          href="#marketplace"
                          className="block px-4 py-3 text-sm hover:bg-secondary transition-colors"
                        >
                          {item}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="#about" className="font-medium text-foreground hover:text-primary transition-colors">
                About Us
              </a>
              <a href="#contact" className="font-medium text-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/track">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Track Shipment
                </Button>
              </Link>
              
              {/* Cart */}
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>

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
                        <Link to="/cart" className="block px-4 py-3 text-sm hover:bg-secondary transition-colors">
                          My Cart
                        </Link>
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
              <Link to="/cart" className="relative p-2">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
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
                <Link to="/" className="block py-2 font-medium" onClick={() => setIsOpen(false)}>Home</Link>
                <a href="#services" className="block py-2 font-medium" onClick={() => setIsOpen(false)}>Services</a>
                <a href="#marketplace" className="block py-2 font-medium" onClick={() => setIsOpen(false)}>Marketplace</a>
                <a href="#about" className="block py-2 font-medium" onClick={() => setIsOpen(false)}>About Us</a>
                <a href="#contact" className="block py-2 font-medium" onClick={() => setIsOpen(false)}>Contact</a>
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
