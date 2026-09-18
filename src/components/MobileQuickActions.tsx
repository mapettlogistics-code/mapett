import { FileText, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import ContactDialog from "@/components/ContactDialog";
import QuoteSection from "@/components/QuoteSection";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const MobileQuickActions = () => (
  <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-3 md:hidden" aria-label="Quick actions">
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full hero-gradient text-primary-foreground shadow-glow"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Get a quote"
          title="Get Quote"
        >
          <FileText className="h-5 w-5" />
        </motion.button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto p-0">
        <DialogTitle className="sr-only">Request a Quote</DialogTitle>
        <QuoteSection />
      </DialogContent>
    </Dialog>

    <ContactDialog
      trigger={
        <motion.button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full hero-gradient text-primary-foreground shadow-glow"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Contact us"
          title="Contact Us"
        >
          <MessageCircle className="h-5 w-5" />
        </motion.button>
      }
    />
  </div>
);

export default MobileQuickActions;
