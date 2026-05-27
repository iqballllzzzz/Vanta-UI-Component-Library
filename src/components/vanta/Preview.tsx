// Copyright (c) 2026 M Iqbal S — Vanta UI
// Licensed under MIT License — https://github.com/iqballllzzzz/Vanta-UI-Component-Library/blob/main/LICENSE

import { motion } from "framer-motion";
import {
  Check, ChevronDown, ChevronRight, Search, Command, Star, Heart,
  Settings, User, Bell, Home, Folder, FileText, Image as ImageIcon,
  Play, Pause, Volume2, Mic, Send, Sparkles, Sun, Moon, Copy,
  ArrowRight, ArrowUpRight, Plus, X, Info, AlertTriangle, CheckCircle2,
  XCircle, Loader2, MoreHorizontal, Calendar as CalendarIcon, Clock,
  Upload as UploadIcon, MapPin, Github, Twitter, Mail, Lock, Eye, EyeOff, Trash2,
  Edit3, ExternalLink, GripVertical, Filter, Zap, Brain, Bot, Cpu, Globe,
  TrendingUp, TrendingDown, BarChart3, Activity, MessageSquare, Sticker, Smile,
  Quote, Wand2, Database, Code2, GitBranch, Terminal as TerminalIcon, Layers,
  Shield, Award, Flame, Rocket, Gift, ThumbsUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type V = string | undefined;

const Stage = ({ children, h = "min-h-[280px]", pad = "p-8", className = "" }: any) => (
  <div className={`relative w-full ${h} ${pad} flex items-center justify-center bg-canvas rounded-xl border border-hairline overflow-hidden ${className}`}>
    {children}
  </div>
);

// ---------- BUTTON ----------
function Button({ variant }: { variant: V }) {
  const Btn = ({ children, className = "", ...p }: any) => (
    <button className={`inline-flex items-center justify-center gap-2 transition active:scale-[0.98] ${className}`} {...p}>{children}</button>
  );
  if (variant === "sizes") {
    return (
      <Stage>
        <div className="flex flex-wrap items-center gap-3">
          {[
            ["sm", "h-7 px-3 text-xs"],
            ["md", "h-9 px-4 text-sm"],
            ["lg", "h-11 px-5 text-sm"],
            ["xl", "h-12 px-6 text-base"],
          ].map(([k, c]) => (
            <Btn key={k} className={`rounded-full bg-ink text-white hover:bg-ink/90 ${c}`}>Button {k}</Btn>
          ))}
        </div>
      </Stage>
    );
  }
  if (variant === "loading")
    return <Stage><Btn className="rounded-full bg-ink text-white h-10 px-5 text-sm"><Loader2 className="h-4 w-4 animate-spin" />Processing</Btn></Stage>;
  if (variant === "destructive")
    return <Stage><Btn className="rounded-full bg-[#ee0000] text-white h-10 px-5 text-sm">Delete account</Btn></Stage>;
  if (variant === "gradient")
    return <Stage><Btn className="rounded-full h-11 px-6 text-sm text-white font-medium" style={{ backgroundImage: "linear-gradient(90deg,#7928ca,#ff0080)" }}><Sparkles className="h-4 w-4" />Deploy with Vanta</Btn></Stage>;
  if (variant === "link")
    return <Stage><a className="text-link inline-flex items-center gap-1 text-sm hover:underline">Read documentation <ArrowRight className="h-4 w-4" /></a></Stage>;
  if (variant === "ghost")
    return <Stage><Btn className="rounded-full h-9 px-4 text-sm text-ink hover:bg-canvas-soft">Cancel</Btn></Stage>;
  if (variant === "secondary")
    return <Stage><Btn className="rounded-full h-10 px-5 text-sm bg-canvas text-ink border border-hairline hover:bg-canvas-soft">Continue</Btn></Stage>;
  return <Stage><Btn className="rounded-full h-10 px-5 text-sm bg-ink text-white hover:bg-ink/90">Deploy now</Btn></Stage>;
}

// ---------- ICON BUTTON / TOGGLE / GROUP / SPLIT / FAB / COPY / LINK ----------
function IconButton() {
  return (
    <Stage>
      <div className="flex gap-3">
        {[Settings, Bell, Heart, Star].map((I, i) => (
          <button key={i} className="h-9 w-9 grid place-items-center rounded-md border border-hairline hover:bg-canvas-soft text-ink">
            <I className="h-4 w-4" />
          </button>
        ))}
      </div>
    </Stage>
  );
}
function Toggle() {
  const [on, setOn] = useState(true);
  return <Stage><button onClick={() => setOn(!on)} className={`h-9 px-4 rounded-md text-sm border ${on ? "bg-ink text-white border-ink" : "bg-canvas text-ink border-hairline"}`}>{on ? "Following" : "Follow"}</button></Stage>;
}
function ButtonGroup() {
  const [v, setV] = useState("design");
  return (
    <Stage>
      <div className="inline-flex rounded-md border border-hairline overflow-hidden bg-canvas">
        {["Design", "Code", "Preview"].map((t) => (
          <button key={t} onClick={() => setV(t.toLowerCase())} className={`h-9 px-4 text-sm ${v === t.toLowerCase() ? "bg-canvas-soft text-ink" : "text-body"}`}>{t}</button>
        ))}
      </div>
    </Stage>
  );
}
function SplitButton() {
  return (
    <Stage>
      <div className="inline-flex">
        <button className="h-9 px-4 rounded-l-md bg-ink text-white text-sm">Deploy</button>
        <button className="h-9 px-2 rounded-r-md bg-ink text-white border-l border-white/20"><ChevronDown className="h-4 w-4" /></button>
      </div>
    </Stage>
  );
}
function FAB() {
  return (
    <Stage>
      <button className="h-14 w-14 rounded-full bg-ink text-white grid place-items-center shadow-lg float">
        <Plus className="h-6 w-6" />
      </button>
    </Stage>
  );
}
function CopyButton() {
  const [copied, setCopied] = useState(false);
  return (
    <Stage>
      <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1200); }} className="inline-flex items-center gap-2 h-9 px-4 rounded-md border border-hairline bg-canvas text-sm">
        {copied ? <><Check className="h-4 w-4 text-success" />Copied</> : <><Copy className="h-4 w-4" />Copy code</>}
      </button>
    </Stage>
  );
}
function LinkP() {
  return <Stage><a className="text-link text-sm underline-offset-4 hover:underline">Learn how it works →</a></Stage>;
}

// ---------- BADGE / CHIP / TAG / KBD ----------
function Badge({ variant }: { variant: V }) {
  const wrap = "inline-flex items-center gap-1 px-2 py-0.5 text-xs";
  if (variant === "solid") return <Stage><span className={`${wrap} rounded-full bg-ink text-white`}>Production</span></Stage>;
  if (variant === "outline") return <Stage><span className={`${wrap} rounded-full border border-hairline text-ink`}>Beta</span></Stage>;
  if (variant === "status") return <Stage><span className={`${wrap} rounded-full bg-canvas-soft text-body`}><span className="h-1.5 w-1.5 rounded-full bg-success" />Operational</span></Stage>;
  if (variant === "gradient") return <Stage><span className={`${wrap} rounded-full text-white font-medium`} style={{ backgroundImage: "linear-gradient(90deg,#007cf0,#00dfd8)" }}>New release</span></Stage>;
  if (variant === "counter") return <Stage><span className={`${wrap} rounded-full bg-[#ee0000] text-white tabular-nums px-2`}>12</span></Stage>;
  if (variant === "pill") return <Stage><span className={`${wrap} rounded-full bg-canvas-soft text-body px-3`}>Vanta UI v1.0 →</span></Stage>;
  return <Stage><span className={`${wrap} rounded-full bg-canvas-soft text-body`}>Default</span></Stage>;
}
function Chip() {
  const [tags, setTags] = useState(["react", "tailwind", "typescript"]);
  return (
    <Stage>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 rounded-full bg-canvas-soft px-3 py-1 text-sm">
            {t}
            <button onClick={() => setTags(tags.filter((x) => x !== t))}><X className="h-3.5 w-3.5 text-mute" /></button>
          </span>
        ))}
      </div>
    </Stage>
  );
}
function Tag() {
  return (
    <Stage>
      <div className="flex flex-wrap gap-2 font-mono text-xs">
        {["GET", "POST", "PUT", "DELETE"].map((m, i) => (
          <span key={m} className={`rounded-md px-2 py-0.5 ${["bg-[#d3e5ff] text-[#0761d1]","bg-[#aaffec] text-[#29bc9b]","bg-[#ffefcf] text-[#ab570a]","bg-[#f7d4d6] text-[#c50000]"][i]}`}>{m}</span>
        ))}
      </div>
    </Stage>
  );
}
function Kbd() {
  return (
    <Stage>
      <div className="flex items-center gap-1 text-sm">
        <span className="text-body">Press</span>
        {["⌘", "K"].map((k) => (
          <kbd key={k} className="px-1.5 py-0.5 rounded-md border border-hairline bg-canvas-soft font-mono text-xs">{k}</kbd>
        ))}
        <span className="text-body">to search</span>
      </div>
    </Stage>
  );
}

// ---------- AVATAR ----------
const colors = ["#7928ca", "#0070f3", "#50e3c2", "#ff0080", "#f5a623", "#ee0000"];
function Avatar({ variant }: { variant: V }) {
  const A = ({ i, size = 40, sq = false }: any) => (
    <div className={`${sq ? "rounded-lg" : "rounded-full"} grid place-items-center text-white font-medium border border-white/30`} style={{ background: colors[i % colors.length], width: size, height: size, fontSize: size / 3 }}>
      {String.fromCharCode(65 + i)}
    </div>
  );
  if (variant === "sizes")
    return <Stage><div className="flex items-end gap-3">{[24, 32, 40, 56, 72].map((s, i) => <A key={s} i={i} size={s} />)}</div></Stage>;
  if (variant === "group" || variant === "group-lg") {
    const size = variant === "group-lg" ? 56 : 40;
    return (
      <Stage>
        <div className="flex -space-x-2">
          {Array.from({ length: 5 }).map((_, i) => <A key={i} i={i} size={size} />)}
          <div className="rounded-full grid place-items-center bg-canvas-soft border border-white text-ink text-xs" style={{ width: size, height: size }}>+8</div>
        </div>
      </Stage>
    );
  }
  if (variant === "status")
    return <Stage><div className="relative"><A i={1} size={56} /><span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-canvas" /></div></Stage>;
  if (variant === "square") return <Stage><A i={3} size={56} sq /></Stage>;
  if (variant === "initials") return <Stage><A i={4} size={56} /></Stage>;
  if (variant === "picker")
    return <Stage><div className="flex flex-wrap gap-2">{Array.from({ length: 8 }).map((_, i) => <A key={i} i={i} size={40} />)}</div></Stage>;
  return <Stage><A i={0} size={56} /></Stage>;
}

// ---------- OVERLAYS (visual previews) ----------
function Tooltip() {
  return (
    <Stage>
      <div className="relative">
        <button className="h-9 px-4 rounded-md border border-hairline bg-canvas text-sm">Hover me</button>
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-ink text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">Tooltip content<span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-ink" /></div>
      </div>
    </Stage>
  );
}
function Popover() {
  return (
    <Stage h="min-h-[320px]">
      <div className="bg-canvas border border-hairline rounded-lg p-4 w-72 pop-elev">
        <div className="text-sm font-medium text-ink">Share project</div>
        <div className="text-xs text-body mt-1">Invite collaborators by email</div>
        <div className="mt-3 flex gap-2">
          <input className="flex-1 h-8 rounded-md border border-hairline px-2 text-xs" placeholder="name@email.com" />
          <button className="h-8 px-3 rounded-md bg-ink text-white text-xs">Invite</button>
        </div>
      </div>
    </Stage>
  );
}
function Dropdown() {
  return (
    <Stage h="min-h-[320px]">
      <div className="bg-canvas border border-hairline rounded-lg w-56 py-1 pop-elev">
        {[{ i: User, t: "Profile" }, { i: Settings, t: "Settings" }, { i: Bell, t: "Notifications" }].map(({ i: I, t }) => (
          <button key={t} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-ink hover:bg-canvas-soft">
            <I className="h-4 w-4 text-mute" />{t}
          </button>
        ))}
        <div className="my-1 h-px bg-hairline" />
        <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-canvas-soft"><Trash2 className="h-4 w-4" />Sign out</button>
      </div>
    </Stage>
  );
}
function ContextMenu() { return <Dropdown />; }
function MenuBar() {
  return (
    <Stage>
      <div className="flex gap-1 bg-canvas border border-hairline rounded-md p-1">
        {["File", "Edit", "View", "Window", "Help"].map((m) => (
          <button key={m} className="px-3 h-7 rounded text-sm text-ink hover:bg-canvas-soft">{m}</button>
        ))}
      </div>
    </Stage>
  );
}
function CommandMenuP() {
  return (
    <Stage h="min-h-[360px]">
      <div className="bg-canvas border border-hairline rounded-xl w-[420px] pop-elev overflow-hidden">
        <div className="flex items-center gap-2 px-3 h-11 border-b border-hairline">
          <Search className="h-4 w-4 text-mute" />
          <input className="flex-1 bg-transparent text-sm outline-none" placeholder="Type a command or search…" />
          <kbd className="px-1.5 py-0.5 rounded-md border border-hairline text-[10px] font-mono">ESC</kbd>
        </div>
        <div className="py-2 max-h-64 overflow-auto">
          <div className="px-3 py-1 text-[11px] font-mono uppercase text-mute">Suggestions</div>
          {[{i:Sparkles,t:"Ask AI"},{i:FileText,t:"New document"},{i:Folder,t:"Open project"},{i:User,t:"Invite teammate"}].map(({i:I,t}) => (
            <button key={t} className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-canvas-soft"><I className="h-4 w-4 text-mute"/>{t}</button>
          ))}
        </div>
      </div>
    </Stage>
  );
}
function Modal({ variant }: { variant: V }) {
  return (
    <Stage h="min-h-[360px]">
      <div className="bg-canvas border border-hairline rounded-xl w-[420px] pop-elev p-6">
        <div className="flex items-center gap-2 text-ink">
          {variant === "alert" ? <AlertTriangle className="h-5 w-5 text-destructive"/> : <Info className="h-5 w-5 text-link"/>}
          <h3 className="text-base font-medium">{variant === "alert" ? "Delete project?" : variant === "dialog" ? "Edit profile" : "Welcome to Vanta"}</h3>
        </div>
        <p className="text-sm text-body mt-2">{variant === "alert" ? "This action cannot be undone. The project and all its data will be permanently removed." : "Confirm your details to continue."}</p>
        {variant === "dialog" && (
          <div className="mt-4 space-y-2">
            <input className="w-full h-9 rounded-md border border-hairline px-3 text-sm" placeholder="Display name" />
            <input className="w-full h-9 rounded-md border border-hairline px-3 text-sm" placeholder="Email" />
          </div>
        )}
        <div className="flex justify-end gap-2 mt-6">
          <button className="h-9 px-4 rounded-md text-sm hover:bg-canvas-soft">Cancel</button>
          <button className={`h-9 px-4 rounded-md text-sm text-white ${variant === "alert" ? "bg-destructive" : "bg-ink"}`}>Confirm</button>
        </div>
      </div>
    </Stage>
  );
}
function Drawer({ variant }: { variant: V }) {
  const bottom = variant === "bottom";
  return (
    <Stage h="min-h-[340px]" pad="p-0">
      <div className={`absolute inset-0 ${bottom ? "items-end" : "items-stretch justify-end"} flex`}>
        <div className={`bg-canvas border-l border-hairline ${bottom ? "w-full h-2/3 border-t border-l-0 rounded-t-2xl" : "w-80 h-full"} p-5`}>
          <div className="h-1 w-10 mx-auto rounded-full bg-hairline-strong mb-4" />
          <h3 className="text-base font-medium text-ink">Filters</h3>
          <div className="text-sm text-body mt-2">Drawer content panel</div>
        </div>
      </div>
    </Stage>
  );
}
function HoverCard() {
  return (
    <Stage h="min-h-[260px]">
      <div className="bg-canvas border border-hairline rounded-lg p-4 w-72 pop-elev">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full" style={{ background: "linear-gradient(135deg,#7928ca,#ff0080)" }} />
          <div>
            <div className="text-sm font-medium text-ink">@iqbal.s</div>
            <div className="text-xs text-mute">Full-stack engineer · AI</div>
          </div>
        </div>
        <p className="text-sm text-body mt-3">Building things on the edge. Vanta UI maintainer.</p>
      </div>
    </Stage>
  );
}

// ---------- NAV ----------
function Navbar({ variant }: { variant: V }) {
  const centered = variant === "centered";
  return (
    <Stage pad="p-0" h="min-h-[110px]">
      <div className="absolute inset-0">
        <div className="h-14 px-5 border-b border-hairline flex items-center gap-4 bg-canvas">
          <div className="font-medium text-ink">▲ Vanta</div>
          <nav className={`flex gap-1 text-sm text-body ${centered ? "mx-auto" : ""}`}>
            {["Docs","Components","Templates","Pricing"].map((l) => <a key={l} className="px-2 py-1 rounded-full hover:bg-canvas-soft">{l}</a>)}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <button className="h-7 px-2 text-xs rounded-md border border-hairline">Login</button>
            <button className="h-7 px-2 text-xs rounded-md bg-ink text-white">Sign up</button>
          </div>
        </div>
      </div>
    </Stage>
  );
}
function Sidebar() {
  return (
    <Stage pad="p-0" h="min-h-[360px]">
      <div className="absolute inset-0 flex">
        <aside className="w-56 border-r border-hairline bg-canvas p-3 space-y-1">
          <div className="font-medium text-ink px-2 py-2">▲ Vanta</div>
          {[{i:Home,t:"Overview",a:true},{i:Folder,t:"Projects"},{i:User,t:"Team"},{i:Settings,t:"Settings"}].map(({i:I,t,a}) => (
            <button key={t} className={`w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm ${a ? "bg-canvas-soft text-ink" : "text-body hover:bg-canvas-soft"}`}>
              <I className="h-4 w-4" />{t}
            </button>
          ))}
        </aside>
        <main className="flex-1 p-6">
          <div className="text-xl font-medium text-ink">Overview</div>
          <div className="grid-bg fade-mask h-32 mt-4 rounded-lg border border-hairline" />
        </main>
      </div>
    </Stage>
  );
}
function Tabs({ variant }: { variant: V }) {
  const [a, setA] = useState(0);
  const tabs = ["Overview", "Analytics", "Settings"];
  if (variant === "vertical")
    return (
      <Stage>
        <div className="flex gap-6 w-full max-w-md">
          <div className="flex flex-col gap-1">
            {tabs.map((t, i) => <button key={t} onClick={()=>setA(i)} className={`px-3 py-2 rounded-md text-sm text-left ${a===i?"bg-canvas-soft text-ink":"text-body"}`}>{t}</button>)}
          </div>
          <div className="flex-1 p-4 border border-hairline rounded-lg text-sm text-body">{tabs[a]} content</div>
        </div>
      </Stage>
    );
  if (variant === "pill")
    return <Stage><div className="bg-canvas-soft p-1 rounded-full flex">{tabs.map((t,i) => <button key={t} onClick={()=>setA(i)} className={`px-4 h-8 rounded-full text-sm ${a===i?"bg-canvas text-ink shadow-sm":"text-body"}`}>{t}</button>)}</div></Stage>;
  return (
    <Stage>
      <div className="w-full max-w-md">
        <div className="flex gap-6 border-b border-hairline">
          {tabs.map((t,i) => <button key={t} onClick={()=>setA(i)} className={`pb-2 text-sm relative ${a===i?"text-ink":"text-body"}`}>{t}{a===i && <span className="absolute -bottom-px left-0 right-0 h-px bg-ink"/>}</button>)}
        </div>
        <div className="pt-4 text-sm text-body">{tabs[a]} content</div>
      </div>
    </Stage>
  );
}
function Accordion() {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    ["What is Vanta UI?", "An inspired UI component library for React and Tailwind."],
    ["Is it free?", "Yes, MIT licensed and open-source."],
    ["Frameworks supported?", "React 19, TanStack Start, Next.js."],
  ];
  return (
    <Stage>
      <div className="w-full max-w-md divide-y divide-hairline border border-hairline rounded-lg bg-canvas">
        {items.map(([q, a], i) => (
          <div key={q}>
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-4 py-3 text-sm text-ink">
              {q}<ChevronDown className={`h-4 w-4 transition ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <div className="px-4 pb-3 text-sm text-body">{a}</div>}
          </div>
        ))}
      </div>
    </Stage>
  );
}
function Collapse() {
  const [open, setOpen] = useState(true);
  return (
    <Stage>
      <div className="w-full max-w-md border border-hairline rounded-lg overflow-hidden bg-canvas">
        <button onClick={()=>setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 text-sm text-ink">Details<ChevronRight className={`h-4 w-4 transition ${open?"rotate-90":""}`}/></button>
        {open && <div className="px-4 pb-3 text-sm text-body">Smooth collapsing region with simple toggle.</div>}
      </div>
    </Stage>
  );
}
function Breadcrumb() {
  return (
    <Stage>
      <nav className="text-sm text-body flex items-center gap-1">
        <a className="hover:text-ink">Docs</a><span className="text-mute">/</span>
        <a className="hover:text-ink">Components</a><span className="text-mute">/</span>
        <span className="text-ink">Button</span>
      </nav>
    </Stage>
  );
}
function Pagination() {
  const [p, setP] = useState(2);
  return (
    <Stage>
      <div className="flex items-center gap-1">
        {[1,2,3,4,5].map((n) => (
          <button key={n} onClick={()=>setP(n)} className={`h-8 w-8 rounded-md text-sm ${p===n?"bg-ink text-white":"border border-hairline text-ink"}`}>{n}</button>
        ))}
        <button className="h-8 w-8 rounded-md border border-hairline grid place-items-center"><ChevronRight className="h-4 w-4"/></button>
      </div>
    </Stage>
  );
}
function Stepper() {
  return (
    <Stage>
      <div className="flex items-center gap-3">
        {["Account","Workspace","Invite","Deploy"].map((s,i) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`h-7 w-7 grid place-items-center rounded-full text-xs ${i<2?"bg-ink text-white":i===2?"border-2 border-ink text-ink":"border border-hairline text-mute"}`}>{i<2 ? <Check className="h-4 w-4"/> : i+1}</div>
            <div className={`text-sm ${i<=2?"text-ink":"text-mute"}`}>{s}</div>
            {i<3 && <div className="w-6 h-px bg-hairline"/>}
          </div>
        ))}
      </div>
    </Stage>
  );
}
function Dock() {
  return (
    <Stage>
      <div className="flex gap-2 p-2 rounded-2xl border border-hairline bg-canvas/80 backdrop-blur pop-elev">
        {[Home, Folder, FileText, ImageIcon, Settings, Bell].map((I, i) => (
          <motion.button key={i} whileHover={{ scale: 1.2, y: -6 }} className="h-12 w-12 grid place-items-center rounded-xl bg-canvas-soft text-ink"><I className="h-5 w-5"/></motion.button>
        ))}
      </div>
    </Stage>
  );
}
function FloatingMenu() {
  return (
    <Stage>
      <div className="flex flex-col items-end gap-2">
        {[Star, Heart, Mail, Plus].map((I,i) => <motion.button key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}} className="h-10 w-10 rounded-full bg-ink text-white grid place-items-center pop-elev"><I className="h-4 w-4"/></motion.button>)}
      </div>
    </Stage>
  );
}
function UserMenu({ variant }: { variant: V }) {
  return (
    <Stage h="min-h-[340px]">
      <div className="bg-canvas border border-hairline rounded-xl w-64 pop-elev p-2">
        <div className="flex items-center gap-3 p-2">
          <div className="h-9 w-9 rounded-full" style={{ background: "linear-gradient(135deg,#0070f3,#50e3c2)" }} />
          <div>
            <div className="text-sm font-medium text-ink">M Iqbal S</div>
            <div className="text-xs text-mute">iqbal@vanta.dev</div>
          </div>
        </div>
        <div className="h-px bg-hairline my-1" />
        {["Profile","Billing","Team","Settings"].map((t) => <button key={t} className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-canvas-soft">{t}</button>)}
        <div className="h-px bg-hairline my-1" />
        <button className="w-full text-left px-3 py-2 text-sm rounded-md text-destructive hover:bg-canvas-soft">Sign out</button>
      </div>
    </Stage>
  );
}

// ---------- CARDS ----------
function Card({ variant }: { variant: V }) {
  if (variant === "glass") return (
    <Stage pad="p-10" h="min-h-[320px]">
      <div className="absolute inset-0 mesh-bg opacity-80" />
      <div className="relative bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl p-6 w-80 text-ink">
        <Sparkles className="h-5 w-5 mb-3" />
        <div className="font-medium">Glass panel</div>
        <p className="text-sm text-ink/80 mt-1">Layered over the brand mesh gradient.</p>
      </div>
    </Stage>
  );
  if (variant === "spotlight" || variant === "glow") return (
    <Stage h="min-h-[300px]">
      <div className="relative bg-canvas border border-hairline rounded-xl p-6 w-80 overflow-hidden">
        <div className="absolute -inset-px rounded-xl opacity-50 pointer-events-none" style={{ background: "conic-gradient(from 90deg, transparent, #7928ca, transparent 30%)" }} />
        <div className="relative">
          <div className="text-xs text-mute font-mono uppercase">Spotlight</div>
          <div className="font-medium text-ink mt-1">Edge-lit card</div>
          <p className="text-sm text-body mt-2">Animated conic gradient glow on the border.</p>
        </div>
      </div>
    </Stage>
  );
  if (variant === "profile") return (
    <Stage>
      <div className="bg-canvas border border-hairline rounded-xl p-5 w-72">
        <div className="h-14 w-14 rounded-full" style={{ background: "linear-gradient(135deg,#ff4d4d,#f9cb28)" }} />
        <div className="font-medium text-ink mt-3">M Iqbal S</div>
        <div className="text-sm text-body">Full-stack engineer & AI enthusiast</div>
        <div className="flex gap-2 mt-4">
          <button className="flex-1 h-8 rounded-md bg-ink text-white text-xs">Follow</button>
          <button className="flex-1 h-8 rounded-md border border-hairline text-xs">Message</button>
        </div>
      </div>
    </Stage>
  );
  if (variant === "product") return (
    <Stage>
      <div className="bg-canvas border border-hairline rounded-xl overflow-hidden w-64">
        <div className="h-32 mesh-bg" />
        <div className="p-4">
          <div className="text-xs text-mute font-mono uppercase">New</div>
          <div className="font-medium text-ink">Geist Sneakers</div>
          <div className="flex justify-between mt-2 text-sm"><span className="text-body">Edition 02</span><span className="text-ink font-medium">$129</span></div>
        </div>
      </div>
    </Stage>
  );
  if (variant === "stat" || variant === "analytics" || variant === "stat-spark")
    return (
      <Stage>
        <div className="bg-canvas border border-hairline rounded-xl p-5 w-72">
          <div className="text-xs font-mono uppercase text-mute">Monthly revenue</div>
          <div className="text-3xl font-medium text-ink mt-1 tabular-nums">$48,219</div>
          <div className="text-xs text-success mt-1">+ 12.4% vs last month</div>
          <svg viewBox="0 0 200 60" className="mt-4 w-full h-12">
            <polyline fill="none" stroke="#0070f3" strokeWidth="2" points="0,40 20,32 40,38 60,20 80,28 100,18 120,24 140,12 160,18 180,8 200,14" />
          </svg>
        </div>
      </Stage>
    );
  if (variant === "pricing" || variant === "pricing-featured") {
    const featured = variant === "pricing-featured";
    return (
      <Stage>
        <div className={`rounded-xl p-6 w-64 border ${featured ? "bg-ink text-white border-ink" : "bg-canvas text-ink border-hairline"}`}>
          <div className="text-xs font-mono uppercase opacity-70">{featured ? "Pro" : "Hobby"}</div>
          <div className="text-3xl font-medium mt-2 tabular-nums">${featured ? 20 : 0}<span className="text-sm opacity-60">/mo</span></div>
          <ul className="text-sm mt-4 space-y-2 opacity-90">
            {["Unlimited deploys","Edge functions","Priority support"].map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 mt-0.5"/>{f}</li>)}
          </ul>
          <button className={`mt-5 w-full h-9 rounded-full text-sm ${featured ? "bg-white text-ink" : "bg-ink text-white"}`}>Choose plan</button>
        </div>
      </Stage>
    );
  }
  if (variant === "feature") return (
    <Stage>
      <div className="bg-canvas border border-hairline rounded-xl p-6 w-72">
        <div className="h-10 w-10 rounded-lg bg-canvas-soft grid place-items-center"><Sparkles className="h-5 w-5"/></div>
        <div className="font-medium text-ink mt-3">Instant previews</div>
        <p className="text-sm text-body mt-1">Every PR ships with a unique URL.</p>
      </div>
    </Stage>
  );
  if (variant === "template" || variant === "showcase") return (
    <Stage>
      <div className="bg-canvas border border-hairline rounded-xl overflow-hidden w-72">
        <div className="h-32 grid-bg" />
        <div className="p-4">
          <div className="font-medium text-ink">Next.js Commerce</div>
          <div className="text-xs text-body">Boilerplate starter for storefronts</div>
        </div>
      </div>
    </Stage>
  );
  return (
    <Stage>
      <div className="bg-canvas border border-hairline rounded-xl p-6 w-72 card-elev">
        <div className="font-medium text-ink">Card title</div>
        <p className="text-sm text-body mt-1">Hairline card on canvas — the brand's resting elevation.</p>
        <button className="mt-4 h-8 px-3 rounded-full bg-ink text-white text-xs">Action</button>
      </div>
    </Stage>
  );
}

// ---------- FEEDBACK ----------
function Toast({ variant }: { variant: V }) {
  if (variant === "stack")
    return (
      <Stage h="min-h-[260px]">
        <div className="space-y-2 w-80">
          {["Deployment ready","Build succeeded","Domain attached"].map((t,i) => (
            <div key={t} className="flex items-center gap-2 bg-canvas border border-hairline rounded-md p-3 pop-elev">
              <CheckCircle2 className="h-4 w-4 text-success" /><span className="text-sm">{t}</span>
            </div>
          ))}
        </div>
      </Stage>
    );
  return (
    <Stage>
      <div className="bg-canvas border border-hairline rounded-md p-3 pop-elev flex items-center gap-3 w-80">
        <CheckCircle2 className="h-4 w-4 text-success" />
        <div className="text-sm">Project deployed</div>
        <button className="ml-auto text-xs text-link">Open</button>
      </div>
    </Stage>
  );
}
function Alert({ variant }: { variant: V }) {
  const map: any = {
    success: [CheckCircle2, "text-success", "#aaffec33", "Deployment successful"],
    warning: [AlertTriangle, "text-warning", "#ffefcf80", "Caution: build cache cleared"],
    error: [XCircle, "text-destructive", "#f7d4d680", "Something went wrong"],
  };
  const [I, c, bg, label] = map[variant ?? ""] ?? [Info, "text-link", "#d3e5ff80", "Heads up — Vanta UI is in beta."];
  return (
    <Stage>
      <div className="flex items-start gap-3 p-4 rounded-lg border border-hairline w-full max-w-md" style={{ background: bg as string }}>
        <I className={`h-5 w-5 ${c}`} />
        <div>
          <div className="text-sm font-medium text-ink">{label as string}</div>
          <div className="text-xs text-body mt-1">Detail message lives here for context.</div>
        </div>
      </div>
    </Stage>
  );
}
function Banner() {
  return (
    <Stage>
      <div className="w-full max-w-xl rounded-full bg-canvas-soft border border-hairline px-4 py-2 text-sm text-body flex items-center gap-2">
        <Sparkles className="h-4 w-4" /> Vanta UI v1.0 is here — explore the new mesh hero. <a className="text-link ml-auto">Read post →</a>
      </div>
    </Stage>
  );
}
function Progress({ variant }: { variant: V }) {
  if (variant === "circular") {
    const v = 72;
    return (
      <Stage>
        <div className="relative h-24 w-24">
          <svg viewBox="0 0 100 100" className="-rotate-90 h-24 w-24">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#ebebeb" strokeWidth="8" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="#171717" strokeWidth="8" strokeDasharray={`${(v/100)*276} 276`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-sm tabular-nums">{v}%</div>
        </div>
      </Stage>
    );
  }
  return (
    <Stage>
      <div className="w-full max-w-md">
        <div className="flex justify-between text-xs text-body mb-2"><span>Uploading…</span><span className="tabular-nums">64%</span></div>
        <div className="h-1.5 bg-canvas-soft rounded-full overflow-hidden"><motion.div initial={{width:0}} animate={{width:"64%"}} transition={{duration:1.2}} className="h-full bg-ink" /></div>
      </div>
    </Stage>
  );
}
function Skeleton() {
  return (
    <Stage>
      <div className="w-full max-w-md space-y-3">
        <div className="h-4 w-2/3 rounded-md bg-canvas-soft shimmer" />
        <div className="h-4 w-full rounded-md bg-canvas-soft shimmer" />
        <div className="h-4 w-1/2 rounded-md bg-canvas-soft shimmer" />
        <div className="h-32 rounded-lg bg-canvas-soft shimmer" />
      </div>
    </Stage>
  );
}
function Loader({ variant }: { variant: V }) {
  if (variant === "ring") return <Stage><Loader2 className="h-8 w-8 animate-spin text-ink" /></Stage>;
  return (
    <Stage>
      <div className="flex gap-1">
        {[0,1,2].map((i) => <motion.span key={i} animate={{y:[0,-6,0]}} transition={{repeat:Infinity,duration:0.9,delay:i*0.15}} className="h-2 w-2 rounded-full bg-ink"/>)}
      </div>
    </Stage>
  );
}

// ---------- FORMS ----------
function Input({ variant }: { variant: V }) {
  if (variant === "sizes")
    return (
      <Stage>
        <div className="w-full max-w-md space-y-2">
          {[["h-8 text-xs","Small"],["h-10 text-sm","Medium"],["h-12 text-base","Large"]].map(([c,p]) => (
            <input key={p} placeholder={p as string} className={`w-full ${c} rounded-md border border-hairline px-3`} />
          ))}
        </div>
      </Stage>
    );
  if (variant === "icon")
    return (
      <Stage>
        <div className="relative w-full max-w-md">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mute" />
          <input placeholder="you@vanta.dev" className="w-full h-10 pl-9 pr-3 rounded-md border border-hairline text-sm" />
        </div>
      </Stage>
    );
  if (variant === "search")
    return (
      <Stage>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mute" />
          <input placeholder="Search components…" className="w-full h-10 pl-9 pr-16 rounded-md border border-hairline text-sm bg-canvas" />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-md border border-hairline text-[10px] font-mono">⌘K</kbd>
        </div>
      </Stage>
    );
  if (variant === "password") {
    const [show, setShow] = useState(false);
    return (
      <Stage>
        <div className="relative w-full max-w-md">
          <input type={show?"text":"password"} defaultValue="supersecret" className="w-full h-10 pr-10 pl-3 rounded-md border border-hairline text-sm" />
          <button onClick={()=>setShow(!show)} className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center text-mute">{show?<EyeOff className="h-4 w-4"/>:<Eye className="h-4 w-4"/>}</button>
        </div>
      </Stage>
    );
  }
  if (variant === "tags") {
    return (
      <Stage>
        <div className="w-full max-w-md min-h-10 rounded-md border border-hairline px-2 py-1 flex flex-wrap gap-1 items-center">
          {["design","systems","mesh"].map((t) => <span key={t} className="bg-canvas-soft rounded-full text-xs px-2 py-0.5">{t} ×</span>)}
          <input className="flex-1 min-w-[80px] text-sm outline-none px-1" placeholder="Add tag" />
        </div>
      </Stage>
    );
  }
  if (variant === "mention") {
    return (
      <Stage>
        <input defaultValue="@iqbal can you review this?" className="w-full max-w-md h-10 rounded-md border border-hairline px-3 text-sm" />
      </Stage>
    );
  }
  return <Stage><input placeholder="Type something…" className="w-full max-w-md h-10 rounded-md border border-hairline px-3 text-sm" /></Stage>;
}
function Textarea() { return <Stage><textarea placeholder="Tell us more…" className="w-full max-w-md h-28 rounded-md border border-hairline px-3 py-2 text-sm resize-none" /></Stage>; }
function OTP({ variant }: { variant: V }) {
  const len = variant === "pin" ? 4 : 6;
  return (
    <Stage>
      <div className="flex gap-2">
        {Array.from({length:len}).map((_, i) => (
          <input key={i} maxLength={1} defaultValue={i<3 ? String(i+1) : ""} className="h-12 w-10 rounded-md border border-hairline text-center text-lg font-mono" />
        ))}
      </div>
    </Stage>
  );
}
function Checkbox({ variant }: { variant: V }) {
  const Item = ({ d, label }: any) => (
    <label className="flex items-center gap-2 text-sm">
      <span className={`h-4 w-4 rounded border ${d?"bg-ink border-ink":"border-hairline-strong bg-canvas"} grid place-items-center`}>{d && <Check className="h-3 w-3 text-white"/>}</span>{label}
    </label>
  );
  if (variant === "group") return <Stage><div className="space-y-2">{["Email","SMS","Push","In-app"].map((l,i) => <Item key={l} d={i<2} label={l}/>)}</div></Stage>;
  return <Stage><Item d label="I agree to the terms"/></Stage>;
}
function Radio() {
  const [v, setV] = useState("hobby");
  return (
    <Stage>
      <div className="space-y-2">
        {[["hobby","Hobby"],["pro","Pro"],["ent","Enterprise"]].map(([k,l]) => (
          <label key={k} className="flex items-center gap-2 text-sm" onClick={()=>setV(k)}>
            <span className={`h-4 w-4 rounded-full border-2 ${v===k?"border-ink":"border-hairline-strong"} grid place-items-center`}>{v===k && <span className="h-2 w-2 rounded-full bg-ink"/>}</span>{l}
          </label>
        ))}
      </div>
    </Stage>
  );
}
function Switch() {
  const [on, setOn] = useState(true);
  return (
    <Stage>
      <button onClick={()=>setOn(!on)} className={`h-6 w-10 rounded-full transition relative ${on?"bg-ink":"bg-hairline-strong"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${on?"left-[18px]":"left-0.5"}`} />
      </button>
    </Stage>
  );
}
function Slider({ variant }: { variant: V }) {
  return (
    <Stage>
      <div className="w-full max-w-md">
        <div className="relative h-1 rounded-full bg-canvas-soft">
          <div className="absolute h-1 rounded-full bg-ink" style={{ left: variant === "range" ? "20%" : 0, width: variant === "range" ? "50%" : "70%" }} />
          {variant === "range" && <span className="absolute -top-1.5 h-4 w-4 rounded-full bg-canvas border-2 border-ink" style={{ left: "calc(20% - 8px)" }} />}
          <span className="absolute -top-1.5 h-4 w-4 rounded-full bg-canvas border-2 border-ink" style={{ left: variant === "range" ? "calc(70% - 8px)" : "calc(70% - 8px)" }} />
        </div>
      </div>
    </Stage>
  );
}
function Select({ variant }: { variant: V }) {
  if (variant === "multi")
    return (
      <Stage>
        <div className="w-full max-w-md min-h-10 rounded-md border border-hairline px-2 py-1 flex flex-wrap gap-1 items-center">
          {["React","Tailwind","Vite"].map((t) => <span key={t} className="bg-canvas-soft rounded-full text-xs px-2 py-0.5">{t} ×</span>)}
          <span className="text-mute text-sm px-1">Select…</span>
        </div>
      </Stage>
    );
  if (variant === "combobox")
    return (
      <Stage h="min-h-[340px]">
        <div className="w-full max-w-md bg-canvas border border-hairline rounded-md overflow-hidden pop-elev">
          <div className="flex items-center gap-2 px-3 h-10 border-b border-hairline"><Search className="h-4 w-4 text-mute"/><input placeholder="Search…" className="flex-1 bg-transparent text-sm outline-none"/></div>
          {["Apple","Banana","Cherry","Date"].map((f,i) => (
            <button key={f} className={`w-full text-left px-3 py-2 text-sm flex justify-between ${i===0?"bg-canvas-soft":""}`}>{f}{i===0 && <Check className="h-4 w-4"/>}</button>
          ))}
        </div>
      </Stage>
    );
  return <Stage><div className="relative w-full max-w-md"><select className="w-full h-10 rounded-md border border-hairline px-3 text-sm appearance-none"><option>Production</option><option>Preview</option></select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mute pointer-events-none"/></div></Stage>;
}
function DatePicker({ variant }: { variant: V }) {
  if (variant === "time") return <Stage><div className="flex gap-2 font-mono text-2xl">{["10","42"].map((n,i)=><span key={i} className="bg-canvas-soft px-3 py-2 rounded-md tabular-nums">{n}</span>)}<span className="self-center text-mute">PM</span></div></Stage>;
  if (variant === "calendar") {
    return (
      <Stage>
        <div className="bg-canvas border border-hairline rounded-lg p-4 w-72">
          <div className="flex items-center justify-between text-sm mb-3"><span>May 2026</span><div className="flex gap-1"><button className="h-7 w-7 grid place-items-center rounded-md hover:bg-canvas-soft">‹</button><button className="h-7 w-7 grid place-items-center rounded-md hover:bg-canvas-soft">›</button></div></div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-mute font-mono">{["S","M","T","W","T","F","S"].map((d,i)=><div key={i}>{d}</div>)}</div>
          <div className="grid grid-cols-7 gap-1 mt-1">{Array.from({length:31}).map((_,i)=><button key={i} className={`h-8 rounded-md text-xs ${i===12?"bg-ink text-white":"hover:bg-canvas-soft"}`}>{i+1}</button>)}</div>
        </div>
      </Stage>
    );
  }
  return (
    <Stage>
      <button className="h-10 px-3 rounded-md border border-hairline text-sm inline-flex items-center gap-2"><CalendarIcon className="h-4 w-4"/>May 26, 2026</button>
    </Stage>
  );
}
function Form({ variant }: { variant: V }) {
  const title = variant === "register" ? "Create your account" : variant === "forgot" ? "Reset your password" : variant === "settings" ? "Workspace settings" : "Welcome back";
  return (
    <Stage h="min-h-[420px]">
      <div className="bg-canvas border border-hairline rounded-xl p-6 w-[360px] pop-elev">
        <div className="text-xl font-medium text-ink">{title}</div>
        <div className="text-sm text-body mt-1">Continue with your Vanta UI account.</div>
        <div className="space-y-3 mt-5">
          {variant === "register" && <input placeholder="Full name" className="w-full h-10 rounded-md border border-hairline px-3 text-sm" />}
          <input placeholder="Email" className="w-full h-10 rounded-md border border-hairline px-3 text-sm" />
          {variant !== "forgot" && <input type="password" placeholder="Password" className="w-full h-10 rounded-md border border-hairline px-3 text-sm" />}
          <button className="w-full h-10 rounded-md bg-ink text-white text-sm">{variant === "forgot" ? "Send reset link" : "Continue"}</button>
          <div className="flex items-center gap-2 text-xs text-mute"><div className="flex-1 h-px bg-hairline"/>or<div className="flex-1 h-px bg-hairline"/></div>
          <button className="w-full h-10 rounded-md border border-hairline text-sm inline-flex justify-center items-center gap-2"><Github className="h-4 w-4"/>Continue with GitHub</button>
        </div>
      </div>
    </Stage>
  );
}
function Field({ variant }: { variant: V }) {
  if (variant === "label") return <Stage><label className="text-sm font-medium text-ink">Display name</label></Stage>;
  return (
    <Stage>
      <div className="w-full max-w-md space-y-1.5">
        <label className="text-sm font-medium text-ink flex justify-between">Display name <span className="text-xs text-mute">required</span></label>
        <input className="w-full h-10 rounded-md border border-hairline px-3 text-sm" placeholder="Your name" />
        <div className="text-xs text-body">This is how others will see you.</div>
      </div>
    </Stage>
  );
}
function Upload({ variant }: { variant: V }) {
  if (variant === "drag")
    return (
      <Stage>
        <div className="border-2 border-dashed border-hairline rounded-xl w-full max-w-md p-8 text-center bg-canvas-soft">
          <UploadIcon className="h-6 w-6 mx-auto text-mute"/>
          <div className="text-sm mt-2">Drop files here or <span className="text-link">browse</span></div>
          <div className="text-xs text-mute mt-1">PNG, JPG up to 10MB</div>
        </div>
      </Stage>
    );
  return (
    <Stage>
      <div className="flex items-center gap-3 w-full max-w-md">
        <button className="h-10 px-4 rounded-md border border-hairline text-sm">Choose file</button>
        <div className="text-sm text-mute">No file selected</div>
      </div>
    </Stage>
  );
}
function ColorPicker() {
  const palette = ["#171717","#0070f3","#7928ca","#ff0080","#50e3c2","#f5a623","#ee0000","#ffffff"];
  const [c, setC] = useState(palette[1]);
  return (
    <Stage>
      <div className="bg-canvas border border-hairline rounded-lg p-4 w-64">
        <div className="h-16 rounded-md mb-3" style={{ background: c }} />
        <div className="grid grid-cols-8 gap-1">{palette.map((p) => <button key={p} onClick={()=>setC(p)} className="h-6 w-6 rounded-md border border-hairline" style={{ background: p }} />)}</div>
        <div className="font-mono text-xs mt-3">{c}</div>
      </div>
    </Stage>
  );
}
function Rating() {
  const [v, setV] = useState(4);
  return <Stage><div className="flex gap-1">{[1,2,3,4,5].map((n) => <button key={n} onClick={()=>setV(n)}><Star className={`h-6 w-6 ${n<=v?"fill-[#f5a623] stroke-[#f5a623]":"text-hairline-strong"}`}/></button>)}</div></Stage>;
}

// ---------- DATA DISPLAY ----------
function Table({ variant }: { variant: V }) {
  const rows = [
    ["api-server","Production","2m ago","✓"],
    ["edge-fn-vanta","Preview","1h ago","✓"],
    ["docs-site","Production","3h ago","✓"],
    ["mobile-app","Failed","6h ago","×"],
  ];
  return (
    <Stage>
      <div className="w-full max-w-2xl border border-hairline rounded-lg overflow-hidden bg-canvas">
        <table className="w-full text-sm">
          <thead className="bg-canvas-soft">
            <tr>{["Project","Status","Updated",""].map((h) => <th key={h} className="text-left px-3 py-2 font-mono text-[11px] uppercase text-mute">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-t border-hairline">
                <td className="px-3 py-2 font-mono text-xs">{r[0]}</td>
                <td className="px-3 py-2"><span className={`text-xs px-2 py-0.5 rounded-full ${r[1]==="Failed"?"bg-[#f7d4d6] text-[#c50000]":"bg-[#aaffec] text-[#29bc9b]"}`}>{r[1]}</span></td>
                <td className="px-3 py-2 text-body">{r[2]}</td>
                <td className="px-3 py-2 text-right"><button className="text-mute"><MoreHorizontal className="h-4 w-4"/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Stage>
  );
}
function List({ variant }: { variant: V }) {
  if (variant === "desc")
    return (
      <Stage>
        <dl className="w-full max-w-md text-sm divide-y divide-hairline border border-hairline rounded-lg bg-canvas">
          {[["Plan","Pro"],["Region","iad1"],["Build time","2m 14s"],["Framework","TanStack Start"]].map(([k,v]) => (
            <div key={k} className="flex justify-between px-4 py-2"><dt className="text-body">{k}</dt><dd className="text-ink font-mono text-xs">{v}</dd></div>
          ))}
        </dl>
      </Stage>
    );
  if (variant === "status")
    return (
      <Stage>
        <div className="w-full max-w-lg space-y-2">
          {["API","CDN","Edge functions","Dashboard"].map((s) => (
            <div key={s} className="flex items-center justify-between p-3 rounded-md border border-hairline">
              <div className="text-sm">{s}</div>
              <span className="text-xs text-success flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-success"/>Operational</span>
            </div>
          ))}
        </div>
      </Stage>
    );
  if (variant === "virtual") {
    return (
      <Stage>
        <div className="w-full max-w-md h-48 overflow-y-auto border border-hairline rounded-md bg-canvas divide-y divide-hairline">
          {Array.from({length:30}).map((_,i)=>(<div key={i} className="px-3 py-2 text-sm flex justify-between"><span>Row #{i+1}</span><span className="text-mute font-mono text-xs">v{i+1}.0</span></div>))}
        </div>
      </Stage>
    );
  }
  return (
    <Stage>
      <ul className="w-full max-w-md divide-y divide-hairline border border-hairline rounded-lg bg-canvas">
        {["Documentation","Components","Templates","Examples"].map((t) => (
          <li key={t} className="px-4 py-3 text-sm flex justify-between"><span>{t}</span><ChevronRight className="h-4 w-4 text-mute"/></li>
        ))}
      </ul>
    </Stage>
  );
}
function Grid() {
  return (
    <Stage>
      <div className="grid grid-cols-3 gap-2 w-full max-w-md">{Array.from({length:9}).map((_,i)=><div key={i} className="aspect-square rounded-md bg-canvas-soft border border-hairline"/>)}</div>
    </Stage>
  );
}
function Tree({ variant }: { variant: V }) {
  const Item = ({ icon: I, name, indent = 0 }: any) => (
    <div className="flex items-center gap-2 py-1 text-sm" style={{ paddingLeft: indent * 16 }}>
      <I className="h-4 w-4 text-mute" />{name}
    </div>
  );
  return (
    <Stage>
      <div className="w-full max-w-md font-mono text-xs">
        <Item icon={Folder} name="src" />
        <Item icon={Folder} name="components" indent={1} />
        <Item icon={FileText} name="Button.tsx" indent={2} />
        <Item icon={FileText} name="Card.tsx" indent={2} />
        <Item icon={Folder} name="lib" indent={1} />
        <Item icon={FileText} name="utils.ts" indent={2} />
        <Item icon={FileText} name="package.json" />
      </div>
    </Stage>
  );
}
function Timeline() {
  return (
    <Stage>
      <ol className="relative pl-6 w-full max-w-md">
        <div className="absolute left-2 top-2 bottom-2 w-px bg-hairline" />
        {[["Deployed","Just now"],["Build complete","2m ago"],["Build started","3m ago"],["Push to main","4m ago"]].map(([t,s]) => (
          <li key={t} className="relative pb-4">
            <span className="absolute -left-[18px] top-1 h-3 w-3 rounded-full bg-ink" />
            <div className="text-sm text-ink">{t}</div>
            <div className="text-xs text-mute">{s}</div>
          </li>
        ))}
      </ol>
    </Stage>
  );
}
function Feed({ variant }: { variant: V }) {
  return (
    <Stage>
      <div className="w-full max-w-md space-y-3">
        {[
          { i: User, t: "iqbal shipped Vanta UI v1.0", s: "Just now" },
          { i: FileText, t: "New blog post: Mesh gradients", s: "1h ago" },
          { i: Bell, t: "Domain attached", s: "3h ago" },
        ].map(({ i: I, t, s }) => (
          <div key={t} className="flex items-start gap-3 p-3 rounded-lg border border-hairline">
            <I className="h-4 w-4 mt-0.5 text-mute" />
            <div className="flex-1"><div className="text-sm text-ink">{t}</div><div className="text-xs text-mute">{s}</div></div>
          </div>
        ))}
      </div>
    </Stage>
  );
}
function Stats({ variant }: { variant: V }) {
  const items = [["1.2M","Requests"],["48ms","p95 latency"],["99.99%","Uptime"],["+34%","Conversion"]];
  if (variant === "band")
    return (
      <Stage h="min-h-[200px]"><div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">{items.map(([n,l])=>(<div key={l}><div className="text-4xl font-medium tabular-nums">{n}</div><div className="text-xs font-mono uppercase text-mute mt-1">{l}</div></div>))}</div></Stage>
    );
  return (
    <Stage><div className="grid grid-cols-2 gap-6 w-full max-w-md">{items.map(([n,l])=>(<div key={l}><div className="text-2xl font-medium tabular-nums">{n}</div><div className="text-xs text-mute">{l}</div></div>))}</div></Stage>
  );
}
function Empty() {
  return (
    <Stage h="min-h-[300px]">
      <div className="text-center max-w-sm">
        <div className="h-14 w-14 mx-auto rounded-2xl bg-canvas-soft grid place-items-center"><Folder className="h-6 w-6 text-mute"/></div>
        <div className="font-medium text-ink mt-3">No projects yet</div>
        <div className="text-sm text-body mt-1">Create your first project to start deploying.</div>
        <button className="mt-4 h-9 px-4 rounded-full bg-ink text-white text-sm">New project</button>
      </div>
    </Stage>
  );
}
function Divider({ variant }: { variant: V }) {
  if (variant === "label")
    return <Stage><div className="flex items-center gap-3 w-full max-w-md"><div className="flex-1 h-px bg-hairline"/><span className="text-xs font-mono uppercase text-mute">or continue with</span><div className="flex-1 h-px bg-hairline"/></div></Stage>;
  return <Stage><div className="h-px w-full max-w-md bg-hairline"/></Stage>;
}
function Kanban() {
  const cols = [["Backlog",["Mesh gradient","Search modal"]],["In progress",["Pricing page","Docs theme"]],["Done",["Auth flow"]]];
  return (
    <Stage h="min-h-[320px]">
      <div className="grid grid-cols-3 gap-3 w-full">
        {cols.map(([name, items]: any) => (
          <div key={name} className="bg-canvas-soft rounded-lg p-2">
            <div className="text-xs font-mono uppercase text-mute px-1 py-2">{name}</div>
            <div className="space-y-2">{items.map((t: string) => <div key={t} className="bg-canvas border border-hairline rounded-md p-2 text-xs">{t}</div>)}</div>
          </div>
        ))}
      </div>
    </Stage>
  );
}

// ---------- MARKETING ----------
function Hero({ variant }: { variant: V }) {
  if (variant === "split")
    return (
      <Stage h="min-h-[360px]" pad="p-0">
        <div className="grid md:grid-cols-2 w-full h-full">
          <div className="p-8 flex flex-col justify-center"><div className="text-xs font-mono uppercase text-mute">Vanta UI</div><h1 className="text-3xl font-medium tracking-tight mt-2">Build a beautiful surface in minutes</h1><p className="text-body text-sm mt-3">Inspired by the Vercel design language — production-ready components for React.</p><div className="flex gap-2 mt-5"><button className="h-10 px-5 rounded-full bg-ink text-white text-sm">Get started</button><button className="h-10 px-5 rounded-full border border-hairline text-sm">Browse components</button></div></div>
          <div className="mesh-bg" />
        </div>
      </Stage>
    );
  if (variant === "terminal")
    return (
      <Stage h="min-h-[360px]" pad="p-0">
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center px-6">
            <h1 className="text-4xl font-medium tracking-tight">npx vanta-ui init</h1>
            <p className="text-body text-sm mt-3">Scaffold your design system in one command.</p>
            <div className="mt-6 inline-flex items-center gap-3 bg-ink text-white rounded-md px-4 py-3 font-mono text-sm">$ npx vanta-ui init my-app<Copy className="h-4 w-4 opacity-70"/></div>
          </div>
        </div>
      </Stage>
    );
  return (
    <Stage h="min-h-[380px]" pad="p-0">
      <div className="absolute inset-0 mesh-bg opacity-60" />
      <div className="relative text-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-canvas/70 backdrop-blur border border-white/40 px-3 py-1 text-xs"><Sparkles className="h-3 w-3"/>Introducing Vanta UI</div>
        <h1 className="text-5xl font-medium tracking-[-0.04em] mt-4 text-ink text-balance">Ship the surface, not the system.</h1>
        <p className="mt-3 text-body max-w-xl mx-auto">A component library inspired by Vercel — built for product engineers.</p>
        <div className="mt-6 flex gap-2 justify-center"><button className="h-11 px-6 rounded-full bg-ink text-white text-sm">Deploy now</button><button className="h-11 px-6 rounded-full bg-canvas border border-hairline text-sm">View docs</button></div>
      </div>
    </Stage>
  );
}
function FeatureSection({ variant }: { variant: V }) {
  const items = [
    { i: Sparkles, t: "Mesh gradient kit", d: "The brand's hero accent in 6 stops." },
    { i: Lock, t: "Auth flows", d: "Login, register, OTP." },
    { i: Bell, t: "Notifications", d: "Toasts, banners, in-app." },
  ];
  if (variant === "bento")
    return (
      <Stage h="min-h-[360px]"><div className="grid grid-cols-3 gap-3 w-full"><div className="col-span-2 row-span-2 p-6 rounded-xl border border-hairline bg-canvas"><Sparkles className="h-5 w-5"/><div className="font-medium mt-3">Bento layout</div><p className="text-sm text-body mt-1">Mixed-size cards with a unified hairline border.</p></div><div className="p-4 rounded-xl border border-hairline bg-canvas">Card</div><div className="p-4 rounded-xl border border-hairline bg-canvas">Card</div></div></Stage>
    );
  return (
    <Stage>
      <div className="grid md:grid-cols-3 gap-4 w-full">
        {items.map(({i:I,t,d}) => (
          <div key={t} className="p-5 rounded-xl border border-hairline bg-canvas">
            <I className="h-5 w-5 text-ink"/><div className="font-medium mt-3">{t}</div><p className="text-sm text-body mt-1">{d}</p>
          </div>
        ))}
      </div>
    </Stage>
  );
}
function PricingSection({ variant }: { variant: V }) {
  if (variant === "compare")
    return (
      <Stage>
        <div className="w-full max-w-2xl border border-hairline rounded-lg overflow-hidden bg-canvas">
          <table className="w-full text-sm"><thead className="bg-canvas-soft"><tr>{["Feature","Hobby","Pro","Ent"].map((h)=><th key={h} className="text-left px-4 py-2 font-mono text-[11px] uppercase text-mute">{h}</th>)}</tr></thead><tbody>{[["Deploys","100","∞","∞"],["Edge","–","✓","✓"],["SLA","–","–","99.99%"]].map((r) => <tr key={r[0]} className="border-t border-hairline">{r.map((c,i)=><td key={i} className={`px-4 py-2 ${i===0?"font-medium":""}`}>{c}</td>)}</tr>)}</tbody></table>
        </div>
      </Stage>
    );
  return (
    <Stage>
      <div className="grid md:grid-cols-3 gap-3 w-full max-w-2xl">
        {[["Hobby","0",false],["Pro","20",true],["Enterprise","custom",false]].map(([n,p,f]:any) => (
          <div key={n} className={`p-5 rounded-xl border ${f?"bg-ink text-white border-ink":"bg-canvas border-hairline"}`}>
            <div className="text-xs font-mono uppercase opacity-70">{n}</div>
            <div className="text-2xl font-medium mt-2 tabular-nums">${p}</div>
            <button className={`mt-3 w-full h-9 rounded-full text-sm ${f?"bg-white text-ink":"bg-ink text-white"}`}>Choose</button>
          </div>
        ))}
      </div>
    </Stage>
  );
}
function FAQ() {
  const items = [
    ["What is Vanta UI?","A library inspired by Vercel's design language."],
    ["Is it open source?","Yes — MIT."],
    ["Can I use it commercially?","Absolutely."],
  ];
  return (
    <Stage><div className="w-full max-w-xl divide-y divide-hairline border border-hairline rounded-lg bg-canvas">{items.map(([q,a]) => (<div key={q} className="px-4 py-3"><div className="text-sm font-medium text-ink">{q}</div><div className="text-sm text-body mt-1">{a}</div></div>))}</div></Stage>
  );
}
function Testimonial({ variant }: { variant: V }) {
  const items = ["“Vanta makes a senior surface feel default.”","“The mesh gradient is chef's kiss.”","“Shipped a pricing page in 20 minutes.”"];
  if (variant === "marquee")
    return (
      <Stage pad="p-4" h="min-h-[160px]">
        <div className="overflow-hidden w-full">
          <motion.div className="flex gap-4 whitespace-nowrap" animate={{ x: [0, -600] }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }}>
            {[...items,...items,...items].map((t,i)=>(<div key={i} className="bg-canvas border border-hairline rounded-lg px-4 py-3 text-sm w-72 shrink-0">{t}</div>))}
          </motion.div>
        </div>
      </Stage>
    );
  return (
    <Stage>
      <div className="grid md:grid-cols-3 gap-3 w-full">{items.map((t,i) => (<div key={i} className="bg-canvas border border-hairline rounded-xl p-4 text-sm">{t}<div className="text-xs text-mute mt-3">— Customer #{i+1}</div></div>))}</div>
    </Stage>
  );
}
function CTA() {
  return (
    <Stage h="min-h-[280px]"><div className="bg-ink text-white rounded-2xl p-10 w-full text-center"><h2 className="text-3xl font-medium tracking-tight">Ready to deploy?</h2><p className="text-white/70 mt-2">Get started for free, no card required.</p><button className="mt-5 h-11 px-6 rounded-full bg-white text-ink text-sm">Get started</button></div></Stage>
  );
}
function Newsletter() {
  return (
    <Stage><div className="text-center w-full max-w-md"><h3 className="text-2xl font-medium tracking-tight">Subscribe to the newsletter</h3><div className="flex gap-2 mt-4"><input placeholder="you@vanta.dev" className="flex-1 h-10 px-3 rounded-md border border-hairline text-sm"/><button className="h-10 px-4 rounded-md bg-ink text-white text-sm">Subscribe</button></div></div></Stage>
  );
}
function LogoStrip() {
  return <Stage><div className="flex flex-wrap items-center gap-x-8 gap-y-4 justify-center opacity-70">{["VERCEL","STRIPE","LINEAR","FRAMER","RAYCAST","FIGMA"].map((n)=><div key={n} className="font-mono text-sm tracking-widest">{n}</div>)}</div></Stage>;
}

// ---------- SITE CHROME ----------
function Header() { return <Navbar variant={undefined as any}/>; }
function Footer() {
  return (
    <Stage pad="p-6" h="min-h-[200px]">
      <div className="w-full grid md:grid-cols-4 gap-6 text-sm">
        <div><div className="font-medium">▲ Vanta</div><div className="text-mute mt-2">Built by M Iqbal S.</div></div>
        {[["Product",["Components","Templates","Pricing"]],["Resources",["Docs","Changelog","Roadmap"]],["Company",["About","Contact","GitHub"]]].map(([h,items]:any) => (
          <div key={h}><div className="text-xs font-mono uppercase text-mute mb-2">{h}</div><ul className="space-y-1 text-body">{items.map((it:string) => <li key={it}>{it}</li>)}</ul></div>
        ))}
      </div>
    </Stage>
  );
}
function DashboardShell() { return <Sidebar/>; }
function SplitView() {
  return (
    <Stage pad="p-0" h="min-h-[260px]"><div className="absolute inset-0 flex"><div className="w-1/2 bg-canvas-soft border-r border-hairline p-4 text-sm">Left panel</div><div className="flex-1 p-4 text-sm">Right panel</div></div></Stage>
  );
}
function Masonry({ variant }: { variant: V }) {
  const heights = variant === "bento" ? [60,80,40,100,60,80] : [80,40,100,60,90,50,80,70];
  return <Stage><div className="grid grid-cols-3 gap-2 w-full max-w-md">{heights.map((h,i) => <div key={i} className="rounded-md bg-canvas-soft border border-hairline" style={{ height: h }}/>)}</div></Stage>;
}

// ---------- MEDIA / ANIMATIONS ----------
function Terminal() {
  return (
    <Stage>
      <div className="bg-ink text-white rounded-lg w-full max-w-md font-mono text-xs overflow-hidden">
        <div className="flex gap-1.5 px-3 py-2 border-b border-white/10"><span className="h-2.5 w-2.5 rounded-full bg-[#ee0000]/80"/><span className="h-2.5 w-2.5 rounded-full bg-[#f5a623]/80"/><span className="h-2.5 w-2.5 rounded-full bg-[#50e3c2]/80"/></div>
        <div className="p-3 space-y-1"><div><span className="text-[#50e3c2]">~/vanta</span> $ npx vanta-ui add button</div><div className="opacity-70">✓ Installed Button to src/components/ui/button.tsx</div><div><span className="text-[#50e3c2]">~/vanta</span> $ <span className="text-white/60">_</span></div></div>
      </div>
    </Stage>
  );
}
function CodeBlock() {
  return (
    <Stage>
      <pre className="bg-ink text-white rounded-md p-4 font-mono text-xs w-full max-w-md overflow-auto">
{`import { Button } from "@vanta-ui/react"

export default function App() {
  return <Button>Deploy</Button>
}`}
      </pre>
    </Stage>
  );
}
function Gallery() {
  return (
    <Stage>
      <div className="grid grid-cols-3 gap-2 w-full max-w-md">{[0,1,2,3,4,5].map((i) => (<div key={i} className="aspect-square rounded-md mesh-bg" style={{ filter: `hue-rotate(${i*40}deg)` }}/>))}</div>
    </Stage>
  );
}
function Carousel({ variant }: { variant: V }) {
  const [i, setI] = useState(1);
  return (
    <Stage>
      <div className="w-full max-w-md">
        <div className="grid grid-cols-3 gap-3">{[0,1,2].map((n) => (<motion.div key={n} animate={{ scale: n===i?1:0.9, opacity: n===i?1:0.5 }} onClick={()=>setI(n)} className="aspect-[4/3] rounded-lg mesh-bg cursor-pointer" style={{ filter:`hue-rotate(${n*60}deg)` }}/>))}</div>
        <div className="flex justify-center gap-1 mt-3">{[0,1,2].map((n) => <button key={n} onClick={()=>setI(n)} className={`h-1.5 rounded-full transition-all ${n===i?"w-6 bg-ink":"w-1.5 bg-hairline-strong"}`}/>)}</div>
      </div>
    </Stage>
  );
}
function Marquee({ variant }: { variant: V }) {
  const items = variant === "logos" ? ["VERCEL","STRIPE","LINEAR","FRAMER","RAYCAST","FIGMA"] : ["⚡ Fast", "✨ Beautiful", "♿ Accessible", "🌗 Themed", "🧩 Composable"];
  return (
    <Stage pad="p-4" h="min-h-[140px]">
      <div className="overflow-hidden w-full">
        <motion.div className="flex gap-8 whitespace-nowrap" animate={{ x: [0, -400] }} transition={{ repeat: Infinity, duration: 12, ease: "linear" }}>
          {[...items,...items,...items].map((t,i)=>(<span key={i} className="text-sm font-mono shrink-0">{t}</span>))}
        </motion.div>
      </div>
    </Stage>
  );
}
function Video() {
  return (
    <Stage>
      <div className="w-full max-w-md rounded-xl overflow-hidden bg-ink relative aspect-video">
        <div className="absolute inset-0 mesh-bg opacity-50"/>
        <div className="absolute inset-0 grid place-items-center"><button className="h-14 w-14 rounded-full bg-white/90 grid place-items-center"><Play className="h-6 w-6 text-ink"/></button></div>
        <div className="absolute bottom-0 inset-x-0 p-3 flex items-center gap-3 text-white text-xs"><Pause className="h-4 w-4"/><div className="flex-1 h-1 bg-white/30 rounded-full"><div className="h-full w-1/3 bg-white rounded-full"/></div><span className="font-mono">01:24 / 04:12</span><Volume2 className="h-4 w-4"/></div>
      </div>
    </Stage>
  );
}
function Audio() {
  return (
    <Stage>
      <div className="w-full max-w-md p-4 rounded-xl border border-hairline bg-canvas flex items-center gap-3">
        <button className="h-10 w-10 rounded-full bg-ink text-white grid place-items-center"><Play className="h-4 w-4"/></button>
        <div className="flex-1"><div className="text-sm font-medium">Mesh — Vanta OST</div><div className="flex items-end gap-0.5 mt-1 h-6">{Array.from({length:30}).map((_,i)=><div key={i} className="w-0.5 bg-ink/70" style={{ height: `${10+Math.sin(i)*10+i%6*4}%` }}/>)}</div></div>
        <span className="text-xs font-mono text-mute">02:14</span>
      </div>
    </Stage>
  );
}
function Map() {
  return (
    <Stage>
      <div className="w-full max-w-md aspect-video rounded-xl overflow-hidden grid-bg relative border border-hairline">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"><MapPin className="h-6 w-6 text-destructive"/></div>
      </div>
    </Stage>
  );
}
function Cursor() {
  return (
    <Stage>
      <div className="relative w-full max-w-md aspect-video rounded-xl bg-canvas-soft border border-hairline overflow-hidden">
        <div className="absolute top-10 left-12 flex flex-col items-start"><div className="h-3 w-3 rotate-12 bg-violet" style={{clipPath:"polygon(0 0,100% 50%,40% 60%,30% 100%)"}}/><div className="px-2 py-0.5 rounded bg-violet text-white text-[10px] mt-1">iqbal</div></div>
        <div className="absolute bottom-12 right-12 flex flex-col items-start"><div className="h-3 w-3 rotate-12 bg-cyan" style={{clipPath:"polygon(0 0,100% 50%,40% 60%,30% 100%)"}}/><div className="px-2 py-0.5 rounded bg-cyan text-white text-[10px] mt-1">guest</div></div>
      </div>
    </Stage>
  );
}
function Parallax() {
  return (
    <Stage h="min-h-[260px]" pad="p-0">
      <div className="absolute inset-0 mesh-bg opacity-60"/>
      <motion.div animate={{ y:[0,-10,0]}} transition={{ repeat: Infinity, duration: 4, ease:"easeInOut"}} className="relative bg-canvas border border-hairline rounded-xl p-5 m-auto w-72"><div className="font-medium">Parallax card</div><p className="text-sm text-body mt-1">Floats over the mesh.</p></motion.div>
    </Stage>
  );
}
function ScrollReveal({ variant }: { variant: V }) {
  return (
    <Stage>
      <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:false}} className="bg-canvas border border-hairline rounded-xl p-6 w-72"><div className="font-medium">Revealed on view</div><p className="text-sm text-body mt-1">Fade-up triggered by viewport.</p></motion.div>
    </Stage>
  );
}
function HoverCardEffect({ variant }: { variant: V }) {
  const r = useRef<HTMLDivElement>(null);
  return (
    <Stage>
      <motion.div whileHover={{ rotateX: -6, rotateY: 6 }} style={{ transformStyle:"preserve-3d" }} className="bg-canvas border border-hairline rounded-xl p-6 w-64 pop-elev"><div className="font-medium">3D tilt</div><p className="text-sm text-body mt-1">Hover to tilt.</p></motion.div>
    </Stage>
  );
}
function Beam() {
  return (
    <Stage h="min-h-[240px]">
      <svg viewBox="0 0 320 160" className="w-full max-w-md">
        <defs><linearGradient id="b" x1="0" x2="1"><stop stopColor="#7928ca"/><stop offset="1" stopColor="#ff0080"/></linearGradient></defs>
        <path d="M20 80 C 100 0, 220 160, 300 80" stroke="url(#b)" strokeWidth="2" fill="none" strokeDasharray="6 6"><animate attributeName="stroke-dashoffset" from="0" to="-12" dur="0.6s" repeatCount="indefinite"/></path>
        <circle cx="20" cy="80" r="10" fill="#0070f3"/><circle cx="300" cy="80" r="10" fill="#ff0080"/>
      </svg>
    </Stage>
  );
}
function Aurora() {
  return <Stage h="min-h-[240px]" pad="p-0"><div className="absolute inset-0 mesh-bg animate-pulse"/></Stage>;
}
function GridBeam() { return <Stage h="min-h-[240px]" pad="p-0"><div className="absolute inset-0 grid-bg"/><div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-link to-transparent animate-pulse"/></Stage>; }
function Particles() {
  return (
    <Stage>
      <div className="relative w-full h-48">{Array.from({length:30}).map((_,i)=>(<motion.span key={i} className="absolute h-1 w-1 rounded-full bg-ink/60" style={{ left: `${(i*37)%100}%`, top: `${(i*73)%100}%` }} animate={{ y:[0,-12,0], opacity:[0.2,1,0.2] }} transition={{ duration: 3+i%3, repeat: Infinity }}/>))}</div>
    </Stage>
  );
}
function Ticker({ variant }: { variant: V }) {
  if (variant === "gradient-heading")
    return <Stage><h2 className="text-4xl font-medium tracking-tight bg-clip-text text-transparent" style={{ backgroundImage:"linear-gradient(90deg,#7928ca,#ff0080,#f9cb28)" }}>Vanta UI — gradient heading</h2></Stage>;
  const [v, setV] = useState(0);
  useEffect(() => { let n = 0; const id = setInterval(() => { n = Math.min(100, n + 4); setV(n); if (n>=100) clearInterval(id); }, 40); return () => clearInterval(id); }, []);
  return <Stage><div className="text-5xl font-medium tabular-nums">{v.toLocaleString()}+</div></Stage>;
}
function InfiniteScroll() {
  return (
    <Stage>
      <div className="w-full max-w-md h-48 overflow-y-auto border border-hairline rounded-md bg-canvas divide-y divide-hairline">
        {Array.from({length:20}).map((_,i)=>(<div key={i} className="px-3 py-2 text-sm">Item #{i+1}</div>))}
        <div className="px-3 py-2 text-sm text-mute flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin"/>Loading…</div>
      </div>
    </Stage>
  );
}
function DnD() {
  const [items, setItems] = useState(["Design tokens","Pricing page","Auth flow","Components grid"]);
  const move = (from: number, dir: -1 | 1) => {
    const to = from + dir; if (to<0||to>=items.length) return;
    const next = [...items]; [next[from],next[to]] = [next[to],next[from]]; setItems(next);
  };
  return (
    <Stage>
      <ul className="w-full max-w-md space-y-2">
        {items.map((it,i) => (
          <li key={it} className="flex items-center gap-2 p-3 rounded-md border border-hairline bg-canvas">
            <GripVertical className="h-4 w-4 text-mute"/>
            <span className="flex-1 text-sm">{it}</span>
            <button onClick={()=>move(i,-1)} className="h-7 w-7 rounded-md hover:bg-canvas-soft">↑</button>
            <button onClick={()=>move(i,1)} className="h-7 w-7 rounded-md hover:bg-canvas-soft">↓</button>
          </li>
        ))}
      </ul>
    </Stage>
  );
}

// ---------- AI ----------
function Chat({ variant }: { variant: V }) {
  if (variant === "input" || variant === "prompt")
    return (
      <Stage>
        <div className="w-full max-w-md p-3 rounded-2xl border border-hairline bg-canvas flex items-end gap-2">
          <textarea placeholder="Ask Vanta anything…" className="flex-1 resize-none h-10 text-sm outline-none bg-transparent"/>
          <button className="h-9 w-9 rounded-full bg-ink text-white grid place-items-center"><Send className="h-4 w-4"/></button>
        </div>
      </Stage>
    );
  if (variant === "full")
    return (
      <Stage h="min-h-[420px]" pad="p-4">
        <div className="w-full max-w-md flex flex-col gap-3">
          <div className="self-end max-w-[80%] bg-ink text-white rounded-2xl rounded-br-md px-4 py-2 text-sm">Generate a pricing page for a SaaS.</div>
          <div className="self-start max-w-[80%] bg-canvas-soft text-ink rounded-2xl rounded-bl-md px-4 py-2 text-sm">Here's a 3-tier layout with a featured plan… <Sparkles className="inline h-3.5 w-3.5"/></div>
          <div className="mt-2 p-2 rounded-2xl border border-hairline bg-canvas flex items-end gap-2"><input className="flex-1 h-9 text-sm outline-none bg-transparent px-2" placeholder="Reply…"/><button className="h-8 w-8 rounded-full bg-ink text-white grid place-items-center"><Send className="h-4 w-4"/></button></div>
        </div>
      </Stage>
    );
  return (
    <Stage>
      <div className="w-full max-w-md space-y-2">
        <div className="self-end ml-auto max-w-[80%] bg-ink text-white rounded-2xl rounded-br-md px-4 py-2 text-sm w-fit">Hey Vanta!</div>
        <div className="max-w-[80%] bg-canvas-soft text-ink rounded-2xl rounded-bl-md px-4 py-2 text-sm w-fit">Hi 👋 — how can I help?</div>
      </div>
    </Stage>
  );
}

// ---------- THEME / TOKENS / EXTRAS ----------
function ThemeSwitcher({ variant }: { variant: V }) {
  const [d, setD] = useState(variant === "dark");
  return (
    <Stage>
      <button onClick={()=>setD(!d)} className={`h-9 px-4 rounded-full text-sm inline-flex items-center gap-2 border ${d?"bg-ink text-white border-ink":"bg-canvas text-ink border-hairline"}`}>{d?<Moon className="h-4 w-4"/>:<Sun className="h-4 w-4"/>}{d?"Dark":"Light"}</button>
    </Stage>
  );
}
function Swatch() {
  const colors = ["#171717","#ffffff","#fafafa","#0070f3","#7928ca","#ff0080","#50e3c2","#f5a623","#ee0000"];
  return <Stage><div className="grid grid-cols-3 gap-3 w-full max-w-md">{colors.map((c) => (<div key={c} className="rounded-md border border-hairline overflow-hidden"><div className="h-12" style={{background:c}}/><div className="text-[11px] font-mono p-1.5">{c}</div></div>))}</div></Stage>;
}
function TypeScale() {
  return (
    <Stage>
      <div className="w-full max-w-md space-y-2">
        {[["display-xl","Display XL","text-5xl tracking-[-0.04em] font-medium"],["display-lg","Display LG","text-3xl tracking-tight font-medium"],["body-md","Body","text-base"],["caption-mono","Caption Mono","text-xs font-mono uppercase text-mute"]].map(([k,l,c]) => (
          <div key={k} className="flex items-baseline gap-3"><span className="w-28 text-xs font-mono text-mute">{k}</span><span className={c}>{l}</span></div>
        ))}
      </div>
    </Stage>
  );
}
function SpacingScale() {
  return <Stage><div className="space-y-2 w-full max-w-md">{[4,8,12,16,24,32,40,64].map((n) => <div key={n} className="flex items-center gap-3 text-xs"><span className="w-10 font-mono text-mute">{n}</span><div className="h-4 bg-ink/80 rounded-sm" style={{width:n}}/></div>)}</div></Stage>;
}
function Icons() {
  const all = [Home,User,Settings,Bell,Sparkles,Star,Heart,Mail,Lock,Search,Sun,Moon,FileText,Folder,ImageIcon,Play,Pause,Mic,Send,Plus,X,Check,Info,AlertTriangle,ExternalLink,Github,Twitter,Edit3,Trash2,MapPin,Clock,Filter];
  return <Stage><div className="grid grid-cols-8 gap-2 w-full max-w-md">{all.map((I,i)=>(<div key={i} className="aspect-square rounded-md border border-hairline bg-canvas grid place-items-center text-ink"><I className="h-4 w-4"/></div>))}</div></Stage>;
}
function ResponsivePreview() {
  return (
    <Stage h="min-h-[340px]">
      <div className="flex items-end gap-3">
        <div className="w-16 h-28 rounded-md border border-hairline bg-canvas-soft"><div className="text-[9px] text-center text-mute pt-1">375</div></div>
        <div className="w-28 h-36 rounded-md border border-hairline bg-canvas-soft"><div className="text-[9px] text-center text-mute pt-1">768</div></div>
        <div className="w-48 h-32 rounded-md border border-hairline bg-canvas-soft"><div className="text-[9px] text-center text-mute pt-1">1280</div></div>
      </div>
    </Stage>
  );
}
function Chart({ variant }: { variant: V }) {
  if (variant === "bar")
    return <Stage><div className="w-full max-w-md flex items-end gap-2 h-32">{[40,70,55,80,60,90,45,75,50,85,65,72].map((v,i) => <div key={i} className="flex-1 bg-ink rounded-sm" style={{height:`${v}%`}}/>)}</div></Stage>;
  if (variant === "line")
    return <Stage><svg viewBox="0 0 200 80" className="w-full max-w-md"><polyline fill="none" stroke="#0070f3" strokeWidth="2" points="0,60 20,50 40,55 60,30 80,40 100,20 120,28 140,12 160,22 180,8 200,16"/></svg></Stage>;
  return (
    <Stage>
      <svg viewBox="0 0 200 80" className="w-full max-w-md">
        <defs><linearGradient id="a" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#0070f3" stopOpacity="0.4"/><stop offset="1" stopColor="#0070f3" stopOpacity="0"/></linearGradient></defs>
        <path d="M0 60 L20 50 L40 55 L60 30 L80 40 L100 20 L120 28 L140 12 L160 22 L180 8 L200 16 L200 80 L0 80 Z" fill="url(#a)"/>
        <polyline fill="none" stroke="#0070f3" strokeWidth="2" points="0,60 20,50 40,55 60,30 80,40 100,20 120,28 140,12 160,22 180,8 200,16"/>
      </svg>
    </Stage>
  );
}
function Logo() {
  return <Stage><div className="flex items-center gap-2 text-2xl"><span className="font-mono">▲</span><span className="font-medium tracking-tight">Vanta UI</span></div></Stage>;
}

// ============== NEW RENDERERS (v2) ==============

// ---------- AI PROFILE ----------
function AIProfile({ variant }: { variant: V }) {
  const personas: Record<string, { name: string; role: string; bio: string; tags: string[]; grad: string }> = {
    default: { name: "Atlas", role: "Research Assistant", bio: "Multi-modal reasoning agent with web access and citation grounding.", tags: ["GPT-5", "Web", "Citations"], grad: "linear-gradient(135deg,#7928ca,#ff0080)" },
    coder: { name: "Hex", role: "Code Companion", bio: "Pair-programmer fine-tuned on 2.3T tokens of source code across 60+ languages.", tags: ["Code", "Refactor", "Tests"], grad: "linear-gradient(135deg,#0070f3,#00dfd8)" },
    designer: { name: "Nova", role: "Design Partner", bio: "Generative design lead. Storyboards, moodboards, brand systems.", tags: ["Figma", "Brand", "UX"], grad: "linear-gradient(135deg,#ff0080,#ff8a00)" },
    writer: { name: "Prose", role: "Editorial AI", bio: "Long-form writing with house-style enforcement and tone control.", tags: ["Long-form", "SEO", "Tone"], grad: "linear-gradient(135deg,#10b981,#0070f3)" },
    analyst: { name: "Quant", role: "Data Analyst", bio: "SQL, dataframes, charting. Connects to your warehouse over read-only.", tags: ["SQL", "Charts", "BI"], grad: "linear-gradient(135deg,#f5a623,#ff0080)" },
  };
  const p = personas[variant ?? "default"] ?? personas.default;
  return (
    <Stage>
      <div className="w-full max-w-sm rounded-2xl border border-hairline bg-canvas p-5 card-elev">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="h-14 w-14 rounded-2xl grid place-items-center text-white text-lg font-medium" style={{ backgroundImage: p.grad }}>
              <Bot className="h-7 w-7" />
            </div>
            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-success border-2 border-canvas" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="text-base font-medium text-ink truncate">{p.name}</div>
              <span className="text-[10px] font-mono uppercase text-mute bg-canvas-soft px-1.5 py-0.5 rounded">AI</span>
            </div>
            <div className="text-xs text-mute">{p.role}</div>
          </div>
          <button className="h-7 px-2 rounded-md border border-hairline text-xs text-body">Edit</button>
        </div>
        <p className="text-sm text-body mt-3 leading-relaxed">{p.bio}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {p.tags.map((t) => <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-hairline text-body">{t}</span>)}
        </div>
        <div className="flex gap-2 mt-4">
          <button className="flex-1 h-9 rounded-md bg-ink text-white text-sm inline-flex items-center justify-center gap-1.5"><MessageSquare className="h-4 w-4"/>Chat</button>
          <button className="h-9 px-3 rounded-md border border-hairline text-sm">Configure</button>
        </div>
      </div>
    </Stage>
  );
}

// ---------- AI AGENT (status card) ----------
function AIAgent({ variant }: { variant: V }) {
  const status = variant ?? "running";
  const map: any = {
    running: { dot: "bg-success animate-pulse", label: "Running", color: "text-success" },
    idle: { dot: "bg-mute", label: "Idle", color: "text-mute" },
    error: { dot: "bg-destructive", label: "Failed", color: "text-destructive" },
    queued: { dot: "bg-warning animate-pulse", label: "Queued", color: "text-warning" },
  };
  const s = map[status] ?? map.running;
  return (
    <Stage>
      <div className="w-full max-w-md rounded-xl border border-hairline bg-canvas p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-canvas-soft grid place-items-center"><Cpu className="h-5 w-5 text-ink"/></div>
          <div className="flex-1">
            <div className="text-sm font-medium text-ink">scrape-prices.agent</div>
            <div className="text-xs text-mute">Step 4/7 · Extracting tabular data</div>
          </div>
          <span className={`inline-flex items-center gap-1.5 text-xs ${s.color}`}>
            <span className={`h-2 w-2 rounded-full ${s.dot}`}/>{s.label}
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full bg-canvas-soft rounded-full overflow-hidden">
          <div className="h-full bg-ink" style={{ width: "57%" }}/>
        </div>
        <div className="flex justify-between mt-2 text-[11px] font-mono text-mute">
          <span>1,284 tokens</span><span>$0.0042</span><span>4.1s elapsed</span>
        </div>
      </div>
    </Stage>
  );
}

// ---------- AI PERSONA SWITCHER ----------
function AIPersona() {
  const items = [
    { n: "Atlas", c: "#7928ca" }, { n: "Hex", c: "#0070f3" }, { n: "Nova", c: "#ff0080" }, { n: "Prose", c: "#10b981" },
  ];
  return (
    <Stage>
      <div className="flex gap-2">
        {items.map((p, i) => (
          <button key={p.n} className={`px-3 py-2 rounded-xl border ${i === 0 ? "border-ink bg-canvas" : "border-hairline"} flex items-center gap-2`}>
            <span className="h-6 w-6 rounded-full grid place-items-center text-white text-[10px]" style={{ background: p.c }}><Bot className="h-3.5 w-3.5"/></span>
            <span className="text-xs text-ink">{p.n}</span>
          </button>
        ))}
      </div>
    </Stage>
  );
}

// ---------- AI PROMPT CARD ----------
function AIPromptCard({ variant }: { variant: V }) {
  const v = variant ?? "default";
  const data: any = {
    default: { icon: Wand2, title: "Summarize a meeting", body: "Turn meeting transcripts into action items and decisions.", tag: "Productivity" },
    code: { icon: Code2, title: "Explain this code", body: "Walks through any pasted snippet line-by-line.", tag: "Coding" },
    seo: { icon: Globe, title: "Write SEO meta", body: "Generate title + description from a URL.", tag: "Marketing" },
    image: { icon: ImageIcon, title: "Brand mood board", body: "Generate 9 image variations from a single concept.", tag: "Design" },
  };
  const d = data[v] ?? data.default;
  const Icon = d.icon;
  return (
    <Stage>
      <div className="w-full max-w-sm rounded-xl border border-hairline bg-canvas p-4 hover:border-hairline-strong transition">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-md bg-canvas-soft grid place-items-center"><Icon className="h-5 w-5 text-ink"/></div>
          <div className="flex-1">
            <div className="text-sm font-medium text-ink">{d.title}</div>
            <div className="text-xs text-body mt-1">{d.body}</div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[10px] font-mono uppercase text-mute">{d.tag}</span>
          <button className="text-xs text-link inline-flex items-center gap-1">Use template <ArrowRight className="h-3 w-3"/></button>
        </div>
      </div>
    </Stage>
  );
}

// ---------- AI TOOL CALL ----------
function AIToolCall() {
  return (
    <Stage>
      <div className="w-full max-w-md rounded-lg border border-hairline bg-canvas-soft overflow-hidden font-mono text-xs">
        <div className="px-3 py-2 border-b border-hairline flex items-center gap-2 text-mute">
          <Wand2 className="h-3.5 w-3.5"/> tool_call · search_web
        </div>
        <pre className="px-3 py-2 text-body whitespace-pre">{`{
  "query": "vercel design system",
  "top_k": 5
}`}</pre>
        <div className="px-3 py-1.5 border-t border-hairline text-success">✓ 5 results · 312 ms</div>
      </div>
    </Stage>
  );
}

// ---------- AI CITATION ----------
function AICitation() {
  const sources = [
    { n: "vercel.com/design", q: "Geist is our typeface…" },
    { n: "nextjs.org/docs", q: "App Router conventions…" },
    { n: "tailwindcss.com", q: "Utility-first CSS…" },
  ];
  return (
    <Stage>
      <div className="w-full max-w-md space-y-2">
        {sources.map((s, i) => (
          <div key={s.n} className="flex items-start gap-2 border border-hairline rounded-md p-2 bg-canvas">
            <span className="h-5 w-5 grid place-items-center rounded text-[10px] font-mono bg-ink text-white">{i+1}</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-link truncate">{s.n}</div>
              <div className="text-xs text-body italic truncate">"{s.q}"</div>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-mute"/>
          </div>
        ))}
      </div>
    </Stage>
  );
}

// ---------- AI SUGGESTION CHIPS ----------
function AISuggestion() {
  return (
    <Stage>
      <div className="w-full max-w-md">
        <div className="text-xs text-mute mb-2">Try asking</div>
        <div className="flex flex-wrap gap-2">
          {["Summarize this thread", "Draft a reply", "Find similar issues", "Translate to Indonesian", "Make it shorter"].map(s => (
            <button key={s} className="text-xs px-3 py-1.5 rounded-full bg-canvas-soft border border-hairline text-body hover:text-ink">{s}</button>
          ))}
        </div>
      </div>
    </Stage>
  );
}

// ---------- AI MODEL PICKER ----------
function AIModelPicker() {
  const models = [
    { n: "GPT-5", d: "Multi-modal · 1M ctx", sel: true },
    { n: "Claude Sonnet 4.5", d: "Reasoning · 200K ctx", sel: false },
    { n: "Gemini 2.5 Pro", d: "Fast · 2M ctx", sel: false },
  ];
  return (
    <Stage>
      <div className="w-full max-w-sm rounded-xl border border-hairline bg-canvas p-2 space-y-1">
        {models.map(m => (
          <button key={m.n} className={`w-full flex items-center gap-3 p-2 rounded-md ${m.sel ? "bg-canvas-soft" : ""} hover:bg-canvas-soft`}>
            <div className="h-8 w-8 rounded-md bg-ink text-white grid place-items-center"><Sparkles className="h-4 w-4"/></div>
            <div className="flex-1 text-left">
              <div className="text-sm text-ink">{m.n}</div>
              <div className="text-[11px] text-mute">{m.d}</div>
            </div>
            {m.sel && <Check className="h-4 w-4 text-success"/>}
          </button>
        ))}
      </div>
    </Stage>
  );
}

// ---------- AI STREAMING ----------
function AIStream() {
  return (
    <Stage>
      <div className="w-full max-w-md p-4 rounded-xl bg-canvas-soft border border-hairline">
        <div className="flex items-center gap-2 mb-2">
          <Bot className="h-4 w-4 text-link"/><span className="text-xs font-medium text-ink">Atlas</span>
          <span className="text-[10px] text-mute font-mono">streaming…</span>
        </div>
        <p className="text-sm text-body leading-relaxed">
          Vanta UI is a component library inspired by Vercel's design language. It ships with 400+ components<span className="inline-block w-1.5 h-4 bg-ink ml-0.5 -mb-0.5 animate-pulse"/>
        </p>
      </div>
    </Stage>
  );
}

// ---------- AI MEMORY ----------
function AIMemory() {
  return (
    <Stage>
      <div className="w-full max-w-md space-y-2">
        {["User prefers concise, no preamble.", "Working on Vanta UI (Vercel-style).", "Indonesian + English bilingual."].map((m, i) => (
          <div key={i} className="flex items-center gap-2 p-2 rounded-md border border-hairline bg-canvas">
            <Brain className="h-4 w-4 text-violet shrink-0"/>
            <div className="text-xs text-body flex-1 truncate">{m}</div>
            <button className="text-mute hover:text-destructive"><Trash2 className="h-3.5 w-3.5"/></button>
          </div>
        ))}
      </div>
    </Stage>
  );
}

// ---------- AI TOKEN USAGE ----------
function AITokenUsage() {
  return (
    <Stage>
      <div className="w-full max-w-sm rounded-xl border border-hairline bg-canvas p-4">
        <div className="flex justify-between items-baseline">
          <div className="text-xs text-mute font-mono uppercase">Tokens used</div>
          <div className="text-xs text-mute">147,820 / 200,000</div>
        </div>
        <div className="mt-2 h-2 w-full bg-canvas-soft rounded-full overflow-hidden">
          <div className="h-full" style={{ width: "73.9%", backgroundImage: "linear-gradient(90deg,#7928ca,#ff0080)" }}/>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4 text-center">
          {[["In", "98K"], ["Out", "49K"], ["Cost", "$2.81"]].map(([k,v]) => (
            <div key={k}><div className="text-lg font-medium text-ink tabular-nums">{v}</div><div className="text-[10px] text-mute uppercase font-mono">{k}</div></div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

// ---------- KPI TILE ----------
function KPITile({ variant }: { variant: V }) {
  const map: any = {
    blue:   { c: "#0070f3", icon: TrendingUp, label: "Revenue", val: "$48,210", d: "+12.4%" },
    violet: { c: "#7928ca", icon: Activity, label: "Sessions", val: "12,481", d: "+8.1%" },
    pink:   { c: "#ff0080", icon: Flame, label: "Engagement", val: "67%", d: "+2.3%" },
    cyan:   { c: "#00dfd8", icon: Zap, label: "Latency", val: "82 ms", d: "-14%" },
    amber:  { c: "#f5a623", icon: Award, label: "NPS", val: "72", d: "+5" },
    green:  { c: "#10b981", icon: ThumbsUp, label: "CSAT", val: "94%", d: "+1.1%" },
  };
  const k = map[variant ?? "blue"] ?? map.blue;
  const Icon = k.icon;
  return (
    <Stage>
      <div className="w-full max-w-xs rounded-2xl p-5 text-white relative overflow-hidden" style={{ backgroundColor: k.c }}>
        <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full opacity-20 bg-white"/>
        <div className="flex items-center gap-2 text-white/80 text-xs uppercase font-mono">
          <Icon className="h-4 w-4"/>{k.label}
        </div>
        <div className="mt-2 text-4xl font-medium tabular-nums">{k.val}</div>
        <div className="mt-1 text-xs text-white/80">{k.d} vs last week</div>
      </div>
    </Stage>
  );
}

// ---------- GAUGE ----------
function Gauge() {
  const pct = 76;
  const r = 36, c = 2 * Math.PI * r;
  return (
    <Stage>
      <div className="relative">
        <svg width="120" height="120" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="var(--hairline)" strokeWidth="8"/>
          <circle cx="50" cy="50" r={r} fill="none" stroke="url(#g)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(pct/100)*c} ${c}`} transform="rotate(-90 50 50)"/>
          <defs><linearGradient id="g"><stop stopColor="#0070f3"/><stop offset="1" stopColor="#00dfd8"/></linearGradient></defs>
        </svg>
        <div className="absolute inset-0 grid place-items-center text-xl font-medium tabular-nums text-ink">{pct}%</div>
      </div>
    </Stage>
  );
}

// ---------- CALENDAR HEATMAP ----------
function CalendarHeat() {
  // Deterministic pseudo-random pattern so SSR + client render identically.
  const cells = Array.from({ length: 7 * 16 }, (_, i) => (i * 31 + 7) % 5);
  const shades = ["bg-canvas-soft", "bg-[#0070f3]/20", "bg-[#0070f3]/40", "bg-[#0070f3]/70", "bg-[#0070f3]"];
  return (
    <Stage>
      <div className="grid grid-rows-7 grid-flow-col gap-1">
        {cells.map((v, i) => <div key={i} className={`h-3 w-3 rounded-sm ${shades[v]}`}/>)}
      </div>
    </Stage>
  );
}

// ---------- SOCIAL CARD ----------
function SocialCard() {
  return (
    <Stage>
      <div className="w-full max-w-md rounded-xl border border-hairline bg-canvas p-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-ink text-white grid place-items-center text-xs font-medium">MS</div>
          <div className="flex-1">
            <div className="flex items-center gap-1 text-sm">
              <span className="font-medium text-ink">M Iqbal S</span>
              <span className="text-mute">@miqbal · 2h</span>
            </div>
            <p className="text-sm text-ink mt-1">Just shipped Vanta UI — 400+ components, fully themed, accessible, and free. Built with TanStack Start. Cmd+K it. ▲</p>
            <div className="flex gap-6 mt-3 text-mute text-xs">
              <span className="inline-flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5"/> 42</span>
              <span className="inline-flex items-center gap-1"><GitBranch className="h-3.5 w-3.5"/> 128</span>
              <span className="inline-flex items-center gap-1"><Heart className="h-3.5 w-3.5"/> 1.2k</span>
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
}

// ---------- BLOG CARD ----------
function BlogCard() {
  return (
    <Stage>
      <div className="w-full max-w-sm rounded-xl border border-hairline bg-canvas overflow-hidden">
        <div className="h-32 mesh-bg"/>
        <div className="p-4">
          <div className="text-[10px] font-mono uppercase text-mute">Engineering · 6 min read</div>
          <h3 className="text-base font-medium text-ink mt-1">Shipping a 400-component library in a weekend</h3>
          <p className="text-xs text-body mt-1">A retrospective on speed, scope, and saying no to ornament.</p>
          <div className="flex items-center gap-2 mt-3">
            <div className="h-6 w-6 rounded-full bg-ink"/>
            <span className="text-xs text-body">M Iqbal S</span>
          </div>
        </div>
      </div>
    </Stage>
  );
}

// ---------- COMMENT THREAD ----------
function CommentThread() {
  return (
    <Stage>
      <div className="w-full max-w-md space-y-3">
        {[
          { n: "Lee", t: "Love the new dark mode. Persistence works flawlessly across pages.", a: "L" },
          { n: "Indri", t: "Can we get a calendar heatmap variant in green?", a: "I" },
        ].map((c, i) => (
          <div key={i} className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-canvas-soft grid place-items-center text-xs">{c.a}</div>
            <div className="flex-1 bg-canvas-soft rounded-lg p-2">
              <div className="text-xs font-medium text-ink">{c.n}</div>
              <div className="text-xs text-body">{c.t}</div>
              <div className="flex gap-3 mt-1 text-[11px] text-mute">
                <button>Reply</button><button>Like</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Stage>
  );
}

// ---------- REVIEW CARD ----------
function ReviewCard() {
  return (
    <Stage>
      <div className="w-full max-w-sm rounded-xl border border-hairline bg-canvas p-4">
        <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-warning text-warning"/>)}</div>
        <h4 className="text-sm font-medium text-ink mt-2">Best dev DX I've had in 2026</h4>
        <p className="text-xs text-body mt-1">"Cmd+K, fuzzy search, themed, accessible. Shipped a landing page in 90 minutes."</p>
        <div className="flex items-center gap-2 mt-3">
          <div className="h-7 w-7 rounded-full bg-canvas-soft"/>
          <div><div className="text-xs text-ink">Sara K.</div><div className="text-[10px] text-mute">Lead Engineer · Vercel</div></div>
        </div>
      </div>
    </Stage>
  );
}

// ---------- LOG VIEWER ----------
function LogViewer() {
  const rows = [
    { l: "INFO", c: "text-link", m: "Booted in 142ms" },
    { l: "WARN", c: "text-warning", m: "Slow query: SELECT * FROM users" },
    { l: "INFO", c: "text-link", m: "Cache hit ratio 94%" },
    { l: "ERROR", c: "text-destructive", m: "Failed to fetch upstream (502)" },
    { l: "INFO", c: "text-link", m: "Retry succeeded after 3 attempts" },
  ];
  return (
    <Stage>
      <div className="w-full max-w-md bg-[#0a0a0a] text-white rounded-md p-3 font-mono text-[11px] space-y-0.5">
        {rows.map((r, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-white/40 tabular-nums">{`00:${(12+i).toString().padStart(2,"0")}.${(i*7).toString().padStart(3,"0")}`}</span>
            <span className={r.c}>{r.l}</span>
            <span className="text-white/80">{r.m}</span>
          </div>
        ))}
      </div>
    </Stage>
  );
}

// ---------- JSON VIEWER ----------
function JsonViewer() {
  return (
    <Stage>
      <pre className="w-full max-w-md bg-canvas-soft border border-hairline rounded-md p-3 font-mono text-[11px] text-ink">
{`{
  "id": "vanta-ui",
  "version": "1.0.0",
  "components": 400,
  "themes": ["light", "dark"],
  "author": { "name": "M Iqbal S" }
}`}
      </pre>
    </Stage>
  );
}

// ---------- CODE DIFF ----------
function CodeDiff() {
  return (
    <Stage>
      <pre className="w-full max-w-md bg-canvas-soft border border-hairline rounded-md p-3 font-mono text-[11px]">
        <div className="text-mute">@@ -3,4 +3,5 @@</div>
        <div className="bg-destructive/10 text-destructive">- variant: "basic"</div>
        <div className="bg-success/10 text-success">+ variant: "premium"</div>
        <div className="bg-success/10 text-success">+ glow: true</div>
        <div className="text-body">  rounded: true</div>
      </pre>
    </Stage>
  );
}

// ---------- SEGMENT CONTROL ----------
function SegmentControl() {
  return (
    <Stage>
      <div className="inline-flex p-1 rounded-lg bg-canvas-soft border border-hairline text-sm">
        {["Day", "Week", "Month", "Year"].map((s, i) => (
          <button key={s} className={`px-3 py-1 rounded-md ${i===1 ? "bg-canvas text-ink shadow-sm" : "text-body"}`}>{s}</button>
        ))}
      </div>
    </Stage>
  );
}

// ---------- EMOJI PICKER ----------
function EmojiPicker() {
  const emo = "😀😃😄😁😆😅🤣😂🙂😉😍🥰😎🤩🥳🙃😴🤔🤨😏😬😮😯😲🤯".split("");
  return (
    <Stage>
      <div className="w-full max-w-xs rounded-xl border border-hairline bg-canvas p-2">
        <div className="flex items-center gap-1 px-1 pb-2 border-b border-hairline text-xs text-mute">
          <Smile className="h-3.5 w-3.5"/>Smileys
        </div>
        <div className="grid grid-cols-8 gap-1 pt-2 text-lg">
          {emo.slice(0, 24).map((e, i) => <button key={i} className="h-7 w-7 grid place-items-center rounded hover:bg-canvas-soft">{e}</button>)}
        </div>
      </div>
    </Stage>
  );
}

// ---------- COUNTRY PICKER ----------
function CountryPicker() {
  return (
    <Stage>
      <div className="w-full max-w-xs rounded-xl border border-hairline bg-canvas p-2 space-y-0.5">
        {[["🇮🇩","Indonesia"],["🇸🇬","Singapore"],["🇯🇵","Japan"],["🇺🇸","United States"]].map(([f,n]) => (
          <button key={n} className="w-full flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-canvas-soft text-sm">
            <span className="text-lg">{f}</span><span className="text-ink">{n}</span>
          </button>
        ))}
      </div>
    </Stage>
  );
}

// ---------- CURRENCY INPUT ----------
function CurrencyInput() {
  return (
    <Stage>
      <div className="flex items-center w-full max-w-xs rounded-md border border-hairline bg-canvas overflow-hidden">
        <button className="h-10 px-3 text-sm border-r border-hairline bg-canvas-soft inline-flex items-center gap-1">USD <ChevronDown className="h-3 w-3"/></button>
        <input defaultValue="1,250.00" className="flex-1 h-10 px-3 text-sm tabular-nums bg-transparent outline-none"/>
      </div>
    </Stage>
  );
}

// ---------- GRADIENT BUILDER ----------
function GradientBuilder() {
  const grads = [
    "linear-gradient(135deg,#7928ca,#ff0080)",
    "linear-gradient(135deg,#0070f3,#00dfd8)",
    "linear-gradient(135deg,#ff4d4d,#f9cb28)",
    "linear-gradient(135deg,#10b981,#0070f3)",
    "linear-gradient(135deg,#ff0080,#ff8a00)",
    "linear-gradient(135deg,#1a1a1a,#7928ca)",
  ];
  return (
    <Stage>
      <div className="grid grid-cols-3 gap-2">
        {grads.map((g, i) => (
          <button key={i} className="h-16 w-20 rounded-lg ring-1 ring-hairline" style={{ backgroundImage: g }}/>
        ))}
      </div>
    </Stage>
  );
}

// ---------- TOKEN TABLE ----------
function TokenTable() {
  const rows = [
    { k: "--ink", v: "#171717", c: "#171717" },
    { k: "--canvas", v: "#ffffff", c: "#ffffff" },
    { k: "--link", v: "#0070f3", c: "#0070f3" },
    { k: "--violet", v: "#7928ca", c: "#7928ca" },
  ];
  return (
    <Stage>
      <div className="w-full max-w-md rounded-md border border-hairline overflow-hidden text-xs">
        {rows.map(r => (
          <div key={r.k} className="flex items-center gap-3 px-3 py-2 border-b border-hairline last:border-0">
            <div className="h-5 w-5 rounded ring-1 ring-hairline" style={{ background: r.c }}/>
            <code className="font-mono text-ink flex-1">{r.k}</code>
            <code className="font-mono text-mute">{r.v}</code>
          </div>
        ))}
      </div>
    </Stage>
  );
}

// ---------- SHORTCUT LIST ----------
function ShortcutList() {
  const list = [["Open palette","⌘ K"],["Toggle theme","⌘ T"],["Go to docs","G D"],["New project","⌘ N"]];
  return (
    <Stage>
      <div className="w-full max-w-sm space-y-1">
        {list.map(([l,k]) => (
          <div key={l} className="flex items-center justify-between text-sm py-1.5">
            <span className="text-body">{l}</span>
            <kbd className="px-2 py-0.5 rounded border border-hairline text-[10px] font-mono bg-canvas-soft">{k}</kbd>
          </div>
        ))}
      </div>
    </Stage>
  );
}

// ---------- METRIC ROW ----------
function MetricRow() {
  const m = [
    { l: "MRR", v: "$28,410", d: "+12%", up: true },
    { l: "Churn", v: "1.8%", d: "-0.4%", up: true },
    { l: "DAU", v: "4,210", d: "+3.1%", up: true },
    { l: "Errors", v: "47", d: "+22%", up: false },
  ];
  return (
    <Stage>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl">
        {m.map(x => (
          <div key={x.l} className="rounded-lg border border-hairline bg-canvas p-3">
            <div className="text-[10px] uppercase font-mono text-mute">{x.l}</div>
            <div className="text-xl font-medium text-ink tabular-nums mt-0.5">{x.v}</div>
            <div className={`text-[11px] mt-1 inline-flex items-center gap-1 ${x.up ? "text-success" : "text-destructive"}`}>
              {x.up ? <TrendingUp className="h-3 w-3"/> : <TrendingDown className="h-3 w-3"/>}{x.d}
            </div>
          </div>
        ))}
      </div>
    </Stage>
  );
}

// ---------- TROPHY / ACHIEVEMENT ----------
function Achievement() {
  return (
    <Stage>
      <div className="w-full max-w-sm rounded-2xl border border-hairline bg-canvas p-5 text-center">
        <div className="mx-auto h-16 w-16 rounded-full grid place-items-center text-white" style={{ backgroundImage: "linear-gradient(135deg,#f5a623,#ff0080)" }}>
          <Award className="h-8 w-8"/>
        </div>
        <div className="mt-3 text-base font-medium text-ink">Streak unlocked!</div>
        <div className="text-xs text-mute">7 days of shipping in a row.</div>
        <button className="mt-3 h-8 px-4 rounded-md bg-ink text-white text-xs">Share</button>
      </div>
    </Stage>
  );
}

// ---------- FEATURE FLAG ----------
function FeatureFlag() {
  return (
    <Stage>
      <div className="w-full max-w-md rounded-lg border border-hairline bg-canvas divide-y divide-hairline">
        {[["new-dashboard","on","Stable"],["ai-search","on","Beta"],["mobile-app","off","Internal"]].map(([n,s,g]) => (
          <div key={n} className="flex items-center justify-between p-3">
            <div>
              <div className="text-sm font-mono text-ink">{n}</div>
              <div className="text-[11px] text-mute">{g}</div>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${s==="on" ? "bg-success/10 text-success" : "bg-canvas-soft text-mute"}`}>{s.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </Stage>
  );
}

// ---------- DATABASE QUERY CARD ----------
function DBQuery() {
  return (
    <Stage>
      <div className="w-full max-w-md rounded-lg border border-hairline overflow-hidden">
        <div className="bg-canvas-soft px-3 py-2 flex items-center gap-2 border-b border-hairline">
          <Database className="h-3.5 w-3.5 text-link"/><span className="text-xs font-mono text-ink">SELECT users</span>
          <span className="ml-auto text-[10px] text-mute">12ms</span>
        </div>
        <pre className="bg-[#0a0a0a] text-white p-3 font-mono text-[11px]">{`SELECT id, name, email
FROM users
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;`}</pre>
      </div>
    </Stage>
  );
}

// ---------- PRESENCE / ONLINE USERS ----------
function Presence() {
  const users = [["A","#7928ca"],["B","#0070f3"],["C","#10b981"],["D","#f5a623"]];
  return (
    <Stage>
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {users.map(([n,c],i)=>(
            <div key={i} className="h-8 w-8 rounded-full border-2 border-canvas grid place-items-center text-xs text-white" style={{background:c as string}}>{n}</div>
          ))}
        </div>
        <div className="text-xs text-body"><span className="text-ink font-medium">4 people</span> editing now</div>
      </div>
    </Stage>
  );
}

// ---------- TAG CLOUD ----------
function TagCloud() {
  const tags = [
    ["react", 24], ["tailwind", 20], ["ai", 18], ["nextjs", 16], ["design", 14], ["typescript", 22],
    ["vercel", 12], ["motion", 10], ["a11y", 16], ["shadcn", 14], ["ui", 26], ["dx", 12],
  ];
  return (
    <Stage>
      <div className="flex flex-wrap gap-2 items-center justify-center max-w-md">
        {tags.map(([t,s]: any) => (
          <span key={t} className="text-ink" style={{ fontSize: `${10 + s/2}px` }}>#{t}</span>
        ))}
      </div>
    </Stage>
  );
}

// ---------- SHIMMER BUTTON ----------
function ShimmerBtn({ variant }: { variant: V }) {
  const grad = variant === "rainbow" ? "linear-gradient(90deg,#ff0080,#7928ca,#0070f3,#00dfd8,#10b981,#f5a623,#ff0080)"
    : "linear-gradient(90deg,#0070f3,#7928ca,#0070f3)";
  return (
    <Stage>
      <button className="h-11 px-6 rounded-full text-sm text-white font-medium relative overflow-hidden" style={{ backgroundImage: grad, backgroundSize: "200% 100%", animation: "shimmer 2.5s linear infinite" }}>
        <Sparkles className="h-4 w-4 inline -mt-0.5 mr-1.5"/>Try Vanta Pro
      </button>
    </Stage>
  );
}

// ---------- BENTO HERO ----------
function BentoHero() {
  return (
    <Stage h="min-h-[300px]">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 w-full max-w-2xl h-56">
        <div className="col-span-2 row-span-2 rounded-xl mesh-bg"/>
        <div className="rounded-xl bg-canvas-soft border border-hairline"/>
        <div className="rounded-xl bg-ink"/>
        <div className="col-span-2 rounded-xl border border-hairline grid place-items-center text-xs text-mute">Code preview</div>
      </div>
    </Stage>
  );
}

// ---------- CONFETTI BUTTON ----------
function ConfettiBtn() {
  return (
    <Stage>
      <button className="h-11 px-5 rounded-full bg-ink text-white text-sm inline-flex items-center gap-2">
        <Rocket className="h-4 w-4"/>Launch
      </button>
    </Stage>
  );
}

// ---------- DISPATCH ----------
export function Preview({ kind, variant }: { kind: string; variant?: string }) {
  switch (kind) {
    case "button": return <Button variant={variant}/>;
    case "icon-button": return <IconButton/>;
    case "toggle": return <Toggle/>;
    case "button-group": return <ButtonGroup/>;
    case "split-button": return <SplitButton/>;
    case "fab": return <FAB/>;
    case "copy-button": return <CopyButton/>;
    case "link": return <LinkP/>;
    case "badge": return <Badge variant={variant}/>;
    case "chip": return <Chip/>;
    case "tag": return <Tag/>;
    case "kbd": return <Kbd/>;
    case "avatar": return <Avatar variant={variant}/>;
    case "tooltip": return <Tooltip/>;
    case "popover": return <Popover/>;
    case "dropdown": return <Dropdown/>;
    case "context-menu": return <ContextMenu/>;
    case "menu-bar": return <MenuBar/>;
    case "command-menu": return <CommandMenuP/>;
    case "modal": return <Modal variant={variant}/>;
    case "drawer": return <Drawer variant={variant}/>;
    case "hover-card": return <HoverCard/>;
    case "navbar": return <Navbar variant={variant}/>;
    case "sidebar": return <Sidebar/>;
    case "tabs": return <Tabs variant={variant}/>;
    case "accordion": return <Accordion/>;
    case "collapse": return <Collapse/>;
    case "breadcrumb": return <Breadcrumb/>;
    case "pagination": return <Pagination/>;
    case "stepper": return <Stepper/>;
    case "dock": return <Dock/>;
    case "floating-menu": return <FloatingMenu/>;
    case "user-menu": return <UserMenu variant={variant}/>;
    case "card": return <Card variant={variant}/>;
    case "toast": return <Toast variant={variant}/>;
    case "alert": return <Alert variant={variant}/>;
    case "banner": return <Banner/>;
    case "progress": return <Progress variant={variant}/>;
    case "skeleton": return <Skeleton/>;
    case "loader": return <Loader variant={variant}/>;
    case "input": return <Input variant={variant}/>;
    case "textarea": return <Textarea/>;
    case "otp": return <OTP variant={variant}/>;
    case "checkbox": return <Checkbox variant={variant}/>;
    case "radio": return <Radio/>;
    case "switch": return <Switch/>;
    case "slider": return <Slider variant={variant}/>;
    case "select": return <Select variant={variant}/>;
    case "date": return <DatePicker variant={variant}/>;
    case "form": return <Form variant={variant}/>;
    case "field": return <Field variant={variant}/>;
    case "upload": return <Upload variant={variant}/>;
    case "color-picker": return <ColorPicker/>;
    case "rating": return <Rating/>;
    case "table": return <Table variant={variant}/>;
    case "list": return <List variant={variant}/>;
    case "grid": return <Grid/>;
    case "tree": return <Tree variant={variant}/>;
    case "timeline": return <Timeline/>;
    case "feed": return <Feed variant={variant}/>;
    case "stats": return <Stats variant={variant}/>;
    case "empty": return <Empty/>;
    case "divider": return <Divider variant={variant}/>;
    case "kanban": return <Kanban/>;
    case "hero": return <Hero variant={variant}/>;
    case "feature-section": return <FeatureSection variant={variant}/>;
    case "pricing-section": return <PricingSection variant={variant}/>;
    case "faq": return <FAQ/>;
    case "testimonial": return <Testimonial variant={variant}/>;
    case "cta": return <CTA/>;
    case "newsletter": return <Newsletter/>;
    case "logo-strip": return <LogoStrip/>;
    case "header": return <Header/>;
    case "footer": return <Footer/>;
    case "dashboard-shell": return <DashboardShell/>;
    case "split-view": return <SplitView/>;
    case "masonry": return <Masonry variant={variant}/>;
    case "terminal": return <Terminal/>;
    case "code-block": return <CodeBlock/>;
    case "gallery": return <Gallery/>;
    case "carousel": return <Carousel variant={variant}/>;
    case "marquee": return <Marquee variant={variant}/>;
    case "video": return <Video/>;
    case "audio": return <Audio/>;
    case "map": return <Map/>;
    case "cursor": return <Cursor/>;
    case "parallax": return <Parallax/>;
    case "scroll-reveal": return <ScrollReveal variant={variant}/>;
    case "beam": return <Beam/>;
    case "aurora": return <Aurora/>;
    case "grid-beam": return <GridBeam/>;
    case "particles": return <Particles/>;
    case "ticker": return <Ticker variant={variant}/>;
    case "infinite-scroll": return <InfiniteScroll/>;
    case "dnd": return <DnD/>;
    case "chat": return <Chat variant={variant}/>;
    case "theme-switcher": return <ThemeSwitcher variant={variant}/>;
    case "swatch": return <Swatch/>;
    case "typescale": return <TypeScale/>;
    case "spacing-scale": return <SpacingScale/>;
    case "icons": return <Icons/>;
    case "responsive-preview": return <ResponsivePreview/>;
    case "chart": return <Chart variant={variant}/>;
    case "logo": return <Logo/>;
    // v2 — AI
    case "ai-profile": return <AIProfile variant={variant}/>;
    case "ai-agent": return <AIAgent variant={variant}/>;
    case "ai-persona": return <AIPersona/>;
    case "ai-prompt-card": return <AIPromptCard variant={variant}/>;
    case "ai-tool-call": return <AIToolCall/>;
    case "ai-citation": return <AICitation/>;
    case "ai-suggestion": return <AISuggestion/>;
    case "ai-model-picker": return <AIModelPicker/>;
    case "ai-stream": return <AIStream/>;
    case "ai-memory": return <AIMemory/>;
    case "ai-token-usage": return <AITokenUsage/>;
    // v2 — Data / Dashboard
    case "kpi-tile": return <KPITile variant={variant}/>;
    case "gauge": return <Gauge/>;
    case "calendar-heat": return <CalendarHeat/>;
    case "metric-row": return <MetricRow/>;
    case "feature-flag": return <FeatureFlag/>;
    case "db-query": return <DBQuery/>;
    case "log-viewer": return <LogViewer/>;
    case "json-viewer": return <JsonViewer/>;
    case "code-diff": return <CodeDiff/>;
    case "token-table": return <TokenTable/>;
    case "tag-cloud": return <TagCloud/>;
    case "presence": return <Presence/>;
    // v2 — Social / Content
    case "social-card": return <SocialCard/>;
    case "blog-card": return <BlogCard/>;
    case "comment-thread": return <CommentThread/>;
    case "review-card": return <ReviewCard/>;
    case "achievement": return <Achievement/>;
    // v2 — Forms / Pickers
    case "segment": return <SegmentControl/>;
    case "emoji-picker": return <EmojiPicker/>;
    case "country-picker": return <CountryPicker/>;
    case "currency-input": return <CurrencyInput/>;
    case "gradient-builder": return <GradientBuilder/>;
    case "shortcut-list": return <ShortcutList/>;
    // v2 — Marketing / Animation
    case "shimmer-btn": return <ShimmerBtn variant={variant}/>;
    case "bento-hero": return <BentoHero/>;
    case "confetti-btn": return <ConfettiBtn/>;
    default:
      return <Stage><div className="text-sm text-mute">Preview pending.</div></Stage>;
  }
}

// Copyright (c) 2026 M Iqbal S — Vanta UI
// Licensed under MIT License — https://github.com/iqballllzzzz/Vanta-UI-Component-Library/blob/main/LICENSE
