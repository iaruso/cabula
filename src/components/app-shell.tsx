import { useState } from 'react'
import { Link, Outlet } from '@tanstack/react-router'
import { Columns3, StretchHorizontal } from 'lucide-react'
import type { Locale } from '@/i18n/config'

import { ThemeToggle } from '@/components/theme-toggle'
import { WorkbenchSidebar } from '@/components/workbench-sidebar'
import { locales } from '@/i18n/config'
import { dictionaries } from '@/i18n/dictionaries'
import { cn } from '@/lib/utils'

type AppShellProps = {
  locale: Locale
}

export function AppShell({ locale }: AppShellProps) {
  const copy = dictionaries[locale]
  const [isConstrainedLayout, setIsConstrainedLayout] = useState(true)

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div
          className={cn(
            'flex items-center justify-between gap-3 px-4 py-3 lg:px-8',
            isConstrainedLayout && 'mx-auto max-w-[1200px]',
          )}
        >
          <div className="flex items-center rounded-xl border border-border bg-background p-1 shadow-sm">
            <button
              type="button"
              aria-label={
                isConstrainedLayout
                  ? 'Switch to full-width layout'
                  : 'Switch to centered 12-column layout'
              }
              onClick={() => setIsConstrainedLayout((current) => !current)}
              className={cn(
                'inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors',
                isConstrainedLayout
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )}
            >
              {isConstrainedLayout ? (
                <Columns3 aria-hidden="true" className="size-4" />
              ) : (
                <StretchHorizontal aria-hidden="true" className="size-4" />
              )}
            </button>

            <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
            <ThemeToggle className="h-9 w-9 border-0 bg-transparent hover:bg-accent" />
          </div>

          <div className="inline-flex items-center gap-1 rounded-xl border border-border bg-background p-1 shadow-sm">
            {locales.map((option) => (
              <Link
                key={option}
                to="/{-$locale}/"
                params={{ locale: option }}
                className={cn(
                  'rounded-md px-2.5 py-1 text-xs font-medium uppercase tracking-wide transition-colors',
                  option === locale
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
              >
                {option}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className="px-4 py-6 lg:px-8">
        <div
          className={cn(
            isConstrainedLayout && 'mx-auto max-w-[1200px]',
            'space-y-4',
          )}
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {copy.productName}
          </p>

          <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
            <WorkbenchSidebar />
            <div className="min-w-0">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
