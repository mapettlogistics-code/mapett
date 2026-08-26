import { motion } from "framer-motion";
import { Truck } from "lucide-react";

const TrackShipmentButton = () => {
  return (
    <motion.a
      href="/track"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center gap-2 hover:bg-primary/90 transition-colors px-4 py-3"
      aria-label="Track Shipment"
    >
      <Truck className="h-5 w-5" />
      <span className="text-sm font-semibold">Track</span>
    </motion.a>
  );
};

export default TrackShipmentButton;