import {
  airCargoInsuranceContent,
  freightForwarderLiabilityContent,
  inlandTransitInsuranceContent,
  insuranceContent,
  lifeInsuranceContent,
  marineCargoInsuranceContent,
  warehouseInsuranceContent,
  wibaEmployeesCoverageContent,
} from "@/data/servicePages";
import { extractServiceKeywords, summarizeCopy } from "../contentKeywords";
import type { SearchItem } from "../types";

interface InsuranceDefinition {
  id: string;
  title: string;
  path: string;
  keywords: string[];
  description: string;
}

const coverage = (
  content: Parameters<typeof extractServiceKeywords>[0],
  policyTerms: string[],
  synonyms: string[],
): string[] => [...extractServiceKeywords(content), ...policyTerms, ...synonyms];

/**
 * The overview entry points at the insurance hub, which is where the quote form
 * and premium calculator live.
 */
const overviewItem: SearchItem = {
  id: "insurance:overview",
  title: "All Insurance Policies",
  description: summarizeCopy(insuranceContent.heroDescription),
  categoryId: "insurance",
  path: "/insurance",
  keywords: coverage(insuranceContent, [], [
    "insurance",
    "insure",
    "cover",
    "coverage",
    "premium calculator",
    "insurance calculator",
    "insurance quote",
    "get a quote",
    "apply for insurance",
    "underwriter",
    "britam",
    "sanlam",
  ]),
};

const policyDefinitions: InsuranceDefinition[] = [
  {
    id: "insurance:marine-cargo",
    title: "Marine Cargo Insurance",
    path: "/marine-cargo-insurance",
    description: summarizeCopy(marineCargoInsuranceContent.heroDescription),
    keywords: coverage(marineCargoInsuranceContent, ["All Risk Cover", "War & Strikes", "General Average", "Warehouse to Warehouse"], [
      "sea cargo insurance",
      "ocean cargo",
      "shipping insurance",
      "import cover",
      "export cover",
      "container insurance",
    ]),
  },
  {
    id: "insurance:air-cargo",
    title: "Air Cargo Insurance",
    path: "/air-cargo-insurance",
    description: summarizeCopy(airCargoInsuranceContent.heroDescription),
    keywords: coverage(airCargoInsuranceContent, ["Transit Coverage", "Loading/Unloading", "Customs Storage", "Door to Door"], [
      "air freight insurance",
      "airway bill cover",
      "air shipment protection",
      "flight cargo cover",
    ]),
  },
  {
    id: "insurance:inland-transit",
    title: "Inland Transit Insurance",
    path: "/inland-transit-insurance",
    description: summarizeCopy(inlandTransitInsuranceContent.heroDescription),
    keywords: coverage(inlandTransitInsuranceContent, ["Road Accidents", "Theft Protection", "Fire Damage", "Natural Disasters"], [
      "transit insurance",
      "road cover",
      "rail cover",
      "goods in transit",
      "cross border cover",
      "truck insurance",
    ]),
  },
  {
    id: "insurance:forwarder-liability",
    title: "Freight Forwarder Liability",
    path: "/freight-forwarder-liability",
    description: summarizeCopy(freightForwarderLiabilityContent.heroDescription),
    keywords: coverage(freightForwarderLiabilityContent, ["Errors & Omissions", "Vicarious Liability", "Customs Bonds", "Professional Indemnity"], [
      "professional indemnity",
      "forwarder insurance",
      "clearing agent liability",
      "logistics liability",
      "errors and omissions",
    ]),
  },
  {
    id: "insurance:wiba",
    title: "WIBA & Employees Liability",
    path: "/wiba-employees-coverage",
    description: summarizeCopy(wibaEmployeesCoverageContent.heroDescription),
    keywords: coverage(wibaEmployeesCoverageContent, ["Work Injury Benefits", "Employer Liability", "Occupational Diseases", "Compensation Cover"], [
      "wiba",
      "work injury benefit act",
      "staff insurance",
      "employee cover",
      "workplace accident",
      "employer liability",
      "payroll cover",
    ]),
  },
  {
    id: "insurance:life",
    title: "Life Insurance",
    path: "/life-insurance",
    description: summarizeCopy(lifeInsuranceContent.heroDescription),
    keywords: coverage(lifeInsuranceContent, ["Death Benefit", "Disability Cover", "Critical Illness", "Funeral Expenses"], [
      "personal insurance",
      "family protection",
      "group life",
      "term life",
      "whole life",
      "endowment",
    ]),
  },
  {
    id: "insurance:warehouse",
    title: "Warehouse Insurance",
    path: "/warehouse-insurance",
    description: summarizeCopy(warehouseInsuranceContent.heroDescription),
    keywords: coverage(warehouseInsuranceContent, ["Stock Coverage", "Equipment Protection", "Theft & Burglary", "Water Damage"], [
      "stock insurance",
      "inventory cover",
      "storage insurance",
      "fire insurance",
      "business interruption",
    ]),
  },
];

export const insuranceSearchItems: SearchItem[] = [
  overviewItem,
  ...policyDefinitions.map((policy) => ({
    id: policy.id,
    title: policy.title,
    description: policy.description,
    categoryId: "insurance" as const,
    path: policy.path,
    keywords: policy.keywords,
  })),
];
