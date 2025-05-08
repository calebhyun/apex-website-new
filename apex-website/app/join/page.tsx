"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import {
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Users,
  Briefcase,
  GraduationCap,
  Network,
  FileText,
  UserPlus,
  Building,
  MessageSquare,
  Award,
  ChevronLeft,
  ChevronRight,
  Check,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import PageHeader from "@/components/page-header"
import { generateGoogleCalendarLink, parseEventDate, parseEventTime } from "@/utils/calendar"

// Timeline data with minimalist icons instead of emojis
const timelineEvents = [
  {
    id: "meet-the-clubs",
    title: "Meet the Clubs",
    date: "September 5, 2023",
    time: "6:00 PM - 8:00 PM",
    location: "Michigan Union",
    description: "Learn about Apex Consulting Group and other student organizations on campus.",
    active: false,
    icon: <Building className="h-5 w-5" />,
  },
  {
    id: "application-release",
    title: "Application Release",
    date: "September 7, 2023",
    time: "12:00 PM",
    location: "Online",
    description: "Applications for Apex Consulting Group will be available on our website.",
    active: false,
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: "mass-meeting",
    title: "Mass Meeting",
    date: "September 10, 2023",
    time: "7:00 PM - 8:30 PM",
    location: "Ross School of Business, R1210",
    description: "Learn more about Apex Consulting Group, our projects, and the application process.",
    active: false,
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: "speed-dating",
    title: "Speed Dating",
    date: "September 12, 2023",
    time: "6:00 PM - 8:00 PM",
    location: "Ross School of Business, Winter Garden",
    description: "Meet current members and learn about their experiences with Apex.",
    active: false,
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    id: "dei-panel",
    title: "DEI Panel",
    date: "September 14, 2023",
    time: "5:00 PM - 6:30 PM",
    location: "Ross School of Business, R2240",
    description: "Learn about our commitment to diversity, equity, and inclusion.",
    active: false,
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: "application-office-hours",
    title: "Application Office Hours",
    date: "September 15-17, 2023",
    time: "Various Times",
    location: "Ross School of Business",
    description: "Get help with your application from current members.",
    active: false,
    icon: <HelpCircle className="h-5 w-5" />,
  },
  {
    id: "app-due",
    title: "Application Deadline",
    date: "September 18, 2023",
    time: "11:59 PM",
    location: "Online",
    description: "All applications must be submitted by this time.",
    active: false,
    icon: <Clock className="h-5 w-5" />,
  },
  {
    id: "case-workshop",
    title: "Case Workshop",
    date: "September 20, 2023",
    time: "6:00 PM - 8:00 PM",
    location: "Ross School of Business, R1220",
    description: "Learn about case interviews and practice with current members.",
    active: false,
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    id: "interviews",
    title: "Interviews",
    date: "September 22-24, 2023",
    time: "Various Times",
    location: "Ross School of Business",
    description: "Selected candidates will be invited for interviews.",
    active: false,
    icon: <UserPlus className="h-5 w-5" />,
  },
]

// Application process steps for carousel
const applicationSteps = [
  {
    title: "Written Application",
    description: "Submit your resume and answer a few short questions about your interest in consulting and APEX.",
    icon: <FileText className="h-10 w-10 text-apex-red" />,
    details:
      "Our written application helps us understand your background, interests, and why you want to join APEX. Be authentic and showcase your unique experiences and perspectives.",
  },
  {
    title: "First Round Interview",
    description: "A case and behavioral interview to assess your fit with our organization's culture and values and problem solving abilities",
    icon: <MessageSquare className="h-10 w-10 text-apex-red" />,
    details:
      "Don't worry if you've never done a case interview before! We provide case workshops to help you prepare. We're looking for structured thinking and creative problem-solving, not perfect answers.",
  },
  {
    title: "Second Round Interview",
    description: "Similar to the first round interview, this interview will mix technicals and behaviorals to hollistically evaluate you",
    icon: <Briefcase className="h-10 w-10 text-apex-red" />,
    details:
      "Be sure to showcase your personality, as well as your problem solving skills! Remember, there are no right answers.",
  },
  {
    title: "Final Decision",
    description: "Selected candidates will receive an offer to join Apex Consulting Group.",
    icon: <Award className="h-10 w-10 text-apex-red" />,
    details:
      "We evaluate candidates holistically, considering your application, interviews, and interactions throughout the recruitment process. Decisions are typically made within a week after final interviews.",
  },
]

// FAQ data
const faqItems = [
  {
    question: "Do I need prior consulting experience to join APEX?",
    answer:
      "No prior consulting experience is required! We welcome students from all backgrounds and majors. Our training program will teach you everything you need to know about consulting.",
  },
  {
    question: "What is the time commitment for APEX members?",
    answer:
      "APEX members typically dedicate 5-10 hours per week to the organization. This includes client project work, professional development sessions, and social events. The time commitment may vary throughout the semester based on project deadlines.",
  },
  {
    question: "Which majors are eligible to apply?",
    answer:
      "Students from all majors are encouraged to apply! We value diverse perspectives and have members from the school of business, engineering, LSA, etc. What matters most is your interest in consulting and commitment to professional growth.",
  },
  {
    question: "When can I apply to join APEX?",
    answer:
      "We recruit new members at the beginning of each fall and winter semester. Check our recruitment timeline for specific dates and deadlines for the current recruitment cycle.",
  },
  {
    question: "What types of clients does APEX work with?",
    answer:
      "APEX works with a diverse range of clients, including local businesses, startups, non-profits, and larger corporations. Our projects span various industries and focus areas, giving members exposure to different business challenges and environments.",
  },
  {
    question: "How can I prepare for the case interview?",
    answer:
      "We host case workshops during the recruitment process to help candidates prepare. Additionally, you can practice with case interview books, online resources, or by forming case groups with friends. Remember, we're looking for your approach to problem-solving, not necessarily perfect answers.",
  },
]

// Community images for carousel
const communityImages = [
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "APEX team members at social event",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "APEX retreat activities",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "APEX members volunteering",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "APEX end of semester celebration",
  },
]

export default function JoinPage() {
  const [activeEvent, setActiveEvent] = useState("meet-the-clubs")
  const [animateTimeline, setAnimateTimeline] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Set up intersection observer to trigger animation when timeline is in view
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateTimeline(true)
        }
      },
      { threshold: 0.2 },
    )

    if (timelineRef.current) {
      observerRef.current.observe(timelineRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Carousel navigation
  const nextStep = () => {
    setCurrentStep((prev) => (prev === applicationSteps.length - 1 ? 0 : prev + 1))
  }

  const prevStep = () => {
    setCurrentStep((prev) => (prev === 0 ? applicationSteps.length - 1 : prev - 1))
  }

  // Image carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === communityImages.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Ensure all links scroll to top of page
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0)

    // Add scroll-to-top behavior to all internal links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (link && link.href.startsWith(window.location.origin) && !link.hasAttribute("target")) {
        // For same-origin links without target attribute
        window.scrollTo(0, 0)
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  // Function to generate Google Calendar link for an event
  const getCalendarLink = (event: (typeof timelineEvents)[0]) => {
    // Parse the date and time
    const startDate = parseEventDate(event.date)

    // Handle time ranges and various time formats
    let startTime = ""
    let endTime = ""

    if (event.time && event.time !== "Various Times") {
      const times = parseEventTime(event.time)
      startTime = times.startTime
      endTime = times.endTime
    }

    // Generate the calendar link
    return generateGoogleCalendarLink({
      title: `APEX Consulting: ${event.title}`,
      startDate,
      startTime,
      endTime,
      location: event.location,
      description: event.description,
    })
  }

  return (
    <div>
      <PageHeader
        title="Join Our Team"
        descriptions={[
          "Apex Consulting Group recruits new members at the beginning of each semester.",
          "Follow our recruitment timeline to learn how to join our team.",
          "We welcome students from all majors and backgrounds who are passionate about consulting.",
        ]}
      />

      <div className="py-10 md:py-16">
        <div className="container px-4 md:px-6">
          {/* Interactive Timeline - Redesigned with line in the middle */}
          <div ref={timelineRef} className="mb-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Recruitment Timeline</h2>

            <div className="relative">
              {/* Horizontal line - now positioned to intersect the middle of circles */}
              <div className="absolute top-[22px] left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700"></div>

              {/* Timeline events */}
              <div className="flex justify-between relative">
                {timelineEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={cn(
                      "flex flex-col items-center w-20 transition-all duration-500 transform",
                      animateTimeline ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                    )}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    onClick={() => setActiveEvent(event.id)}
                  >
                    <div
                      className={cn(
                        "w-11 h-11 rounded-full flex items-center justify-center mb-2 cursor-pointer transition-all z-10",
                        activeEvent === event.id
                          ? "bg-apex-red text-white scale-110 shadow-lg"
                          : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-apex-red hover:text-apex-red dark:hover:border-apex-red dark:hover:text-apex-red",
                      )}
                    >
                      {event.icon}
                    </div>
                    <div
                      className={cn(
                        "text-xs font-medium text-center transition-all mt-2",
                        activeEvent === event.id ? "text-apex-red" : "text-muted-foreground",
                      )}
                    >
                      {event.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event details */}
            <div className="mt-16">
              {timelineEvents.map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "transition-all duration-500",
                    activeEvent === event.id ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden",
                  )}
                >
                  <Card className="border-apex-red overflow-hidden">
                    <div className="bg-apex-red h-1"></div>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{event.title}</h3>
                          <div className="flex flex-wrap gap-4 text-sm mt-2">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </div>
                          </div>
                        </div>

                        <div>
                          {event.active ? (
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                              <Check className="h-4 w-4 mr-1" />
                              Currently Active
                            </div>
                          ) : (
                            <Button variant="outline" className="text-sm" asChild>
                              <a
                                href={getCalendarLink(event)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1"
                              >
                                Add to Calendar <ArrowRight className="h-3 w-3" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>

                      <p className="text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Why Join Apex - Redesigned with more visual appeal */}
          <div className="my-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Why Join Apex?</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative overflow-hidden rounded-xl">
                {/* Image Carousel */}
                <div className="relative w-full h-full aspect-video">
                  {communityImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentImageIndex ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                    </div>
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Join Our Community</h3>
                    <p className="text-white/80">
                      APEX is more than just a consulting club - it's a supportive community where you'll form lasting
                      friendships and professional connections.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 flex gap-4 transform transition-all hover:translate-x-2">
                  <div className="rounded-full bg-apex-red/10 p-3 h-fit">
                    <Briefcase className="h-6 w-6 text-apex-red" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Real-World Experience</h3>
                    <p className="text-muted-foreground">
                      Work on real consulting projects with actual clients, gaining valuable experience that will set
                      you apart in the job market.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 flex gap-4 transform transition-all hover:translate-x-2">
                  <div className="rounded-full bg-apex-red/10 p-3 h-fit">
                    <GraduationCap className="h-6 w-6 text-apex-red" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Professional Development</h3>
                    <p className="text-muted-foreground">
                      Receive training in consulting methodologies, problem-solving, and client communication from
                      experienced members.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 flex gap-4 transform transition-all hover:translate-x-2">
                  <div className="rounded-full bg-apex-red/10 p-3 h-fit">
                    <Network className="h-6 w-6 text-apex-red" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Networking Opportunities</h3>
                    <p className="text-muted-foreground">
                      Connect with alumni working at top consulting firms, investment banks, and tech companies.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 flex gap-4 transform transition-all hover:translate-x-2">
                  <div className="rounded-full bg-apex-red/10 p-3 h-fit">
                    <Users className="h-6 w-6 text-apex-red" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Supportive Community</h3>
                    <p className="text-muted-foreground">
                      Join a supportive community of like-minded individuals who are passionate about consulting and
                      business.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Application Process - Carousel Style */}
          <div className="my-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Application Process</h2>

            <div className="relative">
              <div className="overflow-hidden rounded-xl bg-gradient-to-r from-apex-red to-red-700 p-1">
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 md:p-10">
                  {/* Progress indicator */}
                  <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-2">
                      {applicationSteps.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentStep(index)}
                          className={cn(
                            "w-2.5 h-2.5 rounded-full transition-all",
                            currentStep === index ? "bg-apex-red w-8" : "bg-gray-300 dark:bg-gray-700",
                          )}
                          aria-label={`Go to step ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Carousel content */}
                  <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-center">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-8 mb-4">
                        {applicationSteps[currentStep].icon}
                      </div>
                      <h3 className="text-xl font-bold">{applicationSteps[currentStep].title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Step {currentStep + 1} of {applicationSteps.length}
                      </p>
                    </div>

                    <div>
                      <p className="text-lg mb-4">{applicationSteps[currentStep].description}</p>
                      <p className="text-muted-foreground">{applicationSteps[currentStep].details}</p>

                      {currentStep === 0 && (
                        <Button asChild className="mt-6 bg-apex-red hover:bg-red-700">
                          <Link href="#" className="flex items-center gap-2">
                            Apply Now <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex justify-between mt-8">
                    <Button variant="outline" size="icon" onClick={prevStep} className="rounded-full">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous step</span>
                    </Button>

                    <Button variant="outline" size="icon" onClick={nextStep} className="rounded-full">
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next step</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="my-20">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">Still have questions? We're happy to help!</p>
                <Button asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
