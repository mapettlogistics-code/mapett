import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import type { SearchItem } from "@/lib/search/types";

/** Delay before re-attempting a hash scroll while a page finishes rendering. */
const HASH_SCROLL_DELAYS_MS = [120, 420];

interface SearchContextValue {
  isOpen: boolean;
  query: string;
  setQuery: (value: string) => void;
  openSearch: (initialQuery?: string) => void;
  closeSearch: () => void;
  /** Navigates to a result (internal route, hash section or external link). */
  goToResult: (item: SearchItem) => void;
  recentSearches: string[];
  recordSearch: (term: string) => void;
  clearRecentSearches: () => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

const isTypingTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  const tagName = target.tagName.toLowerCase();
  return tagName === "input" || tagName === "textarea" || tagName === "select" || target.isContentEditable;
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { recentSearches, addRecentSearch, clearRecentSearches } = useRecentSearches();

  const openSearch = useCallback((initialQuery = "") => {
    setQuery(initialQuery);
    setIsOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
  }, []);

  const recordSearch = useCallback((term: string) => addRecentSearch(term), [addRecentSearch]);

  /** Scrolls a home-page hash section into view, retrying while it renders. */
  const scrollToHashSection = useCallback((hash: string) => {
    HASH_SCROLL_DELAYS_MS.forEach((delay) => {
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, delay);
    });
  }, []);

  const goToResult = useCallback(
    (item: SearchItem) => {
      setIsOpen(false);

      if (item.external) {
        window.open(item.path, "_blank", "noopener,noreferrer");
        return;
      }

      const [pathname, hash] = item.path.split("#");

      if (hash) {
        navigate(pathname ? `${pathname}#${hash}` : `/#${hash}`);
        scrollToHashSection(hash);
        return;
      }

      navigate(pathname || "/");
    },
    [navigate, scrollToHashSection],
  );

  /** Cmd/Ctrl+K opens the search from anywhere in the app. */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (isShortcut) {
        event.preventDefault();
        setIsOpen((current) => {
          if (current) return false;
          setQuery("");
          return true;
        });
        return;
      }

      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        return;
      }

      if (event.key === "/" && !isOpen && !isTypingTarget(event.target)) {
        event.preventDefault();
        setQuery("");
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const value = useMemo<SearchContextValue>(
    () => ({
      isOpen,
      query,
      setQuery,
      openSearch,
      closeSearch,
      goToResult,
      recentSearches,
      recordSearch,
      clearRecentSearches,
    }),
    [
      isOpen,
      query,
      openSearch,
      closeSearch,
      goToResult,
      recentSearches,
      recordSearch,
      clearRecentSearches,
    ],
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export const useSearch = (): SearchContextValue => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
