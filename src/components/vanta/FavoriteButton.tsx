import { Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";
import { useFavorites } from "@/hooks/use-favorites";

export function FavoriteButton({ slug, name }: { slug: string; name: string }) {
  const { has, toggle } = useFavorites();
  const active = has(slug);
  return (
    <button
      onClick={() => {
        const added = toggle(slug);
        toast[added ? "success" : "message"](
          added ? `Added ${name} to favorites` : `Removed ${name} from favorites`,
        );
      }}
      className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-hairline text-sm transition ${active ? "bg-link/10 text-link border-link/30" : "bg-canvas hover:bg-canvas-soft"}`}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
    >
      {active ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
      {active ? "Saved" : "Save"}
    </button>
  );
}