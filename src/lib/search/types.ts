export type SearchCategoryId =
  | "services"
  | "insurance"
  | "travel"
  | "shop"
  | "products"
  | "blog"
  | "pages"
  | "support";

/**
 * A single searchable record. Everything on the site that a visitor might
 * reasonably look for is represented as one of these.
 */
export interface SearchItem {
  /** Stable unique id (prefixed by its source, e.g. "service:air-freight"). */
  id: string;
  title: string;
  description: string;
  categoryId: SearchCategoryId;
  /** Internal route ("/air-freight", "/#contact") or absolute external URL. */
  path: string;
  /** True when `path` leaves the site (opened in a new tab). */
  external?: boolean;
  /** Short trailing label, e.g. a product price or "New". */
  badge?: string;
  /** Extra terms that should match this item (cargo types, coverage, synonyms). */
  keywords?: string[];
}

export type MatchedField = "title" | "keywords" | "description" | "category";

export interface SearchResult extends SearchItem {
  score: number;
  matchedField: MatchedField;
}

export interface SearchGroup {
  categoryId: SearchCategoryId;
  label: string;
  results: SearchResult[];
}

export interface SearchCategoryMeta {
  id: SearchCategoryId;
  label: string;
  /** Lower number ranks higher in grouped result output. */
  order: number;
}
