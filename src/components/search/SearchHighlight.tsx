import { useMemo } from "react";
import { findHighlightRanges, tokenize } from "@/lib/search/text";

interface HighlightSegment {
  text: string;
  highlighted: boolean;
}

interface SearchHighlightProps {
  text: string;
  query: string;
}

const buildSegments = (text: string, query: string): HighlightSegment[] => {
  const terms = tokenize(query);
  if (terms.length === 0) return [{ text, highlighted: false }];

  const ranges = findHighlightRanges(text, terms);
  if (ranges.length === 0) return [{ text, highlighted: false }];

  const segments: HighlightSegment[] = [];
  let cursor = 0;

  for (const range of ranges) {
    if (range.start > cursor) {
      segments.push({ text: text.slice(cursor, range.start), highlighted: false });
    }
    segments.push({ text: text.slice(range.start, range.end), highlighted: true });
    cursor = range.end;
  }

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), highlighted: false });
  }

  return segments;
};

/** Renders text with the matched query terms emphasised. */
export const SearchHighlight = ({ text, query }: SearchHighlightProps) => {
  const segments = useMemo(() => buildSegments(text, query), [text, query]);

  return (
    <>
      {segments.map((segment, index) =>
        segment.highlighted ? (
          <mark
            key={index}
            className="rounded bg-primary/15 font-semibold text-primary"
          >
            {segment.text}
          </mark>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </>
  );
};
