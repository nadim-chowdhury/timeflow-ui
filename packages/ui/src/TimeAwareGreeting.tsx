"use client";

import { useEffect, useState } from "react";

const greetings = {
  morning: "Good Morning",
  afternoon: "Good Afternoon",
  evening: "Good Evening",
  night: "Good Night",
};

function getTimePeriod(hour: number) {
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  if (hour < 20) return "evening";
  return "night";
}

export const TimeAwareGreeting = () => {
  const [period, setPeriod] = useState("morning");

  useEffect(() => {
    const hour = new Date().getHours();
    setPeriod(getTimePeriod(hour));
  }, []);

  return (
    <div className="text-3xl font-bold text-center py-4 animate-fade-in">
      {greetings[period]}! Hope you're having a great {period}.
    </div>
  );
};
