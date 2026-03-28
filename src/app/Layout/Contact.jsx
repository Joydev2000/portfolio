  "use client"
  import { useState } from "react"; 

const Contact = () => {
  const [contactMessage, setContactMessage] = useState("");
  const [isPolishing, setIsPolishing] = useState(false);

  const polishMessage = async () => {
    if (!contactMessage.trim()) { alert("Please draft a message first."); return; }
    setIsPolishing(true);

    const prompt = `Rewrite this email to be professional, warm, and concise for a developer portfolio inquiry: "${contactMessage}"`;
    const polishedText = await callGemini(prompt);

    if (polishedText) {
      setContactMessage("");
      let currentText = "";
      for (let i = 0; i < polishedText.length; i++) {
        setTimeout(() => {
          currentText += polishedText.charAt(i);
          setContactMessage(currentText);
          if (i === polishedText.length - 1) setIsPolishing(false);
        }, i * 10);
      }
    } else {
      setIsPolishing(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="text-center mb-10 relative z-10"><h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">Get in Touch</h2><h3 className="text-3xl font-display font-bold text-white tracking-tight">Let's Work Together</h3></div>
              <div className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2"><label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Name</label><input type="text" className="w-full bg-[#0f172a]/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-600" placeholder="John Doe" /></div>
                      <div className="space-y-2"><label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Email</label><input type="email" className="w-full bg-[#0f172a]/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-600" placeholder="john@example.com" /></div>
                  </div>
                  <div className="space-y-2">
                      <div className="flex justify-between items-center">
                          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Message</label>
                          <button type="button" onClick={polishMessage} disabled={isPolishing} className="text-xs text-blue-400 hover:text-white transition-colors flex items-center gap-1 font-medium bg-blue-500/10 px-2 py-1 rounded">
                              <i className={`fas ${isPolishing ? 'fa-spinner fa-spin' : 'fa-magic'}`}></i> ✨ AI Polish
                          </button>
                      </div>
                      <textarea 
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          rows="4" 
                          className="w-full bg-[#0f172a]/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-600" 
                          placeholder="How can I help you?">
                      </textarea>
                  </div>
                  <button type="button" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/25">Send Message</button>
              </div>
          </div>
      </div>
    </section>
  );
};

export default Contact;