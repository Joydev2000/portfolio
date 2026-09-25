import { ScrollReveal, StaggerContainer, StaggerItem } from "../components/ScrollReveal";

const Credentials = () => {
  const educationList = [
    {
      degree: "Graduation (Bachelor's Degree)",
      institution: "Netaji Subhas Open University",
      period: "2022 – 2026",
      status: "Currently Pursuing",
      statusColor: "emerald",
      icon: "fas fa-graduation-cap",
      description: "Pursuing higher education while actively developing commercial WordPress websites, custom themes, and modern frontend web applications.",
      highlights: ["Higher Studies", "Open University", "Academic & Tech Balance"],
    },
    {
      degree: "Diploma in Graphic & Web Development",
      institution: "Arena Animation, Barasat",
      period: "Completed",
      status: "Professional Diploma",
      statusColor: "purple",
      icon: "fas fa-award",
      isFeatured: true,
      description: "Comprehensive industry diploma covering UI/UX principles, modern graphic design software (Photoshop, Illustrator, XD), semantic HTML, CSS, JavaScript, and responsive web architecture.",
      highlights: ["UI/UX Design", "Graphic Toolkits", "Web Architecture"],
    },
    {
      degree: "Higher Secondary (10+2)",
      institution: "W.B.C.H.S.E",
      institutionFull: "West Bengal Council of Higher Secondary Education",
      period: "2018",
      status: "70% Marks",
      statusColor: "blue",
      icon: "fas fa-school",
      description: "Completed higher secondary education with 70% marks, establishing strong foundations in analytical thinking and structured problem-solving.",
      highlights: ["Science & Fundamentals", "70% Score"],
    },
    {
      degree: "Secondary Education (10th)",
      institution: "W.B.B.S.E",
      institutionFull: "West Bengal Board of Secondary Education",
      period: "2016",
      status: "63% Marks",
      statusColor: "slate",
      icon: "fas fa-book-reader",
      description: "Completed secondary schooling with 63% marks with a focus on general academics and quantitative fundamentals.",
      highlights: ["Core Curriculum", "63% Score"],
    },
  ];

  // Track 1: WordPress & Frontend Core
  const frontendTrack = [
    {
      name: "WordPress",
      category: "CMS Core",
      level: "Expert",
      levelColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      icon: "fab fa-wordpress",
      iconColor: "text-[#3858e9]",
      iconBg: "bg-[#3858e9]/10",
    },
    {
      name: "Custom Themes",
      category: "WordPress Dev",
      level: "Expert",
      levelColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      icon: "fas fa-layer-group",
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/10",
    },
    {
      name: "Elementor",
      category: "Page Builder",
      level: "Expert",
      levelColor: "text-pink-400 bg-pink-500/10 border-pink-500/20",
      icon: "fab fa-elementor",
      iconColor: "text-[#d6336c]",
      iconBg: "bg-[#d6336c]/10",
    },
    {
      name: "HTML Developer",
      category: "Semantic HTML5",
      level: "Expert",
      levelColor: "text-orange-400 bg-orange-500/10 border-orange-500/20",
      icon: "fab fa-html5",
      iconColor: "text-[#e44d26]",
      iconBg: "bg-[#e44d26]/10",
    },
    {
      name: "Frontend / CSS3",
      category: "Responsive & FX",
      level: "Expert",
      levelColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
      icon: "fab fa-css3-alt",
      iconColor: "text-[#264de4]",
      iconBg: "bg-[#264de4]/10",
    },
    {
      name: "React.js",
      category: "Modern UI",
      level: "Proficient",
      levelColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      icon: "fab fa-react",
      iconColor: "text-[#61dafb]",
      iconBg: "bg-[#61dafb]/10",
    },
    {
      name: "Next.js",
      category: "App Router",
      level: "Proficient",
      levelColor: "text-slate-200 bg-white/10 border-white/20",
      icon: "fas fa-bolt",
      iconColor: "text-white",
      iconBg: "bg-white/10",
    },
    {
      name: "JavaScript",
      category: "ES6+ & DOM",
      level: "Proficient",
      levelColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
      icon: "fab fa-js",
      iconColor: "text-[#f7df1e]",
      iconBg: "bg-[#f7df1e]/10",
    },
    {
      name: "Tailwind CSS",
      category: "Utility UI",
      level: "Proficient",
      levelColor: "text-teal-400 bg-teal-500/10 border-teal-500/20",
      icon: "fas fa-wind",
      iconColor: "text-[#38bdf8]",
      iconBg: "bg-[#38bdf8]/10",
    },
    {
      name: "Bootstrap",
      category: "Grid & UI",
      level: "Proficient",
      levelColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      icon: "fab fa-bootstrap",
      iconColor: "text-[#7952b3]",
      iconBg: "bg-[#7952b3]/10",
    },
    {
      name: "Core PHP",
      category: "WP Backend",
      level: "Working Knowledge",
      levelColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      icon: "fab fa-php",
      iconColor: "text-[#777bb4]",
      iconBg: "bg-[#777bb4]/10",
    },
    {
      name: "Git & GitHub",
      category: "Version Control",
      level: "Proficient",
      levelColor: "text-slate-300 bg-slate-500/10 border-slate-500/20",
      icon: "fab fa-github",
      iconColor: "text-slate-200",
      iconBg: "bg-white/10",
    },
  ];

  // Track 2: Design & Creative Tools
  const designTrack = [
    {
      name: "VS Code",
      category: "Primary IDE",
      level: "Advanced",
      levelColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      icon: "fas fa-code",
      iconColor: "text-[#007acc]",
      iconBg: "bg-[#007acc]/10",
    },
    {
      name: "Figma",
      category: "UI/UX Prototyping",
      level: "Proficient",
      levelColor: "text-orange-400 bg-orange-500/10 border-orange-500/20",
      icon: "fab fa-figma",
      iconColor: "text-[#f24e1e]",
      iconBg: "bg-[#f24e1e]/10",
    },
    {
      name: "Adobe Photoshop",
      category: "Image Editing",
      level: "Proficient",
      levelColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
      icon: "fas fa-image",
      iconColor: "text-[#31a8ff]",
      iconBg: "bg-[#31a8ff]/10",
    },
    {
      name: "Adobe Illustrator",
      category: "Vector & Logos",
      level: "Proficient",
      levelColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      icon: "fas fa-bezier-curve",
      iconColor: "text-[#ff9a00]",
      iconBg: "bg-[#ff9a00]/10",
    },
    {
      name: "Adobe XD",
      category: "Wireframing",
      level: "Proficient",
      levelColor: "text-pink-400 bg-pink-500/10 border-pink-500/20",
      icon: "fas fa-pen-nib",
      iconColor: "text-[#ff61f6]",
      iconBg: "bg-[#ff61f6]/10",
    },
    {
      name: "Adobe InDesign",
      category: "Editorial Layout",
      level: "Proficient",
      levelColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      icon: "fas fa-book-open",
      iconColor: "text-[#ff3366]",
      iconBg: "bg-[#ff3366]/10",
    },
    {
      name: "UI / UX Design",
      category: "User Experience",
      level: "Specialized",
      levelColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      icon: "fas fa-palette",
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/10",
    },
    {
      name: "Responsive Web",
      category: "Mobile First",
      level: "Expert",
      levelColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      icon: "fas fa-mobile-screen-button",
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10",
    },
  ];

  return (
    <section id="credentials" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">03. Credentials &amp; Skills</h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
              Technical Expertise &amp; Academic Background
            </h3>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-3 font-light leading-relaxed">
              Verified proficiency in custom WordPress engineering, frontend UI frameworks, and creative design software alongside certified academic qualifications.
            </p>
          </div>
        </ScrollReveal>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 1 (TOP): Software & Coding Skills with Full-Width Auto-Sliders
            ───────────────────────────────────────────────────────────── */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 shadow-md shadow-purple-500/10">
                <i className="fas fa-code text-lg"></i>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">Software &amp; Coding Skills</h3>
                <p className="text-xs text-slate-400">Technical proficiency, modern frameworks &amp; creative toolkits</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Auto-sliding · Hover to pause</span>
            </div>
          </div>

          {/* Slider Row 1: WordPress & Frontend Track (slides left) */}
          <div className="mb-6 marquee-container">
            <div className="flex items-center justify-between mb-3 px-1">
              <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                WordPress &amp; Frontend Technologies
              </h4>
              <span className="text-xs text-blue-400 font-medium">Core Stack</span>
            </div>

            <div className="relative w-full overflow-hidden mask-fade-x py-1">
              <div className="marquee-track-left gap-3.5">
                {[...frontendTrack, ...frontendTrack].map((skill, idx) => (
                  <div
                    key={idx}
                    className="w-60 shrink-0 p-4 rounded-2xl bg-[#0d1117]/90 hover:bg-[#131b26] border border-white/10 hover:border-blue-500/40 transition-all duration-300 group flex flex-col justify-between shadow-lg shadow-black/40 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl ${skill.iconBg} flex items-center justify-center shrink-0`}>
                        <i className={`${skill.icon} ${skill.iconColor} text-lg group-hover:scale-110 transition-transform`}></i>
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-sm font-bold text-white truncate group-hover:text-blue-300 transition-colors">
                          {skill.name}
                        </h5>
                        <p className="text-[11px] text-slate-400 truncate font-mono">
                          {skill.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 border-t border-white/5">
                      <span className="text-[11px] text-slate-500 font-medium">Proficiency</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${skill.levelColor}`}>
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Slider Row 2: Design & Creative Tools (slides right) */}
          <div className="marquee-container">
            <div className="flex items-center justify-between mb-3 px-1">
              <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                Design &amp; Creative Tools
              </h4>
              <span className="text-xs text-purple-400 font-medium">UI / UX Design</span>
            </div>

            <div className="relative w-full overflow-hidden mask-fade-x py-1">
              <div className="marquee-track-right gap-3.5">
                {[...designTrack, ...designTrack].map((tool, idx) => (
                  <div
                    key={idx}
                    className="w-60 shrink-0 p-4 rounded-2xl bg-[#0d1117]/90 hover:bg-[#131b26] border border-white/10 hover:border-purple-500/40 transition-all duration-300 group flex flex-col justify-between shadow-lg shadow-black/40 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl ${tool.iconBg} flex items-center justify-center shrink-0`}>
                        <i className={`${tool.icon} ${tool.iconColor} text-lg group-hover:scale-110 transition-transform`}></i>
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-sm font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                          {tool.name}
                        </h5>
                        <p className="text-[11px] text-slate-400 truncate font-mono">
                          {tool.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 border-t border-white/5">
                      <span className="text-[11px] text-slate-500 font-medium">Tool Level</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${tool.levelColor}`}>
                        {tool.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 2 (UNDER): Education & Qualifications in Column-wise Grid
            ───────────────────────────────────────────────────────────── */}
        <div className="mb-12">
          <div className="flex items-center mb-8 gap-3 pb-4 border-b border-white/10">
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-md shadow-blue-500/10">
              <i className="fas fa-graduation-cap text-lg"></i>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">Education &amp; Qualifications</h3>
              <p className="text-xs text-slate-400">Academic background, professional diplomas &amp; certifications</p>
            </div>
          </div>

          {/* Column-wise 4-Card Grid on Desktop, 2 on Tablet, 1 on Mobile */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {educationList.map((edu, idx) => (
              <StaggerItem key={idx} className="h-full">
                <div
                  className={`h-full p-5 rounded-2xl transition-all duration-300 group flex flex-col justify-between ${
                    edu.isFeatured
                      ? "bg-gradient-to-br from-purple-500/[0.08] via-purple-900/[0.04] to-[#0d1117] border border-purple-500/30 shadow-lg shadow-purple-500/5 hover:border-purple-400/50 hover:scale-[1.01]"
                      : "bg-[#0d1117]/80 backdrop-blur-md border border-white/10 hover:border-blue-500/30 hover:bg-[#111722] hover:scale-[1.01]"
                  }`}
                >
                  <div>
                    {/* Header with Icon and Status */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm border ${
                          edu.isFeatured
                            ? "bg-purple-500/15 text-purple-400 border-purple-500/30"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}
                      >
                        <i className={edu.icon}></i>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border shrink-0 ${
                          edu.isFeatured
                            ? "bg-purple-500/15 text-purple-300 border-purple-500/30"
                            : edu.period.includes("2022")
                            ? "bg-blue-500/15 text-blue-300 border-blue-500/30"
                            : "bg-white/5 text-slate-300 border-white/10"
                        }`}
                      >
                        {edu.status}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-snug mb-2">
                      {edu.degree}
                    </h4>

                    <div className="text-xs font-medium text-blue-400 mb-3 flex items-center gap-1.5 flex-wrap">
                      <i className="fas fa-university text-[11px] opacity-75"></i>
                      <span>{edu.institution}</span>
                      <span className="text-slate-500">·</span>
                      <span className="text-slate-400 font-mono text-[11px]">{edu.period}</span>
                    </div>

                    <p className="text-slate-400 text-xs leading-relaxed mb-4 font-light">
                      {edu.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {edu.highlights.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            Quick CV Download & LinkedIn Banner (Full Width beneath both)
            ───────────────────────────────────────────────────────────── */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-600/15 via-[#0077b5]/10 to-purple-600/10 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20 shrink-0 shadow-md">
              <i className="fas fa-file-pdf text-2xl"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h5 className="text-sm sm:text-base font-bold text-white">Full Resume &amp; Social Profile</h5>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-400">Download CV or view professional experience on LinkedIn</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="https://www.linkedin.com/in/joydev-halder/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#0077b5] hover:bg-[#006097] text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#0077b5]/20 hover:scale-105"
            >
              <i className="fab fa-linkedin text-sm"></i>
              <span>Connect on LinkedIn</span>
              <i className="fas fa-arrow-up-right-from-square text-[10px] opacity-75"></i>
            </a>
            <a
              href="/JoydevHalder_Cv.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 shrink-0 hover:scale-105"
            >
              <i className="fas fa-download text-xs"></i>
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;