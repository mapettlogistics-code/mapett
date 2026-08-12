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
  "Cargo Insurance": "/#insurance",
};

export const getServicePageLink = (serviceName: string) =>
  servicePageLinks[serviceName] ?? "/products-services";
