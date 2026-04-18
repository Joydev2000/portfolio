"use client";

import { useState, useRef, useEffect } from "react";
import callGemini from "../Api/Gemini";
import { getAIPrompt } from "../data/aiData";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      text: "Hi! I'm Joydev Halder. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const formatMessage = (text) => {
    if (!text) return text;
    // Regex for URLs, PDFs, Emails, and Phone Numbers
    const combinedRegex =
      /(https?:\/\/[^\s]+)|(\/[^\s]+\.pdf)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(\+91\d{10})/g;
    const parts = text.split(combinedRegex);

    return parts.map((part, index) => {
      if (!part) return null;
      if (part.match(/^https?:\/\//)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline font-medium"
          >
            {part}
          </a>
        );
      }
      if (part.match(/^\/[^\s]+\.pdf$/)) {
        return (
          <a
            key={index}
            href={part}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 mt-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-semibold text-xs uppercase tracking-widest cursor-pointer"
          >
            <i className="fas fa-download"></i> Download CV
          </a>
        );
      }
      if (part.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        return (
          <a
            key={index}
            href={`mailto:${part}`}
            className="text-blue-400 hover:underline font-medium"
          >
            {part}
          </a>
        );
      }
      if (part.match(/^\+91\d{10}$/)) {
        return (
          <a
            key={index}
            href={`tel:${part}`}
            className="text-blue-400 hover:underline font-medium"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    const userPrompt = inputValue.trim();
    if (!userPrompt) return;

    setInputValue("");
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "user", text: userPrompt },
    ]);
    setIsLoading(true);

    const metaPrompt = getAIPrompt(userPrompt);

    const resultStr = await callGemini(metaPrompt);
    setIsLoading(false);

    if (!resultStr) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          text: "Connection failed. Please check your API key.",
        },
      ]);
      return;
    }

    try {
      // Find JSON string using regex in case LLaMA wraps it in text or markdown
      const jsonMatch = resultStr.match(/\{[\s\S]*?\}/);
      if (!jsonMatch) throw new Error("No JSON object found in response");

      const response = JSON.parse(jsonMatch[0].replace(/```/g, ""));

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          type: "ai",
          text: response.content,
          isCode: response.type === "code",
        },
      ]);
    } catch (e) {
      console.error("Chat parsing failed:", e, resultStr);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 3, type: "ai", text: resultStr }, // Fallback to raw string
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] sm:w-80 md:w-96 max-h-[75vh] sm:max-h-[80vh] bg-[#0d1117] border border-[#30363d] rounded-2xl shadow-2xl mb-4 flex flex-col overflow-hidden animate-fade-in-up pointer-events-auto" style={{ height: 'min(500px, 75vh)' }}>
          {/* Header */}
          <div className="bg-[#010409] border-b border-[#30363d] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                <i className="fas fa-robot text-sm"></i>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide">
                  Joydev&apos;s AI
                </h3>
                <p className="text-[10px] text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse"></span>{" "}
                  Online
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
          <div
            className="flex-1 p-4 overflow-y-auto overscroll-contain custom-scrollbar space-y-4 bg-[#0d1117]"
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
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
                      <pre>
                        <code>{msg.text}</code>
                      </pre>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">
                      {formatMessage(msg.text)}
                    </p>
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
          className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-50 animate-bounce-subtle pointer-events-auto"
        >
          <i className="fas fa-comment-dots text-xl sm:text-2xl"></i>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
