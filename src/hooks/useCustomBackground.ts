import { useEffect } from 'react'

export function useCustomBackground(selector = '#custom-bg') {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(selector)
    if (!el) return

    let x = 0.5
    let y = 0.5
    let tx = 0.5
    let ty = 0.5
    let raf = 0

    const tick = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12

      el.style.setProperty('--mx', x * 100 + '%')
      el.style.setProperty('--my', y * 100 + '%')

      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      tx = (e.clientX - r.left) / r.width
      ty = (e.clientY - r.top) / r.height

      if (tx < 0) tx = 0
      if (tx > 1) tx = 1
      if (ty < 0) ty = 0
      if (ty > 1) ty = 1

      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onLeave = () => {
      tx = 0.5
      ty = 0.5
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }
  }, [selector])
}
