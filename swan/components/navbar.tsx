"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Map, LayoutDashboard, Home, FileText } from "lucide-react"
import { AuthModal } from "@/components/auth-modal"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import NotificationBell
from "@/components/NotificationBell"
const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Map", href: "/map", icon: Map },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
]

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false)
    router.push(href)
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button onClick={() => handleLinkClick("/")} className="flex items-center gap-2 group">
              <div className="w-10 h-10 lg:w-12 lg:h-12 relative transition-transform group-hover:scale-110 rounded-full overflow-hidden">
                <Image
                  src="swan-logo.png"
                  alt="S.W.A.N. Protocol Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">S.W.A.N.</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.href)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2 flex items-center gap-2 ${
                      isActive(link.href)
                        ? "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300"
                        : isScrolled
                          ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          : "text-gray-800 dark:text-white hover:bg-white/20 dark:hover:bg-black/20"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </button>
                )
              })}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Button
                onClick={() => router.push("/#report")}
                variant="outline"
                className="border-cyan-600 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2 gap-2"
              >
                <FileText className="h-4 w-4" />
                Submit Report
              </Button>
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2"
              >
                Login
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-linear-to-br from-white to-cyan-50 dark:from-slate-900 dark:to-slate-800 shadow-2xl z-50 lg:hidden overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl font-bold text-cyan-600">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6 text-cyan-600" />
                  </button>
                </div>

                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <button
                        key={link.name}
                        onClick={() => handleLinkClick(link.href)}
                        className={`px-4 py-3 rounded-lg text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 flex items-center gap-3 ${
                          isActive(link.href)
                            ? "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 shadow-md"
                            : "text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {link.name}
                      </button>
                    )
                  })}
                </nav>

                <div className="mt-8 pt-8 border-t border-cyan-200 dark:border-cyan-800 flex flex-col gap-3">
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      router.push("/#report")
                    }}
                    variant="outline"
                    className="w-full border-cyan-600 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 gap-2 justify-start"
                  >
                    <FileText className="h-4 w-4" />
                    Submit Report
                  </Button>
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      setIsAuthModalOpen(true)
                    }}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                  >
                    Login
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <NotificationBell>
      </NotificationBell>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}
