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

// Sample service data with multiple projects per service
const services = [
  {
    id: "marketing",
    title: "Marketing",
    icon: <Target className="h-5 w-5" />,
    description:
      "Our marketing consulting services help businesses develop and implement effective marketing strategies to reach their target audience and achieve their business goals.",
    projects: [
      {
        id: "retail-chain",
        title: "Regional Retail Chain",
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
        semester: "F23",
      },
      {
        id: "food-startup",
        title: "Food Delivery Startup",
        clientOverview:
          "An emerging food delivery startup targeting college campuses, facing challenges with customer acquisition and retention.",
        problem:
          "The client had a strong product but struggled with high customer acquisition costs and low retention rates. They needed a cost-effective marketing strategy to build brand awareness and loyalty among college students.",
        solution:
          "We developed a campus ambassador program and guerrilla marketing strategy that leveraged student networks and campus events. We also created a referral program and loyalty system to improve retention.",
        deliverables: [
          "Campus ambassador program structure and recruitment guide",
          "Guerrilla marketing campaign calendar for key campus events",
          "Social media content strategy focused on user-generated content",
          "Referral program design with incentive structure",
          "Customer retention analysis and loyalty program recommendations",
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
        id: "manufacturing-startup",
        title: "Sustainable Manufacturing Startup",
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
        semester: "W24",
      },
      {
        id: "grocery-chain",
        title: "Regional Grocery Chain",
        clientOverview:
          "A family-owned grocery chain with 12 locations facing increased competition from national chains and online grocery services.",
        problem:
          "The client was experiencing inventory management issues, with frequent stockouts of popular items and excess inventory of slow-moving products. Their outdated supply chain processes were increasing costs and affecting customer satisfaction.",
        solution:
          "We implemented a demand forecasting system and just-in-time inventory management approach. We also optimized their distribution network and negotiated better terms with key suppliers.",
        deliverables: [
          "Demand forecasting model with seasonal adjustments",
          "Inventory optimization strategy with reorder point recommendations",
          "Distribution network analysis and optimization plan",
          "Supplier negotiation strategy and key performance indicators",
          "Staff training program for new inventory management processes",
        ],
        semester: "F22",
      },
    ],
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    icon: <BarChart4 className="h-5 w-5" />,
    description:
      "Our data analytics services help businesses leverage their data to gain insights, make informed decisions, and drive business growth.",
    projects: [
      {
        id: "ecommerce-platform",
        title: "E-commerce Platform",
        clientOverview:
          "A mid-sized e-commerce platform specializing in niche hobby products with over 50,000 monthly active users and 10,000+ SKUs.",
        problem:
          "Despite collecting vast amounts of customer data, the client was unable to effectively use this information for personalization. Their generic approach to marketing and product recommendations was resulting in low conversion rates and decreasing customer engagement.",
        solution:
          "We implemented advanced analytics tools and developed a customer segmentation model based on purchasing behavior, browsing patterns, and demographic information. This enabled targeted marketing campaigns and personalized product recommendations.",
        deliverables: [
          "Data architecture assessment and optimization plan",
          "Customer segmentation model with actionable personas",
          "Predictive analytics framework for product recommendations",
          "Interactive dashboard for real-time performance monitoring",
          "Data-driven marketing playbook with campaign templates",
        ],
        semester: "F23",
      },
      {
        id: "healthcare-provider",
        title: "Healthcare Provider Network",
        clientOverview:
          "A network of urgent care clinics seeking to optimize operations and improve patient satisfaction through data-driven insights.",
        problem:
          "The client had accumulated years of operational and patient data but lacked the analytical capabilities to extract meaningful insights. They were experiencing inconsistent wait times and resource allocation issues across their locations.",
        solution:
          "We developed a comprehensive analytics framework that integrated patient flow data, staffing information, and satisfaction metrics. This allowed for predictive modeling of peak times and optimal resource allocation.",
        deliverables: [
          "Integrated data warehouse architecture design",
          "Patient flow analysis with peak time predictions",
          "Staff scheduling optimization model",
          "Real-time dashboard for clinic managers",
          "Predictive analytics model for resource planning",
        ],
        semester: "W23",
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
        id: "tech-startup",
        title: "Healthcare Tech Startup",
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
        semester: "W24",
      },
      {
        id: "fitness-brand",
        title: "Fitness Equipment Brand",
        clientOverview:
          "An established fitness equipment manufacturer looking to expand into the home fitness market with a new product line.",
        problem:
          "The client needed to understand consumer preferences, price sensitivity, and competitive positioning in the rapidly evolving home fitness market before finalizing their product development and marketing strategy.",
        solution:
          "We conducted comprehensive market research including consumer surveys, focus groups, and competitive analysis. We also analyzed market trends and distribution channel opportunities to inform their market entry strategy.",
        deliverables: [
          "Consumer preference analysis with key product feature recommendations",
          "Price sensitivity study and optimal price point analysis",
          "Competitive positioning map and differentiation strategy",
          "Distribution channel analysis and recommendations",
          "Market sizing and growth projections by segment",
        ],
        semester: "F22",
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
        id: "saas-company",
        title: "Project Management SaaS",
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
        semester: "F22",
      },
      {
        id: "local-restaurant",
        title: "Restaurant Chain Expansion",
        clientOverview:
          "A successful local restaurant with two locations looking to expand regionally while maintaining their brand identity and food quality.",
        problem:
          "The client had achieved success with their existing locations but lacked a systematic approach to scaling their operations. They needed guidance on location selection, operational standardization, and financing options for expansion.",
        solution:
          "We developed a comprehensive expansion strategy that included location analysis, operational scaling, and financial planning. We also created systems to maintain consistency across locations while preserving their unique brand identity.",
        deliverables: [
          "Market analysis and location selection criteria",
          "Operations manual and training program for new locations",
          "Financial modeling and funding options analysis",
          "Brand consistency guidelines and quality control systems",
          "Phased expansion timeline with key milestones",
        ],
        semester: "W23",
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
          "The client approached APEX without a standardized pricing model, relying on manual quotes for each customer, resulting in delayed estimates and client confusion over pricing rationale.",
        solution:
          "APEX employed a three-pronged approach—background research, pricing model development, and testing/recommendation. The team began by analyzing the client’s complex product portfolio and current pricing practices, then studied competitor case studies, customer data, and conducted expert interviews to assess industry trends. Based on these insights, APEX developed a comprehensive pricing model and a standardized calculator for the client’s website.",
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
      {
        id: "nonprofit-organization",
        title: "Educational Nonprofit",
        clientOverview:
          "A nonprofit organization focused on STEM education for underserved communities, seeking to expand their impact while ensuring financial sustainability.",
        problem:
          "The client had a successful program model but was struggling with funding diversification, operational efficiency, and measuring their impact effectively. They needed a strategic plan to scale their programs while building organizational capacity.",
        solution:
          "We developed a comprehensive strategic plan that included funding diversification, operational optimization, and impact measurement frameworks. We also created a board development strategy and volunteer management system.",
        deliverables: [
          "Funding diversification strategy with revenue stream analysis",
          "Program scaling model with resource requirements",
          "Impact measurement framework and reporting templates",
          "Board development plan and governance recommendations",
          "3-year strategic roadmap with implementation timeline",
        ],
        semester: "F23",
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
    marketing: "retail-chain",
    "process-optimization": "manufacturing-startup",
    "data-analytics": "ecommerce-platform",
    "market-research": "tech-startup",
    growth: "saas-company",
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
          "Apex Consulting Group offers a wide range of consulting services to help businesses achieve their goals.",
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
