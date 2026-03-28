"use client"
import { useState } from "react";   
import { ScrollReveal, StaggerContainer, StaggerItem } from "../components/ScrollReveal";

const Portfolio = () => {
  const [spotlightProject, setSpotlightProject] = useState(null);
  const [isBrainstorming, setIsBrainstorming] = useState(false);
  const [projectsList, setProjectsList] = useState([
    { title: "Finance Dashboard", tech: "React / D3" },
    { title: "E-Commerce", tech: "Next.js" },
    { title: "AI Wrapper", tech: "Python" },
    { title: "Chat App", tech: "Socket.io" },
    { title: "3D Portfolio", tech: "Three.js" }
  ]);

  const generateAIProject = async () => {
    setIsBrainstorming(true);
    const prompt = `You are a visionary tech architect. Invent a highly creative, futuristic, and impressive web development project concept for a portfolio. 
    Return ONLY a valid JSON object with exactly these two keys: 
    "title" (e.g., "Quantum Data Visualizer", max 4 words)
    "tech" (e.g., "React / WebGL", max 3 technologies)`;

    const response = await callGemini(prompt);

    try {
      const cleanJson = response.replace(/```json/g, '').replace(/```/g, '').trim();
      const project = JSON.parse(cleanJson);
      
      setSpotlightProject(project);
      setProjectsList([project, ...projectsList]);
    } catch (e) {
      console.error("AI Gen Failed");
    }
    setIsBrainstorming(false);
  };

  return (
    <section id="portfolio" className="py-24 bg-[#0b1120] relative overflow-hidden z-10 border-y border-white/5">
      <ScrollReveal className="max-w-7xl mx-auto px-4 mb-16 text-center">
          <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">Portfolio</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight mb-6">Featured Projects</h3>
          <button onClick={generateAIProject} disabled={isBrainstorming} className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30 rounded-full font-mono text-xs transition-colors shadow-lg shadow-blue-500/10 group">
              <i className={`fas ${isBrainstorming ? 'fa-spinner fa-spin' : 'fa-magic group-hover:animate-pulse'}`}></i> {isBrainstorming ? 'Brainstorming...' : '✨ Brainstorm Custom Concept'}
          </button>
      </ScrollReveal>

      {spotlightProject && (
        <div className={`max-w-md mx-auto mb-12 transform transition-all duration-500 ${isBrainstorming ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
             <div className="glass-card p-6 rounded-xl border border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)] bg-[#0f172a] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[50px]"></div>
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-[10px] font-bold uppercase tracking-widest border border-blue-500/30">✨ AI Concept</span>
                  </div>
                  <div className="h-32 bg-[#010409] mb-4 rounded-lg flex items-center justify-center relative overflow-hidden border border-white/5">
                      <i className="fas fa-cube text-4xl text-blue-500/50"></i>
                      <div className="absolute inset-0 bg-blue-500/5 animate-pulse"></div>
                  </div>
                  <div className="flex justify-between items-end relative z-10">
                      <h3 className="font-bold text-white text-lg tracking-wide">{spotlightProject.title}</h3>
                      <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded">{spotlightProject.tech}</span>
                  </div>
              </div>
        </div>
      )}

      {/* Marquee Row 1 */}
      <div className="w-full overflow-hidden mb-8 relative flex">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0b1120] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0b1120] to-transparent z-10"></div>
          <div className="flex w-max animate-scroll-left hover:pause">
              {[...projectsList, ...projectsList, ...projectsList].map((p, idx) => (
                  <div key={idx} className="flex-shrink-0 mx-3 w-[280px] glass-card p-5 rounded-xl hover:border-blue-500/50 transition-all cursor-pointer group">
                      <div className="h-32 bg-[#0f172a] mb-4 rounded-lg flex items-center justify-center relative overflow-hidden"><i className="fas fa-layer-group text-3xl text-slate-700 group-hover:text-blue-500 transition-colors"></i></div>
                      <div className="flex justify-between items-end"><h3 className="font-bold text-white text-sm tracking-wide">{p.title}</h3><span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded">{p.tech}</span></div>
                  </div>
              ))}
          </div>
      </div>
      
      {/* Marquee Row 2 */}
      <div className="w-full overflow-hidden relative flex">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0b1120] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0b1120] to-transparent z-10"></div>
          <div className="flex w-max animate-scroll-right hover:pause">
              {[...projectsList].reverse().concat([...projectsList].reverse(), [...projectsList].reverse()).map((p, idx) => (
                  <div key={idx} className="flex-shrink-0 mx-3 w-[280px] glass-card p-5 rounded-xl hover:border-blue-500/50 transition-all cursor-pointer group">
                      <div className="h-32 bg-[#0f172a] mb-4 rounded-lg flex items-center justify-center relative overflow-hidden"><i className="fas fa-layer-group text-3xl text-slate-700 group-hover:text-blue-500 transition-colors"></i></div>
                      <div className="flex justify-between items-end"><h3 className="font-bold text-white text-sm tracking-wide">{p.title}</h3><span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded">{p.tech}</span></div>
                  </div>
              ))}
          </div>
      </div>
    </section>
  );
};

export default Portfolio;