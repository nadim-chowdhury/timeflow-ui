"use client";

import { useEffect, useRef, useState } from "react";
import { SendHorizonal, Bot, User } from "lucide-react";

export const ConversationAvatar = () => {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input.trim() };
    // setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/conversation-avatar", {
        method: "POST",
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await res.json();
      const assistantReply = data.reply || "Sorry, something went wrong.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantReply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Network error." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-[320px] max-h-[70vh] bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-2xl shadow-xl flex flex-col overflow-hidden z-50">
      <div className="bg-blue-600 text-white px-4 py-2 font-semibold flex items-center gap-2">
        <Bot size={18} />
        Assistant
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[90%] px-3 py-2 rounded-xl text-sm ${
              m.role === "user"
                ? "bg-blue-100 dark:bg-blue-800 self-end ml-auto text-right"
                : "bg-gray-100 dark:bg-zinc-800 self-start"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="text-xs text-gray-400 dark:text-zinc-400">
            Typing…
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="border-t dark:border-zinc-700 flex items-center p-2">
        <input
          className="flex-1 bg-transparent outline-none px-2 text-sm"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button
          onClick={sendMessage}
          className="text-blue-600 hover:text-blue-800 p-2"
        >
          <SendHorizonal size={18} />
        </button>
      </div>
    </div>
  );
};

// pages/api/conversation-avatar.ts

// import { NextRequest, NextResponse } from "next/server";
// import { OpenAIStream, StreamingTextResponse } from "ai"; // Optional: next-ai SDK

// export const runtime = "edge";

// export async function POST(req: NextRequest) {
//   const { messages } = await req.json();

//   const res = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages,
//       temperature: 0.7,
//     }),
//   });

//   const json = await res.json();
//   const reply = json?.choices?.[0]?.message?.content || "Sorry, I didn't catch that.";
//   return NextResponse.json({ reply });
// }
