import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Loader2, Save, X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/hooks/useAdminAuth";

type SiteContent = {
  id: string;
  section: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  link: string | null;
  icon: string | null;
  extra_data: Record<string, unknown> | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

const sections = [
  { key: "announcement", label: "Announcements", description: "Sliding banner messages at the top of the page" },
  { key: "hero_slide", label: "Hero Slides", description: "Main hero banner slides with images and CTAs" },
  { key: "promo_banner", label: "Promo Banners", description: "Promotional offers, discounts, and ads displayed below the hero" },
  { key: "service", label: "Services", description: "Products & services section content" },
  { key: "insurance", label: "Insurance", description: "Insurance policies section content" },
];

const AdminContent = () => {
  const { isAdmin } = useAdminAuth();
  const [activeSection, setActiveSection] = useState("announcement");
  const [items, setItems] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<SiteContent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    image_url: "",
    link: "",
    icon: "",
    display_order: 0,
    is_active: true,
  });

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .eq("section", activeSection)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching content:", error);
      toast.error("Failed to load content");
    } else {
      setItems((data as SiteContent[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchItems();
  }, [isAdmin, activeSection]);

  const resetForm = () => {
    setForm({ title: "", subtitle: "", description: "", image_url: "", link: "", icon: "", display_order: 0, is_active: true });
    setEditingItem(null);
    setIsCreating(false);
  };

  const startEdit = (item: SiteContent) => {
    setEditingItem(item);
    setIsCreating(false);
    setForm({
      title: item.title || "",
      subtitle: item.subtitle || "",
      description: item.description || "",
      image_url: item.image_url || "",
      link: item.link || "",
      icon: item.icon || "",
      display_order: item.display_order,
      is_active: item.is_active,
    });
  };

  const startCreate = () => {
    resetForm();
    setIsCreating(true);
    setForm(f => ({ ...f, display_order: items.length }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingItem) {
        const { error } = await supabase
          .from("site_content")
          .update({
            title: form.title || null,
            subtitle: form.subtitle || null,
            description: form.description || null,
            image_url: form.image_url || null,
            link: form.link || null,
            icon: form.icon || null,
            display_order: form.display_order,
            is_active: form.is_active,
          })
          .eq("id", editingItem.id);
        if (error) throw error;
        toast.success("Content updated");
      } else {
        const { error } = await supabase
          .from("site_content")
          .insert({
            section: activeSection,
            title: form.title || null,
            subtitle: form.subtitle || null,
            description: form.description || null,
            image_url: form.image_url || null,
            link: form.link || null,
            icon: form.icon || null,
            display_order: form.display_order,
            is_active: form.is_active,
          });
        if (error) throw error;
        toast.success("Content created");
      }
      resetForm();
      fetchItems();
    } catch (error) {
      console.error("Error saving content:", error);
      toast.error("Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const { error } = await supabase.from("site_content").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
    } else {
      toast.success("Deleted successfully");
      fetchItems();
    }
  };

  const toggleActive = async (item: SiteContent) => {
    const { error } = await supabase
      .from("site_content")
      .update({ is_active: !item.is_active })
      .eq("id", item.id);
    if (error) {
      toast.error("Failed to update");
    } else {
      fetchItems();
    }
  };

  const sectionInfo = sections.find(s => s.key === activeSection);

  const renderFormFields = () => {
    switch (activeSection) {
      case "announcement":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Announcement Message *</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="🚚 Free shipping on orders above KES 10,000!" />
            </div>
            <div className="space-y-2">
              <Label>Link (optional)</Label>
              <Input value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} placeholder="https://..." />
            </div>
          </div>
        );
      case "hero_slide":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="AIR FREIGHT" />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} placeholder="Fast global delivery" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Slide description..." rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>Link</Label>
                <Input value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} placeholder="#services" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Icon Name (Lucide icon)</Label>
              <Input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="Plane, Ship, Truck, etc." />
            </div>
          </div>
        );
      case "promo_banner":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="🚢 Import Clearance Special" />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} placeholder="Get 10% off customs clearance" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Promotion details..." rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>Link</Label>
                <Input value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} placeholder="#contact or https://..." />
              </div>
            </div>
          </div>
        );
      case "service":
      case "insurance":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Service name" />
              </div>
              <div className="space-y-2">
                <Label>Icon (Lucide icon name)</Label>
                <Input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="Plane, Ship, Shield..." />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description..." rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>Link</Label>
                <Input value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} placeholder="#services" />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout title="Content Management" subtitle="Edit website content, announcements, and banners">
      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map(s => (
          <button
            key={s.key}
            onClick={() => { setActiveSection(s.key); resetForm(); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === s.key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="text-muted-foreground text-sm mb-4">{sectionInfo?.description}</p>

      {/* Create/Edit Form */}
      {(isCreating || editingItem) && (
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{editingItem ? "Edit Item" : "New Item"}</h3>
            <button onClick={resetForm} className="p-2 hover:bg-secondary rounded-lg"><X className="h-4 w-4" /></button>
          </div>
          {renderFormFields()}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Label>Order</Label>
              <Input type="number" value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))} className="w-20" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="is_active" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} className="rounded" />
              <Label htmlFor="is_active">Active</Label>
            </div>
            <div className="flex-1" />
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="hero-gradient text-primary-foreground">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {editingItem ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{sectionInfo?.label} ({items.length})</h3>
        {!isCreating && !editingItem && (
          <Button onClick={startCreate} size="sm" className="hero-gradient text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" /> Add {sectionInfo?.label.replace(/s$/, "")}
          </Button>
        )}
      </div>

      {/* Items List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No {sectionInfo?.label.toLowerCase()} yet.</p>
          <p className="text-sm mt-1">The website will use default content until you add items here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div
              key={item.id}
              className={`flex items-center gap-4 p-4 bg-card border rounded-xl transition-colors ${
                item.is_active ? "border-border" : "border-border/50 opacity-60"
              }`}
            >
              <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
              {item.image_url && (
                <img src={item.image_url} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{item.title || "(no title)"}</p>
                {item.subtitle && <p className="text-sm text-muted-foreground truncate">{item.subtitle}</p>}
                {item.description && <p className="text-xs text-muted-foreground truncate">{item.description}</p>}
              </div>
              <span className="text-xs text-muted-foreground">#{item.display_order}</span>
              <button
                onClick={() => toggleActive(item)}
                className={`px-2 py-1 rounded text-xs font-medium ${
                  item.is_active ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                }`}
              >
                {item.is_active ? "Active" : "Inactive"}
              </button>
              <Button variant="ghost" size="icon" onClick={() => startEdit(item)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminContent;
