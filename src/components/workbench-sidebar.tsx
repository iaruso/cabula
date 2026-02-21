import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

type Feature = {
  id: string
  title: string
  summary: string
  section: string
}

type ToolSection = {
  id: string
  title: string
  items: ReadonlyArray<Feature>
}

const featureCatalog: ReadonlyArray<Feature> = [
  {
    id: 'shadow-shape-orchestrator',
    title: 'Shadow & Shape Orchestrator',
    summary: 'Tune elevation presets, border hardness, and silhouette controls.',
    section: 'Design Utilities',
  },
  {
    id: 'layout-lab',
    title: 'Layout Lab',
    summary: 'Draft responsive area maps before committing to final layout rules.',
    section: 'Design Utilities',
  },
  {
    id: 'gradient-architect',
    title: 'Gradient Architect',
    summary: 'Build directional and radial gradients with quick stop management.',
    section: 'Design Utilities',
  },
  {
    id: 'theming-engine-color-mixer',
    title: 'Theming Engine & Color Mixer',
    summary: 'Manage shared tokens and verify brand color combinations quickly.',
    section: 'Design Utilities',
  },
  {
    id: 'tailwind-translator',
    title: 'Tailwind Translator',
    summary: 'Convert visual requirements into utility-first class recipes.',
    section: 'Design Utilities',
  },
  {
    id: 'unit-converter',
    title: 'Unit Converter',
    summary: 'Translate px, rem, em, and viewport values while preserving scale.',
    section: 'Design Utilities',
  },
  {
    id: 'event-listener-debugger',
    title: 'Event Listener Debugger',
    summary: 'Inspect listener registration, lifecycle cleanup, and event flow.',
    section: 'Frontend Debugging',
  },
  {
    id: 'url-architect',
    title: 'URL Architect',
    summary: 'Assemble and validate routes, query parameters, and hash states.',
    section: 'Frontend Debugging',
  },
  {
    id: 'array-transformer',
    title: 'Array Transformer',
    summary: 'Chain map/filter/reduce operations and preview transformed output.',
    section: 'Frontend Debugging',
  },
  {
    id: 'coordinate-studio',
    title: 'Coordinate Studio',
    summary: 'Inspect coordinate sets for geospatial precision and consistency.',
    section: 'Geospatial',
  },
  {
    id: 'geojson-integrity',
    title: 'GeoJSON Integrity',
    summary: 'Validate feature collections and catch malformed geometries.',
    section: 'Geospatial',
  },
  {
    id: 'coordinate-converter',
    title: 'Coordinate Converter',
    summary: 'Transform coordinates between common spatial reference systems.',
    section: 'Geospatial',
  },
  {
    id: 'json-forge',
    title: 'JSON Forge',
    summary: 'Format, normalize, and inspect JSON structures for clean payloads.',
    section: 'Data Tooling',
  },
  {
    id: 'sql-blueprint',
    title: 'SQL Blueprint',
    summary: 'Shape query scaffolds with clear filtering and joins.',
    section: 'Data Tooling',
  },
  {
    id: 'mock-data-factory',
    title: 'Mock Data Factory',
    summary: 'Generate deterministic sample datasets for local experiments.',
    section: 'Data Tooling',
  },
  {
    id: 'regex-lab',
    title: 'Regex Lab',
    summary: 'Test expressions against real samples and inspect match groups.',
    section: 'Data Tooling',
  },
  {
    id: 'jwt-inspector',
    title: 'JWT Inspector',
    summary: 'Decode token headers and claims for quick authentication checks.',
    section: 'Data Tooling',
  },
  {
    id: 'svg-refinery',
    title: 'SVG Refinery',
    summary: 'Optimize vector markup and clean non-essential SVG attributes.',
    section: 'Utilities',
  },
  {
    id: 'cron-builder',
    title: 'Cron Builder',
    summary: 'Compose cron expressions with readable schedule intent.',
    section: 'Utilities',
  },
  {
    id: 'base64-studio',
    title: 'Base64 Studio',
    summary: 'Encode and decode text or payload fragments safely.',
    section: 'Utilities',
  },
  {
    id: 'password-uuid-vault',
    title: 'Password & UUID Vault',
    summary: 'Generate secure strings and UUID sets with control over format.',
    section: 'Utilities',
  },
]

const toolSections = featureCatalog.reduce<Array<ToolSection>>((sections, feature) => {
  const existingSection = sections.find(
    (section) => section.title === feature.section,
  )

  if (existingSection) {
    return sections.map((section) =>
      section.title === feature.section
        ? { ...section, items: [...section.items, feature] }
        : section,
    )
  }

  return [
    ...sections,
    {
      id: feature.section.toLowerCase().replace(/\s+/g, '-'),
      title: feature.section,
      items: [feature],
    },
  ]
}, [])

type WorkbenchSidebarProps = {
  className?: string
}

export function WorkbenchSidebar({ className }: WorkbenchSidebarProps) {
  return (
    <aside className={cn('min-w-0 lg:w-64 lg:shrink-0', className)}>
      <div className="rounded-lg border border-border bg-popover shadow-sm lg:sticky lg:top-20">
        <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto p-2">
          <Accordion
            type="multiple"
            defaultValue={toolSections.map((section) => section.id)}
          >
            {toolSections.map((section) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="border-0 px-1 pb-1"
              >
                <AccordionTrigger className="px-2 py-2 text-base font-semibold hover:no-underline">
                  {section.title}
                </AccordionTrigger>

                <AccordionContent className="pb-0 pt-1">
                  <ul className="ml-3 space-y-1 border-l border-border pl-3">
                    {section.items.map((feature, index) => (
                      <li key={feature.id}>
                        <button
                          type="button"
                          title={feature.summary}
                          className={cn(
                            'w-full rounded-md px-2 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                            section.id === toolSections[0]?.id &&
                              index === 0 &&
                              'bg-muted text-foreground',
                          )}
                        >
                          {feature.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </aside>
  )
}
