import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Ship, Car, Briefcase, 
  Users, Plane, Building2, Package, Truck, ArrowRight, 
  CheckCircle2, X, Calculator
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Import insurance images
import insuranceMarineImg from "@/assets/insurance-marine.jpg";
import insuranceAirImg from "@/assets/insurance-air.jpg";
import insuranceInlandImg from "@/assets/insurance-inland.jpg";
import insuranceFreightImg from "@/assets/insurance-freight.jpg";
import insuranceMotorImg from "@/assets/insurance-motor.jpg";
import insuranceWarehouseImg from "@/assets/insurance-warehouse.jpg";
import insuranceBusinessImg from "@/assets/insurance-business.jpg";
import insuranceLifeImg from "@/assets/insurance-life.jpg";
import insuranceAccidentImg from "@/assets/insurance-accident.jpg";

const insuranceTypes = [
  {
    icon: Ship,
    title: "Marine Cargo Insurance",
    description: "Comprehensive protection for goods in transit by sea, covering loss or damage during shipping.",
    coverage: ["All Risk Cover", "War & Strikes", "General Average", "Warehouse to Warehouse"],
    baseRate: 0.15,
    image: insuranceMarineImg,
  },
  {
    icon: Plane,
    title: "Air Cargo Insurance",
    description: "Coverage for goods transported by air, protecting against damage, loss, and delays.",
    coverage: ["Transit Coverage", "Loading/Unloading", "Customs Storage", "Door to Door"],
    baseRate: 0.12,
    image: insuranceAirImg,
  },
  {
    icon: Truck,
    title: "Inland Transit Insurance",
    description: "Protection for goods transported by road or rail within the country.",
    coverage: ["Road Accidents", "Theft Protection", "Fire Damage", "Natural Disasters"],
    baseRate: 0.10,
    image: insuranceInlandImg,
  },
  {
    icon: Package,
    title: "Freight Forwarder Liability",
    description: "Coverage for freight forwarders against claims from cargo owners.",
    coverage: ["Errors & Omissions", "Vicarious Liability", "Customs Bonds", "Professional Indemnity"],
    baseRate: 0.20,
    image: insuranceFreightImg,
  },
  {
    icon: Car,
    title: "Motor Vehicle Insurance",
    description: "Comprehensive and third-party coverage for commercial fleet vehicles.",
    coverage: ["Third Party Liability", "Comprehensive Cover", "Passenger Liability", "Windscreen Cover"],
    baseRate: 0.04,
    image: insuranceMotorImg,
  },
  {
    icon: Building2,
    title: "Warehouse Insurance",
    description: "Coverage for goods stored in warehouses against various risks.",
    coverage: ["Stock Coverage", "Equipment Protection", "Theft & Burglary", "Water Damage"],
    baseRate: 0.07,
    image: insuranceWarehouseImg,
  },
  {
    icon: Users,
    title: "Group Life Insurance",
    description: "Life insurance coverage for employees and their dependents.",
    coverage: ["Death Benefit", "Disability Cover", "Critical Illness", "Funeral Expenses"],
    baseRate: 0.02,
    image: insuranceLifeImg,
  },
  {
    icon: Shield,
    title: "WIBA & Employees Liability",
    description: "Work Injury Benefits Act coverage and employer liability protection for workplace injuries and occupational diseases.",
    coverage: ["Work Injury Benefits", "Employer Liability", "Occupational Diseases", "Compensation Cover"],
    baseRate: 0.03,
    image: insuranceAccidentImg,
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
      className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover border border-border/50 hover:border-primary/30 transition-all duration-300"
    >
      {/* Banner Image */}
      <div className="relative h-28 overflow-hidden">
        <img
          src={insurance.image}
          alt={insurance.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <div className="absolute bottom-2 left-3">
          <div className="w-9 h-9 rounded-lg hero-gradient flex items-center justify-center shadow-lg">
            <IconComponent className="h-4 w-4 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base font-bold text-foreground mb-1.5">{insurance.title}</h3>
        <p className="text-muted-foreground text-sm mb-2.5 line-clamp-2">{insurance.description}</p>
        
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
      </div>
    </motion.div>
  );
};

// Premium Calculator Component
const PremiumCalculator = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedType, setSelectedType] = useState("");
  const [cargoValue, setCargoValue] = useState("");
  const [estimatedPremium, setEstimatedPremium] = useState<number | null>(null);

  const calculatePremium = () => {
    const insurance = insuranceTypes.find(t => t.title === selectedType);
    const value = parseFloat(cargoValue.replace(/,/g, ""));
    
    if (insurance && !isNaN(value) && value > 0) {
      const premium = value * (insurance.baseRate / 100);
      setEstimatedPremium(premium);
    } else {
      setEstimatedPremium(null);
    }
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
            className="bg-background rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Premium Calculator</h3>
                  <p className="text-muted-foreground text-sm">Estimate your insurance cost</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Insurance Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setEstimatedPremium(null);
                  }}
                  className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="">Select type</option>
                  {insuranceTypes.map((type) => (
                    <option key={type.title} value={type.title}>
                      {type.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Value to Insure (KES)</label>
                <input
                  type="text"
                  value={cargoValue}
                  onChange={(e) => {
                    setCargoValue(e.target.value);
                    setEstimatedPremium(null);
                  }}
                  placeholder="e.g., 5,000,000"
                  className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <Button 
                onClick={calculatePremium}
                disabled={!selectedType || !cargoValue}
                className="w-full bg-gradient-to-r from-primary via-pink-500 to-accent text-primary-foreground py-4 font-semibold rounded-xl"
              >
                Calculate Premium
              </Button>

              {estimatedPremium !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-primary/10 rounded-xl border border-primary/20"
                >
                  <p className="text-sm text-muted-foreground mb-1">Estimated Annual Premium</p>
                  <p className="text-3xl font-bold text-primary">
                    KES {estimatedPremium.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    *This is an estimate. Final premium may vary based on risk assessment.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const InsuranceForm = ({ isOpen, onClose, selectedType }: { 
  isOpen: boolean; 
  onClose: () => void;
  selectedType: string;
}) => {
  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    middleName: "",
    surname: "",
    email: "",
    phone: "",
    company: "",
    insuranceType: selectedType,
    physicalAddress: "",
    idPassportDl: "",
    profession: "",
    natureOfBusiness: "",
    pinRegCert: "",
    cargoValue: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update insurance type when selectedType prop changes
  useState(() => {
    if (selectedType) {
      setFormData(prev => ({ ...prev, insuranceType: selectedType }));
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const fullName = [formData.salutation, formData.firstName, formData.middleName, formData.surname].filter(Boolean).join(" ");
      const { error } = await supabase
        .from('insurance_applications')
        .insert({
          full_name: fullName,
          salutation: formData.salutation.trim() || null,
          first_name: formData.firstName.trim() || null,
          middle_name: formData.middleName.trim() || null,
          surname: formData.surname.trim() || null,
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: formData.company.trim() || null,
          insurance_type: formData.insuranceType,
          physical_address: formData.physicalAddress.trim() || null,
          id_passport_dl: formData.idPassportDl.trim() || null,
          profession: formData.profession.trim() || null,
          nature_of_business: formData.natureOfBusiness.trim() || null,
          pin_reg_cert: formData.pinRegCert.trim() || null,
          cargo_value: formData.cargoValue.trim() || null,
          details: formData.details.trim() || null,
        });

      if (error) throw error;

      toast.success("Application submitted successfully! Our team will contact you within 24 hours.");
      onClose();
      setFormData({
        salutation: "",
        firstName: "",
        middleName: "",
        surname: "",
        email: "",
        phone: "",
        company: "",
        insuranceType: "",
        physicalAddress: "",
        idPassportDl: "",
        profession: "",
        natureOfBusiness: "",
        pinRegCert: "",
        cargoValue: "",
        details: "",
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
              {/* Name Fields */}
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Salutation</label>
                  <select
                    value={formData.salutation}
                    onChange={(e) => setFormData({ ...formData, salutation: e.target.value })}
                    className="mt-1 w-full px-3 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                  >
                    <option value="">--</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">First Name *</label>
                  <input type="text" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} placeholder="First" className="mt-1 w-full px-3 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Middle Name</label>
                  <input type="text" value={formData.middleName} onChange={(e) => setFormData({ ...formData, middleName: e.target.value })} placeholder="Middle" className="mt-1 w-full px-3 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Surname *</label>
                  <input type="text" required value={formData.surname} onChange={(e) => setFormData({ ...formData, surname: e.target.value })} placeholder="Surname" className="mt-1 w-full px-3 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Email Address *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@company.com" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Phone Number *</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+254 700 000 000" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Insurance Policy *</label>
                <select required value={formData.insuranceType} onChange={(e) => setFormData({ ...formData, insuranceType: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                  <option value="">Select insurance policy</option>
                  {insuranceTypes.map((type) => (
                    <option key={type.title} value={type.title}>{type.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Physical Address</label>
                <textarea value={formData.physicalAddress} onChange={(e) => setFormData({ ...formData, physicalAddress: e.target.value })} placeholder="Enter your physical address" rows={2} className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">ID / Passport / DL</label>
                  <input type="text" value={formData.idPassportDl} onChange={(e) => setFormData({ ...formData, idPassportDl: e.target.value })} placeholder="ID number" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Profession</label>
                  <input type="text" value={formData.profession} onChange={(e) => setFormData({ ...formData, profession: e.target.value })} placeholder="Your profession" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Business / Company</label>
                  <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Company name" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Nature of Business</label>
                  <input type="text" value={formData.natureOfBusiness} onChange={(e) => setFormData({ ...formData, natureOfBusiness: e.target.value })} placeholder="e.g. Import/Export" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">PIN No / Reg Cert</label>
                  <input type="text" value={formData.pinRegCert} onChange={(e) => setFormData({ ...formData, pinRegCert: e.target.value })} placeholder="KRA PIN or Reg Cert" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Insured Amount (KES)</label>
                  <input type="text" value={formData.cargoValue} onChange={(e) => setFormData({ ...formData, cargoValue: e.target.value })} placeholder="e.g., 5,000,000" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Additional Details</label>
                <textarea value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} placeholder="Any additional information about your insurance needs" rows={3} className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
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
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
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

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button 
            onClick={() => handleApply("")}
            size="lg"
            className="bg-gradient-to-r from-primary via-pink-500 to-accent text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-[0_0_30px_rgba(219,39,119,0.3)] hover:shadow-[0_0_40px_rgba(219,39,119,0.5)] transition-all duration-300"
          >
            Get Insurance Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            onClick={() => setIsCalculatorOpen(true)}
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Premium Calculator
          </Button>
        </motion.div>
      </div>

      {/* Insurance Form Modal */}
      <InsuranceForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        selectedType={selectedType}
      />

      {/* Premium Calculator Modal */}
      <PremiumCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </section>
  );
};

export default Insurance;
