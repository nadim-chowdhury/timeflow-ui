"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// Extend global Navigator type properly (safe to place here or in a global .d.ts file)
declare global {
  interface Navigator {
    connection?: NetworkInformation;
    mozConnection?: NetworkInformation;
    webkitConnection?: NetworkInformation;
  }

  interface NetworkInformation {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  }
}

type LoaderType = "minimal" | "playful" | "calm";

export const MultisenseLoader = () => {
  const [loaderType, setLoaderType] = useState<LoaderType>("minimal");
  const [progress, setProgress] = useState(0);
  const lastScroll = useRef(0);
  const idleTime = useRef(0);
  const scrollSpeed = useRef(0);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  // Detect connection speed
  useEffect(() => {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;

    const effectiveType = connection?.effectiveType;

    if (effectiveType && ["slow-2g", "2g"].includes(effectiveType)) {
      setLoaderType("playful");
    } else if (effectiveType && ["3g"].includes(effectiveType)) {
      setLoaderType("calm");
    } else {
      setLoaderType("minimal");
    }
  }, []);

  // Detect mood from scroll + idle
  useEffect(() => {
    const checkMood = () => {
      if (scrollSpeed.current < 20 && idleTime.current > 5) {
        setLoaderType("calm");
      } else if (scrollSpeed.current > 150) {
        setLoaderType("playful");
      } else {
        setLoaderType("minimal");
      }
    };

    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastScroll.current);
      scrollSpeed.current = delta;
      lastScroll.current = window.scrollY;
      checkMood();
    };

    const resetIdle = () => {
      idleTime.current = 0;
    };

    const trackIdle = () => {
      idleTime.current += 1;
      checkMood();
    };

    idleTimer.current = setInterval(trackIdle, 1000);

    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", resetIdle);
    window.addEventListener("keydown", resetIdle);

    return () => {
      clearInterval(idleTimer.current!);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("keydown", resetIdle);
    };
  }, []);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + Math.random() * 5));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const loaderVariants = {
    minimal: {
      backgroundColor: "#0f172a",
      height: "4px",
    },
    playful: {
      backgroundColor: "#facc15",
      height: "8px",
    },
    calm: {
      backgroundColor: "#38bdf8",
      height: "6px",
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-full z-50"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%`, ...loaderVariants[loaderType] }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
      style={{ borderRadius: "0 4px 4px 0" }}
    />
  );
};
