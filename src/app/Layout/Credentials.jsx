const Credentials = () => {
  return (
    <section id="credentials" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">03. Credentials</h2><h3 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">Resume Summary</h3></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                  <div className="flex items-center mb-8 gap-4 border-b border-white/10 pb-4"><div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400"><i className="fas fa-graduation-cap text-lg"></i></div><h3 className="text-xl font-display font-bold text-white">Education</h3></div>
                  <div className="space-y-6">
                      <div className="glass-card p-6 rounded-2xl hover:border-blue-500/30 transition-all duration-300 group"><div className="flex justify-between items-start mb-2"><h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">B.S. Computer Science</h4><span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-slate-400">2017 - 2021</span></div><p className="text-sm text-blue-400 mb-3 font-medium">University of Tech</p><p className="text-slate-400 text-sm leading-relaxed">Specialized in AI and Data Structures. GPA 3.9/4.0</p></div>
                      <div className="glass-card p-6 rounded-2xl hover:border-blue-500/30 transition-all duration-300 group"><div className="flex justify-between items-start mb-2"><h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Full Stack Cert</h4><span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-slate-400">2021</span></div><p className="text-sm text-blue-400 mb-3 font-medium">Meta / Coursera</p><p className="text-slate-400 text-sm leading-relaxed">Intensive coursework in React, Node.js, and Cloud Deployment.</p></div>
                  </div>
              </div>
              <div>
                  <div className="flex items-center mb-8 gap-4 border-b border-white/10 pb-4"><div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400"><i className="fas fa-briefcase text-lg"></i></div><h3 className="text-xl font-display font-bold text-white">Experience</h3></div>
                  <div className="space-y-6">
                      <div className="glass-card p-6 rounded-2xl hover:border-purple-500/30 transition-all duration-300 group"><div className="flex justify-between items-start mb-2"><h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">Senior Frontend Engineer</h4><span className="px-3 py-1 rounded-full bg-purple-500/10 text-xs font-medium text-purple-400">2023 - Present</span></div><p className="text-sm text-purple-400 mb-3 font-medium">TechCorp Industries</p><p className="text-slate-400 text-sm leading-relaxed">Leading migration to Next.js 14. Improving Core Web Vitals.</p></div>
                      <div className="glass-card p-6 rounded-2xl hover:border-purple-500/30 transition-all duration-300 group"><div className="flex justify-between items-start mb-2"><h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">Web Developer</h4><span className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-slate-400">2021 - 2023</span></div><p className="text-sm text-purple-400 mb-3 font-medium">Creative Studio X</p><p className="text-slate-400 text-sm leading-relaxed">Delivered 20+ responsive websites for high-profile clients.</p></div>
                  </div>
              </div>
          </div>
      </div>
    </section>
  );
};

export default Credentials;