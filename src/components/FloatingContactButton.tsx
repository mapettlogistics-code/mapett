import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";

const FloatingContactButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="mailto:info@mapettlogistics.com"
      className="fixed bottom-32 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground rounded-full shadow-[0_0_20px_rgba(219,39,119,0.3)] hover:shadow-[0_0_30px_rgba(219,39,119,0.5)] transition-shadow duration-300 px-4 py-3"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, y: [0, -4, 0] }}
      transition={{ 
        scale: { duration: 0.3 },
        y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Contact us via email"
    >
      <Mail className="w-5 h-5" />
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-semibold whitespace-nowrap overflow-hidden"
          >
            Contact Us
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

export default FloatingContactButton;
