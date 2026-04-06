import { motion } from "framer-motion";
import { ArrowRight, MapPin, Truck, Package, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuoteSection = () => {
  const stats = [
    { icon: Truck, value: "10+", label: "Years Experience" },
    { icon: Package, value: "50K+", label: "Deliveries" },
    { icon: Globe, value: "15+", label: "Countries" },
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Info & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Request a Quote
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Instant Pricing for Your Shipment
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Fill out the form and our team will provide you with a competitive quote within 24 hours. From Mombasa Port to your doorstep.
            </p>

            {/* Stats */}
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

          {/* Right - Quote Form */}
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
              
              <form className="space-y-4">
                {/* Contact Person & Company */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Contact Person Name</label>
                    <input
                      type="text"
                      placeholder="Full name"
                      className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Company Name</label>
                    <input
                      type="text"
                      placeholder="Company name"
                      className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+254 700 000 000"
                      className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email Address</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                {/* Service/Product Dropdown */}
                <div>
                  <label className="text-sm font-medium text-foreground">Service / Product</label>
                  <select className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                    <option value="">Select a service or product</option>
                    <optgroup label="Logistics Services">
                      <option>Air Freight</option>
                      <option>Ocean Freight</option>
                      <option>Road & Rail Transport</option>
                      <option>Warehousing</option>
                      <option>Customs Clearance</option>
                      <option>Refrigerated Cargo</option>
                      <option>Special Cargo</option>
                      <option>Intermodal Solutions</option>
                    </optgroup>
                    <optgroup label="Insurance">
                      <option>Marine Insurance</option>
                      <option>Cargo Insurance</option>
                      <option>Motor Insurance</option>
                      <option>Fire & Burglary Insurance</option>
                      <option>Life Insurance</option>
                      <option>Health Insurance</option>
                      <option>Property Insurance</option>
                      <option>Business Insurance</option>
                    </optgroup>
                    <optgroup label="Marketplace">
                      <option>Tires</option>
                      <option>Batteries</option>
                      <option>Lubricants</option>
                      <option>Industrial Supplies</option>
                      <option>Accessories</option>
                    </optgroup>
                  </select>
                </div>

                {/* Container / BL Number */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Container No.</label>
                    <input
                      type="text"
                      placeholder="e.g. MSKU1234567"
                      className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">BL No.</label>
                    <input
                      type="text"
                      placeholder="Bill of Lading number"
                      className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                {/* Free Text Area */}
                <div>
                  <label className="text-sm font-medium text-foreground">Additional Details</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your requirements, cargo details, special instructions..."
                    className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary via-pink-500 to-accent text-primary-foreground py-6 text-lg font-semibold rounded-xl shadow-[0_0_30px_rgba(219,39,119,0.3)] hover:shadow-[0_0_40px_rgba(219,39,119,0.5)] transition-all duration-300 group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Get Instant Quote
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
