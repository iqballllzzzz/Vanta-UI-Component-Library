import { slugify } from "./slug";

export type Category =
  | "Actions"
  | "Forms"
  | "Navigation"
  | "Overlays"
  | "Data Display"
  | "Feedback"
  | "Layout"
  | "Media"
  | "Marketing"
  | "AI"
  | "Animation"
  | "Auth"
  | "Dashboard";

export type ComponentEntry = {
  name: string;
  slug: string;
  category: Category;
  kind: string; // renderer key
  variant?: string; // variant key passed to renderer
  description: string;
  tags: string[];
  props?: { name: string; type: string; default?: string; description: string }[];
  a11y?: string[];
  code?: string;
  usage?: string;
  cli?: string;
  pkg?: string;
  isNew?: boolean;
};

const defaultProps = [
  { name: "className", type: "string", description: "Tailwind classes appended to the root." },
  { name: "children", type: "ReactNode", description: "Slot content." },
];

const defaultA11y = [
  "Keyboard focus visible (focus-visible ring).",
  "Color contrast meets WCAG AA on canvas and dark surfaces.",
  "Semantic landmark / ARIA role applied where relevant.",
];

const make = (
  name: string,
  category: Category,
  kind: string,
  description: string,
  extras: Partial<ComponentEntry> = {},
): ComponentEntry => ({
  name,
  slug: slugify(name),
  category,
  kind,
  description,
  tags: [category.toLowerCase(), kind, ...(extras.tags ?? [])],
  props: extras.props ?? defaultProps,
  a11y: extras.a11y ?? defaultA11y,
  cli: extras.cli ?? `npx vanta-ui add ${slugify(name)}`,
  pkg: extras.pkg ?? `npm i @vanta-ui/${slugify(name)}`,
  usage:
    extras.usage ??
    `import { ${name.replace(/\s+/g, "")} } from "@vanta-ui/react";\n\nexport default function Example() {\n  return <${name.replace(/\s+/g, "")} />;\n}`,
  code:
    extras.code ??
    `// ${name} — Vanta UI\nexport function ${name.replace(/\s+/g, "")}(props) {\n  return (\n    /* see live preview */\n    null\n  );\n}`,
  ...extras,
});

// Programmatic catalog. Each entry maps to a renderer in preview-renderers.tsx
// via { kind, variant }.
export const COMPONENTS: ComponentEntry[] = [
  // Actions — Buttons (15)
  make("Button", "Actions", "button", "Primary pill button in ink primary."),
  make("Button Secondary", "Actions", "button", "Outline pill button on canvas.", { variant: "secondary" }),
  make("Button Ghost", "Actions", "button", "Ghost button with hover canvas-soft.", { variant: "ghost" }),
  make("Button Link", "Actions", "button", "Inline link-styled button.", { variant: "link" }),
  make("Button Gradient", "Actions", "button", "Mesh-gradient hero CTA.", { variant: "gradient" }),
  make("Button Destructive", "Actions", "button", "Critical action button.", { variant: "destructive" }),
  make("Button Loading", "Actions", "button", "Async pending state.", { variant: "loading" }),
  make("Button Sizes", "Actions", "button", "sm, md, lg, xl scales.", { variant: "sizes" }),
  make("Icon Button", "Actions", "icon-button", "Square icon-only button."),
  make("Toggle Button", "Actions", "toggle", "On/off toggle button."),
  make("Button Group", "Actions", "button-group", "Segmented button group."),
  make("Split Button", "Actions", "split-button", "Button with dropdown affordance."),
  make("Floating Action Button", "Actions", "fab", "Fixed circular action."),
  make("Copy Button", "Actions", "copy-button", "Click-to-copy with state."),
  make("Link", "Actions", "link", "Inline link with hover underline."),

  // Badges & Tags (10)
  make("Badge", "Data Display", "badge", "Soft secondary badge."),
  make("Badge Solid", "Data Display", "badge", "Solid ink badge.", { variant: "solid" }),
  make("Badge Outline", "Data Display", "badge", "Outline badge.", { variant: "outline" }),
  make("Status Badge", "Data Display", "badge", "Status dot + label.", { variant: "status" }),
  make("Gradient Badge", "Data Display", "badge", "Mesh-gradient text badge.", { variant: "gradient" }),
  make("Chip", "Data Display", "chip", "Dismissable chip."),
  make("Tag", "Data Display", "tag", "Mono caption tag."),
  make("Counter Badge", "Data Display", "badge", "Numeric counter pill.", { variant: "counter" }),
  make("Kbd", "Data Display", "kbd", "Keyboard key cap."),
  make("Pill", "Data Display", "badge", "Pill announcement.", { variant: "pill" }),

  // Avatars (6)
  make("Avatar", "Data Display", "avatar", "User avatar with fallback."),
  make("Avatar Sizes", "Data Display", "avatar", "xs → 2xl scale.", { variant: "sizes" }),
  make("Avatar Group", "Data Display", "avatar", "Stacked avatars with overflow.", { variant: "group" }),
  make("Avatar Status", "Data Display", "avatar", "Avatar with presence dot.", { variant: "status" }),
  make("Avatar Square", "Data Display", "avatar", "Squircle avatar.", { variant: "square" }),
  make("Initials Avatar", "Data Display", "avatar", "Generated initials.", { variant: "initials" }),

  // Overlays (12)
  make("Tooltip", "Overlays", "tooltip", "Hover tooltip with arrow."),
  make("Popover", "Overlays", "popover", "Anchored popover panel."),
  make("Dropdown", "Overlays", "dropdown", "Dropdown menu with items."),
  make("Context Menu", "Overlays", "context-menu", "Right-click context menu."),
  make("Menu Bar", "Overlays", "menu-bar", "Top menu bar."),
  make("Command Menu", "Overlays", "command-menu", "Cmd+K command palette."),
  make("Modal", "Overlays", "modal", "Centered modal."),
  make("Dialog", "Overlays", "modal", "Form dialog.", { variant: "dialog" }),
  make("Alert Dialog", "Overlays", "modal", "Destructive confirm dialog.", { variant: "alert" }),
  make("Drawer", "Overlays", "drawer", "Side drawer."),
  make("Sheet", "Overlays", "drawer", "Bottom sheet.", { variant: "bottom" }),
  make("Hover Card", "Overlays", "hover-card", "User hover preview card."),

  // Navigation (14)
  make("Navbar", "Navigation", "navbar", "Top navigation bar."),
  make("Navbar Centered", "Navigation", "navbar", "Centered logo navbar.", { variant: "centered" }),
  make("Sidebar", "Navigation", "sidebar", "App sidebar."),
  make("Tabs", "Navigation", "tabs", "Underline tabs."),
  make("Tabs Pill", "Navigation", "tabs", "Pill tabs.", { variant: "pill" }),
  make("Vertical Tabs", "Navigation", "tabs", "Vertical tabs.", { variant: "vertical" }),
  make("Accordion", "Navigation", "accordion", "Stacked accordion."),
  make("Collapse", "Navigation", "collapse", "Single collapse."),
  make("Breadcrumb", "Navigation", "breadcrumb", "Path breadcrumb."),
  make("Pagination", "Navigation", "pagination", "Numbered pagination."),
  make("Stepper", "Navigation", "stepper", "Multi-step progress."),
  make("Dock", "Navigation", "dock", "macOS-style dock."),
  make("Floating Menu", "Navigation", "floating-menu", "Floating action menu."),
  make("User Menu", "Navigation", "user-menu", "Avatar dropdown menu."),

  // Cards (10)
  make("Card", "Layout", "card", "Hairline card on canvas."),
  make("Glass Card", "Layout", "card", "Frosted glass card over mesh.", { variant: "glass" }),
  make("Profile Card", "Layout", "card", "User profile card.", { variant: "profile" }),
  make("Product Card", "Layout", "card", "E-commerce product.", { variant: "product" }),
  make("Stat Card", "Layout", "card", "KPI stat card.", { variant: "stat" }),
  make("Pricing Card", "Layout", "card", "Pricing tier card.", { variant: "pricing" }),
  make("Pricing Featured", "Layout", "card", "Featured ink tier.", { variant: "pricing-featured" }),
  make("Feature Card", "Layout", "card", "Feature with icon.", { variant: "feature" }),
  make("Template Card", "Layout", "card", "Template thumbnail.", { variant: "template" }),
  make("Spotlight Card", "Layout", "card", "Mouse-follow spotlight.", { variant: "spotlight" }),

  // Feedback (12)
  make("Toast", "Feedback", "toast", "Notification toast."),
  make("Snackbar", "Feedback", "toast", "Action snackbar.", { variant: "snackbar" }),
  make("Alert", "Feedback", "alert", "Inline alert info."),
  make("Alert Success", "Feedback", "alert", "Success alert.", { variant: "success" }),
  make("Alert Warning", "Feedback", "alert", "Warning alert.", { variant: "warning" }),
  make("Alert Error", "Feedback", "alert", "Error alert.", { variant: "error" }),
  make("Banner", "Feedback", "banner", "Top page banner."),
  make("Progress Bar", "Feedback", "progress", "Linear progress."),
  make("Circular Progress", "Feedback", "progress", "Radial progress.", { variant: "circular" }),
  make("Skeleton", "Feedback", "skeleton", "Loading placeholder."),
  make("Loader", "Feedback", "loader", "Dots loader."),
  make("Spinner", "Feedback", "loader", "Ring spinner.", { variant: "ring" }),

  // Forms (20)
  make("Input", "Forms", "input", "Text input."),
  make("Input With Icon", "Forms", "input", "Input with leading icon.", { variant: "icon" }),
  make("Input Sizes", "Forms", "input", "sm/md/lg.", { variant: "sizes" }),
  make("Textarea", "Forms", "textarea", "Multiline input."),
  make("Search Input", "Forms", "input", "Search with kbd hint.", { variant: "search" }),
  make("OTP Input", "Forms", "otp", "One-time-passcode input."),
  make("Pin Input", "Forms", "otp", "Numeric PIN.", { variant: "pin" }),
  make("Checkbox", "Forms", "checkbox", "Checkbox."),
  make("Checkbox Group", "Forms", "checkbox", "Checkbox group.", { variant: "group" }),
  make("Radio Group", "Forms", "radio", "Radio group."),
  make("Switch", "Forms", "switch", "Toggle switch."),
  make("Slider", "Forms", "slider", "Single-value slider."),
  make("Range Slider", "Forms", "slider", "Two-thumb range.", { variant: "range" }),
  make("Select", "Forms", "select", "Native-style select."),
  make("Multi Select", "Forms", "select", "Multiple chips select.", { variant: "multi" }),
  make("Combobox", "Forms", "select", "Searchable select.", { variant: "combobox" }),
  make("Date Picker", "Forms", "date", "Single date picker."),
  make("Time Picker", "Forms", "date", "Time picker.", { variant: "time" }),
  make("Calendar", "Forms", "date", "Inline calendar.", { variant: "calendar" }),
  make("Form", "Forms", "form", "Full sign-in form."),

  // Forms supplemental (6)
  make("Field", "Forms", "field", "Labelled field row."),
  make("Label", "Forms", "field", "Standalone label.", { variant: "label" }),
  make("Password Input", "Forms", "input", "Password with reveal.", { variant: "password" }),
  make("File Upload", "Forms", "upload", "File picker."),
  make("Drag Upload", "Forms", "upload", "Drag-and-drop dropzone.", { variant: "drag" }),
  make("Color Picker", "Forms", "color-picker", "Color picker with swatches."),

  // Data Display (14)
  make("Table", "Data Display", "table", "Hairline table."),
  make("Data Table", "Data Display", "table", "Sortable data table.", { variant: "data" }),
  make("List", "Data Display", "list", "Stacked list."),
  make("Grid", "Data Display", "grid", "Auto-fit grid."),
  make("Tree View", "Data Display", "tree", "Folder tree."),
  make("Timeline", "Data Display", "timeline", "Vertical timeline."),
  make("Activity Feed", "Data Display", "feed", "Activity stream."),
  make("Stat Group", "Data Display", "stats", "Stats row."),
  make("Empty State", "Data Display", "empty", "Empty state with action."),
  make("Divider", "Data Display", "divider", "Hairline divider."),
  make("Separator", "Data Display", "divider", "Labelled separator.", { variant: "label" }),
  make("Kanban Board", "Data Display", "kanban", "Three-column kanban."),
  make("Tree Folder", "Data Display", "tree", "Files tree.", { variant: "files" }),
  make("Description List", "Data Display", "list", "Key-value list.", { variant: "desc" }),

  // Marketing (10)
  make("Hero Section", "Marketing", "hero", "Mesh-gradient hero."),
  make("Hero Split", "Marketing", "hero", "Split image hero.", { variant: "split" }),
  make("Feature Section", "Marketing", "feature-section", "3-up feature grid."),
  make("Pricing Section", "Marketing", "pricing-section", "Pricing tiers."),
  make("FAQ Section", "Marketing", "faq", "Stacked FAQ."),
  make("Testimonial Section", "Marketing", "testimonial", "Testimonials grid."),
  make("CTA Section", "Marketing", "cta", "Polarity-flipped CTA."),
  make("Newsletter Section", "Marketing", "newsletter", "Email signup band."),
  make("Logo Strip", "Marketing", "logo-strip", "Customer logos."),
  make("Stats Band", "Marketing", "stats", "Big-number stats band.", { variant: "band" }),

  // Site chrome
  make("Header", "Layout", "header", "Marketing header."),
  make("Footer", "Layout", "footer", "Marketing footer."),
  make("Dashboard Layout", "Layout", "dashboard-shell", "Sidebar + content shell."),
  make("Split View", "Layout", "split-view", "Resizable split view."),
  make("Resizable Panel", "Layout", "split-view", "Resizable panels.", { variant: "panels" }),
  make("Masonry Grid", "Layout", "masonry", "Pinterest-style grid."),

  // Auth (4)
  make("Login Form", "Auth", "form", "Sign-in form.", { variant: "login" }),
  make("Register Form", "Auth", "form", "Sign-up form.", { variant: "register" }),
  make("Forgot Password", "Auth", "form", "Forgot password form.", { variant: "forgot" }),
  make("Profile Menu", "Auth", "user-menu", "Profile dropdown.", { variant: "profile" }),

  // Dashboard / AI (10)
  make("Analytics Card", "Dashboard", "card", "KPI with sparkline.", { variant: "analytics" }),
  make("Chart", "Dashboard", "chart", "Area chart."),
  make("Bar Chart", "Dashboard", "chart", "Bar chart.", { variant: "bar" }),
  make("Line Chart", "Dashboard", "chart", "Line chart.", { variant: "line" }),
  make("Notification Panel", "Dashboard", "feed", "Notifications panel.", { variant: "notif" }),
  make("Chat Bubble", "AI", "chat", "User + AI bubble."),
  make("Chat Input", "AI", "chat", "Composer.", { variant: "input" }),
  make("AI Chat UI", "AI", "chat", "Full AI chat surface.", { variant: "full" }),
  make("Prompt Box", "AI", "chat", "Prompt textarea.", { variant: "prompt" }),
  make("Command Palette", "AI", "command-menu", "Cmd-K palette.", { variant: "palette" }),

  // Media (12)
  make("Terminal UI", "Media", "terminal", "Terminal mockup."),
  make("Code Block", "Media", "code-block", "Syntax code block."),
  make("Image Gallery", "Media", "gallery", "Image gallery grid."),
  make("Carousel", "Media", "carousel", "Slide carousel."),
  make("Swiper", "Media", "carousel", "Card swiper.", { variant: "cards" }),
  make("Marquee", "Media", "marquee", "Infinite marquee."),
  make("Video Player", "Media", "video", "Video player."),
  make("Audio Player", "Media", "audio", "Audio player."),
  make("Map Embed", "Media", "map", "Map embed."),
  make("Cursor Effect", "Media", "cursor", "Custom cursor."),
  make("Parallax Section", "Media", "parallax", "Parallax scroll."),
  make("Scroll Animation", "Animation", "scroll-reveal", "Scroll reveal."),

  // Animation (10)
  make("Reveal Animation", "Animation", "scroll-reveal", "Fade-up reveal.", { variant: "fade" }),
  make("Hover Card Effect", "Animation", "hover-card", "3D tilt card.", { variant: "tilt" }),
  make("Spotlight Effect", "Animation", "card", "Mouse spotlight.", { variant: "spotlight" }),
  make("Glass Panel", "Animation", "card", "Glass panel.", { variant: "glass" }),
  make("Marquee Logos", "Animation", "marquee", "Logos marquee.", { variant: "logos" }),
  make("Animated Beam", "Animation", "beam", "Connect nodes with beam."),
  make("Aurora Background", "Animation", "aurora", "Aurora animated bg."),
  make("Grid Beam", "Animation", "grid-beam", "Animated grid beam."),
  make("Particles", "Animation", "particles", "Floating particles."),
  make("Number Ticker", "Animation", "ticker", "Animated number."),

  // Theme + utilities (8)
  make("Theme Switcher", "Actions", "theme-switcher", "Light/dark toggle."),
  make("Light Mode", "Actions", "theme-switcher", "Light mode preview.", { variant: "light" }),
  make("Dark Mode", "Actions", "theme-switcher", "Dark mode preview.", { variant: "dark" }),
  make("Color Swatch", "Data Display", "swatch", "Color token swatch."),
  make("Typography Scale", "Data Display", "typescale", "Type scale preview."),
  make("Spacing Scale", "Data Display", "spacing-scale", "Spacing scale."),
  make("Icon Library", "Data Display", "icons", "Lucide icon grid."),
  make("Infinite Scroll", "Animation", "infinite-scroll", "Infinite list."),

  // Misc (10)
  make("Virtual List", "Data Display", "list", "Virtualized list.", { variant: "virtual" }),
  make("Drag and Drop", "Animation", "dnd", "Drag and drop list."),
  make("Tree Select", "Forms", "tree", "Tree select.", { variant: "select" }),
  make("Tag Input", "Forms", "input", "Tag input.", { variant: "tags" }),
  make("Mention Input", "Forms", "input", "@ mention input.", { variant: "mention" }),
  make("Rating", "Forms", "rating", "Star rating."),
  make("Avatar Picker", "Forms", "avatar", "Avatar picker.", { variant: "picker" }),
  make("Theme Customizer", "Actions", "theme-switcher", "Token customizer.", { variant: "customizer" }),
  make("Responsive Preview", "Layout", "responsive-preview", "Device frames."),
  make("Showcase Tile", "Marketing", "card", "Showcase tile.", { variant: "showcase" }),

  // Additional pack (15) to push the catalog past 200
  make("Hero Mesh", "Marketing", "hero", "Hero with mesh background.", { variant: "mesh" }),
  make("Hero Terminal", "Marketing", "hero", "Hero with terminal demo.", { variant: "terminal" }),
  make("Feature Bento", "Marketing", "feature-section", "Bento feature grid.", { variant: "bento" }),
  make("Pricing Compare", "Marketing", "pricing-section", "Compare plans table.", { variant: "compare" }),
  make("Testimonial Marquee", "Marketing", "testimonial", "Scrolling testimonials.", { variant: "marquee" }),
  make("Stat Sparkline", "Dashboard", "card", "Stat with sparkline.", { variant: "stat-spark" }),
  make("Settings Form", "Forms", "form", "Settings form.", { variant: "settings" }),
  make("Search Modal", "Overlays", "command-menu", "Search modal.", { variant: "search" }),
  make("Notification Toast", "Feedback", "toast", "Stacked toasts.", { variant: "stack" }),
  make("Status Page Row", "Data Display", "list", "Status row.", { variant: "status" }),
  make("Logo Mark", "Layout", "logo", "Brand logo mark."),
  make("Avatar Stack Large", "Data Display", "avatar", "Large avatar stack.", { variant: "group-lg" }),
  make("Gradient Heading", "Animation", "ticker", "Gradient gradient heading.", { variant: "gradient-heading" }),
  make("Glow Card", "Animation", "card", "Glow border card.", { variant: "glow" }),
  make("Bento Layout", "Layout", "masonry", "Bento mixed grid.", { variant: "bento" }),
];

export const CATEGORIES: Category[] = [
  "Actions",
  "Forms",
  "Navigation",
  "Overlays",
  "Data Display",
  "Feedback",
  "Layout",
  "Media",
  "Marketing",
  "AI",
  "Animation",
  "Auth",
  "Dashboard",
];

export const findComponent = (slug: string) =>
  COMPONENTS.find((c) => c.slug === slug);

export const componentsByCategory = () => {
  const map: Record<string, ComponentEntry[]> = {};
  for (const c of COMPONENTS) {
    (map[c.category] ||= []).push(c);
  }
  return map;
};

export const totalCount = COMPONENTS.length;