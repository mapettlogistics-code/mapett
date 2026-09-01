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
  Heart,
  Users,
  Building2,
  AlertTriangle,
} from "lucide-react";
import { ServicePageContent } from "@/components/ServicePageLayout";
import sliderAirFreight from "@/assets/slider-air-freight.jpg";
import sliderOceanFreight from "@/assets/slider-ocean-freight.jpg";
import sliderRoadTransport from "@/assets/slider-road-transport.jpg";
import sliderCustoms from "@/assets/slider-customs.jpg";
import sliderRefrigerated from "@/assets/slider-refrigerated.jpg";
import sliderSpecialCargo from "@/assets/slider-special-cargo.jpg";
import sliderWarehouse from "@/assets/slider-warehouse.jpg";
import sliderIntermodal from "@/assets/slider-intermodal.jpg";


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

export const CustomsClearingForwardingContent: ServicePageContent = {
  badge: "Customs Clearing & Forwarding",
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

export const insuranceContent: ServicePageContent = {
  badge: "Comprehensive Insurance",
  icon: Shield,
  heroImage: sliderWarehouse,
  heroImageAlt: "Insurance protection coverage",
  title: "Complete Cargo & Liability Insurance Solutions",
  heroDescription:
    "Comprehensive insurance coverage for your cargo and business operations. Marine, air, transit, and liability protection — ensuring peace of mind from origin to delivery.",
  overviewTitle: "Insurance Coverage for Every Logistics Need",
  overviewDescription:
    "At Mapett Logistics, we understand that protecting your cargo and your business is essential. We offer comprehensive insurance solutions covering marine cargo, air freight, inland transit, motor vehicles, and employee liability. Partner with our insurance specialists to secure the right coverage at competitive rates — keeping your shipments and operations protected every step of the way.",
  featuresTitle: "Our Insurance Coverage Options",
  featuresSubtitle: "Comprehensive protection for cargo, vehicles, and business operations.",
  features: [
    { icon: Shield, title: "Cargo Protection", description: "Full coverage for marine, air, and inland transit cargo against loss and damage." },
    { icon: Truck, title: "Vehicle Coverage", description: "Motor vehicle and commercial fleet insurance with comprehensive and third-party options." },
    { icon: Users, title: "Liability Coverage", description: "Employee liability, WIBA coverage, and freight forwarder liability protection." },
    { icon: Heart, title: "Additional Coverage", description: "Life insurance, warehouse coverage, and customized policy options available." },
  ],
  cargoTypes: [
    "Marine cargo insurance",
    "Air cargo and freight insurance",
    "Inland transit insurance",
    "Freight forwarder liability",
    "WIBA and employee liability",
    "Life insurance",
    "Warehouse and storage coverage",
  ],
  highlightsTitle: "Insurance Coverage Highlights",
  highlights: [
    "Marine cargo coverage for ocean freight shipments",
    "Air cargo insurance for time-sensitive imports and exports",
    "Inland transit protection for road and rail transport",
    "Freight forwarder liability coverage",
    "WIBA and employee liability policies",
    "Life insurance and personal coverage options",
    "Warehouse and inventory protection",
  ],
  processSteps: [
    { step: "01", title: "Coverage Assessment", description: "We review your cargo type, value, route, and business operations to determine coverage needs." },
    { step: "02", title: "Policy Recommendation", description: "Our insurance specialists recommend the best policy options at competitive premiums." },
    { step: "03", title: "Policy Issuance", description: "Documentation is prepared, premium is paid, and your coverage takes effect immediately." },
    { step: "04", title: "Claims Support", description: "In case of loss or damage, we provide rapid claims processing and settlement support." },
  ],
  relatedServices: [
    { icon: Ship, label: "Ocean Freight" },
    { icon: Plane, label: "Air Freight" },
    { icon: Truck, label: "Road Transport" },
  ],
  relatedDescription: "Integrate insurance protection with our freight and transport services for complete risk management.",
  ctaLabel: "Get Insurance Quote",
};

export const marineCargoInsuranceContent: ServicePageContent = {
  badge: "Marine Cargo Insurance",
  icon: Ship,
  heroImage: sliderOceanFreight,
  heroImageAlt: "Marine cargo ship protection",
  title: "Marine Cargo Insurance Coverage",
  heroDescription:
    "Comprehensive insurance for ocean freight shipments through Mombasa and international ports. All-risks coverage protecting your goods during sea transit.",
  overviewTitle: "Protect Your Ocean Freight Shipments",
  overviewDescription:
    "Marine cargo insurance provides complete protection for your ocean freight shipments from origin port through Mombasa to final destination. Whether you're shipping containerized goods, break-bulk cargo, or specialized equipment, our marine cargo policies cover total loss, partial loss, and damage from perils including sinking, collision, theft, and weather-related incidents.",
  featuresTitle: "Marine Cargo Coverage Features",
  featuresSubtitle: "Comprehensive protection for all-risks ocean freight scenarios.",
  features: [
    { icon: Shield, title: "All-Risks Coverage", description: "Protection against total loss, partial loss, damage, and inherent risks of sea transport." },
    { icon: Globe, title: "Worldwide Coverage", description: "Coverage from any origin port to any destination worldwide through Mombasa." },
    { icon: Clock, title: "Fast Claims Processing", description: "Rapid damage assessment and claim settlement to minimize your financial impact." },
    { icon: FileCheck, title: "Easy Documentation", description: "Simple policy issuance and claims filing integrated with your shipping process." },
  ],
  cargoTypes: [
    "Containerized general cargo",
    "Break-bulk shipments",
    "Heavy-lift and project cargo",
    "Reefer container goods",
    "Hazardous and specialized cargo",
    "High-value electronics and machinery",
  ],
  highlightsTitle: "Marine Cargo Insurance Highlights",
  highlights: [
    "Coverage for FCL and LCL shipments",
    "Policy issuance within 24 hours",
    "Coverage effective from warehouse to warehouse",
    "No waiting period for claims",
    "Competitive premiums based on cargo value and route",
    "24/7 claims hotline and support",
  ],
  processSteps: [
    { step: "01", title: "Quote Request", description: "Provide cargo details, value, origin, and destination for instant marine cargo insurance quote." },
    { step: "02", title: "Policy Review", description: "Review coverage terms, exclusions, and deductible before proceeding." },
    { step: "03", title: "Policy Issuance", description: "Payment is collected and marine cargo certificate is issued immediately." },
    { step: "04", title: "Claims Handling", description: "In case of loss or damage, submit documentation and we handle the claim process." },
  ],
  relatedServices: [
    { icon: Plane, label: "Air Cargo Insurance" },
    { icon: Truck, label: "Inland Transit Insurance" },
    { icon: Shield, label: "Comprehensive Insurance" },
  ],
  relatedDescription: "Pair marine cargo insurance with other coverage types for complete logistics protection.",
  ctaLabel: "Get Marine Cargo Quote",
};

export const airCargoInsuranceContent: ServicePageContent = {
  badge: "Air Cargo Insurance",
  icon: Plane,
  heroImage: sliderAirFreight,
  heroImageAlt: "Air cargo insurance protection",
  title: "Air Cargo Insurance Coverage",
  heroDescription:
    "Complete insurance protection for air freight shipments. Fast, all-risks coverage for time-sensitive goods moving through JKIA and international airports.",
  overviewTitle: "Protect Your Air Freight Shipments",
  overviewDescription:
    "Air cargo insurance provides comprehensive coverage for your time-sensitive shipments moving via commercial airlines. From high-value electronics and pharmaceuticals to perishables and documents, our air cargo policies protect against loss, damage, and delays. Coverage is available for shipments departing and arriving at JKIA as well as international airports worldwide.",
  featuresTitle: "Air Cargo Coverage Features",
  featuresSubtitle: "Comprehensive protection for fast-moving air freight.",
  features: [
    { icon: Shield, title: "All-Risks Coverage", description: "Complete protection against loss, damage, and accident during air transport." },
    { icon: Clock, title: "Express Processing", description: "Instant policy issuance and rapid claims handling for time-sensitive shipments." },
    { icon: Globe, title: "Global Coverage", description: "Protection for air freight from any origin airport to any destination globally." },
    { icon: Package, title: "Cargo Protection", description: "Coverage for all cargo types including fragile, hazardous, and high-value goods." },
  ],
  cargoTypes: [
    "Electronics and consumer goods",
    "Pharmaceuticals and medical supplies",
    "Perishable and temperature-sensitive goods",
    "High-value jewelry and precious goods",
    "Documents and samples",
    "Industrial machinery and parts",
  ],
  highlightsTitle: "Air Cargo Insurance Highlights",
  highlights: [
    "Coverage effective from warehouse to warehouse",
    "Policy issuance within 1 hour",
    "Express claims processing",
    "No mandatory waiting period",
    "Coverage for domestic and international flights",
    "24/7 emergency claims support",
  ],
  processSteps: [
    { step: "01", title: "Coverage Details", description: "Provide airway bill number, cargo value, and destination for quote." },
    { step: "02", title: "Instant Quote", description: "Receive insurance quote and policy terms within minutes." },
    { step: "03", title: "Quick Issuance", description: "Policy certificate is issued and effective before your flight departs." },
    { step: "04", title: "Claim Support", description: "Submit claim documentation and receive settlement within 5-7 working days." },
  ],
  relatedServices: [
    { icon: Ship, label: "Marine Cargo Insurance" },
    { icon: Truck, label: "Inland Transit Insurance" },
    { icon: Shield, label: "Comprehensive Insurance" },
  ],
  relatedDescription: "Combine air cargo insurance with transit and comprehensive coverage for full logistics protection.",
  ctaLabel: "Get Air Cargo Quote",
};

export const inlandTransitInsuranceContent: ServicePageContent = {
  badge: "Inland Transit Insurance",
  icon: Truck,
  heroImage: sliderRoadTransport,
  heroImageAlt: "Inland transit cargo protection",
  title: "Inland Transit Insurance Coverage",
  heroDescription:
    "Comprehensive protection for cargo moving by road and rail across Kenya and East Africa. Coverage for loss and damage during inland transportation.",
  overviewTitle: "Protect Your Overland Shipments",
  overviewDescription:
    "Inland transit insurance provides complete coverage for your cargo moving by road and rail across Kenya, Uganda, Tanzania, Rwanda, and other East African destinations. Whether you're evacuating containers from Mombasa Port, cross-border trucking, or distributing goods nationally, our transit insurance protects against loss, theft, accident, and damage from natural perils.",
  featuresTitle: "Inland Transit Coverage Features",
  featuresSubtitle: "Comprehensive protection for overland cargo movement.",
  features: [
    { icon: Shield, title: "Road & Rail Coverage", description: "Protection for cargo moving by truck or rail across borders and through region." },
    { icon: Route, title: "Cross-Border Protection", description: "Coverage for international transit through established East African trade routes." },
    { icon: Clock, title: "Flexible Policies", description: "Single trip, annual, or long-term transit policies available based on your needs." },
    { icon: FileCheck, title: "Claim Documentation", description: "Simple claim process with minimal paperwork and fast settlement." },
  ],
  cargoTypes: [
    "Container evacuation from ports",
    "General merchandise and retail goods",
    "Construction and industrial materials",
    "Agricultural and perishable products",
    "Cross-border commercial shipments",
    "Bulk and break-bulk cargo",
  ],
  highlightsTitle: "Inland Transit Insurance Highlights",
  highlights: [
    "Coverage from origin to final destination",
    "Single trip and annual transit policies",
    "Cross-border coverage to Uganda, Tanzania, Rwanda",
    "Competitive rates based on cargo type and value",
    "Optional theft and roadside accident coverage",
    "GPS-tracked fleet discounts available",
  ],
  processSteps: [
    { step: "01", title: "Trip Details", description: "Provide cargo type, value, origin, destination, and vehicle details." },
    { step: "02", title: "Policy Quote", description: "Receive competitive quote for single-trip or annual transit coverage." },
    { step: "03", title: "Policy Activation", description: "Premium payment and policy becomes effective on same day." },
    { step: "04", title: "Claims Management", description: "In case of incident, submit loss details and we process claim within 10 days." },
  ],
  relatedServices: [
    { icon: Ship, label: "Marine Cargo Insurance" },
    { icon: Plane, label: "Air Cargo Insurance" },
  ],
  relatedDescription: "Combine transit coverage with cargo insurance for complete transportation protection.",
  ctaLabel: "Get Transit Quote",
};

export const freightForwarderLiabilityContent: ServicePageContent = {
  badge: "Freight Forwarder Liability",
  icon: Package,
  heroImage: sliderWarehouse,
  heroImageAlt: "Freight forwarder liability coverage",
  title: "Freight Forwarder Liability Insurance",
  heroDescription:
    "Professional liability coverage for freight forwarders and logistics providers. Protection against claims arising from cargo loss, damage, and service failures.",
  overviewTitle: "Protect Your Freight Forwarding Business",
  overviewDescription:
    "Freight forwarder liability insurance provides professional indemnity coverage for logistics companies, freight forwarders, and cargo handlers. This policy protects your business against claims for loss of cargo, delay in delivery, incorrect documentation, and other professional service failures. Coverage is essential for any logistics operation handling client shipments and cargo.",
  featuresTitle: "Forwarder Liability Coverage Features",
  featuresSubtitle: "Professional indemnity protection for logistics operators.",
  features: [
    { icon: Shield, title: "Professional Indemnity", description: "Coverage for liability claims arising from professional service failures." },
    { icon: Scale, title: "Cargo Loss Coverage", description: "Protection against claims for cargo loss, damage, or mishandling." },
    { icon: FileCheck, title: "Documentation Errors", description: "Coverage for financial loss resulting from incorrect documentation or procedures." },
    { icon: Clock, title: "Defense Costs", description: "Legal costs and court expenses covered separately from policy limits." },
  ],
  cargoTypes: [
    "General cargo handling",
    "Container and breakbulk operations",
    "Customs clearance services",
    "Warehouse and storage operations",
    "Road and sea freight services",
    "Documentation and administrative services",
  ],
  highlightsTitle: "Forwarder Liability Highlights",
  highlights: [
    "Coverage limits from KES 5M to 50M+",
    "Annual policies with automatic renewal",
    "Coverage worldwide for international operations",
    "Defense costs covered outside policy limit",
    "Professional indemnity and cargo liability included",
    "Dedicated freight forwarder specialist support",
  ],
  processSteps: [
    { step: "01", title: "Business Review", description: "Provide details on your freight forwarding operations, cargo types, and annual turnover." },
    { step: "02", title: "Risk Assessment", description: "Our underwriters assess your operations and recommend appropriate coverage limits." },
    { step: "03", title: "Policy Issuance", description: "Custom policy is prepared with your specific coverage requirements." },
    { step: "04", title: "Claims Service", description: "Professional claims handling through experienced freight industry specialists." },
  ],
  relatedServices: [
    { icon: Ship, label: "Marine Cargo Insurance" },
    { icon: Plane, label: "Air Cargo Insurance" },
  ],
  relatedDescription: "Combine professional liability with cargo coverage for comprehensive freight forwarding protection.",
  ctaLabel: "Get Liability Quote",
};

export const wibaEmployeesCoverageContent: ServicePageContent = {
  badge: "WIBA & Employees Liability",
  icon: Users,
  heroImage: sliderWarehouse,
  heroImageAlt: "Employee liability and WIBA coverage",
  title: "WIBA & Employee Liability Insurance",
  heroDescription:
    "Comprehensive employee liability and Work Injury Benefit Act coverage. Protecting your business and staff from workplace injury and accident claims.",
  overviewTitle: "Protect Your Team & Business",
  overviewDescription:
    "WIBA and employee liability insurance provides comprehensive coverage for workplace injuries and accidents involving your staff. This protection is mandatory under Kenya's Work Injury Benefit Act (WIBA) and covers medical costs, disability benefits, and compensation claims. Our policies ensure your business remains protected against significant financial exposure from employee-related incidents.",
  featuresTitle: "WIBA & Employee Coverage Features",
  featuresSubtitle: "Compliance and protection for your workforce.",
  features: [
    { icon: Shield, title: "WIBA Compliance", description: "Full compliance with Work Injury Benefit Act requirements for Kenyan employers." },
    { icon: Heart, title: "Medical Coverage", description: "Coverage for medical treatment and rehabilitation costs for work-related injuries." },
    { icon: Scale, title: "Disability Benefits", description: "Compensation for temporary and permanent disabilities resulting from workplace accidents." },
    { icon: Clock, title: "Death Benefits", description: "Lump sum and dependent allowance payments in case of employee death from workplace injury." },
  ],
  cargoTypes: [
    "Warehouse and storage facility staff",
    "Truck drivers and transport operators",
    "Loading and unloading workers",
    "Customs clearance specialists",
    "Office and administrative staff",
    "Cross-border transport workers",
  ],
  highlightsTitle: "WIBA & Employee Coverage Highlights",
  highlights: [
    "Mandatory WIBA coverage for all employees",
    "Coverage for workplace accidents and occupational diseases",
    "Medical and hospitalization expenses included",
    "Disability and death benefits protection",
    "Employer's liability coverage included",
    "Compliance with Kenyan labor regulations",
  ],
  processSteps: [
    { step: "01", title: "Employee Register", description: "Provide your employee register with number of staff and job classifications." },
    { step: "02", title: "Coverage Assessment", description: "We calculate coverage based on payroll and risk classification of your business." },
    { step: "03", title: "Policy Issuance", description: "WIBA certificate and employer liability policy are issued with immediate cover." },
    { step: "04", title: "Claims Support", description: "Accident claims are processed with fast approval and benefit payment." },
  ],
  relatedServices: [
    { icon: Heart, label: "Life Insurance" },
    { icon: Package, label: "Freight Forwarder Liability" },
  ],
  relatedDescription: "Combine WIBA coverage with life insurance for complete employee and business protection.",
  ctaLabel: "Get WIBA Quote",
};

export const lifeInsuranceContent: ServicePageContent = {
  badge: "Life Insurance",
  icon: Heart,
  heroImage: sliderWarehouse,
  heroImageAlt: "Life insurance protection",
  title: "Life Insurance Coverage",
  heroDescription:
    "Personal and group life insurance for you and your family. Financial security and peace of mind with flexible, affordable coverage options.",
  overviewTitle: "Protect Your Family's Future",
  overviewDescription:
    "Life insurance provides financial protection for your family and dependents in the event of your death. Our flexible life insurance policies offer competitive premiums with various coverage levels and benefit options. Whether you need individual or group life coverage, we provide policies that fit your financial situation and family needs.",
  featuresTitle: "Life Insurance Coverage Features",
  featuresSubtitle: "Flexible protection for personal and financial security.",
  features: [
    { icon: Heart, title: "Death Benefit", description: "Lump sum payment to beneficiaries upon your death for financial security." },
    { icon: Clock, title: "Flexible Terms", description: "Term life and whole life policies with flexible coverage periods and amounts." },
    { icon: Scale, title: "Premium Options", description: "Affordable monthly premiums with optional payment flexibility." },
    { icon: Shield, title: "Family Protection", description: "Coverage options for spouses and dependents as part of your policy." },
  ],
  cargoTypes: [
    "Individual term life insurance",
    "Whole life insurance policies",
    "Group life insurance for employees",
    "Mortgage protection insurance",
    "Income protection insurance",
    "Child education endowment plans",
  ],
  highlightsTitle: "Life Insurance Highlights",
  highlights: [
    "Coverage from KES 100,000 to 10M+",
    "Term life policies with guaranteed rates",
    "No medical exam options for smaller amounts",
    "Flexible premium payment options",
    "Quick claim processing for beneficiaries",
    "Optional additional rider benefits",
  ],
  processSteps: [
    { step: "01", title: "Needs Assessment", description: "Determine the coverage amount needed based on your financial obligations." },
    { step: "02", title: "Quote & Application", description: "Receive personalized quote and complete simple application form." },
    { step: "03", title: "Underwriting", description: "Quick underwriting process with minimal medical requirements for standard amounts." },
    { step: "04", title: "Policy Issue", description: "Policy is issued and coverage is effective with premium payments beginning." },
  ],
  relatedServices: [
    { icon: Users, label: "WIBA & Employees Liability" },
    { icon: Building2, label: "Warehouse Insurance" },
  ],
  relatedDescription: "Combine life insurance with other personal and business coverage for comprehensive financial protection.",
  ctaLabel: "Get Life Insurance Quote",
};

export const warehouseInsuranceContent: ServicePageContent = {
  badge: "Warehouse Insurance",
  icon: Building2,
  heroImage: sliderWarehouse,
  heroImageAlt: "Warehouse and storage facility coverage",
  title: "Warehouse Insurance Coverage",
  heroDescription:
    "Complete insurance protection for warehouse facilities and stored inventory. Coverage against fire, theft, and property damage for storage operations.",
  overviewTitle: "Protect Your Warehouse Operations",
  overviewDescription:
    "Warehouse insurance provides comprehensive coverage for your storage facilities and the inventory held within. This includes protection against fire, theft, natural disasters, and other perils. Whether you operate your own warehouse or use third-party storage, our policies protect your property and goods, ensuring business continuity in case of loss or damage.",
  featuresTitle: "Warehouse Coverage Features",
  featuresSubtitle: "Complete protection for storage facilities and inventory.",
  features: [
    { icon: Building2, title: "Property Coverage", description: "Building structure, equipment, and fixtures protection against fire and theft." },
    { icon: Boxes, title: "Inventory Coverage", description: "Stored goods and inventory protected against all-risks including fire and water damage." },
    { icon: Shield, title: "Business Interruption", description: "Coverage for lost income if your warehouse is damaged and operations interrupted." },
    { icon: Clock, title: "Rapid Restoration", description: "Quick claims processing and support to get your warehouse back in operation." },
  ],
  cargoTypes: [
    "General merchandise inventory",
    "Perishable goods storage",
    "Hazardous material storage",
    "High-value electronics and goods",
    "Agricultural products",
    "Industrial raw materials",
  ],
  highlightsTitle: "Warehouse Insurance Highlights",
  highlights: [
    "Coverage for bonded and non-bonded warehouses",
    "Fire, theft, and natural disaster protection",
    "Business interruption coverage included",
    "Annual or multi-year policy options",
    "Inventory valuation support",
    "24-hour emergency hotline",
  ],
  processSteps: [
    { step: "01", title: "Facility Assessment", description: "Provide warehouse location, size, construction, security features, and inventory value." },
    { step: "02", title: "Risk Evaluation", description: "Our underwriters assess facility conditions and recommend appropriate coverage." },
    { step: "03", title: "Policy Customization", description: "Policy is customized with your specific property and inventory protection needs." },
    { step: "04", title: "Claims Handling", description: "Fast claims assessment and settlement for property damage or inventory loss." },
  ],
  relatedServices: [
    { icon: Ship, label: "Marine Cargo Insurance" },
    { icon: Truck, label: "Inland Transit Insurance" },
    { icon: FileCheck, label: "Freight Forwarder Liability" },
  ],
  relatedDescription: "Combine warehouse coverage with cargo and liability insurance for complete property and inventory protection.",
  ctaLabel: "Get Warehouse Quote",
};

export const intermodalSolutionsContent: ServicePageContent = {
  badge: "Intermodal Solutions",
  icon: Container,
  heroImage: sliderIntermodal,
  heroImageAlt: "Intermodal logistics with container transfer",
  title: "Seamless Intermodal Logistics Solutions",
  heroDescription:
    "Integrated multi-modal transport combining sea, rail, and road freight for efficient, cost-effective cargo delivery across East Africa and global markets.",
  overviewTitle: "Multi-Modal Transport for Modern Supply Chains",
  overviewDescription:
    "Mapett Logistics offers comprehensive intermodal transport solutions that combine the cost-efficiency of ocean freight, the reliability of rail transport, and the flexibility of road delivery. Our integrated approach ensures seamless cargo movement from origin to destination, reducing transit times, lowering costs, and improving supply chain visibility.",
  featuresTitle: "Why Choose Our Intermodal Services",
  featuresSubtitle: "Optimized multi-modal transport for faster, more efficient cargo delivery.",
  features: [
    { icon: Route, title: "Seamless Transfers", description: "Expert cargo handling at intermodal terminals with secure container transfers between transport modes." },
    { icon: Globe, title: "Global Connectivity", description: "Connections to major ports, rail networks, and highway systems ensuring worldwide reach." },
    { icon: Package, title: "Container Consolidation", description: "Efficient load planning and container utilization maximizing space and minimizing costs." },
    { icon: Shield, title: "End-to-End Visibility", description: "Real-time tracking across all transport modes with proactive monitoring and updates." },
  ],
  cargoTypes: [
    "Containerized general cargo",
    "Automotive and spare parts",
    "Industrial machinery and equipment",
    "Retail and FMCG products",
    "Construction materials and hardware",
    "Agricultural and food products",
  ],
  highlightsTitle: "Our Intermodal Capabilities",
  highlights: [
    "Mombasa Port to Inland destinations via rail and road",
    "Connections to Nairobi, Kampala, Kigali, and Dar es Salaam",
    "Standard 20ft, 40ft, and specialized container handling",
    "Temperature-controlled intermodal solutions",
    "Customs clearance integrated at all terminals",
    "Real-time cargo tracking across all transport legs",
  ],
  processSteps: [
    { step: "01", title: "Route Planning", description: "We analyze your cargo, origin, and destination to design the optimal intermodal route with best transit times." },
    { step: "02", title: "Booking & Coordination", description: "We coordinate with all partners — shipping lines, rail operators, and transport companies — for seamless execution." },
    { step: "03", title: "Cargo Movement", description: "Your cargo moves through multiple transport modes with secure handling and real-time tracking updates." },
    { step: "04", title: "Final Delivery", description: "Cargo is delivered to your specified destination with full documentation and proof of delivery." },
  ],
  relatedServices: [
    { icon: Ship, label: "Ocean Freight" },
    { icon: Truck, label: "Road & Rail Transport" },
    { icon: FileCheck, label: "Customs Clearance" },
  ],
  relatedDescription: "Combine intermodal solutions with our customs clearance and specialized cargo services for a complete logistics package.",
  ctaLabel: "Request Intermodal Quote",
};