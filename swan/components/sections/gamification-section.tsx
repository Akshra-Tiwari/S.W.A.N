"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Star, Trophy, Medal } from "lucide-react"

const features = [
  { icon: Star, title: "Points per Report", description: "Earn points for every contribution" },
  { icon: Trophy, title: "Leaderboard", description: "Compete with other citizens" },
  { icon: Medal, title: "Achievement Badges", description: "Unlock exclusive badges" },
]

const badges = [
  { name: "Lake Guardian", emoji: "🥉", color: "from-amber-600 to-amber-700" },
  { name: "Eco Warrior", emoji: "🌊", color: "from-slate-400 to-slate-600" },
  { name: "City Protector", emoji: "🏆", color: "from-yellow-500 to-yellow-600" },
]

const leaderboard = [
  { rank: 1, name: "Priya Sharma", points: 2450 },
  { rank: 2, name: "Arjun Kumar", points: 2180 },
  { rank: 3, name: "Ananya Patel", points: 1920 },
]

export function GamificationSection() {
  return (
    <section
      id="community"
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cyan-50 to-teal-50 dark:from-slate-800 dark:to-slate-700"
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
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Earn Points. Win Badges. Protect Lakes.
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Engage with the community and celebrate your conservation efforts
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-8 bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <feature.icon className="h-12 w-12 text-teal-600 dark:text-teal-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-white dark:bg-slate-800 border-0 shadow-lg">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Achievement Badges</h3>
              <div className="flex justify-around items-center">
                {badges.map((badge) => (
                  <motion.div key={badge.name} className="flex flex-col items-center gap-2" whileHover={{ scale: 1.1 }}>
                    <div
                      className={`w-20 h-20 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center text-4xl shadow-lg`}
                    >
                      {badge.emoji}
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white text-center">{badge.name}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-white dark:bg-slate-800 border-0 shadow-lg">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Top Contributors</h3>
              <div className="space-y-4">
                {leaderboard.map((entry) => (
                  <motion.div
                    key={entry.rank}
                    className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-slate-700 dark:to-slate-600 hover:shadow-md transition-shadow"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold">
                        {entry.rank}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">{entry.name}</p>
                    </div>
                    <div className="text-lg font-bold text-cyan-600 dark:text-cyan-400">{entry.points}</div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
