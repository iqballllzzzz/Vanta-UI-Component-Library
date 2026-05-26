import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { COMPONENTS, CATEGORIES } from "@/lib/components-data";
import { Preview } from "@/components/vanta/Preview";
import { Search } from "lucide-react";
import { slugify } from "@/lib/slug";

export const Route = createFileRoute("/components")({
  head: () => ({
    meta: [
      { title: "Components — Vanta UI" },
      { name: "description", content: "Browse 200+ open-source components for React + Tailwind." },
    ],
  }),
  component: ComponentsIndex,
});

function ComponentsIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const list = COMPONENTS.filter(
    (c) => (cat === "All" || c.category === cat) && (q === "" || c.name.toLowerCase().includes(q.toLowerCase())),
  );
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-4xl font-medium tracking-tight">Components</h1>
          <p className="text-body mt-2">{COMPONENTS.length} components, accessible and themable.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mute" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter components…"
            className="h-10 pl-9 pr-3 rounded-md border border-hairline bg-canvas text-sm w-72"
          />
        </div>
      </div>
      <div className="flex gap-1 mt-6 flex-wrap">
        {["All", ...CATEGORIES].map((c) => (
          <div key={c} className="inline-flex">
            <button
              onClick={() => setCat(c)}
              className={`h-8 px-3 rounded-full text-xs ${cat === c ? "bg-ink text-white" : "border border-hairline text-body hover:bg-canvas-soft"}`}
            >
              {c}
            </button>
            {c !== "All" && (
              <Link
                to="/components/category/$category"
                params={{ category: slugify(c) }}
                className="ml-1 h-8 px-2 rounded-full text-[10px] border border-hairline text-mute hover:text-ink hover:bg-canvas-soft inline-flex items-center"
                title={`Open ${c} page`}
              >↗</Link>
            )}
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {list.map((c) => (
          <Link key={c.slug} to="/components/$slug" params={{ slug: c.slug }} className="group">
            <div className="border border-hairline rounded-xl overflow-hidden bg-canvas-soft transition hover:border-hairline-strong">
              <div className="bg-canvas">
                <Preview kind={c.kind} variant={c.variant} />
              </div>
              <div className="p-3 flex justify-between items-center">
                <div className="text-sm font-medium text-ink flex items-center gap-2">
                  {c.name}
                  {c.isNew && <span className="text-[10px] font-mono uppercase text-link bg-link/10 px-1.5 py-0.5 rounded">NEW</span>}
                </div>
                <span className="text-[10px] font-mono uppercase text-mute">{c.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}