import { Phone, Mail, MapPin, Globe, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PaymentIcons from "@/components/PaymentIcons";

const scrollToSection = (hash: string, navigate: ReturnType<typeof useNavigate>) => {
  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    navigate("/" + hash);
  }
};

const Footer = () => {
  const navigate = useNavigate();
  const services = [
    "Customs Clearance",
    "Air Freight",
    "Ocean Freight",
    "Road & Rail Transport",
    "Product Sourcing",
    "Refrigerated Cargo",
    "Special Cargo",
    "Warehousing",
  ];

  const insurance = [
    "Marine Cargo Insurance",
    "Air Cargo Insurance",
    "Inland Transit Insurance",
    "Freight Forwarder Liability",
    "Motor Vehicle Insurance",
    "WIBA & Employees Liability",
    "Life Insurance",
    "Warehouse Insurance",
  ];

  const autoshop = [
    { name: "Automotive Lubricants", category: "lubricants" },
    { name: "Food Grade Lubricants", category: "food-grade-lubricants" },
    { name: "Agricultural Lubricants", category: "agricultural-lubricants" },
    { name: "Industrial Lubricants", category: "industrial-lubricants" },
    { name: "Vehicle Accessories", category: "accessories" },
    { name: "Safety Shoes", category: "safety-shoes" },
    { name: "Vehicle Tires", category: "tires" },
    { name: "Vehicle Batteries", category: "batteries" },
  ];

  const company = [
    { name: "About Us", href: "#about" },
    { name: "Our Team", href: "#about" },
    { name: "Directions/Location", href: "https://maps.app.goo.gl/yhs7ojNgfXvw72Y19", external: true },
    { name: "Contact Us", href: "#contact" },
    { name: "Live Support", href: "#contact" },
    { name: "Admin Portal", href: "/admin/login", isRoute: true },
  ];

  return (
    <footer className="dark-gradient text-background">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="mb-6 inline-block">
              <span className="text-xl font-bold text-background">Mapett</span>
              <span className="text-xl font-bold text-primary"> Logistics LTD</span>
            </a>
            <p className="text-background/70 mb-6 max-w-sm">
              Your trusted partner for comprehensive logistics solutions and automotive products 
              across Kenya and East Africa.
            </p>
            <div className="space-y-3">
              <a href="https://wa.me/254799390133?text=Hello!%20I'm%20interested%20in%20Mapett%20Logistics%20services." target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors">
                <Phone className="h-5 w-5" />
                +254 799 390 133
              </a>
              <a href="mailto:info@mapettlogistics.com" className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                info@mapettlogistics.com
              </a>
              <a href="https://www.mapettlogistics.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors">
                <Globe className="h-5 w-5" />
                www.mapettlogistics.com
              </a>
              <div className="flex items-start gap-3 text-background/70">
                <MapPin className="h-5 w-5 shrink-0" />
                <div>
                  <p>Shree Enclave, Off Links Road</p>
                  <p>P.O. Box 2039-80100, Mombasa, Kenya</p>
                </div>
              </div>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a href="https://web.facebook.com/profile.php?id=61584459897045" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: '#1877F2' }}>
                <Facebook className="h-4 w-4 text-white" />
              </a>
              <a href="https://www.instagram.com/mapettlogisticsltd/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors" style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                <Instagram className="h-4 w-4 text-white" />
              </a>
              <a href="https://www.youtube.com/@MapettLogisticsLtd" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: '#FF0000' }}>
                <Youtube className="h-4 w-4 text-white" />
              </a>
              <a href="https://www.linkedin.com/company/mapettlogisticsltd/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: '#0A66C2' }}>
                <Linkedin className="h-4 w-4 text-white" />
              </a>
              <a href="https://www.tiktok.com/@mapettlogisticsltd" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: '#000000' }}>
                <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="https://www.pinterest.com/MapetteLogisticsLtd/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: '#E60023' }}>
                <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
                  <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.93s-.35-.71-.35-1.77c0-1.66.96-2.9 2.16-2.9 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-1 3.99-.28 1.2.6 2.17 1.78 2.17 2.14 0 3.79-2.26 3.79-5.52 0-2.88-2.07-4.9-5.03-4.9-3.42 0-5.43 2.57-5.43 5.22 0 1.04.4 2.15.9 2.75.1.12.11.22.08.34l-.34 1.36c-.05.22-.18.27-.41.16-1.52-.71-2.48-2.92-2.48-4.7 0-3.82 2.78-7.33 8.02-7.33 4.21 0 7.48 3 7.48 7.01 0 4.18-2.64 7.55-6.3 7.55-1.23 0-2.39-.64-2.79-1.4l-.76 2.89c-.27 1.06-1.01 2.4-1.5 3.21A12 12 0 1 0 12 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Products & Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <button onClick={() => scrollToSection("#services", navigate)} className="text-sm text-background/70 hover:text-primary transition-colors text-left">
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Insurance */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Insurance Policies</h4>
            <ul className="space-y-2">
              {insurance.map((item) => (
                <li key={item}>
                  <button onClick={() => scrollToSection("#insurance", navigate)} className="text-sm text-background/70 hover:text-primary transition-colors text-left">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Auto Store */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Auto Store</h4>
            <ul className="space-y-2">
              {autoshop.map((item) => (
                <li key={item.name}>
                  <a href={`https://mappetstore.com/products?category=${item.category}`} target="_blank" rel="noopener noreferrer" className="text-sm text-background/70 hover:text-primary transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Company</h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  {item.isRoute ? (
                    <Link to={item.href} className="text-sm text-background/70 hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  ) : item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-background/70 hover:text-primary transition-colors">
                      {item.name}
                    </a>
                  ) : (
                    <button onClick={() => scrollToSection(item.href, navigate)} className="text-sm text-background/70 hover:text-primary transition-colors text-left">
                      {item.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-background/60 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Mapett Logistics LTD. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-sm text-background/60 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <a href="/documents/MAPETT_LOGISTICS_LIMITED_TERMS_AND_CONDITIONS.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-background/60 hover:text-primary transition-colors">
              Terms of Service
            </a>
            <PaymentIcons />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
