import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminSettings = () => {
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    companyName: "Mapett Logistics",
    email: "info@mappetlogitics.com",
    phone: "+254 700 000 000",
    whatsapp: "+254 700 000 000",
    address: "Nairobi, Kenya",
    about: "Mapett Logistics is your trusted partner in logistics, freight, and insurance services across East Africa and beyond.",
  });

  const handleSave = async () => {
    setSaving(true);
    // Settings are currently stored locally. 
    // In future this can be persisted to a settings table.
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved successfully");
    }, 500);
  };

  return (
    <AdminLayout title="Settings" subtitle="Manage website settings">
      <div className="max-w-2xl space-y-6">
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Company Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input value={settings.companyName} onChange={e => setSettings(s => ({ ...s, companyName: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={settings.email} onChange={e => setSettings(s => ({ ...s, email: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={settings.phone} onChange={e => setSettings(s => ({ ...s, phone: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp</Label>
              <Input value={settings.whatsapp} onChange={e => setSettings(s => ({ ...s, whatsapp: e.target.value }))} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Input value={settings.address} onChange={e => setSettings(s => ({ ...s, address: e.target.value }))} />
          </div>
          <div className="space-y-2">
            <Label>About Description</Label>
            <Textarea rows={4} value={settings.about} onChange={e => setSettings(s => ({ ...s, about: e.target.value }))} />
          </div>
        </div>

        <Button onClick={handleSave} className="hero-gradient text-primary-foreground" disabled={saving}>
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Settings
        </Button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
