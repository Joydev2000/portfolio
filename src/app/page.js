import Hero from "./Layout/Hero";
import About from "./Layout/About";
import Portfolio from "./Layout/Portfolio";
import Credentials from "./Layout/Credentials";
import Timeline from "./Layout/Timeline";
import Contact from "./Layout/Contact";



export default function Home() {
  return (
   <>
         <div className="bg-[#010409] text-[#c9d1d9] font-['Inter',_sans-serif] selection:bg-[#58a6ff] selection:text-white overflow-x-hidden relative min-h-screen">
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
          
          <style dangerouslySetInnerHTML={{__html: `
            ::-webkit-scrollbar { width: 6px; }
            ::-webkit-scrollbar-track { background: #010409; }
            ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 3px; }
            ::-webkit-scrollbar-thumb:hover { background: #58a6ff; }
            
            .glass-panel { background: rgba(13, 17, 23, 0.7); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); }
            .glass-card { background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%); border: 1px solid rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); }
            .text-gradient { background: linear-gradient(to right, #60a5fa, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .timeline-line { background: linear-gradient(to bottom, #3b82f6, #8b5cf6, transparent); }
    
            .token-keyword { color: #ff7b72; font-weight: bold; }
            .token-function { color: #d2a8ff; }
            .token-string { color: #a5d6ff; }
            .token-comment { color: #8b949e; font-style: italic; }
            .token-operator { color: #79c0ff; }
            .token-class { color: #ffa657; }
            
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #30363d; }
            
            @keyframes blob { 0% { transform: translate(0px, 0px) scale(1) } 33% { transform: translate(30px, -50px) scale(1.1) } 66% { transform: translate(-20px, 20px) scale(0.9) } 100% { transform: translate(0px, 0px) scale(1) } }
            .animate-blob { animation: blob 10s infinite; }
            .animation-delay-2000 { animation-delay: 2s; }
            .animation-delay-4000 { animation-delay: 4s; }
            
            @keyframes float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-20px) } }
            .animate-float { animation: float 8s ease-in-out infinite; }
            
            @keyframes scroll-left { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
            .animate-scroll-left { animation: scroll-left 30s linear infinite; }
            @keyframes scroll-right { 0% { transform: translateX(-50%) } 100% { transform: translateX(0) } }
            .animate-scroll-right { animation: scroll-right 30s linear infinite; }
            
            @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            .animate-cursor-blink { animation: blink 1s step-end infinite; }
          `}} />

          {/* Ambient Background Blobs */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] opacity-10 animate-blob"></div>
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>
          </div>
          <Hero />
          <About />
          <Portfolio />
          <Credentials />
          <Timeline />
          <Contact />
        </div>
   </>


  );
}
