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
} from "lucide-react"
import PageHeader from "@/components/page-header"
import { motion, AnimatePresence } from "framer-motion"

// Sample service data - replace with actual data
const services = [
  {
    id: "marketing",
    title: "Marketing",
    icon: <Target className="h-5 w-5" />,
    description:
      "Our marketing consulting services help businesses develop and implement effective marketing strategies to reach their target audience and achieve their business goals.",
    caseStudy: {
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
  },
  {
    id: "supply-chain",
    title: "Supply Chain",
    icon: <Puzzle className="h-5 w-5" />,
    description:
      "We help businesses optimize their supply chain operations to improve efficiency, reduce costs, and enhance customer satisfaction.",
    caseStudy: {
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
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    icon: <BarChart4 className="h-5 w-5" />,
    description:
      "Our data analytics services help businesses leverage their data to gain insights, make informed decisions, and drive business growth.",
    caseStudy: {
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
  },
  {
    id: "market-research",
    title: "Market Research",
    icon: <Lightbulb className="h-5 w-5" />,
    description:
      "We provide comprehensive market research services to help businesses understand their target market, competitors, and industry trends.",
    caseStudy: {
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
  },
  {
    id: "growth",
    title: "Growth",
    icon: <TrendingUp className="h-5 w-5" />,
    description:
      "Our growth consulting services help businesses identify and capitalize on opportunities for expansion and revenue growth.",
    caseStudy: {
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
  },
  {
    id: "strategy",
    title: "Strategy",
    icon: <Puzzle className="h-5 w-5" />,
    description:
      "We help businesses develop and implement effective business strategies to achieve their long-term goals and objectives.",
    caseStudy: {
      clientOverview:
        "A second-generation family-owned business in the specialty food manufacturing industry with 30+ years of history, facing changing market dynamics and succession planning challenges.",
      problem:
        "The client needed strategic direction for their next phase of growth amid changing consumer preferences, new distribution channels, and increasing competition from venture-backed startups in their space.",
      solution:
        "We created a 5-year strategic plan with clear milestones and an implementation roadmap. This included diversification strategies, digital transformation initiatives, and organizational restructuring to support future growth.",
      deliverables: [
        "Comprehensive SWOT analysis and market positioning assessment",
        "5-year strategic plan with detailed implementation roadmap",
        "Organizational design recommendations and capability gap analysis",
        "Digital transformation strategy and technology stack recommendations",
        "Succession planning framework and leadership development plan",
      ],
      semester: "W23",
    },
  },
]

// Process steps for the animated process section
const processSteps = [
  {
    number: 1,
    title: "Discovery",
    description:
      "We begin by understanding your business, challenges, and goals through in-depth research and analysis.",
    icon: <Lightbulb className="h-6 w-6" />,
  },
  {
    number: 2,
    title: "Strategy",
    description:
      "We develop a customized strategy and implementation plan tailored to your specific needs and objectives.",
    icon: <Target className="h-6 w-6" />,
  },
  {
    number: 3,
    title: "Execution",
    description:
      "We work alongside your team to implement the strategy, measure results, and make adjustments as needed.",
    icon: <Puzzle className="h-6 w-6" />,
  },
  {
    number: 4,
    title: "Evaluation",
    description: "We measure the impact of our work, identify areas for improvement, and ensure sustainable results.",
    icon: <BarChart4 className="h-6 w-6" />,
  },
]

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("marketing")

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
          <Tabs defaultValue="marketing" className="w-full" onValueChange={setActiveTab}>
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

                    <Card className="overflow-hidden border-none shadow-lg">
                      <CardContent className="p-0">
                        <div className="bg-gradient-to-r from-apex-red to-red-700 p-4 text-white">
                          <h3 className="text-xl font-bold">Case Study</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>Project Semester: {service.caseStudy.semester}</span>
                          </div>
                        </div>

                        <div className="p-6 space-y-8">
                          {/* Client Overview Section */}
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                            <h4 className="text-lg font-semibold flex items-center gap-2 mb-3">
                              <Users className="h-5 w-5 text-apex-red" />
                              Client Overview
                            </h4>
                            <p>{service.caseStudy.clientOverview}</p>
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
                              <p className="text-gray-700 dark:text-gray-300">{service.caseStudy.problem}</p>
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
                              <p className="text-gray-700 dark:text-gray-300">{service.caseStudy.solution}</p>
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
                              {service.caseStudy.deliverables.map((deliverable, index) => (
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

          {/* Animated Process Section */}
          <div className="mt-24">
            <h2 className="text-2xl font-bold mb-12 text-center">Our Consulting Process</h2>
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
                        className={`text-6xl font-bold text-gray-100 dark:text-gray-800 ${index % 2 === 0 ? "text-left" : "text-right"}`}
                      >
                        {step.number}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}