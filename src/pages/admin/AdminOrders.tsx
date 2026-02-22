import { useEffect, useState } from "react";
import { Search, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";

interface Order {
  id: string;
  tracking_number: string;
  user_id: string | null;
  total_amount: number;
  status: string;
  shipping_address: string | null;
  phone: string | null;
  notes: string | null;
  created_at: string;
}

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  confirmed: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  processing: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  shipped: "bg-orange-500/10 text-orange-600 border-orange-500/30",
  delivered: "bg-green-500/10 text-green-600 border-green-500/30",
  cancelled: "bg-destructive/10 text-destructive border-destructive/30",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setOrders(data);
    setLoading(false);
  };

  const openDetails = async (order: Order) => {
    setSelectedOrder(order);
    const { data } = await supabase
      .from("order_items")
      .select("id, product_name, quantity, unit_price")
      .eq("order_id", order.id);
    setOrderItems(data || []);
    setDetailsOpen(true);
  };

  const updateStatus = async (orderId: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", orderId);
    if (error) toast.error("Failed to update");
    else { toast.success("Status updated"); fetchOrders(); }
  };

  const filtered = orders.filter(o =>
    o.tracking_number.toLowerCase().includes(search.toLowerCase()) ||
    (o.phone || "").includes(search) ||
    (o.shipping_address || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Orders" subtitle="View and manage customer orders">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Badge variant="outline" className="text-sm">{orders.length} total orders</Badge>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(o => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono font-semibold">{o.tracking_number}</TableCell>
                  <TableCell>{new Date(o.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>KES {o.total_amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Select value={o.status} onValueChange={v => updateStatus(o.id, v)}>
                      <SelectTrigger className="w-32 h-8">
                        <Badge variant="outline" className={statusColors[o.status] || ""}>{o.status}</Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map(s => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{o.phone || "—"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openDetails(o)}><Eye className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No orders found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Order {selectedOrder?.tracking_number}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Status:</span> <Badge variant="outline" className={statusColors[selectedOrder.status] || ""}>{selectedOrder.status}</Badge></div>
                <div><span className="text-muted-foreground">Date:</span> {new Date(selectedOrder.created_at).toLocaleString()}</div>
                <div><span className="text-muted-foreground">Phone:</span> {selectedOrder.phone || "—"}</div>
                <div><span className="text-muted-foreground">Total:</span> KES {selectedOrder.total_amount.toLocaleString()}</div>
              </div>
              {selectedOrder.shipping_address && (
                <div className="text-sm"><span className="text-muted-foreground">Address:</span> {selectedOrder.shipping_address}</div>
              )}
              {selectedOrder.notes && (
                <div className="text-sm"><span className="text-muted-foreground">Notes:</span> {selectedOrder.notes}</div>
              )}
              <div>
                <Label className="font-semibold">Items</Label>
                <div className="mt-2 space-y-2">
                  {orderItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center bg-secondary/50 rounded-lg p-3">
                      <div>
                        <span className="font-medium">{item.product_name}</span>
                        <span className="text-muted-foreground ml-2">× {item.quantity}</span>
                      </div>
                      <span className="font-semibold">KES {(item.unit_price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  {orderItems.length === 0 && <p className="text-sm text-muted-foreground">No items</p>}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
