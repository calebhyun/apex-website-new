"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

interface ParticlesBackgroundProps {
  className?: string
}

export default function ParticlesBackground({ className }: ParticlesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This function will be called once particles.js is loaded
    const initParticles = () => {
      if (typeof window !== "undefined" && window.particlesJS && containerRef.current) {
        window.particlesJS("particles-js", {
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#ffffff",
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#000000",
              },
              polygon: {
                nb_sides: 5,
              },
            },
            opacity: {
              value: 0.5,
              random: false,
              anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 6,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true,
                mode: "repulse", // Particles move away from cursor
              },
              onclick: {
                enable: true,
                mode: "push", // Add particles on click
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1,
                },
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: {
                distance: 150, // Increased from 200 for more noticeable effect
                duration: 0.4,
              },
              push: {
                particles_nb: 6, // Increased from 4 for more noticeable effect
              },
              remove: {
                particles_nb: 2,
              },
            },
          },
          retina_detect: true,
        })
      }
    }

    // If particles.js is already loaded, initialize it
    if (typeof window !== "undefined" && window.particlesJS) {
      initParticles()
    }

    return () => {
      // Clean up particles.js when component unmounts
      if (typeof window !== "undefined" && window.pJSDom) {
        window.pJSDom.forEach((dom) => dom.pJS.fn.vendors.destroypJS())
        window.pJSDom = []
      }
    }
  }, [])

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
        onLoad={() => {
          if (typeof window !== "undefined" && window.particlesJS) {
            setTimeout(() => {
              // Small timeout to ensure DOM is ready
              if (containerRef.current) {
                window.particlesJS &&
                  window.particlesJS("particles-js", {
                    particles: {
                      number: {
                        value: 80,
                        density: {
                          enable: true,
                          value_area: 800,
                        },
                      },
                      color: {
                        value: "#ffffff",
                      },
                      shape: {
                        type: "circle",
                        stroke: {
                          width: 0,
                          color: "#000000",
                        },
                      },
                      opacity: {
                        value: 0.5,
                        random: false,
                      },
                      size: {
                        value: 3,
                        random: true,
                      },
                      line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1,
                      },
                      move: {
                        enable: true,
                        speed: 6,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                          enable: false,
                          rotateX: 600,
                          rotateY: 1200,
                        },
                      },
                    },
                    interactivity: {
                      detect_on: "canvas", // Detect mouse interactions on the canvas
                      events: {
                        onhover: {
                          enable: true,
                          mode: "repulse", // Particles will move away from cursor on hover
                        },
                        onclick: {
                          enable: true,
                          mode: "push", // Add new particles on click
                        },
                        resize: true,
                      },
                      modes: {
                        repulse: {
                          distance: 150, // How far particles move away from cursor (pixels)
                          duration: 0.4, // Duration of the repulse effect
                        },
                        push: {
                          particles_nb: 6, // Number of particles to add on click
                        },
                        grab: {
                          distance: 400,
                          line_linked: {
                            opacity: 1,
                          },
                        },
                        bubble: {
                          distance: 400,
                          size: 40,
                          duration: 2,
                          opacity: 8,
                          speed: 3,
                        },
                        remove: {
                          particles_nb: 2,
                        },
                      },
                    },
                    retina_detect: true,
                  })
              }
            }, 100)
          }
        }}
      />
      <div
        id="particles-js"
        ref={containerRef}
        className={`absolute inset-0 -z-10 bg-apex-red ${className || ""}`}
      ></div>
    </>
  )
}