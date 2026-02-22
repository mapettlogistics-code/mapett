import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Store, Upload, Facebook, Instagram, Loader2, CreditCard, Truck, ShieldCheck, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const CATEGORIES = [
  "lubricants", "tires", "batteries", "boots", "insurance", "industrial", "accessories",
  "electronics", "fashion", "home-garden", "sports", "health-beauty",
];

const VendorSetup = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [vendorId, setVendorId] = useState<string | null>(null);

  // Form state
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [shopLocation, setShopLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [deliveryPeriod, setDeliveryPeriod] = useState("");
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [mpesaTill, setMpesaTill] = useState("");
  const [mpesaPaybill, setMpesaPaybill] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/vendor/login");
      return;
    }
    if (user) fetchVendor();
  }, [user, authLoading]);

  const fetchVendor = async () => {
    const { data } = await supabase
      .from("vendors")
      .select("*")
      .eq("user_id", user!.id)
      .maybeSingle();

    if (!data) {
      navigate("/vendor/register");
      return;
    }

    setVendorId(data.id);
    setBusinessName(data.business_name || "");
    setDescription(data.description || "");
    setShopLocation(data.shop_location || "");
    setPhone(data.phone || "");
    setEmail(data.email || "");
    setCategories(data.categories || []);
    setFacebookUrl(data.facebook_url || "");
    setInstagramUrl(data.instagram_url || "");
    setTiktokUrl(data.tiktok_url || "");
    setReturnPolicy(data.return_policy || "");
    setDeliveryPeriod(data.delivery_period || "");
    setMpesaPhone(data.mpesa_phone || "");
    setMpesaTill(data.mpesa_till || "");
    setMpesaPaybill(data.mpesa_paybill || "");
    setBankName(data.bank_name || "");
    setBankAccount(data.bank_account_number || "");
    setBankBranch(data.bank_branch || "");
    setLogoUrl(data.logo_url || "");
    setBannerUrl(data.banner_url || "");
    setLoading(false);
  };

  const handleImageUpload = async (file: File, type: "logo" | "banner") => {
    if (type === "logo") setUploadingLogo(true);
    else setUploadingBanner(true);

    const ext = file.name.split(".").pop();
    const path = `${user!.id}/${type}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from("vendor-assets").upload(path, file);
    if (error) {
      toast.error("Upload failed: " + error.message);
    } else {
      const { data: urlData } = supabase.storage.from("vendor-assets").getPublicUrl(path);
      if (type === "logo") setLogoUrl(urlData.publicUrl);
      else setBannerUrl(urlData.publicUrl);
      toast.success(`${type === "logo" ? "Logo" : "Banner"} uploaded!`);
    }

    if (type === "logo") setUploadingLogo(false);
    else setUploadingBanner(false);
  };

  const toggleCategory = (cat: string) => {
    setCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const handleSave = async () => {
    if (!vendorId) return;
    setSaving(true);

    const { error } = await supabase.from("vendors").update({
      business_name: businessName,
      description,
      shop_location: shopLocation,
      phone,
      email,
      categories,
      facebook_url: facebookUrl || null,
      instagram_url: instagramUrl || null,
      tiktok_url: tiktokUrl || null,
      return_policy: returnPolicy || null,
      delivery_period: deliveryPeriod || null,
      mpesa_phone: mpesaPhone || null,
      mpesa_till: mpesaTill || null,
      mpesa_paybill: mpesaPaybill || null,
      bank_name: bankName || null,
      bank_account_number: bankAccount || null,
      bank_branch: bankBranch || null,
      logo_url: logoUrl || null,
      banner_url: bannerUrl || null,
    }).eq("id", vendorId);

    if (error) toast.error("Failed to save: " + error.message);
    else toast.success("Shop settings saved!");
    setSaving(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Shop Setup</h1>
              <p className="text-muted-foreground">Configure your vendor shop</p>
            </div>
            <Button onClick={() => navigate("/vendor/dashboard")} variant="outline">Go to Dashboard</Button>
          </div>

          <div className="space-y-8">
            {/* Logo & Banner */}
            <section className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" /> Branding
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Logo</Label>
                  {logoUrl && <img src={logoUrl} alt="Logo" className="w-24 h-24 rounded-lg object-cover mt-2 mb-2 border border-border" />}
                  <Input type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], "logo")} disabled={uploadingLogo} />
                  {uploadingLogo && <p className="text-sm text-muted-foreground mt-1">Uploading...</p>}
                </div>
                <div>
                  <Label>Store Banner</Label>
                  {bannerUrl && <img src={bannerUrl} alt="Banner" className="w-full h-24 rounded-lg object-cover mt-2 mb-2 border border-border" />}
                  <Input type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0], "banner")} disabled={uploadingBanner} />
                  {uploadingBanner && <p className="text-sm text-muted-foreground mt-1">Uploading...</p>}
                </div>
              </div>
            </section>

            {/* Basic Info */}
            <section className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Store className="h-5 w-5 text-primary" /> Basic Info
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Business Name *</Label>
                  <Input value={businessName} onChange={e => setBusinessName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Shop Location</Label>
                  <Input value={shopLocation} onChange={e => setShopLocation(e.target.value)} placeholder="e.g. Nairobi CBD" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+254..." />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={email} onChange={e => setEmail(e.target.value)} type="email" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Shop Description</Label>
                  <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Tell customers about your shop..." rows={3} />
                </div>
              </div>
            </section>

            {/* Categories */}
            <section className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Categories You Sell</h2>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <Badge
                    key={cat}
                    variant={categories.includes(cat) ? "default" : "outline"}
                    className={`cursor-pointer capitalize ${categories.includes(cat) ? "bg-primary text-primary-foreground" : ""}`}
                    onClick={() => toggleCategory(cat)}
                  >
                    {cat.replace("-", " ")}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Social Media */}
            <section className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Facebook className="h-5 w-5 text-primary" /> Social Media
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Facebook URL</Label>
                  <Input value={facebookUrl} onChange={e => setFacebookUrl(e.target.value)} placeholder="https://facebook.com/..." />
                </div>
                <div className="space-y-2">
                  <Label>Instagram URL</Label>
                  <Input value={instagramUrl} onChange={e => setInstagramUrl(e.target.value)} placeholder="https://instagram.com/..." />
                </div>
                <div className="space-y-2">
                  <Label>TikTok URL</Label>
                  <Input value={tiktokUrl} onChange={e => setTiktokUrl(e.target.value)} placeholder="https://tiktok.com/..." />
                </div>
              </div>
            </section>

            {/* Seller Policies */}
            <section className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" /> Seller Policies
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Returns Policy</Label>
                  <Textarea value={returnPolicy} onChange={e => setReturnPolicy(e.target.value)} placeholder="Describe your return/refund policy..." rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Delivery Period</Label>
                  <Input value={deliveryPeriod} onChange={e => setDeliveryPeriod(e.target.value)} placeholder="e.g. 2-5 business days within Nairobi" />
                </div>
              </div>
            </section>

            {/* Payment Details */}
            <section className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" /> Payment Details
              </h2>
              <div className="space-y-4">
                <h3 className="font-medium text-foreground">M-Pesa</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>M-Pesa Phone</Label>
                    <Input value={mpesaPhone} onChange={e => setMpesaPhone(e.target.value)} placeholder="0712..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Till Number</Label>
                    <Input value={mpesaTill} onChange={e => setMpesaTill(e.target.value)} placeholder="Till No." />
                  </div>
                  <div className="space-y-2">
                    <Label>Paybill Number</Label>
                    <Input value={mpesaPaybill} onChange={e => setMpesaPaybill(e.target.value)} placeholder="Paybill No." />
                  </div>
                </div>
                <h3 className="font-medium text-foreground mt-4">Bank Account</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Bank Name</Label>
                    <Input value={bankName} onChange={e => setBankName(e.target.value)} placeholder="e.g. KCB, Equity" />
                  </div>
                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <Input value={bankAccount} onChange={e => setBankAccount(e.target.value)} placeholder="Account No." />
                  </div>
                  <div className="space-y-2">
                    <Label>Branch</Label>
                    <Input value={bankBranch} onChange={e => setBankBranch(e.target.value)} placeholder="Branch name" />
                  </div>
                </div>
              </div>
            </section>

            <div className="flex justify-end">
              <Button onClick={handleSave} className="hero-gradient text-primary-foreground px-8" disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Save Shop Settings
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorSetup;
