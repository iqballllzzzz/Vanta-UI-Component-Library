import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Github, Command, Zap, Palette, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { COMPONENTS, CATEGORIES, totalCount } from "@/lib/components-data";
import { Preview } from "@/components/vanta/Preview";
import { CardLink } from "@/components/vanta/CardLink";
import { Tilt3D } from "@/components/vanta/Tilt3D";

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
  const marquee = COMPONENTS.slice(20, 36);
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden isolate">
        <div className="absolute inset-0 -z-10 aurora-bg opacity-70 pointer-events-none" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-[0.15] pointer-events-none" />
        <div className="noise-overlay -z-10" />
        <div className="relative mx-auto max-w-6xl px-5 pt-24 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="inline-flex items-center gap-2 rounded-full bg-canvas/70 backdrop-blur border border-hairline px-3 py-1 text-xs text-ink shadow-sm"
          >
            <Sparkles className="h-3 w-3" />
            <span>Introducing Vanta UI v1.0</span>
            <span className="mx-1 h-3 w-px bg-hairline" />
            <span className="text-mute font-mono">{totalCount}+ components</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.045em] mt-6 text-balance leading-[0.95]"
          >
            Ship the surface,
            <br />
            <span className="text-gradient">not the system.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mt-6 text-body max-w-xl mx-auto"
          >
            An open-source React library of <span className="text-ink">{totalCount}+ components</span> — cinematic motion, gyroscopic tilt, and copy-paste-ready code. Built by <span className="text-ink">M Iqbal S</span>.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-8 flex gap-2 justify-center flex-wrap"
          >
            <Link to="/components" className="group h-11 px-6 rounded-full bg-ink text-white text-sm inline-flex items-center gap-2 hover:scale-[1.03] transition">
              Browse components
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a href="#" className="h-11 px-6 rounded-full bg-canvas/80 backdrop-blur border border-hairline text-sm inline-flex items-center gap-2 hover:bg-canvas-soft transition">
              <Github className="h-4 w-4" /> Star on GitHub
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-hairline bg-canvas/70 backdrop-blur px-3 py-1.5 text-xs font-mono text-mute"
          >
            <Command className="h-3 w-3" />
            <span className="text-ink">$</span> npx vanta-ui init my-app
          </motion.div>
        </div>

        {/* Marquee tape */}
        <div className="relative mask-fade overflow-hidden border-y border-hairline bg-canvas/60 backdrop-blur">
          <div className="marquee flex gap-3 py-4 whitespace-nowrap will-change-transform">
            {[...marquee, ...marquee].map((c, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-hairline text-xs text-body">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#7928ca] to-[#ff0080]" />
                {c.name}
                <span className="font-mono text-[10px] text-mute">{c.category}</span>
              </span>
            ))}
          </div>
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

      {/* Feature pillars */}
      <section className="mx-auto max-w-7xl px-5 py-16 grid gap-3 md:grid-cols-3">
        {[
          { icon: Zap, title: "Cinematic motion", body: "Spring physics, parallax and gyroscope tilt baked in — every card breathes." },
          { icon: Palette, title: "Dark + light theming", body: "Semantic OKLCH tokens, one toggle, zero flicker on load." },
          { icon: Cpu, title: "Copy-paste ready", body: "Full source, styles, and setup exposed per component. No dependency lock-in." },
        ].map(({ icon: Ico, title, body }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="group relative rounded-2xl border border-hairline bg-canvas p-6 overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(closest-side, #7928ca55, transparent)" }} />
            <Ico className="h-5 w-5 text-ink" />
            <div className="mt-4 text-lg font-medium text-ink">{title}</div>
            <p className="mt-1 text-sm text-body">{body}</p>
          </motion.div>
        ))}
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-mute">Highlights</div>
            <h2 className="text-4xl font-medium tracking-tight mt-1">Featured components</h2>
          </div>
          <Link to="/components" className="text-sm text-link inline-flex items-center gap-1">View all → </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {featured.map((c) => (
            <CardLink key={c.slug} to="/components/$slug" params={{ slug: c.slug }} ariaLabel={`Open ${c.name}`} className="group">
              <Tilt3D max={6} className="rounded-xl">
              <div className="border border-hairline rounded-xl overflow-hidden bg-canvas-soft transition hover:border-hairline-strong hover:glow-ring">
                <div className="bg-canvas overflow-hidden relative h-[220px] sm:h-[260px] lg:h-[280px]">
                  <div className="absolute inset-0 origin-top-left scale-[0.62] w-[161%] h-[161%] sm:scale-[0.82] sm:w-[122%] sm:h-[122%] lg:scale-100 lg:w-full lg:h-full">
                    <Preview kind={c.kind} variant={c.variant} interactive={false} />
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-ink">{c.name}</div>
                    <div className="text-xs text-mute">{c.description}</div>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-mute">{c.category}</span>
                </div>
              </div>
              </Tilt3D>
            </CardLink>
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
        <div className="rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden isolate" style={{ background: "linear-gradient(135deg,#0a0a0a 0%,#1a1033 55%,#3b0a52 100%)" }}>
          <div className="absolute inset-0 opacity-40 pointer-events-none aurora-bg" />
          <div className="noise-overlay opacity-30" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.03em] text-white">Ready to build?</h2>
            <p className="text-white/80 mt-3">Open source, MIT licensed. Free forever.</p>
            <Link to="/components" className="mt-7 inline-flex h-11 px-6 rounded-full bg-white text-[#0a0a0a] text-sm items-center font-medium hover:bg-white/90 hover:scale-[1.03] transition">Browse components</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
