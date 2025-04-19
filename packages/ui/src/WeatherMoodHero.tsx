"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";

// const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const DEFAULT_CITY = "London"; // Change as needed

type WeatherMood =
  | "clear"
  | "clouds"
  | "rain"
  | "snow"
  | "thunderstorm"
  | "mist"
  | "default";

const weatherToMood: Record<string, WeatherMood> = {
  Clear: "clear",
  Clouds: "clouds",
  Rain: "rain",
  Drizzle: "rain",
  Snow: "snow",
  Thunderstorm: "thunderstorm",
  Mist: "mist",
};

const moodStyles: Record<WeatherMood, string> = {
  clear: "bg-gradient-to-br from-yellow-200 via-blue-200 to-blue-500",
  clouds: "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-600",
  rain: "bg-gradient-to-br from-gray-600 via-blue-800 to-blue-900 animate-rain",
  snow: "bg-gradient-to-br from-white via-blue-100 to-blue-300",
  thunderstorm:
    "bg-gradient-to-br from-purple-900 via-blue-900 to-black animate-pulse",
  mist: "bg-gradient-to-br from-gray-100 via-gray-300 to-gray-500",
  default: "bg-gradient-to-br from-slate-200 via-slate-300 to-slate-500",
};

export const WeatherMoodHero = () => {
  const [weatherMood, setWeatherMood] = useState<WeatherMood>("default");
  const [weatherDescription, setWeatherDescription] =
    useState<string>("Loading weather...");

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${DEFAULT_CITY}&appid=${0}`
        );

        const weatherMain = res.data.weather[0].main;
        const description = res.data.weather[0].description;
        const mood = weatherToMood[weatherMain] || "default";

        setWeatherMood(mood);
        setWeatherDescription(description);
      } catch (err) {
        console.error("Weather API error:", err);
        setWeatherMood("default");
        setWeatherDescription("Unable to fetch weather.");
      }
    }

    fetchWeather();
  }, []);

  return (
    <section
      className={clsx(
        "w-full h-[70vh] flex flex-col items-center justify-center text-white transition-all duration-700 text-center px-4",
        moodStyles[weatherMood]
      )}
    >
      <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
        Welcome to TimeFlow UI
      </h1>
      <p className="mt-4 text-lg md:text-xl capitalize opacity-90">
        Current mood: {weatherDescription}
      </p>
    </section>
  );
};
