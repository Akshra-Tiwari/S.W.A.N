"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { MapPin, CheckSquare, Edit3, Camera, Upload, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"

const steps = [
  { icon: MapPin, label: "Select Lake" },
  { icon: CheckSquare, label: "Choose Issue Type" },
  { icon: Edit3, label: "Add Details" },
  { icon: Camera, label: "Upload Photo" },
]

const lakes = [
  "Upper Lake (Bada Talab)",
  "Lower Lake (Chhota Talab)",
  "Van Vihar Lake",
  "Shahpura Lake",
  "Hathaikheda Lake",
  "Kaliasot Lake",
  "Other",
]

const issueTypes = ["Pollution", "Encroachment", "Maintenance"]

export function ReportProcessSection() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageRemove = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDropZoneClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <section id="report" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-cyan-50 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Report Issues in Minutes</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Simple, intuitive process to help protect our lakes
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></div>
              )}

              <Card className="p-6 bg-white dark:bg-slate-700 border-0 text-center relative z-10 shadow-lg">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 mb-4 mx-auto">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">{step.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Form Mockup */}
        <motion.div
          className="mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 bg-white dark:bg-slate-700 border-0 shadow-xl">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Report Form Preview</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name of Lake</label>
                <select className="w-full h-10 px-3 bg-white dark:bg-slate-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                  <option value="">Select a lake...</option>
                  {lakes.map((lake) => (
                    <option key={lake} value={lake}>
                      {lake}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Issue Type</label>
                <div className="flex gap-2">
                  {issueTypes.map((type) => (
                    <label
                      key={type}
                      className="flex-1 h-10 flex items-center justify-center bg-gray-100 dark:bg-slate-600 hover:bg-cyan-50 dark:hover:bg-slate-500 rounded-lg cursor-pointer transition-colors border-2 border-transparent hover:border-cyan-400"
                    >
                      <input type="radio" name="issueType" value={type} className="sr-only" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <Textarea
                  placeholder="Describe the issue in detail..."
                  className="w-full min-h-20 bg-white dark:bg-slate-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Photo</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />

                {!previewUrl ? (
                  <div
                    onClick={handleDropZoneClick}
                    className="w-full h-24 border-2 border-dashed border-cyan-300 dark:border-cyan-700 rounded-lg flex items-center justify-center cursor-pointer hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-slate-600 transition-colors"
                  >
                    <div className="text-center">
                      <Upload className="h-6 w-6 mx-auto mb-1 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">Click to upload image</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-48 border-2 border-cyan-300 dark:border-cyan-700 rounded-lg overflow-hidden">
                    <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={handleImageRemove}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
