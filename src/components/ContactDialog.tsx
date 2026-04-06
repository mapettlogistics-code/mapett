import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const ContactDialog = ({ trigger }: { trigger: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    salutation: "",
    firstName: "",
    middleName: "",
    surname: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.message) {
      toast.error("Please fill in required fields (First Name, Email, Message)");
      return;
    }
    setLoading(true);
    // Compose WhatsApp message as fallback
    const fullName = [form.salutation, form.firstName, form.middleName, form.surname].filter(Boolean).join(" ");
    const text = `Hello! My name is ${fullName}.\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\n${form.message}`;
    window.open(`https://wa.me/254799390133?text=${encodeURIComponent(text)}`, "_blank");
    toast.success("Redirecting to WhatsApp...");
    setLoading(false);
    setOpen(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+254 799 390 133"],
      href: "https://wa.me/254799390133?text=Hello!%20I'm%20interested%20in%20Mapett%20Logistics%20services.",
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
      details: ["Shree Enclave, Off Links Road", "P.O. Box 2039-80100, Mombasa, Kenya"],
      href: "https://maps.app.goo.gl/yhs7ojNgfXvw72Y19",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM"],
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Contact Us</DialogTitle>
        </DialogHeader>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {contactInfo.map((info) => (
            <a
              key={info.title}
              href={info.href}
              target={info.href?.startsWith("https") ? "_blank" : undefined}
              rel={info.href?.startsWith("https") ? "noopener noreferrer" : undefined}
              className={`flex gap-3 p-3 bg-secondary/50 rounded-xl border border-border ${info.href ? "hover:border-primary cursor-pointer" : ""} transition-colors`}
            >
              <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center shrink-0">
                <info.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-foreground text-sm">{info.title}</h4>
                {info.details.map((detail) => (
                  <p key={detail} className="text-xs text-muted-foreground truncate">{detail}</p>
                ))}
              </div>
            </a>
          ))}
        </div>

        {/* Google Map */}
        <div className="rounded-xl overflow-hidden border border-border mb-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8377034692!2d39.66640!3d-4.03860!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18401316e2c9c0e5%3A0x8c6a8b5f5e5c5d5e!2sMapett%20Logistics%20Ltd!5e0!3m2!1sen!2ske!4v1706000000000!5m2!1sen!2ske"
            width="100%"
            height="180"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapett Logistics Office Location"
          />
        </div>

        {/* Inquiry Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="font-semibold text-foreground">Send an Inquiry</h3>
          <div className="grid grid-cols-4 gap-3">
            <select name="salutation" value={form.salutation} onChange={handleChange} className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option value="">--</option>
              <option>Mr.</option>
              <option>Mrs.</option>
              <option>Ms.</option>
              <option>Dr.</option>
            </select>
            <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name *" className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <input name="middleName" value={form.middleName} onChange={handleChange} placeholder="Middle name" className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <input name="surname" value={form.surname} onChange={handleChange} placeholder="Surname" className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email *" className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+254 700 000 000" className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <select name="service" value={form.service} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option value="">Select a service</option>
            <optgroup label="Logistics Services">
              <option>Customs Clearance</option>
              <option>Air Freight</option>
              <option>Ocean Freight</option>
              <option>Road & Rail Transport</option>
              <option>Product Sourcing (China, Turkey)</option>
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
              <option>Motor Vehicle Insurance</option>
              <option>Warehouse Insurance</option>
              <option>Group Life Insurance</option>
              <option>WIBA & Employees Liability</option>
            </optgroup>
            <optgroup label="E-Commerce Solutions">
              <option>Social Media Pages Setup</option>
              <option>Social Media Cross-posting</option>
              <option>Online Shop Setup</option>
            </optgroup>
            <optgroup label="Auto Store">
              <option>Automotive Lubricants</option>
              <option>Vehicle Tires</option>
              <option>Vehicle Batteries</option>
              <option>Safety Boots</option>
              <option>Industrial Lubricants</option>
              <option>Vehicle Accessories</option>
            </optgroup>
          </select>
          <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Tell us about your needs... *" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
          <Button type="submit" disabled={loading} className="w-full hero-gradient text-primary-foreground shadow-glow hover:opacity-90">
            <Send className="mr-2 h-4 w-4" />
            {loading ? "Sending..." : "Send Inquiry"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
