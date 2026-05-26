import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { findComponent, COMPONENTS } from "@/lib/components-data";
import { Preview } from "@/components/vanta/Preview";
import { Copy, Check, Smartphone, Tablet, Monitor, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/components/$slug")({
  head: ({ params }) => {
    const c = findComponent(params.slug);
    return {
      meta: [
        { title: `${c?.name ?? "Component"} — Vanta UI` },
        { name: "description", content: c?.description ?? "Vanta UI component." },
      ],
    };
  },
  component: ComponentDetail,
  notFoundComponent: () => <div className="mx-auto max-w-3xl p-12 text-center text-body">Component not found.</div>,
});

function CopyBtn({ text }: { text: string }) {
  const [c, setC] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard?.writeText(text); setC(true); setTimeout(() => setC(false), 1200); }}
      className="inline-flex items-center gap-1.5 h-7 px-2 rounded-md border border-hairline text-xs bg-canvas hover:bg-canvas-soft"
    >
      {c ? <><Check className="h-3.5 w-3.5 text-success" />Copied</> : <><Copy className="h-3.5 w-3.5" />Copy</>}
    </button>
  );
}

function ComponentDetail() {
  const { slug } = Route.useParams();
  const c = findComponent(slug);
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [installTab, setInstallTab] = useState<"cli" | "npm">("cli");

  if (!c) throw notFound();

  const related = COMPONENTS.filter((x) => x.category === c.category && x.slug !== c.slug).slice(0, 4);
  const deviceW: Record<string, string> = { mobile: "max-w-[375px]", tablet: "max-w-[768px]", desktop: "max-w-full" };

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <Link to="/components" className="text-sm text-mute inline-flex items-center gap-1 hover:text-ink"><ArrowLeft className="h-4 w-4" /> All components</Link>
      <div className="mt-3 flex items-baseline gap-3 flex-wrap">
        <h1 className="text-4xl font-medium tracking-tight">{c.name}</h1>
        <span className="text-[10px] font-mono uppercase text-mute bg-canvas-soft px-2 py-0.5 rounded-full">{c.category}</span>
      </div>
      <p className="text-body mt-2">{c.description}</p>

      {/* Tabs */}
      <div className="mt-8 flex gap-6 border-b border-hairline">
        {(["preview", "code"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`pb-2 text-sm capitalize relative ${tab === t ? "text-ink" : "text-body"}`}>
            {t}{tab === t && <span className="absolute -bottom-px left-0 right-0 h-px bg-ink" />}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1 pb-2">
          {[["mobile", Smartphone], ["tablet", Tablet], ["desktop", Monitor]].map(([k, I]: any) => (
            <button key={k} onClick={() => setDevice(k)} className={`h-7 w-7 grid place-items-center rounded-md ${device === k ? "bg-canvas-soft text-ink" : "text-mute hover:bg-canvas-soft"}`} aria-label={k}>
              <I className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="mt-6">
        {tab === "preview" ? (
          <div className="flex justify-center bg-canvas-soft border border-hairline rounded-xl p-6">
            <div className={`w-full ${deviceW[device]} transition-all`}>
              <Preview kind={c.kind} variant={c.variant} />
            </div>
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden border border-hairline">
            <div className="flex items-center justify-between px-3 py-2 bg-canvas-soft border-b border-hairline">
              <div className="text-xs font-mono text-mute">component.tsx</div>
              <CopyBtn text={c.code ?? ""} />
            </div>
            <pre className="bg-ink text-white p-4 font-mono text-xs overflow-auto"><code>{c.code}</code></pre>
          </div>
        )}
      </div>

      {/* Install */}
      <section className="mt-12">
        <h2 className="text-xl font-medium">Installation</h2>
        <div className="mt-3 rounded-xl overflow-hidden border border-hairline">
          <div className="flex items-center gap-1 px-2 pt-2 bg-canvas-soft border-b border-hairline">
            {(["cli", "npm"] as const).map((t) => (
              <button key={t} onClick={() => setInstallTab(t)} className={`h-7 px-3 text-xs rounded-md uppercase font-mono ${installTab === t ? "bg-canvas text-ink border border-hairline border-b-canvas" : "text-mute"}`}>{t}</button>
            ))}
          </div>
          <div className="flex items-center justify-between bg-ink text-white p-4 font-mono text-xs">
            <span>$ {installTab === "cli" ? c.cli : c.pkg}</span>
            <CopyBtn text={(installTab === "cli" ? c.cli : c.pkg) ?? ""} />
          </div>
        </div>
      </section>

      {/* Usage */}
      <section className="mt-10">
        <h2 className="text-xl font-medium">Usage</h2>
        <div className="mt-3 rounded-xl overflow-hidden border border-hairline">
          <div className="flex items-center justify-between px-3 py-2 bg-canvas-soft border-b border-hairline">
            <div className="text-xs font-mono text-mute">example.tsx</div>
            <CopyBtn text={c.usage ?? ""} />
          </div>
          <pre className="bg-ink text-white p-4 font-mono text-xs overflow-auto"><code>{c.usage}</code></pre>
        </div>
      </section>

      {/* Props */}
      <section className="mt-10">
        <h2 className="text-xl font-medium">Props</h2>
        <div className="mt-3 border border-hairline rounded-xl overflow-hidden bg-canvas">
          <table className="w-full text-sm">
            <thead className="bg-canvas-soft">
              <tr>
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <th key={h} className="text-left px-4 py-2 font-mono text-[11px] uppercase text-mute">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(c.props ?? []).map((p) => (
                <tr key={p.name} className="border-t border-hairline">
                  <td className="px-4 py-2 font-mono text-xs text-ink">{p.name}</td>
                  <td className="px-4 py-2 font-mono text-xs text-link">{p.type}</td>
                  <td className="px-4 py-2 font-mono text-xs text-mute">{p.default ?? "—"}</td>
                  <td className="px-4 py-2 text-body">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* A11y */}
      <section className="mt-10">
        <h2 className="text-xl font-medium">Accessibility</h2>
        <ul className="mt-3 space-y-2 text-sm text-body">
          {(c.a11y ?? []).map((a) => (
            <li key={a} className="flex gap-2"><Check className="h-4 w-4 mt-0.5 text-success" />{a}</li>
          ))}
        </ul>
      </section>

      {/* Related */}
      <section className="mt-12">
        <h2 className="text-xl font-medium">Related</h2>
        <div className="grid md:grid-cols-2 gap-3 mt-4">
          {related.map((r) => (
            <Link key={r.slug} to="/components/$slug" params={{ slug: r.slug }} className="border border-hairline rounded-lg p-3 hover:bg-canvas-soft">
              <div className="text-sm font-medium text-ink">{r.name}</div>
              <div className="text-xs text-mute">{r.description}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}