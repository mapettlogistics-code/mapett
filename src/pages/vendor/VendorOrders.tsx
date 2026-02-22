import { useEffect, useState } from "react";
import { Search, Loader2, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import VendorLayout from "@/components/vendor/VendorLayout";

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  order_id: string;
}

interface OrderInfo {
  orderId: string;
  tracking: string;
  status: string;
  date: string;
  items: OrderItem[];
  total: number;
  customer: string;
  phone: string;
  address: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const VendorOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderInfo | null>(null);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    const { data: vendor } = await supabase.from("vendors").select("id").eq("user_id", user!.id).maybeSingle();
    if (!vendor) { setLoading(false); return; }

    // Get vendor's products
    const { data: vendorProducts } = await supabase.from("products").select("id").eq("vendor_id", vendor.id);
    if (!vendorProducts?.length) { setLoading(false); return; }

    const productIds = vendorProducts.map(p => p.id);

    // Get order items for vendor's products
    const { data: orderItems } = await supabase
      .from("order_items")
      .select("*")
      .in("product_id", productIds);

    if (!orderItems?.length) { setLoading(false); return; }

    // Get unique order IDs
    const orderIds = [...new Set(orderItems.map(i => i.order_id))];

    // Get order details
    const { data: ordersData } = await supabase
      .from("orders")
      .select("*")
      .in("id", orderIds)
      .order("created_at", { ascending: false });

    if (!ordersData) { setLoading(false); return; }

    const mapped: OrderInfo[] = ordersData.map(o => ({
      orderId: o.id,
      tracking: o.tracking_number,
      status: o.status,
      date: o.created_at,
      items: orderItems.filter(i => i.order_id === o.id),
      total: orderItems.filter(i => i.order_id === o.id).reduce((s, i) => s + i.quantity * i.unit_price, 0),
      customer: o.shipping_address || "—",
      phone: o.phone || "—",
      address: o.shipping_address || "—",
    }));

    setOrders(mapped);
    setLoading(false);
  };

  const filtered = orders.filter(o =>
    o.tracking.toLowerCase().includes(search.toLowerCase()) ||
    o.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <VendorLayout title="Orders" subtitle="Orders containing your products">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Badge variant="outline">{orders.length} orders</Badge>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking #</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(o => (
                <TableRow key={o.orderId}>
                  <TableCell className="font-mono text-sm">{o.tracking}</TableCell>
                  <TableCell>{o.items.length} item(s)</TableCell>
                  <TableCell>KES {o.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[o.status] || ""}>{o.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(o.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(o)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No orders yet</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details — {selectedOrder?.tracking}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Status:</span> <Badge className={statusColors[selectedOrder.status] || ""}>{selectedOrder.status}</Badge></div>
                <div><span className="text-muted-foreground">Date:</span> {new Date(selectedOrder.date).toLocaleString()}</div>
                <div><span className="text-muted-foreground">Phone:</span> {selectedOrder.phone}</div>
                <div><span className="text-muted-foreground">Address:</span> {selectedOrder.address}</div>
              </div>
              <div className="border-t border-border pt-4">
                <h4 className="font-semibold text-foreground mb-2">Your Items</h4>
                {selectedOrder.items.map(i => (
                  <div key={i.id} className="flex justify-between py-2 border-b border-border last:border-0 text-sm">
                    <span>{i.product_name} × {i.quantity}</span>
                    <span className="font-medium">KES {(i.quantity * i.unit_price).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between py-2 font-semibold text-foreground">
                  <span>Total</span>
                  <span>KES {selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </VendorLayout>
  );
};

export default VendorOrders;
