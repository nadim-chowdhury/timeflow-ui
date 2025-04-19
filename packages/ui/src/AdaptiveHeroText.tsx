"use client";

import { useEffect, useState } from "react";

const getTimeGreeting = (hour: number) => {
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  if (hour < 21) return "Good Evening";
  return "Late Night Hustler";
};

const getDayMessage = () => {
  const day = new Date().toLocaleDateString("en-US", { weekday: "long" });
  switch (day) {
    case "Monday":
      return "New week, new goals.";
    case "Friday":
      return "It’s Friday — build something cool today!";
    case "Saturday":
      return "Weekend vibes — time to relax or hack!";
    default:
      return `Happy ${day}!`;
  }
};

export const AdaptiveHeroText = () => {
  const [heroText, setHeroText] = useState("Welcome!");
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    const timeMsg = getTimeGreeting(hour);
    const dayMsg = getDayMessage();

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          )
            .then((res) => res.json())
            .then((data) => {
              const city =
                data.address.city || data.address.town || data.address.state;
              setLocation(city);
              setHeroText(`${timeMsg} from ${city}! ${dayMsg}`);
            });
        },
        () => {
          setHeroText(`${timeMsg}! ${dayMsg}`);
        }
      );
    } else {
      setHeroText(`${timeMsg}! ${dayMsg}`);
    }
  }, []);

  return (
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800 dark:text-white animate-fade-in transition-all duration-500">
      {heroText}
    </h2>
  );
};
