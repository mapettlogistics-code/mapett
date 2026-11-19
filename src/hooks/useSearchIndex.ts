import { useEffect, useMemo, useState } from "react";
import { createSearchIndex } from "@/lib/search/searchEngine";
import { fetchRemoteSearchItems } from "@/lib/search/remoteIndex";
import { STATIC_SEARCH_ITEMS } from "@/lib/search/staticIndex";
import type { SearchItem } from "@/lib/search/types";

/**
 * Module-level cache: products and blog posts are fetched once per page load,
 * no matter how many times the dialog is opened.
 */
let cachedRemoteItems: SearchItem[] | null = null;
let remoteRequest: Promise<SearchItem[]> | null = null;

const loadRemoteItems = (): Promise<SearchItem[]> => {
  if (cachedRemoteItems) return Promise.resolve(cachedRemoteItems);

  if (!remoteRequest) {
    remoteRequest = fetchRemoteSearchItems().then((items) => {
      cachedRemoteItems = items;
      remoteRequest = null;
      return items;
    });
  }

  return remoteRequest;
};

export interface SearchIndexState {
  index: ReturnType<typeof createSearchIndex>;
  /** True while the live products/blog posts are still being fetched. */
  isLoading: boolean;
  /** Total number of searchable records currently in the index. */
  itemCount: number;
}

/**
 * Builds the full search index: the static site index plus live products and
 * blog posts from Supabase.
 */
export const useSearchIndex = (): SearchIndexState => {
  const [remoteItems, setRemoteItems] = useState<SearchItem[]>(cachedRemoteItems ?? []);
  const [isLoading, setIsLoading] = useState(cachedRemoteItems === null);

  useEffect(() => {
    if (cachedRemoteItems) {
      setRemoteItems(cachedRemoteItems);
      setIsLoading(false);
      return;
    }

    let isActive = true;
    setIsLoading(true);

    loadRemoteItems()
      .then((items) => {
        if (!isActive) return;
        setRemoteItems(items);
        setIsLoading(false);
      })
      .catch(() => {
        if (!isActive) return;
        setRemoteItems([]);
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const index = useMemo(
    () => createSearchIndex([...STATIC_SEARCH_ITEMS, ...remoteItems]),
    [remoteItems],
  );

  return {
    index,
    isLoading,
    itemCount: index.length,
  };
};
