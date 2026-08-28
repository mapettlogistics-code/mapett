import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import CountryFlag from "react-country-flag";

const ContactDialog = ({ trigger }: { trigger: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
    salutation: "",
    firstName: "",
    middleName: "",
    surname: "",
    email: "",
    countryCode: "+254",
    phone: "",
    service: "",
    message: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
   const phoneToCountryCode: Record<string, string> = {
    "+254": "KE",
    "+1": "US",
    "+7": "RU",
    "+20": "EG",
    "+27": "ZA",
    "+30": "GR",
    "+31": "NL",
    "+32": "BE",
    "+33": "FR",
    "+34": "ES",
    "+39": "IT",
    "+44": "GB",
    "+49": "DE",
    "+55": "BR",
    "+61": "AU",
    "+62": "ID",
    "+63": "PH",
    "+65": "SG",
    "+66": "TH",
    "+81": "JP",
    "+82": "KR",
    "+84": "VN",
    "+86": "CN",
    "+90": "TR",
    "+91": "IN",
    "+92": "PK",
    "+93": "AF",
    "+94": "LK",
    "+95": "MM",
    "+98": "IR",
    "+212": "MA",
    "+213": "DZ",
    "+216": "TN",
    "+218": "LY",
    "+234": "NG",
    "+255": "TZ",
    "+256": "UG",
    "+263": "ZW",
    "+351": "PT",
    "+352": "LU",
    "+353": "IE",
    "+354": "IS",
    "+356": "MT",
    "+371": "LV",
    "+372": "EE",
    "+380": "UA",
    "+420": "CZ",
    "+43": "AT",
    "+41": "CH",
    "+48": "PL",
    "+52": "MX",
    "+60": "MY",
    "+64": "NZ",
    "+963": "SY",
    "+966": "SA",
    "+971": "AE",
    "+972": "IL",
    "+974": "QA",
    "+977": "NP",
    "+998": "UZ",
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
    const text = `Hello! My name is ${fullName}.\nEmail: ${form.email}\nPhone: ${form.countryCode}${form.phone}\nService: ${form.service}\n\n${form.message}`;
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
      details: ["sales@mapettlogistics.com"],
      href: "mailto:sales@mapettlogistics.com",
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["Shree Plaza, Ground Floor, Nyali", "P.O. Box 2039-80100, Mombasa, Kenya"],
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
              <div className="flex gap-2">
                <CountryFlag 
                 countryCode={phoneToCountryCode[form.countryCode] || "XX"} 
                 svg 
                 style={{ width: '28px', height: '20px', borderRadius: '2px' }}
                 className="shrink-0"
                 />
                <select
                 name="countryCode"
                 value={form.countryCode}
                 onChange={handleChange}
                 className="px-2 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-28"
               >
                 <option value="+254">+254 Kenya</option>
                 <option value="+1">+1 USA</option>
                 <option value="+7">+7 Russia</option>
                 <option value="+20">+20 Egypt</option>
                 <option value="+27">+27 South Africa</option>
                 <option value="+30">+30 Greece</option>
                 <option value="+31">+31 Netherlands</option>
                 <option value="+32">+32 Belgium</option>
                 <option value="+33">+33 France</option>
                 <option value="+34">+34 Spain</option>
                 <option value="+39">+39 Italy</option>
                 <option value="+44">+44 UK</option>
                 <option value="+49">+49 Germany</option>
                 <option value="+55">+55 Brazil</option>
                 <option value="+61">+61 Australia</option>
                 <option value="+62">+62 Indonesia</option>
                 <option value="+63">+63 Philippines</option>
                 <option value="+65">+65 Singapore</option>
                 <option value="+66">+66 Thailand</option>
                 <option value="+81">+81 Japan</option>
                 <option value="+82">+82 South Korea</option>
                 <option value="+84">+84 Vietnam</option>
                 <option value="+86">+86 China</option>
                 <option value="+90">+90 Turkey</option>
                 <option value="+91">+91 India</option>
                 <option value="+92">+92 Pakistan</option>
                 <option value="+93">+93 Afghanistan</option>
                 <option value="+94">+94 Sri Lanka</option>
                 <option value="+95">+95 Myanmar</option>
                 <option value="+98">+98 Iran</option>
                 <option value="+212">+212 Morocco</option>
                 <option value="+213">+213 Algeria</option>
                 <option value="+216">+216 Tunisia</option>
                 <option value="+218">+218 Libya</option>
                 <option value="+234">+234 Nigeria</option>
                 <option value="+255">+255 Tanzania</option>
                 <option value="+256">+256 Uganda</option>
                 <option value="+263">+263 Zimbabwe</option>
                 <option value="+351">+351 Portugal</option>
                 <option value="+352">+352 Luxembourg</option>
                 <option value="+353">+353 Ireland</option>
                 <option value="+354">+354 Iceland</option>
                 <option value="+356">+356 Malta</option>
                 <option value="+371">+371 Latvia</option>
                 <option value="+372">+372 Estonia</option>
                 <option value="+380">+380 Ukraine</option>
                 <option value="+420">+420 Czech Republic</option>
                 <option value="+43">+43 Austria</option>
                 <option value="+41">+41 Switzerland</option>
                 <option value="+48">+48 Poland</option>
                 <option value="+52">+52 Mexico</option>
                 <option value="+60">+60 Malaysia</option>
                 <option value="+64">+64 New Zealand</option>
                 <option value="+963">+963 Syria</option>
                 <option value="+966">+966 Saudi Arabia</option>
                 <option value="+971">+971 UAE</option>
                 <option value="+972">+972 Israel</option>
                 <option value="+974">+974 Qatar</option>
                 <option value="+977">+977 Nepal</option>
                 <option value="+998">+998 Uzbekistan</option>
               </select>  
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="700 000 000"
                className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
          <select name="service" value={form.service} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option value="">Select a service</option>
            <optgroup label="Logistics Services">
              <option>Customs Clearing & Fowarding</option>
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
               <option>Warehouse Insurance</option>
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
              <option>Contruction Lubricants</option>
              <option>Industrial Lubricants</option>
              <option>Vehicle Accessories</option>
              <option>Vehicle Batteries</option>
              <option>Vehicle Tyres</option>
              <option>Safety Shoes</option>
            </optgroup>
            <optgroup label="Seals & Tags">
              <option>Bolt Security Seals</option>
              <option>Cable & Specialized Security Seals</option>
              <option>Pull-Tight Plastic Security Seals</option>
              <option>Metal Security Seals</option>
              <option>Metre Security Seals</option>
              <option>Padlock Security Seals</option>
              <option>Tamper-Evident Tape Security Seals</option>
            </optgroup>
          </select>
          <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Tell us about your needs... *" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
          <Button type="submit" disabled={loading} className="w-full hero-gradient text-primary-foreground shadow-glow hover:opacity-90">
            <Send className="mr-2 h-4 w-4" />
            {loading ? "Sending..." : "Send Inquiry"}
          </Button>

           {/* Google Map */}
        <div className="rounded-xl overflow-hidden border border-border mb-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.847247644751!2d39.68501027497541!3d-4.05156209592218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184012fa1c12bb03%3A0x45ca6f90ce1f9874!2sShree%20Plaza!5e0!3m2!1sen!2ske!4v1787769491433!5m2!1sen!2ske"
            width="100%"
            height="180"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapett Logistics Office Location"
          />
        </div>

        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
