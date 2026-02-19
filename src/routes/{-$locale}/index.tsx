import { createFileRoute } from '@tanstack/react-router'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { parseLocale } from '@/i18n/config'
import { dictionaries } from '@/i18n/dictionaries'
import { cn } from '@/lib/utils'

type Feature = {
  id: string
  title: string
  summary: string
  section: string
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

export const Route = createFileRoute('/{-$locale}/')({
  component: SpatialWorkbenchPage,
})

function SpatialWorkbenchPage() {
  const locale = parseLocale(Route.useParams().locale)
  const copy = dictionaries[locale]

  return (
    <section className="wireframe-grid min-h-dvh px-4 pb-12 pt-20 lg:pl-[24rem] lg:pr-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
        <header className="border border-border bg-card p-4">
          <p className="section-label text-foreground/75">
            {copy.appName} / {copy.productName}
          </p>
          <h1 className="mt-3 text-[15px] font-semibold uppercase tracking-[0.16em] text-foreground">
            {copy.workspaceTitle}
          </h1>
          <p className="mt-3 max-w-3xl text-[12px] leading-relaxed text-muted-foreground">
            {copy.workspaceDescription}
          </p>
        </header>

        <section className="border border-border bg-card">
          <div className="border-b border-border bg-muted px-4 py-2">
            <p className="section-label">{copy.modulePanelTitle}</p>
          </div>

          <Accordion type="single" collapsible defaultValue={featureCatalog[0]?.id}>
            {featureCatalog.map((feature, index) => (
              <AccordionItem
                key={feature.id}
                value={feature.id}
                className="last:border-b-0"
              >
                <AccordionTrigger className="px-4">
                  <span className="inline-flex items-center gap-3">
                    <span className="text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span>{feature.title}</span>
                  </span>
                </AccordionTrigger>

                <AccordionContent className="px-4 pb-4">
                  <p className="text-[12px] leading-relaxed text-muted-foreground">
                    {feature.summary}
                  </p>
                  <p
                    className={cn(
                      'section-label mt-3',
                      'text-foreground/70 dark:text-foreground/80',
                    )}
                  >
                    {feature.section}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <div className="grid gap-3 md:grid-cols-2">
          <article className="border border-border bg-card p-4">
            <p className="section-label">{copy.localePanelTitle}</p>
            <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
              {copy.localePanelDescription}
            </p>
          </article>

          <article className="border border-border bg-card p-4">
            <p className="section-label">{copy.modulePanelTitle}</p>
            <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
              {copy.modulePanelDescription}
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
