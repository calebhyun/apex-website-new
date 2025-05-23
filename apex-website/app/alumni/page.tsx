"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import PageHeader from "@/components/page-header"

// Sample alumni testimonials
const testimonials = [
  {
    name: "Alex Thompson",
    role: "Senior Consultant",
    company: "McKinsey & Company",
    year: "2020",
    image: "/placeholder.svg?height=300&width=300",
    quote:
      "APEX gave me the foundation I needed to succeed in consulting. The hands-on experience with real clients was invaluable, and the network I built continues to support me in my career.",
  },
  {
    name: "Sophia Garcia",
    role: "Associate",
    company: "Boston Consulting Group",
    year: "2019",
    image: "/placeholder.svg?height=300&width=300",
    quote:
      "My time at APEX was transformative. The skills I developed through client projects and the mentorship I received from older members prepared me for the challenges of consulting at BCG.",
  },
  {
    name: "Daniel Kim",
    role: "Consultant",
    company: "Bain & Company",
    year: "2021",
    image: "/placeholder.svg?height=300&width=300",
    quote:
      "APEX was the highlight of my college experience. The community is incredibly supportive, and the professional development opportunities are unmatched. It's where I found my passion for consulting.",
  },
  {
    name: "Rachel Patel",
    role: "Senior Associate",
    company: "Deloitte",
    year: "2020",
    image: "/placeholder.svg?height=300&width=300",
    quote:
      "Joining APEX was the best decision I made in college. The practical experience I gained working with real clients gave me a competitive edge in my interviews and prepared me for my role at Deloitte.",
  },
  {
    name: "James Wilson",
    role: "Investment Banking Analyst",
    company: "Goldman Sachs",
    year: "2018",
    image: "/placeholder.svg?height=300&width=300",
    quote:
      "The analytical skills and attention to detail I developed at APEX have been crucial to my success in investment banking. The organization truly prepares you for high-pressure professional environments.",
  },
  {
    name: "Emma Davis",
    role: "Product Manager",
    company: "J.P. Morgan",
    year: "2019",
    image: "/placeholder.svg?height=300&width=300",
    quote:
      "APEX taught me how to approach complex problems and communicate solutions effectively. These skills have been essential in my role as a Product Manager, where I bridge technical and business needs.",
  },
]

// Company logos where alumni work
const companyLogos = [
  { name: "McKinsey", image: "/images/placement/mckinsey.png" },
  { name: "BCG", image: "/images/placement/bcg.png" },
  { name: "Bain", image: "/images/placement/bain.jpg" },
  { name: "PWC", image: "/images/placement/pwc.png" },
  { name: "Deloitte", image: "/images/placement/deloitte.png" },
  { name: "KPMG", image: "/images/placement/kpmg.png" },
  { name: "EY", image: "/images/placement/ey.webp" },
  { name: "Accenture", image: "/images/placement/accenture.jpg" },
  { name: "Strategy&", image: "/images/placement/strategy&.png" },
  { name: "JP Morgan", image: "/images/placement/jpmorgan.png" },
  { name: "Goldman", image: "/images/placement/goldman.png" },
  { name: "Morgan Stanley", image: "/images/placement/morganstanley.png" },
  { name: "Citi", image: "/images/placement/citi.png" },
  { name: "Google", image: "/images/placement/google.png" },
  { name: "Meta", image: "/images/placement/meta.png" },
  { name: "Amazon", image: "/images/placement/amazon.png" },
  { name: "Microsoft", image: "/images/placement/microsoft.png" },
  { name: "Capital One", image: "/images/placement/capitalone.png" },
  { name: "Salesforce", image: "/images/placement/citadel.png" },
  { name: "AMEX", image: "/images/placement/amex.png" },
  { name: "Deutsche", image: "/images/placement/deutsche.jpg" },
  { name: "Guggenheim", image: "/images/placement/guggenheim.jpeg" },
  { name: "Merril Lynch", image: "/images/placement/merril.png" },
  { name: "William Blair", image: "/images/placement/williamblair.jpg" },
  { name: "IBM", image: "/images/placement/ibm.png" },
  { name: "Citadel", image: "/images/placement/citadel.png" },
  { name: "Coca Cola", image: "/images/placement/cocacola.png" },
  { name: "NASA", image: "/images/placement/nasa.png" },
  { name: "Dow Jones", image: "/images/placement/dow.png" },
 
]

export default function AlumniPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const logoContainerRef = useRef<HTMLDivElement>(null)

  // Handle testimonial navigation
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Autoplay for testimonials
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextTestimonial()
      }, 5000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, currentTestimonial])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  // Infinite scrolling effect for logos
  useEffect(() => {
    const logoContainer = logoContainerRef.current
    if (!logoContainer) return

    const scrollSpeed = 1.5
    let animationFrameId: number
    let scrollPos = 0

    const scroll = () => {
      scrollPos += scrollSpeed
      if (scrollPos >= logoContainer.scrollWidth / 2) {
        scrollPos = 0
      }
      logoContainer.scrollLeft = scrollPos
      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div>
      <PageHeader
        title="Our Alumni Network"
        descriptions={[
          "APEX Consulting Group alumni have gone on to work at top companies across various industries.",
          "Explore where our former members are making an impact in consulting, finance, and technology.",
          "Our alumni network continues to grow and support current members through mentorship and opportunities.",
        ]}
      />

      <div className="py-10 md:py-16">
        <div className="container px-4 md:px-6">
          {/* Company Logos Showcase */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Where Our Alumni Work</h2>
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>

              <div className="overflow-hidden">
                <div
                  ref={logoContainerRef}
                  className="flex gap-8 py-6 overflow-x-auto scrollbar-hide"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {/* First set of logos */}
                  {companyLogos.map((logo, index) => (
                    <div
                      key={`logo-1-${index}`}
                      className="flex-shrink-0 flex items-center justify-center h-20 w-40 bg-white rounded-lg shadow-sm p-4"
                    >
                      <Image
                        src={logo.image || "/placeholder.svg"}
                        alt={logo.name}
                        width={160}
                        height={80}
                        className="object-contain max-h-full"
                      />
                    </div>
                  ))}

                  {/* Duplicate logos on scroll */}
                  {companyLogos.map((logo, index) => (
                    <div
                      key={`logo-2-${index}`}
                      className="flex-shrink-0 flex items-center justify-center h-20 w-40 bg-white rounded-lg shadow-sm p-4"
                    >
                      <Image
                        src={logo.image || "/placeholder.svg"}
                        alt={logo.name}
                        width={160}
                        height={80}
                        className="object-contain max-h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Alumni Testimonials */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Alumni Testimonials</h2>
            <div
              className="relative overflow-hidden bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-[1fr_2fr] gap-6 p-6 md:p-10">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="font-bold text-lg">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                        <p className="text-sm text-muted-foreground">Class of {testimonial.year}</p>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="relative">
                          <Quote className="absolute -top-2 -left-2 h-8 w-8 text-apex-red opacity-20" />
                          <p className="text-lg italic pl-6 pr-4">{testimonial.quote}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === currentTestimonial ? "bg-apex-red w-6" : "bg-gray-300 dark:bg-gray-600",
                    )}
                    onClick={() => setCurrentTestimonial(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous testimonial</span>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
                onClick={nextTestimonial}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next testimonial</span>
              </Button>
            </div>
          </div>

          {/* Alumni Statistics */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Alumni Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-apex-red to-red-700 text-white">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold mb-2">100+</div>
                  <p className="text-sm">alumni in our network</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-apex-red to-red-700 text-white">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <p className="text-sm">job placement rate upon graduation</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-apex-red to-red-700 text-white">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold mb-2">80+</div>
                  <p className="text-sm">unique employers of APEX alumni</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-apex-red to-red-700 text-white">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold mb-2">30+</div>
                  <p className="text-sm">alumni at MBB and Big 4 consulting</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}