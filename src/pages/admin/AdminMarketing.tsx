import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Save, X, Send, Mail, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/hooks/useAdminAuth";

interface Campaign {
  id: string;
  name: string;
  type: string;
  subject: string | null;
  content: string;
  recipient_group: string;
  status: string;
  scheduled_at: string | null;
  sent_at: string | null;
  recipient_count: number;
  created_at: string;
}

const AdminMarketing = () => {
  const { isAdmin } = useAdminAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Campaign | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    type: "email",
    subject: "",
    content: "",
    recipient_group: "all",
    status: "draft",
  });

  const fetchCampaigns = async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("marketing_campaigns")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Failed to load campaigns");
    else setCampaigns((data as Campaign[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchCampaigns();
  }, [isAdmin]);

  const resetForm = () => {
    setForm({ name: "", type: "email", subject: "", content: "", recipient_group: "all", status: "draft" });
    setEditing(null);
    setIsCreating(false);
  };

  const startEdit = (c: Campaign) => {
    setEditing(c);
    setIsCreating(false);
    setForm({
      name: c.name,
      type: c.type,
      subject: c.subject || "",
      content: c.content,
      recipient_group: c.recipient_group,
      status: c.status,
    });
  };

  const handleSave = async () => {
    if (!form.name || !form.content) {
      toast.error("Name and content are required");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        type: form.type,
        subject: form.subject || null,
        content: form.content,
        recipient_group: form.recipient_group,
        status: form.status,
      };
      if (editing) {
        const { error } = await (supabase as any).from("marketing_campaigns").update(payload).eq("id", editing.id);
        if (error) throw error;
        toast.success("Campaign updated");
      } else {
        const { error } = await (supabase as any).from("marketing_campaigns").insert(payload);
        if (error) throw error;
        toast.success("Campaign created");
      }
      resetForm();
      fetchCampaigns();
    } catch (error: any) {
      toast.error(error.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this campaign?")) return;
    const { error } = await (supabase as any).from("marketing_campaigns").delete().eq("id", id);
    if (error) toast.error("Failed to delete");
    else { toast.success("Deleted"); fetchCampaigns(); }
  };

  const statusColors: Record<string, string> = {
    draft: "bg-muted text-muted-foreground",
    scheduled: "bg-yellow-100 text-yellow-700",
    sent: "bg-green-100 text-green-700",
  };

  const typeIcons: Record<string, typeof Mail> = {
    email: Mail,
    sms: MessageSquare,
  };

  return (
    <AdminLayout title="Marketing Automation" subtitle="Create and manage email & SMS marketing campaigns">
      <div className="bg-accent/50 border border-border rounded-xl p-4 mb-6">
        <p className="text-sm text-muted-foreground">
          <strong>📢 Marketing Hub:</strong> Create email and SMS campaigns to engage your customers. 
          SMS campaigns use Africa's Talking for delivery across Kenya. Email campaigns are sent via your configured email provider.
        </p>
      </div>

      {(isCreating || editing) && (
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{editing ? "Edit Campaign" : "New Campaign"}</h3>
            <button onClick={resetForm} className="p-2 hover:bg-secondary rounded-lg"><X className="h-4 w-4" /></button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Campaign Name *</Label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="March Newsletter" />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                  <option value="email">📧 Email</option>
                  <option value="sms">💬 SMS</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Recipients</Label>
                <select value={form.recipient_group} onChange={e => setForm(f => ({ ...f, recipient_group: e.target.value }))} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                  <option value="all">All Contacts</option>
                  <option value="customers">Customers Only</option>
                  <option value="leads">Leads Only</option>
                </select>
              </div>
            </div>
            {form.type === "email" && (
              <div className="space-y-2">
                <Label>Email Subject</Label>
                <Input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Exciting news from Mapett Logistics!" />
              </div>
            )}
            <div className="space-y-2">
              <Label>Message Content *</Label>
              <Textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder={form.type === "sms" ? "SMS message (160 chars recommended)..." : "Email body content..."} rows={form.type === "sms" ? 4 : 8} />
              {form.type === "sms" && (
                <p className="text-xs text-muted-foreground">{form.content.length}/160 characters</p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1" />
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving} className="hero-gradient text-primary-foreground">
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {editing ? "Update" : "Save Draft"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Campaigns ({campaigns.length})</h3>
        {!isCreating && !editing && (
          <Button onClick={() => { resetForm(); setIsCreating(true); }} size="sm" className="hero-gradient text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" /> New Campaign
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : campaigns.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No campaigns yet. Create your first email or SMS campaign.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {campaigns.map(c => {
            const TypeIcon = typeIcons[c.type] || Mail;
            return (
              <div key={c.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <TypeIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.type.toUpperCase()} · {c.recipient_group} · {c.recipient_count} recipients</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[c.status] || statusColors.draft}`}>
                  {c.status === "scheduled" && <Clock className="inline h-3 w-3 mr-1" />}
                  {c.status === "sent" && <Send className="inline h-3 w-3 mr-1" />}
                  {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                </span>
                <Button variant="ghost" size="icon" onClick={() => startEdit(c)}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMarketing;
