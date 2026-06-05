"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, User, Building2 } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [emailOrPhone, setEmailOrPhone] = useState("")
  const [userType, setUserType] = useState<"citizen" | "government" | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
const { login } = useAuth();
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const handleGoogleSignIn = async () => {
  if (!userType) {
    setError("Please select a user type");
    return;
  }

  try {
    setIsLoading(true);
    setError(null);

    localStorage.setItem(
      "userType",
      userType
    );

    await login();

    onClose();
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Google sign in failed"
    );
  } finally {
    setIsLoading(false);
  }
};

  const handleContinue = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  setError(
    "Use Google Sign In for now."
  );
};

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative"
              role="dialog"
              aria-modal="true"
              aria-labelledby="auth-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>

              {/* Header */}
              <div className="mb-6">
                <h2 id="auth-modal-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Sign in to S.W.A.N.
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Join the community protecting Bhopal's lakes</p>
              </div>

              <div className="mb-6">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">I am a</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserType("citizen")}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                      userType === "citizen"
                        ? "border-cyan-600 bg-cyan-50 dark:bg-cyan-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <User className={`w-8 h-8 mb-2 ${userType === "citizen" ? "text-cyan-600" : "text-gray-400"}`} />
                    <span
                      className={`text-sm font-medium ${userType === "citizen" ? "text-cyan-600" : "text-gray-700 dark:text-gray-300"}`}
                    >
                      Citizen
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("government")}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                      userType === "government"
                        ? "border-cyan-600 bg-cyan-50 dark:bg-cyan-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <Building2
                      className={`w-8 h-8 mb-2 ${userType === "government" ? "text-cyan-600" : "text-gray-400"}`}
                    />
                    <span
                      className={`text-sm font-medium ${userType === "government" ? "text-cyan-600" : "text-gray-700 dark:text-gray-300"}`}
                    >
                      Government Official
                    </span>
                  </button>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleContinue} className="space-y-4">
                <div>
                  <Label htmlFor="email-phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email or Phone
                  </Label>
                  <Input
                    id="email-phone"
                    type="text"
                    placeholder="Enter your email or phone"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="mt-1.5 h-11 focus-visible:ring-cyan-600"
                    aria-required="true"
                    disabled={isLoading}
                  />
                </div>

                <Button
                  className="w-full h-11 bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={!userType || isLoading}
                >
                  {isLoading ? "Loading..." : "Continue"}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-slate-900 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* OAuth buttons */}
              <Button
                variant="outline"
                className="w-full h-11 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                disabled={!userType || isLoading}
                onClick={handleGoogleSignIn}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isLoading ? "Loading..." : "Sign in with Google"}
              </Button>

              {/* Footer links */}
              <div className="mt-6 text-center space-y-2">
                <button className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 rounded px-1">
                  Forgot password?
                </button>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <button className="text-cyan-600 dark:text-cyan-400 hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 rounded px-1">
                    Create account
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
