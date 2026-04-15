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

          <div className="hidden md:flex items-center space-x-6">
            <a href="#login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Login</a>
            <a href="#contact" className="px-5 py-2.5 bg-white text-black hover:bg-gray-200 rounded-full text-sm font-bold transition-all shadow-lg shadow-white/10">
                Sign Up
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