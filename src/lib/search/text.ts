const COMBINING_MARKS = /[\u0300-\u036f]/g;
const COMBINING_MARK_CHAR = /[\u0300-\u036f]/;
const NON_ALPHANUMERIC = /[^a-z0-9]+/g;

/**
 * Canonical form used for matching: lowercase, accent-stripped, punctuation
 * collapsed to single spaces. "Customs Clearing & Forwarding" -> "customs clearing forwarding".
 */
export const normalizeText = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .replace(NON_ALPHANUMERIC, " ")
    .trim();

export const tokenize = (value: string): string[] =>
  normalizeText(value).split(" ").filter(Boolean);

/**
 * Character-level alignment between a raw string and its {@link normalizeText}
 * form, so a match found in the normalised string can be mapped back to the
 * exact range in the original text for highlighting.
 */
export interface NormalizedText {
  value: string;
  /** map[i] is the index in the source string that produced value[i]. */
  map: number[];
}

export const buildNormalizedText = (source: string): NormalizedText => {
  const lowercased = source.toLowerCase().normalize("NFD");
  const map: number[] = [];
  let value = "";
  let awaitingSpace = false;

  for (let index = 0; index < lowercased.length; index += 1) {
    const char = lowercased[index];

    if (COMBINING_MARK_CHAR.test(char)) {
      continue;
    }

    if (/[a-z0-9]/.test(char)) {
      if (awaitingSpace) {
        value += " ";
        map.push(index);
        awaitingSpace = false;
      }
      value += char;
      map.push(index);
      continue;
    }

    // Any run of non-alphanumeric characters collapses to a single space, but
    // only once a following alphanumeric character actually appears (trimming).
    if (value.length > 0) {
      awaitingSpace = true;
    }
  }

  return { value, map };
};

/** Maps a [start, end) range in normalised text back to the source string. */
export const mapRangeToSource = (
  normalized: NormalizedText,
  start: number,
  end: number,
): [number, number] => {
  const firstIndex = normalized.map[start];
  const lastIndex = normalized.map[end - 1];
  if (firstIndex === undefined || lastIndex === undefined) {
    return [0, 0];
  }
  return [firstIndex, lastIndex + 1];
};

export interface TextRange {
  start: number;
  end: number;
}

/**
 * Finds every occurrence of each term in the source text and returns the
 * (merged, non-overlapping) ranges to highlight.
 */
export const findHighlightRanges = (source: string, terms: string[]): TextRange[] => {
  const normalized = buildNormalizedText(source);
  if (!normalized.value) return [];

  const matches: TextRange[] = [];

  for (const term of terms) {
    const needle = normalizeText(term);
    if (!needle) continue;

    let from = 0;
    while (from <= normalized.value.length - needle.length) {
      const at = normalized.value.indexOf(needle, from);
      if (at === -1) break;
      const [start, end] = mapRangeToSource(normalized, at, at + needle.length);
      if (end > start) matches.push({ start, end });
      from = at + needle.length;
    }
  }

  if (matches.length === 0) return [];

  matches.sort((a, b) => a.start - b.start);

  return matches.reduce<TextRange[]>((merged, range) => {
    const previous = merged[merged.length - 1];
    if (previous && range.start <= previous.end) {
      previous.end = Math.max(previous.end, range.end);
      return merged;
    }
    merged.push({ ...range });
    return merged;
  }, []);
};

/**
 * True when every character of `needle` appears in `haystack` in order.
 * Used as a low-weight fallback so near-miss typos still find something.
 */
export const isSubsequence = (needle: string, haystack: string): boolean => {
  if (!needle) return false;
  if (haystack.includes(needle)) return true;

  let position = 0;
  for (let index = 0; index < haystack.length && position < needle.length; index += 1) {
    if (haystack[index] === needle[position]) position += 1;
  }
  return position === needle.length;
};
