const Footer = () => {
  return (
    <footer className="bg-[#0b1120] py-10 border-t border-white/5 text-sm">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-slate-500">
          <div className="mb-4 md:mb-0"><span className="text-white font-bold text-lg">Joydev</span><span className="ml-2">© 2024</span></div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors"><i className="fab fa-github text-xl"></i></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><i className="fab fa-linkedin text-xl"></i></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><i className="fab fa-twitter text-xl"></i></a>
          </div>
      </div>
    </footer>
  );
};

export default Footer;