"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, Mail } from "lucide-react"
import PageHeader from "@/components/page-header"

// Sample team data - replace with actual data
const teamMembers = {
  eboard: [
    {
      name: "Sajni Patel",
      role: "President",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      email: "sajnip@umich.edu",
    },
    {
      name: "Sreejay",
      role: "Vice President Internal Relations",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      email: "alexj@umich.edu",
    },
    {
      name: "etc",
      role: "Vice President External Relations",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      email: "mayar@umich.edu",
    },

  ],
  projectManagers: [
    {
      name: "Jane Smith",
      role: "Project Manager",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      email: "jane@example.com",
    },
    {
      name: "John Doe",
      role: "Project Manager",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      email: "john@example.com",
    }
  ],
  businessAnalystLeads: [
    {
      name: "Noor Shah",
      role: "Business Analyst Lead",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      email: "michael@example.com",
    },

  ],
  businessAnalysts: [
    {
      name: "Jane Doe2",
      role: "Business Analyst",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      email: "david@example.com",
    },
    {
      name: "John Doe12",
      role: "Business Analyst",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      email: "jessica@example.com",
    },
  ],
  seniorAdvisors: [
    {
      name: "Hi this is noor",
      role: "Senior Advisor",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      email: "robert@example.com",
    },
    {
      name: "hi again",
      role: "Senior Advisor",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      email: "amanda@example.com",
    },
  ],
}

export default function TeamPage() {
  const [currentRole, setCurrentRole] = useState("eboard")

  return (
    <div>
      <PageHeader
        title="Our Team"
        descriptions={[
          "Meet the dedicated individuals who make Apex Consulting Group the University of Michigan's premier consulting organization.",
          "Our diverse team brings together talent from across campus to deliver exceptional results.",
          "Each member contributes unique skills and perspectives to our collaborative environment.",
        ]}
      />

      <div className="py-10 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex justify-center mb-8 overflow-x-auto">
            <div className="inline-flex items-center rounded-md border border-input bg-background p-1 text-muted-foreground">
              <button
                onClick={() => setCurrentRole("eboard")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  currentRole === "eboard" ? "bg-apex-red text-white shadow-sm" : ""
                }`}
              >
                EBoard
              </button>
              <button
                onClick={() => setCurrentRole("projectManagers")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  currentRole === "projectManagers" ? "bg-apex-red text-white shadow-sm" : ""
                }`}
              >
                Project Managers
              </button>
              <button
                onClick={() => setCurrentRole("businessAnalystLeads")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  currentRole === "businessAnalystLeads" ? "bg-apex-red text-white shadow-sm" : ""
                }`}
              >
                Business Analyst Leads
              </button>
              <button
                onClick={() => setCurrentRole("businessAnalysts")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  currentRole === "businessAnalysts" ? "bg-apex-red text-white shadow-sm" : ""
                }`}
              >
                Business Analysts
              </button>
              <button
                onClick={() => setCurrentRole("seniorAdvisors")}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                  currentRole === "seniorAdvisors" ? "bg-apex-red text-white shadow-sm" : ""
                }`}
              >
                Senior Advisors
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers[currentRole as keyof typeof teamMembers].map((member, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-lg transition-all">
                <div className="aspect-square relative">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="bg-white text-black" asChild>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                          <span className="sr-only">LinkedIn</span>
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" className="bg-white text-black" asChild>
                        <a href={`mailto:${member.email}`}>
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}