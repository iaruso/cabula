import type { LucideIcon } from 'lucide-react'
import {
  Binary,
  Blend,
  Braces,
  Bug,
  Clock3,
  Database,
  FileJson2,
  FlaskConical,
  KeyRound,
  LayoutGrid,
  Link2,
  MapPinned,
  Navigation,
  Palette,
  Redo2,
  Regex,
  Route,
  Ruler,
  Scissors,
  ShieldCheck,
  Shuffle,
  Undo2,
  WandSparkles,
  Wind,
} from 'lucide-react'

type MenuItem = {
  icon: LucideIcon
  label: string
}

const sidebarSections: readonly { items: readonly MenuItem[] }[] = [
  {
    items: [
      { icon: WandSparkles, label: 'Shadow & Shape Orchestrator' },
      { icon: LayoutGrid, label: 'Layout Lab' },
      { icon: Blend, label: 'Gradient Architect' },
      { icon: Palette, label: 'Theming Engine & Color Mixer' },
      { icon: Wind, label: 'Tailwind Translator' },
      { icon: Ruler, label: 'Unit Converter' },
    ],
  },
  {
    items: [
      { icon: Bug, label: 'Event Listener Debugger' },
      { icon: Route, label: 'URL Architect' },
      { icon: Shuffle, label: 'Array Transformer' },
    ],
  },
  {
    items: [
      { icon: MapPinned, label: 'Coordinate Studio' },
      { icon: FileJson2, label: 'GeoJSON Integrity' },
      { icon: Navigation, label: 'Coordinate Converter' },
    ],
  },
  {
    items: [
      { icon: Braces, label: 'JSON Forge' },
      { icon: Database, label: 'SQL Blueprint' },
      { icon: FlaskConical, label: 'Mock Data Factory' },
      { icon: Regex, label: 'Regex Lab' },
      { icon: KeyRound, label: 'JWT Inspector' },
    ],
  },
  {
    items: [
      { icon: Scissors, label: 'SVG Refinery' },
      { icon: Clock3, label: 'Cron Builder' },
      { icon: Binary, label: 'Base64 Studio' },
      { icon: ShieldCheck, label: 'Password & UUID Vault' },
    ],
  },
] as const

export function WorkbenchSidebar() {
  return (
    <aside className="pointer-events-none fixed left-3 top-4 z-30 hidden max-h-[calc(100dvh-2rem)] overflow-y-auto pr-2 lg:block">
      <div className="mb-4 flex items-center gap-2">
        <button
          type="button"
          className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-muted shadow-[0_1px_0_rgba(9,9,11,0.12)] transition-colors hover:bg-muted/80"
          aria-label="Link Mode"
        >
          <Link2 className="size-3.5" />
        </button>
        <button
          type="button"
          className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-card shadow-[0_1px_0_rgba(9,9,11,0.12)] transition-colors hover:bg-muted"
          aria-label="Undo"
        >
          <Undo2 className="size-3.5" />
        </button>
        <button
          type="button"
          className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-card shadow-[0_1px_0_rgba(9,9,11,0.12)] transition-colors hover:bg-muted"
          aria-label="Redo"
        >
          <Redo2 className="size-3.5" />
        </button>
      </div>

      <div className="space-y-4">
        {sidebarSections.map((section) => (
          <section key={section.items[0]?.label} className="space-y-1.5">
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.label}>
                  <a
                    href="#"
                    className="pointer-events-auto inline-flex items-center gap-2 rounded-sm border border-border bg-card px-2 py-1.5 text-[11px] uppercase tracking-[0.14em] text-sidebar-foreground shadow-[0_2px_6px_rgba(9,9,11,0.08)] transition-colors hover:bg-sidebar-accent"
                  >
                    <item.icon className="size-3.5 shrink-0 text-muted-foreground" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  )
}
