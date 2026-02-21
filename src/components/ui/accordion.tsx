import * as React from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

type AccordionType = 'single' | 'multiple'

type AccordionContextValue = {
  type: AccordionType
  collapsible: boolean
  openValues: Array<string>
  toggleItem: (value: string) => void
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

type AccordionItemContextValue = {
  value: string
  contentId: string
  triggerId: string
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(
  null,
)

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: AccordionType
  collapsible?: boolean
  defaultValue?: string | Array<string>
}

type AccordionItemProps = React.HTMLAttributes<HTMLDivElement> & {
  value: string
}

function useAccordionContext() {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion components must be used within <Accordion />')
  }

  return context
}

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext)
  if (!context) {
    throw new Error(
      'AccordionTrigger and AccordionContent must be used within <AccordionItem />',
    )
  }

  return context
}

export function Accordion({
  type = 'single',
  collapsible = false,
  defaultValue,
  className,
  children,
  ...props
}: AccordionProps) {
  const [openValues, setOpenValues] = React.useState<Array<string>>(() => {
    if (!defaultValue) {
      return []
    }

    return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
  })

  const toggleItem = React.useCallback(
    (value: string) => {
      setOpenValues((currentValues) => {
        const isOpen = currentValues.includes(value)

        if (type === 'multiple') {
          if (isOpen) {
            return currentValues.filter((item) => item !== value)
          }

          return [...currentValues, value]
        }

        if (isOpen) {
          return collapsible ? [] : currentValues
        }

        return [value]
      })
    },
    [collapsible, type],
  )

  return (
    <AccordionContext.Provider
      value={{ type, collapsible, openValues, toggleItem }}
    >
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({
  value,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const { openValues } = useAccordionContext()
  const isOpen = openValues.includes(value)
  const contentId = React.useId()
  const triggerId = React.useId()

  return (
    <AccordionItemContext.Provider value={{ value, contentId, triggerId }}>
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className={cn('border-b border-border', className)}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { openValues, toggleItem } = useAccordionContext()
  const { value, contentId, triggerId } = useAccordionItemContext()
  const isOpen = openValues.includes(value)

  return (
    <h3 className="m-0">
      <button
        ref={ref}
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        data-state={isOpen ? 'open' : 'closed'}
        onClick={() => toggleItem(value)}
        className={cn(
          'flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium transition-all hover:underline',
          className,
        )}
        {...props}
      >
        <span>{children}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn('size-4 transition-transform', isOpen && 'rotate-180')}
        />
      </button>
    </h3>
  )
})

AccordionTrigger.displayName = 'AccordionTrigger'

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { openValues } = useAccordionContext()
  const { value, contentId, triggerId } = useAccordionItemContext()
  const isOpen = openValues.includes(value)

  return (
    <div
      ref={ref}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      data-state={isOpen ? 'open' : 'closed'}
      hidden={!isOpen}
      className={cn('overflow-hidden text-sm', className)}
      {...props}
    >
      {children}
    </div>
  )
})

AccordionContent.displayName = 'AccordionContent'
