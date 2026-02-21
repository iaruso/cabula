import { createFileRoute } from '@tanstack/react-router'

import { parseLocale } from '@/i18n/config'
import { dictionaries } from '@/i18n/dictionaries'

export const Route = createFileRoute('/{-$locale}/')({
  component: SpatialWorkbenchPage,
})

function SpatialWorkbenchPage() {
  const locale = parseLocale(Route.useParams().locale)
  const copy = dictionaries[locale]

  return (
    <section className="pb-10">
      <div className="grid w-full gap-4">
        <article className="rounded-lg border border-border bg-card p-6">
          <h1 className="text-2xl font-semibold text-card-foreground">
            {copy.workspaceTitle}
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {copy.workspaceDescription}
          </p>
        </article>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-border bg-card p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {copy.localePanelTitle}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {copy.localePanelDescription}
            </p>
          </article>

          <article className="rounded-lg border border-border bg-card p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {copy.modulePanelTitle}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {copy.modulePanelDescription}
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
