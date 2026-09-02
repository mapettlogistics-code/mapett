/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";
import { toast } from "sonner";
import * as LucideIcons from "lucide-react";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const iconMap: Record<string, any> = { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, Linkedin, TikTok: TikTokIcon };

const getIcon = (name: string | null) => {
  if (!name) return Mail;
  return (LucideIcons as any)[name] || iconMap[name] || Mail;
};

const defaultContactInfo = [
  { title: "Phone", icon: "Phone", description: "+254 799 390 133", link: "https://wa.me/254799390133?text=Hello!%20I'm%20interested%20in%20Mapett%20Logistics%20services." },
  { title: "Email", icon: "Mail", description: "sales@mapettlogistics.com", link: "mailto:sales@mapettlogistics.com" },
  { title: "Location", icon: "MapPin", description: "Shree Plaza, Ground Floor, Nyali\nP.O. Box 2039-80100, Mombasa, Kenya", link: "https://maps.app.goo.gl/5Bx5fhPSsvGBhZ8b8" },
  { title: "Working Hours", icon: "Clock", description: "Mon - Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 2:00 PM" },
];

const defaultSocials = [
  { title: "Facebook", link: "https://www.facebook.com/mapetttravelandlogistics/", subtitle: "#1877F2" },
  { title: "Instagram", link: "https://www.instagram.com/mapetttravelandlogistics/", subtitle: "#E4405F" },
  { title: "YouTube", link: "https://www.youtube.com/@MapetttravelandLogistics", subtitle: "#FF0000" },
  { title: "TikTok", link: "https://www.tiktok.com/@mapetttravelandlogistics", subtitle: "#000000" },
  { title: "LinkedIn", link: "https://www.linkedin.com/in/mapett-travel-and-logistics-ltd-906116429/", subtitle: "#0A66C2" },
];

const phoneCountries: Record<string, string> = {
  "+1": "US", "+7": "RU", "+20": "EG", "+27": "ZA", "+30": "GR", "+31": "NL", "+32": "BE", "+33": "FR", "+34": "ES", "+39": "IT", "+41": "CH", "+43": "AT", "+44": "GB", "+48": "PL", "+49": "DE", "+52": "MX", "+55": "BR", "+60": "MY", "+61": "AU", "+62": "ID", "+63": "PH", "+64": "NZ", "+65": "SG", "+66": "TH", "+81": "JP", "+82": "KR", "+84": "VN", "+86": "CN", "+90": "TR", "+91": "IN", "+92": "PK", "+93": "AF", "+94": "LK", "+95": "MM", "+98": "IR", "+211": "SS", "+212": "MA", "+213": "DZ", "+216": "TN", "+218": "LY", "+220": "GM", "+221": "SN", "+223": "ML", "+224": "GN", "+225": "CI", "+226": "BF", "+227": "NE", "+228": "TG", "+229": "BJ", "+230": "MU", "+231": "LR", "+232": "SL", "+233": "GH", "+234": "NG", "+235": "TD", "+236": "CF", "+237": "CM", "+238": "CV", "+239": "ST", "+240": "GQ", "+241": "GA", "+242": "CG", "+244": "AO", "+245": "GW", "+248": "SC", "+249": "SD", "+250": "RW", "+251": "ET", "+252": "SO", "+253": "DJ", "+254": "KE", "+255": "TZ", "+256": "UG", "+257": "BI", "+258": "MZ", "+260": "ZM", "+261": "MG", "+262": "RE", "+263": "ZW", "+264": "NA", "+265": "MW", "+266": "LS", "+267": "BW", "+268": "SZ", "+269": "KM", "+290": "SH", "+291": "ER", "+297": "AW", "+298": "FO", "+299": "GL", "+351": "PT", "+352": "LU", "+353": "IE", "+354": "IS", "+356": "MT", "+371": "LV", "+372": "EE", "+380": "UA", "+420": "CZ", "+963": "SY", "+966": "SA", "+971": "AE", "+972": "IL", "+974": "QA", "+977": "NP", "+998": "UZ",
};

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ salutation: "", firstName: "", middleName: "", surname: "", email: "", countryCode: "+254", phone: "", service: "", message: "" });
  const { items: contactItems } = useSiteContent("contact_info", defaultContactInfo as any);
  const { items: socialItems } = useSiteContent("social_link", defaultSocials as any);

  const contactInfo = contactItems.map(c => ({
    icon: getIcon(c.icon),
    title: c.title || "",
    details: (c.description || "").split("\n").filter(Boolean),
    href: c.link || undefined,
  }));

  const socials = socialItems.map(s => {
    const name = s.title || "";
    let IconComp: any;
    if (name.toLowerCase() === "tiktok") IconComp = TikTokIcon;
    else if (name.toLowerCase() === "youtube") IconComp = Youtube;
    else IconComp = getIcon(s.icon || name);
    return {
      icon: IconComp,
      href: s.link || "",
      label: name,
      brandColor: s.subtitle || "#666",
    };
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (Object.values(form).some((value) => !value)) {
      toast.error("Please complete every field before sending your message.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-inquiry-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ type: "inquiry", name: [form.salutation, form.firstName, form.middleName, form.surname].join(" "), email: form.email, phone: `${form.countryCode}${form.phone}`, service: form.service, message: form.message }),
      });
      if (!response.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully to sales@mapettlogistics.com!");
      setForm({ salutation: "", firstName: "", middleName: "", surname: "", email: "", countryCode: "+254", phone: "", service: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const countryCode = phoneCountries[form.countryCode] || "KE";

  return (
    <section id="contact" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let's Discuss Your Logistics Needs
          </h2>
          <p className="text-muted-foreground text-lg">
            Ready to optimize your supply chain? Contact us today for a free consultation 
            and quote tailored to your business.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">Send us a Message</h3>
               
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Salutation</label>
                    <select name="salutation" value={form.salutation} onChange={handleChange} required className="mt-2 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option value="">--</option>
                      <option>Mr.</option>
                      <option>Mrs.</option>
                      <option>Ms.</option>
                      <option>Dr.</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" required className="mt-2 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Middle Name</label>
                    <input type="text" name="middleName" value={form.middleName} onChange={handleChange} placeholder="Middle name" required className="mt-2 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Surname</label>
                    <input type="text" name="surname" value={form.surname} onChange={handleChange} placeholder="Surname" required className="mt-2 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required className="mt-2 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <div className="mt-2 flex h-12 items-center overflow-hidden rounded-lg border border-border bg-background">
                      <img src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`} alt={countryCode} className="mx-3 h-4 w-[22px] rounded-sm object-cover" />
                      <select name="countryCode" value={form.countryCode} onChange={handleChange} required className="h-full w-36 shrink-0 border-0 border-l border-border bg-transparent px-2 text-sm focus:outline-none focus:ring-0">
                        {Object.entries(phoneCountries).map(([code, region]) => <option key={code} value={code}>{countryNames.of(region)} ({code})</option>)}
                      </select>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="700 000 000" required className="h-full min-w-0 flex-1 border-l border-border bg-transparent px-3 focus:outline-none" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Service</label>
                  <select name="service" value={form.service} onChange={handleChange} required className="mt-2 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option value="">Select a service</option>
                    <optgroup label="Logistics Services">
                      <option>Customs Clearing & Forwarding</option>
                      <option>Air Freight</option>
                      <option>Ocean Freight</option>
                      <option>Road & Rail Transport</option>
                      <option>Refrigerated Cargo</option>
                      <option>Special Cargo</option>
                      <option>Warehousing</option>
                      <option>Intermodal Solutions</option>
                    </optgroup>
                    <optgroup label="Insurance">
                      <option>Marine Cargo Insurance</option>
                      <option>Air Cargo Insurance</option>
                      <option>Inland Transit Insurance</option>
                      <option>Freight Forwarder Liability</option>
                      <option>Warehouse Insurance</option>
                      <option>Life Insurance</option>
                      <option>WIBA & Employees Liability</option>
                    </optgroup>
                    <optgroup label="Mapett Travel">
                      <option>Air Tickets</option>
                      <option>Hotel Booking</option>
                      <option>Visa Processing</option>
                      <option>Tours & Safari Packages</option>
                      <option>Airport Transfers</option>
                      <option>Travel Insurance</option>
                      <option>Travel Essentials</option>
                    </optgroup>
                    <optgroup label="Autostore & Lubricants">
                      <option>Automotive Lubricants</option>
                      <option>Food Grade Lubricants</option>
                      <option>Agricultural Lubricants</option>
                      <option>Industrial Lubricants</option>
                      <option>Construction Lubricants</option>
                      <option>Vehicle Accessories</option>
                      <option>Vehicle Batteries</option>
                      <option>Vehicle Tyres</option>
                      <option>Safety Shoes</option>
                    </optgroup>
                    <optgroup label="Seals & Tags">
                    <option>Container & Cargo Seals</option>
                    <option>Bolt Security Seals</option>
                    <option>Cable Security Seals</option>
                    <option>Plastic Security Seals</option>
                    <option>Metal Security Seals</option>
                    <option>Strap Security Seals</option>
                    <option>Metre Security Seals</option>
                    <option>Padlock Security Seals</option>
                    <option>Clip Security Seals</option>
                    <option>Tamper-Evident Papers</option>
                    <option>Tamper-Evident Tapes</option>
                  </optgroup>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required
                    rows={5}
                    placeholder="Tell us about your logistics needs..."
                    className="mt-2 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full hero-gradient text-primary-foreground shadow-glow hover:opacity-90 group">
                  <Send className="mr-2 h-5 w-5" />
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.href}
                target={info.href?.startsWith("https") ? "_blank" : undefined}
                rel={info.href?.startsWith("https") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex gap-4 p-4 bg-card rounded-xl shadow-card border border-border ${info.href ? 'hover:border-primary cursor-pointer' : ''}`}
              >
                <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center shrink-0">
                  <info.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                  {info.details.map((detail) => (
                    <p key={detail} className="text-sm text-muted-foreground">{detail}</p>
                  ))}
                </div>
              </motion.a>
            ))}

            <div className="pt-4">
              <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-opacity hover:opacity-80"
                    style={{ backgroundColor: social.brandColor }}
                    title={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h4 className="font-semibold text-foreground mb-4">Our Location</h4>
              <div className="rounded-xl overflow-hidden border border-border shadow-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.847247644751!2d39.68501027497541!3d-4.05156209592218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184012fa1c12bb03%3A0x45ca6f90ce1f9874!2sShree%20Plaza!5e0!3m2!1sen!2ske!4v1787769491433!5m2!1sen!2ske" 
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapett Logistics Office Location"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;