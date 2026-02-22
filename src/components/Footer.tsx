import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const services = [
    "Air Freight",
    "Ocean Freight",
    "Road Transport",
    "Warehousing",
    "Customs Clearance",
    "Project Cargo",
  ];

  const insurance = [
    "Marine Cargo Insurance",
    "Air Cargo Insurance",
    "Inland Transit Insurance",
    "Property Insurance",
    "Fire Insurance",
    "Motor Vehicle Insurance",
    "Warehouse Insurance",
    "Business Insurance",
    "Group Life Insurance",
    "Health Insurance",
    "Personal Accident Insurance",
    "Freight Forwarder Liability",
  ];

  const marketplace = [
    "Automotive Lubricants",
    "Industrial Lubricants",
    "Vehicle Batteries",
    "Vehicle Accessories",
    "Greases & Coolants",
  ];

  const company = [
    { name: "About Us", href: "#about" },
    { name: "Our Team", href: "#about" },
    { name: "Careers", href: "#contact" },
    { name: "News & Updates", href: "#about" },
    { name: "Contact", href: "#contact" },
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
              <a href="mailto:sales@mapettlogistics.com" className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                sales@mapettlogistics.com
              </a>
              <div className="flex items-center gap-3 text-background/70">
                <MapPin className="h-5 w-5" />
                Mombasa, Kenya
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Services</h4>
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
            <h4 className="text-lg font-semibold text-background mb-4">Insurance</h4>
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

          {/* Autoshop */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Autoshop</h4>
            <ul className="space-y-2">
              {marketplace.map((item) => (
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
