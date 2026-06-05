"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { List, Sliders, BarChart3 } from "lucide-react"

const insightCards = [
  {
    icon: List,
    title: "Citizen Reports List",
    description: "View all submitted reports organized by priority and date",
  },
  {
    icon: Sliders,
    title: "Smart Filters",
    description: "Filter by lake, issue type, and date range for targeted insights",
  },
  {
    icon: BarChart3,
    title: "Visual Trends",
    description: "Track patterns and trends in lake health over time",
  },
]

export function InsightsSection() {
  return (
    <section
      id="insights"
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
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Smarter Insights for Faster Action</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Data-driven dashboard to help authorities prioritize and respond
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {insightCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-8 bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <card.icon className="h-12 w-12 text-cyan-600 dark:text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{card.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{card.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Analytics Dashboard Preview */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 bg-white dark:bg-slate-800 border-0 shadow-xl">
            <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">Analytics Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Bar Chart Mockup */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Top Polluted Lakes</h4>
                <div className="space-y-2">
                  {["Van Vihar", "Arera", "Kolar"].map((lake, i) => (
                    <div key={lake} className="flex items-end gap-2">
                      <span className="text-xs text-gray-600 dark:text-gray-400 w-12">{lake}</span>
                      <div
                        className="flex-1 h-6 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-sm"
                        style={{ width: `${100 - i * 20}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pie Chart Mockup */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Issue Types Distribution
                </h4>
                <div className="flex justify-center items-center h-32">
                  <div className="relative w-24 h-24 rounded-full bg-gradient-conic from-red-500 via-yellow-500 to-green-500"></div>
                </div>
                <div className="text-xs space-y-1 mt-4">
                  <p className="text-gray-600 dark:text-gray-400">🔴 45% Pollution</p>
                  <p className="text-gray-600 dark:text-gray-400">🟡 35% Encroachment</p>
                  <p className="text-gray-600 dark:text-gray-400">🟢 20% Clean</p>
                </div>
              </div>

              {/* Trend Line */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Health Trend</h4>
                <svg className="w-full h-24" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="5,35 25,20 45,25 65,10 85,15" stroke="#06B6D4" strokeWidth="2" fill="none" />
                  <path d="M5,35 Q25,20 45,25 T85,15 L85,40 L5,40 Z" fill="#06B6D4" opacity="0.1" />
                </svg>
                <p className="text-xs text-green-600 dark:text-green-400 font-semibold">↑ 12% Improvement</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
