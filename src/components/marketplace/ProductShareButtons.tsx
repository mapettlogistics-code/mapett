import { Facebook, Twitter, Link2, MessageCircle } from "lucide-react";
import { toast } from "sonner";

type ProductShareButtonsProps = {
  productName: string;
  productUrl: string;
};

const ProductShareButtons = ({ productName, productUrl }: ProductShareButtonsProps) => {
  const shareText = `Check out ${productName} at Mapett Autostore & Lubricants!`;
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(productUrl)}`,
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
        onClick={() => window.open(shareLinks.twitter, "_blank", "width=600,height=400")}
        className="w-7 h-7 rounded-full bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 flex items-center justify-center transition-colors"
        title="Share on X/Twitter"
      >
        <Twitter className="h-3.5 w-3.5 text-[#1DA1F2]" />
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
