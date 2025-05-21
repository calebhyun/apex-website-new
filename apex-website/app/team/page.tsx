"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, Mail } from "lucide-react"
import PageHeader from "@/components/page-header"

// Team Data
const teamMembers = {
  eboard: [
    {
      name: "Sajni Patel",
      role: "President",
      image: "/images/headshots/Board/SajniP2.jpeg",
      linkedin: "https://www.linkedin.com/in/sajnipatelll/",
      email: "sajni@umich.edu",
    },
    {
      name: "Sreejay Ramakrishnan",
      role: "VP Internal Development",
      image: "/images/headshots/Board/SreejayR.JPG",
      linkedin: "https://www.linkedin.com/in/sreejay-ramakrishnan/",
      email: "sreejayr@umich.edu",
    },
    {
      name: "George Perakis",
      role: "VP External Relations",
      image: "/images/headshots/Board/GeorgeP.jpeg",
      linkedin: "https://www.linkedin.com/in/georgepperakis/",
      email: "gperakis@umich.edu",
    },

    {
      name: "Ivan Dashkevich",
      role: "VP Project Management",
      image: "/images/headshots/Board/IvanD.JPG",
      linkedin: "https://www.linkedin.com/in/idashkevich05/",
      email: "idashkev@umich.edu",
    },

    {
      name: "Noah Knutsen",
      role: "VP Client Acquisition",
      image: "/images/headshots/Board/NoahK.JPG",
      linkedin: "https://www.linkedin.com/in/noah-knutsen/",
      email: "nknutsen@umich.edu",
    },

    {
      name: "Urmi Joglekar",
      role: "VP Technology and Operations",
      image: "/images/headshots/Board/UrmiJ.JPG",
      linkedin: "https://www.linkedin.com/in/urmi-joglekar/",
      email: "urmij@umich.edu",
    },

  ],
  projectManagers: [
    {
      name: "Aparna Srikanth",
      role: "Project Manager",
      image: "/images/headshots/PM/AparnaS.JPG",
      linkedin: "https://www.linkedin.com/in/aparnasrikanth/",
      email: "aparnsr@umich.edu",
    },
    {
      name: "Ayden Simckes",
      role: "Project Manager",
      image: "/images/headshots/PM/AydenS.jpg",
      linkedin: "https://www.linkedin.com/in/ayden-simckes/",
      email: "asimckes@umich.edu",
    },
    {
      name: "Chris Shang",
      role: "Project Manager",
      image: "/images/headshots/PM/ChrisS.jpg",
      linkedin: "https://www.linkedin.com/in/chrissh/",
      email: "chrissh@umich.edu",
    },
    {
      name: "Kristin Choi",
      role: "Project Manager",
      image: "/images/headshots/PM/KristinC.jpeg",
      linkedin: "https://www.linkedin.com/in/kristinchoi05/",
      email: "krischoi@umich.edu",
    },
    {
      name: "Sophia Rich",
      role: "Project Manager",
      image: "/images/headshots/PM/SophiaR.jpg",
      linkedin: "https://www.linkedin.com/in/sophiarich/",
      email: "sophr@umich.edu",
    }
  ],
  businessAnalystLeads: [
    {
      name: "Jacob Harleton",
      role: "Business Analyst Lead",
      image: "/images/headshots/BAL/JacobH.JPG",
      linkedin: "https://www.linkedin.com/in/jacobharleton/",
      email: "harleton@umich.edu",
    },
    {
      name: "Kavya Doshi",
      role: "Business Analyst Lead",
      image: "/images/headshots/BAL/KavyaD.jpeg",
      linkedin: "https://www.linkedin.com/in/kavya-doshi/",
      email: "doshika@umich.edu",
    },
    {
      name: "Kritika Singh",
      role: "Business Analyst Lead",
      image: "/images/headshots/BAL/KritikaS.jpg",
      linkedin: "https://www.linkedin.com/in/kritika-singhh/",
      email: "skritika@umich.edu",
    },
    {
      name: "Noor Shah",
      role: "Business Analyst Lead",
      image: "/images/headshots/BAL/NoorS.JPG",
      linkedin: "https://www.linkedin.com/in/noor-u-shah/",
      email: "noorshah@umich.edu",
    },
    {
      name: "Sorelle Kreter",
      role: "Business Analyst Lead",
      image: "/images/headshots/BAL/SorelleK.jpeg",
      linkedin: "https://www.linkedin.com/in/sorelle-kreter/",
      email: "skreter@umich.edu",
    }

  ],
  businessAnalysts: [    
    {
    name: "Chris Munroe",
    role: "Business Analyst",
    image: "/images/headshots/BA/ChrisM.jpg",
    linkedin: "https://www.linkedin.com/in/chrismunroe12/",
    email: "cmunroe@umich.edu",
    },
    {
      name: "David Gonzalez",
      role: "Business Analyst",
      image: "/images/headshots/BA/DavidG.jpg",
      linkedin: "https://www.linkedin.com/in/davidgzzmtz/",
      email: "davidgmz@umich.edu",
    },
    {
      name: "Katelyn Knickerbocker",
      role: "Business Analyst",
      image: "/images/headshots/BA/KatelynK.jpg",
      linkedin: "https://www.linkedin.com/in/katelyn-knickerbocker-75103b332/",
      email: "kkately@umich.edu",
    },
    {
      name: "Jessica Youn",
      role: "Business Analyst",
      image: "/images/headshots/BA/JessicaY.jpg",
      linkedin: "https://www.linkedin.com/in/jessicayoun/",
      email: "jyoun@umich.edu",
    },
    {
      name: "Jiali Goodwin",
      role: "Business Analyst",
      image: "/images/headshots/BA/JialiG.jpeg",
      linkedin: "https://www.linkedin.com/in/jiali-goodwin/",
      email: "jialig@umich.edu",
    },
    {
      name: "Mark Bokas",
      role: "Business Analyst",
      image: "/images/headshots/BA/MarkB.jpg",
      linkedin: "https://www.linkedin.com/in/markbokas/",
      email: "bokas@umich.edu",
    },
    {
      name: "Nikhil Akkala",
      role: "Business Analyst",
      image: "/images/headshots/BA/NikhilA.JPG",
      linkedin: "https://www.linkedin.com/in/nikhil-akkala/",
      email: "nakkala@umich.edu",
    },
    {
      name: "Reagan Masek",
      role: "Business Analyst",
      image: "/images/headshots/BA/ReaganM.jpg",
      linkedin: "https://www.linkedin.com/in/reagan-masek/",
      email: "rmasek@umich.edu",
    },
    {
      name: "Ryan Wells",
      role: "Business Analyst",
      image: "/images/headshots/BA/RyanW.jpeg",
      linkedin: "https://www.linkedin.com/in/ryanwells10/",
      email: "rpwells@umich.edu",
    },
    {
      name: "Sam Pelter",
      role: "Business Analyst",
      image: "/images/headshots/BA/SamP.jpg",
      linkedin: "https://www.linkedin.com/in/samanthapelter/",
      email: "spelter@umich.edu",
    },
    {
      name: "Sanjay Tilak",
      role: "Business Analyst",
      image: "/images/headshots/BA/SanjayT.JPG",
      linkedin: "https://www.linkedin.com/in/sanjay-tilak/",
      email: "sanjayt@umich.edu",
    },    
    {
      name: "Vansh Baxi",
      role: "Business Analyst",
      image: "/images/headshots/BA/VanshB.jpeg",
      linkedin: "https://www.linkedin.com/in/vanshbaxi/",
      email: "vbaxi@umich.edu",
    },
    {
      name: "Zain Syed",
      role: "Business Analyst",
      image: "/images/headshots/BA/ZainS.jpg",
      linkedin: "https://www.linkedin.com/in/zainsyedd/",
      email: "zainsy@umich.edu",
    },
  ],
  seniorAdvisors: [
    {
      name: "Caleb Hyun",
      role: "Senior Advisor",
      image: "/images/headshots/SA/CalebH.jpg",
      linkedin: "https://www.linkedin.com/in/calebkhyun/",
      email: "ckhyun@umich.edu",
    },
    {
      name: "Henry Chapman",
      role: "Senior Advisor",
      image: "/images/headshots/SA/HenryC.JPG",
      linkedin: "https://www.linkedin.com/in/henry-chapman-3436852b4/",
      email: "hcchap@umich.edu",
    },
    {
      name: "Jaden Douglas",
      role: "Senior Advisor",
      image: "/images/headshots/SA/JadenD.JPG",
      linkedin: "https://www.linkedin.com/in/jadendouglas/",
      email: "jadend@umich.edu",
    },
    {
      name: "Meha Nagireddy",
      role: "Senior Advisor",
      image: "/images/headshots/SA/MehaN2.JPG",
      linkedin: "https://www.linkedin.com/in/mehanagireddy/",
      email: "mnagired@umich.edu",
    },
    {
      name: "Rishi Juneja",
      role: "Senior Advisor",
      image: "/images/headshots/SA/RishiJ.JPG",
      linkedin: "https://www.linkedin.com/in/rishijuneja//",
      email: "rishij@umich.edu",
    },
    {
      name: "Ronith Ganjigunta",
      role: "Senior Advisor",
      image: "/images/headshots/SA/RonithG.JPG",
      linkedin: "https://www.linkedin.com/in/ronithganjigunta/",
      email: "rronith@umich.edu",
    },
    {
      name: "Ruthie Yu",
      role: "Senior Advisor",
      image: "/images/headshots/SA/RuthieY.JPG",
      linkedin: "https://www.linkedin.com/in/ruthie-yu/",
      email: "yuruthie@umich.edu",
    },
    {
      name: "Tayla Jankowski",
      role: "Senior Advisor",
      image: "/images/headshots/SA/TaylaJ.jpeg",
      linkedin: "https://www.linkedin.com/in/tayla-jankowski/",
      email: "taylajan@umich.edu",
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
          "Meet the Wonderful Minds Behind APEX Consulting",
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
                Executive Board
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {teamMembers[currentRole as keyof typeof teamMembers].map((member, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-lg transition-all">
                <div className="relative w-full h-[500px]">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover object-top rounded-t-md"
                />
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