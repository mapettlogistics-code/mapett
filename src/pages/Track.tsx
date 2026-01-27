import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Search,
  Package,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  Truck,
  Plane,
  Ship,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

type Shipment = {
  id: string;
  tracking_number: string;
  customer_name: string | null;
  origin: string;
  destination: string;
  status: string;
  estimated_delivery: string | null;
  current_location: string | null;
  service_type: string | null;
  created_at: string;
};

type ShipmentEvent = {
  id: string;
  status: string;
  location: string | null;
  description: string | null;
  event_time: string;
};

const statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<any> }> = {
  processing: { label: "Processing", color: "bg-yellow-500", icon: Package },
  dispatched: { label: "Dispatched", color: "bg-blue-500", icon: Truck },
  in_transit: { label: "In Transit", color: "bg-primary", icon: Truck },
  customs_clearance: { label: "Customs Clearance", color: "bg-orange-500", icon: Ship },
  out_for_delivery: { label: "Out for Delivery", color: "bg-green-500", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-600", icon: CheckCircle },
  pending: { label: "Pending", color: "bg-gray-500", icon: Clock },
};

const serviceIcons: Record<string, React.ComponentType<any>> = {
  express: Truck,
  standard: Truck,
  air_freight: Plane,
  ocean_freight: Ship,
};

const Track = () => {
  const [searchParams] = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState(searchParams.get("tracking") || "");
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [events, setEvents] = useState<ShipmentEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (searchParams.get("tracking")) {
      handleSearch();
    }
  }, []);

  const handleSearch = async () => {
    if (!trackingNumber.trim()) return;

    setLoading(true);
    setSearched(true);

    // First check shipments table
    const { data: shipmentData } = await supabase
      .from("shipments")
      .select("*")
      .eq("tracking_number", trackingNumber.trim().toUpperCase())
      .maybeSingle();

    if (shipmentData) {
      setShipment(shipmentData);

      // Fetch events for this shipment
      const { data: eventsData } = await supabase
        .from("shipment_events")
        .select("*")
        .eq("shipment_id", shipmentData.id)
        .order("event_time", { ascending: false });

      setEvents(eventsData || []);
    } else {
      // Check orders table
      const { data: orderData } = await supabase
        .from("orders")
        .select("*")
        .eq("tracking_number", trackingNumber.trim().toUpperCase())
        .maybeSingle();

      if (orderData) {
        // Convert order to shipment-like object
        setShipment({
          id: orderData.id,
          tracking_number: orderData.tracking_number,
          customer_name: null,
          origin: "Mapett Warehouse, Nairobi",
          destination: orderData.shipping_address || "N/A",
          status: orderData.status,
          estimated_delivery: null,
          current_location: "Processing at warehouse",
          service_type: "standard",
          created_at: orderData.created_at,
        });
        setEvents([
          {
            id: "1",
            status: orderData.status,
            location: "Mapett Warehouse",
            description: "Order received and being processed",
            event_time: orderData.created_at,
          },
        ]);
      } else {
        setShipment(null);
        setEvents([]);
      }
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const StatusIcon = shipment ? statusConfig[shipment.status]?.icon || Package : Package;
  const ServiceIcon = shipment
    ? serviceIcons[shipment.service_type || "standard"] || Truck
    : Truck;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Track Your Shipment</h1>
          <p className="text-muted-foreground">
            Enter your tracking number to see real-time status
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-card mb-8">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Enter tracking number (e.g., MPT123456789)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                onKeyDown={handleKeyDown}
                className="pl-10 h-12 text-lg"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="hero-gradient text-primary-foreground h-12 px-6"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Track"}
            </Button>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          </div>
        ) : searched && !shipment ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">No Shipment Found</h2>
            <p className="text-muted-foreground">
              We couldn't find a shipment with tracking number "{trackingNumber}"
            </p>
          </motion.div>
        ) : shipment ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Status Card */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl ${statusConfig[shipment.status]?.color || "bg-gray-500"} flex items-center justify-center`}
                >
                  <StatusIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Status</p>
                  <h2 className="text-2xl font-bold">
                    {statusConfig[shipment.status]?.label || shipment.status}
                  </h2>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Tracking Number</p>
                    <p className="font-mono font-bold">{shipment.tracking_number}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ServiceIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Service Type</p>
                    <p className="font-medium capitalize">
                      {shipment.service_type?.replace("_", " ") || "Standard"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Current Location</p>
                    <p className="font-medium">{shipment.current_location || "In transit"}</p>
                  </div>
                </div>
                {shipment.estimated_delivery && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                      <p className="font-medium">
                        {new Date(shipment.estimated_delivery).toLocaleDateString("en-KE", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Route */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Origin</p>
                    <p className="font-medium">{shipment.origin}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-8 h-0.5 bg-primary" />
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-sm text-muted-foreground">Destination</p>
                    <p className="font-medium">{shipment.destination}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            {events.length > 0 && (
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-bold text-lg mb-4">Tracking History</h3>
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        {index === 0 ? (
                          <div className="w-3 h-3 rounded-full bg-primary" />
                        ) : (
                          <Circle className="w-3 h-3 text-muted-foreground" />
                        )}
                        {index < events.length - 1 && (
                          <div className="w-0.5 h-full bg-border flex-1 my-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="font-medium capitalize">
                          {statusConfig[event.status]?.label || event.status}
                        </p>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          {event.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {event.location}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />{" "}
                            {new Date(event.event_time).toLocaleString("en-KE")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : null}

        {/* Demo tracking numbers */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Try demo tracking: <code className="bg-secondary px-2 py-1 rounded">MPT123456789</code></p>
        </div>
      </div>
    </div>
  );
};

export default Track;
