import type { ServicePageContent } from "@/components/ServicePageLayout";

/** Maximum length of a description shown in the results list. */
export const DESCRIPTION_LIMIT = 150;

/** Trims copy to a single tidy line without cutting mid-word. */
export const summarizeCopy = (value: string, limit: number = DESCRIPTION_LIMIT): string => {
  const collapsed = value.replace(/\s+/g, " ").trim();
  if (collapsed.length <= limit) return collapsed;

  const cut = collapsed.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}...`;
};

/**
 * Pulls every meaningful piece of copy out of a service page (features, cargo
 * types, highlights, process steps, related services) so that searching for
 * something like "vaccines" or "heavy lift" finds the right page even though
 * those words only appear in the page body.
 */
export const extractServiceKeywords = (content: ServicePageContent): string[] => [
  content.badge,
  content.title,
  content.overviewTitle,
  content.overviewDescription,
  ...content.features.flatMap((feature) => [feature.title, feature.description]),
  ...content.cargoTypes,
  ...content.highlights,
  ...content.processSteps.flatMap((step) => [step.title, step.description]),
  ...content.relatedServices.map((related) => related.label),
  content.ctaLabel,
];
