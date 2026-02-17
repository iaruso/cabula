import type { Locale } from '@/i18n/config'

type Dictionary = {
  appName: string
  productName: string
  workspaceTitle: string
  workspaceDescription: string
  localePanelTitle: string
  localePanelDescription: string
  modulePanelTitle: string
  modulePanelDescription: string
}

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    appName: 'CABU.LA',
    productName: 'SPATIAL WORKBENCH',
    workspaceTitle: 'WORKSPACE SURFACE',
    workspaceDescription:
      'Industrial shell online. Select a utility module from the left rail to open the first implementation pass.',
    localePanelTitle: 'I18N ROUTING',
    localePanelDescription:
      'Locale state is URL-driven through `/{-$locale}` with `en` and `pt` boilerplate enabled.',
    modulePanelTitle: 'MODULE STAGING',
    modulePanelDescription:
      'Tool pages are staged as static entries now and ready for progressive route wiring in the next step.',
  },
  pt: {
    appName: 'CABU.LA',
    productName: 'BANCADA ESPACIAL',
    workspaceTitle: 'SUPERFICIE DE TRABALHO',
    workspaceDescription:
      'Casca industrial ativa. Selecione um modulo no painel esquerdo para abrir a primeira versao de cada utilitario.',
    localePanelTitle: 'ROTEAMENTO I18N',
    localePanelDescription:
      'O estado de idioma e controlado pela URL via `/{-$locale}` com suporte inicial para `en` e `pt`.',
    modulePanelTitle: 'PREPARO DE MODULOS',
    modulePanelDescription:
      'As paginas das ferramentas estao como entradas estaticas e prontas para evolucao de rotas.',
  },
}
