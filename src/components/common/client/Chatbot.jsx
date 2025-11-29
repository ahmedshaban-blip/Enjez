import React, { useState, useEffect, useRef } from "react";
import { X, MessageSquare, Sparkles } from "lucide-react";
import { queryAI, checkAndInitializeChatbot } from "../../../utils/aiService";

// Component to render a single chat message (User or Bot)
const ChatMessage = ({ m }) => (
  <div className={`mb-3 ${m.role === "user" ? "text-right" : "text-left"}`}>
    <div className={`inline-block p-3 rounded-xl max-w-[85%] text-sm ${m.role === "user" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-900 border border-slate-200"}`}>{m.text}</div>
  </div>
);

export default function Chatbot() {
  // State management
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Refs for click-outside detection
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  // Effect: Auto-initialize AI database & Handle click outside
  useEffect(() => {
    const initBot = async () => { if ((await checkAndInitializeChatbot()).status === "processed") console.log("Chatbot initialized."); };
    initBot(); // Run auto-init on mount

    const onClick = (e) => { 
      // Close panel if clicked outside both panel and toggle button
      if (!panelRef.current?.contains(e.target) && !buttonRef.current?.contains(e.target)) setOpen(false); 
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Handle sending a message
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    
    // Add user message to UI immediately
    setMessages((m) => [...m, { role: "user", text: userText }]);
    setInput(""); setLoading(true);

    try {
      // Fetch response from AI Service
      const data = await queryAI(userText, 3);
      setMessages((m) => [...m, { role: "bot", text: data.answer || "I couldn't find an accurate answer." }]);
    } catch (err) { 
      setMessages((m) => [...m, { role: "bot", text: "Error connecting to AI service." }]); 
    } finally { 
      setLoading(false); 
    }
  };

  // Handle "Enter" key press
  const onKeyDown = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button ref={buttonRef} type="button" onClick={() => setOpen((o) => !o)} className="h-11 w-11 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:scale-105 transition-all flex items-center justify-center" aria-label="Open AI Assistant">
        {open ? <X size={20} /> : <MessageSquare size={20} fill="currentColor" />}
      </button>

      {/* Chat Panel Window */}
      {open && (
        <div 
          ref={panelRef} 
          className={`
            fixed top-24 left-1/2 -translate-x-1/2 w-[85vw] sm:w-96 z-50 
            md:absolute md:top-full md:right-0 md:left-auto md:translate-x-0 md:mt-3 
            max-h-[600px] h-[550px] bg-white rounded-2xl shadow-2xl border border-slate-200 
            flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top
          `}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2"><Sparkles className="text-blue-600" size={18} /><div className="font-bold text-slate-800 text-sm">Enjez AI Assistant</div></div>
          </div>

          {/* Messages Body (Scrollable) */}
          <div className="p-4 overflow-y-auto flex-1 bg-white scrollbar-thin scrollbar-thumb-slate-200">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3"><Sparkles className="text-blue-500" size={24} /></div>
                <p className="text-slate-800 font-medium">Welcome!</p><p className="text-slate-500 text-xs mt-1">I am ready to help you.</p>
              </div>
            )}
            {messages.map((m, i) => <ChatMessage key={i} m={m} />)}
            {/* Loading Indicator */}
            {loading && <div className="flex items-center gap-2 text-xs text-slate-400 ml-2 mt-2"><span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span><span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></span><span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></span></div>}
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-slate-100 bg-slate-50">
            <div className="flex gap-2 relative">
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKeyDown} placeholder="How can I help you?" className="flex-1 rounded-xl border border-slate-200 pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white" autoFocus />
                <button onClick={sendMessage} disabled={loading || !input.trim()} className="absolute right-1.5 top-1.5 p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"><MessageSquare size={18} className={input.trim() ? "fill-blue-600" : ""} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}