import { Link, Outlet } from '@tanstack/react-router'

import { ThemeToggle } from '@/components/theme-toggle'
import { WorkbenchSidebar } from '@/components/workbench-sidebar'
import { type Locale, locales } from '@/i18n/config'
import { dictionaries } from '@/i18n/dictionaries'
import { cn } from '@/lib/utils'

type AppShellProps = {
  locale: Locale
}

export function AppShell({ locale }: AppShellProps) {
  const copy = dictionaries[locale]

  return (
    <div className="min-h-dvh bg-background text-foreground">

      <div className="pointer-events-none fixed right-3 top-4 z-30 hidden items-center gap-2 lg:flex">
        <p className="section-label pr-1 text-foreground/70">
          {copy.productName}
        </p>
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="inline-flex items-center gap-1 border border-border bg-card p-1">
            {locales.map((option) => (
              <Link
                key={option}
                // @ts-ignore
                to="/{$locale}/"
                // @ts-ignore
                params={{ locale: option }}
                className={cn(
                  'px-2 py-1 text-[11px] uppercase tracking-[0.2em] transition-colors',
                  option === locale
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {option}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>

      <main className="relative min-h-dvh overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}
