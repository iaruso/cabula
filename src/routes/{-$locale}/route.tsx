import { useEffect } from 'react'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { AppShell } from '@/components/app-shell'
import { defaultLocale, isLocale, parseLocale } from '@/i18n/config'

export const Route = createFileRoute('/{-$locale}')({
  beforeLoad: ({ params, location }) => {
    if (!params.locale || !isLocale(params.locale)) {
      throw redirect({
        to: '/{-$locale}/',
        params: { locale: defaultLocale },
        search: location.search,
        hash: location.hash,
        replace: true,
      })
    }
  },
  component: LocaleLayout,
})

function LocaleLayout() {
  const locale = parseLocale(Route.useParams().locale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return <AppShell locale={locale} />
}
