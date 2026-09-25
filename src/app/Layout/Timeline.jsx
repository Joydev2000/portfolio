import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "../components/ScrollReveal";

const Timeline = () => {
  return (
    <section
      id="timeline"
      className="py-24 bg-[#0b1120] relative z-10 border-t border-white/5"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-3">
              03. Data Logs
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Professional Journey
            </h3>
          </div>
        </ScrollReveal>
        <div className="relative pl-8 md:pl-0">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] timeline-line transform md:-translate-x-1/2"></div>
          <StaggerContainer className="space-y-12">
            {/* Entry 1: Web Developer */}
            <StaggerItem className="relative md:w-1/2 md:ml-auto md:pl-12 pl-12 group">
              <div className="absolute left-[30px] md:left-0 top-6 w-4 h-4 rounded-full bg-[#0f172a] border-2 border-blue-500 z-10 md:-translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform"></div>
              <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all border border-blue-500/20">
                <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1 block">
                  November 2024 - Present
                </span>
                <h3 className="text-xl font-bold text-white mb-1">
                  WordPress &amp; Frontend Developer
                </h3>
                <div className="text-slate-400 text-sm mb-3 font-medium flex items-center gap-1.5">
                  <i className="fas fa-building text-blue-400 text-xs"></i>
                  <span>Web Circle Technology</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  Build and customize WordPress websites and Elementor templates, develop modern frontend UI components using HTML5, CSS3, JavaScript, and React, and optimize overall site performance and mobile responsiveness.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">WordPress</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">Elementor</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">HTML5 / CSS3</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">Frontend</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">React</span>
                </div>
              </div>
            </StaggerItem>

            {/* Entry 2: Junior UI/UX Designer */}
            <StaggerItem className="relative md:w-1/2 md:mr-auto md:pr-12 pl-12 md:pl-0 group md:text-right">
              <div className="absolute left-[30px] md:left-auto md:right-0 top-6 w-4 h-4 rounded-full bg-[#0f172a] border-2 border-purple-500 z-10 md:translate-x-1/2 shadow-[0_0_15px_rgba(139,92,246,0.5)] group-hover:scale-125 transition-transform"></div>
              <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all border border-purple-500/20">
                <span className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-1 block">
                  April 22, 2024 - October 2024
                </span>
                <h3 className="text-xl font-bold text-white mb-1">
                  Junior UI/UX Designer
                </h3>
                <div className="text-slate-400 text-sm mb-3 font-medium flex items-center md:justify-end gap-1.5">
                  <i className="fas fa-building text-purple-400 text-xs"></i>
                  <span>TimdTech</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  Collaborate with teams to design user interfaces and experiences. Work with React, assist in creating prototypes and fix design bugs.
                </p>
                <div className="flex flex-wrap md:justify-end gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">UI/UX</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">React</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">Figma</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">Adobe XD</span>
                </div>
              </div>
            </StaggerItem>

            {/* Entry 3: Arena Animation Qualification */}
            <StaggerItem className="relative md:w-1/2 md:ml-auto md:pl-12 pl-12 group">
              <div className="absolute left-[30px] md:left-0 top-6 w-4 h-4 rounded-full bg-[#0f172a] border-2 border-emerald-500 z-10 md:-translate-x-1/2 shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:scale-125 transition-transform"></div>
              <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all border border-emerald-500/20">
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1 block">
                  Professional Qualification
                </span>
                <h3 className="text-xl font-bold text-white mb-1">
                  Diploma in Graphic, Web Design & Development
                </h3>
                <div className="text-slate-400 text-sm mb-3 font-medium flex items-center gap-1.5">
                  <i className="fas fa-graduation-cap text-emerald-400 text-xs"></i>
                  <span>Arena Animation, Barasat</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  Comprehensive training in modern digital graphics, UI layout structuring, and frontend coding essentials.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Graphic Design</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Web Design</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Photoshop</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">Illustrator</span>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
