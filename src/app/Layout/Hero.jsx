"use client"

import { useState, useEffect, useRef } from "react";
import ParticleCanvas from "./ParticleCanvas.jsx";
import callGemini from "../Api/Gemini.js";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../components/ScrollReveal";
import { getAIPrompt} from "../data/aiData";

const Hero = () => {
  const [heroTitle, setHeroTitle] = useState("");
  const [isBlinking, setIsBlinking] = useState(true);
  const [isTitleSelected, setIsTitleSelected] = useState(false);
  
  const [aiPrompt, setAiPrompt] = useState("");
  const [editorCode, setEditorCode] = useState(`
<span class="token-keyword">import</span> React <span class="token-keyword">from</span> <span class="token-string">'react'</span>;

<span class="token-keyword">export default function</span> <span class="token-function">App</span>() {
  <span class="token-keyword">return</span> (
    <span class="token-operator">&lt;</span>div className=<span class="token-string">"future"</span><span class="token-operator">&gt;</span>
       <span class="token-comment">// Ready to build</span>
       <span class="token-function">Hello</span> World
    <span class="token-operator">&lt;/</span>div<span class="token-operator">&gt;</span>
  );
}`);
  const [terminalHistory, setTerminalHistory] = useState([
    { id: 1, type: 'system', html: `Microsoft Windows [Version 10.0.19045.3693]` },
    { id: 2, type: 'system', html: `> dev-nexus@1.0.0 dev<br>> <span class="text-[#58a6ff]">System Online.</span> AI Assistant ready.<br>> Tip: Ask me questions about the dev or to generate code!` }
  ]);
  const terminalEndRef = useRef(null);

  // Typewriter Effect
  useEffect(() => {
    const phrases = ["Creative Web", "User Experience", "Perfect UI"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const typeWriterLoop = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        setHeroTitle("");
        setIsTitleSelected(false);
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        charIndex = 0;
        timeoutId = setTimeout(typeWriterLoop, 500);
      } else {
        if (charIndex <= currentPhrase.length) {
          setHeroTitle(currentPhrase.substring(0, charIndex));
          charIndex++;
          timeoutId = setTimeout(typeWriterLoop, Math.random() * 100 + 50);
        } else {
          setIsBlinking(true);
          timeoutId = setTimeout(() => {
            setIsBlinking(false);
            setIsTitleSelected(true);
            isDeleting = true;
            timeoutId = setTimeout(typeWriterLoop, 300);
          }, 2000);
        }
      }
    };

    typeWriterLoop();
    return () => clearTimeout(timeoutId);
  }, []);

  // Auto-scroll terminal
  // useEffect(() => {
  //   terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [terminalHistory]);

  const handleAIInput = async () => {
    const userPrompt = aiPrompt.trim();
    if (!userPrompt) return;

    setAiPrompt("");
    const newHistory = [...terminalHistory, { id: Date.now(), type: 'user', html: `<span class="text-[#7ee787] font-bold">➜</span> <span class="text-white">${userPrompt}</span>` }];
    setTerminalHistory(newHistory);

    const metaPrompt = getAIPrompt(userPrompt);

    const loadingId = Date.now() + 1;
    setTerminalHistory(prev => [...prev, { id: loadingId, type: 'loading', html: `> AI Processing...` }]);

    const resultStr = await callGemini(metaPrompt);
    
    setTerminalHistory(prev => prev.filter(item => item.id !== loadingId));

    if (!resultStr) {
      setTerminalHistory(prev => [...prev, { id: Date.now() + 2, type: 'error', html: `> Error: Connection failed.` }]);
      return;
    }

    try {
      // Find JSON string using regex in case LLaMA wraps it
      const jsonMatch = resultStr.match(/\{[\s\S]*?\}/);
      if (!jsonMatch) throw new Error("No JSON object found in response");
      
      const response = JSON.parse(jsonMatch[0].replace(/```/g, ''));

      if (response.type === 'chat') {
        setTerminalHistory(prev => [...prev, { id: Date.now() + 3, type: 'ai', html: `> ${response.content}` }]);
      } else {
        setTerminalHistory(prev => [...prev, { id: Date.now() + 4, type: 'success', html: `> Generated "${userPrompt}" successfully. Check editor.` }]);
        
        let formattedCode = response.content
            .replace(/const|let|var|function|return|import|from|export|default|class|extends/g, '<span class="token-keyword">$&</span>')
            .replace(/"(.*?)"/g, '<span class="token-string">"$1"</span>')
            .replace(/'(.*?)'/g, "<span class='token-string'>'$1'</span>")
            .replace(/([a-zA-Z0-9_]+)\(/g, '<span class="token-function">$1</span>(')
            .replace(/<([a-zA-Z0-9]+)/g, '<&lt;<span class="token-class">$1</span>')
            .replace(/<\/([a-zA-Z0-9]+)/g, '&lt;/<span class="token-class">$1</span>')
            .replace(/\/\/(.*)/g, '<span class="token-comment">//$1</span>')
            .replace(/=>/g, '<span class="token-operator">=></span>');
        
        setEditorCode(formattedCode);
      }
    } catch (e) {
      setTerminalHistory(prev => [...prev, { id: Date.now() + 5, type: 'ai', html: `> ${resultStr}` }]);
    }
  };

  return ( 
    <section id="hero" className="min-h-screen flex items-center pt-20 relative z-10 overflow-hidden">
      <ParticleCanvas />

      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 w-full relative z-10 pointer-events-none lg:pt-0 pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <StaggerContainer className="space-y-8 pointer-events-auto">
                <StaggerItem className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                   Open to new opportunities
                </StaggerItem>
                <StaggerItem className="text-5xl md:text-7xl font-display font-bold leading-tight text-white tracking-tight h-[160px] mb-0 md:h-auto flex flex-col justify-center">
                    <span className="text-slate-400 text-3xl md:text-5xl mb-2">Building the</span>
                    <div className="flex items-center h-[50px] md:h-[80PX]">
                        <span className={`px-1 ${isTitleSelected ? 'text-gradient' : 'text-gradient'}`}>
                          {heroTitle}
                        </span>
                        <span className={`w-1 h-10 md:h-16 bg-[#58a6ff] ml-1 ${isBlinking ? 'animate-cursor-blink' : ''}`}></span>
                    </div>
                </StaggerItem>
                <StaggerItem className="text-lg text-slate-400 max-w-lg leading-relaxed font-light">
                   Passionate Frontend Developer experienced in HTML, CSS, JS, React, and WordPress. Dedicated to building smooth, user-centric web experiences and converting complex UI designs into optimized, responsive web pages.
                </StaggerItem>
                <StaggerItem className="flex flex-wrap gap-4 pt-2">
                    <a href="#portfolio" className="px-8 py-3.5 bg-white text-slate-900 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg shadow-white/10">
                        View Work
                    </a>
                    <a href="#contact" className="px-8 py-3.5 glass-panel text-white rounded-full font-semibold hover:bg-white/5 transition-colors border border-white/10">
                        Contact Me
                    </a>
                </StaggerItem>
            </StaggerContainer>

            {/* Authentic VS Code Replica */}
            <ScrollReveal className="relative w-full max-w-xl mx-auto lg:ml-auto animate-float pointer-events-auto" delay={0.3}>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-20"></div>

                <div className="relative bg-[#0d1117] rounded-xl shadow-2xl border border-[#30363d] overflow-hidden flex flex-col font-mono text-sm h-[450px]">

                    {/* Title Bar */}
                    <div className="flex items-center bg-[#010409] border-b border-[#30363d] px-4 py-2 h-10 select-none">
                          <div className="flex space-x-2 mr-4">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                          </div>
                          <div className="flex-1 text-center text-xs text-[#8b949e] font-sans">Joydev — Visual Studio Code</div>
                          <div className="w-14"></div>
                    </div>

                    {/* Workspace */}
                    <div className="flex flex-1 overflow-hidden">
                        {/* Sidebar */}
                        <div className="w-12 bg-[#0d1117] border-r border-[#30363d] flex flex-col items-center py-3 space-y-6 text-[#8b949e] z-10 hidden sm:flex">
                              <div className="relative group cursor-pointer text-[#c9d1d9]">
                                  <i className="far fa-copy text-xl"></i>
                                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#58a6ff] -ml-3.5 h-full"></div>
                              </div>
                              <i className="fas fa-search text-xl hover:text-white transition-colors cursor-pointer"></i>
                              <i className="fas fa-code-branch text-xl hover:text-white transition-colors cursor-pointer"></i>
                              <i className="fas fa-robot text-xl hover:text-white transition-colors text-[#58a6ff] cursor-pointer" title="AI Assistant Active"></i>
                              <div className="flex-1"></div>
                              <i className="fas fa-cog text-xl hover:text-white transition-colors cursor-pointer"></i>
                        </div>

                        {/* Editor Group */}
                        <div className="flex-1 flex flex-col relative bg-[#0d1117]">
                              <div className="flex bg-[#010409] border-b border-[#30363d]">
                                  <div className="px-3 py-2 bg-[#0d1117] text-[#c9d1d9] text-xs border-r border-[#30363d] border-t-2 border-t-[#58a6ff] flex items-center gap-2 min-w-[120px]">
                                    <i className="fab fa-react text-[#61dafb]"></i> App.jsx
                                    <i className="fas fa-times text-[#8b949e] hover:text-white ml-auto text-[10px] cursor-pointer"></i>
                                  </div>
                              </div>

                              <div className="flex-1 overflow-auto flex relative">
                                  <div className="w-12 text-[#8b949e] text-right pr-3 pt-4 border-r border-[#30363d]/50 select-none text-xs leading-6 font-mono opacity-50 bg-[#0d1117]">
                                      1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11
                                  </div>
                                  <div className="flex-1 p-4 pt-4 bg-[#0d1117] overflow-x-auto custom-scrollbar">
                                      <div dangerouslySetInnerHTML={{ __html: editorCode }} className="text-[#c9d1d9] text-xs leading-6 font-mono whitespace-pre w-full" />
                                  </div>
                              </div>

                              {/* Terminal */}
                              <div className="h-36 bg-[#010409] border-t border-[#30363d] flex flex-col">
                                  <div className="flex items-center px-4 py-1 gap-4 text-[10px] text-[#8b949e] border-b border-[#30363d] uppercase tracking-wider font-semibold select-none">
                                      <span className="text-white border-b border-[#58a6ff] pb-[2px]">Terminal</span>
                                      <span className="flex-1"></span>
                                      <span className="text-[#c9d1d9] hover:bg-white/10 p-1 rounded cursor-pointer"><i className="fas fa-plus"></i></span>
                                  </div>
                                  
                                  <div className="p-3 flex-1 font-mono text-xs overflow-y-auto custom-scrollbar">
                                        {terminalHistory.map((line) => (
                                          <div key={line.id} 
                                                className={`mb-1 ${line.type === 'system' ? 'text-[#8b949e]' : line.type === 'ai' ? 'text-[#58a6ff]' : line.type === 'error' ? 'text-red-400' : line.type === 'success' ? 'text-[#7ee787]' : line.type === 'loading' ? 'text-[#8b949e] italic' : ''}`}
                                                dangerouslySetInnerHTML={{ __html: line.html }} 
                                          />
                                        ))}
                                        <div ref={terminalEndRef} />
                                  </div>
                                  
                                  <div className="px-3 pb-2 pt-0 flex items-center gap-2">
                                        <span className="text-[#7ee787] font-bold">➜</span> 
                                        <span className="text-[#79c0ff] font-bold">~/portfolio</span> 
                                        <div className="flex-1 flex items-center bg-[#0d1117] border border-[#30363d] rounded px-2 py-1 focus-within:border-[#58a6ff] transition-colors">
                                            <span className="text-purple-400 font-bold whitespace-nowrap mr-2">✨ AI_CMD &gt;</span>
                                            <input type="text" 
                                                value={aiPrompt}
                                                onChange={(e) => setAiPrompt(e.target.value)}
                                                className="bg-transparent border-none outline-none text-white flex-1 placeholder-[#8b949e] text-xs font-mono" 
                                                placeholder="Ask AI..." 
                                                onKeyDown={(e) => e.key === 'Enter' && handleAIInput()} 
                                            />
                                            <button onClick={handleAIInput} className="text-[10px] bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded hover:bg-blue-600/30 transition-colors ml-2">✨ RUN</button>
                                        </div>
                                  </div>
                              </div>
                        </div>
                    </div>
                </div>

            </ScrollReveal>
        </div>
        </div>
    </section>
  );

};


export default Hero;
// <