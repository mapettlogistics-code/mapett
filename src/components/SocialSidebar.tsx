import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { useEffect, useState } from "react";

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
    { icon: Facebook, href: "https://web.facebook.com/profile.php?id=61584459897045", label: "Facebook", isSvg: false, brandColor: "#1877F2" },
    { icon: Instagram, href: "https://www.instagram.com/mapettlogisticsltd/", label: "Instagram", isSvg: false, brandColor: "#E4405F" },
    { icon: Youtube, href: "https://www.youtube.com/@MapettLogisticsLtd", label: "YouTube", isSvg: false, brandColor: "#FF0000" },
    { icon: null, href: "https://www.tiktok.com/@mapettlogisticsltd", label: "TikTok", isSvg: "tiktok", brandColor: "#000000" },
    { icon: null, href: "https://www.pinterest.com/MapetteLogisticsLtd/", label: "Pinterest", isSvg: "pinterest", brandColor: "#E60023" },
    { icon: null, href: "https://www.linkedin.com/company/mapettlogisticsltd/", label: "LinkedIn", isSvg: "linkedin", brandColor: "#0A66C2" },
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
          {social.isSvg === "tiktok" ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          ) : social.isSvg === "pinterest" ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.93s-.35-.71-.35-1.77c0-1.66.96-2.9 2.16-2.9 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-1 3.99-.28 1.2.6 2.17 1.78 2.17 2.14 0 3.79-2.26 3.79-5.52 0-2.88-2.07-4.9-5.03-4.9-3.42 0-5.43 2.57-5.43 5.22 0 1.04.4 2.15.9 2.75.1.12.11.22.08.34l-.34 1.36c-.05.22-.18.27-.41.16-1.52-.71-2.48-2.92-2.48-4.7 0-3.82 2.78-7.33 8.02-7.33 4.21 0 7.48 3 7.48 7.01 0 4.18-2.64 7.55-6.3 7.55-1.23 0-2.39-.64-2.79-1.4l-.76 2.89c-.27 1.06-1.01 2.4-1.5 3.21A12 12 0 1 0 12 0z"/>
            </svg>
          ) : social.isSvg === "linkedin" ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect width="4" height="12" x="2" y="9"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          ) : social.icon ? (
            <social.icon className="h-5 w-5" />
          ) : null}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialSidebar;
