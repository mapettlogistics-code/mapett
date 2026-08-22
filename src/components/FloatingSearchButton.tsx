import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const FloatingSearchButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="mb-3 flex items-center gap-2 bg-card border border-border rounded-full shadow-lg p-1 pr-2"
          >
            <Input
              type="search"
              placeholder="Search services, products..."
              className="h-10 w-64 text-sm border-none focus-visible:ring-0"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Close search"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center w-14 h-14"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          aria-label="Search"
        >
          <Search className="h-6 w-6" />
        </motion.button>
      )}
    </div>
  );
};

export default FloatingSearchButton;