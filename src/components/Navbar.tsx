import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin, ChevronDown, User, LogOut, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import ContactDialog from "@/components/ContactDialog";
import PaymentIcons from "@/components/PaymentIcons";
import mapettLogo from "@/assets/mapett-logo.png";
import { getServicePageLink } from "@/data/serviceRoutes";
import { AUTOSTORE_HOME, autostoreMenuItems } from "@/data/autostoreLinks";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (hash: string) => {
    if (location.pathname !== "/") {
      navigate("/" + hash);
    } else {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    "Customs Clearance",
    "Air Freight",
    "Ocean Freight",
    "Road & Rail Transport",
    "Refrigerated Cargo",
    "Special Cargo",
    "Warehousing",
  ];

  const productServiceLinks = [
    ...services.map((service) => ({
      label: service,
      href: getServicePageLink(service),
      external: false as const,
    })),
    {
      label: "Shop Seals & Tags",
      href: "https://mapett.com/collections/seals-tags",
      external: true as const,
      shopHighlight: true as const,
    },
    {
      label: "Shop Autostore & Lubricants",
      href: AUTOSTORE_HOME,
      external: true as const,
      shopHighlight: true as const,
    },
  ];

  const ecommerce = [
    { label: "Air Tickets", href: "/flight-booking" },
    { label: "Hotel Booking", href: "/hotel-booking" },
    { label: "Visa Processing", href: "/visa-processing" },
    { label: "Tour & Safaris Packages", href: "/tours-safaris" },
    { label: "Airport Transfers", href: "/airport-transfers" },
    { label: "Travel Insurance", href: "/travel-insurance" },
    { label: "Travel Essentials", href: "/travel-essentials" },
  ];

  const insurance = [
    "Marine Cargo Insurance",
    "Air Cargo Insurance",
    "Inland Transit Insurance",
    "Freight Forwarder Liability",
    "WIBA & Employees Liability",
    "Life Insurance",
    "Warehouse Insurance",
  ];

  const autoshop = autostoreMenuItems;

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

  const renderProductServiceLabel = (label: string, shopHighlight?: boolean) => {
    if (shopHighlight) {
      return <span className="text-primary font-semibold">{label}</span>;
    }
    return label;
  };

  const navLinkClass =
    "text-nav font-medium whitespace-nowrap text-foreground hover:text-primary transition-colors";
  const navDropdownClass =
    "flex items-center gap-0.5 text-nav font-medium whitespace-nowrap text-foreground hover:text-primary transition-colors";
  const mobileNavLinkClass =
    "block py-2 text-nav font-medium text-foreground hover:text-primary transition-colors";

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
            <a href="mailto:sales@mapettlogistics.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="h-4 w-4" />
              sales@mapettlogistics.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <PaymentIcons />
            <div className="flex items-center gap-2 border-l border-primary-foreground/30 pl-4">
              <a href="https://www.facebook.com/mapetttravelandlogistics/" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: "#1877F2" }}>
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/mapetttravelandlogistics/" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: "#E4405F" }}>
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.youtube.com/@MapetttravelandLogistics" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: "#FF0000" }}>
                <Youtube className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/in/mapett-travel-and-logistics-ltd-906116429/" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: "#0A66C2" }}>
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://www.tiktok.com/@mapetttravelandlogistics" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: "#000000" }}>
                <TikTokSvg />
              </a>
              <a href="https://www.pinterest.com/mapetttravelandlogistics/" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded flex items-center justify-center hover:opacity-80 transition-opacity" style={{ backgroundColor: "#E60023" }}>
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
            <div className="flex items-center gap-8 lg:gap-10 min-w-0">
              {/* Logo */}
              <Link to="/" className="flex items-center h-20 md:h-24 shrink-0">
                <img src={mapettLogo} alt="Mapett Travel & Logistics" className="h-14 md:h-20 w-auto object-contain" />
              </Link>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center gap-3 xl:gap-4 min-w-0 text-nav">
              <Link to="/about" className={navLinkClass}>
                About Us
              </Link>
              
              {/* Products & Services dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link to="/products-services" className={navDropdownClass}>
                  <span>Products & Services</span>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0" />
                </Link>
                <AnimatePresence>
                  {activeDropdown === 'services' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-72 bg-card rounded-xl shadow-card-hover border border-border overflow-hidden"
                    >
                      <div className="py-1">
                        {productServiceLinks.map((item) =>
                          item.external ? (
                            <a
                              key={item.label}
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setActiveDropdown(null)}
                              className="block px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                            >
                              {renderProductServiceLabel(item.label, "shopHighlight" in item && item.shopHighlight)}
                            </a>
                          ) : (
                            <Link
                              key={item.label}
                              to={item.href}
                              onClick={() => setActiveDropdown(null)}
                              className="block px-4 py-2.5 text-sm hover:bg-secondary transition-colors"
                            >
                              {renderProductServiceLabel(item.label, "shopHighlight" in item && item.shopHighlight)}
                            </Link>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Autostore & Lubricants Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('autoshop')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a href={AUTOSTORE_HOME} target="_blank" rel="noopener noreferrer" className={navDropdownClass}>
                  <span>Autostore & Lubricants</span>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0" />
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
                        <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 text-sm hover:bg-secondary transition-colors">
                          {item.name}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Seals & Tags */}
              <a href="https://mapett.com/collections/seals-tags" target="_blank" rel="noopener noreferrer" className={navLinkClass}>
                Seals & Tags
              </a>

              {/* Insurance Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('insurance')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link to="/insurance" className={navDropdownClass}>
                  <span>Insurance</span>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0" />
                </Link>
                <AnimatePresence>
                  {activeDropdown === 'insurance' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-card rounded-xl shadow-card-hover border border-border overflow-hidden"
                    >
                      {insurance.map((item) => (
                        <Link 
                          key={item} 
                          to={getServicePageLink(item)}
                          onClick={() => setActiveDropdown(null)} 
                          className="block px-4 py-3 text-sm hover:bg-secondary transition-colors"
                        >
                          {item}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mapett Travel dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('ecommerce')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={navDropdownClass}>
                  <span>Mapett Travel</span>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0" />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'ecommerce' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-card rounded-xl shadow-card-hover border border-border overflow-hidden"
                    >
                      {ecommerce.map((item) => (
                        <Link key={item.label} to={item.href} onClick={() => setActiveDropdown(null)} className="block px-4 py-3 text-sm hover:bg-secondary transition-colors">
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/track">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Track Shipment
                </Button>
              </Link>
              
              {/* Contact Us */}
              <ContactDialog
                trigger={
                  <Button className="hero-gradient text-primary-foreground shadow-glow hover:opacity-90">
                    <Mail className="mr-2 h-4 w-4" />
                    Contacts
                  </Button>
                }
              />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
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
                <Link to="/about" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>About Us</Link>
                <Link to="/products-services" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Products & Services</Link>
                <a href={AUTOSTORE_HOME} target="_blank" rel="noopener noreferrer" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Autostore & Lubricants</a>
                <a href="https://mapett.com/collections/seals-tags" target="_blank" rel="noopener noreferrer" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Seals & Tags</a>
                <Link to="/insurance" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Insurance</Link>
                <button className={`${mobileNavLinkClass} w-full text-left`} onClick={() => { scrollToSection("#contact"); setIsOpen(false); }}>Mapett Travel</button>
                {ecommerce.map((item) => <Link key={item.label} to={item.href} className={`${mobileNavLinkClass} pl-4`} onClick={() => setIsOpen(false)}>{item.label}</Link>)}
                <button className={`${mobileNavLinkClass} w-full text-left`} onClick={() => { scrollToSection("#contact"); setIsOpen(false); }}>Contacts</button>
                <a href="https://maps.app.goo.gl/yhs7ojNgfXvw72Y19" target="_blank" rel="noopener noreferrer" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>Directions/Location</a>
                {/* Contact Info */}
                <div className="py-2 space-y-1 text-sm text-muted-foreground">
                  <p>📞 +254 799 390 133</p>
                  <p>✉️ sales@mapettlogistics.com</p>
                </div>
                {/* Social Links */}
                <div className="flex items-center gap-3 py-2">
                  <span className="text-sm text-muted-foreground">Follow us:</span>
                  <a href="https://www.facebook.com/mapetttravelandlogistics/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a href="https://www.instagram.com/mapetttravelandlogistics/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a href="https://www.youtube.com/@MapetttravelandLogistics" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Youtube className="h-4 w-4" />
                  </a>
                  <a href="https://www.linkedin.com/in/mapett-travel-and-logistics-ltd-906116429/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a href="https://www.tiktok.com/@mapetttravelandlogistics" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <TikTokSvg />
                  </a>
                  <a href="https://www.pinterest.com/mapetttravelandlogistics/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <PinterestSvg />
                  </a>
                </div>
                <div className="pt-4 space-y-2">
                  <Link to="/track" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full border-primary text-primary">
                      Track Shipment
                    </Button>
                  </Link>
                  <ContactDialog
                    trigger={
                      <Button className="w-full hero-gradient text-primary-foreground" onClick={() => setIsOpen(false)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Contacts
                      </Button>
                    }
                  />
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
