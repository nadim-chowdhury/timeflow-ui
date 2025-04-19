"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const FOCUS_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

type Mode = "focus" | "break";

export const ProductivityTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_TIME);
  const [mode, setMode] = useState<Mode>("focus");
  const [running, setRunning] = useState(false);
  const [distracted, setDistracted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sync between tabs
  useEffect(() => {
    const stored = localStorage.getItem("productivity-timer");
    if (stored) {
      const { mode, secondsLeft, running } = JSON.parse(stored);
      setMode(mode);
      setSecondsLeft(secondsLeft);
      setRunning(running);
    }

    const syncAcrossTabs = (e: StorageEvent) => {
      if (e.key === "productivity-timer" && e.newValue) {
        const { mode, secondsLeft, running } = JSON.parse(e.newValue);
        setMode(mode);
        setSecondsLeft(secondsLeft);
        setRunning(running);
      }
    };

    window.addEventListener("storage", syncAcrossTabs);
    return () => window.removeEventListener("storage", syncAcrossTabs);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "productivity-timer",
      JSON.stringify({ mode, secondsLeft, running })
    );
  }, [mode, secondsLeft, running]);

  // Timer logic
  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          const nextMode = mode === "focus" ? "break" : "focus";
          setMode(nextMode);
          return nextMode === "focus" ? FOCUS_TIME : BREAK_TIME;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [running, mode]);

  // Detect distraction
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && running) setDistracted(true);
    };

    const resetDistracted = () => setDistracted(false);

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", resetDistracted);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", resetDistracted);
    };
  }, [running]);

  const toggleRunning = () => setRunning((prev) => !prev);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const seconds = s % 60;
    return `${m}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-md mx-auto mt-12 text-center p-6 rounded-xl bg-white shadow-lg space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">
        {mode === "focus" ? "🧠 Focus Time" : "☕ Break Time"}
      </h2>

      <motion.div
        key={secondsLeft}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-5xl font-bold text-gray-900"
      >
        {formatTime(secondsLeft)}
      </motion.div>

      <button
        onClick={toggleRunning}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition"
      >
        {running ? "Pause" : "Start"}
      </button>

      {distracted && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-4 text-red-500 font-medium"
        >
          🚨 Stay focused! You’ve been away.
        </motion.div>
      )}
    </div>
  );
};
