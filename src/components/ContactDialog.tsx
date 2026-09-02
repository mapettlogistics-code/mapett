import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const CountryFlag = ({ countryCode }: { countryCode: string }) => {
  const code = (countryCode || "KE").toUpperCase();
  const alpha2 = code === "UK" ? "GB" : code;
  const flagSrc = `https://flagcdn.com/w40/${alpha2.toLowerCase()}.png`;

  return (
    <div
      className="flex items-center justify-center overflow-hidden border border-r-0 border-border bg-white"
      style={{
        width: "42px",
        height: "38px",
        minWidth: "42px",
        borderRadius: "8px 0 0 8px",
      }}
    >
      <img
        src={flagSrc}
        alt={alpha2}
        title={alpha2}
        loading="lazy"
        style={{
          width: "22px",
          height: "16px",
          display: "block",
          objectFit: "cover",
          borderRadius: "2px",
          boxShadow: "0 0 0 1px rgba(15, 23, 42, 0.08)",
        }}
        onError={(event) => {
          event.currentTarget.src = "https://flagcdn.com/w40/ke.png";
        }}
      />
    </div>
  );
};

const ContactDialog = ({ trigger }: { trigger: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    salutation: "",
    firstName: "",
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
    "+211": "SS",
    "+212": "MA",
    "+213": "DZ",
    "+216": "TN",
    "+218": "LY",
    "+220": "GM",
    "+221": "SN",
    "+222": "MR",
    "+223": "ML",
    "+224": "GN",
    "+225": "CI",
    "+226": "BF",
    "+227": "NE",
    "+228": "TG",
    "+229": "BJ",
    "+230": "MU",
    "+231": "LR",
    "+232": "SL",
    "+233": "GH",
    "+234": "NG",
    "+235": "TD",
    "+236": "CF",
    "+237": "CM",
    "+238": "CV",
    "+239": "ST",
    "+240": "GQ",
    "+241": "GA",
    "+242": "CG",
    "+244": "AO",
    "+245": "GW",
    "+246": "IO",
    "+248": "SC",
    "+249": "SD",
    "+250": "RW",
    "+251": "ET",
    "+252": "SO",
    "+253": "DJ",
    "+254": "KE",
    "+255": "TZ",
    "+256": "UG",
    "+257": "BI",
    "+258": "MZ",
    "+260": "ZM",
    "+261": "MG",
    "+262": "RE",
    "+263": "ZW",
    "+264": "NA",
    "+265": "MW",
    "+266": "LS",
    "+267": "BW",
    "+268": "SZ",
    "+269": "KM",
    "+27": "ZA",
    "+290": "SH",
    "+291": "ER",
    "+297": "AW",
    "+298": "FO",
    "+299": "GL",
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
    
    const fullName = [form.salutation, form.firstName, form.surname].filter(Boolean).join(" ");
    
    try {
      // Send email via Supabase Edge Function
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/send-inquiry-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          type: "inquiry",
          name: fullName,
          email: form.email,
          phone: form.countryCode + form.phone,
          service: form.service,
          message: form.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send inquiry");
      }

      toast.success("Inquiry sent successfully to sales@mapettlogistics.com!");
      setOpen(false);
      setForm({
        salutation: "",
        firstName: "",
        surname: "",
        email: "",
        countryCode: "+254",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <div className="grid grid-cols-3 gap-3">
            <select name="salutation" value={form.salutation} onChange={handleChange} className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option value="">--</option>
              <option>Mr.</option>
              <option>Mrs.</option>
              <option>Ms.</option>
              <option>Dr.</option>
            </select>
            <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name *" className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <input name="surname" value={form.surname} onChange={handleChange} placeholder="Surname" className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
           <div className="grid grid-cols-2 gap-3">
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email *" className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <div className="flex h-10 items-center overflow-hidden rounded-lg border border-border bg-background shadow-sm">
              <CountryFlag countryCode={phoneToCountryCode[form.countryCode] || "KE"} />
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                className="h-10 border-0 bg-transparent px-2 text-sm font-medium text-foreground focus:outline-none focus:ring-0 min-w-[128px]"
              >
                <option value="+244">Angola (+244)</option>
                <option value="+213">Algeria (+213)</option>
                <option value="+267">Botswana (+267)</option>
                <option value="+257">Burundi (+257)</option>
                <option value="+226">Burkina Faso (+226)</option>
                <option value="+237">Cameroon (+237)</option>
                <option value="+238">Cape Verde (+238)</option>
                <option value="+236">Central African Republic (+236)</option>
                <option value="+235">Chad (+235)</option>
                <option value="+269">Comoros (+269)</option>
                <option value="+242">Republic of the Congo (+242)</option>
                <option value="+253">Djibouti (+253)</option>
                <option value="+20">Egypt (+20)</option>
                <option value="+240">Equatorial Guinea (+240)</option>
                <option value="+291">Eritrea (+291)</option>
                <option value="+251">Ethiopia (+251)</option>
                <option value="+268">Eswatini (+268)</option>
                <option value="+241">Gabon (+241)</option>
                <option value="+220">Gambia (+220)</option>
                <option value="+233">Ghana (+233)</option>
                <option value="+224">Guinea (+224)</option>
                <option value="+245">Guinea-Bissau (+245)</option>
                <option value="+225">Ivory Coast (+225)</option>
                <option value="+254">Kenya (+254)</option>
                <option value="+266">Lesotho (+266)</option>
                <option value="+231">Liberia (+231)</option>
                <option value="+218">Libya (+218)</option>
                <option value="+261">Madagascar (+261)</option>
                <option value="+265">Malawi (+265)</option>
                <option value="+223">Mali (+223)</option>
                <option value="+230">Mauritania (+230)</option>
                <option value="+230">Mauritius (+230)</option>
                <option value="+258">Mozambique (+258)</option>
                <option value="+264">Namibia (+264)</option>
                <option value="+227">Niger (+227)</option>
                <option value="+234">Nigeria (+234)</option>
                <option value="+250">Rwanda (+250)</option>
                <option value="+290">Saint Helena (+290)</option>
                <option value="+221">Senegal (+221)</option>
                <option value="+248">Seychelles (+248)</option>
                <option value="+232">Sierra Leone (+232)</option>
                <option value="+252">Somalia (+252)</option>
                <option value="+211">South Sudan (+211)</option>
                <option value="+27">South Africa (+27)</option>
                <option value="+249">Sudan (+249)</option>
                <option value="+239">São Tomé and Príncipe (+239)</option>
                <option value="+255">Tanzania (+255)</option>
                <option value="+228">Togo (+228)</option>
                <option value="+216">Tunisia (+216)</option>
                <option value="+256">Uganda (+256)</option>
                <option value="+1">USA (+1)</option>
                <option value="+7">Russia (+7)</option>
                <option value="+30">Greece (+30)</option>
                <option value="+31">Netherlands (+31)</option>
                <option value="+32">Belgium (+32)</option>
                <option value="+33">France (+33)</option>
                <option value="+34">Spain (+34)</option>
                <option value="+39">Italy (+39)</option>
                <option value="+44">UK (+44)</option>
                <option value="+49">Germany (+49)</option>
                <option value="+55">Brazil (+55)</option>
                <option value="+61">Australia (+61)</option>
                <option value="+62">Indonesia (+62)</option>
                <option value="+63">Philippines (+63)</option>
                <option value="+65">Singapore (+65)</option>
                <option value="+66">Thailand (+66)</option>
                <option value="+81">Japan (+81)</option>
                <option value="+82">South Korea (+82)</option>
                <option value="+84">Vietnam (+84)</option>
                <option value="+86">China (+86)</option>
                <option value="+90">Turkey (+90)</option>
                <option value="+91">India (+91)</option>
                <option value="+92">Pakistan (+92)</option>
                <option value="+93">Afghanistan (+93)</option>
                <option value="+94">Sri Lanka (+94)</option>
                <option value="+95">Myanmar (+95)</option>
                <option value="+98">Iran (+98)</option>
                <option value="+351">Portugal (+351)</option>
                <option value="+352">Luxembourg (+352)</option>
                <option value="+353">Ireland (+353)</option>
                <option value="+354">Iceland (+354)</option>
                <option value="+356">Malta (+356)</option>
                <option value="+371">Latvia (+371)</option>
                <option value="+372">Estonia (+372)</option>
                <option value="+380">Ukraine (+380)</option>
                <option value="+420">Czech Republic (+420)</option>
                <option value="+43">Austria (+43)</option>
                <option value="+41">Switzerland (+41)</option>
                <option value="+48">Poland (+48)</option>
                <option value="+52">Mexico (+52)</option>
                <option value="+60">Malaysia (+60)</option>
                <option value="+64">New Zealand (+64)</option>
                <option value="+963">Syria (+963)</option>
                <option value="+966">Saudi Arabia (+966)</option>
                <option value="+971">UAE (+971)</option>
                <option value="+972">Israel (+972)</option>
                <option value="+974">Qatar (+974)</option>
                <option value="+977">Nepal (+977)</option>
                <option value="+998">Uzbekistan (+998)</option>
                <option value="+263">Zimbabwe (+263)</option>
                <option value="+260">Zambia (+260)</option>
              </select>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="700 000 000"
                className="h-10 flex-1 border-l border-border bg-transparent px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </div>
          <select name="service" value={form.service} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
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