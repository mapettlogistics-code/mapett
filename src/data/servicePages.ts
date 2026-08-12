import {
  Plane,
  Ship,
  Truck,
  FileCheck,
  Thermometer,
  Container,
  Clock,
  Globe,
  Shield,
  Package,
  Scale,
  MapPin,
  Snowflake,
  Anchor,
  Route,
  ClipboardCheck,
  Warehouse,
  Boxes,
  BarChart3,
} from "lucide-react";
import { ServicePageContent } from "@/components/ServicePageLayout";
import sliderAirFreight from "@/assets/slider-air-freight.jpg";
import sliderOceanFreight from "@/assets/slider-ocean-freight.jpg";
import sliderRoadTransport from "@/assets/slider-road-transport.jpg";
import sliderCustoms from "@/assets/slider-customs.jpg";
import sliderRefrigerated from "@/assets/slider-refrigerated.jpg";
import sliderSpecialCargo from "@/assets/slider-special-cargo.jpg";
import sliderWarehouse from "@/assets/slider-warehouse.jpg";

export const airFreightContent: ServicePageContent = {
  badge: "Air Freight",
  icon: Plane,
  heroImage: sliderAirFreight,
  heroImageAlt: "Air freight cargo aircraft",
  title: "Fast Global Air Cargo Solutions",
  heroDescription:
    "Time-sensitive shipments delivered worldwide through our extensive airline network. From Nairobi and Mombasa to destinations across the globe — reliable, tracked, and on schedule.",
  overviewTitle: "Reliable Air Freight Across East Africa & Beyond",
  overviewDescription:
    "Mapett Logistics provides comprehensive air freight services for businesses that need speed without sacrificing reliability. Whether you are exporting Kenyan products, importing goods from China or Europe, or moving urgent commercial cargo, our team manages every step — from booking and documentation to customs clearance and final delivery.",
  featuresTitle: "Why Choose Our Air Freight",
  featuresSubtitle: "End-to-end air cargo services designed for speed, security, and visibility.",
  features: [
    { icon: Clock, title: "Express Delivery", description: "Priority handling for urgent shipments with accelerated transit times worldwide." },
    { icon: Globe, title: "Global Network", description: "Connections through JKIA, major hubs, and partner airlines across every continent." },
    { icon: Package, title: "Door to Door", description: "Complete pickup, air transport, customs clearance, and final-mile delivery." },
    { icon: Shield, title: "Secure Handling", description: "Full cargo insurance options and careful handling for high-value goods." },
  ],
  cargoTypes: [
    "General commercial cargo",
    "Electronics and consumer goods",
    "Pharmaceuticals and medical supplies",
    "Perishable and temperature-sensitive goods",
    "Documents and samples",
    "Industrial parts and machinery components",
  ],
  highlightsTitle: "Our Air Freight Capabilities",
  highlights: [
    "Departures from Jomo Kenyatta International Airport (JKIA)",
    "Imports and exports through Mombasa and Nairobi",
    "Consolidation services for smaller shipments",
    "Charter options for oversized or urgent cargo",
    "Integrated customs clearance and insurance",
    "Dedicated support team available 24/7",
  ],
  processSteps: [
    { step: "01", title: "Quote & Booking", description: "Share your shipment details and receive a competitive quote with transit options." },
    { step: "02", title: "Pickup & Documentation", description: "We collect your cargo and prepare all required air waybills and export paperwork." },
    { step: "03", title: "Air Transit & Tracking", description: "Your shipment flies via our airline partners with real-time status updates." },
    { step: "04", title: "Clearance & Delivery", description: "Customs clearance at destination and delivery to your specified address." },
  ],
  relatedServices: [
    { icon: FileCheck, label: "Customs Clearance" },
    { icon: Thermometer, label: "Refrigerated Cargo" },
    { icon: Shield, label: "Cargo Insurance" },
  ],
  relatedDescription: "Pair air freight with our customs clearance, cold chain, and insurance services for a complete logistics solution.",
  ctaLabel: "Request Air Freight Quote",
};

export const customsClearanceContent: ServicePageContent = {
  badge: "Customs Clearance",
  icon: FileCheck,
  heroImage: sliderCustoms,
  heroImageAlt: "Customs clearance at port",
  title: "Expert Customs Clearance Services",
  heroDescription:
    "Fast, compliant clearance at Mombasa Port, JKIA, and border points across Kenya. We handle documentation, duties, and regulatory requirements so your cargo moves without delays.",
  overviewTitle: "Smooth Customs Clearance Across Kenya",
  overviewDescription:
    "Navigating Kenya's customs regulations can be complex. Mapett Logistics provides end-to-end customs clearance for imports and exports — preparing all required documentation, liaising with Kenya Revenue Authority (KRA), and ensuring full compliance with local and international trade regulations. Our experienced team minimizes clearance times and avoids costly delays.",
  featuresTitle: "Why Choose Our Customs Services",
  featuresSubtitle: "Accurate documentation, regulatory compliance, and fast clearance at every entry point.",
  features: [
    { icon: ClipboardCheck, title: "Full Documentation", description: "Bill of lading, invoices, permits, and KRA declarations prepared and submitted correctly." },
    { icon: Scale, title: "Duty & Tax Management", description: "Accurate duty calculations, tax payments, and tariff classification for your cargo." },
    { icon: Clock, title: "Fast Clearance", description: "Established relationships with customs authorities for quicker processing times." },
    { icon: Shield, title: "Compliance Assurance", description: "Stay compliant with KRA, KEPHIS, KEBS, and other regulatory requirements." },
  ],
  cargoTypes: [
    "Containerized imports and exports",
    "Air cargo clearance at JKIA",
    "Bulk and break-bulk shipments",
    "Vehicle and machinery imports",
    "Food and agricultural products",
    "Industrial raw materials and equipment",
  ],
  highlightsTitle: "Our Customs Clearance Capabilities",
  highlights: [
    "Clearance at Mombasa Port — Kenya's primary seaport",
    "Air cargo clearance at Jomo Kenyatta International Airport",
    "Border clearance at Malaba, Busia, and Namanga",
    "Pre-arrival processing and documentation review",
    "Bonded warehouse and transit bond arrangements",
    "Consultation on import/export regulations and duties",
  ],
  processSteps: [
    { step: "01", title: "Document Review", description: "We review your shipping documents and advise on any missing requirements before arrival." },
    { step: "02", title: "Declaration Filing", description: "Customs entries are prepared and submitted to KRA with accurate classification and valuation." },
    { step: "03", title: "Inspection & Release", description: "We coordinate any required inspections and manage duty payments for cargo release." },
    { step: "04", title: "Delivery Coordination", description: "Once cleared, we arrange onward transport to your warehouse or final destination." },
  ],
  relatedServices: [
    { icon: Ship, label: "Ocean Freight" },
    { icon: Plane, label: "Air Freight" },
    { icon: Truck, label: "Road Transport" },
  ],
  relatedDescription: "Combine customs clearance with our freight and transport services for seamless import and export operations.",
  ctaLabel: "Request Customs Clearance Quote",
};

export const oceanFreightContent: ServicePageContent = {
  badge: "Ocean Freight",
  icon: Ship,
  heroImage: sliderOceanFreight,
  heroImageAlt: "Ocean freight container ship",
  title: "Cost-Effective Ocean Freight Solutions",
  heroDescription:
    "FCL and LCL sea freight connecting Mombasa to major ports worldwide. Reliable, tracked container shipping for businesses moving large volumes across global trade routes.",
  overviewTitle: "Global Sea Freight Through Mombasa Port",
  overviewDescription:
    "Mapett Logistics offers comprehensive ocean freight services for importers and exporters across East Africa. Through Mombasa Port — the region's main gateway — we connect your business to Asia, Europe, the Middle East, and the Americas. Whether you need a full container load or shared LCL space, our team manages booking, documentation, customs, and inland delivery.",
  featuresTitle: "Why Choose Our Ocean Freight",
  featuresSubtitle: "Flexible container options, global port coverage, and end-to-end shipment management.",
  features: [
    { icon: Anchor, title: "FCL & LCL Options", description: "Full container loads for large shipments or cost-effective LCL consolidation for smaller volumes." },
    { icon: Globe, title: "Global Port Network", description: "Direct and transshipment services to and from major ports in China, India, UAE, Europe, and beyond." },
    { icon: Package, title: "Container Tracking", description: "Real-time visibility on your container from origin port to Mombasa and final delivery." },
    { icon: FileCheck, title: "Integrated Clearance", description: "Customs clearance and inland transport handled under one roof for faster turnaround." },
  ],
  cargoTypes: [
    "20ft and 40ft containerized goods",
    "Machinery and industrial equipment",
    "Building materials and hardware",
    "Consumer goods and retail products",
    "Automotive parts and vehicles",
    "Agricultural and food products",
  ],
  highlightsTitle: "Our Ocean Freight Capabilities",
  highlights: [
    "FCL and LCL imports and exports via Mombasa Port",
    "Connections to Shanghai, Dubai, Mumbai, Hamburg, and more",
    "Reefer container options for temperature-sensitive cargo",
    "Project cargo and out-of-gauge shipment handling",
    "Port-to-port and door-to-door service options",
    "Competitive rates with major shipping lines",
  ],
  processSteps: [
    { step: "01", title: "Booking & Planning", description: "We confirm vessel schedules, container type, and routing based on your cargo and timeline." },
    { step: "02", title: "Origin Handling", description: "Cargo is collected, packed, and loaded at the origin port with full export documentation." },
    { step: "03", title: "Ocean Transit", description: "Your container ships to Mombasa with tracking updates throughout the voyage." },
    { step: "04", title: "Clearance & Delivery", description: "We clear customs at Mombasa and deliver to Nairobi, upcountry, or cross-border destinations." },
  ],
  relatedServices: [
    { icon: FileCheck, label: "Customs Clearance" },
    { icon: Truck, label: "Road Transport" },
    { icon: Container, label: "Special Cargo" },
  ],
  relatedDescription: "Combine ocean freight with customs clearance and inland transport for a complete import solution from port to door.",
  ctaLabel: "Request Ocean Freight Quote",
};

export const roadRailTransportContent: ServicePageContent = {
  badge: "Road & Rail Transport",
  icon: Truck,
  heroImage: sliderRoadTransport,
  heroImageAlt: "Road freight truck on highway",
  title: "Reliable Road & Rail Transport Across East Africa",
  heroDescription:
    "Efficient inland logistics across Kenya, Uganda, Tanzania, Rwanda, and beyond. Cross-border trucking, last-mile delivery, and real-time tracking for your cargo.",
  overviewTitle: "Connecting East Africa by Road and Rail",
  overviewDescription:
    "Once your cargo clears at Mombasa Port or JKIA, it needs to reach its final destination quickly and safely. Mapett Logistics provides comprehensive road and rail transport services across East Africa — from port evacuation and warehouse transfers to cross-border deliveries and last-mile distribution. Our fleet and partner network ensure reliable, tracked movement of your goods.",
  featuresTitle: "Why Choose Our Transport Services",
  featuresSubtitle: "Cross-border expertise, fleet reliability, and full visibility on every shipment.",
  features: [
    { icon: Route, title: "Cross-Border Routes", description: "Regular routes to Uganda, Tanzania, Rwanda, South Sudan, and DRC with full border documentation." },
    { icon: MapPin, title: "Last-Mile Delivery", description: "Door-to-door delivery to warehouses, retail locations, and project sites nationwide." },
    { icon: Clock, title: "Real-Time Tracking", description: "GPS-enabled fleet tracking so you always know where your cargo is." },
    { icon: Shield, title: "Secure Transit", description: "Sealed containers, escort options, and cargo insurance for high-value goods." },
  ],
  cargoTypes: [
    "Container evacuation from Mombasa Port",
    "Palletized and bulk cargo",
    "Construction and project materials",
    "Retail and FMCG distribution",
    "Cross-border commercial goods",
    "Rail-served bulk commodities",
  ],
  highlightsTitle: "Our Transport Capabilities",
  highlights: [
    "Mombasa to Nairobi and upcountry routes",
    "Cross-border trucking to Uganda, Tanzania, and Rwanda",
    "SGR rail connection for Mombasa–Nairobi corridor",
    "Dedicated and shared truck options",
    "Flatbed, tautliner, and refrigerated trucks available",
    "24/7 dispatch and customer support",
  ],
  processSteps: [
    { step: "01", title: "Route Planning", description: "We plan the optimal route, vehicle type, and schedule based on your cargo and destination." },
    { step: "02", title: "Loading & Dispatch", description: "Cargo is loaded securely and dispatched with all required transit documentation." },
    { step: "03", title: "In-Transit Monitoring", description: "Track your shipment in real time as it moves across borders and checkpoints." },
    { step: "04", title: "Delivery & Confirmation", description: "Cargo is delivered to your specified location with proof of delivery." },
  ],
  relatedServices: [
    { icon: Ship, label: "Ocean Freight" },
    { icon: FileCheck, label: "Customs Clearance" },
    { icon: Thermometer, label: "Refrigerated Cargo" },
  ],
  relatedDescription: "Pair inland transport with our port services and customs clearance for seamless end-to-end logistics.",
  ctaLabel: "Request Transport Quote",
};

export const refrigeratedCargoContent: ServicePageContent = {
  badge: "Refrigerated Cargo",
  icon: Thermometer,
  heroImage: sliderRefrigerated,
  heroImageAlt: "Refrigerated cargo cold chain transport",
  title: "Temperature-Controlled Cold Chain Logistics",
  heroDescription:
    "End-to-end refrigerated clearance and transport for perishables, pharmaceuticals, and temperature-sensitive goods. Maintaining the cold chain from port to final destination.",
  overviewTitle: "Complete Cold Chain Across Kenya & East Africa",
  overviewDescription:
    "Temperature-sensitive cargo demands precision at every stage. Mapett Logistics provides refrigerated clearance and transport services — from reefer container handling at Mombasa Port to chilled trucking across Kenya and the region. Our cold chain solutions protect pharmaceuticals, fresh produce, seafood, flowers, and other perishables from origin to delivery.",
  featuresTitle: "Why Choose Our Cold Chain Services",
  featuresSubtitle: "Continuous temperature monitoring, specialized equipment, and compliance with health standards.",
  features: [
    { icon: Snowflake, title: "Cold Chain Integrity", description: "Unbroken temperature control from port clearance through to final delivery." },
    { icon: Thermometer, title: "Real-Time Monitoring", description: "Temperature logging and alerts throughout transit to protect your cargo." },
    { icon: Truck, title: "Reefer Fleet", description: "Refrigerated trucks and reefer containers for road, sea, and air shipments." },
    { icon: Shield, title: "Compliance Ready", description: "Meet KEPHIS, pharmacy board, and international cold chain standards." },
  ],
  cargoTypes: [
    "Fresh fruits and vegetables",
    "Seafood and meat products",
    "Pharmaceuticals and vaccines",
    "Dairy and frozen foods",
    "Flowers and horticultural exports",
    "Chemical and biological samples",
  ],
  highlightsTitle: "Our Refrigerated Cargo Capabilities",
  highlights: [
    "Reefer container clearance at Mombasa Port",
    "Chilled and frozen trucking across East Africa",
    "Pre-cooling and staging at our facilities",
    "Export cold chain for flowers and fresh produce",
    "Pharmaceutical-grade transport options",
    "Emergency backup power and contingency planning",
  ],
  processSteps: [
    { step: "01", title: "Requirements Assessment", description: "We confirm temperature range, packaging, and transit time requirements for your cargo." },
    { step: "02", title: "Equipment Allocation", description: "Reefer containers or refrigerated trucks are pre-cooled and prepared for loading." },
    { step: "03", title: "Monitored Transit", description: "Cargo moves under continuous temperature monitoring with alert protocols in place." },
    { step: "04", title: "Verified Delivery", description: "Temperature logs and delivery confirmation provided upon arrival." },
  ],
  relatedServices: [
    { icon: Ship, label: "Ocean Freight" },
    { icon: Plane, label: "Air Freight" },
    { icon: FileCheck, label: "Customs Clearance" },
  ],
  relatedDescription: "Integrate refrigerated transport with our ocean, air, and customs services for a complete cold chain solution.",
  ctaLabel: "Request Refrigerated Cargo Quote",
};

export const specialCargoContent: ServicePageContent = {
  badge: "Special Cargo",
  icon: Container,
  heroImage: sliderSpecialCargo,
  heroImageAlt: "Special cargo heavy lift equipment",
  title: "Expert Special Cargo Clearance & Transport",
  heroDescription:
    "Specialized handling for oversized, heavy-lift, and out-of-gauge cargo. From project machinery to industrial equipment — cleared and delivered safely across Kenya and East Africa.",
  overviewTitle: "Heavy-Lift & Project Cargo Specialists",
  overviewDescription:
    "Standard logistics processes don't work for oversized and heavy cargo. Mapett Logistics provides dedicated special cargo clearance and transport services for machinery, industrial equipment, construction materials, and other out-of-gauge shipments. Our team plans every detail — from permits and route surveys to specialized loading equipment and escort arrangements.",
  featuresTitle: "Why Choose Our Special Cargo Services",
  featuresSubtitle: "Engineering-led planning, specialized equipment, and end-to-end project cargo management.",
  features: [
    { icon: Container, title: "Heavy-Lift Handling", description: "Cranes, flatbeds, and low-loaders for cargo exceeding standard dimensions and weight." },
    { icon: Route, title: "Route Surveys", description: "Pre-transit route assessment for clearance heights, bridge limits, and road conditions." },
    { icon: FileCheck, title: "Permits & Compliance", description: "Over-dimensional permits, police escorts, and regulatory approvals arranged on your behalf." },
    { icon: Shield, title: "Secure Rigging", description: "Professional lashing, securing, and insurance for high-value project cargo." },
  ],
  cargoTypes: [
    "Industrial machinery and plant equipment",
    "Generators and power transformers",
    "Construction vehicles and cranes",
    "Mining and agricultural equipment",
    "Oil and gas project components",
    "Out-of-gauge containerized cargo",
  ],
  highlightsTitle: "Our Special Cargo Capabilities",
  highlights: [
    "Clearance for oversized imports at Mombasa Port",
    "Low-bed and multi-axle trailer fleet",
    "Route planning for upcountry and cross-border moves",
    "On-site loading and offloading supervision",
    "Project cargo management for multi-shipment builds",
    "Coordination with port authorities and escort services",
  ],
  processSteps: [
    { step: "01", title: "Cargo Assessment", description: "We evaluate dimensions, weight, and handling requirements to plan the optimal approach." },
    { step: "02", title: "Permits & Planning", description: "Route surveys, permits, and equipment are arranged before cargo arrival." },
    { step: "03", title: "Specialized Loading", description: "Cargo is loaded with appropriate rigging, securing, and escort arrangements." },
    { step: "04", title: "Monitored Delivery", description: "Shipment is tracked throughout transit and delivered to the project site." },
  ],
  relatedServices: [
    { icon: Ship, label: "Ocean Freight" },
    { icon: FileCheck, label: "Customs Clearance" },
    { icon: Truck, label: "Road Transport" },
  ],
  relatedDescription: "Combine special cargo handling with our ocean freight, customs, and transport services for complete project logistics.",
  ctaLabel: "Request Special Cargo Quote",
};

export const warehousingContent: ServicePageContent = {
  badge: "Warehousing",
  icon: Warehouse,
  heroImage: sliderWarehouse,
  heroImageAlt: "Warehouse storage and distribution facility",
  title: "Secure Warehousing & Distribution Solutions",
  heroDescription:
    "Modern storage facilities in Mombasa and Nairobi with inventory management, pick-and-pack, and nationwide distribution — keeping your supply chain moving efficiently.",
  overviewTitle: "Strategic Warehousing Across Kenya",
  overviewDescription:
    "Mapett Logistics operates secure warehousing facilities in Mombasa and Nairobi, positioned at Kenya's key trade gateways. Whether you need short-term storage after port clearance, long-term inventory holding, or full pick-and-pack distribution, our warehouses provide the space, systems, and staff to manage your goods professionally and cost-effectively.",
  featuresTitle: "Why Choose Our Warehousing",
  featuresSubtitle: "Secure facilities, real-time inventory control, and flexible storage options.",
  features: [
    { icon: Shield, title: "Secure Storage", description: "24/7 monitored facilities with controlled access, CCTV, and fire safety systems." },
    { icon: BarChart3, title: "Inventory Management", description: "Real-time stock tracking, reporting, and alerts so you always know what's on hand." },
    { icon: Boxes, title: "Pick & Pack", description: "Order fulfilment, labelling, repackaging, and preparation for onward dispatch." },
    { icon: Truck, title: "Distribution", description: "Integrated road transport to deliver from warehouse to customer across East Africa." },
  ],
  cargoTypes: [
    "Containerized imports awaiting clearance or dispatch",
    "Retail and FMCG stock",
    "Industrial raw materials and spare parts",
    "Automotive parts and lubricants",
    "Construction and building materials",
    "E-commerce fulfilment inventory",
  ],
  highlightsTitle: "Our Warehousing Capabilities",
  highlights: [
    "Facilities in Mombasa and Nairobi",
    "Bonded and non-bonded storage options",
    "Short-term and long-term lease arrangements",
    "Palletized, bulk, and racked storage",
    "Container destuffing and restuffing",
    "Value-added services: labelling, sorting, and repackaging",
  ],
  processSteps: [
    { step: "01", title: "Storage Assessment", description: "We review your cargo type, volume, and duration to recommend the right facility and layout." },
    { step: "02", title: "Receiving & Check-In", description: "Goods are received, inspected, logged into inventory, and stored in the appropriate zone." },
    { step: "03", title: "Inventory Management", description: "Stock levels are tracked in real time with regular reporting and reorder alerts." },
    { step: "04", title: "Dispatch & Delivery", description: "Orders are picked, packed, and dispatched via our transport network to final destination." },
  ],
  relatedServices: [
    { icon: Ship, label: "Ocean Freight" },
    { icon: FileCheck, label: "Customs Clearance" },
    { icon: Truck, label: "Road Transport" },
  ],
  relatedDescription: "Combine warehousing with our freight, customs, and transport services for a complete supply chain solution.",
  ctaLabel: "Request Warehousing Quote",
};
