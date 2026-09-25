import { ScrollReveal, StaggerContainer, StaggerItem } from "../components/ScrollReveal";

const About = () => {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left card */}
          <StaggerItem className="lg:w-1/2 w-full relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            <div className="relative glass-card rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-center overflow-hidden">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 rotate-2 group-hover:rotate-6 transition-transform">
                  <i className="fab fa-wordpress text-3xl"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight">Joydev Halder</h3>
                  <p className="text-blue-400 text-sm font-semibold">WordPress Developer &amp; Frontend Specialist</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Experienced <span className="text-white font-semibold">WordPress Developer</span> and <span className="text-white font-semibold">Frontend Engineer</span> specializing in <span className="text-blue-400 font-medium">Elementor</span>, <span className="text-white font-semibold">Coustom Theme Devlopment</span>, <span>clean semantic</span>  <span className="text-blue-400 font-medium">HTML5/CSS3</span>, and modern UI implementation. Passionate about building responsive, high-performance websites and turning complex design concepts into fast, pixel-perfect pages.
              </p>

              {/* Personal Quick Info */}
              <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-slate-400 font-medium">Core Focus</div>
                  <div className="text-white font-semibold mt-0.5">WordPress &amp; Elementor</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-slate-400 font-medium">Frontend Stack</div>
                  <div className="text-white font-semibold mt-0.5">HTML5, CSS3, JS, React</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-slate-400 font-medium">Experience</div>
                  <div className="text-white font-semibold mt-0.5">Apr 2024 - Present</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <div className="text-slate-400 font-medium">Location</div>
                  <div className="text-white font-semibold mt-0.5">Bongaon, 743249</div>
                </div>
              </div>

              {/* LinkedIn Featured Pill */}
              <a
                href="https://www.linkedin.com/in/joydev-halder/"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-6 p-3 rounded-2xl bg-[#0077b5]/15 hover:bg-[#0077b5]/25 border border-[#0077b5]/30 flex items-center justify-between text-xs transition-all group/li"
              >
                <div className="flex items-center gap-2.5">
                  <i className="fab fa-linkedin text-lg text-[#0077b5] group-hover/li:scale-110 transition-transform"></i>
                  <div>
                    <div className="text-white font-semibold">LinkedIn Profile</div>
                    <div className="text-slate-400 text-[11px]">linkedin.com/in/joydev-halder/</div>
                  </div>
                </div>
                <span className="text-[#70b5f9] text-[11px] font-semibold flex items-center gap-1 group-hover/li:translate-x-0.5 transition-transform">
                  View <i className="fas fa-arrow-right text-[10px]"></i>
                </span>
              </a>

              {/* Hobbies list */}
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Interests &amp; Hobbies</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs border border-blue-500/20 flex items-center gap-1.5">
                    <i className="fas fa-code text-[11px]"></i> Coding
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs border border-purple-500/20 flex items-center gap-1.5">
                    <i className="fas fa-headphones text-[11px]"></i> Music
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs border border-cyan-500/20 flex items-center gap-1.5">
                    <i className="fas fa-plane text-[11px]"></i> Travel
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs border border-emerald-500/20 flex items-center gap-1.5">
                    <i className="fas fa-motorcycle text-[11px]"></i> Riding
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-300 text-xs border border-pink-500/20 flex items-center gap-1.5">
                    <i className="fas fa-gamepad text-[11px]"></i> Games
                  </span>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Right column */}
          <StaggerItem className="lg:w-1/2 w-full">
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">01. About Me</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
              WordPress, Custom Themes &amp; Modern Frontend.
            </h3>
            <p className="text-base sm:text-lg text-slate-400 mb-6 leading-relaxed font-light">
              Specialized in <strong className="text-white font-medium">WordPress development</strong>, <strong className="text-white font-medium">custom theme development</strong>, and <strong className="text-white font-medium">Elementor</strong> page building, alongside clean <strong className="text-white font-medium">HTML development</strong> and modern <strong className="text-white font-medium">Frontend UI</strong> using <strong className="text-white font-medium">React</strong> and <strong className="text-white font-medium">Next.js</strong>.
            </p>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm font-medium text-slate-300 mb-1.5">
                  <span className="flex items-center gap-2">
                    <i className="fab fa-wordpress text-blue-400"></i>
                    WordPress &amp; Custom Theme Development
                  </span>
                  <span className="text-blue-400 font-semibold">96%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full" style={{ width: '96%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium text-slate-300 mb-1.5">
                  <span className="flex items-center gap-2">
                    <i className="fas fa-layer-group text-purple-400"></i>
                    Elementor Page Builder &amp; Responsive Layouts
                  </span>
                  <span className="text-purple-400 font-semibold">95%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium text-slate-300 mb-1.5">
                  <span className="flex items-center gap-2">
                    <i className="fab fa-html5 text-orange-400"></i>
                    HTML Developer &amp; Frontend (HTML5, CSS3, JavaScript)
                  </span>
                  <span className="text-orange-400 font-semibold">94%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-400 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium text-slate-300 mb-1.5">
                  <span className="flex items-center gap-2">
                    <i className="fab fa-react text-cyan-400"></i>
                    React &amp; Next.js Web Applications
                  </span>
                  <span className="text-cyan-400 font-semibold">90%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
              <a
                href="https://www.linkedin.com/in/joydev-halder/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#0077b5] hover:bg-[#006097] text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-[#0077b5]/20"
              >
                <i className="fab fa-linkedin text-sm"></i>
                <span>Connect on LinkedIn</span>
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-all flex items-center gap-2"
              >
                <i className="fas fa-envelope text-blue-400"></i>
                <span>Hire WordPress Developer</span>
              </a>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};

export default About;