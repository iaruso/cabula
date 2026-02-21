import * as React from 'react'

const THEME_STORAGE_KEY = 'cabula-theme'

export type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
)

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark'
}

function getSystemTheme(): Theme {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }

  return 'light'
}

function applyThemeToDocument(theme: Theme) {
  if (typeof document === 'undefined') {
    return
  }

  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.dataset.theme = theme
  root.style.colorScheme = theme
}

function readThemeFromDocument(): Theme | null {
  if (typeof document === 'undefined') {
    return null
  }

  const theme = document.documentElement.dataset.theme
  return isTheme(theme) ? theme : null
}

function resolveStoredTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (isTheme(storedTheme)) {
    return storedTheme
  }

  return getSystemTheme()
}

export const themeScript = `
(function () {
  try {
    var key = '${THEME_STORAGE_KEY}';
    var root = document.documentElement;
    var stored = localStorage.getItem(key);
    var hasStored = stored === 'light' || stored === 'dark';
    var theme = hasStored
      ? stored
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

    root.classList.toggle('dark', theme === 'dark');
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  } catch (_) {}
})();`

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    return readThemeFromDocument() ?? 'light'
  })

  React.useEffect(() => {
    const initialTheme = readThemeFromDocument() ?? resolveStoredTheme()
    setThemeState(initialTheme)
    applyThemeToDocument(initialTheme)
  }, [])

  const setTheme = React.useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)
    applyThemeToDocument(nextTheme)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    }
  }, [])

  const toggleTheme = React.useCallback(() => {
    setThemeState((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
      applyThemeToDocument(nextTheme)

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
      }

      return nextTheme
    })
  }, [])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }

  return context
}
