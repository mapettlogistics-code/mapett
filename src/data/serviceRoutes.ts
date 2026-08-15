export const servicePageLinks: Record<string, string> = {
  "Air Freight": "/air-freight",
  "Customs Clearance": "/customs-clearance",
  "Ocean Freight": "/ocean-freight",
  "Road & Rail Transport": "/road-rail-transport",
  "Road Transport": "/road-rail-transport",
  "Refrigerated Cargo": "/refrigerated-cargo",
  "Refrigerated Cargo Clearance & Transport": "/refrigerated-cargo",
  "Special Cargo": "/special-cargo",
  "Special Cargo Clearance & Transport": "/special-cargo",
  "Warehousing": "/warehousing",
  "Insurance": "/insurance",
  "Marine Cargo Insurance": "/marine-cargo-insurance",
  "Air Cargo Insurance": "/air-cargo-insurance",
  "Inland Transit Insurance": "/inland-transit-insurance",
  "Motor Vehicle Insurance": "/motor-vehicle-insurance",
  "Freight Forwarder Liability": "/freight-forwarder-liability",
  "WIBA & Employees Liability": "/wiba-employees-coverage",
  "Life Insurance": "/life-insurance",
  "Warehouse Insurance": "/warehouse-insurance",
  "Cargo Insurance": "/#insurance",
};

export const getServicePageLink = (serviceName: string) =>
  servicePageLinks[serviceName] ?? "/products-services";
