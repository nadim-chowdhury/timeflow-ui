"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type CTAContent = {
  message: string;
  color: string;
};

const getTimeBasedCTA = (hour: number): CTAContent => {
  if (hour < 12)
    return { message: "☀️ Book your morning session!", color: "bg-yellow-400" };
  if (hour < 17)
    return { message: "🧘‍♂️ Need a midday break?", color: "bg-blue-400" };
  return {
    message: "🌙 Wind down with our evening offer",
    color: "bg-purple-500",
  };
};

const getDayBasedCTA = (day: number): CTAContent | null => {
  if (day === 5 || day === 6) {
    return {
      message: "🎉 Weekend Sale! Don’t miss out.",
      color: "bg-pink-500",
    };
  }
  return null;
};

const getWeatherBasedCTA = (weather: string): CTAContent | null => {
  if (weather.includes("Clear") || weather.includes("Sunny")) {
    return {
      message: "🥤 Cool off with our iced drinks!",
      color: "bg-sky-400",
    };
  }
  if (weather.includes("Rain")) {
    return {
      message: "☔ Cozy up indoors with our bundle deal!",
      color: "bg-gray-500",
    };
  }
  return null;
};

export const DynamicCTA = () => {
  const [cta, setCTA] = useState<CTAContent | null>(null);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();

    const timeCTA = getTimeBasedCTA(hour);
    const dayCTA = getDayBasedCTA(day);

    // Fetch weather for weather-based CTA
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_OPENWEATHER_API_KEY`
    )
      .then((res) => res.json())
      .then((data) => {
        const weatherDesc = data.weather?.[0]?.main || "";
        const weatherCTA = getWeatherBasedCTA(weatherDesc);

        // Priority: Weather > Day > Time
        setCTA(weatherCTA || dayCTA || timeCTA);
      })
      .catch(() => {
        // Fallback to time/day only
        setCTA(dayCTA || timeCTA);
      });
  }, []);

  if (!cta) return null;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`text-white px-6 py-4 rounded-xl shadow-xl w-fit mx-auto mt-8 ${cta.color}`}
    >
      <p className="font-semibold text-lg">{cta.message}</p>
    </motion.div>
  );
};
