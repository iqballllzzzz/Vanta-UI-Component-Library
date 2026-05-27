import { createFileRoute, Link } from "@tanstack/react-router";
import { useFavorites } from "@/hooks/use-favorites";
import { COMPONENTS } from "@/lib/components-data";
import { Preview } from "@/components/vanta/Preview";
import { Bookmark } from "lucide-react";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Favorites — Vanta UI" },
      { name: "description", content: "Your bookmarked Vanta UI components." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favs } = useFavorites();
  const items = COMPONENTS.filter((c) => favs.includes(c.slug));
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-4xl font-medium tracking-tight">Favorites</h1>
          <p className="text-body mt-2">{items.length} bookmarked component{items.length === 1 ? "" : "s"}. Saved locally to your browser.</p>
        </div>
      </div>
      {items.length === 0 ? (
        <div className="mt-16 text-center border border-dashed border-hairline rounded-xl py-16">
          <Bookmark className="h-8 w-8 mx-auto text-mute" />
          <div className="text-ink mt-3 font-medium">No favorites yet</div>
          <p className="text-body mt-1 text-sm">Tap the Save button on any component to keep it here.</p>
          <Link to="/components" className="inline-flex mt-5 h-9 px-4 rounded-md bg-ink text-white text-sm items-center">Browse components</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {items.map((c) => (
            <Link key={c.slug} to="/components/$slug" params={{ slug: c.slug }} className="group">
              <div className="border border-hairline rounded-xl overflow-hidden bg-canvas-soft hover:border-hairline-strong">
                <div className="bg-canvas"><Preview kind={c.kind} variant={c.variant} /></div>
                <div className="p-3 flex justify-between items-center">
                  <div className="text-sm font-medium text-ink">{c.name}</div>
                  <span className="text-[10px] font-mono uppercase text-mute">{c.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}