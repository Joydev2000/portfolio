"use client";
import { useState, useEffect, useRef } from "react";
import ParticleCanvas from "./ParticleCanvas.jsx";
import callGemini from "../Api/Gemini.js";
import { getAIPrompt } from "../data/aiData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = () => {
  const sectionRef = useRef(null);
  const titleContainerRef = useRef(null);
  const editorContainerRef = useRef(null);
  const terminalEndRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [editorCode, setEditorCode] = useState(`
<span class="token-keyword">import</span> React <span class="token-keyword">from</span> <span class="token-string">'react'</span>;

<span class="token-keyword">export default function</span> <span class="token-function">App</span>() {
  <span class="token-keyword">return</span> (
    <span class="token-operator">&lt;</span>div className=<span class="token-string">"future"</span><span class="token-operator">&gt;</span>
       <span class="token-comment">// Ready to build immersive experiences</span>
       <span class="token-function">Hello</span> World
    <span class="token-operator">&lt;/</span>div<span class="token-operator">&gt;</span>
  );
}`);

  const [terminalHistory, setTerminalHistory] = useState([
    { id: 1, type: "system", html: `Microsoft Windows [Version 10.0.19045.3693]` },
    { id: 2, type: "system", html: `> dev-nexus@1.0.0 dev<br>> <span class="text-[#58a6ff]">System Online.</span> AI Assistant ready.` },
  ]);

  // Detect mobile on mount and window resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // GSAP scroll animation — desktop only
  useEffect(() => {
    if (typeof window === "undefined" || isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2800",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Phase 1: Text reveals ONE BY ONE (staggered sequentially)
    const revealItems = titleContainerRef.current.querySelectorAll(".reveal-text");
    tl.to(revealItems, {
      backgroundPosition: "0% 0",
      duration: 2,
      ease: "none",
      stagger: 2,
    });

    // Phase 2: After text animation → fade text out while editor rises
    tl.to(titleContainerRef.current, {
      opacity: 0,
      y: -80,
      filter: "blur(12px)",
      duration: 2.5,
      ease: "power2.inOut",
    }, "+=0.5");

    // Editor slides up FROM 60vh to center
    tl.to(editorContainerRef.current, {
      y: "-45vh",
      scale: 1,
      opacity: 1,
      duration: 3,
      ease: "power3.out",
    }, "-=2");

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [isMobile]);

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
      const jsonMatch = resultStr.match(/\{[\s\S]*?\}/);
      if (!jsonMatch) throw new Error("No JSON object found");
      const response = JSON.parse(jsonMatch[0].replace(/```/g, ""));

      if (response.type === "chat") {
        setTerminalHistory(prev => [...prev, { id: Date.now() + 3, type: "ai", html: `> ${response.content}` }]);
      } else {
        setTerminalHistory(prev => [...prev, { id: Date.now() + 4, type: "success", html: `> Generated successfully.` }]);
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

  // ── Editor panel (shared between mobile+desktop layouts) ──
  const EditorPanel = () => (
    <div className="relative group">
      {/* Glow */}
      <div className="absolute -inset-px bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

      <div className="relative bg-[#0d1117] rounded-2xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.95)] border border-white/8 overflow-hidden flex flex-col" style={{ height: "clamp(22rem, 60vh, 32rem)" }}>

        {/* ── Title bar with traffic lights + tabs ── */}
        <div className="flex items-center bg-[#161b22] border-b border-white/5 px-3 sm:px-4 h-11 gap-2 sm:gap-3 select-none shrink-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-125 cursor-pointer transition"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-125 cursor-pointer transition"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-125 cursor-pointer transition"></div>
          </div>
          {/* File tabs */}
          <div className="flex items-end h-full ml-1 sm:ml-2 gap-0 overflow-hidden">
            <div className="flex items-center gap-1.5 px-2 sm:px-4 h-full bg-[#0d1117] border-t-2 border-blue-500 text-white text-[11px] font-medium">
              <i className="fas fa-file-code text-blue-400 text-[10px]"></i>
              <span className="hidden xs:inline">portfolio.jsx</span>
              <span className="xs:hidden">port…</span>
              <span className="ml-1 text-slate-600 hover:text-white cursor-pointer text-[10px]">×</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 h-full bg-[#161b22] border-t-2 border-transparent text-slate-500 text-[11px] hover:text-slate-300 cursor-pointer transition-colors">
              <i className="fab fa-node-js text-green-500 text-[10px]"></i>
              <span>api.js</span>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 h-full bg-[#161b22] border-t-2 border-transparent text-slate-500 text-[11px] hover:text-slate-300 cursor-pointer transition-colors">
              <i className="fas fa-palette text-purple-400 text-[10px]"></i>
              <span>globals.css</span>
            </div>
          </div>
          {/* Right actions */}
          <div className="ml-auto flex items-center gap-2 sm:gap-3 text-slate-600 text-xs shrink-0">
            <i className="hidden sm:block fas fa-code-branch hover:text-slate-300 cursor-pointer transition-colors"></i>
            <i className="hidden sm:block fas fa-bell hover:text-slate-300 cursor-pointer transition-colors"></i>
            <div className="flex items-center gap-1.5 bg-blue-600/20 border border-blue-500/30 rounded px-2 py-0.5 text-blue-400 text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              <span className="hidden sm:inline">Live · 3000</span>
              <span className="sm:hidden">Live</span>
            </div>
          </div>
        </div>

        {/* ── Breadcrumb ── */}
        <div className="flex items-center bg-[#0d1117] border-b border-white/5 px-3 sm:px-4 h-7 text-[10px] text-slate-600 gap-1.5 select-none shrink-0 overflow-hidden">
          <i className="fas fa-folder text-blue-400 text-[9px]"></i>
          <span className="hidden sm:inline hover:text-slate-300 cursor-pointer">src</span>
          <i className="hidden sm:block fas fa-chevron-right text-[8px]"></i>
          <span className="hover:text-slate-300 cursor-pointer">app</span>
          <i className="fas fa-chevron-right text-[8px]"></i>
          <span className="hidden sm:inline hover:text-slate-300 cursor-pointer">Layout</span>
          <i className="hidden sm:block fas fa-chevron-right text-[8px]"></i>
          <span className="text-blue-400 font-semibold">portfolio.jsx</span>
          <div className="ml-auto flex items-center gap-3 text-slate-700">
            <i className="hidden sm:block fas fa-columns hover:text-slate-400 cursor-pointer transition-colors"></i>
            <i className="fas fa-ellipsis-h hover:text-slate-400 cursor-pointer transition-colors"></i>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">

          {/* ── Activity bar (sidebar icons) — hidden on mobile ── */}
          <div className="w-10 sm:w-12 bg-[#010409] border-r border-white/5 flex-col items-center py-4 gap-5 text-slate-600 hidden sm:flex shrink-0">
            <i className="fas fa-copy text-base text-slate-300 hover:text-white cursor-pointer transition-colors" title="Explorer"></i>
            <i className="fas fa-search text-base hover:text-white cursor-pointer transition-colors" title="Search"></i>
            <i className="fas fa-code-branch text-base hover:text-white cursor-pointer transition-colors" title="Source Control"></i>
            <i className="fas fa-bug text-base hover:text-white cursor-pointer transition-colors" title="Run & Debug"></i>
            <div className="h-px w-6 bg-white/10 my-1"></div>
            <i className="fas fa-robot text-base text-blue-400 hover:text-blue-300 cursor-pointer transition-colors" title="AI Copilot"></i>
            <div className="flex-1"></div>
            <i className="fas fa-user-circle text-base hover:text-white cursor-pointer transition-colors"></i>
            <i className="fas fa-cog text-base hover:text-white cursor-pointer transition-colors"></i>
          </div>

          {/* ── Main Editor + Terminal ── */}
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* Code area */}
            <div className="flex flex-1 overflow-hidden">
              {/* Line numbers */}
              <div className="w-8 sm:w-10 bg-[#0d1117] text-slate-700 text-right pr-2 sm:pr-3 pt-5 text-xs leading-[1.75rem] font-mono select-none border-r border-white/5 shrink-0 overflow-hidden">
                {Array.from({ length: 12 }, (_, i) => <div key={i}>{i + 1}</div>)}
              </div>
              {/* Code */}
              <div className="flex-1 overflow-auto custom-scrollbar bg-[#0d1117] px-3 sm:px-5 pt-5 pb-3 relative">
                <div className="absolute left-0 right-0 bg-white/[0.025] pointer-events-none" style={{ top: "3.5rem", height: "1.75rem" }}></div>
                <div dangerouslySetInnerHTML={{ __html: editorCode }} className="text-[#c9d1d9] text-[11px] sm:text-[13px] leading-[1.75rem] font-mono whitespace-pre relative" />
              </div>
              {/* Minimap — desktop only */}
              <div className="w-16 bg-[#0a0e14] border-l border-white/5 opacity-40 hidden lg:flex flex-col pt-5 px-2 gap-1 overflow-hidden shrink-0">
                {Array.from({ length: 14 }, (_, i) => (
                  <div key={i} className="h-1.5 rounded-full bg-slate-600" style={{ width: `${35 + (i * 17) % 65}%` }}></div>
                ))}
              </div>
            </div>

            {/* ── AI Terminal Panel ── */}
            <div className="bg-[#010409] border-t border-white/8 flex flex-col" style={{ height: "clamp(9rem, 30%, 13rem)" }}>
              {/* Panel tabs */}
              <div className="flex items-center border-b border-white/6 px-2 sm:px-3 h-9 gap-0 shrink-0 select-none">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 h-full border-b-2 border-blue-500 text-blue-300 text-[11px] font-semibold">
                  <i className="fas fa-robot text-[10px]"></i>
                  <span>AI Terminal</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 h-full border-b-2 border-transparent text-slate-500 text-[11px] hover:text-slate-300 cursor-pointer transition-colors">
                  <i className="fas fa-terminal text-[10px]"></i>
                  <span>Shell</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 h-full border-b-2 border-transparent text-slate-500 text-[11px] hover:text-slate-300 cursor-pointer transition-colors">
                  <i className="fas fa-exclamation-triangle text-[10px]"></i>
                  <span>Problems</span>
                  <span className="bg-blue-600/80 text-white text-[9px] px-1.5 rounded-full ml-0.5">0</span>
                </div>
                <div className="ml-auto flex gap-2 sm:gap-3 text-slate-600 text-[11px]">
                  <i className="hidden sm:block fas fa-plus hover:text-white cursor-pointer transition-colors p-1"></i>
                  <i className="fas fa-compress-alt hover:text-white cursor-pointer transition-colors p-1"></i>
                  <i className="fas fa-times hover:text-white cursor-pointer transition-colors p-1"></i>
                </div>
              </div>
              {/* Output */}
              <div className="px-3 sm:px-4 py-2 flex-1 text-[11px] sm:text-[12px] font-mono overflow-y-auto custom-scrollbar">
                {terminalHistory.map((line) => (
                  <div key={line.id}
                    className={`mb-2 leading-relaxed ${line.type === 'system' ? 'text-slate-500' : line.type === 'ai' ? 'text-blue-400' : line.type === 'error' ? 'text-red-400' : line.type === 'success' ? 'text-green-400' : 'text-white'}`}
                    dangerouslySetInnerHTML={{ __html: line.html }}
                  />
                ))}
                <div ref={terminalEndRef} />
              </div>
              {/* Input */}
              <div className="px-2 sm:px-3 pb-2 sm:pb-2.5 shrink-0">
                <div className="flex items-center bg-[#0d1117] border border-white/8 rounded-lg px-2 sm:px-3 py-2 gap-2 focus-within:border-blue-500/50 transition-all focus-within:ring-1 ring-blue-500/20">
                  <span className="text-blue-500 text-xs shrink-0">✦</span>
                  <span className="hidden sm:inline text-slate-600 text-[11px] font-mono shrink-0">joy@portfolio:~$</span>
                  <input type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAIInput()}
                    className="bg-transparent border-none outline-none text-white flex-1 text-[11px] sm:text-[12px] font-mono placeholder-slate-700 caret-blue-400 min-w-0"
                    placeholder="Ask AI about my skills..."
                  />
                  <button onClick={handleAIInput} className="text-[10px] sm:text-[11px] bg-blue-600 hover:bg-blue-500 text-white px-2 sm:px-3 py-1.5 rounded-md transition-colors font-semibold flex items-center gap-1 sm:gap-1.5 shrink-0">
                    <i className="fas fa-paper-plane text-[10px]"></i>
                    <span className="hidden sm:inline">Run</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ── Status Bar ── */}
            <div className="flex items-center bg-blue-700 h-6 px-2 sm:px-3 gap-3 sm:gap-5 text-[10px] text-blue-100 font-medium select-none shrink-0 overflow-hidden">
              <div className="flex items-center gap-1.5">
                <i className="fas fa-code-branch text-[9px]"></i>
                <span>main</span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                <i className="fas fa-check-circle text-[9px]"></i>
                <span>0 errors, 0 warnings</span>
              </div>
              <div className="ml-auto flex items-center gap-3 sm:gap-5">
                <span className="hidden sm:inline">JSX</span>
                <span className="hidden sm:inline">UTF-8</span>
                <span className="hidden md:inline">Ln 7, Col 3</span>
                <div className="flex items-center gap-1">
                  <i className="fas fa-robot text-[9px]"></i>
                  <span>Copilot</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // MOBILE LAYOUT — static, no GSAP
  // ─────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section id="hero" className="relative w-full min-h-screen bg-[#010409] flex flex-col items-center justify-start overflow-hidden pt-20 pb-8 px-4">
        <div className="absolute inset-0 pointer-events-none z-0">
          <ParticleCanvas />
        </div>

        {/* Hero text */}
        <div className="relative z-20 w-full max-w-lg mx-auto flex flex-col items-center text-center mt-6 mb-8">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
            Transforming ideas into digital products
          </div>

          <h1 className="text-4xl xs:text-5xl font-display font-medium tracking-tight leading-[1.2] select-none block mb-5">
            <span className="lens-text-wrap">
              <span className="lens-text-base reveal-text block" style={{ backgroundPosition: "0% 0" }}>Full-Stack Engineering &</span>
              <span className="lens-text-bright reveal-text block" aria-hidden="true">Full-Stack Engineering &</span>
            </span>
            <span className="lens-text-wrap">
              <span className="lens-text-base reveal-text block font-serif italic pb-2 pr-2" style={{ color: "rgba(139,92,246,0.4)", WebkitTextFillColor: "rgba(139,92,246,0.4)", backgroundPosition: "0% 0" }}>AI Software Development</span>
              <span className="lens-text-bright gradient block font-serif italic pb-2 pr-2" aria-hidden="true">AI Software Development</span>
            </span>
          </h1>

          <p className="text-base text-slate-400 max-w-sm mx-auto font-light leading-relaxed">
            Crafting modern, scalable interfaces where design meets cutting-edge engineering.
          </p>
        </div>

        {/* Editor */}
        <div className="relative z-30 w-full max-w-lg mx-auto">
          <EditorPanel />
        </div>
      </section>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // DESKTOP LAYOUT — GSAP scroll pin animation
  // ─────────────────────────────────────────────────────────────
  return (
    <section id="hero" ref={sectionRef} className="relative w-full h-screen bg-[#010409] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <ParticleCanvas />
      </div>

      {/* Scene 1: Text — positioned in the upper portion of viewport */}
      <div ref={titleContainerRef} className="absolute z-20 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center" style={{ top: "14%" }}>
          <div className="inline-flex items-center px-4 py-1.5 rounded-full min-h-[36px] bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
            Transforming ideas into high-end digital products
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-display font-medium tracking-tight leading-[1.15] select-none block mb-6">
            {/* Line 1 */}
            <span className="lens-text-wrap">
              <span className="lens-text-base reveal-text block">Full-Stack Engineering &</span>
              <span className="lens-text-bright reveal-text block" aria-hidden="true">Full-Stack Engineering &</span>
            </span>
            {/* Line 2 — gradient version */}
            <span className="lens-text-wrap">
              <span className="lens-text-base reveal-text block font-serif italic pb-2 pr-4" style={{ color: "rgba(139,92,246,0.4)", WebkitTextFillColor: "rgba(139,92,246,0.4)" }}>AI Software Development</span>
              <span className="lens-text-bright gradient block font-serif italic pb-2 pr-4" aria-hidden="true">AI Software Development</span>
            </span>
          </h1>

          <div className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed select-none">
            <span className="lens-text-wrap inline">
              <span className="lens-text-base reveal-text inline">Build immersive experiences without the complexity. Crafting modern, scalable interfaces where design meets cutting-edge engineering.</span>
              <span className="lens-text-bright inline" aria-hidden="true" style={{ whiteSpace: "normal" }}>Build immersive experiences without the complexity. Crafting modern, scalable interfaces where design meets cutting-edge engineering.</span>
            </span>
          </div>
      </div>

      {/* Scene 2: Editor — starts at 60vh */}
      <div ref={editorContainerRef} className="absolute z-30 w-full max-w-6xl px-4 pointer-events-auto" style={{ top: "60vh" }}>
        <EditorPanel />
      </div>
    </section>
  );
};

export default Hero;