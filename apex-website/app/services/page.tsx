"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Users,
  BarChart4,
  Lightbulb,
  Target,
  Puzzle,
  HeartHandshake,
  UserCheck,
  PresentationIcon as PresentationChart,
  ChevronDown,
} from "lucide-react"
import PageHeader from "@/components/page-header"
import { motion, AnimatePresence } from "framer-motion"

//Service Data
const services = [
  {
    id: "marketing",
    title: "Marketing",
    icon: <Target className="h-5 w-5" />,
    description:
      "Our marketing consulting services help businesses develop and implement effective marketing strategies to reach their target audience and achieve their business goals.",
    projects: [
      {
        id: "wnba-team",
        title: "WNBA Sports Team",
        clientOverview:
          "A regional retail chain with 15+ locations across the Midwest, struggling with declining foot traffic and sales in their physical stores.",
        problem:
          "The client was experiencing a 20% year-over-year decline in store visits and a 15% drop in sales. Their traditional marketing approach was failing to connect with younger demographics, and they lacked a cohesive digital strategy.",
        solution:
          "We developed a comprehensive omnichannel marketing strategy that integrated online and offline customer experiences. This included a revamped social media presence, location-based mobile marketing, and in-store digital experiences that bridged the physical-digital divide.",
        deliverables: [
          "Comprehensive market research and customer segmentation analysis",
          "Omnichannel marketing strategy with implementation roadmap",
          "Social media content calendar and campaign guidelines",
          "Customer journey mapping across digital and physical touchpoints",
          "ROI measurement framework and KPI dashboard",
        ],
        semester: "W24",
      },
    
    ],
  },
  {
    id: "process-optimization",
    title: "Process Optimization",
    icon: <Puzzle className="h-5 w-5" />,
    description:
      "We help businesses optimize their internal operations to improve efficiency, reduce costs, and enhance customer satisfaction.",
    projects: [
      {
        id: "grocery-store",
        title: "Grocery Store Chain",
        clientOverview:
          "An emerging manufacturing startup producing sustainable home goods, facing challenges with scaling production while maintaining quality and managing costs.",
        problem:
          "The client's supply chain inefficiencies were causing production delays of up to 3 weeks, increasing costs by 30% above industry standards, and resulting in customer complaints about delivery times.",
        solution:
          "We redesigned their supply chain network, implemented inventory optimization techniques, and established strategic partnerships with reliable suppliers. We also developed a digital tracking system to provide real-time visibility into the production process.",
        deliverables: [
          "End-to-end supply chain assessment and gap analysis",
          "Supplier evaluation framework and recommended partnerships",
          "Inventory management system specifications",
          "Process optimization roadmap with prioritized initiatives",
          "Supply chain risk management strategy",
        ],
        semester: "W25",
      },
    ],
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    icon: <BarChart4 className="h-5 w-5" />,
    description:
      "Our expertise in both predicted and regressive data analysis help businesses leverage their data to gain insights, make informed decisions, and drive business growth.",
    projects: [
      {
        id: "ev-oem",
        title: "Electric Vehicle OEM",
        clientOverview:
          "Multi-billion dollar USA-based electric vehicle OEM",
        problem:
          "The client approached APEX with concerns regarding inefficiencies within a critical aspect of their supply chain. They required a data-driven solution to forecast the time and cost of key process actions by leveraging historical data. APEX was tasked with building a predictive model to support informed decision-making. .",
        solution:
          "Leveraging Python data analysis libraries, APEX cleaned and merged two datasets totaling over 100,000 rows of historical data.The team conducted an exploratory data analysis to uncover drivers of cost and time variability in the process, while also designing two custom machine learning models that achieved 90% prediction accuracy.",
        deliverables: [
          "Two machine learning models (Gradient Boosting for cost prediction, Random Forest for time prediction), each achieving over 90% accuracy on key supply chain changes",
          "A scalable, modular framework to support seamless model updates as new data becomes available",
          "A competitive landscape analysis detailing how industry leaders leverage machine learning in supply chains, supporting strategic recommendations",
          "A detailed data dictionary documenting 40+ columns from the original dataset to ensure transparency and reproducibility",
          "A suite of nine Python-based visualizations uncovering key trends driving cost and time variability",
        ],
        semester: "W25",
      },

    ],
  },
  {
    id: "market-research",
    title: "Market Research",
    icon: <Lightbulb className="h-5 w-5" />,
    description:
      "We provide comprehensive market research services to help businesses understand their target market, competitors, and industry trends.",
    projects: [
      {
        id: "food-delivery",
        title: "Food Delivery Service",
        clientOverview:
          "An early-stage technology startup developing an innovative SaaS solution for the healthcare industry, with seed funding but limited market validation.",
        problem:
          "The client had developed a promising product but was uncertain about product-market fit, optimal pricing strategy, and go-to-market approach. They needed to validate their value proposition before committing significant resources to scaling.",
        solution:
          "We conducted extensive market research including competitor analysis, customer interviews, and industry expert consultations. We also facilitated user testing sessions and analyzed feedback to refine the product offering.",
        deliverables: [
          "Comprehensive competitive landscape analysis",
          "Target market segmentation and ideal customer profiles",
          "Pricing strategy analysis with recommendations",
          "Feature prioritization framework based on customer value",
          "Go-to-market strategy with channel recommendations",
        ],
        semester: "F23",
      },
    ],
  },
  {
    id: "growth",
    title: "Growth",
    icon: <TrendingUp className="h-5 w-5" />,
    description:
      "Our growth consulting services help businesses identify and capitalize on opportunities for expansion and revenue growth.",
    projects: [
      {
        id: "ai-startup",
        title: "B2B Voice AI Statup",
        clientOverview:
          "A SaaS company with a successful product in the project management space, experiencing stagnation after three years of initial growth and facing increased competition.",
        problem:
          "After rapid early adoption, the client's growth had plateaued at approximately 15,000 users. Customer acquisition costs were increasing, and they were struggling to differentiate in an increasingly crowded market.",
        solution:
          "We developed a comprehensive growth strategy focusing on new market segments and product offerings. This included expanding into adjacent verticals, developing enterprise features, and implementing a customer success program to improve retention and drive upsells.",
        deliverables: [
          "Growth opportunity assessment across markets and product lines",
          "Customer acquisition funnel optimization plan",
          "Retention and expansion strategy with tactical initiatives",
          "Product roadmap for new market penetration",
          "Financial projections and resource allocation recommendations",
        ],
        semester: "W25",
      },
    ],
  },
  {
    id: "strategy",
    title: "Strategy",
    icon: <Puzzle className="h-5 w-5" />,
    description:
      "We help businesses develop and implement effective business strategies to achieve their long-term goals and objectives.",
    projects: [
      {
        id: "healthcare-tech",
        title: "Healthcare Technology Startup",
        clientOverview:
          "Healthcare tech startup that enables secure, patient-centered data sharing and digital health research",
        problem:
          "The client approached APEX without a standardized pricing model, relying on manual quotes for each customer, resulting in delayed estimates and client confusion over pricing rationale. APEX was tasked with devising a data-backed, standardized calculator to streamline pricing across customers.",
        solution:
          "APEX examined the client’s complex product portfolio and current pricing practices, studied competitor case studies, analyzed customer data, and conducted expert interviews to assess industry trends, ultimately developing a comprehensive pricing model and a standardized calculator for the client’s website.",
        deliverables: [
          "5 Annotated Competitor Expert Interview Transcripts ",
          "Client and Competitor Case Studies",
          "In-Depth Pricing Model Framework",
          "Product Bundling Based on Accrued Client Value and Cost Incurred",
          "2 Interactive Figma Mockups Displaying Website Implementation",
          "Standardized Pricing Calculator Framework",
          "Implementation Timeline and Feasibility Assessment",
          "Risks and Mitigation Plan"
        ],
        semester: "F24",
      },
    ],
  },
]

// Process steps for the animated process section
const processSteps = [
  {
    number: 1,
    title: "Client Onboarding",
    description:
      "Initial meeting with our VP Projects and VP Client Acquisition to understand your business needs and establish project scope. All services are provided pro bono.",
    icon: <HeartHandshake className="h-6 w-6" />,
  },
  {
    number: 2,
    title: "Team Assignment",
    description:
      "You'll meet your dedicated Project Manager (PM) and Business Analyst Lead (BAL) who will serve as your primary points of contact throughout the 8-week engagement.",
    icon: <UserCheck className="h-6 w-6" />,
  },
  {
    number: 3,
    title: "Data Analysis",
    description:
      "Our team conducts thorough research and analysis, working closely with you to gather insights and develop strategic recommendations.",
    icon: <BarChart4 className="h-6 w-6" />,
  },
  {
    number: 4,
    title: "Deliverables",
    description:
      "We provide formal midpoint and final deliverables to ensure your organization receives maximum value from our partnership.",
    icon: <PresentationChart className="h-6 w-6" />,
  },
]

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("marketing")
  const [activeProject, setActiveProject] = useState<Record<string, string>>({
    marketing: "wnba-team",
    "process-optimization": "grocery-store",
    "data-analytics": "ev-oem",
    "market-research": "food-delivery",
    growth: "ai-startup",
    strategy: "healthcare-tech",
  })
  const [showDropdown, setShowDropdown] = useState<string | null>(null)

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    // Don't reset the active project when changing tabs
  }

  // Handle project selection
  const handleProjectSelect = (serviceId: string, projectId: string) => {
    setActiveProject((prev) => ({
      ...prev,
      [serviceId]: projectId,
    }))
    setShowDropdown(null)
  }

  // Toggle dropdown visibility
  const toggleDropdown = (serviceId: string) => {
    setShowDropdown(showDropdown === serviceId ? null : serviceId)
  }

  // Get current service and project
  const currentService = services.find((service) => service.id === activeTab)
  const currentProject = currentService?.projects.find((project) => project.id === activeProject[activeTab])

  return (
    <div>
      <PageHeader
        title="Client Services"
        descriptions={[
          "APEX Consulting Group offers a wide range of consulting services to help businesses achieve their goals.",
          "Our team delivers data-driven, strategic solutions across various industries and business challenges.",
          "Explore our service areas and case studies to learn how we can help your organization succeed.",
        ]}
      />

      <div className="py-10 md:py-16">
        <div className="container px-4 md:px-6">
          {/* Animated Process Section */}
          <div className="mb-24">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Consulting Process</h2>
              <p className="text-muted-foreground">
                Our structured 8-week pro bono consulting process delivers maximum value to our clients.
              </p>
            </div>
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2 z-0"></div>

              <div className="relative z-10 space-y-16">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className={`flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 bg-gray-400 rounded-full opacity-20 animate-ping"></div>
                      <div className="relative bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg z-20">
                        {step.icon}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div
                        className={`text-6xl font-bold text-gray-100 dark:text-gray-800 ${
                          index % 2 === 0 ? "text-left" : "text-right"
                        }`}
                      >
                        {step.number}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Past Projects */}
          <div className="mt-12">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Past Projects</h2>
              <p className="text-muted-foreground">
                From strategic initiatives to technical projects, explore our diverse portfolio of client work. Our consultants are also equipped to address challenges beyond these areas, bringing versatile expertise to meet your evolving needs.
              </p>
            </div>

            <Tabs defaultValue="marketing" className="w-full" onValueChange={handleTabChange}>
              <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full mb-8">
                {services.map((service) => (
                  <TabsTrigger key={service.id} value={service.id} className="flex items-center gap-2">
                    {service.icon}
                    {service.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              <AnimatePresence mode="wait">
                {services.map((service) => (
                  <TabsContent key={service.id} value={service.id} className="mt-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="text-3xl font-bold flex items-center gap-2">
                          <span className="text-apex-red">{service.icon}</span>
                          {service.title} Consulting
                        </h2>
                        <p className="text-muted-foreground mt-2">{service.description}</p>
                      </div>

                      {/* Project Selection Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(service.id)}
                          className="flex items-center justify-between min-w-[200px] w-auto max-w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors whitespace-nowrap overflow-hidden text-ellipsis"
                        >
                          <span className="font-medium">
                            {service.projects.find((p) => p.id === activeProject[service.id])?.title ||
                              "Select a project"}
                          </span>
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              showDropdown === service.id ? "transform rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Dropdown Menu */}
                        {showDropdown === service.id && (
                          <div className="absolute z-10 min-w-[200px] w-auto max-w-[400px] mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                            {service.projects.map((project) => (
                              <button
                                key={project.id}
                                onClick={() => handleProjectSelect(service.id, project.id)}
                                className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                  activeProject[service.id] === project.id
                                    ? "bg-gray-100 dark:bg-gray-700 font-medium"
                                    : ""
                                }`}
                              >
                                {project.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Case Study Card */}
                      {currentProject && (
                        <Card className="overflow-hidden border-none shadow-lg">
                          <CardContent className="p-0">
                            <div className="bg-gradient-to-r from-apex-red to-red-700 p-4 text-white">
                              <h3 className="text-xl font-bold">{currentProject.title} Case Study</h3>
                              <div className="flex items-center gap-2 mt-1 text-sm">
                                <Calendar className="h-4 w-4" />
                                <span>Project Semester: {currentProject.semester}</span>
                              </div>
                            </div>

                            <div className="p-6 space-y-8">
                              {/* Client Overview Section */}
                              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                                <h4 className="text-lg font-semibold flex items-center gap-2 mb-3">
                                  <Users className="h-5 w-5 text-apex-red" />
                                  Client Overview
                                </h4>
                                <p>{currentProject.clientOverview}</p>
                              </div>

                              {/* Problem & Solution Sections */}
                              <div className="grid md:grid-cols-2 gap-6">
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 }}
                                  className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6"
                                >
                                  <h4 className="text-lg font-semibold flex items-center gap-2 mb-3 text-blue-700 dark:text-blue-300">
                                    <Target className="h-5 w-5" />
                                    The Challenge
                                  </h4>
                                  <p className="text-gray-700 dark:text-gray-300">{currentProject.problem}</p>
                                </motion.div>

                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.2 }}
                                  className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6"
                                >
                                  <h4 className="text-lg font-semibold flex items-center gap-2 mb-3 text-green-700 dark:text-green-300">
                                    <Lightbulb className="h-5 w-5" />
                                    Our Approach
                                  </h4>
                                  <p className="text-gray-700 dark:text-gray-300">{currentProject.solution}</p>
                                </motion.div>
                              </div>

                              {/* Deliverables Section */}
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border-l-4 border-apex-red"
                              >
                                <h4 className="text-lg font-semibold flex items-center gap-2 mb-4 text-apex-red">
                                  <CheckCircle2 className="h-5 w-5" />
                                  Key Deliverables
                                </h4>
                                <ul className="space-y-4">
                                  {currentProject.deliverables.map((deliverable, index) => (
                                    <motion.li
                                      key={index}
                                      className="flex items-start"
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.3 + index * 0.1 }}
                                    >
                                      <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-3 flex-shrink-0 mt-0.5">
                                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                                      </div>
                                      <span className="text-gray-700 dark:text-gray-300">{deliverable}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </motion.div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      <div className="flex justify-center">
                        <Button asChild size="lg" className="bg-gray-800 hover:bg-gray-700">
                          <Link href="/contact" className="flex items-center gap-2">
                            Inquire About This Service <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  </TabsContent>
                ))}
              </AnimatePresence>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
