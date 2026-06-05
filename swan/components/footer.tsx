"use client"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-slate-900 dark:bg-slate-950 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left Section - Logo & Tagline */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">S.W.A.N.</h3>
            <p className="text-sm text-gray-400">A citizen-powered initiative to preserve Bhopal's water bodies.</p>
          </div>

          {/* Center Section - Empty for balance */}
          <div></div>

          {/* Right Section - Quick Links */}
          <div className="flex justify-end">
            <nav className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Submit Report
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Map
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                About
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>© {currentYear} S.W.A.N. Protocol - All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
