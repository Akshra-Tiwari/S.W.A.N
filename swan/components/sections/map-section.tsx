"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { BhopalLakesMap, bhopalLakes, type Lake } from "@/components/bhopal-lakes-map"
import { useState } from "react"

const legendItems = [
  { color: "bg-red-500", label: "Critical - Severe Pollution", icon: "🔴", status: "critical" },
  { color: "bg-amber-500", label: "Poor - Treatment Required", icon: "🟠", status: "poor" },
  { color: "bg-blue-500", label: "Moderate - Maintenance Needed", icon: "🔵", status: "moderate" },
  { color: "bg-green-500", label: "Good - Relatively Clean", icon: "🟢", status: "good" },
]

export function MapSection() {
  const [selectedLake, setSelectedLake] = useState<Lake | null>(null)

  return (
    <section id="map-section" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Bhopal Lakes Health Status</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Real-time map showing the health status of Bhopal's major water bodies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <BhopalLakesMap onLakeSelect={setSelectedLake} />
          </motion.div>

          {/* Legend and Popup Info */}
          <div className="space-y-6">
            {/* Legend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-white dark:bg-slate-800 border-0 shadow-lg">
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Health Status Legend</h3>
                <div className="space-y-3">
                  {legendItems.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-white dark:bg-slate-800 border-0 shadow-lg">
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
                  {selectedLake ? "Selected Lake" : "Lake Information"}
                </h3>
                {selectedLake ? (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Lake Name</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{selectedLake.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Health Status</p>
                      <p className="font-semibold text-gray-900 dark:text-white capitalize">
                        {selectedLake.healthStatus}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{selectedLake.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Key Issues</p>
                      <ul className="text-xs text-gray-700 dark:text-gray-300 list-disc list-inside mt-1">
                        {selectedLake.issues.slice(0, 2).map((issue, idx) => (
                          <li key={idx}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{selectedLake.lastUpdated}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <p>Click on any marker on the map to view detailed information about that lake's health status.</p>
                    <p className="text-xs">
                      <strong>Total Lakes Monitored:</strong> {bhopalLakes.length}
                    </p>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
