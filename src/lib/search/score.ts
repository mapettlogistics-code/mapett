import type { MatchedField, SearchItem } from "./types";
import { isSubsequence, normalizeText, tokenize } from "./text";

/**
 * Field weights. Higher means a match there outranks a match lower down, so an
 * exact title hit always beats a description hit.
 */
export const FIELD_WEIGHTS = {
  titleExact: 120,
  titlePrefix: 90,
  titleWord: 70,
  titleIncludes: 55,
  keywordIncludes: 34,
  descriptionIncludes: 20,
  categoryIncludes: 12,
  fuzzyTitle: 9,
  fuzzyKeyword: 6,
} as const;

/** Bonus added when the whole (multi-word) query appears as a run somewhere. */
export const PHRASE_BONUS = {
  titleExact: 220,
  titlePrefix: 130,
  titleIncludes: 85,
  keywordIncludes: 45,
  descriptionIncludes: 20,
} as const;

/** Minimum token length before fuzzy (typo-tolerant) matching is allowed. */
export const MIN_FUZZY_LENGTH = 4;

const FIELD_RANK: Record<MatchedField, number> = {
  title: 4,
  keywords: 3,
  description: 2,
  category: 1,
};

export interface PreparedItem {
  item: SearchItem;
  normalizedTitle: string;
  normalizedKeywords: string;
  normalizedDescription: string;
  normalizedCategory: string;
  /** Everything, used for a cheap "can this item possibly match" gate. */
  haystack: string;
  titleWords: string[];
}

export const prepareItem = (item: SearchItem): PreparedItem => {
  const normalizedTitle = normalizeText(item.title);
  const normalizedKeywords = normalizeText((item.keywords ?? []).join(" "));
  const normalizedDescription = normalizeText(item.description);
  const normalizedCategory = normalizeText(item.categoryId);

  return {
    item,
    normalizedTitle,
    normalizedKeywords,
    normalizedDescription,
    normalizedCategory,
    haystack: `${normalizedTitle} ${normalizedKeywords} ${normalizedDescription} ${normalizedCategory}`,
    titleWords: normalizedTitle.split(" ").filter(Boolean),
  };
};

interface FieldMatch {
  points: number;
  field: MatchedField;
}

const scoreTokenInTitle = (
  title: string,
  titleWords: string[],
  token: string,
): FieldMatch | null => {
  if (title === token) return { points: FIELD_WEIGHTS.titleExact, field: "title" };
  if (title.startsWith(token)) return { points: FIELD_WEIGHTS.titlePrefix, field: "title" };
  if (titleWords.includes(token)) return { points: FIELD_WEIGHTS.titleWord, field: "title" };
  if (title.includes(token)) return { points: FIELD_WEIGHTS.titleIncludes, field: "title" };
  return null;
};

/**
 * Scores a single query token against one item, returning the best field it
 * matched and how many points it earned.
 */
const scoreToken = (prepared: PreparedItem, token: string): FieldMatch | null => {
  const titleMatch = scoreTokenInTitle(prepared.normalizedTitle, prepared.titleWords, token);
  if (titleMatch) return titleMatch;

  if (prepared.normalizedKeywords.includes(token)) {
    return { points: FIELD_WEIGHTS.keywordIncludes, field: "keywords" };
  }
  if (prepared.normalizedDescription.includes(token)) {
    return { points: FIELD_WEIGHTS.descriptionIncludes, field: "description" };
  }
  if (prepared.normalizedCategory.includes(token)) {
    return { points: FIELD_WEIGHTS.categoryIncludes, field: "category" };
  }

  // Typo tolerance: only for reasonably long tokens, and only as a last resort.
  if (token.length >= MIN_FUZZY_LENGTH) {
    if (isSubsequence(token, prepared.normalizedTitle)) {
      return { points: FIELD_WEIGHTS.fuzzyTitle, field: "title" };
    }
    if (isSubsequence(token, prepared.normalizedKeywords)) {
      return { points: FIELD_WEIGHTS.fuzzyKeyword, field: "keywords" };
    }
  }

  return null;
};

const scorePhrase = (prepared: PreparedItem, phrase: string): number => {
  if (!phrase.includes(" ")) return 0;

  if (prepared.normalizedTitle === phrase) return PHRASE_BONUS.titleExact;
  if (prepared.normalizedTitle.startsWith(phrase)) return PHRASE_BONUS.titlePrefix;
  if (prepared.normalizedTitle.includes(phrase)) return PHRASE_BONUS.titleIncludes;
  if (prepared.normalizedKeywords.includes(phrase)) return PHRASE_BONUS.keywordIncludes;
  if (prepared.normalizedDescription.includes(phrase)) return PHRASE_BONUS.descriptionIncludes;
  return 0;
};

/**
 * Scores a prepared item against a raw query. Returns null when the item is not
 * a match at all. Multi-word queries use AND semantics (every token must land
 * somewhere), which keeps results predictable.
 */
export const scorePreparedItem = (
  prepared: PreparedItem,
  rawQuery: string,
): { score: number; matchedField: MatchedField } | null => {
  const phrase = normalizeText(rawQuery);
  const tokens = tokenize(rawQuery);

  if (!phrase || tokens.length === 0) return null;

  let score = 0;
  let matchedField: MatchedField = "category";

  for (const token of tokens) {
    const match = scoreToken(prepared, token);
    if (!match) return null;

    score += match.points;
    if (FIELD_RANK[match.field] > FIELD_RANK[matchedField]) {
      matchedField = match.field;
    }
  }

  score += scorePhrase(prepared, phrase);

  return { score, matchedField };
};

/** Convenience wrapper used by the engine and by tests. */
export const scoreItem = (item: SearchItem, rawQuery: string) =>
  scorePreparedItem(prepareItem(item), rawQuery);
