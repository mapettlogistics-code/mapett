import { Facebook, Link2, MessageCircle } from "lucide-react";
import { toast } from "sonner";

type ProductShareButtonsProps = {
  productName: string;
  productUrl: string;
};

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const ProductShareButtons = ({ productName, productUrl }: ProductShareButtonsProps) => {
  const shareText = `Check out ${productName} at Mapett Autostore & Lubricants!`;
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
    tiktok: `https://www.tiktok.com/share?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(shareText)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${productUrl}`)}`,
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(productUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => window.open(shareLinks.facebook, "_blank", "width=600,height=400")}
        className="w-7 h-7 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 flex items-center justify-center transition-colors"
        title="Share on Facebook"
      >
        <Facebook className="h-3.5 w-3.5 text-[#1877F2]" />
      </button>
      <button
        onClick={() => window.open(shareLinks.tiktok, "_blank", "width=600,height=400")}
        className="w-7 h-7 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
        title="Share on TikTok"
      >
        <TikTokIcon className="h-3.5 w-3.5 text-black" />
      </button>
      <button
        onClick={() => window.open(shareLinks.whatsapp, "_blank", "width=600,height=400")}
        className="w-7 h-7 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 flex items-center justify-center transition-colors"
        title="Share on WhatsApp"
      >
        <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
      </button>
      <button
        onClick={copyLink}
        className="w-7 h-7 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
        title="Copy link"
      >
        <Link2 className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
    </div>
  );
};

export default ProductShareButtons;
