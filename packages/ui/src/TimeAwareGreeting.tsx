"use client";

import { useEffect, useState } from "react";

const greetings = {
  morning: "Good Morning",
  afternoon: "Good Afternoon",
  evening: "Good Evening",
  night: "Good Night",
};

function getTimePeriod(hour: number): keyof typeof greetings {
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  if (hour < 20) return "evening";
  return "night";
}

type Props = {
  className?: string;
};

export const TimeAwareGreeting = ({ className }: Props) => {
  const [period, setPeriod] = useState<keyof typeof greetings>("morning");

  useEffect(() => {
    const hour = new Date().getHours();
    setPeriod(getTimePeriod(hour));
  }, []);

  return (
    <div
      className={`text-3xl font-bold text-center py-4 animate-fade-in ${className ?? ""}`}
    >
      {greetings[period]}! Hope you&apos;re having a great {period}.
    </div>
  );
};
