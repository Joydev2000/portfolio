"use client";
import { useState } from "react";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "../components/ScrollReveal";
import callGemini from "../Api/Gemini";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isPolishing, setIsPolishing] = useState(false);
  const [status, setStatus] = useState(null); // "loading" | "success" | "error"
  const [statusMsg, setStatusMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const polishMessage = async () => {
    if (!form.message.trim()) {
      setErrors((prev) => ({ ...prev, message: "Please draft a message first." }));
      return;
    }
    setIsPolishing(true);

    const prompt = `You are a professional writing assistant. Rewrite the following message to be professional, polite, and concise. It is being written by a recruiter, HR professional, or client who is contacting a Frontend Developer named "Joydev" through his portfolio website to hire him or collaborate.
    
    IMPORTANT: Return ONLY the polished message text. Do NOT include any introductions, explanations, or multiple options.

Draft message: "${form.message}"`;
    const polishedText = await callGemini(prompt);

    if (polishedText) {
      setForm((prev) => ({ ...prev, message: "" }));
      let currentText = "";
      for (let i = 0; i < polishedText.length; i++) {
        setTimeout(() => {
          currentText += polishedText.charAt(i);
          setForm((prev) => ({ ...prev, message: currentText }));
          if (i === polishedText.length - 1) setIsPolishing(false);
        }, i * 10);
      }
    } else {
      setIsPolishing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    setStatusMsg("");

    try {
      const res = await fetch("/Api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setStatusMsg("Your message was sent! I'll get back to you within 24–48 hours.");
        setForm(initialForm);
        setErrors({});
      } else {
        setStatus("error");
        setStatusMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMsg("Network error. Please check your connection and try again.");
    }
  };

  const inputClass = (field) =>
    `w-full bg-[#0f172a]/50 border ${
      errors[field] ? "border-red-500/70" : "border-slate-700"
    } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-600`;

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="glass-panel rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <ScrollReveal
            className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none"
            delay={0.2}
          ></ScrollReveal>
          <StaggerItem className="text-center mb-10 relative z-10">
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-3">
              Get in Touch
            </h2>
            <h3 className="text-3xl font-display font-bold text-white tracking-tight">
              Let&apos;s Work Together
            </h3>
          </StaggerItem>

          <form onSubmit={handleSubmit} noValidate className="space-y-6 relative z-10">
            {/* Row 1: Name + Email */}
            <StaggerItem className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Your Name <span className="text-blue-500/80">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass("name")}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Your Email <span className="text-blue-500/80">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass("email")}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                )}
              </div>
            </StaggerItem>

            {/* Row 2: Phone + Company */}
            <StaggerItem className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass("phone")}
                  placeholder="1234567890"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className={inputClass("company")}
                  placeholder="Company Name"
                />
              </div>
            </StaggerItem>

            {/* Message */}
            <StaggerItem className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Message <span className="text-blue-500/80">*</span>
                </label>
                  <button
                    type="button"
                    onClick={polishMessage}
                    disabled={isPolishing}
                    className="group/ai relative flex items-center gap-1.5 px-3 py-1.5 rounded-full overflow-hidden transition-all duration-300 active:scale-95 disabled:opacity-50"
                  >
                    {/* Glassy Background */}
                    <div className="absolute inset-0 bg-blue-500/10 group-hover/ai:bg-blue-500/20 transition-colors"></div>
                    {/* Animated Border Glow (Magic effect) */}
                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover/ai:opacity-100 transition-opacity"></div>
                    
                    <i className={`fas ${isPolishing ? "fa-spinner fa-spin" : "fa-wand-magic-sparkles text-blue-400"} text-[10px]`}></i>
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter relative z-10">
                      {isPolishing ? "Polishing..." : "AI Polish"}
                    </span>
                  </button>
              </div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                className={inputClass("message")}
                placeholder="How can I help you?"
              ></textarea>
              {errors.message && (
                <p className="text-xs text-red-400 mt-1">{errors.message}</p>
              )}
            </StaggerItem>

            {/* Status Banner */}
            {status === "success" && (
              <div className="relative group overflow-hidden bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <i className="fas fa-check text-emerald-400"></i>
                </div>
                <div>
                  <h4 className="text-emerald-400 font-semibold text-sm">Message Sent!</h4>
                  <p className="text-emerald-400/70 text-xs mt-0.5">{statusMsg}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            )}
            {status === "error" && (
              <div className="bg-rose-500/5 border border-rose-500/20 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                  <i className="fas fa-exclamation-triangle text-rose-400"></i>
                </div>
                <div>
                  <h4 className="text-rose-400 font-semibold text-sm">Submission Error</h4>
                  <p className="text-rose-400/70 text-xs mt-0.5">{statusMsg}</p>
                </div>
              </div>
            )}

            {/* Submit */}
            <StaggerItem>
              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative w-full overflow-hidden rounded-xl p-0.5 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:scale-100"
              >
                {/* Gradient Border/Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#58a6ff] via-[#bc8cf2] to-[#a78bfa]"></div>
                
                {/* Button Content */}
                <div className="relative flex items-center justify-center gap-2 bg-[#0d1117]/80 hover:bg-transparent transition-colors duration-300 rounded-[10px] py-4 px-6">
                  {status === "loading" ? (
                    <>
                      <i className="fas fa-spinner fa-spin text-white"></i>
                      <span className="text-white font-semibold">Processing...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"></i>
                      <span className="text-white font-semibold">Send Secure Message</span>
                    </>
                  )}
                </div>
              </button>
            </StaggerItem>
          </form>
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Contact;
