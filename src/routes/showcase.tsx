import { createFileRoute } from "@tanstack/react-router";
import { COMPONENTS } from "@/lib/components-data";
import { Preview } from "@/components/vanta/Preview";

export const Route = createFileRoute("/showcase")({
  head: () => ({ meta: [{ title: "Showcase — Vanta UI" }, { name: "description", content: "Vanta UI showcase." }] }),
  component: Page,
});

function Page() {
  const items = COMPONENTS.filter((c) => ["card","hero","feature-section","template"].includes(c.kind)).slice(0, 9);
  return (
    <div className="mx-auto max-w-7xl px-5 py-16">
      <h1 className="text-4xl font-medium tracking-tight capitalize">showcase</h1>
      <p className="text-body mt-2">Coming soon — explore a curated gallery below.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {items.map((c) => (
          <div key={c.slug} className="border border-hairline rounded-xl overflow-hidden bg-canvas">
            <Preview kind={c.kind} variant={c.variant} />
            <div className="p-3 text-sm font-medium">{c.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
