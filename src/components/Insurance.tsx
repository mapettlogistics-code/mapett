import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Heart, Flame, Ship, Car, Home, Briefcase, 
  Users, Plane, Building2, Package, Truck, ArrowRight, 
  CheckCircle2, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const insuranceTypes = [
  {
    icon: Ship,
    title: "Marine Cargo Insurance",
    description: "Comprehensive protection for goods in transit by sea, covering loss or damage during shipping.",
    coverage: ["All Risk Cover", "War & Strikes", "General Average", "Warehouse to Warehouse"],
  },
  {
    icon: Plane,
    title: "Air Cargo Insurance",
    description: "Coverage for goods transported by air, protecting against damage, loss, and delays.",
    coverage: ["Transit Coverage", "Loading/Unloading", "Customs Storage", "Door to Door"],
  },
  {
    icon: Truck,
    title: "Inland Transit Insurance",
    description: "Protection for goods transported by road or rail within the country.",
    coverage: ["Road Accidents", "Theft Protection", "Fire Damage", "Natural Disasters"],
  },
  {
    icon: Package,
    title: "Freight Forwarder Liability",
    description: "Coverage for freight forwarders against claims from cargo owners.",
    coverage: ["Errors & Omissions", "Vicarious Liability", "Customs Bonds", "Professional Indemnity"],
  },
  {
    icon: Home,
    title: "Property Insurance",
    description: "Comprehensive coverage for buildings, equipment, and business assets.",
    coverage: ["Fire & Lightning", "Burglary", "Natural Perils", "Business Interruption"],
  },
  {
    icon: Flame,
    title: "Fire Insurance",
    description: "Protection against fire damage to commercial and industrial properties.",
    coverage: ["Fire Damage", "Smoke Damage", "Firefighting Damage", "Temporary Relocation"],
  },
  {
    icon: Car,
    title: "Motor Vehicle Insurance",
    description: "Comprehensive and third-party coverage for commercial fleet vehicles.",
    coverage: ["Third Party Liability", "Comprehensive Cover", "Passenger Liability", "Windscreen Cover"],
  },
  {
    icon: Building2,
    title: "Warehouse Insurance",
    description: "Coverage for goods stored in warehouses against various risks.",
    coverage: ["Stock Coverage", "Equipment Protection", "Theft & Burglary", "Water Damage"],
  },
  {
    icon: Briefcase,
    title: "Business Insurance",
    description: "Tailored coverage for business operations and professional liability.",
    coverage: ["Public Liability", "Professional Indemnity", "Directors & Officers", "Cyber Liability"],
  },
  {
    icon: Users,
    title: "Group Life Insurance",
    description: "Life insurance coverage for employees and their dependents.",
    coverage: ["Death Benefit", "Disability Cover", "Critical Illness", "Funeral Expenses"],
  },
  {
    icon: Heart,
    title: "Health Insurance",
    description: "Comprehensive medical coverage for employees and families.",
    coverage: ["Inpatient Cover", "Outpatient Cover", "Dental & Optical", "Maternity Benefits"],
  },
  {
    icon: Shield,
    title: "Personal Accident Insurance",
    description: "Coverage for accidental injuries and death for individuals.",
    coverage: ["Accidental Death", "Permanent Disability", "Medical Expenses", "Weekly Benefits"],
  },
];

const InsuranceCard = ({ insurance, index, onApply }: { 
  insurance: typeof insuranceTypes[0]; 
  index: number;
  onApply: (type: string) => void;
}) => {
  const IconComponent = insurance.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover border border-border/50 hover:border-primary/30 transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-lg hero-gradient flex items-center justify-center mb-3">
        <IconComponent className="h-5 w-5 text-primary-foreground" />
      </div>

      <h3 className="text-base font-bold text-foreground mb-2">{insurance.title}</h3>
      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{insurance.description}</p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {insurance.coverage.slice(0, 2).map((item) => (
          <span
            key={item}
            className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground"
          >
            {item}
          </span>
        ))}
      </div>

      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => onApply(insurance.title)}
        className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto text-sm group/btn"
      >
        Apply Now
        <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
};

const InsuranceForm = ({ isOpen, onClose, selectedType }: { 
  isOpen: boolean; 
  onClose: () => void;
  selectedType: string;
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    insuranceType: selectedType,
    cargoValue: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Application submitted successfully! Our team will contact you within 24 hours.");
    setIsSubmitting(false);
    onClose();
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      insuranceType: "",
      cargoValue: "",
      details: "",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background rounded-2xl p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-foreground">Insurance Application</h3>
                <p className="text-muted-foreground text-sm">Fill out the form below to get a quote</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="John Doe"
                    className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+254 700 000 000"
                    className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@company.com"
                  className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Company Name</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Your Company Ltd"
                  className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Insurance Type *</label>
                <select
                  required
                  value={formData.insuranceType}
                  onChange={(e) => setFormData({ ...formData, insuranceType: e.target.value })}
                  className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="">Select insurance type</option>
                  {insuranceTypes.map((type) => (
                    <option key={type.title} value={type.title}>
                      {type.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Estimated Value (KES)</label>
                <input
                  type="text"
                  value={formData.cargoValue}
                  onChange={(e) => setFormData({ ...formData, cargoValue: e.target.value })}
                  placeholder="e.g., 5,000,000"
                  className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Additional Details</label>
                <textarea
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Describe your insurance needs, cargo type, destination, etc."
                  rows={3}
                  className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary via-pink-500 to-accent text-primary-foreground py-6 text-lg font-semibold rounded-xl shadow-[0_0_30px_rgba(219,39,119,0.3)] hover:shadow-[0_0_40px_rgba(219,39,119,0.5)] transition-all duration-300"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Submit Application
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Our insurance specialists will review your application and provide a customized quote within 24 hours.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Insurance = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const handleApply = (type: string) => {
    setSelectedType(type);
    setIsFormOpen(true);
  };

  return (
    <section id="insurance" className="py-20 bg-background">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Insurance Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Insurance Solutions
          </h2>
          <p className="text-muted-foreground text-lg">
            Protect your cargo, assets, and business with our wide range of insurance products tailored for the logistics industry.
          </p>
        </motion.div>

        {/* Insurance Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {insuranceTypes.map((insurance, index) => (
            <InsuranceCard 
              key={insurance.title} 
              insurance={insurance} 
              index={index}
              onApply={handleApply}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button 
            onClick={() => handleApply("")}
            size="lg"
            className="bg-gradient-to-r from-primary via-pink-500 to-accent text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-[0_0_30px_rgba(219,39,119,0.3)] hover:shadow-[0_0_40px_rgba(219,39,119,0.5)] transition-all duration-300"
          >
            Get Insurance Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Insurance Form Modal */}
      <InsuranceForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        selectedType={selectedType}
      />
    </section>
  );
};

export default Insurance;
