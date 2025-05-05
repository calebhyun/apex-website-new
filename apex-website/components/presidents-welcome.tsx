"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PresidentsWelcomeProps {
  className?: string
}

export default function PresidentsWelcome({ className }: PresidentsWelcomeProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className={cn("relative py-12 md:py-24 bg-gray-50 dark:bg-gray-800", className)}>
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
                    On behalf of APEX Consulting Group, thank you for taking the time to learn more about who we are and
                    what we do. APEX is more than just an undergraduate consulting organization at the University of
                    Michigan–it&apos;s a vibrant community of over 50 diverse members who come together to grow
                    professionally and personally.
                  </p>

                  <div className="relative pl-4 border-l-4 border-apex-red py-2 italic">
                    <p className="text-muted-foreground">
                      For me, APEX has been one of the most rewarding aspects of my college experience. I still remember
                      walking into my first APEX event as a nervous sophomore, overwhelmed by the chaos of recruiting
                      season. Yet, from the very first interaction, I felt at home.
                    </p>
                  </div>

                  <p className="text-muted-foreground">
                    The genuine support, kindness, and encouragement I received from members made all the difference.
                    Whether I needed guidance on navigating my career, someone to laugh with after a long day, or just a
                    group to study with during finals, APEX was always there, turning every challenge into an
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
                    APEX has an inspiring history that I&apos;m proud to be a part of. Since its founding in 2012, APEX
                    has grown into a dynamic organization that partners with clients of all sizes – from local
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
                      className={cn(
                        "object-cover transition-opacity duration-500",
                        imageLoaded ? "opacity-100" : "opacity-0",
                      )}
                      onLoad={() => setImageLoaded(true)}
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
    </div>
  )
}