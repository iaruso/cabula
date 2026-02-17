import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/components/theme-provider'
import { Switch } from '@/components/ui/switch'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className="inline-flex items-center gap-2 border border-border bg-card px-2 py-1">
      <Sun aria-hidden="true" className="size-3.5" />
      <Switch
        aria-label="Toggle dark mode"
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
      />
      <Moon aria-hidden="true" className="size-3.5" />
    </div>
  )
}
