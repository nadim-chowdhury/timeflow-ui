"use client";

import { useEffect, useState } from "react";
import { useTime } from "./TimeProvider"; // optional, or pass period as prop

const suggestionsByTime = {
  morning: ["Plan my day", "Read morning news", "Make coffee", "Open calendar"],
  afternoon: [
    "Schedule meeting",
    "Lunch spots nearby",
    "Check emails",
    "Workout ideas",
  ],
  evening: [
    "Watch something",
    "Relaxing music",
    "Journal entry",
    "Prepare for tomorrow",
  ],
  night: ["Meditation", "Sleep sounds", "Next-day goals", "Reflect on the day"],
};

// Replace suggestionsByTime with an async call
// (e.g., OpenAI or custom API that returns context-aware suggestions)

// const getSmartSuggestions = async (context: { time: string; geo?: string }) => {
//   const res = await fetch("/api/ai-suggestions", {
//     method: "POST",
//     body: JSON.stringify(context),
//   });
//   return await res.json(); // return ["Suggestion 1", "Suggestion 2"]
// };

export const PredictiveInput = ({
  placeholder = "Type a command...",
  onSelect,
}: {
  placeholder?: string;
  onSelect?: (value: string) => void;
}) => {
  const { period } = useTime(); // fallback: use `new Date().getHours()` if not using provider
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  // Fetch suggestion based on time of day + local history
  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("predictive-history") || "[]"
    );
    setHistory(saved);
    const timeSuggestions = suggestionsByTime[period] || [];
    setSuggestions([...new Set([...saved.slice(-3), ...timeSuggestions])]);
  }, [period]);

  const handleSubmit = (val: string) => {
    if (!val) return;
    const updatedHistory = [...new Set([val, ...history])].slice(0, 10);
    localStorage.setItem("predictive-history", JSON.stringify(updatedHistory));
    setInput("");
    setHistory(updatedHistory);
    if (onSelect) onSelect(val);
  };

  return (
    <div className="w-full max-w-md space-y-2">
      <div className="flex border rounded-xl overflow-hidden shadow focus-within:ring-2 ring-blue-500">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 outline-none bg-white dark:bg-zinc-800 dark:text-white"
        />
        <button
          onClick={() => handleSubmit(input)}
          className="px-4 bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Go
        </button>
      </div>

      {input.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-2">
          {suggestions
            .filter((s) => s.toLowerCase().includes(input.toLowerCase()))
            .map((sugg, i) => (
              <button
                key={i}
                onClick={() => handleSubmit(sugg)}
                className="block w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-zinc-800"
              >
                {sugg}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};
