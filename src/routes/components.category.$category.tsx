import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { COMPONENTS, CATEGORIES, type Category } from "@/lib/components-data";
import { Preview } from "@/components/vanta/Preview";
import { Search, ArrowLeft } from "lucide-react";
import { slugify } from "@/lib/slug";

const categoryFromSlug = (slug: string): Category | null => {
  const found = CATEGORIES.find((c) => slugify(c) === slug.toLowerCase());
  return found ?? null;
};

export const Route = createFileRoute("/components/category/$category")({
  head: ({ params }) => {
    const cat = categoryFromSlug(params.category);
    return {
      meta: [
        { title: `${cat ?? "Components"} — Vanta UI` },
        { name: "description", content: `${cat ?? "All"} components in Vanta UI.` },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl p-12 text-center text-body">Category not found.</div>
  ),
});

function CategoryPage() {
  const { category } = Route.useParams();
  const cat = categoryFromSlug(category);
  if (!cat) throw notFound();
  const [q, setQ] = useState("");
  const list = COMPONENTS.filter(
    (c) => c.category === cat && (q === "" || c.name.toLowerCase().includes(q.toLowerCase())),
  );
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <Link to="/components" className="text-sm text-mute inline-flex items-center gap-1 hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> All categories
      </Link>
      <div className="flex items-end justify-between gap-4 flex-wrap mt-3">
        <div>
          <div className="text-[10px] font-mono uppercase text-mute">Category</div>
          <h1 className="text-4xl font-medium tracking-tight">{cat}</h1>
          <p className="text-body mt-2">{list.length} components in this category.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mute" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Filter ${cat}…`}
            className="h-10 pl-9 pr-3 rounded-md border border-hairline bg-canvas text-sm w-72"
          />
        </div>
      </div>

      <div className="flex gap-1 mt-6 flex-wrap">
        <Link to="/components" className="h-8 px-3 rounded-full text-xs border border-hairline text-body hover:bg-canvas-soft inline-flex items-center">All</Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            to="/components/category/$category"
            params={{ category: slugify(c) }}
            className={`h-8 px-3 rounded-full text-xs inline-flex items-center ${c === cat ? "bg-ink text-white" : "border border-hairline text-body hover:bg-canvas-soft"}`}
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {list.map((c) => (
          <Link key={c.slug} to="/components/$slug" params={{ slug: c.slug }} className="group">
            <div className="border border-hairline rounded-xl overflow-hidden bg-canvas-soft transition hover:border-hairline-strong">
              <div className="bg-canvas"><Preview kind={c.kind} variant={c.variant} /></div>
              <div className="p-3 flex justify-between items-center">
                <div className="text-sm font-medium text-ink">{c.name}</div>
                {c.isNew && <span className="text-[10px] font-mono uppercase text-link">New</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}