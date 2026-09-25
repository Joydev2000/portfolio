import { ScrollReveal } from "../components/ScrollReveal";

const Footer = () => {
  return (
    <ScrollReveal>
    <footer className="bg-[#0b1120] py-8 sm:py-12 border-t border-white/5 text-sm">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-white font-bold text-lg">Joydev Halder</span>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">WordPress &amp; Frontend</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Bongaon, 743249 · West Bengal, India · © {new Date().getFullYear()}</p>
        </div>
        <div className="flex items-center space-x-6">
          <a
            href="https://wa.me/917478362081"
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            className="hover:text-green-400 transition-colors"
          >
            <i className="fab fa-whatsapp text-xl"></i>
          </a>
          <a
            href="https://github.com/Joydev2000"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="hover:text-white transition-colors"
          >
            <i className="fab fa-github text-xl"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/joydev-halder/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="hover:text-blue-400 transition-colors"
          >
            <i className="fab fa-linkedin text-xl"></i>
          </a>
          <a
            href="mailto:joydevsuvo2202@gmail.com"
            title="Email Joydev"
            className="hover:text-red-400 transition-colors"
          >
            <i className="fas fa-envelope text-xl"></i>
          </a>
        </div>
      </div>
    </footer>
    </ScrollReveal>
  );
};

export default Footer;