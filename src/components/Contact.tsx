import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

// TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Contact = () => {
  const whatsappUrl = "https://wa.me/254799390133?text=Hello!%20I'm%20interested%20in%20Mapett%20Logistics%20services.";

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+254 799 390 133"],
      href: whatsappUrl,
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@mapettlogistics.com", "sales@mapettlogistics.com"],
      href: "mailto:info@mapettlogistics.com",
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["Shree Ecclave, Off Links Road", "P.O. Box 2039-80100, Mombasa, Kenya"],
      href: "https://maps.app.goo.gl/yhs7ojNgfXvw72Y19",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM"],
    },
  ];

  const socials = [
    { icon: Facebook, href: "https://web.facebook.com/profile.php?id=61584459897045", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/mapettlogisticsltd/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@MapettLogisticsLtd", label: "YouTube" },
    { icon: TikTokIcon, href: "https://www.tiktok.com/@mapettlogisticsltd", label: "TikTok" },
  ];

  return (
    <section id="contact" className="py-24">
      <div className="container">
        {/* Header */}
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
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">Send us a Message</h3>
              
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="mt-2 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="mt-2 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <input
                      type="tel"
                      placeholder="+254 700 000 000"
                      className="mt-2 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Service</label>
                    <select className="mt-2 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50">
                      <option>Select a service</option>
                      <option>Air Freight</option>
                      <option>Ocean Freight</option>
                      <option>Road Transport</option>
                      <option>Warehousing</option>
                      <option>Customs Clearance</option>
                      <option>Marketplace Order</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your logistics needs..."
                    className="mt-2 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>

                <Button className="w-full hero-gradient text-primary-foreground shadow-glow hover:opacity-90 group">
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
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

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Office Map */}
            <div className="pt-4">
              <h4 className="font-semibold text-foreground mb-4">Our Location</h4>
              <div className="rounded-xl overflow-hidden border border-border shadow-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8377034692!2d39.66640!3d-4.03860!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18401316e2c9c0e5%3A0x8c6a8b5f5e5c5d5e!2sMapett%20Logistics%20Ltd!5e0!3m2!1sen!2ske!4v1706000000000!5m2!1sen!2ske"
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
