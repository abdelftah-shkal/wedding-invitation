import { useEffect, useRef } from "react"

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let active = true
    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = []
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.1 - 0.02,
        r: Math.random() * 1.8 + 0.6,
        o: Math.random() * 0.2 + 0.08,
      })
    }

    function resize() {
      w = canvas!.width = window.innerWidth
      h = canvas!.height = window.innerHeight
    }
    window.addEventListener("resize", resize)

    function draw() {
      if (!active) return
      ctx!.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w }
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(212, 175, 55, ${p.o})`
        ctx!.fill()
      }
      requestAnimationFrame(draw)
    }
    requestAnimationFrame(draw)

    return () => {
      active = false
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-10 pointer-events-none" />
}
