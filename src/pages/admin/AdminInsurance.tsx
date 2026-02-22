import { useEffect, useState } from "react";
import { Search, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";

interface InsuranceApp {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company: string | null;
  insurance_type: string;
  cargo_value: string | null;
  details: string | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  reviewing: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  approved: "bg-green-500/10 text-green-600 border-green-500/30",
  rejected: "bg-destructive/10 text-destructive border-destructive/30",
};

const AdminInsurance = () => {
  const [apps, setApps] = useState<InsuranceApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selected, setSelected] = useState<InsuranceApp | null>(null);

  useEffect(() => { fetchApps(); }, []);

  const fetchApps = async () => {
    const { data, error } = await supabase
      .from("insurance_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setApps(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("insurance_applications").update({ status }).eq("id", id);
    if (error) toast.error("Failed to update");
    else { toast.success("Status updated"); fetchApps(); }
  };

  const filtered = apps.filter(a =>
    a.full_name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    a.insurance_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Insurance Applications" subtitle="Review and manage insurance requests">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search applications..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Badge variant="outline" className="text-sm">{apps.length} applications</Badge>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(a => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.full_name}</TableCell>
                  <TableCell className="capitalize">{a.insurance_type.replace(/_/g, " ")}</TableCell>
                  <TableCell>{a.email}</TableCell>
                  <TableCell>{a.phone}</TableCell>
                  <TableCell>
                    <Select value={a.status} onValueChange={v => updateStatus(a.id, v)}>
                      <SelectTrigger className="w-28 h-8">
                        <Badge variant="outline" className={statusColors[a.status] || ""}>{a.status}</Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {["pending", "reviewing", "approved", "rejected"].map(s => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{new Date(a.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => { setSelected(a); setDetailsOpen(true); }}><Eye className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No applications found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Insurance Application</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-muted-foreground">Name:</span> {selected.full_name}</div>
                <div><span className="text-muted-foreground">Email:</span> {selected.email}</div>
                <div><span className="text-muted-foreground">Phone:</span> {selected.phone}</div>
                <div><span className="text-muted-foreground">Company:</span> {selected.company || "—"}</div>
                <div><span className="text-muted-foreground">Type:</span> {selected.insurance_type.replace(/_/g, " ")}</div>
                <div><span className="text-muted-foreground">Cargo Value:</span> {selected.cargo_value || "—"}</div>
              </div>
              {selected.details && (
                <div><span className="text-muted-foreground">Details:</span><p className="mt-1 bg-secondary/50 rounded-lg p-3">{selected.details}</p></div>
              )}
              <div><span className="text-muted-foreground">Submitted:</span> {new Date(selected.created_at).toLocaleString()}</div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminInsurance;
