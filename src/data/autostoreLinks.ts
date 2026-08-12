export const AUTOSTORE_HOME = "https://mapettauto.com/";
export const AUTOSTORE_CART = "https://mapettauto.com/cart";

export const autostoreCollectionLinks: Record<string, string> = {
  "Automotive Lubricants": "https://mapettauto.com/collections/automotive-lubricants",
  "Food Grade Lubricants": "https://mapettauto.com/collections/food-grade-lubricants",
  "Agricultural Lubricants": "https://mapettauto.com/collections/agricultural-lubricants",
  "Construction Lubricants": "https://mapettauto.com/collections/construction-lubricants",
  "Industrial Lubricants": "https://mapettauto.com/collections/industrial-construction-lubricants",
  "Safety Shoes": "https://mapettauto.com/collections/safety-shoes",
  "Seals & Tags": "https://mapettauto.com/collections/seals-tags",
};

export const autostoreMenuItems = [
  { name: "Automotive Lubricants", href: autostoreCollectionLinks["Automotive Lubricants"] },
  { name: "Food Grade Lubricants", href: autostoreCollectionLinks["Food Grade Lubricants"] },
  { name: "Agricultural Lubricants", href: autostoreCollectionLinks["Agricultural Lubricants"] },
  { name: "Construction Lubricants", href: autostoreCollectionLinks["Construction Lubricants"] },
  { name: "Industrial Lubricants", href: autostoreCollectionLinks["Industrial Lubricants"] },
  { name: "Vehicle Accessories", href: AUTOSTORE_HOME },
  { name: "Safety Shoes", href: autostoreCollectionLinks["Safety Shoes"] },
  { name: "Seals & Tags", href: autostoreCollectionLinks["Seals & Tags"] },
];

export const getAutostoreLink = (name: string) =>
  autostoreCollectionLinks[name] ?? AUTOSTORE_HOME;
