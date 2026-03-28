const Timeline = () => {
  return (
    <section id="timeline" className="py-24 bg-[#0b1120] relative z-10 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-3">03. Data Logs</h2><h3 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">Professional Journey</h3></div>
          <div className="relative pl-8 md:pl-0">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] timeline-line transform md:-translate-x-1/2"></div>
              <div className="space-y-12">
                  <div className="relative md:w-1/2 md:ml-auto md:pl-12 pl-12 group"><div className="absolute left-[30px] md:left-0 top-6 w-4 h-4 rounded-full bg-[#0f172a] border-2 border-blue-500 z-10 md:-translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform"></div><div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all"><span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2 block">2023 - Present</span><h3 className="text-xl font-bold text-white mb-1">Senior Frontend Engineer</h3><div className="text-slate-500 text-sm mb-3 font-medium">TechCorp Industries</div><p className="text-slate-400 text-sm">Leading frontend architecture and design systems.</p></div></div>
                  <div className="relative md:w-1/2 md:mr-auto md:pr-12 pl-12 md:pl-0 group md:text-right"><div className="absolute left-[30px] md:left-auto md:right-0 top-6 w-4 h-4 rounded-full bg-[#0f172a] border-2 border-purple-500 z-10 md:translate-x-1/2 shadow-[0_0_15px_rgba(139,92,246,0.5)] group-hover:scale-125 transition-transform"></div><div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all"><span className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-2 block">2021 - 2023</span><h3 className="text-xl font-bold text-white mb-1">Web Developer</h3><div className="text-slate-500 text-sm mb-3 font-medium">Creative Studio X</div><p className="text-slate-400 text-sm">Collaborated with designers on high-fidelity prototypes.</p></div></div>
                  <div className="relative md:w-1/2 md:ml-auto md:pl-12 pl-12 group"><div className="absolute left-[30px] md:left-0 top-6 w-4 h-4 rounded-full bg-[#0f172a] border-2 border-pink-500 z-10 md:-translate-x-1/2 shadow-[0_0_15px_rgba(236,72,153,0.5)] group-hover:scale-125 transition-transform"></div><div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all"><span className="text-pink-400 text-xs font-bold uppercase tracking-wider mb-2 block">2017 - 2021</span><h3 className="text-xl font-bold text-white mb-1">B.S. Computer Science</h3><div className="text-slate-500 text-sm mb-3 font-medium">University of Technology</div><p className="text-slate-400 text-sm">Focus on Algorithms and Web Technologies.</p></div></div>
              </div>
          </div>
      </div>
    </section>
  );
};

export default Timeline;