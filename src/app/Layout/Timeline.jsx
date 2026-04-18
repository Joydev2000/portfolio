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
              <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all">
                <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2 block">
                  Nov 2024 - Present
                </span>
                <h3 className="text-xl font-bold text-white mb-1">
                  Web Developer
                </h3>
                <div className="text-slate-500 text-sm mb-3 font-medium">
                  Web Circle Technology
                </div>
                <p className="text-slate-400 text-sm">
                  Build and customize WordPress websites, develop UI components using React, and create responsive HTML/CSS layouts while optimizing overall site performance.
                </p>
              </div>
            </StaggerItem>

            {/* Entry 2: Junior UI/UX Designer */}
            <StaggerItem className="relative md:w-1/2 md:mr-auto md:pr-12 pl-12 md:pl-0 group md:text-right">
              <div className="absolute left-[30px] md:left-auto md:right-0 top-6 w-4 h-4 rounded-full bg-[#0f172a] border-2 border-purple-500 z-10 md:translate-x-1/2 shadow-[0_0_15px_rgba(139,92,246,0.5)] group-hover:scale-125 transition-transform"></div>
              <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all">
                <span className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-2 block">
                  Apr 2024 - Oct 2024
                </span>
                <h3 className="text-xl font-bold text-white mb-1">
                  Junior UI/UX Designer
                </h3>
                <div className="text-slate-500 text-sm mb-3 font-medium">
                  TimdTech
                </div>
                <p className="text-slate-400 text-sm">
                  Collaborated with teams to design user interfaces and experiences. Worked with React, assisted in creating prototypes and fixed design bugs.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
