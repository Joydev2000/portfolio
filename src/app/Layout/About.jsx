const About = () => {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2 w-full relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <div className="relative glass-card rounded-3xl p-8 border border-white/10 aspect-square flex flex-col justify-center items-center text-center overflow-hidden">
                      <div className="w-24 h-24 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-blue-400 rotate-3 group-hover:rotate-6 transition-transform">
                          <i className="fas fa-code text-4xl"></i>
                      </div>
                      <h3 className="text-2xl font-display font-bold text-white mb-2 tracking-tight">Clean Code & Design</h3>
                      <p className="text-slate-400 text-sm max-w-xl mb-8">I bridge the gap between UI design and technical execution to build fast, responsive, and highly optimized websites.</p>
                      <div className="grid grid-cols-2 gap-4 w-full">
                          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                              <div className="text-2xl font-bold text-white mb-1">1.5+</div>
                              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Years Exp.</div>
                          </div>
                          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                              <div className="text-2xl font-bold text-white mb-1">50+</div>
                              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Projects</div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="lg:w-1/2 w-full">
                  <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">About Me</h2>
                  <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">Passionate about creating smooth user experiences.</h3>
                  <p className="text-lg text-slate-400 mb-6 leading-relaxed font-light">My journey started with graphic design and evolved into frontend development. I specialize in translating complex UI designs into optimized, responsive web pages using React and WordPress.</p>
                  <div className="space-y-6">
                      <div>
                          <div className="flex justify-between text-sm font-medium text-slate-300 mb-2">Frontend (HTML, CSS, React)</div>
                          <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full" style={{ width: '95%' }}></div></div>
                      </div>
                      <div>
                          <div className="flex justify-between text-sm font-medium text-slate-300 mb-2">WordPress</div>
                          <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '88%' }}></div></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </section>
  );
};

export default About;