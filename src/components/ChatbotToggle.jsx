// components/ChatbotToggle.jsx
import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import ChatbotModal from "./ChatbotModal";

export default function ChatbotToggle() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 bg-yellow-400 p-4 rounded-full shadow-xl cursor-pointer hover:scale-110 transition z-50"
      >
        <FaRobot className="text-2xl text-black" />
      </div>
      {open && <ChatbotModal onClose={() => setOpen(false)} />}
    </>
  );
}