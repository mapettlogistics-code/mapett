import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
            <a href="tel:+254700000000" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-4 w-4" />
              +254 700 000 000
            </a>
            <a href="mailto:info@mapettlogistics.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="h-4 w-4" />
              info@mapettlogistics.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Nairobi, Kenya</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">M</span>
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">Mapett</span>
                <span className="text-xl font-bold text-primary"> Logistics</span>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#" className="font-medium text-foreground hover:text-primary transition-colors">
                Home
              </a>
              
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

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Track Shipment
              </Button>
              <Button className="hero-gradient text-primary-foreground shadow-glow hover:opacity-90">
                Get Quote
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
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
                <a href="#" className="block py-2 font-medium">Home</a>
                <a href="#services" className="block py-2 font-medium">Services</a>
                <a href="#marketplace" className="block py-2 font-medium">Marketplace</a>
                <a href="#about" className="block py-2 font-medium">About Us</a>
                <a href="#contact" className="block py-2 font-medium">Contact</a>
                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full border-primary text-primary">
                    Track Shipment
                  </Button>
                  <Button className="w-full hero-gradient text-primary-foreground">
                    Get Quote
                  </Button>
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
