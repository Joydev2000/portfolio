"use client"
import { useState } from "react";

const Header = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 glass-panel border-b-0 border-b-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer">
            <span className="font-display text-2xl font-bold text-white tracking-tight">
              Dev<span className="text-[#58a6ff]">.Nexus</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 font-medium">
              <a href="#hero" className="hover:text-white transition-colors text-sm">Home</a>
              <a href="#about" className="hover:text-white transition-colors text-sm">About</a>
              <a href="#portfolio" className="hover:text-white transition-colors text-sm">Portfolio</a>
              <a href="#credentials" className="hover:text-white transition-colors text-sm">Credentials</a>
              <a href="#timeline" className="hover:text-white transition-colors text-sm">Timeline</a>
              <a href="#contact" className="px-5 py-2.5 bg-[#58a6ff] hover:bg-blue-500 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-500/20">
                  Contact Me
              </a>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button type="button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-400 hover:text-white p-2">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#010409] border-t border-[#30363d]">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <a href="#hero" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-white font-medium">Home</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-400 hover:text-white">About</a>
            <a href="#credentials" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-400 hover:text-white">Credentials</a>
            <a href="#timeline" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-400 hover:text-white">Timeline</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-blue-400 font-semibold">Contact Me</a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header