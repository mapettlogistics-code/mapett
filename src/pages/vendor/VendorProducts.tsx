import { useEffect, useState } from "react";
import { Plus, Search, Edit, Trash2, Loader2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import VendorLayout from "@/components/vendor/VendorLayout";

const CATEGORIES = [
  "lubricants", "tires", "batteries", "boots", "insurance", "industrial", "accessories",
  "electronics", "fashion", "home-garden", "sports", "health-beauty",
];

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  category: string;
  image_url: string | null;
  stock_quantity: number | null;
  is_featured: boolean | null;
  rating: number | null;
}

const VendorProducts = () => {
  const { user } = useAuth();
  const [vendorId, setVendorId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (user) init();
  }, [user]);

  const init = async () => {
    const { data: vendor } = await supabase.from("vendors").select("id").eq("user_id", user!.id).maybeSingle();
    if (!vendor) return;
    setVendorId(vendor.id);
    await fetchProducts(vendor.id);
  };

  const fetchProducts = async (vid: string) => {
    const { data } = await supabase.from("products").select("*").eq("vendor_id", vid).order("created_at", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setName(""); setDescription(""); setPrice(""); setOriginalPrice("");
    setCategory(""); setImageUrl(""); setStockQty(""); setIsFeatured(false);
  };

  const handleEdit = (p: Product) => {
    setEditingId(p.id);
    setName(p.name);
    setDescription(p.description || "");
    setPrice(String(p.price));
    setOriginalPrice(p.original_price ? String(p.original_price) : "");
    setCategory(p.category);
    setImageUrl(p.image_url || "");
    setStockQty(p.stock_quantity ? String(p.stock_quantity) : "");
    setIsFeatured(p.is_featured || false);
    setDialogOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    const ext = file.name.split(".").pop();
    const path = `${user!.id}/products/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("vendor-assets").upload(path, file);
    if (error) { toast.error("Upload failed"); }
    else {
      const { data } = supabase.storage.from("vendor-assets").getPublicUrl(path);
      setImageUrl(data.publicUrl);
    }
    setUploadingImage(false);
  };

  const handleSave = async () => {
    if (!vendorId || !name || !price || !category) {
      toast.error("Name, price, and category are required");
      return;
    }
    setSaving(true);

    const payload = {
      name,
      description: description || null,
      price: parseFloat(price),
      original_price: originalPrice ? parseFloat(originalPrice) : null,
      category,
      image_url: imageUrl || null,
      stock_quantity: stockQty ? parseInt(stockQty) : 100,
      is_featured: isFeatured,
      vendor_id: vendorId,
    };

    if (editingId) {
      const { error } = await supabase.from("products").update(payload).eq("id", editingId);
      if (error) toast.error(error.message);
      else toast.success("Product updated");
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) toast.error(error.message);
      else toast.success("Product added");
    }

    setDialogOpen(false);
    resetForm();
    await fetchProducts(vendorId);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Product deleted");
      if (vendorId) fetchProducts(vendorId);
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <VendorLayout title="Products" subtitle="Manage your product listings">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Badge variant="outline">{products.length} products</Badge>
        <Dialog open={dialogOpen} onOpenChange={v => { setDialogOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="hero-gradient text-primary-foreground gap-2">
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Product" : "Add Product"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Product Name *</Label>
                <Input value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(c => <SelectItem key={c} value={c} className="capitalize">{c.replace("-", " ")}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price (KES) *</Label>
                  <Input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Original Price</Label>
                  <Input type="number" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Stock Quantity</Label>
                <Input type="number" value={stockQty} onChange={e => setStockQty(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Product Image</Label>
                {imageUrl && <img src={imageUrl} alt="Preview" className="w-20 h-20 rounded-lg object-cover border border-border" />}
                <Input type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0])} disabled={uploadingImage} />
                {uploadingImage && <p className="text-sm text-muted-foreground">Uploading...</p>}
                <Input placeholder="Or paste image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
                <Label>Featured product</Label>
              </div>
              <Button onClick={handleSave} className="w-full hero-gradient text-primary-foreground" disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {editingId ? "Update Product" : "Add Product"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => (
                <TableRow key={p.id}>
                  <TableCell>
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center"><ImageIcon className="h-5 w-5 text-muted-foreground" /></div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell><Badge variant="outline" className="capitalize">{p.category}</Badge></TableCell>
                  <TableCell>KES {p.price.toLocaleString()}</TableCell>
                  <TableCell>{p.stock_quantity ?? "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(p)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No products yet. Add your first product!</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </VendorLayout>
  );
};

export default VendorProducts;
