import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { COMPONENTS, CATEGORIES } from "@/lib/components-data";
import { Preview } from "@/components/vanta/Preview";
import { CardLink } from "@/components/vanta/CardLink";
import { Search, SlidersHorizontal, Type, CheckCircle2, Circle } from "lucide-react";
import { slugify } from "@/lib/slug";
import { fuzzyMatch } from "@/lib/fuzzy";

type PropTypeFilter = "all" | "string" | "boolean" | "enum";
type RequiredFilter = "all" | "required" | "optional";

export const Route = createFileRoute("/components")({
  head: () => ({
    meta: [
      { title: "Components — Vanta UI" },
      { name: "description", content: "Browse Vanta UI components with searchable props, usage, keywords, and reusable code." },
    ],
  }),
  component: ComponentsRouteShell,
});

function ComponentsRouteShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (pathname !== "/components") {
    return <Outlet />;
  }

  return <ComponentsIndex />;
}

function ComponentsIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [propType, setPropType] = useState<PropTypeFilter>("all");
  const [required, setRequired] = useState<RequiredFilter>("all");

  const list = useMemo(() => {
    return COMPONENTS.filter((c) => {
      if (cat !== "All" && c.category !== cat) return false;

      const props = c.props ?? [];
      const matchesPropType =
        propType === "all"
          ? true
          : props.some((p) => {
              const type = p.type.toLowerCase();
              if (propType === "enum") return type.includes("|") || type.includes("enum");
              return type.includes(propType);
            });

      const matchesRequired =
        required === "all"
          ? true
          : props.some((p) => (required === "required" ? !!p.required : !p.required));

      if (!matchesPropType || !matchesRequired) return false;
      if (!q.trim()) return true;

      const haystacks = [
        c.name,
        c.description,
        c.docs ?? "",
        c.category,
        c.tags.join(" "),
        (c.keywords ?? []).join(" "),
        props.map((p) => `${p.name} ${p.type} ${p.description}`).join(" "),
        c.usage ?? "",
      ];

      return haystacks.some((text) => fuzzyMatch(q, text));
    });
  }, [cat, propType, q, required]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-4xl font-medium tracking-tight">Components</h1>
          <p className="text-body mt-2">{COMPONENTS.length}+ components — interactive, copyable, searchable by props, docs, and usage.</p>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mute" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, prop, type, keyword, usage…"
            className="h-10 pl-9 pr-3 rounded-md border border-hairline bg-canvas text-sm w-full sm:w-[24rem]"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="rounded-xl border border-hairline bg-canvas p-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-mute mb-3">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Category
          </div>
          <div className="flex gap-1 flex-wrap">
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
        </div>

        <div className="rounded-xl border border-hairline bg-canvas p-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-mute mb-3">
            <Type className="h-3.5 w-3.5" /> Prop type
          </div>
          <div className="flex gap-1 flex-wrap">
            {(["all", "string", "boolean", "enum"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setPropType(type)}
                className={`h-8 px-3 rounded-full text-xs capitalize ${propType === type ? "bg-ink text-white" : "border border-hairline text-body hover:bg-canvas-soft"}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-hairline bg-canvas p-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-mute mb-3">Prop presence</div>
          <div className="flex gap-1 flex-wrap">
            {(["all", "required", "optional"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setRequired(type)}
                className={`h-8 px-3 rounded-full text-xs capitalize inline-flex items-center gap-1.5 ${required === type ? "bg-ink text-white" : "border border-hairline text-body hover:bg-canvas-soft"}`}
              >
                {type === "required" ? <CheckCircle2 className="h-3.5 w-3.5" /> : type === "optional" ? <Circle className="h-3.5 w-3.5" /> : null}
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-body">Showing {list.length} result{list.length === 1 ? "" : "s"}.</div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {list.map((c) => (
          <CardLink key={c.slug} to="/components/$slug" params={{ slug: c.slug }} ariaLabel={`Open ${c.name}`} className="group block magnetic-card shine-sweep rounded-xl">
            <article className="border border-hairline rounded-xl overflow-hidden bg-canvas-soft transition hover:border-hairline-strong">
              <div className="bg-canvas overflow-hidden relative h-[200px] sm:h-[240px] lg:h-[260px]">
                <div className="absolute inset-0 origin-top-left scale-[0.62] w-[161%] h-[161%] sm:scale-[0.82] sm:w-[122%] sm:h-[122%] lg:scale-100 lg:w-full lg:h-full">
                  <Preview kind={c.kind} variant={c.variant} interactive={false} />
                </div>
              </div>
              <div className="p-3 space-y-2">
                <div className="flex justify-between items-center gap-3">
                  <div className="text-sm font-medium text-ink flex items-center gap-2 min-w-0">
                    <span className="truncate">{c.name}</span>
                    {c.isNew && <span className="text-[10px] font-mono uppercase text-link bg-link/10 px-1.5 py-0.5 rounded shrink-0">NEW</span>}
                  </div>
                  <span className="text-[10px] font-mono uppercase text-mute shrink-0">{c.category}</span>
                </div>
                <p className="text-xs text-body line-clamp-2">{c.description}</p>
                <div className="flex flex-wrap gap-1">
                  {(c.props ?? []).slice(0, 3).map((prop) => (
                    <span key={prop.name} className="inline-flex items-center gap-1 rounded-full border border-hairline px-2 py-0.5 text-[10px] text-mute">
                      {prop.name}
                      <span className="text-link">{prop.type}</span>
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </CardLink>
        ))}
      </div>
    </div>
  );
}