import { Phone, Mail, MapPin, Globe, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
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
    "WIBA Insurance",
    "Life Insurance",
    "Personal Accident Insurance",
  ];

  const autoshop = [
    "Automotive Lubricants",
    "Vehicle Tires",
    "Vehicle Accessories",
    "Vehicle Batteries",
    "Food Grade Lubricants",
    "Agricultural Lubricants",
    "Seals & Tags",
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
              <a href="tel:+254725649202" className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors">
                <Phone className="h-5 w-5" />
                +254 725 649 202
              </a>
              <a href="mailto:sales@mapettlogistics.com" className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                sales@mapettlogistics.com
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
              <a href="https://web.facebook.com/profile.php?id=61584459897045" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/mapettlogisticsltd/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.youtube.com/@MapettLogisticsLtd" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/company/mapettlogisticsltd/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Products & Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <a href="#services" className="text-sm text-background/70 hover:text-primary transition-colors">
                    {service}
                  </a>
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
                  <a href="#insurance" className="text-sm text-background/70 hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Auto Store */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Auto Store</h4>
            <ul className="space-y-2">
              {autoshop.map((item) => (
                <li key={item}>
                  <a href="https://multistore.simiyu.app" target="_blank" rel="noopener noreferrer" className="text-sm text-background/70 hover:text-primary transition-colors">
                    {item}
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
                    <a href={item.href} className="text-sm text-background/70 hover:text-primary transition-colors">
                      {item.name}
                    </a>
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
            <a href="#" className="text-sm text-background/60 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/documents/MAPETT_LOGISTICS_LIMITED_TERMS_AND_CONDITIONS.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-background/60 hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
