"use client";

import { useEffect, useRef, useState } from "react";

export const UXSentimentTracker = () => {
  const [sentiment, setSentiment] = useState<
    "neutral" | "frustrated" | "engaged" | "delighted"
  >("neutral");
  const backClicks = useRef<number[]>([]);
  const scrolls = useRef(0);
  const clicks = useRef(0);
  const [message, setMessage] = useState("");

  // Track back button spam (frustration signal)
  useEffect(() => {
    const handlePopState = () => {
      const now = Date.now();
      backClicks.current.push(now);

      const recent = backClicks.current.filter((t) => now - t < 3000);
      backClicks.current = recent;

      if (recent.length >= 3) {
        setSentiment("frustrated");
        setMessage("Looks like you're going back and forth — need help?");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Track click + scroll activity (engagement)
  useEffect(() => {
    const handleClick = () => clicks.current++;
    const handleScroll = () => scrolls.current++;

    window.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll);

    const interval = setInterval(() => {
      const clickCount = clicks.current;
      const scrollCount = scrolls.current;

      if (clickCount > 15 && scrollCount > 20) {
        setSentiment("delighted");
        setMessage("Loving your energy! Exploring everything — we see you 👀");
      } else if (clickCount < 2 && scrollCount < 2) {
        setSentiment("neutral");
        setMessage("");
      }

      clicks.current = 0;
      scrolls.current = 0;
    }, 10000); // check every 10s

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-6 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 px-4 py-3 rounded-lg shadow-lg max-w-sm text-sm text-gray-700 dark:text-gray-100 z-50 animate-fade-in">
      🧠{" "}
      <span className="font-medium">
        {sentiment === "frustrated" ? "Need help?" : "Heads up!"}
      </span>{" "}
      {message}
    </div>
  );
};
