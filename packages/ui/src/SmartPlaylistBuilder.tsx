"use client";

import { useEffect, useState } from "react";

type Mood =
  | "chill"
  | "focus"
  | "energy"
  | "lofi"
  | "sunny vibes"
  | "night drive";

const getMood = ({
  hour,
  activity,
  weather,
}: {
  hour: number;
  activity: number;
  weather: string;
}): Mood => {
  if (weather.includes("rain")) return "lofi";
  if (weather.includes("clear") && hour < 12) return "sunny vibes";
  if (hour >= 21) return "night drive";
  if (activity > 15) return "energy";
  if (activity > 5) return "focus";
  return "chill";
};

const mockWeather = () =>
  ["clear sky", "light rain", "cloudy", "thunderstorm"][
    Math.floor(Math.random() * 4)
  ];

export const SmartPlaylistBuilder = () => {
  const [weather, setWeather] = useState("clear sky");
  const [mood, setMood] = useState<Mood>("chill");
  const [activity, setActivity] = useState(0);

  useEffect(() => {
    setWeather(mockWeather()); // replace with real API later
  }, []);

  useEffect(() => {
    let clickCount = 0;
    const clickHandler = () => clickCount++;

    window.addEventListener("click", clickHandler);

    const interval = setInterval(() => {
      const hour = new Date().getHours();
      const detectedMood = getMood({ hour, activity: clickCount, weather });
      setMood(detectedMood);
      setActivity(clickCount);
      clickCount = 0;
    }, 5000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("click", clickHandler);
    };
  }, [weather]);

  const samplePlaylists: Record<Mood, string[]> = {
    chill: ["Evening Breeze", "Soft Lights", "Lazy Loops"],
    focus: ["Code Flow", "Deep Work", "Focus Beats"],
    energy: ["Power Up", "Momentum", "Turbo Tunes"],
    lofi: ["Rainy Café", "Lofi Vibes", "Late Night Sketches"],
    "sunny vibes": ["Golden Hour", "Sunshine State", "Picnic Pop"],
    "night drive": ["Neon Nights", "After Dark", "Moon Cruise"],
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg space-y-6">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Detected Mood:{" "}
        <span className="font-bold text-blue-600 dark:text-blue-400">
          {mood}
        </span>{" "}
        — based on time, weather, and interaction.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {samplePlaylists[mood].map((track, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-pink-100 to-indigo-200 dark:from-zinc-700 dark:to-zinc-800 rounded-lg p-4 flex flex-col items-center text-center shadow-md hover:scale-105 transition-all animate-pulse"
          >
            <div
              className="w-20 h-20 bg-cover bg-center rounded-full shadow-inner mb-3"
              style={{
                backgroundImage: `url(https://source.unsplash.com/80x80/?music,album,${mood},${i})`,
              }}
            />
            <span className="text-sm font-medium text-gray-800 dark:text-white">
              {track}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
