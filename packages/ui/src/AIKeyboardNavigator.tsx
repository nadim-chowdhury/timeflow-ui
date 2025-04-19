"use client";

import { useEffect, useState } from "react";

const isMac =
  typeof window !== "undefined" &&
  navigator.platform.toUpperCase().indexOf("MAC") >= 0;

export const AIKeyboardNavigator = () => {
  const [showHint, setShowHint] = useState(false);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    const handleClick = () => setClicks((prev) => prev + 1);
    window.addEventListener("click", handleClick);

    const timer = setInterval(() => {
      if (clicks > 5 && !showHint) {
        setShowHint(true);
      }
    }, 5000);

    return () => {
      clearInterval(timer);
      window.removeEventListener("click", handleClick);
    };
  }, [clicks, showHint]);

  if (!showHint) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 shadow-lg rounded-lg px-4 py-3 max-w-sm w-full text-sm text-gray-700 dark:text-gray-200">
        💡 Tip: You can press{" "}
        <span className="font-semibold">{isMac ? "⌘" : "Ctrl"} + K</span> to
        open the command bar faster.
        <button
          onClick={() => setShowHint(false)}
          className="ml-4 text-xs text-blue-500 hover:underline"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
