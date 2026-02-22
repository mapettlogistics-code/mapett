import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Store, Mail, Lock, User, Phone, MapPin, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const VendorRegister = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isNewAccount, setIsNewAccount] = useState(!user);

  // New account fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Vendor fields
  const [businessName, setBusinessName] = useState("");
  const [shopLocation, setShopLocation] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let userId = user?.id;

      if (isNewAccount) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: window.location.origin + "/vendor/setup",
          },
        });
        if (error) throw error;
        userId = data.user?.id;
        if (!userId) throw new Error("Signup failed");
      }

      // Create vendor profile
      const { error: vendorError } = await supabase.from("vendors").insert({
        user_id: userId!,
        business_name: businessName,
        shop_location: shopLocation,
        phone: phone || null,
        email: isNewAccount ? email : user?.email || "",
      });

      if (vendorError) {
        if (vendorError.code === "23505") {
          toast.error("You already have a vendor account");
          navigate("/vendor/dashboard");
        } else {
          throw vendorError;
        }
      } else {
        // Add vendor role
        await supabase.from("user_roles").insert({
          user_id: userId!,
          role: "vendor" as any,
        });

        toast.success("Vendor account created! Complete your shop setup.");
        navigate("/vendor/setup");
      }
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="bg-card rounded-2xl shadow-card p-8 border border-border">
          <div className="text-center mb-8">
            <div className="w-16 h-16 hero-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Store className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Become a Vendor</h1>
            <p className="text-muted-foreground">Create your shop on Mapett Marketplace</p>
          </div>

          {user && (
            <div className="flex gap-2 mb-6">
              <Button
                type="button"
                variant={!isNewAccount ? "default" : "outline"}
                className={!isNewAccount ? "hero-gradient text-primary-foreground flex-1" : "flex-1"}
                onClick={() => setIsNewAccount(false)}
              >
                Use Current Account
              </Button>
              <Button
                type="button"
                variant={isNewAccount ? "default" : "outline"}
                className={isNewAccount ? "hero-gradient text-primary-foreground flex-1" : "flex-1"}
                onClick={() => setIsNewAccount(true)}
              >
                New Account
              </Button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isNewAccount && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="fullName" placeholder="Your full name" value={fullName} onChange={e => setFullName(e.target.value)} className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10" required minLength={6} />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="businessName">Business / Shop Name *</Label>
              <div className="relative">
                <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="businessName" placeholder="Your shop name" value={businessName} onChange={e => setBusinessName(e.target.value)} className="pl-10" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shopLocation">Shop Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="shopLocation" placeholder="e.g. Nairobi, Mombasa" value={shopLocation} onChange={e => setShopLocation(e.target.value)} className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="phone" placeholder="+254..." value={phone} onChange={e => setPhone(e.target.value)} className="pl-10" />
              </div>
            </div>

            <Button type="submit" className="w-full hero-gradient text-primary-foreground" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Register as Vendor"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already a vendor?{" "}
            <Link to="/vendor/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VendorRegister;
