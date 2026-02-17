import { useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Background,
  BackgroundVariant,
  type Edge,
  type Node,
  Panel,
  ReactFlow,
  type ReactFlowInstance,
  useReactFlow,
  useViewport,
} from '@xyflow/react'
import { Minus, Plus } from 'lucide-react'

import { cn } from '@/lib/utils'
import { parseLocale } from '@/i18n/config'
import { dictionaries } from '@/i18n/dictionaries'

import '@xyflow/react/dist/style.css'

export const Route = createFileRoute('/{-$locale}/')({
  component: SpatialWorkbenchPage,
})

function SpatialWorkbenchPage() {
  const locale = parseLocale(Route.useParams().locale)
  const copy = dictionaries[locale]
  const nodes = useMemo<Node[]>(() => {
    return [
      {
        id: 'entry',
        position: { x: 430, y: 70 },
        data: {
          label: (
            <WorkbenchNode
              title={copy.workspaceTitle}
              body={copy.workspaceDescription}
            />
          ),
        },
        style: wireNodeStyle,
      },
      {
        id: 'locale',
        position: { x: 200, y: 300 },
        data: {
          label: (
            <WorkbenchNode
              title={copy.localePanelTitle}
              body={copy.localePanelDescription}
              active
            />
          ),
        },
        style: wireNodeStyle,
      },
      {
        id: 'modules',
        position: { x: 700, y: 300 },
        data: {
          label: (
            <WorkbenchNode
              title={copy.modulePanelTitle}
              body={copy.modulePanelDescription}
            />
          ),
        },
        style: wireNodeStyle,
      },
    ]
  }, [copy])

  const edges = useMemo<Edge[]>(() => {
    return [
      {
        id: 'entry-locale',
        source: 'entry',
        target: 'locale',
        style: wireEdgeStyle,
      },
      {
        id: 'entry-modules',
        source: 'entry',
        target: 'modules',
        style: wireEdgeStyle,
      },
    ]
  }, [])

  return (
    <section className="h-dvh">
      <ReactFlow
        fitView
        minZoom={0.3}
        maxZoom={2}
        nodes={nodes}
        edges={edges}
        className="bg-background"
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{
          selectable: false,
          style: wireEdgeStyle,
        }}
      >
        <Panel position="top-center">
          <div className="border border-border bg-card px-3 py-1 text-[11px] uppercase tracking-[0.2em]">
            {copy.appName} / {copy.productName}
          </div>
        </Panel>
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          color="var(--grid-dot)"
        />
        <ZoomPanel />
      </ReactFlow>
    </section>
  )
}

function ZoomPanel() {
  const { zoom } = useViewport()
  const flow = useReactFlow()

  return (
    <Panel position="bottom-right" className="m-4">
      <div className="inline-flex items-center border border-border bg-card">
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center transition-colors hover:bg-muted"
          aria-label="Zoom out"
          onClick={() => updateZoom(flow, -0.1)}
        >
          <Minus className="size-4" />
        </button>
        <div className="min-w-14 border-x border-border px-2 py-1 text-center text-[12px] text-muted-foreground">
          {Math.round(zoom * 100)}%
        </div>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center transition-colors hover:bg-muted"
          aria-label="Zoom in"
          onClick={() => updateZoom(flow, 0.1)}
        >
          <Plus className="size-4" />
        </button>
      </div>
    </Panel>
  )
}

function updateZoom(flow: ReactFlowInstance, delta: number) {
  const viewport = flow.getViewport()
  const nextZoom = clampZoom(viewport.zoom + delta)

  flow.setViewport(
    {
      ...viewport,
      zoom: nextZoom,
    },
    {
      duration: 120,
    },
  )
}

function clampZoom(zoom: number) {
  return Math.max(0.3, Math.min(2, Number(zoom.toFixed(2))))
}

function WorkbenchNode({
  title,
  body,
  active,
}: {
  title: string
  body: string
  active?: boolean
}) {
  return (
    <div className="w-[280px]">
      <div
        className={cn(
          'border-b border-border bg-muted px-2 py-1 text-[10px] uppercase tracking-[0.18em]',
          active && 'bg-foreground text-background',
        )}
      >
        {title}
      </div>
      <p className="px-2 py-2 text-[11px] leading-relaxed text-foreground">
        {body}
      </p>
    </div>
  )
}

const wireNodeStyle = {
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: '0',
  boxShadow: 'none',
  color: 'var(--foreground)',
  padding: '0',
}

const wireEdgeStyle = {
  stroke: 'var(--muted-foreground)',
  strokeWidth: 1,
}
