import * as React from 'react'

import { cn } from '@/lib/utils'

type SwitchProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange'
> & {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, className, onCheckedChange, onClick, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        data-state={checked ? 'checked' : 'unchecked'}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) {
            onCheckedChange?.(!checked)
          }
        }}
        className={cn(
          'inline-flex h-5 w-10 items-center border border-border bg-background p-[2px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
          checked && 'bg-foreground',
          className,
        )}
      >
        <span
          className={cn(
            'h-3 w-3 bg-foreground transition-transform',
            checked ? 'translate-x-[20px] bg-background' : 'translate-x-0',
          )}
        />
      </button>
    )
  },
)

Switch.displayName = 'Switch'
