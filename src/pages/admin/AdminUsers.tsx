import { useEffect, useState } from "react";
import { Search, Loader2, Shield, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
}

interface UserRole {
  user_id: string;
  role: string;
}

const AdminUsers = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const [profilesRes, rolesRes] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id, role"),
    ]);
    if (profilesRes.data) setProfiles(profilesRes.data);
    if (rolesRes.data) setRoles(rolesRes.data);
    setLoading(false);
  };

  const getUserRoles = (userId: string) =>
    roles.filter(r => r.user_id === userId).map(r => r.role);

  const filtered = profiles.filter(p =>
    (p.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (p.phone || "").includes(search)
  );

  return (
    <AdminLayout title="Users" subtitle="View registered users">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Badge variant="outline" className="text-sm">{profiles.length} users</Badge>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => {
                const userRoles = getUserRoles(p.user_id);
                return (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.full_name || "—"}</TableCell>
                    <TableCell>{p.phone || "—"}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{p.address || "—"}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {userRoles.length > 0 ? userRoles.map(r => (
                          <Badge key={r} variant="outline" className={r === "admin" ? "bg-primary/10 text-primary border-primary/30" : ""}>
                            {r === "admin" ? <ShieldCheck className="h-3 w-3 mr-1" /> : <Shield className="h-3 w-3 mr-1" />}
                            {r}
                          </Badge>
                        )) : <span className="text-muted-foreground text-sm">user</span>}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No users found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminUsers;
