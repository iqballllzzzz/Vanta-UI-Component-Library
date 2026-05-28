import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Github } from "lucide-react";
import { COMPONENTS, CATEGORIES, totalCount } from "@/lib/components-data";
import { Preview } from "@/components/vanta/Preview";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vanta UI — 200+ components inspired by Vercel" },
      { name: "description", content: "An open-source React component library with 200+ beautifully designed, accessible components. Built by M Iqbal S." },
      { property: "og:title", content: "Vanta UI" },
      { property: "og:description", content: "200+ components inspired by the Vercel design language." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = COMPONENTS.slice(0, 8);
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-5 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-canvas/70 backdrop-blur border border-white/40 px-3 py-1 text-xs text-ink">
            <Sparkles className="h-3 w-3" /> Introducing Vanta UI v1.0
          </div>
          <h1 className="text-5xl md:text-7xl font-medium tracking-[-0.04em] mt-5 text-ink text-balance">
            Ship the surface,<br /> not the system.
          </h1>
          <p className="mt-5 text-body max-w-xl mx-auto">
            {totalCount}+ open-source React components inspired by Vercel's design language. Built by <span className="text-ink">M Iqbal S</span>.
          </p>
          <div className="mt-7 flex gap-2 justify-center">
            <Link to="/components" className="h-11 px-6 rounded-full bg-ink text-white text-sm inline-flex items-center gap-2">Browse components <ArrowRight className="h-4 w-4"/></Link>
            <a href="#" className="h-11 px-6 rounded-full bg-canvas border border-hairline text-sm inline-flex items-center gap-2"><Github className="h-4 w-4"/> Star on GitHub</a>
          </div>
          <div className="mt-6 text-xs font-mono text-mute">$ npx vanta-ui init my-app</div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-5 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-hairline">
        {[[`${totalCount}+`, "Components"], [`${CATEGORIES.length}`, "Categories"], ["100%", "Accessible"], ["MIT", "License"]].map(([n, l]) => (
          <div key={l}>
            <div className="text-3xl md:text-4xl font-medium tabular-nums">{n}</div>
            <div className="text-xs font-mono uppercase text-mute mt-1">{l}</div>
          </div>
        ))}
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-medium tracking-tight">Featured components</h2>
          <Link to="/components" className="text-sm text-link inline-flex items-center gap-1">View all → </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {featured.map((c) => (
            <Link key={c.slug} to="/components/$slug" params={{ slug: c.slug }} className="group">
              <div className="border border-hairline rounded-xl overflow-hidden bg-canvas-soft transition hover:border-hairline-strong">
                <div className="bg-canvas">
                  <Preview kind={c.kind} variant={c.variant} />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-ink">{c.name}</div>
                    <div className="text-xs text-mute">{c.description}</div>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-mute">{c.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <h2 className="text-2xl font-medium tracking-tight">Explore by category</h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
          {CATEGORIES.map((c) => (
            <Link key={c} to="/components" search={{ category: c } as any} className="p-4 rounded-lg border border-hairline bg-canvas hover:bg-canvas-soft">
              <div className="text-sm font-medium text-ink">{c}</div>
              <div className="text-xs text-mute">{COMPONENTS.filter((x) => x.category === c).length} components</div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="rounded-2xl p-12 text-center text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0a0a0a 0%,#1a1033 55%,#3b0a52 100%)" }}>
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: "radial-gradient(at 30% 30%, #7928ca 0px, transparent 50%), radial-gradient(at 70% 70%, #ff0080 0px, transparent 50%)" }} />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">Ready to build?</h2>
            <p className="text-white/80 mt-3">Open source, MIT licensed. Free forever.</p>
            <Link to="/components" className="mt-6 inline-flex h-11 px-6 rounded-full bg-white text-[#0a0a0a] text-sm items-center font-medium hover:bg-white/90 transition">Browse components</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
