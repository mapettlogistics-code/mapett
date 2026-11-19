import type { ServicePageContent } from "@/components/ServicePageLayout";
import {
  airFreightContent,
  CustomsClearingForwardingContent,
  intermodalSolutionsContent,
  oceanFreightContent,
  refrigeratedCargoContent,
  roadRailTransportContent,
  specialCargoContent,
  warehousingContent,
} from "@/data/servicePages";
import { extractServiceKeywords, summarizeCopy } from "../contentKeywords";
import type { SearchItem } from "../types";

interface ServiceDefinition {
  id: string;
  title: string;
  path: string;
  content: ServicePageContent;
  /** Everyday words people use that never appear verbatim on the page. */
  synonyms: string[];
}

const serviceDefinitions: ServiceDefinition[] = [
  {
    id: "service:air-freight",
    title: "Air Freight",
    path: "/air-freight",
    content: airFreightContent,
    synonyms: ["air cargo", "cargo plane", "jika", "jkia", "airport", "express delivery", "urgent shipment", "airway bill"],
  },
  {
    id: "service:customs",
    title: "Customs Clearing & Forwarding",
    path: "/customs-clearing-forwarding",
    content: CustomsClearingForwardingContent,
    synonyms: ["customs", "customs clearance", "clearing agent", "forwarding", "kra", "import duty", "excise", "declaration", "clearing and forwarding", "import", "export"],
  },
  {
    id: "service:ocean-freight",
    title: "Ocean Freight",
    path: "/ocean-freight",
    content: oceanFreightContent,
    synonyms: ["sea freight", "shipping", "container", "fcl", "lcl", "mombasa port", "shipping line", "vessel", "cargo ship"],
  },
  {
    id: "service:road-rail",
    title: "Road & Rail Transport",
    path: "/road-rail-transport",
    content: roadRailTransportContent,
    synonyms: ["trucking", "truck", "lorry", "inland transport", "sgr", "railway", "cross border", "uganda", "tanzania", "rwanda", "south sudan", "last mile", "delivery"],
  },
  {
    id: "service:refrigerated-cargo",
    title: "Refrigerated Cargo",
    path: "/refrigerated-cargo",
    content: refrigeratedCargoContent,
    synonyms: ["cold chain", "reefer", "temperature controlled", "perishable", "frozen", "pharmaceutical", "vaccines", "flowers", "fresh produce", "chilled"],
  },
  {
    id: "service:special-cargo",
    title: "Special Cargo",
    path: "/special-cargo",
    content: specialCargoContent,
    synonyms: ["heavy lift", "oversized", "out of gauge", "abnormal load", "project cargo", "machinery", "lowbed", "escort", "generators", "transformers"],
  },
  {
    id: "service:warehousing",
    title: "Warehousing & Storage",
    path: "/warehousing",
    content: warehousingContent,
    synonyms: ["warehouse", "storage", "inventory", "pick and pack", "fulfilment", "fulfillment", "bonded warehouse", "distribution", "3pl"],
  },
  {
    id: "service:intermodal",
    title: "Intermodal Solutions",
    path: "/intermodal-solutions",
    content: intermodalSolutionsContent,
    synonyms: ["multimodal", "multi modal", "intermodal transport", "consolidation", "rail and road", "container transfer", "supply chain"],
  },
];

export const serviceSearchItems: SearchItem[] = serviceDefinitions.map((definition) => ({
  id: definition.id,
  title: definition.title,
  description: summarizeCopy(definition.content.heroDescription),
  categoryId: "services",
  path: definition.path,
  keywords: [...extractServiceKeywords(definition.content), ...definition.synonyms],
}));
