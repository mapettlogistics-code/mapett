import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Truck, Package, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";
import * as LucideIcons from "lucide-react";

const getIcon = (name: string | null) => {
  if (!name) return Package;
  return (LucideIcons as any)[name] || Package;
};

const defaultStats = [
  { title: "10+", subtitle: "Years Experience", icon: "Truck" },
  { title: "50K+", subtitle: "Deliveries", icon: "Package" },
  { title: "15+", subtitle: "Countries", icon: "Globe" },
];

type CategoryType = "services" | "insurance" | "travel";

const QuoteSection = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("services");
  const { items: sectionItems } = useSiteContent("quote_section");
  const { items: statItems } = useSiteContent("quote_stat", defaultStats as any);

  const section = sectionItems[0];
  const badge = section?.subtitle || "Request a Quote";
  const heading = section?.title || "Get Instant Pricing for Your Shipment, Insurance & Travel Service";
  const description = section?.description || "Select from our Services, Insurance, or Travel Services categories and fill out the quick quote form. Our team will provide you with a competitive quote tailored to your needs within 24 hours.";

  const stats = statItems.map(s => ({
    icon: getIcon(s.icon),
    value: s.title || "",
    label: s.subtitle || "",
  }));

  const categories: { id: CategoryType; label: string }[] = [
    { id: "services", label: "Services" },
    { id: "insurance", label: "Insurance" },
    { id: "travel", label: "Travel Services" },
  ];

  const renderServicesForm = () => (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">Contact Person Name</label>
          <input type="text" placeholder="Full name" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Company Name</label>
          <input type="text" placeholder="Company name" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <input type="tel" placeholder="+254 700 000 000" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Email Address</label>
          <input type="email" placeholder="your@email.com" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Service Type</label>
        <select className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
          <option value="">Select a logistics service</option>
          <option>Air Freight</option>
          <option>Ocean Freight</option>
          <option>Road & Rail Transport</option>
          <option>Warehousing</option>
          <option>Customs Clearing & Forwarding</option>
          <option>Refrigerated Cargo</option>
          <option>Special Cargo</option>
          <option>Intermodal Solutions</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Origin & Destination</label>
        <input type="text" placeholder="e.g. Mombasa to Nairobi" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Shipment Details</label>
        <textarea rows={2} placeholder="Describe cargo type, weight, dimensions, special handling requirements..." className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
      </div>

      <Button 
        type="submit"
        className="w-full bg-gradient-to-r from-primary via-pink-500 to-accent text-primary-foreground py-6 text-lg font-semibold rounded-xl shadow-[0_0_30px_rgba(219,39,119,0.3)] hover:shadow-[0_0_40px_rgba(219,39,119,0.5)] transition-all duration-300 group"
      >
        <span className="flex items-center justify-center gap-2">
          Get Logistics Quote
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </Button>
    </form>
  );

  const renderInsuranceForm = () => (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">Contact Person Name</label>
          <input type="text" placeholder="Full name" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Company Name</label>
          <input type="text" placeholder="Company name" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <input type="tel" placeholder="+254 700 000 000" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Email Address</label>
          <input type="email" placeholder="your@email.com" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Insurance Type</label>
        <select className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
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
        <label className="text-sm font-medium text-foreground">Cargo/Coverage Details</label>
        <input type="text" placeholder="Cargo type and estimated value" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Coverage Requirements</label>
        <textarea rows={2} placeholder="Coverage needs, special requirements, coverage period..." className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
      </div>

      <Button 
        type="submit"
        className="w-full bg-gradient-to-r from-primary via-pink-500 to-accent text-primary-foreground py-6 text-lg font-semibold rounded-xl shadow-[0_0_30px_rgba(219,39,119,0.3)] hover:shadow-[0_0_40px_rgba(219,39,119,0.5)] transition-all duration-300 group"
      >
        <span className="flex items-center justify-center gap-2">
          Get Insurance Quote
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </Button>
    </form>
  );

  const renderTravelForm = () => (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <input type="text" placeholder="Your name" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Email Address</label>
          <input type="email" placeholder="your@email.com" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <input type="tel" placeholder="+254 700 000 000" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Travel Service</label>
          <select className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">Travel Dates</label>
          <input type="text" placeholder="e.g. 15 Dec - 22 Dec 2024" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Destination</label>
          <input type="text" placeholder="Where would you like to travel?" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Travel Details</label>
        <textarea rows={2} placeholder="Number of travelers, preferences, special requirements..." className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
      </div>

      <Button 
        type="submit"
        className="w-full bg-gradient-to-r from-primary via-pink-500 to-accent text-primary-foreground py-6 text-lg font-semibold rounded-xl shadow-[0_0_30px_rgba(219,39,119,0.3)] hover:shadow-[0_0_40px_rgba(219,39,119,0.5)] transition-all duration-300 group"
      >
        <span className="flex items-center justify-center gap-2">
          Get Travel Quote
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
      </Button>
    </form>
  );

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
