import { prepareItem, scorePreparedItem, type PreparedItem } from "./score";
import type { SearchCategoryId, SearchGroup, SearchItem, SearchResult } from "./types";

/** Presentation order + labels for the grouped result list. */
export const SEARCH_CATEGORIES: Record<SearchCategoryId, { label: string; order: number }> = {
  services: { label: "Logistics Services", order: 1 },
  insurance: { label: "Insurance Policies", order: 2 },
  travel: { label: "Travel Solutions", order: 3 },
  shop: { label: "Autostore & Seals", order: 4 },
  products: { label: "Products", order: 5 },
  blog: { label: "Blog & Insights", order: 6 },
  pages: { label: "Pages", order: 7 },
  support: { label: "Help & Contact", order: 8 },
};

export const CATEGORY_ORDER: SearchCategoryId[] = (
  Object.keys(SEARCH_CATEGORIES) as SearchCategoryId[]
).sort((a, b) => SEARCH_CATEGORIES[a].order - SEARCH_CATEGORIES[b].order);

/** How many results a single category may contribute to the dropdown. */
export const MAX_RESULTS_PER_CATEGORY = 5;

/** Hard ceiling on the total number of results considered. */
export const MAX_TOTAL_RESULTS = 60;

export const createSearchIndex = (items: SearchItem[]): PreparedItem[] =>
  items.map(prepareItem);

/**
 * Runs a query over a prepared index and returns results ordered by relevance.
 * The category is used only as a tiebreaker so an exact title match in a
 * lower-priority category still outranks a fuzzy hit in a higher one.
 */
export const searchIndex = (
  index: PreparedItem[],
  query: string,
  limit: number = MAX_TOTAL_RESULTS,
): SearchResult[] => {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];

  for (const prepared of index) {
    const match = scorePreparedItem(prepared, query);
    if (!match) continue;

    results.push({ ...prepared.item, score: match.score, matchedField: match.matchedField });
  }

  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;

    const orderA = SEARCH_CATEGORIES[a.categoryId].order;
    const orderB = SEARCH_CATEGORIES[b.categoryId].order;
    if (orderA !== orderB) return orderA - orderB;

    return a.title.localeCompare(b.title);
  });

  return results.slice(0, limit);
};

/**
 * Groups results for display, capping each category so no single source (for
 * example a large product catalogue) buries everything else.
 */
export const groupSearchResults = (
  results: SearchResult[],
  perCategoryLimit: number = MAX_RESULTS_PER_CATEGORY,
): SearchGroup[] => {
  const buckets = new Map<SearchCategoryId, SearchResult[]>();

  for (const result of results) {
    const bucket = buckets.get(result.categoryId);
    if (bucket) {
      bucket.push(result);
    } else {
      buckets.set(result.categoryId, [result]);
    }
  }

  return CATEGORY_ORDER.filter((id) => buckets.has(id)).map((id) => ({
    categoryId: id,
    label: SEARCH_CATEGORIES[id].label,
    results: (buckets.get(id) ?? []).slice(0, perCategoryLimit),
  }));
};

/** Flattens groups back into display order for keyboard navigation. */
export const flattenGroups = (groups: SearchGroup[]): SearchResult[] =>
  groups.flatMap((group) => group.results);
