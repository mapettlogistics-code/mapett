import { motion } from "framer-motion";
import { Facebook, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

const TikTokSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const SocialSidebar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socials = [
    { icon: Facebook, href: "https://www.facebook.com/mapetttravelandlogistics/", label: "Facebook", brandColor: "#1877F2" },
    { icon: Instagram, href: "https://www.instagram.com/mapetttravelandlogistics/", label: "Instagram", brandColor: "#E4405F" },
    { icon: TikTokSvg, href: "https://www.tiktok.com/@mapetttravelandlogistics", label: "TikTok", brandColor: "#000000" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2 bg-card/90 backdrop-blur-sm rounded-r-xl shadow-card border border-l-0 border-border p-2"
    >
      {socials.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-opacity hover:opacity-80 group"
          style={{ backgroundColor: social.brandColor }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -10 }}
          transition={{ delay: index * 0.05 }}
          title={social.label}
        >
          <social.icon />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialSidebar;