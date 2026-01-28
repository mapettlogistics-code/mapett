import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const services = [
    "Air Freight",
    "Ocean Freight",
    "Road Transport",
    "Warehousing",
    "Customs Clearance",
    "Project Cargo",
  ];

  const marketplace = [
    "Automotive Lubricants",
    "Industrial Lubricants",
    "Vehicle Batteries",
    "Vehicle Accessories",
    "Greases & Coolants",
  ];

  const company = [
    "About Us",
    "Our Team",
    "Careers",
    "News & Updates",
    "Contact",
  ];

  return (
    <footer className="dark-gradient text-background">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="mb-6 inline-block">
              <span className="text-xl font-bold text-background">Mapett</span>
              <span className="text-xl font-bold text-primary"> Logistics</span>
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
              <div className="flex items-center gap-3 text-background/70">
                <MapPin className="h-5 w-5" />
                Nairobi, Kenya
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a href="#services" className="text-background/70 hover:text-primary transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Marketplace</h4>
            <ul className="space-y-3">
              {marketplace.map((item) => (
                <li key={item}>
                  <a href="#marketplace" className="text-background/70 hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item}>
                  <a href="#about" className="text-background/70 hover:text-primary transition-colors">
                    {item}
                  </a>
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
            © {new Date().getFullYear()} Mapett Logistics Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-background/60 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-background/60 hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
