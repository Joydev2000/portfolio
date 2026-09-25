"use client"
import { useState } from "react";

const Header = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 glass-panel border-b-0 border-b-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="shrink-0 cursor-pointer">
            <span className="font-display text-2xl font-bold text-white tracking-tight">
              Joy.<span className="text-[#58a6ff]">dev</span>
            </span>
          </div>
          <div className="hidden md:flex flex-1 justify-center relative">
            <div className="flex items-center space-x-8 font-medium bg-[#0d1117]/80 backdrop-blur-md border border-white/10 rounded-full px-8 py-2.5 shadow-lg">
              <a href="#hero" className="bg-[#58a6ff] hover:bg-blue-500 text-white px-5 py-1.5 rounded-full text-sm font-semibold shadow-md transition-colors">Home</a>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm">About</a>
              <a href="#portfolio" className="text-gray-400 hover:text-white transition-colors text-sm">Portfolio</a>
              <a href="#credentials" className="text-gray-400 hover:text-white transition-colors text-sm">Credentials</a>
              <a href="#timeline" className="text-gray-400 hover:text-white transition-colors text-sm">Timeline</a>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://www.linkedin.com/in/joydev-halder/"
              target="_blank"
              rel="noopener noreferrer"
              title="Joydev Halder LinkedIn"
              className="text-sm font-medium text-blue-400 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#0077b5]/30 hover:border-[#0077b5]/60 bg-[#0077b5]/10"
            >
              <i className="fab fa-linkedin text-sm text-[#70b5f9]"></i>
              <span className="text-xs font-semibold">LinkedIn</span>
            </a>
            <a
              href="/JoydevHalder_Cv.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/5"
            >
              <i className="fas fa-file-pdf text-red-400"></i>
              <span>CV</span>
            </a>
            <a
              href="#contact"
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
            >
              Hire Me
            </a>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button type="button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-400 hover:text-white p-2">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#010409]/95 backdrop-blur-xl border-t border-[#30363d]">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <a href="#hero" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-white font-medium">Home</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-400 hover:text-white">About</a>
            <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-400 hover:text-white">Portfolio</a>
            <a href="#credentials" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-400 hover:text-white">Credentials & Skills</a>
            <a href="#timeline" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-400 hover:text-white">Timeline</a>
            <div className="pt-2 flex gap-3">
              <a
                href="/JoydevHalder_Cv.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center py-2 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium flex items-center justify-center gap-2"
              >
                <i className="fas fa-file-pdf text-red-400"></i> Download CV
              </a>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 text-center py-2 px-4 rounded-xl bg-blue-600 text-white text-sm font-semibold flex items-center justify-center"
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header