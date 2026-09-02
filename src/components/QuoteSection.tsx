import { useState, type ComponentType } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Truck, Package, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";
import { toast } from "sonner";
import * as LucideIcons from "lucide-react";

type IconComponent = ComponentType<{ className?: string }>;

const getIcon = (name: string | null) => {
  if (!name) return Package;
  const icon = LucideIcons[name as keyof typeof LucideIcons];
  return (typeof icon === "object" ? icon : Package) as IconComponent;
};

const defaultStats = [
  { title: "10+", subtitle: "Years Experience", icon: "Truck" },
  { title: "50K+", subtitle: "Deliveries", icon: "Package" },
  { title: "15+", subtitle: "Countries", icon: "Globe" },
];

type CategoryType = "services" | "insurance" | "travel";

const phoneToCountryCode: Record<string, string> = {
  "+1": "US", "+7": "RU", "+20": "EG", "+27": "ZA", "+30": "GR", "+31": "NL", "+32": "BE", "+33": "FR", "+34": "ES", "+39": "IT", "+41": "CH", "+43": "AT", "+44": "GB", "+48": "PL", "+49": "DE", "+52": "MX", "+55": "BR", "+60": "MY", "+61": "AU", "+62": "ID", "+63": "PH", "+64": "NZ", "+65": "SG", "+66": "TH", "+81": "JP", "+82": "KR", "+84": "VN", "+86": "CN", "+90": "TR", "+91": "IN", "+92": "PK", "+93": "AF", "+94": "LK", "+95": "MM", "+98": "IR", "+211": "SS", "+212": "MA", "+213": "DZ", "+216": "TN", "+218": "LY", "+220": "GM", "+221": "SN", "+223": "ML", "+224": "GN", "+225": "CI", "+226": "BF", "+227": "NE", "+228": "TG", "+229": "BJ", "+230": "MU", "+231": "LR", "+232": "SL", "+233": "GH", "+234": "NG", "+235": "TD", "+236": "CF", "+237": "CM", "+238": "CV", "+239": "ST", "+240": "GQ", "+241": "GA", "+242": "CG", "+244": "AO", "+245": "GW", "+248": "SC", "+249": "SD", "+250": "RW", "+251": "ET", "+252": "SO", "+253": "DJ", "+254": "KE", "+255": "TZ", "+256": "UG", "+257": "BI", "+258": "MZ", "+260": "ZM", "+261": "MG", "+262": "RE", "+263": "ZW", "+264": "NA", "+265": "MW", "+266": "LS", "+267": "BW", "+268": "SZ", "+269": "KM", "+290": "SH", "+291": "ER", "+297": "AW", "+298": "FO", "+299": "GL", "+351": "PT", "+352": "LU", "+353": "IE", "+354": "IS", "+356": "MT", "+371": "LV", "+372": "EE", "+380": "UA", "+420": "CZ", "+963": "SY", "+966": "SA", "+971": "AE", "+972": "IL", "+974": "QA", "+977": "NP", "+998": "UZ",
};

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });

const QuoteSection = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("services");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", middleName: "", surname: "", countryCode: "+254", phone: "", email: "", service: "", details: ""
  });

  const { items: sectionItems } = useSiteContent("quote_section");
  const { items: statItems } = useSiteContent("quote_stat", defaultStats);

  const section = sectionItems[0];
  const badge = section?.subtitle || "Request a Quote";
  const heading = section?.title || "Get Instant Pricing for Your Shipment, Insurance & Travel Service";
  const description = section?.description || "Select from our Services, Insurance, or Travel Services categories and fill out the quick quote form. Our team will provide you with a competitive quote tailored to your needs within 24 hours.";

  const stats = statItems.map(s => ({
    icon: getIcon(s.icon),
    value: s.title || "",
    label: s.subtitle || "",
  }));

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.middleName || !formData.surname || !formData.countryCode || !formData.phone || !formData.email || !formData.service || !formData.details) {
      toast.error("Please complete every field before requesting a quote.");
      return;
    }

    setLoading(true);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/send-inquiry-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          type: "quote",
          category: activeCategory,
          name: [formData.firstName, formData.middleName, formData.surname].join(" "),
          email: formData.email,
          phone: `${formData.countryCode}${formData.phone}`,
          service: formData.service,
          message: formData.details,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        const message = errorBody.includes("NOT_FOUND")
          ? "The email function is not deployed in Supabase yet. Please deploy send-inquiry-email first."
          : "Failed to send quote request";
        throw new Error(message);
      }
      
      toast.success("Quote request sent to sales@mapettlogistics.com!");
      setFormData({ firstName: "", middleName: "", surname: "", countryCode: "+254", phone: "", email: "", service: "", details: "" });
    } catch (error) {
      console.error(error);
      const message = error instanceof Error && error.message
        ? error.message
        : "Failed to send. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const categories: { id: CategoryType; label: string }[] = [
    { id: "services", label: "Services" },
    { id: "insurance", label: "Insurance" },
    { id: "travel", label: "Travel Services" },
  ];

  const renderNameFields = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label className="text-sm font-medium text-foreground">First Name</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleFormChange} placeholder="First name" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Middle Name</label>
        <input type="text" name="middleName" value={formData.middleName} onChange={handleFormChange} placeholder="Middle name" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required />
      </div>
      <div>
        <label className="text-sm font-medium text-foreground">Surname</label>
        <input type="text" name="surname" value={formData.surname} onChange={handleFormChange} placeholder="Surname" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required />
      </div>
    </div>
  );

  const renderPhoneField = () => {
    const countryCode = phoneToCountryCode[formData.countryCode] || "KE";
    return (
      <div>
        <label className="text-sm font-medium text-foreground">Phone Number</label>
        <div className="mt-1 flex h-12 items-center overflow-hidden rounded-lg border border-border bg-background">
          <img src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`} alt={countryCode} className="mx-3 h-4 w-[22px] rounded-sm object-cover" />
          <select name="countryCode" value={formData.countryCode} onChange={handleFormChange} required className="h-full w-36 shrink-0 border-0 border-l border-border bg-transparent px-2 text-sm focus:outline-none focus:ring-0">
            {Object.entries(phoneToCountryCode).map(([code, region]) => <option key={code} value={code}>{countryNames.of(region)} ({code})</option>)}
          </select>
          <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="700 000 000" required className="h-full min-w-0 flex-1 border-l border-border bg-transparent px-3 focus:outline-none" />
        </div>
      </div>
    );
  };

  const renderServicesForm = () => (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {renderNameFields()}

      <div className="grid grid-cols-2 gap-4">
        {renderPhoneField()}
        <div>
          <label className="text-sm font-medium text-foreground">Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="your@email.com" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Service Type</label>
        <select name="service" value={formData.service} onChange={handleFormChange} required className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
          <option value="">Select a logistics service</option>
          <option>Air Freight</option>
          <option>Ocean Freight</option>
          <option>Road & Rail Transport</option>
          <option>Warehousing</option>
          <option>Customs Clearing & Forwarding</option>
          <option>Refrigerated Cargo</option>
          <option>Special Cargo</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Shipment Details</label>
        <textarea name="details" value={formData.details} onChange={handleFormChange} rows={2} placeholder="Describe cargo type, weight, dimensions, special handling requirements..." required className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
      </div>

      <Button 
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary via-pink-500 to-accent text-primary-foreground py-6 text-lg font-semibold rounded-xl shadow-[0_0_30px_rgba(219,39,119,0.3)] hover:shadow-[0_0_40px_rgba(219,39,119,0.5)] transition-all duration-300 group"
      >
        <span className="flex items-center justify-center gap-2">
          {loading ? "Sending..." : "Get Logistics Quote"}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </Button>
    </form>
  );

  const renderInsuranceForm = () => (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {renderNameFields()}

      <div className="grid grid-cols-2 gap-4">
        {renderPhoneField()}
        <div>
          <label className="text-sm font-medium text-foreground">Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="your@email.com" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Insurance Type</label>
        <select name="service" value={formData.service} onChange={handleFormChange} required className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
          <option value="">Select an insurance type</option>
          <option>Marine Cargo Insurance</option>
          <option>Air Cargo Insurance</option>
          <option>Inland Transit Insurance</option>
          <option>Freight Forwarder Liability</option>
          <option>Warehouse Insurance</option>
          <option>Life Insurance</option>
          <option>WIBA & Employees Coverage</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Coverage Requirements</label>
        <textarea name="details" value={formData.details} onChange={handleFormChange} rows={2} placeholder="Coverage needs, special requirements, coverage period..." required className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
      </div>

      <Button 
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary via-pink-500 to-accent text-primary-foreground py-6 text-lg font-semibold rounded-xl shadow-[0_0_30px_rgba(219,39,119,0.3)] hover:shadow-[0_0_40px_rgba(219,39,119,0.5)] transition-all duration-300 group"
      >
        <span className="flex items-center justify-center gap-2">
          {loading ? "Sending..." : "Get Insurance Quote"}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </Button>
    </form>
  );

  const renderTravelForm = () => (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {renderNameFields()}
      <div className="grid grid-cols-2 gap-4">
        {renderPhoneField()}
        <div>
          <label className="text-sm font-medium text-foreground">Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="your@email.com" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" required />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Travel Service</label>
        <select name="service" value={formData.service} onChange={handleFormChange} required className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
          <option value="">Select a travel service</option>
          <option>Air Tickets</option>
          <option>Hotel Booking</option>
          <option>Visa Processing</option>
          <option>Tours & Safari Packages</option>
          <option>Airport Transfers</option>
          <option>Travel Insurance</option>
          <option>Travel Essentials</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Travel Details</label>
        <textarea name="details" value={formData.details} onChange={handleFormChange} rows={2} placeholder="Travel dates, destination, number of travelers, preferences..." required className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
      </div>

      <Button 
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-primary via-pink-500 to-accent text-primary-foreground py-6 text-lg font-semibold rounded-xl shadow-[0_0_30px_rgba(219,39,119,0.3)] hover:shadow-[0_0_40px_rgba(219,39,119,0.5)] transition-all duration-300 group"
      >
        <span className="flex items-center justify-center gap-2">
          {loading ? "Sending..." : "Get Travel Quote"}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </Button>
    </form>
  );

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              {badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{heading}</h2>
            <p className="text-muted-foreground text-lg mb-8">{description}</p>

            <div className="flex gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-background rounded-2xl p-8 shadow-xl border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Quick Quote</h3>
                  <p className="text-muted-foreground text-sm">Get pricing in minutes</p>
                </div>
              </div>

              {/* Category Tabs */}
              <div className="flex gap-3 mb-6 border-b border-border">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-3 font-medium text-sm transition-all border-b-2 ${
                      activeCategory === category.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Forms for each category */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                key={activeCategory}
              >
                {activeCategory === "services" && renderServicesForm()}
                {activeCategory === "insurance" && renderInsuranceForm()}
                {activeCategory === "travel" && renderTravelForm()}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
