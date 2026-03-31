"use client";

import { useState, useRef, useEffect } from "react";
import callGemini from "../Api/Gemini";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: "ai", text: "Hi! I'm Joydev's AI Assistant. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    const userPrompt = inputValue.trim();
    if (!userPrompt) return;

    setInputValue("");
    setMessages((prev) => [...prev, { id: Date.now(), type: "user", text: userPrompt }]);
    setIsLoading(true);

    const metaPrompt = `
You are a helpful AI assistant for Joydev Halder's portfolio. Joydev is a Graphic, Web Design & Web Developer.

ABOUT JOYDEV:
- Name: Joydev Halder
- Location: Bongaon, 743249, India
- Born: 22-02-2000
- Contact: +917478362081 | joydevsuvo2202@gmail.com | www.joydev.com
- Summary: Frontend Developer with experience in WordPress, HTML, CSS, JavaScript, and React. Passionate about building responsive, high-performance websites and developing smooth user experiences through clean and efficient code. Skilled at converting UI designs into responsive web pages and optimizing websites.

EXPERIENCE:
- Web Developer at Web Circle Technology (Nov 2024 - Present): Build/customize WordPress websites, develop React UI components, create responsive HTML/CSS layouts, optimize site performance.
- Junior UI/UX Designer at TimdTech (Apr 2024 - Oct 2024): Collaborated on UI/UX, worked with React, created prototypes, fixed design bugs.

EDUCATION & QUALIFICATION:
- Diploma in Graphic, Web Design and Web Development from Arena Animation, Barasat.
- Graduation: Netaji Subhas Open University (2022-2026).

SKILLS:
- Coding: HTML, CSS, JavaScript, React.js, Next.js (UI), Tailwind CSS, Bootstrap, jQuery, Core PHP, Git & Github.
- CMS: WordPress
- Software: Photoshop, Illustrator, Figma, Adobe XD, InDesign, VS Code.
- Languages: English, Hindi, Bengali.
- Hobbies: Coding, Music, Travel, Riding, Games.

User Input: "${userPrompt}"

Task:
1. If the user is asking a question (e.g., "Who are you?", "What is your experience?", "How can I contact you?"), reply with a friendly, conversational, and short text answer (max 3 sentences) using the information provided above. Speak as the AI assistant representing Joydev. Include accurate details.
2. If the user is asking for code (e.g., "Write a button"), generate the code block and use jsx and tailwind for styling (max 15 lines).

Return JSON format ONLY:
{ "type": "chat" or "code", "content": "..." }
    `;

    const resultStr = await callGemini(metaPrompt);
    setIsLoading(false);

    if (!resultStr) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, type: "ai", text: "Connection failed. Please check your API key." }
      ]);
      return;
    }

    try {
      const cleanJson = resultStr.replace(/```json/g, '').replace(/```/g, '').trim();
      const response = JSON.parse(cleanJson);
      
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 2, type: "ai", text: response.content, isCode: response.type === "code" }
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 3, type: "ai", text: resultStr }
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="w-80 sm:w-96 h-125 max-h-[80vh] bg-[#0d1117] border border-[#30363d] rounded-2xl shadow-2xl mb-4 flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-[#010409] border-b border-[#30363d] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                <i className="fas fa-robot text-sm"></i>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide">Joydev&apos;s AI</h3>
                <p className="text-[10px] text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8b949e] hover:text-white transition-colors p-1"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4 bg-[#0d1117]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.type === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-[#21262d] text-[#c9d1d9] rounded-bl-sm border border-[#30363d]"
                  }`}
                >
                  {msg.isCode ? (
                    <div className="overflow-x-auto bg-[#010409] p-3 rounded-lg border border-[#30363d] mt-1 text-xs font-mono">
                      <pre><code>{msg.text}</code></pre>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#21262d] border border-[#30363d] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#8b949e] animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-[#8b949e] animate-bounce delay-100"></span>
                  <span className="w-2 h-2 rounded-full bg-[#8b949e] animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-[#010409] border-t border-[#30363d]">
            <div className="flex items-center gap-2 bg-[#0d1117] border border-[#30363d] rounded-xl px-3 py-2 focus-within:border-blue-500 transition-colors">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about my skills..."
                className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder-[#8b949e]"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:hover:bg-blue-600/20 disabled:hover:text-blue-400 transition-colors flex items-center justify-center"
              >
                <i className="fas fa-paper-plane text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-50 animate-bounce-subtle"
        >
          <i className="fas fa-comment-dots text-2xl"></i>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
