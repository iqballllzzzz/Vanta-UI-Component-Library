import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import JSZip from "jszip";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/vanta/FavoriteButton";
import { findComponent, COMPONENTS, THEME_TOKENS_EXPORT } from "@/lib/components-data";
import { Preview } from "@/components/vanta/Preview";
import { CardLink } from "@/components/vanta/CardLink";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Copy,
  Check,
  Smartphone,
  Tablet,
  Monitor,
  ArrowLeft,
  Code2,
  Share2,
  Download,
  Palette,
} from "lucide-react";
import { slugify } from "@/lib/slug";

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
  validateSearch: (s: Record<string, unknown>) => ({
    variant: typeof s.variant === "string" ? s.variant : undefined,
    section: typeof s.section === "string" ? s.section : undefined,
  }),
});

async function copyText(text: string, label: string) {
  await navigator.clipboard.writeText(text);
  toast.success(`${label} copied`, { description: text.split("\n")[0]?.slice(0, 72) || label });
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function CodeCopyButton({ text, label, large }: { text: string; label: string; large?: boolean }) {
  const [done, setDone] = useState(false);

  return (
    <button
      onClick={async () => {
        await copyText(text, label);
        setDone(true);
        window.setTimeout(() => setDone(false), 1600);
      }}
      title={done ? `${label} copied` : `Copy ${label}`}
      className={large
        ? "inline-flex items-center gap-2 h-10 px-4 rounded-md bg-ink text-white text-sm hover:bg-ink/90 transition"
        : "inline-flex items-center gap-1.5 h-7 px-2 rounded-md border border-hairline text-xs bg-canvas hover:bg-canvas-soft"}
    >
      {done ? <><Check className={large ? "h-4 w-4" : "h-3.5 w-3.5 text-success"} />Copied</> : <><Copy className={large ? "h-4 w-4" : "h-3.5 w-3.5"} />Copy</>}
    </button>
  );
}

function SectionLink({ slug, section, children }: { slug: string; section: string; children: string }) {
  return (
    <Link
      to="/components/$slug"
      params={{ slug }}
      search={(prev: { variant?: string; section?: string }) => ({ ...prev, section })}
      className="inline-flex h-8 px-3 rounded-full text-xs border border-hairline text-body hover:bg-canvas-soft"
    >
      {children}
    </Link>
  );
}

function ComponentDetail() {
  const { slug } = Route.useParams();
  const search = Route.useSearch();
  const c = findComponent(slug);
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const [installTab, setInstallTab] = useState<"cli" | "npm" | "init">("cli");
  const [codeTab, setCodeTab] = useState<"component" | "example" | "styles" | "setup" | "usage">("component");

  useEffect(() => {
    if (search.section) {
      const el = document.getElementById(search.section);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [search.section]);

  if (!c) throw notFound();
  const component = c;

  const related = COMPONENTS.filter((x) => x.category === component.category && x.slug !== component.slug).slice(0, 4);
  const variants = COMPONENTS.filter((x) => x.kind === component.kind && x.slug !== component.slug).slice(0, 6);
  const deviceW: Record<string, string> = { mobile: "max-w-[375px]", tablet: "max-w-[768px]", desktop: "max-w-full" };
  const installCmd = (installTab === "cli" ? component.cli : installTab === "npm" ? component.pkg : "npx vanta-ui init my-app") ?? "";

  const fileMap = useMemo(() => ({
    "component.tsx": component.code ?? "",
    "example.tsx": component.usage ?? "",
    "styles.css": component.styles ?? "",
    "setup.ts": component.setup ?? "",
    "README.md": `# ${component.name}\n\n${component.description}\n\n## Install\n\n\`\`\`bash\n${component.cli ?? ""}\n${component.pkg ?? ""}\n\`\`\`\n\n## Usage\n\n\`\`\`tsx\n${component.usage ?? ""}\n\`\`\`\n\n## Docs\n\n${component.docs ?? ""}`,
  }), [component]);

  const fullFile = Object.entries(fileMap)
    .map(([name, value]) => `/* ===== ${name} ===== */\n${value}`)
    .join("\n\n");

  const codePanels = {
    component: { name: "component.tsx", value: component.code ?? "" },
    example: { name: "example.tsx", value: component.usage ?? "" },
    styles: { name: "styles.css", value: component.styles ?? "" },
    setup: { name: "setup.ts", value: component.setup ?? "" },
    usage: { name: "README.md", value: fileMap["README.md"] },
  } as const;

  async function handleShare() {
    const url = `${window.location.origin}/components/${slug}${search.variant ? `?variant=${encodeURIComponent(search.variant)}` : ""}${search.section ? `${search.variant ? "&" : "?"}section=${encodeURIComponent(search.section)}` : ""}`;
    await copyText(url, "Share link");
  }

  async function handleDownloadZip() {
    const zip = new JSZip();
    const folder = zip.folder(component.slug);
    if (!folder) return;
    Object.entries(fileMap).forEach(([name, value]) => folder.file(name, value));
    folder.file("theme-tokens.ts", THEME_TOKENS_EXPORT);
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob(blob, `${component.slug}.zip`);
    toast.success("ZIP downloaded", { description: `${component.slug}.zip is ready.` });
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <Link to="/components" className="text-sm text-mute inline-flex items-center gap-1 hover:text-ink"><ArrowLeft className="h-4 w-4" /> All components</Link>

      <div className="mt-3 flex items-start gap-4 flex-wrap justify-between">
        <div className="max-w-3xl">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="text-4xl font-medium tracking-tight">{component.name}</h1>
            <Link
              to="/components/category/$category"
              params={{ category: slugify(component.category) }}
              className="text-[10px] font-mono uppercase text-mute bg-canvas-soft px-2 py-0.5 rounded-full hover:text-ink"
            >{component.category}</Link>
            {component.isNew && <span className="text-[10px] font-mono uppercase text-link bg-link/10 px-2 py-0.5 rounded-full">NEW</span>}
          </div>
          <p className="text-body mt-2">{component.description}</p>
          <p className="text-sm text-body mt-3">{component.docs}</p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <SectionLink slug={component.slug} section="install">Install</SectionLink>
            <SectionLink slug={component.slug} section="code">Code</SectionLink>
            <SectionLink slug={component.slug} section="props">Props</SectionLink>
            <SectionLink slug={component.slug} section="accessibility">Accessibility</SectionLink>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          <FavoriteButton slug={component.slug} name={component.name} />
          <button onClick={handleShare} className="inline-flex items-center gap-1.5 h-10 px-3 rounded-md border border-hairline bg-canvas hover:bg-canvas-soft text-sm">
            <Share2 className="h-4 w-4" /> Share
          </button>
          <button onClick={handleDownloadZip} className="inline-flex items-center gap-1.5 h-10 px-3 rounded-md border border-hairline bg-canvas hover:bg-canvas-soft text-sm">
            <Download className="h-4 w-4" /> ZIP
          </button>
          <CodeCopyButton text={fullFile} label="Full component bundle" large />
        </div>
      </div>

      <div className="mt-8 flex gap-6 border-b border-hairline flex-wrap">
        <LayoutGroup id="detail-tabs">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-2 text-sm capitalize relative transition-colors springy-tap ${tab === t ? "text-ink" : "text-body hover:text-ink"}`}
            >
              {t}
              {tab === t && (
                <motion.span
                  layoutId="detail-tab-underline"
                  className="absolute -bottom-px left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-violet via-pink to-ink"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </LayoutGroup>
        <div className="ml-auto flex items-center gap-1 pb-2">
          {[["mobile", Smartphone], ["tablet", Tablet], ["desktop", Monitor]].map(([k, I]: any) => (
            <button key={k} onClick={() => setDevice(k)} className={`h-7 w-7 grid place-items-center rounded-md springy-tap transition ${device === k ? "bg-canvas-soft text-ink icon-glow" : "text-mute hover:bg-canvas-soft hover:text-ink"}`} aria-label={k}>
              <I className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6" id="preview">
        <AnimatePresence mode="wait">
        {tab === "preview" ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative flex justify-center bg-canvas-soft border border-hairline rounded-xl p-4 sm:p-6 overflow-hidden grid-bg"
          >
            <div className={`relative w-full ${deviceW[device]} transition-all max-w-full`}>
              <Preview kind={component.kind} variant={search.variant ?? component.variant} />
            </div>
          </motion.div>
        ) : (
          <motion.section
            key="code"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="rounded-xl overflow-hidden border border-hairline"
            id="code"
          >
            <div className="flex items-center gap-1 px-2 pt-2 bg-canvas-soft border-b border-hairline overflow-x-auto">
              <LayoutGroup id="code-tabs">
                {(["component", "example", "styles", "setup", "usage"] as const).map((t) => (
                  <button key={t} onClick={() => setCodeTab(t)} className={`relative h-8 px-3 text-xs rounded-md uppercase font-mono whitespace-nowrap transition-colors springy-tap ${codeTab === t ? "text-ink" : "text-mute hover:text-ink"}`}>
                    {codeTab === t && (
                      <motion.span
                        layoutId="code-tab-pill"
                        className="absolute inset-0 rounded-md bg-canvas border border-hairline border-b-canvas"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{t}</span>
                  </button>
                ))}
              </LayoutGroup>
              <div className="ml-auto pr-2 pb-2"><CodeCopyButton text={codePanels[codeTab].value} label={codePanels[codeTab].name} /></div>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-canvas-soft/50 border-b border-hairline">
              <div className="text-xs font-mono text-mute">{codePanels[codeTab].name}</div>
              <div className="text-[11px] text-body">Copy per bagian atau copy bundle penuh.</div>
            </div>
            <motion.pre
              key={codeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="bg-ink text-white p-4 font-mono text-xs overflow-auto"
            ><code>{codePanels[codeTab].value}</code></motion.pre>
          </motion.section>
        )}
        </AnimatePresence>
      </div>

      {variants.length > 0 && (
        <section className="mt-12" id="variants">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h2 className="text-xl font-medium">Variants</h2>
            <span className="text-xs text-mute">{variants.length} more variants of this component</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {variants.map((v) => (
              <CardLink key={v.slug} to="/components/$slug" params={{ slug: v.slug }} ariaLabel={`Open ${v.name}`} className="block group magnetic-card shine-sweep rounded-lg">
                <div className="border border-hairline rounded-lg overflow-hidden bg-canvas hover:border-hairline-strong">
                  <div className="overflow-hidden relative h-[180px] sm:h-[220px]">
                    <div className="absolute inset-0 origin-top-left scale-[0.62] w-[161%] h-[161%] sm:scale-[0.82] sm:w-[122%] sm:h-[122%]">
                      <Preview kind={v.kind} variant={v.variant} interactive={false} />
                    </div>
                  </div>
                  <div className="p-2.5 border-t border-hairline flex items-center justify-between">
                    <div className="text-xs font-medium text-ink">{v.name}</div>
                    <Code2 className="h-3.5 w-3.5 text-mute group-hover:text-ink icon-hover-spin" />
                  </div>
                </div>
              </CardLink>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12" id="install">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className="text-xl font-medium">Installation</h2>
          <CodeCopyButton text={installCmd} label="Install command" />
        </div>
        <div className="mt-3 rounded-xl overflow-hidden border border-hairline">
          <div className="flex items-center gap-1 px-2 pt-2 bg-canvas-soft border-b border-hairline overflow-x-auto">
            {(["cli", "npm", "init"] as const).map((t) => (
              <button key={t} onClick={() => setInstallTab(t)} className={`h-7 px-3 text-xs rounded-md uppercase font-mono whitespace-nowrap ${installTab === t ? "bg-canvas text-ink border border-hairline border-b-canvas" : "text-mute"}`}>{t}</button>
            ))}
          </div>
          <div className="flex items-center justify-between bg-ink text-white p-4 font-mono text-xs gap-3">
            <span className="break-all">$ {installCmd}</span>
            <CodeCopyButton text={installCmd} label="Install command" />
          </div>
        </div>
      </section>

      <section className="mt-10" id="usage">
        <h2 className="text-xl font-medium">Usage example</h2>
        <div className="mt-3 rounded-xl overflow-hidden border border-hairline">
          <div className="flex items-center justify-between px-3 py-2 bg-canvas-soft border-b border-hairline">
            <div className="text-xs font-mono text-mute">example.tsx</div>
            <CodeCopyButton text={component.usage ?? ""} label="Usage example" />
          </div>
          <pre className="bg-ink text-white p-4 font-mono text-xs overflow-auto"><code>{component.usage}</code></pre>
        </div>
      </section>

      <section className="mt-10" id="theme-tokens">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className="text-xl font-medium inline-flex items-center gap-2"><Palette className="h-4 w-4" /> Theme tokens export</h2>
          <CodeCopyButton text={THEME_TOKENS_EXPORT} label="Theme tokens" />
        </div>
        <div className="mt-3 rounded-xl overflow-hidden border border-hairline">
          <div className="flex items-center justify-between px-3 py-2 bg-canvas-soft border-b border-hairline">
            <div className="text-xs font-mono text-mute">theme-tokens.ts</div>
            <CodeCopyButton text={THEME_TOKENS_EXPORT} label="Theme tokens" />
          </div>
          <pre className="bg-ink text-white p-4 font-mono text-xs overflow-auto"><code>{THEME_TOKENS_EXPORT}</code></pre>
        </div>
      </section>

      <section className="mt-10" id="props">
        <h2 className="text-xl font-medium">Props</h2>
        <div className="mt-3 border border-hairline rounded-xl overflow-hidden bg-canvas overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-canvas-soft">
              <tr>
                {(["Prop", "Type", "Required", "Default", "Description"] as const).map((h) => (
                  <th key={h} className="text-left px-4 py-2 font-mono text-[11px] uppercase text-mute">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(component.props ?? []).map((p) => (
                <tr key={p.name} className="border-t border-hairline align-top">
                  <td className="px-4 py-2 font-mono text-xs text-ink">{p.name}</td>
                  <td className="px-4 py-2 font-mono text-xs text-link">{p.type}</td>
                  <td className="px-4 py-2 font-mono text-xs text-body">{p.required ? "Yes" : "No"}</td>
                  <td className="px-4 py-2 font-mono text-xs text-mute">{p.default ?? "—"}</td>
                  <td className="px-4 py-2 text-body">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10" id="accessibility">
        <h2 className="text-xl font-medium">Accessibility</h2>
        <ul className="mt-3 space-y-2 text-sm text-body">
          {(component.a11y ?? []).map((a) => (
            <li key={a} className="flex gap-2"><Check className="h-4 w-4 mt-0.5 text-success" />{a}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12" id="related">
        <h2 className="text-xl font-medium">Related</h2>
        <div className="grid md:grid-cols-2 gap-3 mt-4">
          {related.map((r) => (
            <Link key={r.slug} to="/components/$slug" params={{ slug: r.slug }} className="magnetic-card shine-sweep border border-hairline rounded-lg p-3 hover:bg-canvas-soft block">
              <div className="text-sm font-medium text-ink">{r.name}</div>
              <div className="text-xs text-mute">{r.description}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}