import { useEffect, useState, useCallback } from "react";

const KEY = "vanta-ui:favorites";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function emit(list: string[]) {
  window.dispatchEvent(new CustomEvent("vanta:favorites", { detail: list }));
}

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    setFavs(read());
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string[]>).detail;
      setFavs(detail ?? read());
    };
    window.addEventListener("vanta:favorites", handler);
    window.addEventListener("storage", () => setFavs(read()));
    return () => window.removeEventListener("vanta:favorites", handler);
  }, []);

  const toggle = useCallback((slug: string) => {
    const next = read();
    const i = next.indexOf(slug);
    if (i >= 0) next.splice(i, 1);
    else next.push(slug);
    localStorage.setItem(KEY, JSON.stringify(next));
    emit(next);
    return i < 0; // true if added
  }, []);

  const has = useCallback((slug: string) => favs.includes(slug), [favs]);

  return { favs, toggle, has };
}