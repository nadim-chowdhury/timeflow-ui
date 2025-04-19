"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Location = {
  city: string;
  region: string;
  country: string;
};

type Event = {
  title: string;
  date: string;
  type: "holiday" | "event" | "funFact";
};

export const LocalEventsWidget = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [localTime, setLocalTime] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);
  const [celebrating, setCelebrating] = useState(false);

  // Fetch IP-based location
  useEffect(() => {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data) => {
        setLocation({
          city: data.city,
          region: data.region,
          country: data.country_name,
        });
      });
  }, []);

  // Local time updater
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mock holiday/event API
  useEffect(() => {
    if (!location) return;

    const today = new Date().toISOString().slice(5, 10); // MM-DD
    const demoEvents: Event[] = [
      {
        title: "National Creativity Day 🎨",
        date: "05-30",
        type: "holiday",
      },
      {
        title: "Local Farmer's Market",
        date: "05-30",
        type: "event",
      },
      {
        title: "Fun Fact: Your city was founded in 1804!",
        date: "05-30",
        type: "funFact",
      },
    ];

    const todayEvents = demoEvents.filter((e) => e.date === today);
    setEvents(todayEvents);
    if (todayEvents.find((e) => e.type === "holiday")) {
      setCelebrating(true);
    }
  }, [location]);

  return (
    <div className="relative w-full max-w-md rounded-2xl border p-6 shadow-xl backdrop-blur-md bg-white/70 dark:bg-black/60">
      <h2 className="text-xl font-semibold mb-2">🌎 Local Events</h2>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        {location
          ? `${location.city}, ${location.region}, ${location.country}`
          : "Detecting location..."}
      </p>
      <p className="mt-1 text-2xl font-bold">{localTime}</p>

      <div className="mt-4 space-y-2">
        {events.length > 0 ? (
          events.map((event, i) => (
            <div
              key={i}
              className="rounded-md bg-gradient-to-r from-indigo-100 to-white dark:from-indigo-900/50 p-3"
            >
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {event.type}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No notable events today.</p>
        )}
      </div>

      {/* 🎉 Celebration Animation */}
      {celebrating && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 1 }}
          className="absolute top-0 right-0 p-2 text-3xl animate-bounce"
        >
          🎆
        </motion.div>
      )}
    </div>
  );
};
