import { AUTOSTORE_HOME, autostoreMenuItems } from "@/data/autostoreLinks";
import { SEALS_TAGS_HOME, sealsTagsMenuItems } from "@/data/sealsTagsLinks";
import { normalizeText } from "../text";
import type { SearchItem } from "../types";

const toSlug = (value: string) => normalizeText(value).replace(/\s+/g, "-");

/** Local catalogue categories served by the on-site products page. */
const productCategoryItems: SearchItem[] = [
  {
    id: "shop:products",
    title: "All Products",
    description: "Browse the full Mapett catalogue of lubricants, tyres, batteries and accessories.",
    categoryId: "shop",
    path: "/products",
    keywords: ["products", "shop", "store", "catalogue", "catalog", "buy online", "prices", "mapett store"],
  },
  {
    id: "shop:category:lubricants",
    title: "Automotive Lubricants (Catalogue)",
    description: "Engine oils, greases and coolants for vehicles and fleets.",
    categoryId: "shop",
    path: "/products?category=lubricants",
    keywords: ["lubricants", "engine oil", "motor oil", "grease", "coolant", "gear oil", "delstar", "15w40", "85w140"],
  },
  {
    id: "shop:category:tires",
    title: "Vehicle Tyres (Catalogue)",
    description: "Tyres for cars, trucks, buses and motorbikes.",
    categoryId: "shop",
    path: "/products?category=tires",
    keywords: ["tyres", "tires", "wheel", "tubeless", "radial tyre"],
  },
  {
    id: "shop:category:batteries",
    title: "Vehicle Batteries (Catalogue)",
    description: "Sturdy, trustworthy battery brands for all vehicles.",
    categoryId: "shop",
    path: "/products?category=batteries",
    keywords: ["battery", "batteries", "car battery", "truck battery", "nixgold"],
  },
  {
    id: "shop:category:accessories",
    title: "Vehicle Accessories (Catalogue)",
    description: "Seat covers, boot organisers, car fridges and more.",
    categoryId: "shop",
    path: "/products?category=accessories",
    keywords: ["accessories", "seat cover", "car fridge", "boot organiser", "car mat", "car care"],
  },
  {
    id: "shop:category:industrial",
    title: "Industrial Lubricants (Catalogue)",
    description: "Industrial oils and greases for plant and factory machinery.",
    categoryId: "shop",
    path: "/products?category=industrial",
    keywords: ["industrial lubricants", "hydraulic oil", "compressor oil", "plant machinery"],
  },
];

const autostoreDescriptions: Record<string, string> = {
  "Automotive Lubricants": "High-performance engine oils and greases for trucks, buses, cars and motorbikes.",
  "Food Grade Lubricants": "Food-safe lubricants for processing, packaging and beverage plants.",
  "Agricultural Lubricants": "Specialised lubricants for tractors, pumps and farm machinery.",
  "Construction Lubricants": "Heavy-duty lubricants for construction plant and earth-moving equipment.",
  "Industrial Lubricants": "Industrial oils and greases for factory and plant machinery.",
  "Vehicle Accessories": "Seat covers, boot organisers, car fridges and other vehicle accessories.",
  "Vehicle Batteries": "Sturdy and trustworthy battery brands for all vehicles.",
  "Vehicle Tyres": "Quality tyres for cars, trucks and motorbikes.",
  "Safety Shoes": "Durable safety shoes and protective footwear for work sites.",
};

const autostoreItems: SearchItem[] = autostoreMenuItems.map((item) => ({
  id: `shop:autostore:${toSlug(item.name)}`,
  title: item.name,
  description: autostoreDescriptions[item.name] ?? `Shop ${item.name.toLowerCase()} from Mapett Autostore.`,
  categoryId: "shop",
  path: item.href,
  external: true,
  keywords: [
    "autostore",
    "mapett autostore",
    "lubricants",
    "shop",
    normalizeText(item.name),
  ],
}));

const sealsKeywords = [
  "seal",
  "seals",
  "security seal",
  "cargo seal",
  "container seal",
  "tamper evident",
  "tamper evident tape",
  "tags",
  "seals and tags",
  "cargo security",
];

const sealsItems: SearchItem[] = sealsTagsMenuItems.map((item) => ({
  id: `shop:seals:${toSlug(item.name)}`,
  title: item.name,
  description: `${item.name} for cargo security and tamper evidence.`,
  categoryId: "shop",
  path: item.href,
  external: true,
  keywords: [...sealsKeywords, normalizeText(item.name)],
}));

const hubItems: SearchItem[] = [
  {
    id: "shop:autostore-home",
    title: "Mapett Autostore & Lubricants",
    description: "The full Autostore catalogue of lubricants, batteries, tyres and accessories.",
    categoryId: "shop",
    path: AUTOSTORE_HOME,
    external: true,
    keywords: ["autostore", "automotive shop", "lubricants shop", "mapett.com", "car parts", "spares"],
  },
  {
    id: "shop:seals-home",
    title: "Seals & Tags Store",
    description: "Security seals, tamper-evident tapes and cargo tags.",
    categoryId: "shop",
    path: SEALS_TAGS_HOME,
    external: true,
    keywords: [...sealsKeywords, "seals shop", "security products"],
  },
];

export const shopSearchItems: SearchItem[] = [
  ...hubItems,
  ...productCategoryItems,
  ...autostoreItems,
  ...sealsItems,
];
