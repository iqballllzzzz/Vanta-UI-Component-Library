import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, Command } from "lucide-react";
import { COMPONENTS, CATEGORIES } from "@/lib/components-data";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = COMPONENTS.filter(
    (c) =>
      (cat === "All" || c.category === cat) &&
      (q === "" || c.name.toLowerCase().includes(q.toLowerCase()) || c.tags.join(" ").includes(q.toLowerCase())),
  ).slice(0, 60);

  useEffect(() => setActive(0), [q, cat]);

  const go = (slug: string) => {
    setOpen(false);
    navigate({ to: "/components/$slug", params: { slug } });
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:inline-flex items-center gap-2 h-8 px-3 rounded-md border border-hairline bg-canvas text-sm text-mute hover:text-ink"
        aria-label="Open search"
      >
        <Search className="h-4 w-4" />
        <span>Search components…</span>
        <kbd className="ml-6 px-1.5 py-0.5 rounded-md border border-hairline text-[10px] font-mono">⌘K</kbd>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:inline-flex items-center gap-2 h-8 px-3 rounded-md border border-hairline bg-canvas text-sm text-mute"
        aria-hidden
      >
        <Search className="h-4 w-4" />
        <span>Search components…</span>
      </button>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm grid place-items-start pt-[10vh]" onClick={() => setOpen(false)}>
        <div
          className="bg-canvas border border-hairline rounded-xl w-[min(640px,92vw)] pop-elev overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
            else if (e.key === "Enter" && results[active]) { e.preventDefault(); go(results[active].slug); }
          }}
        >
          <div className="flex items-center gap-2 px-3 h-12 border-b border-hairline">
            <Search className="h-4 w-4 text-mute" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search 200+ components…"
              className="flex-1 bg-transparent text-sm outline-none"
              aria-label="Search components"
            />
            <kbd className="px-1.5 py-0.5 rounded-md border border-hairline text-[10px] font-mono">ESC</kbd>
          </div>
          <div className="flex gap-1 px-2 py-2 border-b border-hairline overflow-x-auto scrollbar-none">
            {["All", ...CATEGORIES].map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`h-7 px-3 text-xs rounded-full whitespace-nowrap ${cat === c ? "bg-ink text-white" : "text-body hover:bg-canvas-soft"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="max-h-[50vh] overflow-y-auto py-2">
            {results.length === 0 && <div className="px-4 py-6 text-sm text-mute text-center">No matches</div>}
            {results.map((c, i) => (
              <button
                key={c.slug}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(c.slug)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left ${i === active ? "bg-canvas-soft" : ""}`}
              >
                <Command className="h-4 w-4 text-mute" />
                <div className="flex-1">
                  <div className="text-sm text-ink">{c.name}</div>
                  <div className="text-xs text-mute">{c.description}</div>
                </div>
                <span className="text-[10px] font-mono uppercase text-mute">{c.category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}