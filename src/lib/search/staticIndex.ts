import { insuranceSearchItems } from "./index/insurance";
import { pageSearchItems } from "./index/pages";
import { serviceSearchItems } from "./index/services";
import { shopSearchItems } from "./index/shop";
import { supportSearchItems } from "./index/support";
import { travelSearchItems } from "./index/travel";
import type { SearchItem } from "./types";

/**
 * Everything that can be known at build time: services, insurance, travel,
 * shop collections, site pages, home page sections, help and contact entry
 * points, and every service page's body copy.
 *
 * Live products and blog posts are added on top of this at runtime.
 */
export const STATIC_SEARCH_ITEMS: SearchItem[] = [
  ...serviceSearchItems,
  ...insuranceSearchItems,
  ...travelSearchItems,
  ...shopSearchItems,
  ...pageSearchItems,
  ...supportSearchItems,
];

/** Shown as quick-start chips when the search box is empty. */
export const POPULAR_SEARCHES: string[] = [
  "Air Freight",
  "Track Shipment",
  "Customs Clearance",
  "Marine Cargo Insurance",
  "Engine Oil",
  "Warehousing",
  "Visa Processing",
  "Contact Us",
];
