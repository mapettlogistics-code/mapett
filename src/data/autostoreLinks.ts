export const AUTOSTORE_HOME = "https://mapett.com/";
export const AUTOSTORE_CART = "https://mapett.com/cart";

export const autostoreCollectionLinks: Record<string, string> = {
  "Automotive Lubricants": "https://mapett.com/collections/automotive-lubricants",
  "Food Grade Lubricants": "https://mapett.com/collections/food-grade-lubricants",
  "Agricultural Lubricants": "https://mapett.com/collections/agricultural-lubricants",
  "Construction Lubricants": "https://mapett.com/collections/construction-lubricants",
  "Industrial Lubricants": "https://mapett.com/collections/industrial-construction-lubricants",
  "Seals & Tags": "https://mapett.com/collections/seals-tags",
};

export const autostoreMenuItems = [
  { name: "Automotive Lubricants", href: autostoreCollectionLinks["Automotive Lubricants"] },
  { name: "Food Grade Lubricants", href: autostoreCollectionLinks["Food Grade Lubricants"] },
  { name: "Agricultural Lubricants", href: autostoreCollectionLinks["Agricultural Lubricants"] },
  { name: "Construction Lubricants", href: autostoreCollectionLinks["Construction Lubricants"] },
  { name: "Industrial Lubricants", href: autostoreCollectionLinks["Industrial Lubricants"] },
  { name: "Vehicle Accessories", href: AUTOSTORE_HOME },
  { name: "Seals & Tags", href: autostoreCollectionLinks["Seals & Tags"] },
];

export const getAutostoreLink = (name: string) =>
  autostoreCollectionLinks[name] ?? AUTOSTORE_HOME;
