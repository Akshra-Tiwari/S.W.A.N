"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Volume2, MapPin, Users } from "lucide-react"

const features = [
  {
    icon: Volume2,
    title: "Real-time Issue Reporting",
    description: "Report pollution, encroachment, and other issues instantly",
  },
  {
    icon: MapPin,
    title: "Interactive Lake Mapping",
    description: "View comprehensive maps of all Bhopal lakes and their status",
  },
  {
    icon: Users,
    title: "Community-driven Conservation",
    description: "Join thousands of citizens protecting our water bodies",
  },
]

export function WhyMattersSection() {
  return (
    <section
      id="about"
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-cyan-50 dark:from-slate-900 dark:to-slate-800"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Why Protect Our Lakes?</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Bhopal's lakes face threats from pollution, encroachment, and garbage. Communities united can make a real
            difference in lake conservation.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <Card className="p-8 bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <feature.icon className="h-12 w-12 text-cyan-600 dark:text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
