'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import products from "../data/products";

export default function ChatbotModal({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I’m your Styling Assistant 💎\nWhat occasion are you styling for today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // 🔥 IMPORTANT: Now call your backend instead of OpenRouter/OpenAI directly
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages,
            { role: "user", text: input }
          ],
          products
        })
      });

      const data = await response.json();
      const reply = data.reply || "Sorry, couldn't understand. Try again.";
      setMessages(prev => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { role: "bot", text: "Something went wrong. Try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[22rem] bg-white shadow-2xl rounded-xl border border-yellow-300 overflow-hidden flex flex-col"
    >
      <div className="flex justify-between items-center px-4 py-3 bg-yellow-400 text-black font-semibold">
        AI Styling Assistant
        <IoMdClose onClick={onClose} className="cursor-pointer text-xl hover:text-red-500" />
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-yellow-50 scroll-smooth">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "bot" ? "justify-start" : "justify-end"}`}>
            <div
              className={`rounded-2xl px-4 py-2 max-w-[75%] text-sm whitespace-pre-line leading-snug ${
                msg.role === "bot"
                  ? "bg-white text-black shadow"
                  : "bg-yellow-400 text-black"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-black rounded-2xl px-4 py-2 text-sm animate-pulse">
              Typing...
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t bg-white flex items-center gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 border border-yellow-300 rounded-full px-4 py-2 text-sm"
          placeholder="Ask about jewellery ideas..."
          onKeyDown={e => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-yellow-400 text-black text-sm px-4 py-2 rounded-full hover:bg-yellow-500 transition"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
}
