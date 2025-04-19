"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import clsx from "clsx";

type Props = {
  intensity?: number; // 0.0 (subtle) to 1.0 (bold)
  blur?: boolean;
  children: React.ReactNode;
};

export const AmbientFocusBackground = ({
  intensity = 0.5,
  blur = true,
  children,
}: Props) => {
  const [timePeriod, setTimePeriod] = useState<
    "morning" | "day" | "evening" | "night"
  >("day");
  const [clicks, setClicks] = useState(0);

  const scrollY = useMotionValue(0);
  const smoothScroll = useSpring(scrollY, { damping: 20, stiffness: 150 });

  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours();
      if (hour < 6) setTimePeriod("night");
      else if (hour < 11) setTimePeriod("morning");
      else if (hour < 18) setTimePeriod("day");
      else setTimePeriod("evening");
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClick = () => setClicks((c) => c + 1);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  // Map time period to gradient
  const gradientMap = {
    morning: "from-pink-100 via-blue-100 to-indigo-100",
    day: "from-blue-200 via-white to-green-100",
    evening: "from-yellow-100 via-orange-100 to-red-100",
    night: "from-gray-900 via-slate-800 to-black",
  };

  // Activity-based blur/contrast
  const activeIntensity =
    Math.min(1, (clicks + smoothScroll.get()) / 1000) * intensity;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <motion.div
        className={clsx(
          "absolute inset-0 -z-10 transition-all duration-1000",
          `bg-gradient-to-br ${gradientMap[timePeriod]}`
        )}
        style={{
          filter: blur
            ? `blur(${5 + activeIntensity * 10}px) contrast(${1 + activeIntensity})`
            : `contrast(${1 + activeIntensity})`,
        }}
      />
      {children}
    </div>
  );
};
