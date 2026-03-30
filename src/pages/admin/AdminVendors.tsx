import { useEffect, useState } from "react";
import { Search, Loader2, Store, Eye, Ban, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Vendor {
  id: string;
  business_name: string;
  shop_location: string | null;
  phone: string | null;
  email: string | null;
  status: string;
  categories: string[];
  created_at: string;
  logo_url: string | null;
}

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  suspended: "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
};

const AdminVendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchVendors(); }, []);

  const fetchVendors = async () => {
    const { data } = await supabase.from("vendors").select("*").order("created_at", { ascending: false });
    setVendors(data || []);
    setLoading(false);
  };

  const toggleStatus = async (vendor: Vendor) => {
    const newStatus = vendor.status === "active" ? "suspended" : "active";
    const { error } = await supabase.from("vendors").update({ status: newStatus }).eq("id", vendor.id);
    if (error) toast.error(error.message);
    else {
      toast.success(`Vendor ${newStatus === "active" ? "activated" : "suspended"}`);
      fetchVendors();
    }
  };

  const filtered = vendors.filter(v =>
    v.business_name.toLowerCase().includes(search.toLowerCase()) ||
    (v.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Vendors" subtitle="Manage marketplace vendors">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search vendors..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Badge variant="outline">{vendors.length} vendors</Badge>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shop</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(v => (
                <TableRow key={v.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {v.logo_url ? (
                        <img src={v.logo_url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center"><Store className="h-5 w-5 text-muted-foreground" /></div>
                      )}
                      <span className="font-medium">{v.business_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{v.shop_location || "—"}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {v.email && <p>{v.email}</p>}
                      {v.phone && <p className="text-muted-foreground">{v.phone}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {v.categories?.slice(0, 3).map(c => (
                        <Badge key={c} variant="outline" className="capitalize text-xs">{c}</Badge>
                      ))}
                      {(v.categories?.length || 0) > 3 && <Badge variant="outline" className="text-xs">+{v.categories.length - 3}</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[v.status] || ""}>{v.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(v.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <a href={`https://mappetstore.com/shop/${v.id}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                      </a>
                      <Button variant="ghost" size="icon" onClick={() => toggleStatus(v)} className={v.status === "active" ? "text-destructive" : "text-green-600"}>
                        {v.status === "active" ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No vendors found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminVendors;
