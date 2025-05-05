"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Building, GraduationCap, Users } from "lucide-react"

export default function ScrollSection() {
  // Stats data
  const stats = [
    { icon: Users, value: "100+", label: "Consultants Trained" },
    { icon: Building, value: "50+", label: "Client Projects" },
    { icon: GraduationCap, value: "200+", label: "Alumni Network" },
    { icon: BarChart3, value: "95%", label: "Placement Rate" },
  ]

  // Welcome section with fade-in animation
  const [welcomeRef, welcomeInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })

  // Video section with fade-in animation
  const [videoRef, videoInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })

  // Stats section with counter animation
  const [statsRef, statsInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })

  // President's Welcome section with fade-in animation
  const [presidentRef, presidentInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  // Animation for counting up stats
  const [countedStats, setCountedStats] = useState(stats.map(() => 0))
  const statsAnimationRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (statsInView) {
      // Clear any existing animation
      if (statsAnimationRef.current) {
        clearTimeout(statsAnimationRef.current)
      }

      // Animate the stats counting up
      const targetValues = stats.map((stat) => Number.parseInt(stat.value.replace(/\D/g, "")))
      const duration = 2000 // 2 seconds
      const steps = 30
      const interval = duration / steps

      let step = 0
      const animate = () => {
        step++
        const progress = Math.min(step / steps, 1)

        setCountedStats(targetValues.map((target) => Math.floor(target * progress)))

        if (step < steps) {
          statsAnimationRef.current = setTimeout(animate, interval)
        }
      }

      animate()
    } else {
      // Reset stats when out of view
      setCountedStats(stats.map(() => 0))
    }

    return () => {
      if (statsAnimationRef.current) {
        clearTimeout(statsAnimationRef.current)
      }
    }
  }, [statsInView])

  return (
    <div className="relative bg-white dark:bg-gray-900">
      {/* Welcome to APEX Section */}
      <section
        ref={welcomeRef}
        className={cn(
          "py-20 md:py-32 transition-all duration-1000 transform",
          welcomeInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
        )}
      >
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-apex-red to-red-700 bg-clip-text text-transparent">
              Welcome to APEX
            </h2>
            <div className="h-1 w-20 bg-apex-red mx-auto"></div>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              APEX Consulting Group is a pro-bono student-led consulting organization at the University of Michigan.
              With 50 current members hailing from diverse academic and personal backgrounds and 100+ alumni strong,
              APEX has served over 130 local businesses, innovative startups, and industry leaders all around the
              country through semester-long projects, providing clients with data-driven, strategic, and growth-oriented
              recommendations and impact.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Along with these projects, APEX aids members in securing the professional and personal development they
              need to succeed in any field or industry through hands-on experience, mentorship, and consulting treks,
              all while being surrounded by an empathetic, family-like community.
            </p>
          </div>
        </div>
      </section>

      {/* Hype Video Section */}
      <section
        ref={videoRef}
        className={cn(
          "py-20 md:py-32 bg-gray-50 dark:bg-gray-800 transition-all duration-1000 transform",
          videoInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
        )}
      >
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">See APEX in Action</h2>
            <div className="h-1 w-20 bg-apex-red mx-auto"></div>
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden shadow-xl">
              {/* Replace with actual video embed */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-apex-red rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                  <p className="text-muted-foreground">APEX Hype Video</p>
                  <p className="text-sm text-muted-foreground">Click to play</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section
        ref={statsRef}
        className={cn(
          "py-20 md:py-32 transition-all duration-1000 transform",
          statsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
        )}
      >
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Our Impact</h2>
              <div className="h-1 w-20 bg-apex-red mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="border-none shadow-lg overflow-hidden group hover:shadow-xl transition-all"
                >
                  <CardContent className="p-6 text-center relative z-10 group-hover:bg-apex-red group-hover:text-white transition-colors duration-300">
                    <stat.icon className="h-8 w-8 mx-auto mb-2 text-apex-red group-hover:text-white transition-colors duration-300" />
                    <div className="text-3xl font-bold">
                      {statsInView ? (
                        <>
                          {countedStats[index]}
                          {stat.value.includes("+") && "+"}
                        </>
                      ) : (
                        "0"
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground group-hover:text-white/90 transition-colors duration-300">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* President's Welcome Section - Integrated with scroll animation */}
      <section
        ref={presidentRef}
        className={cn(
          "relative py-12 md:py-24 bg-gray-50 dark:bg-gray-800 transition-all duration-1000 transform",
          presidentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
        )}
      >
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">President&apos;s Welcome</h2>
              <div className="mt-2 h-1 w-20 bg-apex-red mx-auto"></div>
            </div>

            <Card className="border-none shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-[2fr_1fr]">
                  <div className="p-6 md:p-10 space-y-6">
                    <div className="text-lg font-medium text-apex-red">Hello Everyone, and Welcome!</div>

                    <p className="text-muted-foreground">
                      On behalf of APEX Consulting Group, thank you for taking the time to learn more about who we are
                      and what we do. APEX is more than just an undergraduate consulting organization at the University
                      of Michigan–it&apos;s a vibrant community of over 50 diverse members who come together to grow
                      professionally and personally.
                    </p>

                    <div className="relative pl-4 border-l-4 border-apex-red py-2 italic">
                      <p className="text-muted-foreground">
                        For me, APEX has been one of the most rewarding aspects of my college experience. I still
                        remember walking into my first APEX event as a nervous sophomore, overwhelmed by the chaos of
                        recruiting season. Yet, from the very first interaction, I felt at home.
                      </p>
                    </div>

                    <p className="text-muted-foreground">
                      The genuine support, kindness, and encouragement I received from members made all the difference.
                      Whether I needed guidance on navigating my career, someone to laugh with after a long day, or just
                      a group to study with during finals, APEX was always there, turning every challenge into an
                      opportunity to grow together.
                    </p>

                    <p className="text-muted-foreground">
                      The professional development I&apos;ve gained through APEX is unparalleled. When I first joined, I
                      knew very little about consulting, but the incredible people here were always willing to help.
                      Whether it was teaching me the fundamentals of consulting at 2 AM, explaining what different firms
                      look for, or casing with me tirelessly during my summer recruiting, they never hesitated to share
                      their time and knowledge.
                    </p>

                    <p className="text-muted-foreground">
                      APEX has an inspiring history that I&apos;m proud to be a part of. Since its founding in 2012,
                      APEX has grown into a dynamic organization that partners with clients of all sizes – from local
                      businesses to innovative startups to industry leaders – spanning industries and sectors around the
                      country.
                    </p>

                    <p className="text-muted-foreground">
                      If you&apos;re considering joining us, I encourage you to attend our recruiting events and connect
                      with our members. These events are a great way to see firsthand what makes APEX so special.
                    </p>

                    <p className="text-muted-foreground">
                      Thank you again for your interest, and I can&apos;t wait to meet you. APEX changed my college
                      journey for the better, and I hope it can do the same for you.
                    </p>

                    <div className="mt-8 space-y-1">
                      <div className="font-signature text-5xl text-apex-red">Sajni Patel</div>
                      <p className="text-sm font-medium">Sajni Patel</p>
                      <p className="text-xs text-muted-foreground">President of APEX Consulting, 2025</p>
                    </div>
                  </div>

                  <div className="relative bg-gray-100 dark:bg-gray-700 hidden md:block">
                    <div className="absolute inset-0">
                      <Image
                        src="/placeholder.svg?height=800&width=600"
                        alt="Sajni Patel, President"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="font-signature text-4xl mb-1">Sajni Patel</div>
                      <p className="text-sm">President, APEX Consulting Group</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}