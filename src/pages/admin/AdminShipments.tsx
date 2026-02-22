import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Truck, Plus, Search, Edit, Trash2, MapPin, Calendar, Eye, X, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";

interface Shipment {
  id: string;
  tracking_number: string;
  customer_name: string | null;
  customer_email: string | null;
  origin: string;
  destination: string;
  status: string;
  current_location: string | null;
  service_type: string | null;
  estimated_delivery: string | null;
  notes: string | null;
  created_at: string;
}

interface ShipmentEvent {
  id: string;
  shipment_id: string;
  status: string;
  location: string | null;
  description: string | null;
  event_time: string;
}

const statusColors: Record<string, string> = {
  processing: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  picked_up: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  in_transit: "bg-purple-500/10 text-purple-600 border-purple-500/30",
  out_for_delivery: "bg-orange-500/10 text-orange-600 border-orange-500/30",
  delivered: "bg-green-500/10 text-green-600 border-green-500/30",
  cancelled: "bg-destructive/10 text-destructive border-destructive/30",
};

const AdminShipments = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [eventsDialogOpen, setEventsDialogOpen] = useState(false);
  const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [events, setEvents] = useState<ShipmentEvent[]>([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    origin: "",
    destination: "",
    status: "processing",
    current_location: "",
    service_type: "standard",
    estimated_delivery: "",
    notes: "",
  });
  const [eventForm, setEventForm] = useState({
    status: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    const { data, error } = await supabase
      .from("shipments")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setShipments(data);
    setLoading(false);
  };

  const fetchEvents = async (shipmentId: string) => {
    const { data } = await supabase
      .from("shipment_events")
      .select("*")
      .eq("shipment_id", shipmentId)
      .order("event_time", { ascending: false });
    if (data) setEvents(data);
  };

  const openCreate = () => {
    setEditingShipment(null);
    setForm({
      customer_name: "", customer_email: "", origin: "", destination: "",
      status: "processing", current_location: "", service_type: "standard",
      estimated_delivery: "", notes: "",
    });
    setDialogOpen(true);
  };

  const openEdit = (s: Shipment) => {
    setEditingShipment(s);
    setForm({
      customer_name: s.customer_name || "",
      customer_email: s.customer_email || "",
      origin: s.origin,
      destination: s.destination,
      status: s.status,
      current_location: s.current_location || "",
      service_type: s.service_type || "standard",
      estimated_delivery: s.estimated_delivery || "",
      notes: s.notes || "",
    });
    setDialogOpen(true);
  };

  const openEvents = async (s: Shipment) => {
    setSelectedShipment(s);
    await fetchEvents(s.id);
    setEventsDialogOpen(true);
    setEventForm({ status: "", location: "", description: "" });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingShipment) {
        const { error } = await supabase
          .from("shipments")
          .update({ ...form, estimated_delivery: form.estimated_delivery || null, current_location: form.current_location || null, notes: form.notes || null })
          .eq("id", editingShipment.id);
        if (error) throw error;
        toast.success("Shipment updated");
      } else {
        const { data: trackingData } = await supabase.rpc("generate_tracking_number");
        const { error } = await supabase.from("shipments").insert({
          ...form,
          tracking_number: trackingData || `MPT${Date.now()}`,
          estimated_delivery: form.estimated_delivery || null,
          current_location: form.current_location || null,
          notes: form.notes || null,
        });
        if (error) throw error;
        toast.success("Shipment created");
      }
      setDialogOpen(false);
      fetchShipments();
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this shipment?")) return;
    const { error } = await supabase.from("shipments").delete().eq("id", id);
    if (error) toast.error("Failed to delete");
    else { toast.success("Deleted"); fetchShipments(); }
  };

  const handleAddEvent = async () => {
    if (!selectedShipment || !eventForm.status) return;
    const { error } = await supabase.from("shipment_events").insert({
      shipment_id: selectedShipment.id,
      status: eventForm.status,
      location: eventForm.location || null,
      description: eventForm.description || null,
    });
    if (error) toast.error("Failed to add event");
    else {
      toast.success("Event added");
      fetchEvents(selectedShipment.id);
      setEventForm({ status: "", location: "", description: "" });
      // Also update shipment status & location
      await supabase.from("shipments").update({
        status: eventForm.status,
        current_location: eventForm.location || selectedShipment.current_location,
      }).eq("id", selectedShipment.id);
      fetchShipments();
    }
  };

  const filtered = shipments.filter(s =>
    s.tracking_number.toLowerCase().includes(search.toLowerCase()) ||
    (s.customer_name || "").toLowerCase().includes(search.toLowerCase()) ||
    s.origin.toLowerCase().includes(search.toLowerCase()) ||
    s.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Shipments" subtitle="Manage shipments and tracking">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search shipments..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Button onClick={openCreate} className="hero-gradient text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" /> New Shipment
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="font-mono font-semibold">{s.tracking_number}</TableCell>
                  <TableCell>
                    <div>{s.customer_name || "—"}</div>
                    <div className="text-xs text-muted-foreground">{s.customer_email || ""}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3" />{s.origin} → {s.destination}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[s.status] || ""}>
                      {s.status.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="capitalize">{s.service_type || "standard"}</TableCell>
                  <TableCell>{s.estimated_delivery || "—"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEvents(s)}><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => openEdit(s)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No shipments found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingShipment ? "Edit Shipment" : "New Shipment"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Customer Name</Label>
                <Input value={form.customer_name} onChange={e => setForm(f => ({ ...f, customer_name: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Customer Email</Label>
                <Input type="email" value={form.customer_email} onChange={e => setForm(f => ({ ...f, customer_email: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Origin *</Label>
                <Input value={form.origin} onChange={e => setForm(f => ({ ...f, origin: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label>Destination *</Label>
                <Input value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["processing", "picked_up", "in_transit", "out_for_delivery", "delivered", "cancelled"].map(s => (
                      <SelectItem key={s} value={s}>{s.replace(/_/g, " ")}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Service Type</Label>
                <Select value={form.service_type} onValueChange={v => setForm(f => ({ ...f, service_type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["standard", "express", "overnight", "freight", "international"].map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Current Location</Label>
                <Input value={form.current_location} onChange={e => setForm(f => ({ ...f, current_location: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Estimated Delivery</Label>
                <Input type="date" value={form.estimated_delivery} onChange={e => setForm(f => ({ ...f, estimated_delivery: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
            </div>
            <Button onClick={handleSave} className="w-full hero-gradient text-primary-foreground" disabled={saving || !form.origin || !form.destination}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {editingShipment ? "Update" : "Create"} Shipment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Events Dialog */}
      <Dialog open={eventsDialogOpen} onOpenChange={setEventsDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tracking Events — {selectedShipment?.tracking_number}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Add event form */}
            <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
              <Label className="font-semibold">Add Event</Label>
              <div className="grid grid-cols-2 gap-3">
                <Select value={eventForm.status} onValueChange={v => setEventForm(f => ({ ...f, status: v }))}>
                  <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    {["processing", "picked_up", "in_transit", "customs_clearance", "out_for_delivery", "delivered", "delayed", "cancelled"].map(s => (
                      <SelectItem key={s} value={s}>{s.replace(/_/g, " ")}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input placeholder="Location" value={eventForm.location} onChange={e => setEventForm(f => ({ ...f, location: e.target.value }))} />
              </div>
              <Input placeholder="Description" value={eventForm.description} onChange={e => setEventForm(f => ({ ...f, description: e.target.value }))} />
              <Button size="sm" onClick={handleAddEvent} disabled={!eventForm.status}>Add Event</Button>
            </div>

            {/* Events timeline */}
            <div className="space-y-3">
              {events.map(ev => (
                <div key={ev.id} className="flex gap-3 border-l-2 border-primary/30 pl-4 py-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={statusColors[ev.status] || ""}>{ev.status.replace(/_/g, " ")}</Badge>
                      {ev.location && <span className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.location}</span>}
                    </div>
                    {ev.description && <p className="text-sm mt-1">{ev.description}</p>}
                    <p className="text-xs text-muted-foreground mt-1">{new Date(ev.event_time).toLocaleString()}</p>
                  </div>
                </div>
              ))}
              {events.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No events yet</p>}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminShipments;
