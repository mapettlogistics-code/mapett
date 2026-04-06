import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Search, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ProductSourcingForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    company: "",
    sourcingCountry: "",
    productDescription: "",
    quantity: "",
    budget: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fullName = [formData.salutation, formData.firstName, formData.surname].filter(Boolean).join(" ");
      const whatsappMessage = `Product Sourcing Inquiry\n\nName: ${fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\nSourcing Country: ${formData.sourcingCountry}\nProduct: ${formData.productDescription}\nQuantity: ${formData.quantity}\nBudget: ${formData.budget}\nDetails: ${formData.details}`;
      
      window.open(
        `https://wa.me/254799390133?text=${encodeURIComponent(whatsappMessage)}`,
        "_blank"
      );

      toast.success("Inquiry sent! Our sourcing team will contact you shortly.");
      onClose();
      setFormData({
        salutation: "", firstName: "", surname: "", email: "", phone: "",
        company: "", sourcingCountry: "", productDescription: "", quantity: "", budget: "", details: "",
      });
    } catch (error) {
      toast.error("Failed to submit inquiry. Please try again.");
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
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl hero-gradient flex items-center justify-center">
                  <Search className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Product Sourcing</h3>
                  <p className="text-muted-foreground text-sm">Tell us what you need sourced</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Salutation</label>
                  <select value={formData.salutation} onChange={(e) => setFormData({ ...formData, salutation: e.target.value })} className="mt-1 w-full px-3 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm">
                    <option value="">--</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">First Name *</label>
                  <input type="text" required value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} placeholder="First name" className="mt-1 w-full px-3 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Surname *</label>
                  <input type="text" required value={formData.surname} onChange={(e) => setFormData({ ...formData, surname: e.target.value })} placeholder="Surname" className="mt-1 w-full px-3 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Email *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@company.com" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Phone *</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+254 700 000 000" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Company</label>
                <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Company name" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Sourcing Country *</label>
                <select required value={formData.sourcingCountry} onChange={(e) => setFormData({ ...formData, sourcingCountry: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">Select country</option>
                  <option value="China">China</option>
                  <option value="Turkey">Turkey</option>
                  <option value="India">India</option>
                  <option value="UAE">UAE (Dubai)</option>
                  <option value="Japan">Japan</option>
                  <option value="South Korea">South Korea</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Product Description *</label>
                <textarea required value={formData.productDescription} onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })} placeholder="Describe the product(s) you need sourced" rows={3} className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Quantity</label>
                  <input type="text" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} placeholder="e.g. 500 units" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Budget (KES)</label>
                  <input type="text" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} placeholder="e.g. 500,000" className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Additional Details</label>
                <textarea value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} placeholder="Any specific requirements, quality standards, certifications needed, etc." rows={3} className="mt-1 w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full hero-gradient text-primary-foreground py-6 text-lg font-semibold rounded-xl shadow-glow hover:opacity-90 transition-all"
              >
                {isSubmitting ? "Submitting..." : (
                  <span className="flex items-center justify-center gap-2">
                    Submit Sourcing Inquiry
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Our sourcing team will review your inquiry and provide options with pricing within 48 hours.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductSourcingForm;
