"use client"

import { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Mouse position tracking
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 150,
    }

    window.addEventListener("mousemove", (event) => {
      mouse.x = event.x
      mouse.y = event.y
    })

    window.addEventListener("mouseout", () => {
      mouse.x = null
      mouse.y = null
    })

    // Touch support for mobile
    window.addEventListener("touchmove", (event) => {
      if (event.touches[0]) {
        mouse.x = event.touches[0].clientX
        mouse.y = event.touches[0].clientY
      }
    })

    window.addEventListener("touchend", () => {
      mouse.x = null
      mouse.y = null
    })

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      baseX: number
      baseY: number
      density: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.baseX = this.x
        this.baseY = this.y
        this.size = Math.random() * 3 + 1
        this.density = Math.random() * 30 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = "#FFFFFF"
      }

      update() {
        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const maxDistance = mouse.radius
          const force = (maxDistance - distance) / maxDistance

          if (distance < mouse.radius) {
            // Push particles away from cursor
            this.x -= forceDirectionX * force * this.density
            this.y -= forceDirectionY * force * this.density
          } else {
            // Return to original position if not under mouse influence
            if (this.x !== this.baseX) {
              const dx = this.x - this.baseX
              this.x -= dx / 10
            }
            if (this.y !== this.baseY) {
              const dy = this.y - this.baseY
              this.y -= dy / 10
            }
          }
        } else {
          // Normal movement when mouse is not on screen
          this.x += this.speedX
          this.y += this.speedY

          if (this.x > canvas.width) this.x = 0
          else if (this.x < 0) this.x = canvas.width

          if (this.y > canvas.height) this.y = 0
          else if (this.y < 0) this.y = canvas.height
        }
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(150, Math.floor(window.innerWidth / 15))

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }

    // Connect particles with lines
    function connect() {
      const maxDistance = 180

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            // Create more visible connections
            const opacity = 1 - distance / maxDistance
            const lineWidth = Math.max(0.5, 2 * (1 - distance / maxDistance))

            ctx.strokeStyle = `rgba(228, 0, 43, ${opacity * 0.8})`
            ctx.lineWidth = lineWidth
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      connect()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", (event) => {
        mouse.x = event.x
        mouse.y = event.y
      })
      window.removeEventListener("mouseout", () => {
        mouse.x = null
        mouse.y = null
      })
      window.removeEventListener("touchmove", (event) => {
        if (event.touches[0]) {
          mouse.x = event.touches[0].clientX
          mouse.y = event.touches[0].clientY
        }
      })
      window.removeEventListener("touchend", () => {
        mouse.x = null
        mouse.y = null
      })
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10 bg-apex-red" />
}