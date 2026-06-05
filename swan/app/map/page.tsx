"use client"

import { useState } from "react"

import {
  BhopalLakesMap,
  bhopalLakes,
  type Lake
} from "@/components/bhopal-lakes-map"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import {
  ArrowLeft,
  Droplets,
  TrendingUp,
  TrendingDown,
  AlertTriangle
} from "lucide-react"

import { useRouter } from "next/navigation"

export default function MapPage() {
  const router = useRouter()

  const [selectedLake, setSelectedLake] = useState<Lake | null>(null)

  const getStatusColor = (status?: Lake["healthStatus"]) => {
    switch (status) {
      case "critical":
        return "bg-red-500/10 text-red-700 border-red-500/20"
      case "poor":
        return "bg-amber-500/10 text-amber-700 border-amber-500/20"
      case "moderate":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20"
      case "good":
        return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
      default:
        return "bg-gray-500/10 text-gray-700"
    }
  }

  const getStatusIcon = (status?: Lake["healthStatus"]) => {
    switch (status) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "poor":
        return <TrendingDown className="h-5 w-5 text-amber-500" />
      case "moderate":
        return <Droplets className="h-5 w-5 text-blue-500" />
      case "good":
        return <TrendingUp className="h-5 w-5 text-emerald-500" />
      default:
        return <Droplets className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-50 via-blue-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">

      <div className="container mx-auto px-4 py-8">

        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-600 flex gap-3 items-center">
            <Droplets className="h-10 w-10" />
            Bhopal Lakes Interactive Map
          </h1>

          <p className="text-muted-foreground">
            Explore health status of lakes
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-800/80">
              <CardHeader>
                <CardTitle>Live Map View</CardTitle>
                <CardDescription>Click markers for details</CardDescription>
              </CardHeader>

              <CardContent>
                <BhopalLakesMap onLakeSelect={setSelectedLake} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">

            {/* Selected Lake */}
            {selectedLake ? (
              <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-800/80">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>
                        {selectedLake.name ?? "Unknown Lake"}
                      </CardTitle>

                      <CardDescription>
                        {selectedLake.description ?? "No description available"}
                      </CardDescription>
                    </div>

                    {getStatusIcon(selectedLake.healthStatus)}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">

                  <div>
                    <p className="font-medium mb-2">Health Status</p>
                    <Badge className={getStatusColor(selectedLake.healthStatus)}>
                      {selectedLake.healthStatus ?? "unknown"}
                    </Badge>
                  </div>

                  <div>
                    <p className="font-medium mb-2">Category</p>
                    <p>{selectedLake.category ?? "Uncategorized"}</p>
                  </div>

                  <div>
                    <p className="font-medium mb-2">Issues</p>
                    <ul className="space-y-2">
                      {(selectedLake.issues ?? []).length > 0 ? (
                        selectedLake.issues!.map((issue, index) => (
                          <li key={index} className="text-sm">
                            • {issue}
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-muted-foreground">
                          No issues reported
                        </li>
                      )}
                    </ul>
                  </div>

                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-800/80">
                <CardHeader>
                  <CardTitle>Lake Details</CardTitle>
                  <CardDescription>Select marker</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="text-center py-8">
                    <Droplets className="h-12 w-12 mx-auto opacity-50" />
                    <p>Click a lake marker</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Summary */}
            <Card className="border-0 shadow-xl bg-linear-to-br from-cyan-500 to-blue-600 text-white">
              <CardHeader>
                <CardTitle>Lakes Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Lakes</span>
                  <span>{bhopalLakes?.length ?? 0}</span>
                </div>

                <div className="flex justify-between">
                  <span>Critical</span>
                  <span>
                    {bhopalLakes?.filter(l => l.healthStatus === "critical").length ?? 0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Good</span>
                  <span>
                    {bhopalLakes?.filter(l => l.healthStatus === "good").length ?? 0}
                  </span>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </div>
  )
}