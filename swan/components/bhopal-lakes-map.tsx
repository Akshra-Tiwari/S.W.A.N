"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"

export interface Lake {
  id: string
  name: string
  position: [number, number]
  healthStatus: "critical" | "poor" | "moderate" | "good"
  category: string
  issues: string[]
  lastUpdated: string
  description: string
}

const bhopalLakes: Lake[] = [
  {
    id: "upper-lake",
    name: "Upper Lake (Bhoj Wetland)",
    position: [23.2815, 77.3604],
    healthStatus: "poor",
    category: "Category B - Outdoor Bathing Only",
    issues: [
      "High coliform bacteria (24000/mL in summer)",
      "Not fit for drinking without treatment",
      "Eutrophication risk",
    ],
    lastUpdated: "2024",
    description: "Major water source for Bhopal, significant pollution from anthropogenic activities and sewage",
  },
  {
    id: "lower-lake",
    name: "Lower Lake",
    position: [23.2345, 77.3738],
    healthStatus: "critical",
    category: "Category C - Treatment Required",
    issues: [
      "50+ million liters untreated sewage daily",
      "Heavy metals from idol immersions",
      "Solid waste dumping",
      "Microplastics present",
      "High BOD & COD levels",
    ],
    lastUpdated: "2024",
    description: "Heavily polluted with 28 drains discharging sewage, urgent restoration needed",
  },
  {
    id: "shahpura-lake",
    name: "Shahpura Lake",
    position: [23.1896, 77.4438],
    healthStatus: "moderate",
    category: "Moderate Pollution",
    issues: ["Encroachment issues", "Maintenance needed"],
    lastUpdated: "2024",
    description: "Smaller lake with moderate pollution levels, requires regular maintenance",
  },
  {
    id: "hathaikheda-lake",
    name: "Hathaikheda Dam",
    position: [23.0833, 77.3167],
    healthStatus: "moderate",
    category: "Moderate Status",
    issues: ["Seasonal water quality fluctuation", "Agricultural runoff"],
    lastUpdated: "2024",
    description: "Dam reservoir with moderate water quality concerns",
  },
  {
    id: "kerwa-dam",
    name: "Kerwa Dam",
    position: [23.1167, 77.2833],
    healthStatus: "good",
    category: "Relatively Clean",
    issues: ["Minor maintenance needed"],
    lastUpdated: "2024",
    description: "Relatively cleaner water source with fewer pollution issues",
  },
]

interface BhopalLakesMapProps {
  onLakeSelect?: (lake: Lake) => void
}

export function BhopalLakesMap({ onLakeSelect }: BhopalLakesMapProps) {
  const [isMounted, setIsMounted] = useState(false)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const containerIdRef = useRef(`bhopal-map-${Math.random().toString(36).substring(7)}`)

  useEffect(() => {
    setIsMounted(true)

    return () => {
      // Clean up markers
      markersRef.current.forEach((marker) => {
        try {
          if (marker && marker.remove) {
            marker.remove()
          }
        } catch (e) {
          // Ignore cleanup errors
        }
      })
      markersRef.current = []

      // Clean up map
      if (mapRef.current) {
        try {
          mapRef.current.remove()
          mapRef.current = null
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return

    let L: any
    let map: any

    const initMap = async () => {
      // Import Leaflet
      L = (await import("leaflet")).default

      // Fix for default marker icon issue in Next.js
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })

      // Initialize map
      const container = document.getElementById(containerIdRef.current)
      if (!container) return

      // If map already exists, don't reinitialize
      if (mapRef.current) return

      // Check if container already has a map instance
      if ((container as any)._leaflet_id) {
        return
      }

      map = L.map(containerIdRef.current).setView([23.2315, 77.3604], 11)
      mapRef.current = map

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      // Helper function to get marker color
      const getMarkerColor = (status: Lake["healthStatus"]) => {
        switch (status) {
          case "critical":
            return "#EF4444"
          case "poor":
            return "#F59E0B"
          case "moderate":
            return "#3B82F6"
          case "good":
            return "#10B981"
          default:
            return "#6B7280"
        }
      }

      // Helper function to create custom icon
      const createCustomIcon = (status: Lake["healthStatus"]) => {
        const color = getMarkerColor(status)
        const svgIcon = `
          <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.163 0 0 7.163 0 16c0 8.837 16 26 16 26s16-17.163 16-26c0-8.837-7.163-16-16-16z" fill="${color}"/>
            <circle cx="16" cy="16" r="6" fill="white"/>
          </svg>
        `
        return L.divIcon({
          html: svgIcon,
          className: "custom-marker",
          iconSize: [32, 42],
          iconAnchor: [16, 42],
          popupAnchor: [0, -42],
        })
      }

      // Add markers
      bhopalLakes.forEach((lake) => {
        const marker = L.marker(lake.position, {
          icon: createCustomIcon(lake.healthStatus),
        }).addTo(map)

        const popupContent = `
          <div style="padding: 8px; min-width: 200px;">
            <h3 style="font-weight: bold; font-size: 1.125rem; margin-bottom: 8px;">${lake.name}</h3>
            <div style="font-size: 0.875rem;">
              <p style="margin-bottom: 4px;">
                <strong>Status:</strong> 
                <span style="font-weight: 600; color: ${getMarkerColor(lake.healthStatus)}">
                  ${lake.healthStatus.toUpperCase()}
                </span>
              </p>
              <p style="margin-bottom: 4px;"><strong>Category:</strong> ${lake.category}</p>
              <p style="color: #4B5563; margin-bottom: 8px;">${lake.description}</p>
              <div>
                <strong>Key Issues:</strong>
                <ul style="list-style-type: disc; margin-left: 20px; font-size: 0.75rem; margin-top: 4px;">
                  ${lake.issues
                    .slice(0, 3)
                    .map((issue) => `<li>${issue}</li>`)
                    .join("")}
                </ul>
              </div>
            </div>
          </div>
        `

        marker.bindPopup(popupContent)

        marker.on("click", () => {
          onLakeSelect?.(lake)
        })

        markersRef.current.push(marker)
      })
    }

    initMap()
  }, [isMounted, onLakeSelect])

  if (!isMounted) {
    return (
      <Card className="w-full h-[500px] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border-0 shadow-xl flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
      </Card>
    )
  }

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-xl">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div id={containerIdRef.current} className="w-full h-full" />
    </div>
  )
}

export { bhopalLakes }
