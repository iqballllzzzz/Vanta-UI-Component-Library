import { Link } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { motion } from "framer-motion";
import { CommandMenu } from "./CommandMenu";
import { ThemeToggle } from "./ThemeToggle";
import logo from "@/assets/vanta-logo.png";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-canvas/80 backdrop-blur border-b border-hairline">
      <div className="mx-auto max-w-7xl h-14 px-5 flex items-center gap-4">
        <Link to="/" className="font-medium text-ink flex items-center gap-2 group">
          <motion.img
            src={logo}
            alt="Vanta UI logo"
            width={28}
            height={28}
            className="h-7 w-7 drop-shadow-[0_0_12px_rgba(99,102,241,0.45)]"
            initial={{ rotate: -12, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            whileHover={{ rotate: 8, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 220, damping: 14 }}
          />
          <span className="bg-gradient-to-r from-ink via-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">Vanta UI</span>
        </Link>
        <nav className="hidden md:flex gap-1 text-sm text-body ml-2">
          <Link to="/components" className="px-2 py-1 rounded-full hover:bg-canvas-soft" activeProps={{ className: "px-2 py-1 rounded-full text-ink bg-canvas-soft" }}>Components</Link>
          <Link to="/favorites" className="px-2 py-1 rounded-full hover:bg-canvas-soft">Favorites</Link>
          <Link to="/docs" className="px-2 py-1 rounded-full hover:bg-canvas-soft">Docs</Link>
          <Link to="/templates" className="px-2 py-1 rounded-full hover:bg-canvas-soft">Templates</Link>
          <Link to="/showcase" className="px-2 py-1 rounded-full hover:bg-canvas-soft">Showcase</Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <CommandMenu />
          <ThemeToggle />
          <a href="#" aria-label="GitHub" className="h-8 w-8 grid place-items-center rounded-md border border-hairline"><Github className="h-4 w-4"/></a>
          <a href="#" className="hidden sm:inline-flex h-8 px-3 rounded-md bg-ink text-white text-xs items-center">Get started</a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline mt-24">
      <div className="mx-auto max-w-7xl px-5 py-12 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-medium text-ink">▲ Vanta UI</div>
          <p className="text-body mt-2">A Vercel-inspired component library by <span className="text-ink">M Iqbal S</span> — Full-stack engineer & AI enthusiast.</p>
        </div>
        {[
          ["Product", ["Components", "Templates", "Blocks", "Showcase"]],
          ["Resources", ["Docs", "Changelog", "Roadmap", "GitHub"]],
          ["Community", ["Contributing", "Issues", "Discord", "Twitter"]],
        ].map(([h, items]: any) => (
          <div key={h}>
            <div className="text-xs font-mono uppercase text-mute mb-2">{h}</div>
            <ul className="space-y-1 text-body">{items.map((it: string) => <li key={it}><a href="#" className="hover:text-ink">{it}</a></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="border-t border-hairline">
        <div className="mx-auto max-w-7xl px-5 py-4 text-xs text-mute flex justify-between">
          <span>© 2026 Vanta UI · MIT</span>
          <span className="font-mono">Built by M Iqbal S</span>
        </div>
      </div>
    </footer>
  );
}