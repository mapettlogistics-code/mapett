import { Phone, Mail, MapPin, Globe, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PaymentIcons from "@/components/PaymentIcons";
import { useSiteContent } from "@/hooks/useSiteContent";
import { getServicePageLink } from "@/data/serviceRoutes";
import { autostoreMenuItems } from "@/data/autostoreLinks";

const scrollToSection = (hash: string, navigate: ReturnType<typeof useNavigate>) => {
  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  } else {
    navigate("/" + hash);
  }
};

const defaultSocials = [
  { title: "Facebook", link: "https://web.facebook.com/profile.php?id=61584459897045", subtitle: "#1877F2" },
  { title: "Instagram", link: "https://www.instagram.com/mapettlogisticsltd/", subtitle: "#E4405F" },
  { title: "YouTube", link: "https://www.youtube.com/@MapettLogisticsLtd", subtitle: "#FF0000" },
  { title: "TikTok", link: "https://www.tiktok.com/@mapettlogisticsltd", subtitle: "#000000" },
  { title: "LinkedIn", link: "https://www.linkedin.com/company/mapettlogisticsltd/", subtitle: "#0A66C2" },
  { title: "Pinterest", link: "https://www.pinterest.com/MapetteLogisticsLtd/", subtitle: "#E60023" },
];

const defaultContactInfo = [
  { title: "Phone", icon: "Phone", description: "+254 799 390 133", link: "https://wa.me/254799390133?text=Hello!%20I'm%20interested%20in%20Mapett%20Logistics%20services." },
  { title: "Email", icon: "Mail", description: "sales@mapettlogistics.com", link: "mailto:sales@mapettlogistics.com" },
  { title: "Location", icon: "MapPin", description: "Shree Plaza, Ground Floor, Nyali\nP.O. Box 2039-80100, Mombasa, Kenya" },
];

const defaultCompanyInfo = [
  { title: "footer_description", description: "Your trusted partner for comprehensive logistics solutions and automotive products across Kenya and East Africa." },
  { title: "website_url", description: "www.mapettlogistics.com" },
];

const Footer = () => {
  const navigate = useNavigate();
  const { items: socialItems } = useSiteContent("social_link", defaultSocials as any);
  const { items: contactItems } = useSiteContent("contact_info", defaultContactInfo as any);
  const { items: companyItems } = useSiteContent("company_info", defaultCompanyInfo as any);

  const getCompanyValue = (key: string, fallback: string) => {
    const item = companyItems.find(c => c.title === key);
    return item?.description || fallback;
  };

  const phone = contactItems.find(c => c.title === "Phone");
  const email = contactItems.find(c => c.title === "Email");
  const location = contactItems.find(c => c.title === "Location");
  const locationLines = (location?.description || "Shree Plaza, Ground Floor, Nyali\nP.O. Box 2039-80100, Mombasa, Kenya").split("\n");

  const footerDesc = getCompanyValue("footer_description", "Your trusted partner for comprehensive logistics solutions and automotive products across Kenya and East Africa.");
  const websiteUrl = getCompanyValue("website_url", "www.mapettlogistics.com");

  const services = [
    "Customs Clearance",
    "Air Freight",
    "Ocean Freight",
    "Road & Rail Transport",
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

  const autoshop = autostoreMenuItems;

  const company = [
    { name: "About Us", href: "/about", isRoute: true },
    { name: "Our Team", href: "/about", isRoute: true },
    { name: "Directions/Location", href: "https://maps.app.goo.gl/yhs7ojNgfXvw72Y19", external: true },
    { name: "Contact Us", href: "/#contact", isRoute: true },
    { name: "Live Support", href: "/#contact", isRoute: true },
    { name: "Admin Portal", href: "/admin/login", isRoute: true },
  ];

  const getSocialIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n === "tiktok") return (
      <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    );
    if (n === "pinterest") return (
      <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
        <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.93s-.35-.71-.35-1.77c0-1.66.96-2.9 2.16-2.9 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-1 3.99-.28 1.2.6 2.17 1.78 2.17 2.14 0 3.79-2.26 3.79-5.52 0-2.88-2.07-4.9-5.03-4.9-3.42 0-5.43 2.57-5.43 5.22 0 1.04.4 2.15.9 2.75.1.12.11.22.08.34l-.34 1.36c-.05.22-.18.27-.41.16-1.52-.71-2.48-2.92-2.48-4.7 0-3.82 2.78-7.33 8.02-7.33 4.21 0 7.48 3 7.48 7.01 0 4.18-2.64 7.55-6.3 7.55-1.23 0-2.39-.64-2.79-1.4l-.76 2.89c-.27 1.06-1.01 2.4-1.5 3.21A12 12 0 1 0 12 0z"/>
      </svg>
    );
    const IconMap: Record<string, any> = { facebook: Facebook, instagram: Instagram, youtube: Youtube, linkedin: Linkedin };
    const Comp = IconMap[n];
    return Comp ? <Comp className="h-4 w-4 text-white" /> : null;
  };

  const getSocialStyle = (name: string) => {
    const social = socialItems.find(s => s.title?.toLowerCase() === name.toLowerCase());
    const color = social?.subtitle || "#666";
    if (name.toLowerCase() === "instagram") {
      return { background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' };
    }
    return { backgroundColor: color };
  };

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
            <p className="text-background/70 mb-6 max-w-sm">{footerDesc}</p>
            <div className="space-y-3">
              <a href={phone?.link || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors">
                <Phone className="h-5 w-5" />
                {phone?.description || "+254 799 390 133"}
              </a>
              <a href={email?.link || "mailto:sales@mapettlogistics.com"} className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                {email?.description || "sales@mapettlogistics.com"}
              </a>
              <a href={`https://${websiteUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors">
                <Globe className="h-5 w-5" />
                {websiteUrl}
              </a>
              <div className="flex items-start gap-3 text-background/70">
                <MapPin className="h-5 w-5 shrink-0" />
                <div>
                  {locationLines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialItems.map((social, i) => (
                <a
                  key={i}
                  href={social.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                  style={getSocialStyle(social.title || "")}
                >
                  {getSocialIcon(social.title || "")}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Products & Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link to={getServicePageLink(service)} className="text-sm text-background/70 hover:text-primary transition-colors">
                    {service}
                  </Link>
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
                  <Link to={getServicePageLink(item)} className="text-sm text-background/70 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Autostore & Lubricants */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">Autostore & Lubricants</h4>
            <ul className="space-y-2">
              {autoshop.map((item) => (
                <li key={item.name}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-background/70 hover:text-primary transition-colors">
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
